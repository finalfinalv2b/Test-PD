"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { LogoInteractive } from "@/components/LogoInteractive";

const bentoData = [
  {
    num: "01",
    title: "STRATEGY",
    label: "REQUIREMENTS SET",
    bgImage: "/photo-flicker/strategy.png",
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
    title: "DESIGN",
    label: "FORM DEFINED",
    bgImage: "/photo-flicker/Screenshot 2026-05-15 e.png",
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
    bgImage: "/photo-flicker/engineering.jpeg",
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
    bgImage: "/photo-flicker/sourcing.jpeg",
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
    bgImage: "/photo-flicker/manufacturing.jpg",
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
    bgImage: "/photo-flicker/logistics_anim.mp4",
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
    bgImage: "/photo-flicker/venture_anim.mp4",
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

export default function Site5() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [contentScale, setContentScale] = useState(1);

  // Contact States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nyTime, setNyTime] = useState("");
  const [brandColor, setBrandColor] = useState("#f41c06");

  const processSectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: processSectionRef,
    offset: ["start start", "end end"],
  });

  const windowWidthRef = useRef(1920);
  const windowHeightRef = useRef(1080);
  const isClickScrollingRef = useRef(false);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      windowWidthRef.current = window.innerWidth;
      windowHeightRef.current = window.innerHeight;

      if (mobile) {
        setContentScale(1);
        return;
      }

      // Height logic: viewport height minus fixed navbar (clamp 56px to 72px) and bottom padding
      const navbarHeight = Math.min(72, Math.max(56, window.innerHeight * 0.06));
      const availableHeight = window.innerHeight - navbarHeight - 40;
      // Safe maximum natural height budget to fit the tallest expanded item without clipping
      const naturalHeight = 900;

      let scaleFactor = availableHeight / naturalHeight;
      // Allow scale down on small screens (minimum 0.35 to prevent cropping), scale up on large monitors
      scaleFactor = Math.min(1.35, Math.max(0.35, scaleFactor));
      setContentScale(scaleFactor);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Scroll Snapping for Site 5 sections
  useEffect(() => {
    if (isMobile) return;

    const htmlEl = document.documentElement;
    htmlEl.classList.add("snap-y", "snap-proximity", "scroll-smooth");

    return () => {
      htmlEl.classList.remove("snap-y", "snap-proximity", "scroll-smooth");
    };
  }, [isMobile]);

  // Auto-snap scroll down from homepage to services section to reduce scroll wheel effort
  useEffect(() => {
    if (isMobile) return;

    let isSnapping = false;
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const prevScrollY = lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      if (isSnapping) return;

      // If we start at the top (prevScrollY <= 5) and scroll down slightly (currentScrollY > prevScrollY)
      if (prevScrollY <= 5 && currentScrollY > prevScrollY && currentScrollY < 150) {
        const target = document.getElementById("process-section");
        if (target) {
          isSnapping = true;
          target.scrollIntoView({ behavior: "smooth" });
          
          setTimeout(() => {
            isSnapping = false;
            lastScrollYRef.current = window.scrollY;
          }, 1000);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Update active index based on scroll on desktop
  // Click handler that toggles on mobile, and scrolls to target position on desktop
  const handleItemClick = (index: number) => {
    if (isMobile) {
      setActiveIndex(index === activeIndex ? null : index);
      return;
    }

    // Immediately expand the clicked item
    setActiveIndex(index);

    if (processSectionRef.current) {
      const rect = processSectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = rect.top + scrollTop;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      const scrollableHeight = sectionHeight - viewportHeight;
      
      // Calculate target progress coordinate at middle of the index range
      const startProgress = 0.08;
      const endProgress = 0.88;
      const progressPerItem = (endProgress - startProgress) / 7;
      const targetProgress = startProgress + (index + 0.5) * progressPerItem;
      const targetScrollY = sectionStart + (targetProgress * scrollableHeight);

      // Disable scroll index changes while click scrolling
      isClickScrollingRef.current = true;

      const handleScrollEnd = () => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      };
      window.addEventListener("scrollend", handleScrollEnd);

      // Fallback timeout in case browser scrollend does not trigger
      setTimeout(() => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      }, 800);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  };

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const handleItemClickRef = useRef(handleItemClick);
  handleItemClickRef.current = handleItemClick;

  useEffect(() => {
    if (isMobile) return;

    const lastSnapTimeRef = { current: 0 };
    const ventureScrollCountRef = { current: 0 };

    const handleWheel = (e: WheelEvent) => {
      const section = processSectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      // Determine if the scroll position is inside the services section
      // We give it a buffer of 100px on top
      const isInside = scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - window.innerHeight - 50;

      if (!isInside) {
        // If we are at the top (scrollY < 10) and scrolling down, snap to services
        if (scrollY < 10 && e.deltaY > 0) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 1000) {
            lastSnapTimeRef.current = now;
            handleItemClickRef.current(0);
          }
        }
        return;
      }

      // We are inside the services section: intercept ALL wheel scroll events!
      e.preventDefault();

      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTimeRef.current;
      
      // If we are waiting for the second click on Venture (count is 1), use a very short 200ms cooldown.
      // Otherwise, use the standard 1000ms cooldown to block rapid scroll snaps.
      const requiredCooldown = (activeIndexRef.current === 6 && ventureScrollCountRef.current === 1) ? 200 : 1000;
      
      if (timeSinceLastSnap < requiredCooldown) {
        return;
      }

      if (e.deltaY > 0) {
        // Scroll DOWN
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx < 6) {
          lastSnapTimeRef.current = now;
          ventureScrollCountRef.current = 0; // reset
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 6) {
          // If on the last item (Venture Infrastructure), snap to contact on the 2nd scroll down click
          ventureScrollCountRef.current += 1;
          if (ventureScrollCountRef.current >= 2) {
            const contactSec = document.getElementById("contact-section");
            if (contactSec) {
              lastSnapTimeRef.current = now;
              contactSec.scrollIntoView({ behavior: "smooth" });
            }
            ventureScrollCountRef.current = 0; // reset
          } else {
            // Log the timestamp of the first click
            lastSnapTimeRef.current = now;
          }
        }
      } else if (e.deltaY < 0) {
        // Scroll UP
        const currentIdx = activeIndexRef.current;
        ventureScrollCountRef.current = 0; // reset
        if (currentIdx !== null && currentIdx > 0) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0) {
          // If on Strategy, scroll upward snaps to home screen
          lastSnapTimeRef.current = now;
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const section = processSectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const isInside = scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - window.innerHeight - 50;

      if (!isInside) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSnapTimeRef.current < 1000) return;
        
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx < 6) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 6) {
          const contactSec = document.getElementById("contact-section");
          if (contactSec) {
            lastSnapTimeRef.current = now;
            contactSec.scrollIntoView({ behavior: "smooth" });
          }
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSnapTimeRef.current < 1000) return;
        
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx > 0) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0) {
          lastSnapTimeRef.current = now;
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobile]);


  // Color transform for brand red elements: switches instantly to black when red background shapes overlap
  const activeColor = useTransform(scrollYProgress, (latest) => {
    return latest >= 0.28 ? "#000000" : brandColor;
  });

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
        "--foreground": "#000000",
        "--brand": brandColor
      } as React.CSSProperties}
      className="relative w-full min-h-screen bg-background text-foreground transition-colors duration-500 font-sans font-light pt-[clamp(56px,6vh,72px)]"
    >
      {/* SECTION 1: Title Page with Logo Background & Copy */}
      <section className="relative w-full h-[calc(100vh-clamp(56px,6vh,72px))] flex flex-col items-center justify-center border-b border-black/10 overflow-hidden px-4">
        {/* Interactive Logo Watermark behind text */}
        <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-[125vw] max-w-[140vh] aspect-[564.03/288.69] pointer-events-none">
          <LogoInteractive brandColor={brandColor} />
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
              className="text-black font-sans font-bold tracking-widest text-xs md:text-sm hover:text-[var(--brand)] whitespace-nowrap cursor-pointer bg-transparent border-none outline-none border-b border-black/10 pb-1"
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
        {/* Color Theme Selector */}
        <div className="absolute bottom-[108px] right-6 md:bottom-[140px] md:right-12 z-20 flex flex-col items-center gap-2">
          {/* Teal Circle Button */}
          <button
            onClick={() => setBrandColor("#00c3ff")}
            aria-label="Set theme to teal"
            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#00c3ff] border border-white/60 shadow-md hover:scale-125 active:scale-95 transition-all cursor-pointer outline-none"
          />
          {/* Red Circle Button */}
          <button
            onClick={() => setBrandColor("#f41c06")}
            aria-label="Set theme to red"
            className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-[#f41c06] border border-white/60 shadow-md hover:scale-125 active:scale-95 transition-all cursor-pointer outline-none"
          />
        </div>
      </section>

      {/* SECTION 3: Pinned Services Accordion */}
      <section 
        ref={processSectionRef} 
        id="process-section" 
        className={`relative bg-[#FFFFFF] border-b border-black w-full snap-start scroll-mt-[clamp(56px,6vh,72px)] ${isMobile ? "py-24" : "h-[450vh]"}`}
      >
        {/* Pinned Wrapper for Desktop */}
        <div className={isMobile ? "w-full" : "sticky top-[clamp(56px,6vh,72px)] left-0 w-full h-[calc(100vh-clamp(56px,6vh,72px))] overflow-hidden flex flex-col items-center justify-start bg-transparent"}>
          
          {/* SERVICE BACKGROUND PHOTOS LAYER */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
            {bentoData.map((step, index) => {
              const isOpen = activeIndex === index;
              return (
                <motion.div
                  key={step.num}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full"
                >
                  {step.bgImage.endsWith(".mp4") ? (
                    <video
                      src={step.bgImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover grayscale"
                    />
                  ) : (
                    <img
                      src={step.bgImage}
                      alt=""
                      className="w-full h-full object-cover grayscale"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>


          {/* HEADER BLOCK */}
          <div className={`shrink-0 w-full bg-black border-t border-b border-white/10 pt-[clamp(16px,2.2vh,32px)] pb-[clamp(16px,2.2vh,32px)] px-6 relative ${isMobile ? "mb-16" : "mb-[clamp(16px,2vh,28px)]"}`}>
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 w-full">
              <h2 className="text-[clamp(1.5rem,2.2vw,3rem)] font-black tracking-tighter uppercase leading-none text-white">
                Services & Capabilities
              </h2>
              <p className="font-sans font-light text-[clamp(10px,0.6vw,12px)] tracking-widest max-w-xs md:max-w-md border-t border-white/20 text-white/80 pt-2">
                We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
              </p>
            </div>
          </div>

          {/* Top-Anchored Scale Container */}
          <motion.div 
            style={isMobile ? {} : { scale: contentScale }}
            className="w-full flex flex-col items-center justify-start origin-top z-10 pt-0"
          >
            {/* ACCORDION LIST */}
            <div className="w-full max-w-6xl mx-auto px-6 flex flex-col pb-8">
              {bentoData.map((step, index) => {
                const isOpen = activeIndex === index;
                return (
                  <div
                    key={step.num}
                    id={`process-step-site5-${index}`}
                    className={`border-b border-black/10 last:border-b-0 w-full transition-all duration-300 rounded-lg ${isOpen ? "bg-white backdrop-blur-none shadow-[0_10px_30px_rgba(0,0,0,0.04)]" : "bg-white/56 backdrop-blur-[9.6px] shadow-none"}`}
                  >
                    <button
                      onClick={() => handleItemClick(index)}
                      className={`w-full text-left flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.01] transition-all px-4 rounded-lg group select-none border-none outline-none bg-transparent ${isOpen ? "py-3 md:py-4" : "py-1.5 md:py-2"}`}
                    >
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-sans font-light text-sm text-black/40">[{step.num}]</span>
                        <span 
                          className={`font-header font-black text-2xl md:text-3xl tracking-tight transition-colors duration-300 uppercase ${isOpen ? 'text-[var(--brand)]' : 'text-black group-hover:text-[var(--brand)]'}`}
                        >
                          {step.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 self-end md:self-auto">
                        <motion.span 
                          style={{ color: isOpen ? activeColor : brandColor }}
                          className="font-header font-black text-xs uppercase tracking-wider hidden sm:inline"
                        >
                          {step.label}
                        </motion.span>
                        <motion.div
                          style={isOpen ? { borderColor: activeColor, color: activeColor } : {}}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center bg-white shadow-sm transition-all ${isOpen ? 'rotate-[135deg]' : 'border-black/10 text-black group-hover:border-[var(--brand)] group-hover:text-[var(--brand)]'}`}
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
                          transition={{ type: "spring", stiffness: 120, damping: 20 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-6 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-t border-black/5 mt-1">
                            {/* Left Column: Description */}
                            <div className="lg:col-span-4 flex flex-col justify-start pt-2">
                              <div>
                                <p className="font-sans font-light text-sm md:text-base text-black/75 leading-relaxed max-w-xl">
                                  {step.longDesc}
                                </p>
                              </div>
                            </div>

                            {/* Right Column: Capabilities */}
                            <div className="lg:col-span-8 flex flex-col justify-center lg:pl-8 lg:border-l border-black/10">
                              <motion.h4 style={{ color: activeColor }} className="font-header font-black text-[15px] tracking-widest uppercase mb-4">
                                Detailed Capabilities
                              </motion.h4>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3">
                                {step.longFeatures.map((feat) => (
                                  <li
                                    key={feat.name}
                                    className="flex items-start gap-2"
                                  >
                                    <motion.span style={{ color: brandColor }} className="text-[18px] font-bold leading-none mt-0.5">+</motion.span>
                                    <div>
                                      <span className="font-header font-black text-[15px] text-black uppercase tracking-wider block">
                                        {feat.name}
                                      </span>
                                      <span className="font-sans font-light text-[13.5px] text-black/60 leading-relaxed block">
                                        {feat.desc}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
        {!isMobile && <div className="h-[40vh] bg-white pointer-events-none" />}
      </section>

      {/* SECTION 5: Contact Us */}
      <section id="contact-section" className="w-full border-t border-black/20 scroll-mt-[clamp(56px,6vh,72px)] bg-[var(--brand)] snap-start lg:h-[calc(100vh-clamp(56px,6vh,72px))] min-h-screen lg:min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-full h-auto">
          
          {/* LEFT SIDE COPY BLOCK */}
          <div className="p-8 md:p-16 flex flex-col justify-between bg-transparent min-h-[400px] lg:h-full">
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
          <div className="p-8 md:p-16 bg-white text-black flex flex-col justify-center lg:h-full">
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl w-full mx-auto">
                <input type="hidden" name="_subject" value="New Inquiry from Product Dept. (Site 5)" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-black">NAME</label>
                    <input type="text" id="name" name="name" className="border border-black/10 bg-white text-black py-4 px-4 outline-none focus:border-black transition-colors font-mono uppercase text-sm" placeholder="JANE DOE" required />
                  </div>
                  <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-black">EMAIL</label>
                    <input type="email" id="email" name="email" className="border border-black/10 bg-white text-black py-4 px-4 outline-none focus:border-black transition-colors font-mono uppercase text-sm" placeholder="JANE@COMPANY.COM" required />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-black">ORGANIZATION</label>
                  <input type="text" id="company" name="company" className="border border-black/10 bg-white text-black py-4 px-4 outline-none focus:border-black transition-colors font-mono uppercase text-sm" placeholder="ORGANIZATION NAME" />
                </div>

                <div className="flex flex-col gap-3">
                  <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-black">MESSAGE</label>
                  <textarea id="description" name="description" rows={5} className="border border-black/10 bg-white text-black py-4 px-4 outline-none focus:border-black transition-colors resize-none font-mono uppercase text-sm" placeholder="TELL US EVERYTHING..." required></textarea>
                </div>

                <div className="pt-8 flex justify-center">
                   <button
                     type="submit"
                     disabled={isSubmitting}
                     className="w-full max-w-[200px] bg-black text-white hover:bg-white hover:text-black hover:border-black border border-transparent transition-colors py-3.5 font-bold text-sm tracking-widest uppercase cursor-pointer"
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
    </main>
  );
}
