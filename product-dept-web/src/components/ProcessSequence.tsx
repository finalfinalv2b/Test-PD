"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

const steps = [
  { 
    num: "01", title: "THE VISION", label: "PARAMETERS SET",
    description: "WE OUTLINE PRODUCT REQUIREMENTS, POSITIONING, AND STRUCTURAL CONSTRAINTS. ONLY IDEAS WITH GENUINE SCALABLE POTENTIAL MOVE FORWARD. NO EXCEPTIONS."
  },
  { 
    num: "02", title: "CONCEPT", label: "FORM DEFINED",
    description: "WE DRAFT FOUNDATIONAL GEOMETRY AND ESTABLISH THE AESTHETIC. MATERIAL VIABILITY IS PLANNED METICULOUSLY TO ENSURE THE DESIGN SURVIVES REALITY."
  },
  { 
    num: "03", title: "ENGINEERING", label: "TECHNICAL ARCHITECTURE",
    description: "THE SURFACE IS SYSTEMATICALLY CONVERTED INTO FUNCTIONAL CAD. EVERY INTERNAL COMPONENT IS HYPER-OPTIMIZED FOR STRUCTURAL INTEGRITY."
  },
  { 
    num: "04", title: "SOURCING", label: "SUPPLY CHAIN",
    description: "WE ACTIVATE OUR GLOBAL NETWORK TO SECURE ELITE VENDORS CAPABLE OF UNCOMPROMISING TOLERANCES. CRITICAL RAW MATERIAL STREAMS ARE LOCKED DOWN."
  },
  { 
    num: "05", title: "PRODUCTION", label: "MASS AT SCALE",
    description: "TOOLING IS VERIFIED ALONGSIDE AGGRESSIVE ON-THE-FLOOR QA/QC PROTOCOLS. ASSEMBLY PATHWAYS HIT OUTPUT QUOTAS WITHOUT SOFTENING THE BLUEPRINT."
  },
  { 
    num: "06", title: "DELIVERY", label: "GLOBAL LOGISTICS",
    description: "INVENTORY SEAMLESSLY TRANSFERS INTO UNIFIED FREIGHT CHANNELS. WE ORCHESTRATE ALL TRANS-CONTINENTAL SHIPPING TO HIT YOUR LAUNCH TIMELINES."
  },
];

function StepNode({ step, index, totalSteps, smoothProgress }: { step: typeof steps[0], index: number, totalSteps: number, smoothProgress: MotionValue<number> }) {
  const inputs = Array.from({ length: totalSteps }, (_, i) => i / (totalSteps - 1));
  const scaleMap = inputs.map((_, i) => (i === index ? 1.05 : 1.0)); // Reduced scaling slightly for rigid brutalism
  const scale = useTransform(smoothProgress, inputs, scaleMap);
  const bgParallaxX = useTransform(smoothProgress, [0, 1], ["20%", "-20%"]);

  return (
    <motion.div 
      style={{ scale, opacity: 1 }} 
      className="w-[350px] shrink-0 relative px-8 py-10 origin-center bg-[#FAF9F6] border-2 border-black flex flex-col justify-between h-[450px]"
    >
      <motion.div 
        style={{ x: bgParallaxX }} 
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 -z-10 text-[380px] font-black text-black opacity-[0.03] select-none pointer-events-none"
      >
        {index + 1}
      </motion.div>

      <div>
        <div className="border border-black px-4 py-2 inline-flex items-center justify-center font-mono text-sm tracking-widest text-black mb-10 bg-black/5 uppercase font-black">
          PHASE // {step.num}
        </div>
        <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-black mb-4 uppercase">
          {step.title}
        </h3>
        <p className="text-sm font-mono tracking-widest text-black/60 mb-6 uppercase border-b border-black/20 pb-4">
          [ {step.label} ]
        </p>
      </div>

      <p className="text-sm leading-relaxed text-black font-bold uppercase">
        {step.description}
      </p>
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
  const foregroundX = useTransform(smoothProgress, [0, 1], ["calc(0% + 50vw + -175px)", "calc(-100% + 50vw + 175px)"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FAF9F6] border-b border-black">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-start">
        
        {/* Absolute Parallax Setup Title */}
        <div className="absolute top-24 left-6 md:left-24 z-30 pointer-events-none">
          <h2 className="text-6xl md:text-[8vw] font-black tracking-tighter text-black uppercase leading-none mb-4">
            THE <br/> ROADMAP.
          </h2>
          <p className="font-mono text-sm tracking-widest uppercase border-t border-black pt-4 max-w-sm font-black">
            SIX PROTOCOLS. FROM CONCEPT TO SHELF.
          </p>
        </div>

        {/* Foreground Action Layer */}
        <motion.div style={{ x: foregroundX }} className="flex gap-16 md:gap-32 relative shrink-0 z-20 items-center justify-start mt-32 w-max">
          
          {/* Continuous thin geometric tracking line slicing the container perfectly through the nodes */}
          <div className="absolute top-1/2 left-0 w-[400vw] h-[2px] bg-black -translate-y-1/2 -z-10" />

          {steps.map((step, index) => (
            <StepNode 
              key={step.num}
              step={step}
              index={index}
              totalSteps={steps.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
}
