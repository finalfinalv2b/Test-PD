"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const bentoData = [
  {
    num: "01",
    title: "STRATEGY",
    label: "REQUIREMENTS SET",
    bgImage: "",
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
    bgImage: "/photo-flicker/design_anim.mp4",
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
    bgImage: "/photo-flicker/engineering_anim2.mp4",
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
    bgImage: "/photo-flicker/sourcing_anim.mp4",
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
    bgImage: "/photo-flicker/manufacturing_anim2.mp4",
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
    isColor: true,
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
  { 
    name: "DirectMeds", 
    logo: "/client-logos/directmeds.svg", 
    className: "h-[17.5px] sm:h-[20px] md:h-[22px] w-auto object-contain" 
  },
  { 
    name: "C.O. Bigelow", 
    logo: "/client-logos/co-bigelow.svg", 
    className: "h-[18px] sm:h-[20px] md:h-[22px] w-auto object-contain" 
  },
  { 
    name: "CleanCradle", 
    logo: "/client-logos/cleancradle.svg", 
    className: "h-[12px] sm:h-[13.5px] md:h-[15px] w-auto object-contain" 
  },
  { 
    name: "Reel Paper", 
    logo: "/client-logos/reel-paper.svg", 
    className: "h-[16px] sm:h-[18px] md:h-[20px] w-auto object-contain" 
  },
  { 
    name: "MDDN", 
    logo: "/client-logos/mddn.svg", 
    className: "h-[16.5px] sm:h-[19px] md:h-[21px] w-auto object-contain" 
  },
  { 
    name: "NewBio Rx", 
    logo: "/client-logos/newbio-rx.svg", 
    className: "h-[13px] sm:h-[14.5px] md:h-[16px] w-auto object-contain" 
  }
];

