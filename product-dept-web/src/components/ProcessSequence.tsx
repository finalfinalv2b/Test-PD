"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const steps = [
  { 
    num: "01", title: "STRATEGY", label: "REQUIREMENTS SET",
    description: "We outline clear product requirements, positioning, and constraints, ensuring ideas have genuine, scalable potential.",
    features: ["FEASIBILITY MATRIX", "IP ROADMAPPING", "MVP DEPLOYMENT"]
  },
  { 
    num: "02", title: "INDUSTRIAL DESIGN", label: "FORM DEFINED",
    description: "We draft foundational geometry and establish the aesthetic, planning material viability to ensure the design is ready for the real world.",
    features: ["CONCEPT GENERATION", "CMF PROTOCOLS", "UX ERGONOMICS"]
  },
  { 
    num: "03", title: "MECHANICAL ENGINEERING", label: "CAD ARCHITECTURE",
    description: "The surface is converted into functional CAD. Every internal component is carefully optimized for structural integrity.",
    features: ["MECHANICAL ARCHITECTURE", "HARDWARE LOGIC", "DESIGNED FOR MANUFACTURING / DESIGNED FOR ASSEMBLY"]
  },
  { 
    num: "04", title: "SOURCING", label: "VENDOR SELECTION",
    description: "We leverage our global network to secure reliable vendors capable of high-quality manufacturing, establishing clear material streams.",
    features: ["VENDOR AUDITS", "BOM OPTIMIZATION", "CONTRACT NEGOTIATION"]
  },
  { 
    num: "05", title: "MANUFACTURING", label: "MASS PRODUCTION",
    description: "Tooling is verified alongside strict QA/QC protocols, establishing seamless assembly pathways to meet your deadlines.",
    features: ["TOOLING FORMULATION", "QA / QC PATHWAYS", "ASSEMBLY AUTOMATION"]
  },
  { 
    num: "06", title: "LOGISTICS", label: "GLOBAL DELIVERY",
    description: "Inventory transfers smoothly into freight channels. We orchestrate all shipping so you can confidently hit your launch timelines.",
    features: ["CUSTOMS & FREIGHT", "3PL INTEGRATION", "LAST-MILE DISTRIBUTION"]
  },
];

