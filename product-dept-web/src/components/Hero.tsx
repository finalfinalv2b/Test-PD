"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from 'next/link';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Bind scroll progression to the host container 
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Inject a physics spring to totally smooth out the user's scroll wheel inputs
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 20, 
    mass: 1, 
    restDelta: 0.001 
  });

  // Pre-load the frames immediately for high performance scrubbing
  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const images: HTMLImageElement[] = [];
    
    for (let i = 1; i <= 240; i++) {
        const img = new Image();
        img.src = `/frames/ezgif-frame-${i.toString().padStart(3, '0')}.jpg`;
        images.push(img);
    }
    
    imagesRef.current = images;

    // Draw first frame immediately when it loads to avoid blank canvas
    images[0].onload = () => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            if (ctx) {
                // Set canvas to the native resolution of the frames for crispness
                canvasRef.current.width = images[0].naturalWidth || 1920;
                canvasRef.current.height = images[0].naturalHeight || 1080;
                ctx.drawImage(images[0], 0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        }
    };
  }, []);

  // Map the smooth scroll 0-0.85 directly to frames 1-240
  // This ensures the animation finishes playing before fading out entirely.
  const frameIndex = useTransform(smoothProgress, [0, 0.85], [1, 240]);
  
  // Tie the canvas drawing logic tightly to framer-motion changes
  useMotionValueEvent(frameIndex, "change", (latest) => {
    const ctx = canvasRef.current?.getContext('2d');
    const images = imagesRef.current;
    if (!ctx || !canvasRef.current || images.length === 0) return;

    const index = Math.min(239, Math.max(0, Math.round(latest) - 1));
    const img = images[index];

    // Only draw the image if the browser has finished loading it
    if (img && img.complete) {
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  });

  // We only begin the fade out AFTER 85% progress to guarantee full animation playback.
  const canvasOpacity = useTransform(smoothProgress, [0, 0.85, 1], [1, 1, 0]);
  // Text fades out a little early, but not the button.
  const textOpacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-black border-b border-black">
      
      {/* Sticky container that pins the interface while the outer section scrolls */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
        {/* SCRUBBING SEQUENCED IMAGES (CANVAS LAYER) */}
        <motion.div 
          style={{ opacity: canvasOpacity }} 
          className="absolute inset-0 w-full h-full z-0 pointer-events-none flex items-center justify-center"
        >
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* BRUTALIST STRUCTURAL METADATA OVERLAYS */}
        <div className="absolute top-6 left-6 font-mono text-xs font-black tracking-widest text-[#FAF9F6] z-10 select-none drop-shadow-sm">
          SEC_01 // INTRO
        </div>
        <div className="absolute top-6 right-6 font-mono text-xs font-black tracking-widest text-[#FAF9F6] z-10 select-none drop-shadow-sm">
          HQ_NEW_YORK
        </div>
        
        {/* RAW BRUTALIST COPY */}
        <motion.div
           className="absolute z-10 w-full px-6 md:px-12 pointer-events-none flex flex-col items-center gap-1 -translate-y-16 mx-auto justify-center"
        >
          <h1 className="text-6xl sm:text-7xl md:text-[9vw] font-black tracking-tighter text-white uppercase leading-none drop-shadow-lg text-center">
            WE BUILD <br/>
            PHYSICAL <br/>
            PRODUCTS.
          </h1>
          <p className="mt-8 font-mono text-[#FAF9F6] text-sm md:text-lg tracking-widest uppercase text-center max-w-xl border-t border-[#FAF9F6]/50 pt-4 drop-shadow-md">
            NO BULLSHIT. NO DELAYS.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