function ServiceBackgroundVideo({ src, isOpen, isColor = false }: { src: string; isOpen: boolean; isColor?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isOpen) {
      try {
        video.currentTime = 0;
      } catch {}

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          if (err.name !== "AbortError") {
            // Non-critical playback interruption
          }
        });
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {}
    }
  }, [isOpen]);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isOpen) {
      try {
        video.currentTime = 0;
      } catch {}
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch {}
    }
  };

  return (
    <video
      ref={videoRef}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      className={`w-full h-full object-cover ${isColor ? "" : "grayscale"}`}
      style={isColor ? undefined : { filter: "grayscale(100%)" }}
    />
  );
}

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isInServices, setIsInServices] = useState(false);
  const isInServicesRef = useRef(false);
  isInServicesRef.current = isInServices;
  const [isContactOpen, setIsContactOpen] = useState(false);
  const isContactOpenRef = useRef(false);
  isContactOpenRef.current = isContactOpen;
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const isAboutOpenRef = useRef(false);
  isAboutOpenRef.current = isAboutOpen;
  const [isMobile, setIsMobile] = useState(false);
  const [contentScale, setContentScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1440);

  // Contact States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [nyTime, setNyTime] = useState("");
  const [brandColor, setBrandColor] = useState("#f41c06");

  const processSectionRef = useRef<HTMLDivElement>(null);

  const windowWidthRef = useRef(1920);
  const windowHeightRef = useRef(1080);
  const isClickScrollingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const wordmarkRef = useRef<HTMLImageElement>(null);
  const [wordmarkHalfHeight, setWordmarkHalfHeight] = useState<number | null>(null);
  const partnersBannerRef = useRef<HTMLDivElement>(null);
  const [bannerHeight, setBannerHeight] = useState<number>(64);

  const tabsTrackRef = useRef<HTMLDivElement>(null);
  const tabsInnerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeTabMetrics, setActiveTabMetrics] = useState<{
    left: number;
    width: number;
    center: number;
    containerWidth: number;
  }>({
    left: 0,
    width: 140,
    center: 70,
    containerWidth: 1152
  });

  useEffect(() => {
    const updateMetrics = () => {
      const idx = activeIndex ?? 0;
      const btn = tabRefs.current[idx];
      const inner = tabsInnerRef.current;
      if (btn && inner) {
        const btnRect = btn.getBoundingClientRect();
        const innerRect = inner.getBoundingClientRect();
        setActiveTabMetrics({
          left: Math.round(btnRect.left - innerRect.left),
          width: Math.round(btnRect.width),
          center: Math.round(btnRect.left - innerRect.left + btnRect.width / 2),
          containerWidth: Math.round(innerRect.width)
        });
      }
    };
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [activeIndex, windowWidth]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      windowWidthRef.current = window.innerWidth;
      windowHeightRef.current = window.innerHeight;
      setWindowWidth(window.innerWidth);

      if (wordmarkRef.current) {
        setWordmarkHalfHeight(wordmarkRef.current.offsetHeight / 2);
      }
      if (partnersBannerRef.current) {
        setBannerHeight(partnersBannerRef.current.offsetHeight);
      }

      if (mobile) {
        setContentScale(1);
        return;
      }

      // Height logic: viewport height minus fixed navbar (clamp 56px to 72px)
      const navbarHeight = Math.min(72, Math.max(56, window.innerHeight * 0.06));
      // Space taken by pinned elements above and below card:
      // Header block (~52px) + tab track (~45px) + scale-container padding (~12px) + bottom safety margin (~20px)
      const fixedHeaderOverhead = 129;
      const availableForContent = window.innerHeight - navbarHeight - fixedHeaderOverhead;

      // Natural unscaled height of single service card with frosted connector:
      // Connector (~34px) + card with detailed capabilities (~420px) = ~454px
      const naturalCardHeight = 454;

      let scaleFactor = availableForContent / naturalCardHeight;
      // Cap at 1 on standard/large displays, smoothly scale if screen height is unusually small
      scaleFactor = Math.min(1, Math.max(0.65, scaleFactor));
      setContentScale(scaleFactor);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Synchronize active accordion index with natural/touchpad scroll progress on desktop (8 stages: 0-6 tabs, 7 contact)
  useEffect(() => {
    const handleScroll = () => {
      const section = processSectionRef.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        const inServices = rect.top <= 200;
        if (inServices !== isInServicesRef.current) {
          setIsInServices(inServices);
          isInServicesRef.current = inServices;
        }
      }

      if (isMobile) return;

      // If animating via click or mouse wheel notch snap, avoid overriding
      if (isClickScrollingRef.current) return;

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
        const targetStage = Math.min(8, Math.max(0, Math.floor(progress * 9)));

        if (targetStage === 8) {
          if (!isContactOpenRef.current) {
            setIsContactOpen(true);
          }
          if (isAboutOpenRef.current) {
            setIsAboutOpen(false);
          }
        } else if (targetStage === 7) {
          if (isContactOpenRef.current) {
            setIsContactOpen(false);
          }
          if (!isAboutOpenRef.current) {
            setIsAboutOpen(true);
          }
        } else {
          if (isContactOpenRef.current) {
            setIsContactOpen(false);
          }
          if (isAboutOpenRef.current) {
            setIsAboutOpen(false);
          }
          if (targetStage !== activeIndexRef.current) {
            setActiveIndex(targetStage);
          }
        }
      } else if (progress < 0) {
        if (isContactOpenRef.current) {
          setIsContactOpen(false);
        }
        if (isAboutOpenRef.current) {
          setIsAboutOpen(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Snaps in the About section from the right
  const scrollToAbout = () => {
    setIsContactOpen(false);
    setIsAboutOpen(true);

    if (isMobile) {
      const aboutSec = document.getElementById("about-section");
      if (aboutSec) {
        aboutSec.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    isClickScrollingRef.current = true;

    if (processSectionRef.current) {
      const rect = processSectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = rect.top + scrollTop;
      const sectionHeight = processSectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      const targetProgress = (7 + 0.5) / 9;
      const targetScrollY = sectionStart + (targetProgress * scrollableHeight);

      const handleScrollEnd = () => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      };
      window.addEventListener("scrollend", handleScrollEnd);

      setTimeout(() => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      }, 900);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  };

  const scrollToAboutRef = useRef(scrollToAbout);
  scrollToAboutRef.current = scrollToAbout;

  // Snaps in the Get In Touch section from the left
  const scrollToContact = () => {
    setIsAboutOpen(false);
    setIsContactOpen(true);

    if (isMobile) {
      const contactSec = document.getElementById("contact-section");
      if (contactSec) {
        contactSec.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    isClickScrollingRef.current = true;

    if (processSectionRef.current) {
      const rect = processSectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const sectionStart = rect.top + scrollTop;
      const sectionHeight = processSectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      const targetProgress = (8 + 0.5) / 9;
      const targetScrollY = sectionStart + (targetProgress * scrollableHeight);

      const handleScrollEnd = () => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      };
      window.addEventListener("scrollend", handleScrollEnd);

      setTimeout(() => {
        isClickScrollingRef.current = false;
        window.removeEventListener("scrollend", handleScrollEnd);
      }, 900);

      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth"
      });
    }
  };

  const scrollToContactRef = useRef(scrollToContact);
  scrollToContactRef.current = scrollToContact;

  // Update active index based on scroll on desktop
  // Click handler that toggles on mobile, and scrolls to target position on desktop
  const handleItemClick = (index: number) => {
    if (isContactOpenRef.current) {
      setIsContactOpen(false);
    }
    if (isAboutOpenRef.current) {
      setIsAboutOpen(false);
    }

    setIsInServices(true);
    isInServicesRef.current = true;

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
      
      // Calculate target progress coordinate at middle of the index range across 9 stages
      const targetProgress = (index + 0.5) / 9;
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

  // Listen to open-contact, open-about, and close events from Navigation and hash navigation
  useEffect(() => {
    const onOpenContact = () => scrollToContactRef.current();
    const onCloseContact = () => handleItemClickRef.current(0);
    const onOpenAbout = () => scrollToAboutRef.current();
    const onCloseAbout = () => handleItemClickRef.current(0);

    window.addEventListener("open-contact", onOpenContact);
    window.addEventListener("close-contact", onCloseContact);
    window.addEventListener("open-about", onOpenAbout);
    window.addEventListener("close-about", onCloseAbout);

    if (window.location.hash === "#contact-section") {
      setTimeout(() => {
        scrollToContactRef.current();
      }, 200);
    } else if (window.location.hash === "#about-section") {
      setTimeout(() => {
        scrollToAboutRef.current();
      }, 200);
    }

    return () => {
      window.removeEventListener("open-contact", onOpenContact);
      window.removeEventListener("close-contact", onCloseContact);
      window.removeEventListener("open-about", onOpenAbout);
      window.removeEventListener("close-about", onCloseAbout);
    };
  }, []);

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
      if (isTrackpadActive) {
        return;
      }

      // If Contact section is open:
      if (isContactOpenRef.current) {
        if (e.deltaY < 0) {
          // Scrolling UP from Contact: snap back to About
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 350) {
            lastSnapTimeRef.current = now;
            scrollToAboutRef.current();
          }
        } else if (e.deltaY > 0) {
          e.preventDefault();
        }
        return;
      }

      // If About section is open:
      if (isAboutOpenRef.current) {
        if (e.deltaY > 0) {
          // Scrolling DOWN from About: snap to Contact
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 350) {
            lastSnapTimeRef.current = now;
            scrollToContactRef.current();
          }
        } else if (e.deltaY < 0) {
          // Scrolling UP from About: snap back to Venture Infrastructure (Tab 6)
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 350) {
            lastSnapTimeRef.current = now;
            handleItemClickRef.current(6);
          }
        }
        return;
      }

      // For discrete mouse wheel notches, preserve step-by-step navigation
      const section = processSectionRef.current;
      if (!section) return;

      const scrollY = window.scrollY;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      const isInside = scrollY >= sectionTop - 100 && scrollY <= sectionTop + sectionHeight - window.innerHeight + 100;

      if (!isInside) {
        // At the top (scrollY < 10) with mouse wheel scrolling down, snap to services
        if (scrollY < 10 && e.deltaY > 0) {
          e.preventDefault();
          const now = Date.now();
          if (now - lastSnapTimeRef.current > 300) {
            lastSnapTimeRef.current = now;
            handleItemClickRef.current(0);
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
          scrollToAboutRef.current();
        }
      } else if (e.deltaY < 0) {
        // Scroll UP
        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx > 0) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0) {
          lastSnapTimeRef.current = now;
          setIsInServices(false);
          isInServicesRef.current = false;
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
      const isInside = scrollY >= sectionTop - 100 && scrollY <= sectionTop + sectionHeight - window.innerHeight + 100;

      if (!isInside) return;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSnapTimeRef.current < 400) return;
        
        if (isContactOpenRef.current) return;

        if (isAboutOpenRef.current) {
          lastSnapTimeRef.current = now;
          scrollToContactRef.current();
          return;
        }

        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx < 6) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 6) {
          lastSnapTimeRef.current = now;
          scrollToAboutRef.current();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        const now = Date.now();
        if (now - lastSnapTimeRef.current < 400) return;
        
        if (isContactOpenRef.current) {
          lastSnapTimeRef.current = now;
          scrollToAboutRef.current();
          return;
        }

        if (isAboutOpenRef.current) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(6);
          return;
        }

        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx > 0) {
          lastSnapTimeRef.current = now;
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0) {
          lastSnapTimeRef.current = now;
          setIsInServices(false);
          isInServicesRef.current = false;
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
      await fetch("https://formsubmit.co/ajax/info@productdept.com", {
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
      {/* Background Logo: Transitions between Title Page hero position and behind Strategy card in Services */}
      <motion.div
        initial={false}
        animate={{
          top: isInServices
            ? (isMobile 
                ? "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.55)" 
                : "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.585)")
            : (isMobile 
                ? "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.40)" 
                : "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.44)"),
          x: (isAboutOpen || isContactOpen) ? "-150%" : "-50%",
          y: "-50%",
          opacity: (!isInServices || activeIndex === 0 || activeIndex === null) && !isContactOpen && !isAboutOpen ? 1 : 0
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`fixed left-1/2 z-0 aspect-[564.03/288.69] pointer-events-none select-none ${
          isMobile ? "w-[190vw] min-w-[595px]" : "w-[109vw] min-w-[1070px]"
        }`}
      >
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
      </motion.div>

      {/* SECTION 1: Title Page with Two-Column Layout */}
      <section className="relative w-full h-[calc(100dvh-clamp(56px,6vh,72px))] min-h-[540px] flex flex-col items-center justify-between border-b border-white/10 bg-transparent text-white overflow-hidden">

        {/* Content Container: Wordmark on Left, Paragraph Centered Vertically Between Header & Partners Banner on Right */}
        <div
          style={!isMobile ? { height: `calc(100% - ${bannerHeight}px)` } : undefined}
          className={`z-10 w-full px-6 sm:px-10 lg:px-[10.5vw] flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 ${
            isMobile ? "relative my-auto pb-24 pt-2" : "absolute top-0 left-0 right-0"
          }`}
        >
          
          {/* LEFT SIDE: PD Title Page Wordmark SVG */}
          <div className="w-full lg:w-auto flex flex-col justify-center items-center lg:items-start">
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
              className="w-[88vw] max-w-[415px] lg:max-w-none lg:w-[clamp(400px,43vw,750px)] min-[1800px]:w-[clamp(750px,46.8vw,960px)] h-auto object-contain select-none pointer-events-none mt-0"
            />
          </div>

          {/* RIGHT SIDE: Paragraph (Slightly narrower & taller, centered vertically between header and partners banner) */}
          <div className="w-full lg:w-auto flex flex-col justify-center items-center lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-start w-full max-w-[340px] sm:max-w-[420px] lg:max-w-none lg:w-[clamp(330px,26vw,420px)] min-[1800px]:w-[clamp(430px,25.5vw,530px)]"
            >
              {/* Paragraphs: Justified left and right, with last line left justified */}
              <div
                style={{ textAlign: "justify", textAlignLast: "left" }}
                className="text-justify [text-align-last:left] text-[clamp(13px,0.99vw,17.5px)] min-[1800px]:text-[clamp(16.5px,0.95vw,18.5px)] font-sans font-light tracking-wide text-white leading-[1.56] space-y-2.5 sm:space-y-3 min-[1800px]:space-y-3.5"
              >
                <p className="m-0 p-0 font-bold mb-3 sm:mb-4 min-[1800px]:mb-5">
                  Product Dept. is an industry agnostic, full-stack product creation company partnering with venture and established companies to scale physical product lines quickly, reliably, and profitably.
                </p>
                <p className="m-0 p-0 font-light">
                  We provide product design, engineering, sourcing, manufacturing, and infrastructure to build new supply chains and optimize existing ones. By drawing on decades of global manufacturing relationships and corporate operations experience we bring vision to life, from concept to commercialization, and provide the foundation for profitable enterprises. We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
                </p>
              </div>

              {/* Centered CTA below the paragraph */}
              <div className="w-full text-center mt-4 sm:mt-5 md:mt-6 min-[1800px]:mt-7 pointer-events-auto">
                <button
                  onClick={() => {
                    handleItemClick(0);
                  }}
                  className="text-white font-sans font-bold tracking-widest text-[clamp(11px,0.8vw,14px)] min-[1800px]:text-[15px] hover:text-white/75 transition-colors uppercase cursor-pointer bg-transparent border-none outline-none"
                >
                  EXPLORE OUR SERVICES & CAPABILITIES
                </button>
              </div>
            </motion.div>
          </div>

        </div>

        {/* Client Name Scrolling Animation (ALWAYS at the bottom of the homescreen - including on mobile) */}
        <div
          ref={partnersBannerRef}
          className="absolute bottom-0 left-0 w-full flex flex-col gap-1.5 overflow-hidden select-none z-20 bg-black/85 backdrop-blur-[2px]"
        >
          <div className="px-6 md:px-12 text-left pt-2">
            <span className="font-sans text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
              Select Partners
            </span>
          </div>

          <div className="w-full overflow-hidden relative py-3 md:py-3.5 border-y border-white/10 flex items-center">
            <motion.div
              className="flex items-center gap-14 sm:gap-16 md:gap-20 pr-14 sm:pr-16 md:pr-20 whitespace-nowrap min-w-full shrink-0"
              animate={{ x: [0, "-50%"] }}
              transition={{
                ease: "linear",
                duration: 120,
                repeat: Infinity
              }}
            >
              {[...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners, ...partners].map((partner, index) => (
                <div key={index} className="flex items-center justify-center shrink-0 opacity-75 hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className={`${partner.className} max-w-none select-none pointer-events-none`}
                  />
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
        className={`relative bg-transparent border-b border-black w-full scroll-mt-[clamp(56px,6vh,72px)] ${isMobile ? "py-24" : "h-[600vh]"}`}
      >
        {/* Pinned Wrapper for Desktop */}
        <div className={isMobile ? "w-full" : "sticky top-[clamp(56px,6vh,72px)] left-0 w-full h-[calc(100vh-clamp(56px,6vh,72px))] overflow-hidden flex flex-col items-center justify-start bg-transparent"}>
          
          {/* SECTION 3 & 4: Services Viewport Panel - Pushed aside as if connected to About & Get In Touch */}
          <motion.div
            id="services-panel"
            initial={false}
            animate={{
              x: isMobile ? 0 : ((isAboutOpen || isContactOpen) ? "-100%" : "0%"),
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className={
              isMobile
                ? "w-full flex flex-col items-center justify-start"
                : "absolute inset-0 w-full h-full flex flex-col items-center justify-start overflow-hidden bg-transparent"
            }
          >
            {/* SERVICE BACKGROUND PHOTOS LAYER WITH PARALLAX DRIFT */}
          <div className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${isMobile ? "hidden" : ""}`}>
            {bentoData.map((step, index) => {
              if (!step.bgImage) return null;
              const isOpen = activeIndex === index;
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={step.num}
                  initial={false}
                  animate={{
                    opacity: isOpen ? 1 : 0,
                    x: isOpen ? 0 : (isEven ? -30 : 30),
                    scale: isOpen ? 1 : 1.05
                  }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 w-full h-full"
                >
                  {step.bgImage.endsWith(".mp4") ? (
                    <ServiceBackgroundVideo
                      src={step.bgImage}
                      isOpen={isOpen}
                      isColor={Boolean((step as any).isColor || step.title === "VENTURE INFRASTRUCTURE")}
                    />
                  ) : (
                    <img
                      src={step.bgImage}
                      alt=""
                      className={`w-full h-full object-cover ${(step as any).isColor || step.title === "VENTURE INFRASTRUCTURE" ? "" : "grayscale"}`}
                      style={(step as any).isColor || step.title === "VENTURE INFRASTRUCTURE" ? undefined : { filter: "grayscale(100%)" }}
                    />
                  )}
                </motion.div>
              );
            })}

            {/* NOSTALGIC FILM GRAIN OVERLAY (disabled on Strategy) */}
            <motion.div 
              initial={false}
              animate={{
                opacity: (!activeIndex || activeIndex === 0) ? 0 : 0.35
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay bg-repeat"
              style={{ backgroundImage: "url('/grain.png')" }}
            />
          </div>

          {/* HEADER BLOCK */}
          <div className="shrink-0 w-full bg-black border-t border-b border-white/10 pt-[clamp(8px,1.2vh,16px)] pb-[clamp(8px,1.2vh,16px)] px-6 relative z-20">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 w-full">
              <span className="text-[clamp(1.05rem,1.5vw,2rem)] font-sans font-light tracking-tighter uppercase leading-none text-white block">
                Services & Capabilities
              </span>
              <p className="font-sans font-light text-[13.5px] md:text-[clamp(13px,0.75vw,15px)] tracking-widest max-w-sm md:max-w-lg border-t border-white/20 text-white/80 pt-1">
                We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
              </p>
            </div>
          </div>

          {/* HORIZONTAL INTERACTIVE SERVICE TABS TRACK */}
          <div 
            ref={tabsTrackRef}
            className="shrink-0 w-full bg-black/90 border-b border-white/10 px-4 md:px-6 py-2 z-20 backdrop-blur-md overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div 
              ref={tabsInnerRef}
              className="max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-2 relative"
            >
              {bentoData.map((step, index) => {
                const isActive = activeIndex === index;
                return (
                  <button
                    ref={(el) => { tabRefs.current[index] = el; }}
                    key={step.num}
                    onClick={() => handleItemClick(index)}
                    style={isActive ? { backgroundColor: brandColor || "#f41c06" } : undefined}
                    className={`relative py-1.5 px-2.5 sm:px-3.5 text-left transition-all duration-200 rounded flex items-center gap-1.5 sm:gap-2 group cursor-pointer border-none outline-none ${
                      isActive 
                        ? "text-white shadow-sm" 
                        : "bg-transparent text-white/40 hover:text-white/80"
                    }`}
                  >
                    <span className={`font-mono tracking-wider transition-all duration-200 ${isActive ? "text-[11.5px] text-black font-black" : "text-[9.5px] text-white/60"}`}>[{step.num}]</span>
                    <span className={`font-header font-black tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${isActive ? "text-[13px] sm:text-[15px] text-white" : "text-[11px] sm:text-[12.5px] text-white/40 group-hover:text-white/80"}`}>
                      {step.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Centered Service Box Container: Centered vertically between the bottom of the services bar and the bottom of the screen */}
          <motion.div 
            style={isMobile ? {} : { scale: contentScale }}
            className={`w-full z-10 ${
              isMobile 
                ? "flex flex-col items-center justify-start pt-4" 
                : "flex-1 flex flex-col items-center justify-center my-auto"
            }`}
          >
            {/* INDIVIDUAL ACTIVE SERVICE PRESENTATION WITH OPAQUE WHITE RECTANGLE */}
            {(() => {
              const currentStep = bentoData[activeIndex ?? 0] || bentoData[0];

              return (
                <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
                  {/* SERVICE BOX: Centered vertically with frosted glass top header and solid white body */}
                  <div className="w-full shadow-[0_24px_64px_rgba(0,0,0,0.18)] rounded-[6px] overflow-hidden border border-black/10">
                    {/* Top Part: Frosted Glass Header */}
                    <div 
                      style={{ WebkitBackdropFilter: "blur(16px)", backdropFilter: "blur(16px)" }}
                      className="w-full bg-white/70 backdrop-blur-md border-b border-black/10 px-6 sm:px-8 md:px-9 py-5 md:py-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep.num}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-col md:flex-row md:items-center justify-between gap-3"
                        >
                          <div className="flex items-baseline gap-4 md:gap-6">
                            <span className="font-sans font-light text-black/40 text-base md:text-lg">
                              [{currentStep.num}]
                            </span>
                            <h3 className="font-header font-black tracking-tight uppercase text-2xl sm:text-3xl md:text-4xl text-black m-0 leading-none">
                              {currentStep.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 self-start md:self-auto">
                            <span 
                              style={{ color: brandColor || "#f41c06" }}
                              className="font-header font-black uppercase tracking-wider text-xs sm:text-sm"
                            >
                              {currentStep.label}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom Part: Solid Opaque White Body */}
                    <div className="w-full bg-white text-black px-6 sm:px-8 md:px-9 py-6 sm:py-8 md:py-9">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep.num}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10"
                        >
                          {/* Left Column: Description */}
                          <div className={`flex flex-col justify-start ${currentStep.longFeatures.length > 4 ? "lg:col-span-4" : "lg:col-span-5"}`}>
                            <p className="font-sans font-light text-black/80 leading-relaxed text-[15px] sm:text-[16px] md:text-[17px] m-0">
                              {currentStep.longDesc}
                            </p>
                          </div>

                          {/* Right Column: Detailed Capabilities */}
                          <div className={`flex flex-col justify-start lg:pl-8 lg:border-l border-black/10 ${currentStep.longFeatures.length > 4 ? "lg:col-span-8" : "lg:col-span-7"}`}>
                            <h4 
                              className="font-header font-black tracking-widest uppercase mb-3 text-xs sm:text-sm text-black"
                            >
                              Detailed Capabilities
                            </h4>
                            <ul className={`grid grid-cols-1 sm:grid-cols-2 ${currentStep.longFeatures.length > 4 ? "lg:grid-cols-2 gap-x-6 gap-y-3" : "gap-x-6 gap-y-3.5"} list-none m-0 p-0`}>
                              {currentStep.longFeatures.map((feat) => (
                                <li key={feat.name} className="flex items-start gap-2.5">
                                  <span 
                                    style={{ color: brandColor }} 
                                    className="font-bold leading-none mt-0.5 text-lg shrink-0"
                                  >
                                    +
                                  </span>
                                  <div>
                                    <span className="font-header font-black text-black uppercase tracking-wider block text-[14px] sm:text-[15px]">
                                      {feat.name}
                                    </span>
                                    <span className="font-sans font-light leading-snug block text-[13px] sm:text-[13.5px] text-black/70 mt-0.5">
                                      {feat.desc}
                                    </span>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        </motion.div>

        {/* SECTION 4: About Section - Comes in after Services, pushes Services to left; pushed to right by Contact */}
        <motion.div
          id="about-section"
          initial={false}
          animate={{
            x: isMobile ? 0 : (isAboutOpen ? "0%" : "100%"),
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={
            isMobile 
              ? "w-full border-t border-black/20 bg-white text-black py-12" 
              : "absolute inset-0 w-full h-full z-30 bg-white overflow-hidden text-black"
          }
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
            
            {/* LEFT SIDE: RED TITLE BLOCK */}
            <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-between bg-[#f41c06] text-white h-full">
              <div>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                  ABOUT.
                </h1>
                <p className="font-sans font-light text-white/90 text-[17px] md:text-[20px] max-w-md leading-relaxed">
                  We believe the world is a better place when interesting and compelling ideas come to life.
                </p>
              </div>

              {/* Back to Services Button */}
              <div className="pt-8">
                <button
                  type="button"
                  onClick={() => handleItemClick(6)}
                  className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0 text-xs font-bold tracking-widest uppercase select-none"
                >
                  <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors bg-white/10">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span>Back to Services</span>
                </button>
              </div>
            </div>

            {/* RIGHT SIDE: DATA CASCADE */}
            <div className="p-6 md:p-10 lg:p-12 bg-white text-black flex flex-col justify-between h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-black/10">
              <div className="space-y-6">
                {/* WHO WE ARE */}
                <div className="pb-6 border-b border-black/10">
                  <span className="text-xs font-black tracking-widest uppercase block mb-3 text-black/50">Who We Are</span>
                  <div className="font-sans font-light space-y-3 text-xs md:text-[14px] tracking-normal leading-relaxed text-black/80">
                    <p className="m-0">
                      PRODUCT DEPT. is a full-stack product and venture infrastructure partner integrating strategy, design, engineering, sourcing, manufacturing, logistics, and supply chain optimization into one seamless experience.
                    </p>
                    <p className="m-0">
                      We are a global team that collaborates deeply with our clients through every step of the process, ensuring that great ideas become exceptional products.
                    </p>
                  </div>
                </div>

                {/* PRINCIPLES */}
                <div>
                  <h2 className="text-xs font-black tracking-widest uppercase mb-4 text-black/50">Core Principles</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div className="border-t border-black/20 pt-3">
                      <h3 className="font-black text-base md:text-lg mb-1 tracking-tight uppercase text-black">Disciplined Strategy</h3>
                      <p className="font-sans font-light text-xs md:text-[13px] tracking-normal leading-relaxed text-black/75 m-0">We don&apos;t guess. We map constraints, establish rigid requirements, and deploy with intentionality.</p>
                    </div>

                    <div className="border-t border-black/20 pt-3">
                      <h3 className="font-black text-base md:text-lg mb-1 tracking-tight uppercase text-black">Technical Rigor</h3>
                      <p className="font-sans font-light text-xs md:text-[13px] tracking-normal leading-relaxed text-black/75 m-0">Excellence is binary. Every millimeter, surface finish, and mechanical tolerance is accounted for.</p>
                    </div>

                    <div className="border-t border-black/20 pt-3 md:col-span-2">
                      <h3 className="font-black text-base md:text-lg mb-1 tracking-tight uppercase text-black">Calm Execution</h3>
                      <p className="font-sans font-light text-xs md:text-[13px] tracking-normal leading-relaxed text-black/75 max-w-xl m-0">Hardware is hard. We absorb the chaos of the supply chain so our partners can focus exclusively on growth and deployment.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/15 pt-6 flex justify-start">
                <button
                  type="button"
                  onClick={scrollToContact}
                  className="inline-block bg-[#f41c06] text-white hover:bg-black hover:border-black border border-[#f41c06] transition-colors px-8 py-3 font-black text-xs tracking-widest uppercase cursor-pointer"
                >
                  Get in Touch
                </button>
              </div>

            </div>

          </div>
        </motion.div>

        {/* SECTION 5: Contact Us - Comes in from the LEFT, pushing About page off to the right */}
        <motion.div
          id="contact-section"
          initial={false}
          animate={{
            x: isMobile ? 0 : (isContactOpen ? "0%" : "-100%"),
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={
            isMobile 
              ? "w-full border-t border-black/20 bg-[var(--brand)] text-white py-12" 
              : "absolute inset-0 w-full h-full z-40 bg-[var(--brand)] overflow-hidden"
          }
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
              
              {/* LEFT SIDE: FORM SECTION (ON THE LEFT) */}
              <div className="order-2 lg:order-1 p-8 md:p-12 lg:p-16 bg-white text-black flex flex-col justify-center h-full overflow-y-auto border-r border-black/10">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 max-w-2xl w-full mx-auto">
                    <input type="hidden" name="_subject" value="New Inquiry from Product Dept." />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="name" className="text-xs font-black tracking-widest uppercase text-black">NAME</label>
                        <input type="text" id="name" name="name" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-mono text-sm" placeholder="Jane Doe" required />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-black">EMAIL</label>
                        <input type="email" id="email" name="email" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-mono text-sm" placeholder="jane@company.com" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-black">ORGANIZATION</label>
                      <input type="text" id="company" name="company" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-mono text-sm" placeholder="Organization name" />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-black">MESSAGE</label>
                      <textarea id="description" name="description" rows={5} className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors resize-none font-mono text-sm" placeholder="How can we help?" required></textarea>
                    </div>

                    <div className="pt-4 flex justify-start">
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="w-full max-w-[200px] bg-black text-white hover:bg-[#f41c06] hover:text-white border border-transparent transition-colors py-3.5 font-bold text-sm tracking-widest uppercase cursor-pointer"
                       >
                         {isSubmitting ? "TRANSMITTING..." : "Send"}
                       </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto py-12">
                    <p className="text-xl md:text-2xl font-mono text-black leading-relaxed">
                      Someone from the Product Dept. will get back to you shortly. Thank you.
                    </p>
                  </div>
                )}
              </div>

              {/* RIGHT SIDE: RED BRAND SECTION (ON THE RIGHT) */}
              <div className="order-1 lg:order-2 p-8 md:p-14 lg:p-16 flex flex-col justify-between bg-transparent h-full">
                <div>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-6">
                    GET IN <br /> TOUCH.
                  </h1>
                  <p className="font-sans font-light text-white/80 text-[18px] md:text-[21px] max-w-lg leading-relaxed">
                    Ready to scale your physical product lines? Reach out to explore how Product Dept. can build and optimize your supply chain.
                  </p>
                </div>

                {/* Back to About Button */}
                <div className="pt-8">
                  <button
                    type="button"
                    onClick={scrollToAbout}
                    className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent p-0 text-xs font-bold tracking-widest uppercase select-none"
                  >
                    <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors bg-white/10">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="rotate-180">
                        <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <span>Back to About</span>
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
