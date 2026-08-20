"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { steps } from "@/components/ProcessSequence";
import { Footer } from "@/components/Footer";

// site3 page configuration

const leftMask = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NjQuMDMgMjg4LjY5Ij48cGF0aCBkPSJNMTM2LjY0LDE1LjQxYzc1LjQ2LDAsMTM2LjY0LDYxLjE3LDEzNi42NCwxMzYuNjRzLTYxLjE3LDEzNi42NC0xMzYuNjQsMTM2LjY0UzAsMjI3LjUxLDAsMTUyLjA1LDYxLjE3LDE1LjQxLDEzNi42NCwxNS40MSIgZmlsbD0iYmxhY2siLz48L3N2Zz4=")';
const rightMask = 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1NjQuMDMgMjg4LjY5Ij48cG9seWdvbiBwb2ludHM9IjU1My4yMiAyODQuMzggMzExLjkgMjg0LjM4IDI4Ni4zMSAwIDU2Mi4zMSA2Ny41IDU1My4yMiAyODQuMzgiIGZpbGw9ImJsYWNrIi8+PC9zdmc+")';

const bentoData = [
  {
    num: "01",
    title: "STRATEGY",
    label: "REQUIREMENTS SET",
    longDesc: "Every successful product starts with a clear plan. We help you define your target audience, identify your product's key advantages, and lay out a roadmap for development. This ensures we build a product that your customers will love and that fits perfectly with your business goals.",
    longFeatures: [
      { name: "Product Roadmapping", desc: "Creating a clear step-by-step timeline and milestones for development." },
      { name: "Market Positioning", desc: "Aligning the product design with user needs and competitive opportunities." },
      { name: "Goal Alignment", desc: "Structuring the project scope to match your business goals and launch schedule." },
      { name: "Cost Analysis", desc: "Assessing early budget and timeline expectations to keep development on track." }
    ]
  },
  {
    num: "02",
    title: "INDUSTRIAL DESIGN",
    label: "FORM DEFINED",
    longDesc: "We believe a great product should look spectacular and feel natural to use. Our design team focuses on aesthetics, ease of use, and materials to create a product that stands out in the market. We refine the visual details, shapes, and colors to deliver an exceptional user experience.",
    longFeatures: [
      { name: "Concept Generation", desc: "Developing eye-catching design options and visual directions." },
      { name: "User Experience", desc: "Optimizing shapes and layouts to ensure the product is comfortable and easy to use." },
      { name: "Color & Materials", desc: "Selecting beautiful finishes and durable materials that align with your brand." }
    ]
  },
  {
    num: "03",
    title: "ENGINEERING",
    label: "CAD ARCHITECTURE",
    longDesc: "Our engineering team brings the design to life. We build detailed 3D models, design internal mechanics, and optimize the hardware layout. We focus on durability, safety, and reliability to ensure the product performs flawlessly in the real world.",
    longFeatures: [
      { name: "3D Blueprint Modeling", desc: "Creating precise digital blueprints of the product and its internal parts." },
      { name: "Hardware Design", desc: "Designing functional circuits and internal components to power your product." },
      { name: "Reliability Testing", desc: "Testing and simulating real-world usage to guarantee performance and safety." }
    ]
  },
  {
    num: "04",
    title: "SOURCING",
    label: "VENDOR SELECTION",
    longDesc: "Finding the right manufacturing partners is key to your product's success. We negotiate directly with trusted factories, manage supplier relationships, and optimize production costs. We set up reliable supply chains to ensure you get high-quality components delivered on time.",
    longFeatures: [
      { name: "Trusted Partners", desc: "Selecting vetted manufacturers capable of meeting high quality standards." },
      { name: "Cost Optimization", desc: "Negotiating direct pricing to maximize profit margins and reduce waste." },
      { name: "Supply Chain Security", desc: "Setting up backup suppliers to prevent delays and ensure continuous production." }
    ]
  },
  {
    num: "05",
    title: "MANUFACTURING",
    label: "MASS PRODUCTION",
    longDesc: "We manage the entire transition to mass production. Our quality control teams work directly on-site to inspect machinery, validate assembly setups, and perform thorough inspections on the finished products. This ensures that every single unit matches the approved prototype.",
    longFeatures: [
      { name: "On-Site Inspection", desc: "Performing strict quality checks at key points along the production line." },
      { name: "Assembly Optimization", desc: "Designing efficient assembly steps to speed up delivery and reduce errors." },
      { name: "Sample Validation", desc: "Verifying initial production samples against quality benchmarks before full-scale runs." }
    ]
  },
  {
    num: "06",
    title: "LOGISTICS",
    label: "GLOBAL DELIVERY",
    longDesc: "Our job is not done until your products arrive at your warehouse. We handle the entire shipping process, clear customs paperwork, and manage local distribution networks. We take care of the details so your launch is smooth and worry-free.",
    longFeatures: [
      { name: "Global Freight", desc: "Managing sea, air, and land transportation for your inventory." },
      { name: "Customs & Compliance", desc: "Handling import/export paperwork and regulations for a hassle-free delivery." },
      { name: "Fulfillment Sync", desc: "Coordinating delivery directly with your warehousing and distribution centers." }
    ]
  }
];

