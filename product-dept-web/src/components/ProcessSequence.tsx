"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

const steps = [
  { 
    num: "01", title: "Idea", label: "Define the Vision",
    description: "We rigorously outline product requirements, market positioning, and structural constraints. This guarantees only ideas with genuine mechanical and scalable potential move forward into active development."
  },
  { 
    num: "02", title: "Concept", label: "Design & Strategy",
    description: "Our industrial designers draft foundational geometry, establishing the core aesthetic and ergonomic narrative. Material viability is planned meticulously to ensure the vision survives physical realization."
  },
  { 
    num: "03", title: "Engineering", label: "Technical Architecture",
    description: "The conceptual surface is systematically converted into detailed mechanical architecture and functional CAD. Every internal component is hyper-optimized for structural integrity and mass manufacturability."
  },
  { 
    num: "04", title: "Sourcing", label: "Supply Chain Setup",
    description: "We ping our global auditing network to secure elite vendors capable of executing uncompromising tolerances. Accurate pricing limits are structured and critical raw material streams are locked down."
  },
  { 
    num: "05", title: "Production", label: "Manufacturing at Scale",
    description: "Production tooling is verified alongside aggressive on-the-floor QA/QC protocols. Assembly pathways are rapidly activated to hit demanding output quotas without ever softening the original blueprint."
  },
  { 
    num: "06", title: "Delivery", label: "Global Logistics",
    description: "Constructed inventory seamlessly transfers immediately into unified freight channels. We expertly orchestrate all trans-continental shipping and 3PL distributions required to hit demanding launch timelines."
  },
];

function StepNode({ step, index, totalSteps, smoothProgress }: { step: typeof steps[0], index: number, totalSteps: number, smoothProgress: MotionValue<number> }) {
  // Generate a strictly ascending array covering all progression steps exactly across [0.0 - 1.0] bounds.
  // This satisfies the Web Animations API (WAAPI) requirement for monotonically non-decreasing offsets.
  const inputs = Array.from({ length: totalSteps }, (_, i) => i / (totalSteps - 1));
  
  // Map index tracking so the target scale peaks actively only when reaching the matching input sequence.
  const scaleMap = inputs.map((_, i) => (i === index ? 1.25 : 1.0));

  const scale = useTransform(smoothProgress, inputs, scaleMap);

  // Independent inner parallax generating physical depth without losing alignment
  const bgParallaxX = useTransform(smoothProgress, [0, 1], ["50%", "-50%"]);

  return (
    <motion.div 
      style={{ scale, opacity: 1 }} 
      className="w-[300px] sm:w-[350px] shrink-0 relative px-4 py-8 origin-left md:origin-center bg-transparent backdrop-blur-sm"
    >
      {/* Massive tethered background watermark with dedicated parallax mapping */}
      <motion.div 
        style={{ x: bgParallaxX }} 
        className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-[30%] -z-10 text-[260px] md:text-[340px] font-black text-black opacity-[0.03] select-none pointer-events-none"
      >
        {index + 1}
      </motion.div>
      <div className="w-16 h-16 rounded-full border border-black/30 flex items-center justify-center font-mono text-base tracking-widest text-black mb-8 bg-black/5 relative z-10 shadow-sm transition-colors group-hover:bg-black group-hover:text-white">
        {step.num}
      </div>
      <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-4">
        {step.title}
      </h3>
      <p className="text-lg md:text-xl text-black tracking-wide mb-4 font-semibold">
        {step.label}
      </p>
      <p className="text-[15px] leading-relaxed text-black font-medium">
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

  // Inject real physical mass algorithm into the timeline bounds to totally eliminate scrolling/flicking snaps
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, mass: 1, restDelta: 0.001 });

  // Natively align coordinates using CSS algebraic offset so the sequence perfectly aligns the first and last frames to the active viewport center.
  // Framer Motion strictly requires identical string formats for interpolation (`0%` is deeply required here).
  const foregroundX = useTransform(smoothProgress, [0, 1], ["calc(0% + 50vw + -160px)", "calc(-100% + 50vw + 160px)"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-[#FDFDFD]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-start">
        
        {/* Absolute Parallax Setup Title */}
        <div className="absolute top-24 md:top-36 left-6 md:left-24 z-30 pointer-events-none">
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-charcoal mb-4 drop-shadow-sm">
            Process.
          </h2>
          <p className="text-xl tracking-tight text-mid-gray shrink-0 max-w-sm">
            A frictionless, six-step journey mapped perfectly from early concept to final unit on the shelf.
          </p>
        </div>

        {/* Foreground Action Layer (1.0x Parallax) */}
        <motion.div style={{ x: foregroundX }} className="flex gap-24 md:gap-40 relative shrink-0 z-20 items-center justify-start mt-32 w-max">
          
          {/* Continuous thin geometric tracking line slicing the container perfectly through the nodes */}
          <div className="absolute top-[80px] left-0 w-[400vw] h-[1px] bg-gradient-to-r from-transparent via-charcoal/20 to-transparent z-0" />

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

        {/* Lighting Glare overlay for cinematic fade out on edges */}
        <div className="absolute inset-y-0 left-0 w-[15vw] bg-gradient-to-r from-[#FDFDFD] to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-[15vw] bg-gradient-to-l from-[#FDFDFD] to-transparent pointer-events-none z-30" />

      </div>
    </section>
  );
}
