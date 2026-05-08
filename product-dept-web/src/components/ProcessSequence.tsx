"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  { 
    num: "01", title: "STRATEGY", label: "REQUIREMENTS SET",
    description: "We outline clear product requirements, positioning, and constraints, ensuring ideas have genuine, scalable potential."
  },
  { 
    num: "02", title: "INDUSTRIAL DESIGN", label: "FORM DEFINED",
    description: "We draft foundational geometry and establish the aesthetic, planning material viability to ensure the design is ready for the real world."
  },
  { 
    num: "03", title: "MECHANICAL ENGINEERING", label: "CAD ARCHITECTURE",
    description: "The surface is converted into functional CAD. Every internal component is carefully optimized for structural integrity."
  },
  { 
    num: "04", title: "SOURCING", label: "VENDOR SELECTION",
    description: "We leverage our global network to secure reliable vendors capable of high-quality manufacturing, establishing clear material streams."
  },
  { 
    num: "05", title: "MANUFACTURING", label: "MASS PRODUCTION",
    description: "Tooling is verified alongside strict QA/QC protocols, establishing seamless assembly pathways to meet your deadlines."
  },
  { 
    num: "06", title: "LOGISTICS", label: "GLOBAL DELIVERY",
    description: "Inventory transfers smoothly into freight channels. We orchestrate all shipping so you can confidently hit your launch timelines."
  },
];

function StepNode({ step, index }: { step: typeof steps[0], index: number }) {
  return (
    <div className="w-full relative px-6 md:px-10 py-6 md:py-8 bg-[#FAF9F6] border-2 border-black flex flex-col h-[450px] shadow-[8px_8px_0px_rgba(0,0,0,0.2)]">
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 text-[200px] md:text-[300px] font-black text-black opacity-[0.03] select-none pointer-events-none">
        {index + 1}
      </div>

      <div className="border-b border-black/20 pb-4 mb-6">
        <h3 className="text-2xl md:text-[32px] md:leading-[1.1] font-header font-black tracking-[0.05em] text-black uppercase">
          {step.title}
        </h3>
        <p className="text-sm font-sans font-light tracking-widest text-[#F41C06] mt-2 uppercase">
          [ {step.label} ]
        </p>
      </div>

      <div className="flex-1 flex items-start mt-4">
        <p className="text-[25px] md:text-[28px] leading-relaxed text-black font-sans font-light max-w-3xl">
          {step.description}
        </p>
      </div>
    </div>
  );
}

function AnimatedCard({ step, index, smoothProgress, windowHeight }: any) {
  // Gap of 110px ensures the title (which is ~100px tall) is ALWAYS visible behind the next card!
  const gap = 110;
  const targetY = index * gap;
  
  // Start off-screen (we use a large constant relative to screen size)
  const startY = windowHeight * 1.5;

  // Cards cascade in: 
  // Card 0: 0.00 -> 0.20
  // Card 1: 0.08 -> 0.28
  // ...
  // Card 5: 0.40 -> 0.60
  const y = useTransform(
    smoothProgress,
    [0, index * 0.08, index * 0.08 + 0.2, 1],
    [startY, startY, targetY, targetY]
  );

  return (
    <motion.div 
      className="absolute w-full origin-top"
      style={{ y, zIndex: 20 + index }}
    >
      <StepNode step={step} index={index} />
    </motion.div>
  );
}

