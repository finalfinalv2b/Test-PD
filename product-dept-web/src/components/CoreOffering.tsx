"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const offerings = [
  {
    code: "01",
    label: "STRATEGY",
    title: "THE VISION",
    description: "We identify clear market opportunities and map out constraints early. By establishing rigid requirements, we turn your ideas into focused, scalable plans.",
    features: ["FEASIBILITY MATRIX", "IP ROADMAPPING", "MVP DEPLOYMENT"],
  },
  {
    code: "02",
    label: "INDUSTRIAL",
    title: "FORM & FUNCTION",
    description: "We design intuitive, ergonomic products that resonate with your customers. Our focus is on bringing your vision to life through thoughtful physical touchpoints.",
    features: ["CONCEPT GENERATION", "CMF PROTOCOLS", "UX ERGONOMICS"],
  },
  {
    code: "03",
    label: "ENGINEERING",
    title: "RAW GEOMETRY",
    description: "We bridge the gap between creative design and physical reality, ensuring reliable performance while carefully preserving the original aesthetic.",
    features: ["MECHANICAL ARCHITECTURE", "FIRMWARE LOGIC", "DFM / DFA"],
  },
  {
    code: "04",
    label: "PRODUCTION",
    title: "MASS SCALE",
    description: "We transition your product to the factory floor with precision and care, maintaining strict quality control to deliver high-quality outcomes at scale.",
    features: ["TOOLING FORMULATION", "QA / QC PATHWAYS", "ASSEMBLY AUTOMATION"],
  },
  {
    code: "05",
    label: "SOURCING",
    title: "THE NETWORK",
    description: "We build resilient, transparent supply chains. By leveraging our global network, we secure the right materials to meet your business goals.",
    features: ["VENDOR AUDITS", "BOM OPTIMIZATION", "CONTRACT NEGOTIATION"],
  },
  {
    code: "06",
    label: "LOGISTICS",
    title: "GLOBAL FREIGHT",
    description: "We orchestrate global shipping and fulfillment with close attention to detail, ensuring your product arrives on time, every time.",
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
    <section className="bg-[#FFFFFF] border-b border-black w-full min-h-[max(800px,calc(100vh-152px))] flex flex-col">
      <div className="w-full flex-1 flex flex-col h-full overflow-hidden">
        {/* HEADER BLOCK */}
        <div className="shrink-0 border-b border-black p-4 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-2 bg-black text-[#FFFFFF]">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            CORE <br className="hidden md:block"/> STANDARDS.
          </h2>
          <p className="font-sans font-light text-[10px] md:text-xs tracking-widest max-w-xs md:max-w-sm border-t border-[#F41C06] text-[#F41C06] pt-2">
            Seamless integration from start to finish. We handle the complexity so you can focus on growth.
          </p>
        </div>

        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-3 lg:grid-rows-2 flex-1 w-full h-full min-h-0"
        >
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-[clamp(1rem,2vw,1.5rem)] border-b md:border-b border-r-0 md:border-r border-black hover:bg-black transition-none cursor-crosshair flex flex-col justify-between overflow-hidden min-h-[250px] md:min-h-0 h-full"
            >
              <div className="relative z-10 text-black group-hover:text-[#FFFFFF] flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2 md:mb-6 border-b border-current pb-2">
                    <span className="font-sans font-light text-xs tracking-widest uppercase">[{item.code}]</span>
                    <span className="font-header font-black tracking-[0.05em] text-sm uppercase text-[#F41C06] truncate ml-2">{item.label}</span>
                  </div>
                  
                  <h3 className="text-[clamp(1.2rem,2vw,1.875rem)] font-sans font-medium mb-[clamp(0.5rem,1vw,1rem)] tracking-tighter uppercase leading-tight">{item.title}</h3>
                  
                  <p className="text-[clamp(0.75rem,1vw,0.875rem)] font-sans font-light leading-snug tracking-tight mb-[clamp(1rem,2vw,1.5rem)] opacity-80">
                    {item.description}
                  </p>
                </div>

                <ul className="text-xs font-sans font-light tracking-wider space-y-1.5 md:space-y-1 uppercase mt-auto">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-1.5 md:gap-2 truncate">
                      <span className="opacity-50">+</span> {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
        {/* Absolute 12vh Margin Boundary Block corresponding to ~25% Bento Height calculation */}
        <div className="w-full bg-[#FFFFFF] shrink-0 border-t border-black" style={{ height: '12vh' }} />
      </div>
    </section>
  );
}
