"use client";

import { useEffect, useRef } from "react";

export function InteractiveGrid({ strokeColor = "#000000" }: { strokeColor?: string }) {
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
    let cols = 60;
    let rows = 40;
    let nodes: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = [];

    const mouse = { x: -1000, y: -1000, radius: 150 };

    const initGrid = () => {
      nodes = [];
      const currentCellWidth = width / cols;
      const currentCellHeight = height / rows;

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * currentCellWidth;
          const y = j * currentCellHeight;
          nodes.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 });
        }
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      const cellSize = 28;
      cols = Math.round(width / cellSize);
      rows = Math.round(height / cellSize);
      
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
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

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.touches[0].clientX - rect.left;
        mouse.y = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("touchmove", handleTouchMove, { passive: true });
    canvas.addEventListener("touchend", handleTouchEnd, { passive: true });
    canvas.addEventListener("touchcancel", handleTouchEnd, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Update nodes physics
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

      // Calculate box knockout bounds dynamically relative to total cols/rows
      let boxWidthCells = Math.round(cols * 0.6);
      let boxHeightCells = Math.round(rows * 0.3);
      if (width < 1024) {
        boxWidthCells = Math.round(cols * 0.67);
        boxHeightCells = Math.round(rows * 0.4);
      }
      if (width < 768) {
        boxWidthCells = Math.round(cols * 0.87);
        boxHeightCells = Math.round(rows * 0.5);
      }

      const minCol = (cols - boxWidthCells) / 2;
      const maxCol = (cols + boxWidthCells) / 2;
      const minRow = (rows - boxHeightCells) / 2;
      const maxRow = (rows + boxHeightCells) / 2;

      // Widgets row: located at 90% to 95% of screen height
      const widgetRowTop = Math.round(rows * 0.9);
      const widgetRowBottom = Math.round(rows * 0.95);

      // Weather widget (left 76.6% to 96.6% of screen width)
      const weatherColStart = Math.round(cols * (23 / 30));
      const weatherColEnd = Math.round(cols * (29 / 30));

      // LocalTime widget (left 60.0% to 70.0% of screen width)
      const timeColStart = Math.round(cols * (18 / 30));
      const timeColEnd = Math.round(cols * (21 / 30));

      // Draw horizontal lines (Foreground layer)
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 1; // 1px width matching Tailwind's default border width
      ctx.beginPath();
      
      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i <= cols; i++) {
          const index = i * (rows + 1) + j;
          const node = nodes[index];
          if (i === 0) {
            ctx.moveTo(node.x, node.y);
          } else {
            const isInsideBox = j > minRow && j < maxRow && i > minCol && i <= maxCol;
            const isInsideWidget = j > widgetRowTop && j < widgetRowBottom && i > weatherColStart && i <= weatherColEnd;
            const isInsideTimeWidget = j > widgetRowTop && j < widgetRowBottom && i > timeColStart && i <= timeColEnd;
            if (isInsideBox || isInsideWidget || isInsideTimeWidget) {
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
            const isInsideWidget = i > weatherColStart && i < weatherColEnd && j > widgetRowTop && j <= widgetRowBottom;
            const isInsideTimeWidget = i > timeColStart && i < timeColEnd && j > widgetRowTop && j <= widgetRowBottom;
            if (isInsideBox || isInsideWidget || isInsideTimeWidget) {
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
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("touchcancel", handleTouchEnd);
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
