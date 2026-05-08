"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Grid configuration
    const cols = 30;
    const rows = 20;
    let nodes: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];

    const mouse = { x: -1000, y: -1000, radius: 150 };

    const initGrid = () => {
      nodes = [];
      const cellWidth = width / cols;
      const cellHeight = height / rows;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * cellWidth;
          const y = j * cellHeight;
          nodes.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight; // Or a specific height if needed, but we'll use parent's size
      
      const dpr = window.devicePixelRatio || 1;
      
      // Set actual size in memory (scaled to account for extra pixel density)
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Normalize coordinate system to use css pixels
      ctx.scale(dpr, dpr);
      
      initGrid();
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update nodes
      const spring = 0.1;
      const friction = 0.8;
      const magneticPull = 0.3;

      nodes.forEach((node) => {
        const dx = mouse.x - node.ox;
        const dy = mouse.y - node.oy;
        const distance = Math.sqrt(dx * dx + dy * dy);

        let targetX = node.ox;
        let targetY = node.oy;

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          targetX = node.ox + dx * force * magneticPull;
          targetY = node.oy + dy * force * magneticPull;
        }

        const ax = (targetX - node.x) * spring;
        const ay = (targetY - node.y) * spring;

        node.vx += ax;
        node.vy += ay;

        node.vx *= friction;
        node.vy *= friction;

        node.x += node.vx;
        node.y += node.vy;
      });

      // Calculate box knockout bounds
      let boxWidthCells = 18;
      let boxHeightCells = 6;
      if (width < 1024) {
        boxWidthCells = 20;
        boxHeightCells = 8;
      }
      if (width < 768) {
        boxWidthCells = 26;
        boxHeightCells = 10;
      }

      const minCol = (cols - boxWidthCells) / 2;
      const maxCol = (cols + boxWidthCells) / 2;
      const minRow = (rows - boxHeightCells) / 2;
      const maxRow = (rows + boxHeightCells) / 2;

      // Draw horizontal lines
      ctx.strokeStyle = "rgba(0, 0, 0, 0.1)"; // Very subtle grid lines
      ctx.lineWidth = 1;
      ctx.beginPath();
      
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          const index = i * (rows + 1) + j;
          const node = nodes[index];
          if (i === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            const isInsideBox = j > minRow && j < maxRow && i > minCol && i <= maxCol;
            if (isInsideBox) {
              ctx.moveTo(node.x, node.y);
            } else {
              ctx.lineTo(node.x, node.y);
            }
          }
        }
      }
      ctx.stroke();

      // Draw vertical lines
      ctx.beginPath();
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const index = i * (rows + 1) + j;
          const node = nodes[index];
          if (j === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            const isInsideBox = i > minCol && i < maxCol && j > minRow && j <= maxRow;
            if (isInsideBox) {
              ctx.moveTo(node.x, node.y);
            } else {
              ctx.lineTo(node.x, node.y);
            }
          }
        }
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ display: "block" }}
    />
  );
}
