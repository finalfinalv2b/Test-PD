"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Footer } from "@/components/Footer";

// site4 page configuration

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
  },
  {
    num: "07",
    title: "VENTURE INFRASTRUCTURE",
    label: "OPERATIONAL BACKBONE",
    longDesc: "Founders should focus on what they do best: taking their innovations to market. Product Dept. is a plug-and-play venture platform providing operational backbone for a fraction of the cost and learning curve of building a full team in-house.",
    longFeatures: [
      { name: "Operational Systems Build", desc: "Structuring your standard operating systems and tools." },
      { name: "Accounting / Bookkeeping", desc: "Keeping financial records and accounts organized and compliant." },
      { name: "Outside Advisory Networks", desc: "Leveraging our network of expert advisors for specialized guidance." },
      { name: "Financial Modeling", desc: "Budgeting, financial forecasting, and cash-flow modeling." },
      { name: "A/R & A/P Management", desc: "Managing accounts receivable and accounts payable efficiently." },
      { name: "Tech Stack Build", desc: "Setting up modern, integrated software tools for your business." },
      { name: "Transition & Training", desc: "Transition and training support for your incoming full-time hires." }
    ]
  }
];

const partners = [
  { name: "DirectMeds", shape: "circle" },
  { name: "CO Bigelow", shape: "square" },
  { name: "CleanCradle", shape: "triangle" },
  { name: "Reel Paper", shape: "diamond" },
  { name: "MDDN", shape: "circle" },
  { name: "NewBioRx", shape: "square" }
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

export default function Site4() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

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


  return (
    <main
      style={{
        backgroundColor: "#FFFFFF",
        color: "#000000",
        "--background": "#FFFFFF",
        "--foreground": "#000000"
      } as React.CSSProperties}
      className="relative w-full min-h-screen bg-background text-foreground transition-colors duration-500 font-sans font-light pt-[clamp(56px,6vh,72px)]"
    >
      {/* SECTION 1: Title Page with Logo Background & Copy */}
      <section className="relative w-full h-[calc(100vh-clamp(56px,6vh,72px))] flex flex-col items-center justify-center border-b border-black/10 overflow-hidden px-4">
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
            className="absolute inset-0 bg-black opacity-[0.04]"
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
            className="absolute inset-0 bg-black opacity-[0.04]"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-[clamp(280px,85vw,850px)] pb-12 mt-[-40px]">
          {/* Wordmark Logo Image */}
          <motion.img 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            src="/pd-wordmark-black.svg" 
            alt="Product Dept." 
            className="h-[clamp(30px,5.25vw,54px)] w-auto object-contain mb-4 select-none pointer-events-none"
          />

          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-[clamp(1rem,2vw,2rem)] tracking-normal normal-case font-sans font-light text-black/60 mb-8"
          >
            Where great ideas become exceptional products.
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[clamp(0.82rem,1.1vw,1.15rem)] font-sans font-light tracking-wide text-black/75 leading-relaxed space-y-4"
          >
            <p>
              Product Dept. is an industry agnostic, full-stack product creation company partnering with venture and established companies to scale physical product lines quickly, reliably, and profitably.
            </p>
            <p>
              We provide product design, engineering, sourcing, manufacturing, and infrastructure to build new supply chains and optimize existing ones. By drawing on decades of global manufacturing relationships and corporate operations experience we bring vision to life, from concept to commercialization, and provide the foundation for profitable enterprises. We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-8 pointer-events-auto"
          >
            <button
              onClick={() => {
                const element = document.getElementById("process-section");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-black font-sans font-bold tracking-widest text-xs md:text-sm hover:text-[#e31a1c] whitespace-nowrap cursor-pointer bg-transparent border-none outline-none border-b border-black/10 pb-1"
            >
              EXPLORE OUR SERVICES & CAPABILITIES
            </button>
          </motion.div>
        </div>

        {/* Partners Banner */}
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full flex flex-col gap-2 overflow-hidden select-none z-10">
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
                duration: 150,
                repeat: Infinity
              }}
            >
              {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
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

      {/* SECTION 3: Interactive Services & Capabilities Accordion */}
      <section id="process-section" className="relative w-full py-24 scroll-mt-20">
        <div className="max-w-6xl mx-auto px-4 mb-12 border-b border-black/10 pb-6">
          <h2 className="font-header uppercase tracking-wider text-3xl md:text-4xl text-black">
            Services & Capabilities
          </h2>
          <p className="mt-4 font-sans font-light text-sm md:text-base text-black/60 max-w-2xl leading-relaxed">
            We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 flex flex-col">
          {bentoData.map((step, index) => {
            const isOpen = expandedIndex === index;
            return (
              <motion.div
                key={step.num}
                id={`process-step-${index}`}
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
                        const element = document.getElementById(`process-step-${index}`);
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
                    <span className="font-header font-black text-2xl md:text-4xl text-black tracking-tight group-hover:text-[#e31a1c] transition-colors duration-300 uppercase">
                      {step.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 self-end md:self-auto">
                    <span className="font-header font-black text-xs text-[#e31a1c] uppercase tracking-wider hidden sm:inline">
                      {step.label}
                    </span>
                    <motion.div
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-sm text-black group-hover:border-[#e31a1c]/35 group-hover:text-[#e31a1c] transition-colors"
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
                              {step.longDesc}
                            </p>
                          </div>
                        </div>

                        {/* Right Column: Capabilities */}
                        <div className="flex flex-col justify-center lg:pl-8 lg:border-l border-black/10">
                          <h4 className="font-header font-black text-xs text-[#e31a1c] tracking-widest uppercase mb-6">
                            Detailed Capabilities
                          </h4>
                          <ul className="flex flex-col gap-4">
                            {step.longFeatures.map((feat, fIndex) => (
                              <motion.li
                                key={feat.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: fIndex * 0.05 + 0.1 }}
                                className="flex items-start gap-3"
                              >
                                <span className="text-[#e31a1c] text-sm font-bold leading-none mt-0.5">+</span>
                                <div>
                                  <span className="font-header font-black text-xs text-black uppercase tracking-wider block mb-1">
                                    {feat.name}
                                  </span>
                                  <span className="font-sans font-light text-xs text-black/60 leading-relaxed">
                                    {feat.desc}
                                  </span>
                                </div>
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
                <input type="hidden" name="_subject" value="New Inquiry from Product Dept. (Site 4)" />
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
