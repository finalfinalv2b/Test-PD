"use client";

import { useEffect, useRef } from "react";

interface LogoInteractiveProps {
  brandColor: string;
}

interface HeatPoint {
  x: number;
  y: number;
  time: number;
  intensity: number;
}

export function LogoInteractive({ brandColor }: LogoInteractiveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatPointsRef = useRef<HeatPoint[]>([]);
  const layoutRectRef = useRef({ width: 564, height: 289 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Measure container layout size and configure high-DPI scaling
    const updateLayout = () => {
      const rect = canvas.getBoundingClientRect();
      layoutRectRef.current = {
        width: rect.width || 564,
        height: rect.height || 289
      };
      
      const dpr = window.devicePixelRatio || 1;
      canvas.width = layoutRectRef.current.width * dpr;
      canvas.height = layoutRectRef.current.height * dpr;
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);



    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const isInside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;

      if (isInside) {
        // Map cursor coordinate directly to canonical space (564.03 x 288.69)
        const localX = (x / rect.width) * 564.03;
        const localY = (y / rect.height) * 288.69;
        const now = Date.now();

        // Throttle slightly to avoid duplicate points inside identical frames
        if (now - lastTime > 8) {
          lastTime = now;

          // Interpolate points for fast cursor movements to keep tracer trail continuous
          const lastPoint = heatPointsRef.current[heatPointsRef.current.length - 1];
          if (lastPoint) {
            const dx = localX - lastPoint.x;
            const dy = localY - lastPoint.y;
            const dist = Math.hypot(dx, dy);

            if (dist > 8) {
              const steps = Math.floor(dist / 6);
              for (let i = 1; i <= steps; i++) {
                const t = i / (steps + 1);
                heatPointsRef.current.push({
                  x: lastPoint.x + dx * t,
                  y: lastPoint.y + dy * t,
                  time: now,
                  intensity: 1.0
                });
              }
            }
          }

          heatPointsRef.current.push({
            x: localX,
            y: localY,
            time: now,
            intensity: 1.0
          });
        }
      }
    };

    // Track mouse movements globally to react transparently without stealing focus/pointer events
    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const render = () => {
      const rect = layoutRectRef.current;
      const dpr = window.devicePixelRatio || 1;

      // Clear layout drawing area
      ctx.resetTransform();
      ctx.clearRect(0, 0, rect.width * dpr, rect.height * dpr);

      // Scale context matrix:
      // 1. DPI scale for razor-sharp vector-grade render quality on retina/high-res screens
      ctx.scale(dpr, dpr);
      
      // 2. Coordinates scale to translate canonical space (564.03 x 288.69) into screen CSS pixels
      const scaleX = rect.width / 564.03;
      const scaleY = rect.height / 288.69;
      ctx.scale(scaleX, scaleY);

      const now = Date.now();

      // Filter and decay active heat points
      heatPointsRef.current = heatPointsRef.current.filter(p => {
        const age = now - p.time;
        if (age < 1000) {
          p.intensity = 1.0; // Hold at 100% solid color for exactly 1.0 second
          return true;
        } else {
          // Gradually fade away after the 1-second hold window (over a 1000ms duration)
          const fadeProgress = (age - 1000) / 1000;
          p.intensity = Math.max(0, 1.0 - fadeProgress);
          return p.intensity > 0;
        }
      });

      const r = 255, g = 255, b = 255;

      // Save canvas state and apply vector clipping path to ensure logo boundaries are clean vectors
      ctx.save();

      ctx.beginPath();
      // Left Circle (centered at 136.64, 152.05, radius 136.64)
      ctx.arc(136.64, 152.05, 136.64, 0, Math.PI * 2);

      // Right Polygon
      ctx.moveTo(553.22, 284.38);
      ctx.lineTo(311.9, 284.38);
      ctx.lineTo(286.31, 0);
      ctx.lineTo(562.31, 67.5);
      ctx.closePath();

      // Vector clip path
      ctx.clip();

      // 1. Draw base logo watermark in brand red
      ctx.fillStyle = brandColor || "#f41c06";
      ctx.fillRect(0, 0, 564.03, 288.69);

      // 2. Draw red/teal heat trail gradients
      const points = heatPointsRef.current;
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const hoverRadius = 150; // 50% wider glow footprint (from 100px)
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, hoverRadius);
        
        // Solid brand core, transitioning smoothly to transparent with slow gradual drop-off
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${1.0 * p.intensity})`);
        gradient.addColorStop(0.2, `rgba(${r}, ${g}, ${b}, ${0.6 * p.intensity})`);
        gradient.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${0.25 * p.intensity})`);
        gradient.addColorStop(0.75, `rgba(${r}, ${g}, ${b}, ${0.07 * p.intensity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = gradient;
        // Optimize drawing to square bounding rect
        ctx.fillRect(p.x - hoverRadius, p.y - hoverRadius, hoverRadius * 2, hoverRadius * 2);
      }

      ctx.restore();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", updateLayout);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [brandColor]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full select-none pointer-events-none"
      style={{ display: "block" }}
    />
  );
}
