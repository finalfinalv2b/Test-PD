"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { steps } from "../../components/ProcessSequence";
import { SmokeParticles } from "../../components/SmokeParticles";
const flickerImages = [
  "/photo-flicker/Screenshot%202026-05-15%20a1.png",
  "/photo-flicker/Screenshot%202026-05-15%20a2.png",
  "/photo-flicker/Screenshot%202026-05-15%20b.png",
  "/photo-flicker/Screenshot%202026-05-15%20c.png",
  "/photo-flicker/Screenshot%202026-05-15%20d.png",
  "/photo-flicker/Screenshot%202026-05-15%20e.png",
  "/photo-flicker/Screenshot%202026-05-15%20f.png",
  "/photo-flicker/Screenshot%202026-05-15%20g.png",
  "/photo-flicker/Screenshot%202026-05-15%20h.png",
  "/photo-flicker/Screenshot%202026-05-15%20j.png",
  "/photo-flicker/Screenshot%202026-05-15%20k.png",
  "/photo-flicker/Screenshot%202026-05-15%20l.png",
  "/photo-flicker/Screenshot%202026-05-15%20m.png",
  "/photo-flicker/Screenshot%202026-05-15%20n.png",
  "/photo-flicker/Screenshot%202026-05-15%20o.png",
  "/photo-flicker/Screenshot%202026-05-15%20p.png",
  "/photo-flicker/Screenshot%202026-05-15%20q.png",
  "/photo-flicker/Screenshot%202026-05-15%20r.png",
  "/photo-flicker/Screenshot%202026-05-15%20s.png",
  "/photo-flicker/Screenshot%202026-05-15%20z.png"
];

const leftMask = "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 564.03 288.69'%3E%3Cpath d='M136.64,15.41c75.46,0,136.64,61.17,136.64,136.64s-61.17,136.64-136.64,136.64S0,227.51,0,152.05,61.17,15.41,136.64,15.41' fill='black'/%3E%3C/svg%3E\")";

const rightMask = "url(\"data:image/svg+xml;utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 564.03 288.69'%3E%3Cpolygon points='553.22 284.38 311.9 284.38 286.31 0 562.31 67.5 553.22 284.38' fill='black'/%3E%3C/svg%3E\")";

