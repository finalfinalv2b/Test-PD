/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const steps = [
  { 
    num: "01", title: "STRATEGY", label: "REQUIREMENTS SET",
    description: "We outline clear product requirements, positioning, and goals, ensuring your ideas have a clear, successful path to market.",
    features: ["PRODUCT ROADMAP", "MARKET POSITIONING", "SUCCESS PLANNING"]
  },
  { 
    num: "02", title: "INDUSTRIAL DESIGN", label: "FORM DEFINED",
    description: "We create premium visuals and comfortable form factors that combine beautiful design with practical usability.",
    features: ["CONCEPT STYLING", "USER EXPERIENCE", "MATERIAL SELECTION"]
  },
  { 
    num: "03", title: "ENGINEERING", label: "CAD ARCHITECTURE",
    description: "We turn design concepts into fully functional, high-performance blueprints ready for production.",
    features: ["MECHANICAL DESIGN", "ELECTRONICS", "PROTOTYPE TESTING"]
  },
  { 
    num: "04", title: "SOURCING", label: "VENDOR SELECTION",
    description: "We connect you with trusted global manufacturers to secure the best pricing and quality for your product.",
    features: ["FACTORY SOURCING", "COST MANAGEMENT", "SUPPLY REDUNDANCY"]
  },
  { 
    num: "05", title: "MANUFACTURING", label: "MASS PRODUCTION",
    description: "We oversee the production lines and implement strict quality checks to guarantee flawless outcomes.",
    features: ["QUALITY CONTROL", "PRODUCTION MANAGEMENT", "ASSEMBLY PLANNING"]
  },
  { 
    num: "06", title: "LOGISTICS", label: "GLOBAL DELIVERY",
    description: "We coordinate shipping and customs to deliver your finished products safely to your door.",
    features: ["SHIPPING COORDINATION", "CUSTOMS CLEARANCE", "FULFILLMENT INTEGRATION"]
  },
];

export function ProcessSequence() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section className="relative bg-[#FFFFFF] border-b border-black w-full py-24 scroll-mt-20">
      {/* HEADER BLOCK */}
      <div className="max-w-6xl mx-auto px-6 mb-16 border-b border-black/10 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-transparent text-black">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none text-black">
          Full-Stack Process
        </h2>
        <p className="font-sans font-light text-xs tracking-widest max-w-xs md:max-w-sm border-t border-[#F41C06] text-[#F41C06] pt-2">
          Six steps. From initial concept to finished product.
        </p>
      </div>

      {/* ACCORDION LIST */}
      <div className="max-w-6xl mx-auto px-6 flex flex-col">
        {steps.map((step, index) => {
          const isOpen = expandedIndex === index;
          return (
            <motion.div
              key={step.num}
              id={`process-step-home-${index}`}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ type: "spring", stiffness: 80, damping: 15 }}
              className="border-b border-black/10 last:border-b-0 w-full"
            >
              <button
                onClick={() => {
                  const isCurrentlyOpen = expandedIndex === index;
                  setExpandedIndex(isCurrentlyOpen ? null : index);
                  if (!isCurrentlyOpen) {
                    setTimeout(() => {
                      const element = document.getElementById(`process-step-home-${index}`);
                      if (element) {
                        element.scrollIntoView({ behavior: "smooth", block: "center" });
                      }
                    }, 200);
                  }
                }}
                className="w-full text-left py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.01] transition-all px-4 rounded-lg group select-none border-none outline-none bg-transparent"
              >
                <div className="flex items-baseline gap-4 md:gap-6">
                  <span className="font-sans font-light text-sm text-black/40">[{step.num}]</span>
                  <span className="font-header font-black text-2xl md:text-4xl text-black tracking-tight group-hover:text-[#F41C06] transition-colors duration-300 uppercase">
                    {step.title}
                  </span>
                </div>
                <div className="flex items-center gap-6 self-end md:self-auto">
                  <span className="font-header font-black text-xs text-[#F41C06] uppercase tracking-wider hidden sm:inline">
                    {step.label}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 135 : 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-sm text-black group-hover:border-[#F41C06]/35 group-hover:text-[#F41C06] transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-12 pt-4 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 border-t border-black/5 mt-2">
                      {/* Left Column: Description */}
                      <div className="flex flex-col justify-between">
                        <div>
                          <p className="font-sans font-light text-base md:text-lg text-black/75 leading-relaxed max-w-xl">
                            {step.description}
                          </p>
                        </div>
                      </div>

                      {/* Right Column: Capabilities */}
                      <div className="flex flex-col justify-center lg:pl-8 lg:border-l border-black/10">
                        <h4 className="font-header font-black text-xs text-[#F41C06] tracking-widest uppercase mb-6">
                          Detailed Capabilities
                        </h4>
                        <ul className="flex flex-col gap-4">
                          {step.features.map((feat, fIndex) => (
                            <motion.li
                              key={feat}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: fIndex * 0.05 + 0.1 }}
                              className="flex items-center gap-3 text-sm font-semibold tracking-wider text-black/75 uppercase"
                            >
                              <span className="text-[#F41C06] font-bold">+</span>
                              <span>{feat}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
