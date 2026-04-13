"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Link from 'next/link';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseX: number;
  baseY: number;
  scrollX: number;
  scrollY: number;
  hoverOffsetX: number;
  hoverOffsetY: number;
  hoverMagnet: number;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const scrollProgRef = useRef<number>(0);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });
  const [fullyFormed, setFullyFormed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "center start"], // Increased speed
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Easing curve to snap the text formation early
    const mapped = Math.min(1, latest * 1.5);
    scrollProgRef.current = mapped;
    if (mapped > 0.8 && !fullyFormed) {
        setFullyFormed(true);
    } else if (mapped <= 0.8 && fullyFormed) {
        setFullyFormed(false);
    }
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    
    const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    let ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = 5500;
    
    const getPixelsFromImg = async (src: string, scale: number) => {
      const img = new Image();
      img.src = src;
      await new Promise(r => img.onload = r);
      
      const offCanvas = document.createElement("canvas");
      offCanvas.width = width;
      offCanvas.height = height;
      const offCtx = offCanvas.getContext("2d", { willReadFrequently: true });
      if (!offCtx) return [];

      offCtx.fillStyle = "black";
      offCtx.fillRect(0, 0, width, height);

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;
      const dx = (width - drawWidth) / 2;
      const dy = (height - drawHeight) / 2;
      
      offCtx.drawImage(img, dx, dy, drawWidth, drawHeight);

      const imageData = offCtx.getImageData(0, 0, width, height).data;
      const pixels: { x: number; y: number }[] = [];

      for (let y = 0; y < height; y += 4) {
        for (let x = 0; x < width; x += 4) {
          const index = (y * width + x) * 4;
          // Look for whitespace (thresholding red channel)
          if (imageData[index] > 100) {
            pixels.push({ x, y });
          }
        }
      }
      return pixels;
    };

    const initParticles = async () => {
      // Get logo pixels
      const logoPixels = await getPixelsFromImg("/PD logo white line.svg", width < 768 ? 1.0 : 1.5);
      
      const particles: Particle[] = [];
      const side = Math.ceil(Math.sqrt(PARTICLE_COUNT));
      
      // Make grid a constrained square
      const squareSize = Math.min(width, height) * 0.7; // Framed in middle
      const startX = (width - squareSize) / 2;
      const startY = (height - squareSize) / 2;
      const cellSize = squareSize / side;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const c = i % side;
        const r = Math.floor(i / side);
        const baseX = startX + c * cellSize;
        const baseY = startY + r * cellSize;
        
        let lp = logoPixels.length > 0
           ? logoPixels[Math.floor(Math.random() * logoPixels.length)]
           : { x: width/2, y: height/2 };

        // Convert hover target to relative offset from center so it maps around cursor
        const hoverOffsetX = lp.x - (width / 2);
        const hoverOffsetY = lp.y - (height / 2);

        // Scroll mapping coordinates are the raw centered SVG pixels
        const scrollX = lp.x;
        const scrollY = lp.y - (height * 0.1); // slight shift up to leave room for text below

        particles.push({
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          baseX,
          baseY,
          scrollX,
          scrollY,
          hoverOffsetX,
          hoverOffsetY,
          hoverMagnet: 0,
        });
      }
      particlesRef.current = particles;
    };

    const render = () => {
      if (!ctx || !canvas) return;
      
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.fillRect(0, 0, width, height);

      const scrollProg = scrollProgRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;
      const radiusSq = (width * 0.2) * (width * 0.2); // wider grab area
      
      ctx.fillStyle = "white";
      ctx.beginPath();

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ensure particles flow towards the hover layout if mouse is close
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        
        if (dx * dx + dy * dy < radiusSq) {
          p.hoverMagnet = Math.min(1.0, p.hoverMagnet + 0.1);
        } else {
          p.hoverMagnet = Math.max(0, p.hoverMagnet - 0.05);
        }

        // Determine destination: 
        // 1. Mouse hover has absolute priority.
        // 2. Otherwise scroll progression.
        // 3. Otherwise base grid.
        
        let targetX = p.baseX;
        let targetY = p.baseY;

        if (p.hoverMagnet > 0) {
            // Morph into cursor-centered PD logo
            // Blended based on hoverMagnet
            const hoverTx = mouse.x + p.hoverOffsetX;
            const hoverTy = mouse.y + p.hoverOffsetY;
            targetX = p.baseX + (hoverTx - p.baseX) * p.hoverMagnet;
            targetY = p.baseY + (hoverTy - p.baseY) * p.hoverMagnet;
        } else if (scrollProg > 0) {
            // Morph into screen-centered bold main text
            targetX = p.baseX + (p.scrollX - p.baseX) * scrollProg;
            targetY = p.baseY + (p.scrollY - p.baseY) * scrollProg;
        }

        const pullX = targetX - p.x;
        const pullY = targetY - p.y;

        // Attractive Spring Force (removed repulsion)
        const spring = 0.08; 
        p.vx += pullX * spring;
        p.vy += pullY * spring;

        const friction = 0.75;
        p.vx *= friction;
        p.vy *= friction;

        p.x += p.vx;
        p.y += p.vy;

        const size = (p.hoverMagnet > 0.5 || scrollProg > 0.5) ? 1.5 : 2;
        ctx.moveTo(p.x, p.y);
        ctx.rect(p.x, p.y, size, size);
      }
      
      ctx.fill();
      requestRef.current = requestAnimationFrame(render);
    };

    initParticles().then(() => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
        requestRef.current = requestAnimationFrame(render);
    });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles(); 
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0 block cursor-crosshair"
        />

        {/* Fading in text block below the centered logo */}
        <motion.div
           className="absolute z-10 w-full max-w-4xl px-6 pointer-events-none flex flex-col items-center gap-8 translate-y-40"
           style={{ opacity: fullyFormed ? 1 : 0, transition: "opacity 0.6s ease" }}
        >
          <img src="/Bold Main Text.svg" alt="Bold Main Text" className="w-[85%] mx-auto drop-shadow-lg" />
          <img src="/regular sub text.svg" alt="Sub text" className="w-[70%] mx-auto opacity-90 drop-shadow-md" />
        </motion.div>

        {/* Start button layer */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: fullyFormed ? 1 : 0 }}
           transition={{ duration: 0.8 }}
           className="absolute bottom-16 sm:bottom-24 z-20"
        >
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-white text-black hover:bg-white/90 transition-colors px-10 py-5 rounded-full font-semibold text-lg tracking-wide"
          >
            Start a Project
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