function StepNode({ step, index, isActive = false }: { step: typeof steps[0], index: number, isActive?: boolean }) {
  return (
    <div className={`w-full relative overflow-hidden px-6 md:px-10 py-6 md:py-8 border flex flex-col h-[450px] transition-colors duration-300 ${isActive ? 'bg-black border-white' : 'bg-[#FFFFFF] border-black'}`}>

      <div 
        className={`absolute top-1/2 right-[-2%] md:right-0 -translate-y-1/2 z-0 text-[clamp(250px,35vw,500px)] select-none pointer-events-none transition-colors duration-300 ${isActive ? 'text-[#1A1A1A]' : 'text-[#F5F5F5]'}`}
        style={{ fontFamily: 'var(--font-elza)', fontWeight: 900, lineHeight: 0.8 }}
      >
        {index + 1}
      </div>

      <div className={`relative z-10 flex justify-between items-start mb-4 border-b pb-2 transition-colors duration-300 ${isActive ? 'border-[#333333]' : 'border-black'}`}>
        <span className={`font-sans font-light text-2xl tracking-widest uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}>[{String(index + 1).padStart(2, '0')}]</span>
        <span 
          className="tracking-[0.05em] text-xl uppercase text-[#F41C06] truncate ml-2"
          style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
        >
          {step.label}
        </span>
      </div>

      <h3 
        className={`relative z-10 text-[clamp(1.56rem,3.25vw,2.6rem)] leading-[1.1] tracking-tighter uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}
        style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
      >
        {step.title}
      </h3>

      <div className="relative z-10 flex-1 flex flex-col justify-start mt-4">
        <p className={`text-[clamp(1rem,2vw,1.75rem)] leading-relaxed font-sans font-light max-w-3xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}>
          {step.description}
        </p>

        <ul className="mt-4 flex flex-col gap-2">
          {step.features.map((feature, i) => (
            <li key={i} className={`text-[clamp(1rem,1.5vw,1.4rem)] font-sans font-medium tracking-widest uppercase flex items-center gap-3 transition-colors duration-300 ${isActive ? 'text-white' : 'text-black'}`}>
              <span className="text-[#F41C06]">+</span> {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function AnimatedCard({ step, index, smoothProgress, windowHeight, deckScale }: any) {
  const [isShifted, setIsShifted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    return smoothProgress.on("change", (v: number) => {
      // Enable hover effects only after the cards have started moving to the left (progress > 0.75)
      if (v > 0.75 && !isShifted) setIsShifted(true);
      else if (v <= 0.75 && isShifted) setIsShifted(false);
    });
  }, [smoothProgress, isShifted]);

  // Gap of 140px ensures the title is ALWAYS visible behind the next card!
  const gap = 140;
  const targetY = index * gap;
  
  // Start just below the viewport so they appear immediately upon scroll, accounting for the container scale!
  const startY = (windowHeight / deckScale) + 100;

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

  const baseZIndex = 20 + index;
  const currentZIndex = isHovered && isShifted ? 50 : baseZIndex;

  return (
    <motion.div 
      className="absolute w-full origin-top"
      style={{ y, zIndex: currentZIndex }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <motion.div
        animate={isHovered && isShifted ? { y: -16, scale: 1.02 } : { y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="w-full h-full"
      >
        <StepNode step={step} index={index} isActive={isHovered && isShifted} />
      </motion.div>
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
  const [textPanelWidth, setTextPanelWidth] = useState(800);
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
      const deckNaturalHeight = 5 * 140 + 450; // 1150px
      
      // We want a small top gap (40px) and a massive safe bottom margin so it NEVER crops on any screen ratio (even with mobile browser UI)
      const safeBuffer = mobile ? 450 : 350;
      const requiredSpace = deckNaturalHeight + safeBuffer; 
      
      // Scale down to fit perfectly. Cap at 0.85
      const scale = Math.min(0.85, availableSpace / requiredSpace);
      setDeckScale(scale);
      
      // Calculate dynamic max width for the right text panel so it perfectly fills the space without overlapping the cards
      const cardsWidth = 1500;
      const marginSpace = mobile ? 48 : 80;
      const gapBetween = 80;
      const maxTextWidth = (window.innerWidth - marginSpace) / scale - cardsWidth - gapBetween;
      const mobileWidth = (window.innerWidth - 48) / scale;
      
      setTextPanelWidth(mobile ? mobileWidth : Math.min(1800, Math.max(400, maxTextWidth)));
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
    <section ref={targetRef} className="relative bg-[#FFFFFF] border-b border-black h-[600vh]">
      {/* PINNED RIG */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center">
        
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
        {/* Added dynamic top padding to clear Navigation while staying extremely compact on small screens */}
        <div className="shrink-0 border-b border-black p-[clamp(0.5rem,2vw,1.5rem)] pt-[calc(clamp(0.5rem,2vw,1.5rem)+72px)] flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-black text-[#FFFFFF] w-full z-40 relative">
          <h2 className="text-[clamp(1.5rem,3vw,3.5rem)] font-black tracking-tighter uppercase leading-none">
            FULL-STACK <br className="hidden md:block"/> PROCESS.
          </h2>
          <p className="font-sans font-light text-[10px] md:text-xs tracking-widest max-w-xs md:max-w-sm border-t border-[#ffb000] text-[#ffb000] pt-2">
            Six steps. From initial concept to finished product.
          </p>
        </div>

        {/* TWO COLUMN LAYOUT CONTAINER */}
        <div className="flex-1 w-full relative pointer-events-none z-20 flex flex-col items-center justify-start pt-6 md:pt-10">
          
          {/* LEFT COLUMN: THE DECK WRAPPER */}
          {/* origin-top ensures it scales down from the top edge, maintaining the exact pt-10 gap! */}
          <motion.div 
            className="relative w-full max-w-[1500px] pointer-events-auto origin-top"
            style={{ 
              x: stackX,
              scale: deckScale,
              height: 1150 // 5 gaps of 140 + 450 card = 1150px natural height
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
                deckScale={deckScale}
              />
            ))}
          </motion.div>

          {/* RIGHT COLUMN: THE TEXT PANEL */}
          <motion.div 
            className="absolute top-24 md:top-10 z-30 pointer-events-none flex flex-col items-center md:items-start justify-between origin-top md:origin-top-right pb-10"
            style={{ 
              right: isMobile ? 24 : 40,
              width: textPanelWidth,
              opacity: quoteOpacity, y: quoteY, filter: quoteFilter, scale: deckScale, height: 1150 
            }}
          >
            <div className="text-[clamp(3rem,8vw,8.75rem)] font-header tracking-tighter text-white leading-[0.95] uppercase text-center md:text-left drop-shadow-2xl">
              WE BRING RIGOR TO CREATIVITY, <br />
              CLARITY TO COMPLEXITY, <br />
              AND MOMENTUM TO VISION.
            </div>

            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-24">
              {[
                { metric: "25+", label: "Years Experience" },
                { metric: "8", label: "Countries Operated" },
                { metric: "Global", label: "Vendor Network" },
                { metric: "100%", label: "Supply Chain Visibility" }
              ].map((item, i) => (
                <div key={item.label} className="flex flex-col items-center md:items-start text-center md:text-left">
                  <div className="text-[clamp(3.5rem,8vw,6.875rem)] font-header tracking-tighter text-black mb-2 md:mb-6 leading-none">
                    {item.metric}
                  </div>
                  <div className="text-lg md:text-xl lg:text-2xl font-sans font-bold tracking-widest uppercase text-white leading-snug">
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
