"use client";

import { motion } from "framer-motion";
import { ArrowRight, Lightbulb, PenTool, Cpu, Factory, Ship, Box } from "lucide-react";
import { useState } from "react";

const offerings = [
  {
    title: "Innovation Strategy",
    description: "Invent what's next—then plan how to make it real. Ideation, roadmapping, and MVP definition.",
    icon: Lightbulb,
  },
  {
    title: "Design",
    description: "Bring ideas to life through intentional, insight-driven industrial, graphic, and packaging design.",
    icon: PenTool,
  },
  {
    title: "Engineering",
    description: "Bridge the gap between design and real-world functionality with mechanical, electrical, and firmware logic.",
    icon: Cpu,
  },
  {
    title: "Manufacturing",
    description: "Make it real—at scale, with quality, speed, and confidence across our global network.",
    icon: Factory,
  },
  {
    title: "Supply Chain",
    description: "Design and activate chains from raw materials to finished goods with resilience and optimization.",
    icon: Box,
  },
  {
    title: "Logistics",
    description: "Deliver with precision—globally, reliably, and at scale from customs to final fulfillment.",
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
              className="group relative p-12 border-r border-b border-charcoal/10 bg-white hover:bg-black transition-colors duration-500 overflow-hidden cursor-pointer h-[320px] flex flex-col justify-between"
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
                  <p className="text-white/80 text-sm leading-relaxed pb-4">
                    {item.description}
                  </p>
                </motion.div>
              </div>

              <div className="relative z-10 flex items-center gap-2 text-sm font-medium tracking-wide text-charcoal group-hover:text-white transition-colors duration-500">
                Explore <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
              </div>

              {/* Background gradient flare on hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-charcoal to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