const partners = [
  { name: "Partner 1", shape: "circle" },
  { name: "Partner 2", shape: "square" },
  { name: "Partner 3", shape: "triangle" },
  { name: "Partner 4", shape: "diamond" },
  { name: "Partner 5", shape: "circle" },
  { name: "Partner 6", shape: "square" },
  { name: "Partner 7", shape: "triangle" },
  { name: "Partner 8", shape: "diamond" },
  { name: "Partner 9", shape: "circle" },
  { name: "Partner 10", shape: "square" },
  { name: "Partner 11", shape: "triangle" },
  { name: "Partner 12", shape: "diamond" }
];

const WORDS = [
  "WORKING",
  "IDEATING",
  "CREATING",
  "THINKING",
  "DREAMING",
  "BUILDING",
  "SOURCING",
  "DRAWING",
  "INVENTING",
  "SHIPPING",
  "MAKING",
  "TODAY"
];

export default function Site3() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Contact States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [wordIndex, setWordIndex] = useState(WORDS.length - 1);
  const [nyTime, setNyTime] = useState("");

  // Live Time Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const formatted = new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        });
        setNyTime(formatted);
      } catch (e) {
        console.warn("New York time formatting failed:", e);
        try {
          setNyTime(new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true
          }));
        } catch (err) {
          setNyTime(new Date().toLocaleTimeString());
        }
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Word Index Cycle for Form
  useEffect(() => {
    setWordIndex(0);
    let current = 0;
    let timeoutId: NodeJS.Timeout;

    const runFlicker = () => {
      if (current >= WORDS.length - 1) {
        setWordIndex(WORDS.length - 1);
        return;
      }
      current++;
      setWordIndex(current);
      timeoutId = setTimeout(runFlicker, 500);
    };

    timeoutId = setTimeout(runFlicker, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Form Submit Handler
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch("https://formsubmit.co/ajax/ryrorussell1@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleStepClick = (index: number) => {
    const element = document.getElementById(`process-step-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getCityStackColor = (index: number) => {
    return hoveredIndex === index ? "#000000" : "#e31a1c";
  };

  const getCityStackShadow = (index: number) => {
    return hoveredIndex === index ? "0px 0px 20px rgba(0,0,0,0.15)" : "none";
  };

  return (
    <main
      style={{
        backgroundColor: "#f9f4ef",
        color: "#000000",
        "--background": "#f9f4ef",
        "--foreground": "#000000"
      } as React.CSSProperties}
      className="relative w-full min-h-screen bg-background text-foreground transition-colors duration-500 overflow-x-hidden font-sans font-light pt-[72px]"
    >
      {/* SECTION 1: Cinematic Steps & Logo */}
      <section className="relative w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center border-b border-black/10 overflow-hidden">
        {/* Solid Black Logo Watermark behind text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[104vw] max-w-[117vh] aspect-[564.03/288.69] pointer-events-none">
          {/* Left Half Logo Mask */}
          <div
            style={{
              maskImage: leftMask,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: leftMask,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center"
            }}
            className="absolute inset-0 bg-black opacity-10"
          />

          {/* Right Half Logo Mask */}
          <div
            style={{
              maskImage: rightMask,
              maskSize: "contain",
              maskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskImage: rightMask,
              WebkitMaskSize: "contain",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskPosition: "center"
            }}
            className="absolute inset-0 bg-black opacity-10"
          />

          {/* "YOUR FULL-STACK PRODUCT DEPARTMENT" Button resting right below the black logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute top-full mt-8 left-1/2 -translate-x-1/2 pointer-events-auto"
          >
            <button
              onClick={() => {
                const element = document.getElementById("process-section");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-black font-sans font-bold tracking-widest text-sm md:text-base hover:text-[#e31a1c] whitespace-nowrap cursor-pointer bg-transparent border-none outline-none"
            >
              YOUR FULL-STACK PRODUCT DEPARTMENT
            </button>
          </motion.div>
        </div>

        {/* City Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center font-header uppercase tracking-tighter select-none">
          {steps.map((step, index) => {
            let yOffset = 0;
            if (hoveredIndex !== null) {
              if (index < hoveredIndex) yOffset = -15;
              if (index > hoveredIndex) yOffset = 15;
            }

            return (
              <motion.div
                key={step.title}
                initial={{ y: 0, opacity: 1 }}
                animate={{
                  y: yOffset,
                  opacity: 1,
                  color: getCityStackColor(index),
                  textShadow: getCityStackShadow(index)
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                  color: { duration: 0.3 }
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleStepClick(index)}
                className="relative flex items-start cursor-pointer"
                style={{ lineHeight: 0.8 }}
              >
                <span className="text-[clamp(2.5rem,7vw,9rem)] leading-[0.8] drop-shadow-md text-center">{step.title}</span>
                <span className="absolute left-full top-[0.1em] ml-1 md:ml-2 text-[clamp(1rem,2vw,2rem)] leading-none tracking-normal">
                  {step.num}
                </span>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: Statement */}
      <section className="relative w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-black/10">
        <h1 className="text-black font-header uppercase tracking-[0.05em] leading-[0.9] text-[clamp(1.5rem,4vw,6rem)] text-center max-w-[90vw] md:max-w-none z-10 pointer-events-none">
          WE ARE THE PRODUCT TEAM<br />
          AMBITIOUS COMPANIES<br />
          WISH THEY HAD IN-HOUSE.
        </h1>
        <p className="mt-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.82rem,1.15vw,1.2rem)] font-sans font-light tracking-wide text-black/75 max-w-[clamp(280px,85vw,800px)] leading-relaxed mx-auto text-center pointer-events-none pb-24 md:pb-32">
          We are a full-stack production company designed to help you scale your physical products quickly, reliably, and affordably. By operating as an extension of your team, we manage the complex processes you don&apos;t specialize in, from concept design, structural engineering, and raw material sourcing to tooling validation, mass assembly, and global logistics. We absorb the operational friction, supply chain risks, and vendor coordination, freeing you to focus entirely on your core business goals, product vision, and growth.
        </p>

        {/* Partners Banner */}
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full flex flex-col gap-2 overflow-hidden select-none">
          <div className="px-8 md:px-16 text-left">
            <span className="font-sans text-[9px] md:text-xs font-black tracking-[0.2em] uppercase opacity-45">
              Select Partners
            </span>
          </div>

          <div className="w-full overflow-hidden relative py-3.5 border-y border-black/10 flex">
            <motion.div
              className="flex gap-16 pr-16 whitespace-nowrap min-w-full shrink-0"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 125,
                repeat: Infinity
              }}
            >
              {[...partners, ...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex items-center gap-3.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 border border-black/35 flex items-center justify-center rounded">
                    {partner.shape === 'circle' && <div className="w-3 h-3 rounded-full bg-black" />}
                    {partner.shape === 'square' && <div className="w-3 h-3 bg-black" />}
                    {partner.shape === 'triangle' && (
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-black" />
                    )}
                    {partner.shape === 'diamond' && <div className="w-2.5 h-2.5 bg-black rotate-45" />}
                  </div>
                  <span className="font-header font-black tracking-widest text-[clamp(10px,1vw,12px)] uppercase">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Sequential Process Details (No Tabs) */}
      <section id="process-section" className="relative w-full py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 mb-16 border-b border-black/10 pb-6">
          <h2 className="font-header uppercase tracking-wider text-xl md:text-2xl text-black">
            Full-Stack Process
          </h2>
        </div>

        <div className="max-w-6xl mx-auto px-4 flex flex-col gap-24">
          {bentoData.map((step, index) => (
            <div
              key={step.num}
              id={`process-step-${index}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 border-t border-black/10 pt-12 scroll-mt-24 first:border-t-0 first:pt-0"
            >
              {/* Left Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline gap-4 mb-4 border-b border-black/5 pb-2">
                    <span className="font-sans font-light text-xs text-black/40">[{step.num}]</span>
                    <span className="font-header font-black text-xs text-[#e31a1c] uppercase tracking-wider">{step.label}</span>
                  </div>
                  <h3 className="font-header font-black text-3xl md:text-4xl text-black tracking-tight uppercase mb-6 leading-none">
                    {step.title}
                  </h3>
                  <p className="font-sans font-light text-base text-black/75 leading-relaxed max-w-xl">
                    {step.longDesc}
                  </p>
                </div>
                {/* Removed Process Framework label */}
              </div>

              {/* Right Column */}
              <div className="flex flex-col justify-center md:pl-8 lg:pl-12 md:border-l border-black/10">
                <h4 className="font-header font-black text-xs text-[#e31a1c] tracking-widest uppercase mb-6">
                  Detailed Capabilities
                </h4>
                <ul className="flex flex-col gap-5">
                  {step.longFeatures.map((feat) => (
                    <li key={feat.name} className="flex items-start gap-3">
                      <span className="text-[#e31a1c] text-sm font-bold leading-none">+</span>
                      <div>
                        <span className="font-header font-black text-xs text-black uppercase tracking-wider block mb-1">
                          {feat.name}
                        </span>
                        <span className="font-sans font-light text-xs text-black/60 leading-relaxed">
                          {feat.desc}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
                
              </div>
            </div>
          ))}
        </div>
      </section>



      {/* SECTION 5: Contact Us */}
      {/* SECTION 5: Contact Us */}
      <section id="contact-section" className="w-full border-t border-black/20 scroll-mt-20 bg-[#e31a1c]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          
          {/* LEFT SIDE COPY BLOCK */}
          <div className="p-8 md:p-16 flex flex-col justify-between bg-transparent min-h-[400px]">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-12">
              GET IN <br /> TOUCH.
            </h1>
            <div>
              <div className="w-full h-px bg-white/20 mb-8" />
              <p className="font-mono text-sm tracking-widest text-white/80 uppercase">
                {`HQ: NEW YORK  NYT: ${nyTime || "--:--:-- --"}`}
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM GRID */}
          <div className="p-8 md:p-16 bg-white text-black flex flex-col justify-center">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full mx-auto">
                <input type="hidden" name="_subject" value="New Inquiry from Product Dept. (Site 3)" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-black">NAME</label>
                    <input type="text" id="name" name="name" className="border-2 border-black bg-white text-black py-4 px-4 outline-none focus:bg-black focus:text-white transition-colors font-mono uppercase text-sm" placeholder="JANE DOE" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-black">EMAIL</label>
                    <input type="email" id="email" name="email" className="border-2 border-black bg-white text-black py-4 px-4 outline-none focus:bg-black focus:text-white transition-colors font-mono uppercase text-sm" placeholder="JANE@COMPANY.COM" required />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-black">ORGANIZATION</label>
                  <input type="text" id="company" name="company" className="border-2 border-black bg-white text-black py-4 px-4 outline-none focus:bg-black focus:text-white transition-colors font-mono uppercase text-sm" placeholder="ORGANIZATION NAME" />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-black">MESSAGE</label>
                  <textarea id="description" name="description" rows={5} className="border-2 border-black bg-white text-black py-4 px-4 outline-none focus:bg-black focus:text-white transition-colors resize-none font-mono uppercase text-sm" placeholder="TELL US EVERYTHING..." required></textarea>
                </div>

                <div className="pt-8">
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full bg-black text-white hover:bg-white hover:text-black hover:border-black border-2 border-transparent transition-colors py-6 font-black text-2xl tracking-tighter uppercase cursor-pointer"
                   >
                     {isSubmitting ? "TRANSMITTING..." : "Send"}
                   </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto py-12">
                <div className="uppercase border-2 border-black p-4 font-mono font-black mb-8 text-xs tracking-widest text-black">
                  [ INFO SENT ]
                </div>
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase text-black">DATA RECEIVED.</h2>
                <p className="text-lg font-mono text-black/80 mb-12">
                  Someone from the Product Dept. will get back to you shortly. Thank you.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
