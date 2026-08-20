"use client";

import React, { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  radius: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  alpha: number;
  currentAlpha: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.radius = Math.random() * 200 + 100; // Large, soft particles (100px to 300px)
    this.baseVx = (Math.random() - 0.5) * 0.5; // Slow horizontal drift
    this.baseVy = -Math.random() * 0.8 - 0.2; // Slow upward drift (convection)
    this.vx = this.baseVx;
    this.vy = this.baseVy;
    this.alpha = Math.random() * 0.08 + 0.02; // Very faint (0.02 to 0.10)
    this.currentAlpha = this.alpha;
  }

  update(
    canvasWidth: number, 
    canvasHeight: number, 
    mouseX: number | null, 
    mouseY: number | null
  ) {
    // Mouse Repulsion Physics
    if (mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const repelRadius = 400; // Huge repel radius for smooth parting

      if (distance < repelRadius) {
        // Inverse distance weighting
        const force = (repelRadius - distance) / repelRadius;
        // Pushing force vector
        const angle = Math.atan2(dy, dx);
        
        // Massive push to easily part the sea of smoke
        this.vx += Math.cos(angle) * force * 1.5;
        this.vy += Math.sin(angle) * force * 1.5;
      }
    }

    // Apply friction to slowly return to base velocity
    this.vx = (this.vx - this.baseVx) * 0.95 + this.baseVx;
    this.vy = (this.vy - this.baseVy) * 0.95 + this.baseVy;

    // Update position
    this.x += this.vx;
    this.y += this.vy;

    // Wrap around screen edges seamlessly
    const buffer = this.radius;
    if (this.x < -buffer) this.x = canvasWidth + buffer;
    if (this.x > canvasWidth + buffer) this.x = -buffer;
    if (this.y < -buffer) this.y = canvasHeight + buffer;
    if (this.y > canvasHeight + buffer) this.y = -buffer;
    
    // Dynamic alpha: thinner at top, extremely thick at the bottom
    const depthFactor = Math.max(0, this.y / canvasHeight); // 0 at top, 1 at bottom
    // Scale alpha exponentially so it's very dense at the bottom
    this.currentAlpha = this.alpha * (0.1 + Math.pow(depthFactor, 2) * 4.0);
  }
}

export function SmokeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouseX: number | null = null;
    let mouseY: number | null = null;

    // Pre-render the soft smoke puff (radial gradient) to an off-screen canvas for MASSIVE performance gains.
    // Instead of computing 200 radial gradients per frame, we compute it once and use drawImage.
    const puffCanvas = document.createElement("canvas");
    const puffSize = 600; // Base size of the pre-rendered puff
    puffCanvas.width = puffSize;
    puffCanvas.height = puffSize;
    const puffCtx = puffCanvas.getContext("2d");
    
    if (puffCtx) {
      const gradient = puffCtx.createRadialGradient(
        puffSize / 2, puffSize / 2, 0,
        puffSize / 2, puffSize / 2, puffSize / 2
      );
      // Brand red #e31a1c
      gradient.addColorStop(0, "rgba(227, 26, 28, 1)");
      gradient.addColorStop(1, "rgba(227, 26, 28, 0)");
      
      puffCtx.fillStyle = gradient;
      puffCtx.fillRect(0, 0, puffSize, puffSize);
    }

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight * 1.2;
    };

    const initParticles = () => {
      particles = [];
      // Calculate particle density based on screen size
      const density = Math.floor((window.innerWidth * window.innerHeight) / 15000);
      const numParticles = Math.min(Math.max(density, 80), 250); // Cap between 80 and 250
      
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = null;
      mouseY = null;
    };

    window.addEventListener("resize", () => {
      resizeCanvas();
      initParticles(); // Re-init to distribute properly across new size
    });
    
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      // Clear canvas with a very slight fade for motion blur, though with smoke puffs, a clean clear is usually better to prevent artifacts.
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use lighter composite operation for that bright, dense smoke accumulation effect when overlapping
      ctx.globalCompositeOperation = "screen";

      for (const particle of particles) {
        particle.update(canvas.width, canvas.height, mouseX, mouseY);

        ctx.globalAlpha = particle.currentAlpha;
        // Draw the pre-rendered puff, scaled to the particle's radius
        ctx.drawImage(
          puffCanvas,
          particle.x - particle.radius,
          particle.y - particle.radius,
          particle.radius * 2,
          particle.radius * 2
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Initialize
    resizeCanvas();
    initParticles();
    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[120vh] pointer-events-auto"
      style={{ display: "block", zIndex: 0 }}
    />
  );
}
