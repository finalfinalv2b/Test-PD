"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const offerings = [
  {
    code: "01",
    label: "STRATEGY",
    title: "THE VISION",
    description: "WE HUNT DOWN LUCRATIVE MARKET WHITESPACE AND OUTPACE THE COMPETITION. WE TRANSFORM AMBIGUOUS IDEAS INTO HIGHLY DE-RISKED, BULLETPROOF BLUEPRINTS.",
    features: ["FEASIBILITY MATRIX", "IP ROADMAPPING", "MVP DEPLOYMENT"],
  },
  {
    code: "02",
    label: "INDUSTRIAL",
    title: "FORM & FUNCTION",
    description: "WE DRAFT BEAUTIFUL, ERGONOMIC GEOMETRY ENGINEERED TO CAPTIVATE CONSUMERS. PURE BRAND EQUITY CONSTRUCTED THROUGH PHYSICAL TOUCHPOINTS.",
    features: ["CONCEPT GENERATION", "CMF PROTOCOLS", "UX ERGONOMICS"],
  },
  {
    code: "03",
    label: "ENGINEERING",
    title: "RAW GEOMETRY",
    description: "WE BRIDGE THE GAP BETWEEN PURE AESTHETICS AND PHYSICAL REALITY. OUR ENGINEERING GUARANTEES MAXIMUM PERFORMANCE WITHOUT SACRIFICING THE VISION.",
    features: ["MECHANICAL ARCHITECTURE", "FIRMWARE LOGIC", "DFM / DFA"],
  },
  {
    code: "04",
    label: "PRODUCTION",
    title: "MASS SCALE",
    description: "WE TRANSITION COMPLEX ENGINEERING DIRECTLY ONTO THE FACTORY FLOOR WITH AIRTIGHT QUALITY CONTROL AND UNCOMPROMISING SCALABILITY.",
    features: ["TOOLING FORMULATION", "QA / QC PATHWAYS", "ASSEMBLY AUTOMATION"],
  },
  {
    code: "05",
    label: "SOURCING",
    title: "THE NETWORK",
    description: "WE BUILD RESILIENT, COST-EFFECTIVE GLOBAL CHAINS. WE SECURE PREMIUM MATERIALS AND NEGOTIATE AGGRESSIVE MARGINS TO PROTECT YOUR BOTTOM LINE.",
    features: ["ELITE VENDOR AUDITS", "BOM OPTIMIZATION", "CONTRACT LOCKS"],
  },
  {
    code: "06",
    label: "LOGISTICS",
    title: "GLOBAL FREIGHT",
    description: "DELIVER AT SCALE WITH ABSOLUTE PRECISION. WE ORCHESTRATE ALL TRANS-CONTINENTAL SHIPPING AND WAREHOUSING. YOU NEVER MISS A LAUNCH DATE.",
    features: ["CUSTOMS & FREIGHT", "3PL INTEGRATION", "LAST-MILE DISTRIBUTION"],
  },
];

export function CoreOffering() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  return (
    <section className="bg-[#FAF9F6] border-b border-black">
      <div className="w-full">
        {/* HEADER BLOCK */}
        <div className="border-b border-black p-6 md:p-12 lg:p-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 bg-black text-[#FAF9F6]">
          <h2 className="text-5xl md:text-7xl lg:text-[7vw] font-black tracking-tighter uppercase leading-none">
            CORE <br/> STANDARDS.
          </h2>
          <p className="font-mono text-sm tracking-widest uppercase max-w-sm border-t border-[#FAF9F6]/20 pt-4">
            END-TO-END SUPREMACY. NO FRAGMENTATION. WE CONTROL THE ENTIRE BOARD.
          </p>
        </div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-8 md:p-12 border-b border-r border-black hover:bg-black transition-none cursor-crosshair h-[500px] flex flex-col justify-between"
              style={{
                borderRightWidth: ((i + 1) % 3 === 0) ? '0px' : '1px',
                // For mobile, we should probably keep borders consistent but since it's a grid, Tailwind's border utilities need strict manual enforcement if varying. 
                // Using standard CSS borders on all elements forms a thick overlapping grid which is very brutalist.
              }}
            >
              <div className="relative z-10 text-black group-hover:text-[#FAF9F6]">
                <div className="flex justify-between items-start mb-12 border-b border-current pb-4">
                  <span className="font-mono text-xs font-black tracking-widest uppercase">[{item.code}]</span>
                  <span className="font-mono text-xs font-black tracking-widest uppercase">{item.label}</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-black mb-6 tracking-tighter uppercase">{item.title}</h3>
                
                <p className="text-[14px] md:text-[15px] font-bold leading-relaxed tracking-tight mb-8 uppercase opacity-80">
                  {item.description}
                </p>

                <ul className="text-xs font-mono font-bold tracking-wider space-y-2 uppercase">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <span className="opacity-50">+</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
