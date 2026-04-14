"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, PenTool, Cpu, Factory, Ship, Box } from "lucide-react";
import { useState } from "react";

const offerings = [
  {
    title: "Innovation Strategy",
    description: "Discover lucrative market whitespace and outpace the competition. We transform ambiguous ideas into actionable, highly de-risked product blueprints.",
    features: ["Market & Technical Feasibility", "IP Roadmapping", "MVP Definition"],
    icon: Lightbulb,
  },
  {
    title: "Industrial Design",
    description: "Create profound brand equity through physical touchpoints. We draft beautiful, ergonomic forms engineered to captivate consumers and scale elegantly.",
    features: ["Concept Generation", "CMF Strategy", "Ergonomics & Physical UX"],
    icon: PenTool,
  },
  {
    title: "Systems Engineering",
    description: "Bridge the gap between pure aesthetics and functional reality. Our engineering guarantees real-world performance without sacrificing the original vision.",
    features: ["Mechanical Architecture", "Electrical & Firmware Logic", "DFM / DFA Analysis"],
    icon: Cpu,
  },
  {
    title: "Mass Manufacturing",
    description: "Turn prototypes into profit. We directly transition complex engineering onto the factory floor with airtight quality control and rapid scalability.",
    features: ["Production Tooling Formulation", "Quality Assurance (QA/QC)", "Assembly Automation"],
    icon: Factory,
  },
  {
    title: "Supply Chain Strategy",
    description: "Build a resilient, cost-effective global network. We source premium materials, audit elite vendors, and negotiate aggressive margins to protect your bottom line.",
    features: ["Elite Vendor Sourcing", "BOM Cost Optimization", "Contract Negotiation"],
    icon: Box,
  },
  {
    title: "Global Logistics",
    description: "Deliver at scale with absolute precision. We handle complex trans-continental shipping, freight forwarding, and 3PL warehousing so you never have to miss a launch date.",
    features: ["Global Freight & Customs", "Warehousing & 3PL Integration", "Last-Mile Distribution"],
    icon: Ship,
  },
];

export function CoreOffering() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-32 bg-white px-6">
      <div className="w-full px-4 md:px-8">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-charcoal mb-6">
            Core Offering
          </h2>
          <p className="text-xl text-mid-gray max-w-2xl">
            A fully integrated cycle for creating exceptional products. From the first sketch to the final delivery.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-charcoal/10"
        >
          {offerings.map((item, i) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative p-12 border-r border-b border-charcoal/10 bg-white hover:bg-black transition-colors duration-500 overflow-hidden cursor-pointer h-[400px] flex flex-col justify-between"
            >
              <div className="relative z-10 transition-colors duration-500 text-charcoal group-hover:text-white">
                <item.icon className="w-8 h-8 mb-6 opacity-70 group-hover:opacity-100" strokeWidth={1.5} />
                <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ 
                    height: hoveredIndex === i ? "auto" : 0, 
                    opacity: hoveredIndex === i ? 1 : 0 
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="text-white/80 text-[15px] font-light leading-relaxed pb-6">
                    {item.description}
                  </p>
                  <ul className="text-white/60 text-sm font-medium space-y-3 pb-2">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-[3px] h-[3px] bg-white opacity-50 rounded-full" />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Empty placeholder to maintain grid alignment if necessary, else just space */}
              <div className="relative z-10 h-6"></div>

              {/* Background gradient flare on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
