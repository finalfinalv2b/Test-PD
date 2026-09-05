"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

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
    bgImage: "/photo-flicker/engineering_anim.mp4",
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
    bgImage: "/photo-flicker/manufacturing_anim.mp4",
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

export default function Home() {
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
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const [wordmarkHalfHeight, setWordmarkHalfHeight] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      windowWidthRef.current = window.innerWidth;
      windowHeightRef.current = window.innerHeight;

      if (wordmarkRef.current) {
        setWordmarkHalfHeight(wordmarkRef.current.offsetHeight / 2);
      }

      if (mobile) {
        setContentScale(1);
        return;
      }

      // Height logic: viewport height minus fixed navbar (clamp 56px to 72px) and bottom padding
      const navbarHeight = Math.min(72, Math.max(56, window.innerHeight * 0.06));
      const availableHeight = window.innerHeight - navbarHeight - 40;
      // Natural height budget for pinned header + accordion with 1 item open is ~620px
      const naturalHeight = 620;

      let scaleFactor = availableHeight / naturalHeight;
      // Cap at 1 on desktop so standard screens have crisp, unscaled 1:1 rendering, gently scale on short screens
      scaleFactor = Math.min(1, Math.max(0.65, scaleFactor));
      setContentScale(scaleFactor);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize active accordion index with natural/touchpad scroll progress on desktop
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = () => {
      // If animating via click or mouse wheel notch snap, avoid overriding
      if (isClickScrollingRef.current) return;

      const section = processSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = rect.top + scrollTop;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      if (scrollableHeight <= 0) return;

      // Progress through the pinned section (0 = top of section, 1 = bottom of section)
      const progress = (scrollTop - sectionStart) / scrollableHeight;

      if (progress >= 0 && progress <= 1) {
        const targetIndex = Math.min(6, Math.max(0, Math.floor(progress * 7)));

        if (targetIndex !== activeIndexRef.current) {
          setActiveIndex(targetIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Smooth scroll to Get In Touch section
  const scrollToContact = () => {
    const contactSec = document.getElementById("contact-section");
    if (!contactSec) return;

    isClickScrollingRef.current = true;
    const navbarHeight = Math.min(72, Math.max(56, window.innerHeight * 0.06));
    const rect = contactSec.getBoundingClientRect();
    const targetY = window.scrollY + rect.top - navbarHeight;

    const handleScrollEnd = () => {
      isClickScrollingRef.current = false;
      window.removeEventListener("scrollend", handleScrollEnd);
    };
    window.addEventListener("scrollend", handleScrollEnd);

    setTimeout(() => {
      isClickScrollingRef.current = false;
      window.removeEventListener("scrollend", handleScrollEnd);
    }, 1000);

    window.scrollTo({
      top: targetY,
      behavior: "smooth"
    });
  };

  const scrollToContactRef = useRef(scrollToContact);
  scrollToContactRef.current = scrollToContact;

  // Update active index based on scroll on desktop
  // Click handler that toggles on mobile, and scrolls to target position on desktop
  const handleItemClick = (index: number) => {
    if (isMobile) {
      const nextIndex = index === activeIndex ? null : index;
      setActiveIndex(nextIndex);
      if (nextIndex !== null) {
        setTimeout(() => {
          const el = document.getElementById(`process-step-site5-${index}`);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 150);
      }
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
      const targetProgress = (index + 0.5) / 7;
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
      }, 500);

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
    let isTrackpadActive = false;
    let trackpadTimer: NodeJS.Timeout | null = null;

    const handleWheel = (e: WheelEvent) => {
      // Touchpad detection:
      // Touchpads produce non-integer deltas, horizontal drift (deltaX), or continuous small micro-deltas.
      const hasDeltaX = Math.abs(e.deltaX) > 0;
      const isFloatDelta = !Number.isInteger(e.deltaY);
      const isSmallDelta = Math.abs(e.deltaY) > 0 && Math.abs(e.deltaY) < 40 && e.deltaMode === 0;

      if (hasDeltaX || isFloatDelta || isSmallDelta) {
        isTrackpadActive = true;
        if (trackpadTimer) clearTimeout(trackpadTimer);
        trackpadTimer = setTimeout(() => {
          isTrackpadActive = false;
        }, 500);
      }

      // If the user is on a touchpad, DO NOT intercept or preventDefault!
      // This completely eliminates touchpad rubberbanding, delay, and momentum fights.
      if (isTrackpadActive) {
        return;
      }

      // For discrete mouse wheel notches, preserve step-by-step navigation
      const section = processSectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      const isInside = scrollY >= sectionTop - 100 && scrollY < sectionTop + sectionHeight - window.innerHeight - 50;

      if (!isInside) {
        // At the top (scrollY < 10) with mouse wheel scrolling down, snap to services
        if (scrollY < 10 && e.deltaY > 0) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 300) {
            lastSnapTimeRef.current = now;
            handleItemClickRef.current(0);
          }
        } else if (scrollY >= sectionTop + sectionHeight - window.innerHeight - 100 && e.deltaY < 0) {
          // In the contact section scrolling up, snap back to Venture Infrastructure
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 300) {
            lastSnapTimeRef.current = now;
            handleItemClickRef.current(6);
          }
        }
        return;
      }

      // Inside services section with mouse wheel: step through items
      e.preventDefault();

      const now = Date.now();
      const timeSinceLastSnap = now - lastSnapTimeRef.current;
      
      if (timeSinceLastSnap < 250) {
        return;
      }

      if (e.deltaY > 0) {
        // Scroll DOWN
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx < 6) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 6) {
          lastSnapTimeRef.current = now;
          scrollToContactRef.current();
        }
      } else if (e.deltaY < 0) {
        // Scroll UP
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
        if (now - lastSnapTimeRef.current < 400) return;
        
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx < 6) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 6) {
          lastSnapTimeRef.current = now;
          scrollToContactRef.current();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSnapTimeRef.current < 400) return;
        
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
      if (trackpadTimer) clearTimeout(trackpadTimer);
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
        backgroundColor: "#000000",
        color: "#FFFFFF",
        "--background": "#000000",
        "--foreground": "#FFFFFF",
        "--brand": brandColor
      } as React.CSSProperties}
      className="relative w-full min-h-screen bg-black text-white transition-colors duration-500 font-sans font-light pt-[clamp(56px,6vh,72px)]"
    >
      {/* SECTION 1: Title Page with Cropped Background Logo & Two-Column Layout */}
      <section className="relative w-full h-[calc(100dvh-clamp(56px,6vh,72px))] min-h-[540px] flex flex-col items-center justify-between border-b border-white/10 bg-black text-white overflow-hidden px-4 sm:px-8">
        
        {/* Background Logo: Scaled down 8% */}
        <div className={`absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 aspect-[564.03/288.69] pointer-events-none select-none ${isMobile ? "top-[44%] w-[176vw] min-w-[550px]" : "top-[48%] w-[101vw] min-w-[990px]"}`}>
          <svg
            viewBox="0 0 564.03 288.69"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Circle Shape */}
            <path
              d="M136.64,15.41c75.46,0,136.64,61.17,136.64,136.64s-61.17,136.64-136.64,136.64S0,227.51,0,152.05,61.17,15.41,136.64,15.41"
              fill={brandColor || "#f41c06"}
            />
            {/* Square Shape */}
            <polygon
              points="553.22 284.38 311.9 284.38 286.31 0 562.31 67.5 553.22 284.38"
              fill={brandColor || "#f41c06"}
            />
          </svg>
        </div>

        {/* Content Container: Wordmark on Left, Justified Paragraph on Right with Equal Buffer from Monitor Edges */}
        <div
          style={!isMobile ? { transform: `translateY(-${wordmarkHalfHeight !== null ? `${wordmarkHalfHeight}px` : '4.5vw'})` } : undefined}
          className={`relative z-10 w-full max-w-[1550px] mx-auto px-[clamp(20px,5vw,72px)] flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 lg:gap-10 xl:gap-14 ${isMobile ? "my-auto pb-24 pt-2" : "absolute top-1/2 left-0 right-0"}`}
        >
          
          {/* LEFT SIDE: PD Title Page Wordmark SVG (Scales with monitor width) */}
          <div className="w-full lg:w-auto flex-1 flex flex-col justify-start items-center lg:items-start">
            <motion.img
              ref={wordmarkRef}
              onLoad={() => {
                if (wordmarkRef.current) {
                  setWordmarkHalfHeight(wordmarkRef.current.offsetHeight / 2);
                }
              }}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              src="/pd-title-page-wordmark.svg"
              alt="Product Dept. - Where great ideas become exceptional products."
              className="w-[88vw] max-w-[415px] lg:max-w-none lg:w-[clamp(420px,49vw,880px)] h-auto object-contain select-none pointer-events-none mt-0"
            />
          </div>

          {/* RIGHT SIDE: Paragraph (Scales with monitor, flush right with equal buffer) + Center-Justified CTA 3 spaces below */}
          <div className="w-full lg:w-auto shrink-0 flex flex-col justify-start items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="flex flex-col justify-start w-full max-w-[340px] sm:max-w-[380px] lg:max-w-none lg:w-[clamp(280px,25vw,410px)]"
            >
              {/* Paragraphs: Justified left and right, with last line left justified */}
              <div
                style={{ textAlign: "justify", textAlignLast: "left" }}
                className="text-justify [text-align-last:left] text-[clamp(10px,0.76vw,13.5px)] font-sans font-light tracking-wide text-white leading-[1.62] space-y-3 sm:space-y-4"
              >
                <p className="m-0 p-0 font-bold mb-5 sm:mb-6">
                  Product Dept. is an industry agnostic, full-stack product creation company partnering with venture and established companies to scale physical product lines quickly, reliably, and profitably.
                </p>
                <p className="m-0 p-0 font-light">
                  We provide product design, engineering, sourcing, manufacturing, and infrastructure to build new supply chains and optimize existing ones. By drawing on decades of global manufacturing relationships and corporate operations experience we bring vision to life, from concept to commercialization, and provide the foundation for profitable enterprises. We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
                </p>
              </div>

              {/* Centered CTA 3 spaces below the paragraph */}
              <div className="w-full text-center mt-5 sm:mt-7 md:mt-9 pointer-events-auto">
                <button
                  onClick={() => {
                    handleItemClick(0);
                  }}
                  className="text-white font-sans font-bold tracking-widest text-[clamp(9.5px,0.7vw,12px)] hover:text-white/75 transition-colors uppercase cursor-pointer bg-transparent border-none outline-none"
                >
                  EXPLORE OUR SERVICES & CAPABILITIES
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Client Name Scrolling Animation (ALWAYS at the bottom of the homescreen - including on mobile) */}
        <div className="absolute bottom-0 left-0 w-full flex flex-col gap-1.5 overflow-hidden select-none z-20 bg-black/85 backdrop-blur-[2px]">
          <div className="px-6 md:px-12 text-left pt-2">
            <span className="font-sans text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
              Select Partners
            </span>
          </div>

          <div className="w-full overflow-hidden relative py-2.5 md:py-3 border-y border-white/10 flex">
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
                  <div className="w-5 h-5 border border-white/35 flex items-center justify-center rounded">
                    {partner.shape === 'circle' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                    {partner.shape === 'square' && <div className="w-2.5 h-2.5 bg-white" />}
                    {partner.shape === 'triangle' && (
                      <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[8px] border-b-white" />
                    )}
                    {partner.shape === 'diamond' && <div className="w-2 h-2 bg-white rotate-45" />}
                  </div>
                  <span className="font-header font-black tracking-widest text-[clamp(9px,0.85vw,11px)] uppercase text-white">{partner.name}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Pinned Services Accordion */}
      <section 
        ref={processSectionRef} 
        id="process-section" 
        className={`relative bg-[#FFFFFF] border-b border-black w-full scroll-mt-[clamp(56px,6vh,72px)] ${isMobile ? "py-24" : "h-[450vh]"}`}
      >
        {/* Pinned Wrapper for Desktop */}
        <div className={isMobile ? "w-full" : "sticky top-[clamp(56px,6vh,72px)] left-0 w-full h-[calc(100vh-clamp(56px,6vh,72px))] overflow-hidden flex flex-col items-center justify-start bg-transparent"}>
          
          {/* SERVICE BACKGROUND PHOTOS LAYER */}
          <div className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${isMobile ? "hidden" : ""}`}>
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
              <span className="text-[clamp(1.05rem,1.54vw,2.1rem)] font-sans font-light tracking-tighter uppercase leading-none text-white block">
                Services & Capabilities
              </span>
              <p className="font-sans font-light text-xs md:text-[clamp(10px,0.6vw,12px)] tracking-widest max-w-xs md:max-w-md border-t border-white/20 text-white/80 pt-2">
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
                    className={`border-b border-black/10 last:border-b-0 w-full transition-[background-color,backdrop-filter,box-shadow] duration-300 rounded-lg ${isOpen ? "bg-white backdrop-blur-none shadow-[0_10px_30px_rgba(0,0,0,0.04)]" : "bg-white/56 backdrop-blur-[9.6px] shadow-none"}`}
                  >
                    <button
                      onClick={() => handleItemClick(index)}
                      className="w-full text-left flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.01] transition-colors duration-200 px-4 py-2.5 md:py-3.5 rounded-lg group select-none border-none outline-none bg-transparent"
                    >
                      <div className="flex items-baseline gap-4 md:gap-6">
                        <span className="font-sans font-light text-sm text-black/40">[{step.num}]</span>
                        <span 
                          className={`font-header font-black text-2xl md:text-3xl tracking-tight transition-colors duration-200 uppercase ${isOpen ? 'text-[var(--brand)]' : 'text-black group-hover:text-[var(--brand)]'}`}
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
                        <div
                          className={`w-8 h-8 rounded-full border border-black/15 flex items-center justify-center bg-white shadow-sm text-black transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'rotate-[135deg]' : 'rotate-0'}`}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                        </div>
                      </div>
                    </button>

                    {/* Expandable Content with buttery-smooth CSS Grid transition */}
                    <div
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                      className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    >
                      <div className="overflow-hidden">
                        <div className={`px-4 pb-6 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 border-t border-black/5 mt-1 transition-opacity duration-250 ${isOpen ? "opacity-100 delay-50" : "opacity-0 pointer-events-none"}`}>
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 5: Contact Us */}
      <section id="contact-section" className="w-full border-t border-black/20 scroll-mt-[clamp(56px,6vh,72px)] bg-[var(--brand)] lg:h-[calc(100vh-clamp(56px,6vh,72px))] min-h-screen lg:min-h-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:h-full h-auto">
          
          {/* LEFT SIDE COPY BLOCK */}
          <div className="p-8 md:p-16 flex flex-col justify-start bg-transparent lg:h-full">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-12">
              GET IN <br /> TOUCH.
            </h1>
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
                  <textarea id="description" name="description" rows={5} className="border border-black/10 bg-white text-black py-4 px-4 outline-none focus:border-black transition-colors resize-none font-mono uppercase text-sm" placeholder="HOW CAN WE HELP?" required></textarea>
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