const bentoData = [
  {
    num: "01",
    title: "STRATEGY",
    label: "REQUIREMENTS SET",
    shortDesc: "We outline clear product requirements, positioning, and goals, ensuring your ideas have a clear, successful path to market.",
    longDesc: "Every successful product starts with a clear plan. We help you define your target audience, identify your product's key advantages, and lay out a roadmap for development. This ensures we build a product that your customers will love and that fits perfectly with your business goals.",
    shortFeatures: ["Product Roadmap", "Market Positioning", "Success Planning"],
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
    shortDesc: "We create premium visuals and comfortable form factors that combine beautiful design with practical usability.",
    longDesc: "We believe a great product should look spectacular and feel natural to use. Our design team focuses on aesthetics, ease of use, and materials to create a product that stands out in the market. We refine the visual details, shapes, and colors to deliver an exceptional user experience.",
    shortFeatures: ["Concept Styling", "User Experience", "Material Selection"],
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
    shortDesc: "We turn design concepts into fully functional, high-performance blueprints ready for production.",
    longDesc: "Our engineering team brings the design to life. We build detailed 3D models, design internal mechanics, and optimize the hardware layout. We focus on durability, safety, and reliability to ensure the product performs flawlessly in the real world.",
    shortFeatures: ["Mechanical Design", "Electronics", "Prototype Testing"],
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
    shortDesc: "We connect you with trusted global manufacturers to secure the best pricing and quality for your product.",
    longDesc: "Finding the right manufacturing partners is key to your product's success. We negotiate directly with trusted factories, manage supplier relationships, and optimize production costs. We set up reliable supply chains to ensure you get high-quality components delivered on time.",
    shortFeatures: ["Factory Sourcing", "Cost Management", "Supply Redundancy"],
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
    shortDesc: "We oversee the production lines and implement strict quality checks to guarantee flawless outcomes.",
    longDesc: "We manage the entire transition to mass production. Our quality control teams work directly on-site to inspect machinery, validate assembly setups, and perform thorough inspections on the finished products. This ensures that every single unit matches the approved prototype.",
    shortFeatures: ["Quality Control", "Production Management", "Assembly Planning"],
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
    shortDesc: "We coordinate shipping and customs to deliver your finished products safely to your door.",
    longDesc: "Our job is not done until your products arrive at your warehouse. We handle the entire shipping process, clear customs paperwork, and manage local distribution networks. We take care of the details so your launch is smooth and worry-free.",
    shortFeatures: ["Shipping Coordination", "Customs Clearance", "Fulfillment Integration"],
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

export default function SecretPage() {
  const [leftImageIndex, setLeftImageIndex] = useState(0);
  const [rightImageIndex, setRightImageIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeBentoIndex, setActiveBentoIndex] = useState<number | null>(null);
  const [activeTheme, setActiveTheme] = useState("beige");
  const [flickerTrigger, setFlickerTrigger] = useState(0);
  const [showBottomBar, setShowBottomBar] = useState(false);

  const containerRef = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);
  const isProgrammaticScrollingRef = useRef(false);
  const currentSectionRef = useRef(0);

  // Sync theme with localStorage and root HTML attribute
  useEffect(() => {
    const hasSetNewDefault = localStorage.getItem("theme_migrated_v2");
    let savedTheme = localStorage.getItem("theme");
    if (!hasSetNewDefault) {
      savedTheme = "beige";
      localStorage.setItem("theme", "beige");
      localStorage.setItem("theme_migrated_v2", "true");
    } else {
      savedTheme = savedTheme || "beige";
    }
    setActiveTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const changeTheme = (theme: string) => {
    setActiveTheme(theme);
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    
    // Restart image flickering on color mode change
    setLeftImageIndex(0);
    setRightImageIndex(0);
    setFlickerTrigger((prev) => prev + 1);
  };

  const getCityStackColor = (index: number) => {
    const isHovered = hoveredIndex === index;
    if (activeTheme === "red") {
      return isHovered ? "#000000" : "#ffffff";
    } else if (activeTheme === "beige") {
      return isHovered ? "#000000" : "#e31a1c";
    } else {
      // black
      return isHovered ? "#ffffff" : "#e31a1c";
    }
  };

  const getButtonStyles = () => {
    if (activeTheme === "red") {
      // black on red
      return {
        bg: "bg-black hover:bg-black/90 border-black",
        text: "text-[#e31a1c]",
        iconBg: "bg-[#e31a1c]",
        iconText: "text-black",
      };
    } else if (activeTheme === "beige") {
      // red on beige
      return {
        bg: "bg-[#e31a1c] hover:bg-[#c91416] border-[#e31a1c]",
        text: "text-[#f5f2eb]",
        iconBg: "bg-[#f5f2eb]",
        iconText: "text-[#e31a1c]",
      };
    } else {
      // red on black
      return {
        bg: "bg-[#e31a1c] hover:bg-[#c91416] border-[#e31a1c]",
        text: "text-black font-black",
        iconBg: "bg-black",
        iconText: "text-[#e31a1c]",
      };
    }
  };

  const getCityStackShadow = (index: number) => {
    const isHovered = hoveredIndex === index;
    if (!isHovered) return "none";
    if (activeTheme === "red") {
      return "0px 0px 20px rgba(0,0,0,0.4)";
    }
    return "0px 0px 20px rgba(255,255,255,0.8)";
  };

  const scrollToSection = (targetRef: React.RefObject<HTMLElement | null>) => {
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    isProgrammaticScrollingRef.current = true;

    // Temporarily remove snap classes to prevent scroll snap conflicts during transition
    container.classList.remove("snap-y", "snap-mandatory");

    target.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.classList.add("snap-y", "snap-mandatory");
        const index = Math.round(containerRef.current.scrollTop / containerRef.current.clientHeight);
        currentSectionRef.current = index;
      }
      isProgrammaticScrollingRef.current = false;
    }, 1000);
  };

  const handleStepClick = (index: number) => {
    setActiveBentoIndex(index);
    scrollToSection(section3Ref);
  };

  const activeBentoIndexRef = useRef<number | null>(null);
  useEffect(() => {
    activeBentoIndexRef.current = activeBentoIndex;
  }, [activeBentoIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;

    const handleScroll = () => {
      if (isProgrammaticScrollingRef.current) return;
      setActiveBentoIndex((prev) => {
        if (prev !== null) return null;
        return prev;
      });

      // Restart image flickering when returning to the title section
      const sectionIndex = Math.round(container.scrollTop / container.clientHeight);
      if (sectionIndex === 0 && currentSectionRef.current > 0) {
        setLeftImageIndex(0);
        setRightImageIndex(0);
        setFlickerTrigger((prev) => prev + 1);
      }
      currentSectionRef.current = sectionIndex;

      // If we scroll away from Section 3, hide the button
      if (sectionIndex !== 2) {
        setShowBottomBar(false);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // Show button when scrolling down on Section 3, hide when scrolling up
      if (currentSectionRef.current === 2 && activeBentoIndexRef.current === null) {
        if (e.deltaY > 10) {
          setShowBottomBar(true);
        } else if (e.deltaY < -10) {
          setShowBottomBar(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (currentSectionRef.current === 2 && activeBentoIndexRef.current === null && e.touches.length > 0) {
        const touchCurrentY = e.touches[0].clientY;
        const diffY = touchStartY - touchCurrentY; // Positive = scrolling down (swipe up)
        
        if (diffY > 30) {
          setShowBottomBar(true);
        } else if (diffY < -30) {
          setShowBottomBar(false);
        }
      }
    };

    // Run once initially to check scroll state
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    container.addEventListener("wheel", handleWheel, { passive: true });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  useEffect(() => {
    if (activeBentoIndex === null) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 5) {
        e.preventDefault();
        setActiveBentoIndex(null);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touchEndY = e.touches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaY) > 10) {
        e.preventDefault();
        setActiveBentoIndex(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", " ", "Spacebar"];
      if (keys.includes(e.key)) {
        e.preventDefault();
        setActiveBentoIndex(null);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      container.addEventListener("touchstart", handleTouchStart, { passive: true });
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
    }
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
      }
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeBentoIndex]);

  // Left half (circle shape) flicker rate: 250ms
  useEffect(() => {
    const interval = setInterval(() => {
      setLeftImageIndex((prev) => {
        if (prev >= flickerImages.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [flickerTrigger]);

  // Right half (polygon shape) flicker rate: 250ms (staggered by 125ms)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setRightImageIndex((prev) => {
          if (prev >= flickerImages.length - 1) {
            clearInterval(interval);
            return prev;
          }
          return prev + 1;
        });
      }, 250);
    }, 125);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [flickerTrigger]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScrollToProcess = () => {
      setActiveBentoIndex(null);
      scrollToSection(section3Ref);
    };

    window.addEventListener("scroll-to-process-details", handleScrollToProcess);
    return () => {
      window.removeEventListener("scroll-to-process-details", handleScrollToProcess);
    };
  }, []);


  return (
    <main ref={containerRef} className="relative w-full h-screen bg-background text-foreground transition-colors duration-500 overflow-y-scroll overflow-x-hidden snap-y snap-mandatory scroll-smooth">
      
      {/* SECTION 1: Cinematic Steps & Flicker */}
      <section className="relative w-full h-screen shrink-0 snap-start snap-always flex flex-col items-center justify-center pt-[72px]">
        {/* Left Half (Circle Shape) Flicker Image Sequence */}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[104vw] max-w-[117vh] aspect-[564.03/288.69] pointer-events-none"
        >
          {flickerImages.map((src, idx) => (
            <img 
              key={src}
              src={src}
              alt={`Left Flicker ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-none ${idx === leftImageIndex ? "opacity-60 md:opacity-80" : "opacity-0"}`}
            />
          ))}
        </div>

        {/* Right Half (Polygon Shape) Flicker Image Sequence */}
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[104vw] max-w-[117vh] aspect-[564.03/288.69] pointer-events-none"
        >
          {flickerImages.map((src, idx) => (
            <img 
              key={src}
              src={src}
              alt={`Right Flicker ${idx}`}
              className={`absolute inset-0 w-full h-full object-cover transition-none ${idx === rightImageIndex ? "opacity-60 md:opacity-80" : "opacity-0"}`}
            />
          ))}
        </div>

        {/* City Stack */}
        <div className="relative z-10 flex flex-col items-center justify-center font-header uppercase tracking-tighter select-none">
          {steps.map((step, index) => {
            // Calculate hover offset
            let yOffset = 0;
            if (hoveredIndex !== null) {
              if (index < hoveredIndex) yOffset = -20;
              if (index > hoveredIndex) yOffset = 20;
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
                <span className="text-[clamp(2.5rem,7vw,9rem)] leading-[0.8] drop-shadow-lg text-center">{step.title}</span>
                <span className="absolute left-full top-[0.1em] ml-1 md:ml-2 text-[clamp(1rem,2vw,2rem)] leading-none tracking-normal">
                  {step.num}
                </span>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-8 z-20"
          >
            <button 
              onClick={() => scrollToSection(section2Ref)}
              className="text-foreground transition-colors duration-500 font-sans font-bold tracking-widest text-sm md:text-base hover:text-[#e31a1c] whitespace-nowrap cursor-pointer bg-transparent border-none outline-none"
            >
              YOUR FULL-STACK PRODUCT DEPARTMENT
            </button>
          </motion.div>
        </div>

        {/* Color Mode Selector - bottom right corner */}
        <div className="absolute bottom-8 right-8 z-30 flex flex-col items-center gap-3">
          <span 
            className="font-sans text-[8px] md:text-[9px] font-black tracking-[0.2em] uppercase select-none opacity-40 text-foreground transition-opacity hover:opacity-75 duration-300"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            [color mode]
          </span>
          <div className="flex flex-col gap-0.5">
            {/* Red Circle */}
            <button
              onClick={() => changeTheme("red")}
              className="w-8 h-8 flex items-center justify-center group cursor-pointer"
              title="Brand Red"
              aria-label="Brand Red Color Mode"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-[#e31a1c] border transition-all duration-300 ${
                  activeTheme === "red" ? "border-white scale-125 ring-2 ring-[#e31a1c]/30" : "border-white/10 group-hover:scale-110"
                }`}
              />
            </button>
            {/* Beige Circle */}
            <button
              onClick={() => changeTheme("beige")}
              className="w-8 h-8 flex items-center justify-center group cursor-pointer"
              title="Brand Beige"
              aria-label="Brand Beige Color Mode"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-[#f5f2eb] border transition-all duration-300 ${
                  activeTheme === "beige" ? "border-black scale-125 ring-2 ring-black/10" : "border-white/10 group-hover:scale-110"
                }`}
              />
            </button>
            {/* Black Circle */}
            <button
              onClick={() => changeTheme("black")}
              className="w-8 h-8 flex items-center justify-center group cursor-pointer"
              title="Brand Black"
              aria-label="Brand Black Color Mode"
            >
              <div
                className={`w-3.5 h-3.5 rounded-full bg-[#000000] border transition-all duration-300 ${
                  activeTheme === "black" ? "border-white/60 scale-125 ring-2 ring-white/10" : "border-white/10 group-hover:scale-110"
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 2: Statement */}
      <section ref={section2Ref} className="relative w-full h-screen shrink-0 snap-start snap-always bg-background transition-colors duration-500 flex flex-col items-center justify-center px-4 overflow-hidden">
        <h1 className="text-foreground transition-colors duration-500 font-header uppercase tracking-[0.05em] leading-[0.9] text-[clamp(1.5rem,4vw,6rem)] text-center max-w-[90vw] md:max-w-none z-10 pointer-events-none">
          WE ARE THE PRODUCT TEAM<br />
          AMBITIOUS COMPANIES<br />
          WISH THEY HAD IN-HOUSE.
        </h1>
        <p className="mt-[clamp(1rem,2vw,1.5rem)] text-[clamp(0.82rem,1.15vw,1.2rem)] font-sans font-light tracking-wide text-foreground/75 transition-colors duration-500 max-w-[clamp(280px,85vw,800px)] leading-relaxed mx-auto text-center pointer-events-none pb-24 md:pb-32">
          We are a full-stack production company designed to help you scale your physical products quickly, reliably, and affordably. By operating as an extension of your team, we manage the complex processes you don't specialize in, from concept design, structural engineering, and raw material sourcing to tooling validation, mass assembly, and global logistics. We absorb the operational friction, supply chain risks, and vendor coordination, freeing you to focus entirely on your core business goals, product vision, and growth.
        </p>

        {/* Partners Banner */}
        <div className="absolute bottom-6 md:bottom-12 left-0 w-full flex flex-col gap-2 overflow-hidden select-none">
          {/* Label above the banner, off-center to the left */}
          <div className="px-8 md:px-16 text-left">
            <span className="font-sans text-[9px] md:text-xs font-black tracking-[0.2em] uppercase opacity-45">
              Select Parters
            </span>
          </div>

          {/* Marquee Banner */}
          <div className="w-full overflow-hidden relative py-3.5 border-y border-foreground/10 flex">
            <motion.div 
              className="flex gap-16 pr-16 whitespace-nowrap min-w-full shrink-0"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 25,
                repeat: Infinity
              }}
            >
              {[...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex items-center gap-3.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
                  <div className="w-6 h-6 border border-foreground/30 flex items-center justify-center rounded transition-colors duration-500">
                    {partner.shape === 'circle' && <div className="w-3 h-3 rounded-full bg-foreground" />}
                    {partner.shape === 'square' && <div className="w-3 h-3 bg-foreground" />}
                    {partner.shape === 'triangle' && (
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-foreground" />
                    )}
                    {partner.shape === 'diamond' && <div className="w-2.5 h-2.5 bg-foreground rotate-45" />}
                  </div>
                  <span className="font-header font-black tracking-widest text-[clamp(10px,1vw,12px)] uppercase">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Bento Box Process Detail */}
      <section id="process-details" ref={section3Ref} className="relative w-full min-h-screen lg:h-screen shrink-0 snap-start snap-always bg-background transition-colors duration-500 flex flex-col items-center justify-center py-20 lg:py-0 px-4 md:px-8 lg:px-12 overflow-y-auto lg:overflow-hidden">
        <div className="w-full max-w-6xl flex flex-col justify-center h-full pb-32 lg:pb-16 [@media(max-height:850px)]:pb-16 [@media(max-height:850px)]:lg:pb-10">
          {/* Section Header */}
          <div className="flex justify-between items-baseline mb-6 [@media(max-height:850px)]:mb-3 border-b border-foreground/10 pb-4 [@media(max-height:850px)]:pb-2 transition-colors duration-500">
            <h2 className="text-foreground transition-colors duration-500 font-header uppercase tracking-wider text-lg md:text-xl">
              Full-Stack Process
            </h2>
          </div>

          {/* Bento Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-[1px] bg-foreground/10 border border-foreground/10 w-full overflow-visible md:overflow-hidden h-auto md:lg:h-[70vh] min-h-0 md:min-h-[550px] [@media(max-height:850px)]:md:min-h-[420px] [@media(max-height:850px)]:md:lg:h-[60vh] select-none transition-colors duration-500">
            {bentoData.map((step, index) => {
              const isExpanded = activeBentoIndex === index;

              return (
                <div 
                  key={step.num}
                  className="w-full h-full min-h-[140px] md:min-h-0"
                >
                  <motion.div 
                    layout
                    onClick={() => {
                      if (isExpanded) {
                        setActiveBentoIndex(null);
                      } else {
                        setActiveBentoIndex(index);
                      }
                    }}
                    className={`w-full h-full transition-colors duration-300 flex flex-col justify-between overflow-hidden cursor-pointer ${
                      isExpanded 
                        ? "fixed inset-0 md:absolute md:inset-0 z-50 md:z-30 bg-foreground text-background p-6 md:p-8 lg:p-12 xl:p-16 [@media(max-height:850px)]:p-6 [@media(max-height:850px)]:lg:p-8 overflow-y-auto md:overflow-hidden" 
                        : "relative bg-background text-foreground border border-foreground/5 p-5 md:p-6 lg:p-8 hover:bg-foreground/[0.02] [@media(max-height:850px)]:p-4 [@media(max-height:850px)]:lg:p-5"
                    } group`}
                  >
                    <AnimatePresence mode="wait">
                      {!isExpanded ? (
                        <motion.div
                          key="collapsed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="relative z-10 flex flex-col h-full justify-between gap-3 w-full"
                        >
                          {/* Giant Background Number */}
                          <div className={`absolute bottom-[-15%] right-[-5%] z-0 text-[clamp(120px,14vh,180px)] select-none pointer-events-none font-header font-black leading-none transition-all duration-500 transform group-hover:scale-105 ${
                            activeTheme === "red"
                              ? "text-black/[0.06] group-hover:text-black/[0.12]"
                              : "text-[#e31a1c]/[0.02] group-hover:text-[#e31a1c]/[0.04]"
                          }`}>
                            {step.num}
                          </div>

                          <div className="relative z-10 flex flex-col h-full justify-between gap-3 w-full">
                            <div>
                              {/* Top indicator row */}
                              <div className="flex justify-between items-baseline border-b border-foreground/5 pb-2 mb-2 [@media(max-height:850px)]:pb-1 [@media(max-height:850px)]:mb-1">
                                <span className="font-sans font-light text-[clamp(9px,0.85vw,11px)] tracking-widest text-foreground/45 transition-colors duration-500">[{step.num}]</span>
                                <span className={`font-header font-black text-[clamp(9px,0.85vw,11px)] tracking-wider transition-colors duration-500 ${
                                  activeTheme === "red" ? "text-black" : "text-[#e31a1c]"
                                }`}>{step.label}</span>
                              </div>

                              {/* Title */}
                              <h3 className="font-header font-black text-[clamp(14px,1.4vw,18px)] text-foreground tracking-tight uppercase mb-1.5 [@media(max-height:850px)]:mb-0.5 leading-tight transition-colors duration-500">
                                {step.title}
                              </h3>

                              {/* Description */}
                              <p className="font-sans font-light text-[clamp(11px,1vw,13px)] text-foreground/75 leading-relaxed max-w-xl transition-colors duration-500">
                                {step.shortDesc}
                              </p>
                            </div>

                            {/* Features and Click Action row */}
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-auto pt-2 [@media(max-height:850px)]:pt-1 gap-2 w-full z-10">
                              {/* Features list */}
                              <ul className="flex flex-col gap-0.5">
                                {step.shortFeatures.map((feature, featureIndex) => (
                                  <li key={featureIndex} className="font-sans text-[clamp(8px,0.75vw,10px)] font-semibold tracking-wider text-foreground/50 group-hover:text-foreground/80 transition-colors duration-500 uppercase flex items-center gap-1.5">
                                    <span className={`transition-colors duration-500 ${activeTheme === "red" ? "text-black" : "text-[#e31a1c]"}`}>+</span> {feature}
                                  </li>
                                ))}
                              </ul>

                              {/* Click Action in brand yellow */}
                              <span className="text-[#FFCC00] text-[clamp(14px,1.2vw,18px)] font-bold select-none self-end sm:self-auto sm:ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                                →
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="expanded"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                          className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 h-full w-full pb-8 pr-2 [@media(max-height:850px)]:gap-4 [@media(max-height:850px)]:pb-4"
                        >
                          {/* Close button for expanded state */}
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveBentoIndex(null);
                            }}
                            className="absolute top-0 right-0 z-50 text-background/60 hover:text-[#e31a1c] transition-colors duration-300 font-header font-black text-xs md:text-sm tracking-wider flex items-center gap-1.5 cursor-pointer uppercase bg-foreground/10 px-3 py-2 rounded-md md:bg-transparent md:p-0"
                          >
                            Close <span className="font-sans font-bold">✕</span>
                          </button>

                          {/* Giant Background Number for Inverted Expanded State */}
                          <div className="absolute bottom-[-15%] right-[-5%] z-0 text-[clamp(180px,25vh,350px)] select-none pointer-events-none font-header font-black leading-none text-background/[0.02]">
                            {step.num}
                          </div>

                          {/* Left Column */}
                          <div className="flex flex-col justify-between h-full relative z-10 pr-4 md:pr-8 [@media(max-height:850px)]:pr-2">
                            <div>
                              <div className="flex items-baseline gap-4 border-b border-background/15 pb-3 mb-4 [@media(max-height:850px)]:pb-1.5 [@media(max-height:850px)]:mb-2 pr-12 transition-colors duration-500">
                                <span className="font-sans font-light text-[clamp(10px,0.9vw,13px)] text-background/45 transition-colors duration-500">[{step.num}]</span>
                                <span className="font-header font-black text-[clamp(10px,0.9vw,13px)] text-[#e31a1c] uppercase tracking-wider">{step.label}</span>
                              </div>
                              <h3 className="font-header font-black text-[clamp(18px,2vw,32px)] text-background tracking-tight uppercase mb-4 [@media(max-height:850px)]:mb-2 leading-none transition-colors duration-500">
                                {step.title}
                              </h3>
                              <p className="font-sans font-light text-[clamp(11px,1.05vw,14px)] text-background/75 leading-relaxed max-w-xl transition-colors duration-500">
                                {step.longDesc}
                              </p>
                            </div>
                            
                            {/* Removed Process Framework label */}
                          </div>

                          {/* Right Column */}
                          <div className="flex flex-col justify-center border-t md:border-t-0 md:border-l border-background/15 pt-6 md:pt-0 md:pl-8 lg:pl-12 [@media(max-height:850px)]:pl-4 relative z-10 transition-colors duration-500">
                            <h4 className="font-header font-black text-[clamp(9px,0.85vw,11px)] text-[#e31a1c] tracking-widest uppercase mb-4 md:mb-6 [@media(max-height:850px)]:mb-2">
                              Detailed Capabilities
                            </h4>
                            <ul className="flex flex-col gap-4 md:gap-5 [@media(max-height:850px)]:gap-2">
                              {step.longFeatures.map((feat) => (
                                <li key={feat.name} className="flex items-start gap-3">
                                  <span className="text-[#e31a1c] text-sm font-bold leading-none">+</span>
                                  <div>
                                    <span className="font-header font-black text-[clamp(9px,0.85vw,11px)] text-background uppercase tracking-wider block mb-1 transition-colors duration-500">
                                      {feat.name}
                                    </span>
                                    <span className="font-sans font-light text-[clamp(9px,0.8vw,11px)] text-background/60 leading-relaxed transition-colors duration-500">
                                      {feat.desc}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                            {step.title === "LOGISTICS" && (
                              <div className="mt-6 md:mt-8 [@media(max-height:850px)]:mt-3 pt-4 [@media(max-height:850px)]:pt-2 border-t border-background/15 transition-colors duration-500">
                                <Link 
                                  href="/tracking"
                                  className="inline-flex items-center justify-center gap-2 bg-[#e31a1c] hover:bg-background hover:text-foreground text-white font-header font-black text-[clamp(9px,0.85vw,11px)] uppercase tracking-wider px-5 py-3 [@media(max-height:850px)]:py-2 rounded transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
                                >
                                  <span>Launch Vessel Tracking Engine</span>
                                  <span className="font-sans">→</span>
                                </Link>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Trigger Pill (Appears at absolute scroll bottom) */}
      <AnimatePresence>
        {showBottomBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-6 lg:bottom-10 xl:bottom-14 left-0 w-full z-50 pointer-events-none flex justify-center px-6"
          >
            {(() => {
              const btnStyles = getButtonStyles();
              return (
                <Link 
                  href="/contact"
                  className={`pointer-events-auto ${btnStyles.bg} border rounded-full px-8 py-4 flex items-center gap-4 shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group cursor-pointer`}
                >
                  <span 
                    className={`text-base sm:text-lg tracking-wider uppercase font-black ${btnStyles.text}`}
                    style={{ fontFamily: 'var(--font-elza)', fontWeight: 900 }}
                  >
                    Make something good.
                  </span>
                  <div className={`${btnStyles.iconBg} ${btnStyles.iconText} rounded-full p-1.5 transition-transform duration-300 group-hover:translate-x-1 flex items-center justify-center`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </div>
                </Link>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
