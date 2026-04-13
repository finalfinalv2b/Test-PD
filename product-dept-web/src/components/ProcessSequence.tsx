"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { num: "01", title: "Idea", label: "Define the Vision" },
  { num: "02", title: "Concept", label: "Design & Strategy" },
  { num: "03", title: "Engineering", label: "Technical Architecture" },
  { num: "04", title: "Sourcing", label: "Supply Chain Setup" },
  { num: "05", title: "Production", label: "Manufacturing at Scale" },
  { num: "06", title: "Delivery", label: "Global Logistics" },
];

export function ProcessSequence() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Moves the content left as the user scrolls down, simulating horizontal scroll
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-background">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        <div className="px-6 md:px-20 shrink-0 w-full max-w-2xl absolute top-32 left-0 z-10">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-charcoal mb-4">
            The Process
          </h2>
          <p className="text-xl text-mid-gray shrink-0">
            A frictionless, six-step journey from early concept to final unit on the shelf.
          </p>
        </div>

        <motion.div style={{ x }} className="flex gap-20 px-6 md:px-32 mt-32 relative">
          
          {/* Continuous thin line connecting steps */}
          <div className="absolute top-1/2 left-0 w-[200vw] h-[1px] bg-charcoal/20 -translate-y-1/2" />

          {steps.map((step, index) => (
            <div key={step.num} className="w-[300px] shrink-0 relative bg-background px-4 py-8">
              <div className="w-12 h-12 rounded-full border border-charcoal flex items-center justify-center font-mono text-sm tracking-widest text-charcoal mb-8 bg-white relative z-10">
                {step.num}
              </div>
              <h3 className="text-3xl font-bold tracking-tight text-charcoal mb-3">
                {step.title}
              </h3>
              <p className="text-mid-gray tracking-wide">
                {step.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