export function ProcessSequence() {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 1, restDelta: 0.001 });

  const [windowHeight, setWindowHeight] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [deckScale, setDeckScale] = useState(1);
  const [headerHeight, setHeaderHeight] = useState(208);
  
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setWindowHeight(window.innerHeight);
      
      const hh = mobile ? 120 : 180;
      setHeaderHeight(hh);
      
      // Available space MUST subtract the 72px fixed top navigation, and the black header height
      const availableSpace = window.innerHeight - 72 - hh;
      const deckNaturalHeight = 5 * 110 + 450; // 1000px
      
      // We want a small top gap (40px) and safe bottom gap (40px) = 80px extra space
      const requiredSpace = deckNaturalHeight + 80; 
      
      // Scale down to fit perfectly. Cap at 0.85
      const scale = Math.min(0.85, availableSpace / requiredSpace);
      setDeckScale(scale);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 0.0 - 0.6: Cards Stack
  // 0.6 - 0.7: Lock & Freeze (Snap moment)
  // 0.7 - 0.9: Horizontal Shift
  const shiftProgress = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);
  
  // Align left edge to exactly match the top gap (40px desktop, 24px mobile)
  const stackX = useTransform(shiftProgress, (v) => {
    const margin = isMobile ? 24 : 40;
    return `calc(${v * margin}px - ${v * 50}vw + calc(${v * 50}% * ${deckScale}))`;
  });
  
  // 0.75 - 0.95: Text Reveal
  const quoteOpacity = useTransform(smoothProgress, [0.75, 0.95], [0, 1]);
  const quoteY = useTransform(smoothProgress, [0.75, 0.95], [20, 0]);
  const quoteFilter = useTransform(smoothProgress, [0.75, 0.95], ["blur(8px)", "blur(0px)"]);

  // 0.0 - 0.6: Background Shapes
  const circleX = useTransform(smoothProgress, [0, 0.6], ["calc(-150vh - 50vw)", "calc(-150vh - 3.125vw)"]);
  const boxX = useTransform(smoothProgress, [0, 0.6], ["53.125vw", "3.125vw"]);

  return (
    <section ref={targetRef} className="relative bg-[#FAF9F6] border-b border-black h-[600vh]">
      {/* PINNED RIG */}
      {/* Added pt-[72px] so the rig clears the fixed Navigation */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center pt-[72px]">
        
        {/* CINEMATIC BACKGROUND LAYER */}
        <motion.div 
          className="absolute inset-0 w-full h-full pointer-events-none z-0 mt-[72px]"
          style={{ x: stackX }}
        >
          {/* RED CIRCLE */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[150vh] h-[150vh]"
            style={{ x: circleX, y: "-50%" }}
          >
            <img src="/red-circle.svg" alt="" className="w-full h-full object-contain" />
          </motion.div>

          {/* RED BOX */}
          <motion.div 
            className="absolute top-1/2 left-1/2 w-[150vh] h-[150vh]"
            style={{ x: boxX, y: "-50%" }}
          >
            <img src="/red-box.svg" alt="" className="w-full h-full object-contain" />
          </motion.div>
        </motion.div>

        {/* HEADER BLOCK */}
        <div className="shrink-0 border-b border-black p-4 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-black text-[#FAF9F6] w-full z-40 relative">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            FULL-STACK <br className="hidden md:block"/> PROCESS.
          </h2>
          <p className="font-sans font-light text-[10px] md:text-xs tracking-widest max-w-xs md:max-w-sm border-t border-[#F41C06] text-[#F41C06] pt-2">
            Six steps. From initial concept to finished product.
          </p>
        </div>

        {/* TWO COLUMN LAYOUT CONTAINER */}
        <div className="flex-1 w-full relative pointer-events-none z-20 flex flex-col items-center justify-start pt-6 md:pt-10">
          
          {/* LEFT COLUMN: THE DECK WRAPPER */}
          {/* origin-top ensures it scales down from the top edge, maintaining the exact pt-10 gap! */}
          <motion.div 
            className="relative w-full max-w-5xl pointer-events-auto origin-top"
            style={{ 
              x: stackX,
              scale: deckScale,
              height: 1000 // 5 gaps of 110 + 450 card = 1000px natural height
            }}
          >
            <div className="absolute top-0 left-1/2 w-[2px] h-full bg-black -translate-x-1/2 -z-10 opacity-20" />

            {steps.map((step, index) => (
              <AnimatedCard 
                key={step.num}
                step={step} 
                index={index} 
                smoothProgress={smoothProgress} 
                windowHeight={windowHeight} 
              />
            ))}
          </motion.div>

          {/* RIGHT COLUMN: THE TEXT PANEL */}
          <motion.div 
            className="absolute bottom-8 md:bottom-auto md:top-10 left-[5%] md:left-[40vw] w-[90%] md:w-[55vw] px-4 md:px-8 z-30 pointer-events-none flex flex-col items-center md:items-start justify-start"
            style={{ opacity: quoteOpacity, y: quoteY, filter: quoteFilter }}
          >
            <div className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-header tracking-[0.05em] text-black leading-[1.05] uppercase text-center md:text-left drop-shadow-2xl">
              WE BRING RIGOR TO CREATIVITY, <br />
              CLARITY TO COMPLEXITY, <br />
              AND MOMENTUM TO VISION.
            </div>

            <div className="w-full mt-12 md:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {[
                { metric: "25+", label: "Years Experience" },
                { metric: "8", label: "Countries Operated" },
                { metric: "Global", label: "Vendor Network" },
                { metric: "100%", label: "Supply Chain Visibility" }
              ].map((item, i) => (
                <div key={item.label} className="flex flex-col items-center md:items-start">
                  <div className="text-5xl md:text-6xl lg:text-7xl font-header tracking-tighter text-black mb-4 md:mb-6">
                    {item.metric}
                  </div>
                  <div className="text-[10px] md:text-[11px] font-sans font-bold tracking-widest uppercase text-black">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
