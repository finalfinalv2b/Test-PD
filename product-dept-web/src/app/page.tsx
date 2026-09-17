"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const bentoData = [
  {
    num: "01",
    title: "STRATEGY",
    label: "REQUIREMENTS SET",
    bgImage: "/photo-flicker/design_anim.mp4",
    loop: false,
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
    bgImage: "/photo-flicker/design_anim2.mp4",
    loop: false,
    longDesc: "A great product should look spectacular and feel natural to use. Our design team focuses on aesthetics, ease of use, and materials to create a product that stands out in the market. We refine the visual details, shapes, and colors to deliver an exceptional user experience.",
    longFeatures: [
      { name: "Concept Generation", desc: "Developing eye-catching design options and visual directions." },
      { name: "Brand Design", desc: "We build enterprises, not just products: naming, logo, color palette, visual language, digital design, brand collateral, and full identity and strategy." },
      { name: "Color & Materials", desc: "Selecting beautiful finishes and durable materials that align with your brand." },
      { name: "Model Making & Prototyping", desc: "Physical models built during the design process surface issues while pivots are still cheap." },
      { name: "Packaging Design", desc: "We design packaging that protects, transports, and makes a first impression, balancing unboxing experience, brand integration, sustainability, and structural performance." },
      { name: "User Experience", desc: "Optimizing shapes and layouts to ensure the product is comfortable and easy to use." }
    ]
  },
  {
    num: "03",
    title: "ENGINEERING",
    label: "CAD ARCHITECTURE",
    bgImage: "/photo-flicker/engineering_anim2.mp4",
    longDesc: "Our engineering team brings the design to life. We build detailed 3D models, design internal mechanics, and optimize the hardware layout. We focus on durability, safety, and reliability to ensure the product performs flawlessly in the real world.",
    longFeatures: [
      { name: "Design For Manufacturing (DFM)", desc: "Grounded in decades of manufacturing experience, our designs come production-ready and engineered for cost, performance, and scale." },
      { name: "Hardware Design", desc: "Designing functional circuits and internal components to power your product." },
      { name: "Human Factor Engineering & Ergonomics", desc: "Comfortable use is essential to product success, so we run anthropometric studies of grip, reach, and intuitive function before a product reaches the market." },
      { name: "3D Blueprint Modeling", desc: "Creating precise digital blueprints of the product and its internal parts." },
      { name: "Endurance Testing", desc: "Testing and simulating real-world usage to guarantee performance and safety." }
    ]
  },
  {
    num: "04",
    title: "SOURCING",
    label: "VENDOR SELECTION",
    bgImage: "/photo-flicker/sourcing_anim.mp4",
    longDesc: "Finding the right manufacturing partners is key to your product's success. We negotiate directly with trusted factories, manage supplier relationships, and optimize production costs. We set up reliable supply chains to ensure you get high-quality components delivered on time.",
    longFeatures: [
      { name: "Global Presence", desc: "We have team members on the ground in China, Southeast Asia, and other key manufacturing markets to ensure alignment between design intent, production realities, and timely delivery." },
      { name: "Trusted Partners", desc: "A decades-old network of audited, specialized, and reliable vendors." },
      { name: "Supply Chain Optimization", desc: "We streamline the supply chain to eliminate redundancies, reduce costs, and accelerate lead times." },
      { name: "Supply Chain Security", desc: "Multi-supplier and multi-region sourcing to insulate your supply chain from geopolitical risk and disruption." }
    ]
  },
  {
    num: "05",
    title: "PRODUCT DEVELOPMENT",
    label: "TOOLING & SAMPLING",
    bgImage: "/photo-flicker/manufacturing_anim.mp4",
    longDesc: "Moving from design and engineering to physical product development is where most product teams struggle. We integrate these disciplines seamlessly with the factory floor to ensure that aesthetic and technical requirements survive the transition to mass production intact.",
    longFeatures: [
      { name: "Specification Management", desc: "A locked spec sheet aligns the team and gives us the flexibility to build across geographies and production lines without losing fidelity." },
      { name: "Costing", desc: "We draw on volume relationships and deep material knowledge to build costing scenarios that support your growth and profitability targets." },
      { name: "Sampling", desc: "Our in-country teams shepherd the sampling process to ensure the first physical product matches the spec exactly." },
      { name: "Compliance", desc: "We develop products to meet target-market compliance requirements (FDA, CPSC, Prop. 65, EU CE, Canadian provincial bureaus) and coordinate 3rd party testing to document conformance." },
      { name: "Tooling & Mold Making", desc: "We oversee the entire process from CAD architecture to final mold refinements, so there's no guesswork before the metal is cut." }
    ]
  },
  {
    num: "06",
    title: "MANUFACTURING",
    label: "MASS PRODUCTION",
    bgImage: "/photo-flicker/manufacturing_anim2.mp4",
    longDesc: "We manage the entire transition to mass production. Our quality control teams work directly on-site to inspect machinery, validate assembly setups, and perform thorough inspections on the finished products. This ensures that every single unit matches the approved prototype.",
    longFeatures: [
      { name: "Local Presence", desc: "We maintain team members on the factory floor during production to catch issues and enforce quality standards." },
      { name: "Production Ramp Management", desc: "From initial test runs through mass production, we manage the scale-up to ensure stable yields and consistent quality." },
      { name: "Production Planning & Scheduling", desc: "We coordinate timelines, material arrivals, and production schedules to keep deliveries predictable." },
      { name: "Regulated Product Manufacturing", desc: "Expertise across FDA, CE, and UL compliance environments, cleanroom standards, and rigorous trace-ability protocols for high-stakes products." },
      { name: "Assembly Optimization", desc: "Designing efficient assembly steps to speed up delivery and reduce errors." }
    ]
  },
  {
    num: "07",
    title: "LOGISTICS",
    label: "GLOBAL DELIVERY",
    bgImage: "/photo-flicker/logistics_anim.mp4",
    longDesc: "Our job is not done until your products arrive at your warehouse. We handle the entire shipping process, clear customs paperwork, and manage local distribution networks. We take care of the details so your launch is smooth and worry-free.",
    longFeatures: [
      { name: "Global Freight", desc: "Managing sea, air, and land transportation for your inventory." },
      { name: "Customs & Compliance", desc: "Handling import/export paperwork and regulations for a hassle-free delivery." },
      { name: "Fulfillment Sync", desc: "Coordinating delivery directly with your warehousing and distribution centers." },
      { name: "Duty Optimization & Tariff Strategy", desc: "We structure manufacturing locations and product classifications to minimize tariff exposure legally and effectively." },
      { name: "Amazon FBA Prep & Induction", desc: "Full-prep packaging, labeling, palletization, and direct induction into Amazon fulfillment networks." },
      { name: "Club Store Prep & Fulfillment", desc: "Custom pallet configurations, PDQ displays, and strict compliance labeling for Costco, Sam's Club, and BJ's." }
    ]
  },
  {
    num: "08",
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
  },
  { 
    name: "Trashie", 
    logo: "/client-logos/trashie.svg", 
    className: "h-[16px] sm:h-[18px] md:h-[20px] w-auto object-contain" 
  }
];

function ServiceBackgroundVideo({ 
  src, 
  isOpen, 
  loop = true, 
  playTrigger = 0 
}: { 
  src: string; 
  isOpen: boolean; 
  loop?: boolean; 
  playTrigger?: number; 
}) {
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
  }, [isOpen, playTrigger]);

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
      loop={loop}
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      className="w-full h-full object-cover"
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
  const [playTrigger, setPlayTrigger] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStage, setMobileStage] = useState(0); // 0: Hero, 1-8: Services 0-7, 9: About, 10: Contact
  const mobileStageRef = useRef(0);
  mobileStageRef.current = mobileStage;
  const [contentScale, setContentScale] = useState(1);
  const [windowWidth, setWindowWidth] = useState(1440);
  const [isScrolled, setIsScrolled] = useState(false);
  const isScrolledRef = useRef(false);
  const isLogoSeparated = isMobile ? mobileStage > 0 : isScrolled;

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
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const touchGlobalStartYRef = useRef<number | null>(null);
  const touchGlobalStartXRef = useRef<number | null>(null);
  const isTouchLockedRef = useRef<boolean>(false);

  // Mobile Tabs Track: indicator icon when more services exist offscreen to the right
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkTabsOverflow = () => {
    const track = tabsTrackRef.current;
    if (track) {
      const hasMoreRight = track.scrollLeft < track.scrollWidth - track.clientWidth - 8;
      setCanScrollRight(hasMoreRight);
    }
  };

  useEffect(() => {
    checkTabsOverflow();
    const track = tabsTrackRef.current;
    if (track) {
      track.addEventListener("scroll", checkTabsOverflow, { passive: true });
      return () => track.removeEventListener("scroll", checkTabsOverflow);
    }
  }, [activeIndex, windowWidth, isMobile]);

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

  // Keep active tab centered in horizontal track on mobile
  useEffect(() => {
    if (!isMobile || activeIndex === null) return;
    const btn = tabRefs.current[activeIndex];
    const track = tabsTrackRef.current;
    if (btn && track) {
      const btnLeft = btn.offsetLeft;
      const btnWidth = btn.offsetWidth;
      const trackWidth = track.clientWidth;
      const targetScrollLeft = btnLeft - (trackWidth / 2) + (btnWidth / 2);
      track.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
      setTimeout(checkTabsOverflow, 150);
    }
  }, [activeIndex, isMobile]);

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
      // Connector (~34px) + card with detailed capabilities (~420px) = ~485px
      const naturalCardHeight = 485;

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
      let inServices = false;
      if (section) {
        const rect = section.getBoundingClientRect();
        inServices = rect.top <= 200;
        if (inServices !== isInServicesRef.current) {
          setIsInServices(inServices);
          isInServicesRef.current = inServices;
        }
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrolled = inServices || scrollTop > 40;
      if (scrolled !== isScrolledRef.current) {
        isScrolledRef.current = scrolled;
        setIsScrolled(scrolled);
      }

      if (isMobile) return;

      // If animating via click or mouse wheel notch snap, avoid overriding
      if (isClickScrollingRef.current) return;

      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionStart = rect.top + scrollTop;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = sectionHeight - viewportHeight;

      if (scrollableHeight <= 0) return;

      // Progress through the pinned section (0 = top of section, 1 = bottom of section)
      const progress = (scrollTop - sectionStart) / scrollableHeight;

      if (progress >= 0 && progress <= 1) {
        const exactStage = progress * 10;
        const baseStage = Math.floor(exactStage);
        const stageFraction = exactStage - baseStage;

        // Apply hysteresis deadband to prevent flickering around stage boundaries
        let targetStage = baseStage;
        const currentStage = isContactOpenRef.current ? 9 : (isAboutOpenRef.current ? 8 : (activeIndexRef.current ?? 0));
        if (Math.abs(baseStage - currentStage) <= 1) {
          if (baseStage > currentStage && stageFraction < 0.15) {
            targetStage = currentStage;
          } else if (baseStage < currentStage && stageFraction > 0.85) {
            targetStage = currentStage;
          }
        }
        targetStage = Math.min(9, Math.max(0, targetStage));

        if (targetStage === 9) {
          if (!isContactOpenRef.current) {
            setIsContactOpen(true);
          }
          if (isAboutOpenRef.current) {
            setIsAboutOpen(false);
          }
        } else if (targetStage === 8) {
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Snaps in the About section from the right
  const scrollToAbout = () => {
    setIsContactOpen(false);
    setIsAboutOpen(true);

    if (isMobile) {
      setMobileStage(9);
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

      const targetProgress = (8 + 0.5) / 10;
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
      setMobileStage(10);
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

      const targetProgress = (9 + 0.5) / 10;
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

  // Advance stage for mobile touch flick navigation
  const advanceMobileStage = (direction: 1 | -1) => {
    if (isTouchLockedRef.current) return;
    isTouchLockedRef.current = true;
    setTimeout(() => {
      isTouchLockedRef.current = false;
    }, 400);

    setMobileStage((prev) => Math.min(10, Math.max(0, prev + direction)));
  };

  // Keep active index and sections in sync with mobileStage on mobile
  useEffect(() => {
    if (!isMobile) return;

    if (mobileStage === 0) {
      setIsInServices(false);
      isInServicesRef.current = false;
      setIsAboutOpen(false);
      isAboutOpenRef.current = false;
      setIsContactOpen(false);
      isContactOpenRef.current = false;
    } else if (mobileStage >= 1 && mobileStage <= 8) {
      setIsInServices(true);
      isInServicesRef.current = true;
      setIsAboutOpen(false);
      isAboutOpenRef.current = false;
      setIsContactOpen(false);
      isContactOpenRef.current = false;
      setActiveIndex(mobileStage - 1);
      activeIndexRef.current = mobileStage - 1;
    } else if (mobileStage === 9) {
      setIsInServices(true);
      isInServicesRef.current = true;
      setIsAboutOpen(true);
      isAboutOpenRef.current = true;
      setIsContactOpen(false);
      isContactOpenRef.current = false;
    } else if (mobileStage === 10) {
      setIsInServices(true);
      isInServicesRef.current = true;
      setIsAboutOpen(false);
      isAboutOpenRef.current = false;
      setIsContactOpen(true);
      isContactOpenRef.current = true;
    }
  }, [mobileStage, isMobile]);

  // Full-screen touch flick listeners for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchGlobalStartYRef.current = e.touches[0].clientY;
    touchGlobalStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile) return;
    if (touchGlobalStartYRef.current === null || touchGlobalStartXRef.current === null) return;
    if (isTouchLockedRef.current) return;

    const deltaY = e.changedTouches[0].clientY - touchGlobalStartYRef.current;
    const deltaX = e.changedTouches[0].clientX - touchGlobalStartXRef.current;
    touchGlobalStartYRef.current = null;
    touchGlobalStartXRef.current = null;

    let target = e.target as HTMLElement | null;
    while (target && target !== document.body && target !== document.documentElement) {
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "BUTTON" ||
        target.id === "tabs-track" ||
        target.getAttribute("data-no-flick") === "true"
      ) {
        return;
      }
      target = target.parentElement;
    }

    const absY = Math.abs(deltaY);
    const absX = Math.abs(deltaX);

    if (absY > 35 && absY > absX * 1.1) {
      const direction = deltaY < 0 ? 1 : -1;
      advanceMobileStage(direction);
    } else if (absX > 45 && absX > absY * 1.2 && mobileStageRef.current >= 1 && mobileStageRef.current <= 8) {
      const direction = deltaX < 0 ? 1 : -1;
      advanceMobileStage(direction);
    }
  };

  // Card touch handlers for mobile swipe navigation
  const handleCardTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleCardTouchEnd = (e: React.TouchEvent) => {
    if (!isMobile || touchStartXRef.current === null || touchStartYRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartXRef.current;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;

    // Trigger swipe if horizontal displacement is dominant over vertical flick
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
      const direction = deltaX < 0 ? 1 : -1;
      advanceMobileStage(direction);
    }
  };

  // Click handler that switches service on mobile, and scrolls to target position on desktop
  const handleItemClick = (index: number) => {
    setPlayTrigger(prev => prev + 1);

    if (isContactOpenRef.current) {
      setIsContactOpen(false);
    }
    if (isAboutOpenRef.current) {
      setIsAboutOpen(false);
    }

    setIsInServices(true);
    isInServicesRef.current = true;
    setIsScrolled(true);
    isScrolledRef.current = true;

    if (isMobile) {
      setMobileStage(index + 1);
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
      
      // Calculate target progress coordinate at middle of the index range across 10 stages
      const targetProgress = (index + 0.5) / 10;
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
      }, 850);

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

  // Listen to open-contact, open-about, open-process, open-hero, and close events from Navigation and hash navigation
  useEffect(() => {
    const onOpenContact = () => {
      if (isMobile) {
        setMobileStage(10);
      } else {
        scrollToContactRef.current();
      }
    };
    const onCloseContact = () => {
      if (isMobile) {
        setMobileStage(1);
      } else {
        handleItemClickRef.current(0);
      }
    };
    const onOpenAbout = () => {
      if (isMobile) {
        setMobileStage(9);
      } else {
        scrollToAboutRef.current();
      }
    };
    const onCloseAbout = () => {
      if (isMobile) {
        setMobileStage(1);
      } else {
        handleItemClickRef.current(0);
      }
    };
    const onOpenProcess = () => {
      if (isMobile) {
        setMobileStage(1);
      } else {
        handleItemClickRef.current(0);
      }
    };
    const onOpenHero = () => {
      if (isMobile) {
        setMobileStage(0);
      } else {
        setIsInServices(false);
        isInServicesRef.current = false;
        setActiveIndex(null);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setIsScrolled(false);
      isScrolledRef.current = false;
    };

    window.addEventListener("open-contact", onOpenContact);
    window.addEventListener("close-contact", onCloseContact);
    window.addEventListener("open-about", onOpenAbout);
    window.addEventListener("close-about", onCloseAbout);
    window.addEventListener("open-process", onOpenProcess);
    window.addEventListener("open-hero", onOpenHero);

    if (window.location.hash === "#contact-section") {
      setTimeout(() => {
        onOpenContact();
      }, 200);
    } else if (window.location.hash === "#about-section") {
      setTimeout(() => {
        onOpenAbout();
      }, 200);
    }

    return () => {
      window.removeEventListener("open-contact", onOpenContact);
      window.removeEventListener("close-contact", onCloseContact);
      window.removeEventListener("open-about", onOpenAbout);
      window.removeEventListener("close-about", onCloseAbout);
      window.removeEventListener("open-process", onOpenProcess);
      window.removeEventListener("open-hero", onOpenHero);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    // Gesture and momentum tracking refs
    const deltaAccumulatorRef = { current: 0 };
    const isLockedRef = { current: false };
    const lastWheelTimeRef = { current: 0 };
    const transitionStartTimeRef = { current: 0 };
    const lockTimerRef = { current: null as NodeJS.Timeout | null };

    const MIN_LOCK_MS = 500;
    const INERTIA_DEBOUNCE_MS = 140;
    const MAX_LOCK_MS = 1000;
    const THRESHOLD = 45;

    // Helper to allow nested elements (like the About text cascade or Contact form) to scroll natively when hovered
    const canElementScroll = (target: HTMLElement | null, deltaY: number): boolean => {
      let el = target;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.id === "process-section" || el.id === "services-panel") {
          break;
        }
        const style = window.getComputedStyle(el);
        const overflowY = style.overflowY;
        if ((overflowY === "auto" || overflowY === "scroll") && el.scrollHeight > el.clientHeight + 1) {
          if (deltaY > 0 && el.scrollTop < el.scrollHeight - el.clientHeight - 2) {
            return true;
          }
          if (deltaY < 0 && el.scrollTop > 2) {
            return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      // 1. Allow internal scrolling inside active scrollable containers if not at scroll boundaries
      const target = e.target as HTMLElement | null;
      if (canElementScroll(target, e.deltaY)) {
        return;
      }

      // 2. Prevent default browser wheel/touchpad scroll to eliminate rubberbanding and chaotic momentum jumps
      e.preventDefault();

      const now = Date.now();
      const timeDelta = now - lastWheelTimeRef.current;
      lastWheelTimeRef.current = now;

      // Normalize delta across deltaMode (0: pixels, 1: lines, 2: pages)
      let delta = e.deltaY;
      if (e.deltaMode === 1) {
        delta *= 40;
      } else if (e.deltaMode === 2) {
        delta *= 800;
      }

      // Discard sub-pixel noise from resting touchpads
      if (Math.abs(delta) < 1) {
        return;
      }

      // If locked during an active transition or during click-scrolling, absorb residual trackpad momentum
      // and dynamically extend the lock until momentum completely stops, preventing skipped stages.
      if (isLockedRef.current || isClickScrollingRef.current) {
        if (now - transitionStartTimeRef.current > MAX_LOCK_MS && !isClickScrollingRef.current) {
          isLockedRef.current = false;
          deltaAccumulatorRef.current = 0;
        } else {
          if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
          const elapsed = now - transitionStartTimeRef.current;
          const remainingMin = Math.max(0, MIN_LOCK_MS - elapsed);
          const waitTime = Math.max(remainingMin, INERTIA_DEBOUNCE_MS);

          lockTimerRef.current = setTimeout(() => {
            isLockedRef.current = false;
            deltaAccumulatorRef.current = 0;
          }, waitTime);

          return;
        }
      }

      // When the user lifts fingers or pauses for > 160ms, clear accumulated inertia
      if (timeDelta > 160) {
        deltaAccumulatorRef.current = 0;
      }

      // Accumulate normalized delta
      deltaAccumulatorRef.current += delta;

      // Threshold ensures immediate responsiveness to intentional swipes while discarding noise
      if (Math.abs(deltaAccumulatorRef.current) < THRESHOLD) {
        return;
      }

      const direction = deltaAccumulatorRef.current > 0 ? 1 : -1;
      deltaAccumulatorRef.current = 0;

      // Lock for transition duration with dynamic inertia absorption
      isLockedRef.current = true;
      transitionStartTimeRef.current = now;
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(() => {
        isLockedRef.current = false;
        deltaAccumulatorRef.current = 0;
      }, MIN_LOCK_MS);

      // Contact Section (Stage 9)
      if (isContactOpenRef.current) {
        if (direction < 0) {
          scrollToAboutRef.current();
        }
        // Clamped when scrolling down: no overscroll, no rubberband
        return;
      }

      // About Section (Stage 8)
      if (isAboutOpenRef.current) {
        if (direction > 0) {
          scrollToContactRef.current();
        } else if (direction < 0) {
          handleItemClickRef.current(7);
        }
        return;
      }

      // Services (Stages 0-7) and Title Page
      const currentIdx = activeIndexRef.current;
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isAtHero = !isInServicesRef.current || scrollY < 100;

      if (isAtHero) {
        if (direction > 0) {
          handleItemClickRef.current(0);
        }
        // Clamped when scrolling up at top of page: zero rubberband
        return;
      }

      if (direction > 0) {
        // Scrolling DOWN
        if (currentIdx === null) {
          handleItemClickRef.current(0);
        } else if (currentIdx < 7) {
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 7) {
          scrollToAboutRef.current();
        }
      } else if (direction < 0) {
        // Scrolling UP
        if (currentIdx !== null && currentIdx > 0) {
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0 || currentIdx === null) {
          setIsInServices(false);
          isInServicesRef.current = false;
          setIsScrolled(false);
          isScrolledRef.current = false;
          setActiveIndex(null);
          isClickScrollingRef.current = true;
          setTimeout(() => {
            isClickScrollingRef.current = false;
          }, 850);
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLockedRef.current) return;

      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const isAtHero = !isInServicesRef.current || scrollY < 100;

      if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey)) {
        e.preventDefault();
        isLockedRef.current = true;
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        lockTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, 500);

        if (isContactOpenRef.current) return;

        if (isAboutOpenRef.current) {
          scrollToContactRef.current();
          return;
        }

        if (isAtHero) {
          handleItemClickRef.current(0);
          return;
        }

        const currentIdx = activeIndexRef.current;
        if (currentIdx === null) {
          handleItemClickRef.current(0);
        } else if (currentIdx < 7) {
          handleItemClickRef.current(currentIdx + 1);
        } else if (currentIdx === 7) {
          scrollToAboutRef.current();
        }
      } else if (e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey)) {
        e.preventDefault();
        isLockedRef.current = true;
        if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
        lockTimerRef.current = setTimeout(() => {
          isLockedRef.current = false;
        }, 500);

        if (isContactOpenRef.current) {
          scrollToAboutRef.current();
          return;
        }

        if (isAboutOpenRef.current) {
          handleItemClickRef.current(7);
          return;
        }

        if (isAtHero) return;

        const currentIdx = activeIndexRef.current;
        if (currentIdx !== null && currentIdx > 0) {
          handleItemClickRef.current(currentIdx - 1);
        } else if (currentIdx === 0 || currentIdx === null) {
          setIsInServices(false);
          isInServicesRef.current = false;
          setIsScrolled(false);
          isScrolledRef.current = false;
          setActiveIndex(null);
          isClickScrollingRef.current = true;
          setTimeout(() => {
            isClickScrollingRef.current = false;
          }, 850);
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
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
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
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundColor: "#000000",
        color: "#FFFFFF",
        "--background": "#000000",
        "--foreground": "#FFFFFF",
        "--brand": brandColor
      } as React.CSSProperties}
      className={
        isMobile
          ? "fixed inset-0 top-[clamp(56px,6vh,72px)] h-[calc(100dvh-clamp(56px,6vh,72px))] w-full overflow-hidden select-none touch-none bg-black text-white transition-colors duration-500 font-sans font-light"
          : "relative w-full min-h-screen bg-black text-white transition-colors duration-500 font-sans font-light pt-[clamp(56px,6vh,72px)]"
      }
    >
      {/* Background Logo: Transitions between Title Page hero position and behind Strategy card in Services */}
      <motion.div
        initial={false}
        animate={{
          top: isInServices
            ? (isMobile 
                ? "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.54)" 
                : "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.54)")
            : (isMobile 
                ? "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.48)" 
                : "calc(clamp(56px,6vh,72px) + (100dvh - clamp(56px,6vh,72px)) * 0.48)"),
          x: "-50%",
          y: (isAboutOpen || isContactOpen) ? "-150%" : "-50%",
          opacity: (!isContactOpen && !isAboutOpen ? 1 : 0)
        }}
        transition={{
          top: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: 0.35, ease: "easeInOut" }
        }}
        style={{
          width: "max(114vw, calc(114vh * 1.95375))",
          height: "max(calc(114vw / 1.95375), 114vh)",
        }}
        className="fixed left-1/2 z-0 pointer-events-none select-none flex items-center justify-center overflow-visible"
      >
        {/* Left Shape (Circle) - separates to left when scrolling down, comes back together when scrolling up */}
        <motion.div
          initial={false}
          animate={{ x: isLogoSeparated ? "-100vw" : 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 564.03 288.69"
            className="w-full h-full"
          >
            <path
              d="M136.64,15.41c75.46,0,136.64,61.17,136.64,136.64s-61.17,136.64-136.64,136.64S0,227.51,0,152.05,61.17,15.41,136.64,15.41"
              fill={brandColor || "#f41c06"}
            />
          </svg>
        </motion.div>

        {/* Right Shape (Polygon) - separates to right when scrolling down, comes back together when scrolling up */}
        <motion.div
          initial={false}
          animate={{ x: isLogoSeparated ? "100vw" : 0 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 564.03 288.69"
            className="w-full h-full"
          >
            <polygon
              points="553.22 284.38 311.9 284.38 286.31 0 562.31 67.5 553.22 284.38"
              fill={brandColor || "#f41c06"}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* SECTION 1: Title Page with Two-Column Layout */}
      <motion.section
        id="hero-section"
        animate={isMobile ? { y: mobileStage === 0 ? "0%" : "-100%" } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={
          isMobile
            ? `absolute inset-0 w-full h-full flex flex-col items-center justify-between bg-transparent text-white overflow-hidden ${mobileStage === 0 ? "z-20" : "z-10"}`
            : "relative w-full h-[calc(100dvh-clamp(56px,6vh,72px))] min-h-[540px] flex flex-col items-center justify-between bg-transparent text-white overflow-hidden"
        }
      >

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
              className="w-[96.8vw] max-w-[456px] lg:max-w-none lg:w-[clamp(440px,47.3vw,825px)] min-[1800px]:w-[clamp(825px,51.5vw,1056px)] h-auto object-contain select-none pointer-events-none mt-0"
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
          className="absolute bottom-0 left-0 w-full flex flex-col gap-1.5 overflow-hidden select-none z-20 bg-black"
        >
          <div className="px-6 md:px-12 text-left pt-2">
            <span className="font-sans text-[8px] md:text-[10px] font-black tracking-[0.2em] uppercase text-white/50">
              Select Partners
            </span>
          </div>

          <div className="w-full overflow-hidden relative py-3 md:py-3.5 border-t border-white/10 flex items-center">
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
      </motion.section>

      {/* SECTION 3: Pinned Services Accordion */}
      <motion.section 
        ref={processSectionRef} 
        id="process-section" 
        animate={isMobile ? { y: mobileStage === 0 ? "100%" : "0%" } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={
          isMobile 
            ? `absolute -top-px inset-x-0 bottom-0 w-full h-[calc(100%+1px)] overflow-hidden bg-transparent ${mobileStage === 0 ? "z-10 pointer-events-none" : "z-20"}` 
            : "relative bg-transparent border-b border-black w-full scroll-mt-[clamp(56px,6vh,72px)] h-[700vh]"
        }
      >
        {/* Pinned Wrapper for Desktop & Viewport for Mobile */}
        <div className={isMobile ? "relative w-full h-full overflow-hidden flex flex-col items-center justify-start bg-transparent" : "sticky top-[clamp(56px,6vh,72px)] left-0 w-full h-[calc(100vh-clamp(56px,6vh,72px))] overflow-hidden flex flex-col items-center justify-start bg-transparent"}>
          
          {/* SECTION 3 & 4: Services Viewport Panel - Pushed UP and off screen by About */}
          <motion.div
            id="services-panel"
            initial={false}
            animate={{
              y: (isAboutOpen || isContactOpen) ? "-100%" : "0%",
              x: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-start overflow-hidden bg-transparent"
          >
            {/* SERVICE BACKGROUND PHOTOS LAYER WITH PARALLAX DRIFT */}
          <div className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${isMobile ? "hidden" : ""}`}>
            {bentoData.map((step, index) => {
              if (!step.bgImage) return null;
              const isServiceActive = isInServices && !isAboutOpen && !isContactOpen;
              const isOpen = isServiceActive && activeIndex === index;
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
                      loop={step.loop ?? true}
                      playTrigger={playTrigger}
                    />
                  ) : (
                    <img
                      src={step.bgImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              );
            })}

            {/* NOSTALGIC FILM GRAIN OVERLAY (disabled on Strategy) */}
            <motion.div 
              initial={false}
              animate={{
                opacity: activeIndex === null ? 0 : 0.35
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full pointer-events-none z-10 mix-blend-overlay bg-repeat"
              style={{ backgroundImage: "url('/grain.png')" }}
            />
          </div>

          {/* HEADER BLOCK */}
          <div className={`shrink-0 w-full bg-black ${isMobile ? "border-b border-white/10" : "border-t border-b border-white/10"} pt-[clamp(8px,1.2vh,16px)] pb-[clamp(8px,1.2vh,16px)] relative z-20`}>
            <div className="w-full max-w-6xl mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-3 md:gap-6 min-h-[42px]">
              {isMobile ? (
                <span className="text-lg sm:text-xl font-sans font-light tracking-tighter uppercase leading-none text-white block py-1">
                  SERVICES & CAPABILITIES
                </span>
              ) : (
                <>
                  <span className="text-[clamp(1.35rem,2.0vw,2.35rem)] font-sans font-light tracking-tighter uppercase leading-none text-white block mb-0.5">
                    Services & Capabilities
                  </span>
                  <p className="font-sans font-light text-[13px] md:text-[clamp(12.5px,0.72vw,14.5px)] tracking-wider max-w-[clamp(470px,34vw,600px)] border-t border-white/20 text-white/80 pt-1 text-left">
                    We absorb operational friction and execution risk allowing businesses to focus on their core business goals, product vision, and growth.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* HORIZONTAL INTERACTIVE SERVICE TABS TRACK */}
          <div className="relative w-full z-20 shrink-0">
            <div 
              ref={tabsTrackRef}
              id="tabs-track"
              data-no-flick="true"
              className="w-full bg-black/90 border-b border-white/10 px-4 md:px-6 py-2 backdrop-blur-md overflow-x-auto no-scrollbar [&::-webkit-scrollbar]:hidden"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <div 
                ref={tabsInnerRef}
                className="max-w-6xl mx-auto flex items-center justify-between gap-1 sm:gap-2 relative pr-8 md:pr-0"
              >
                {bentoData.map((step, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <button
                      ref={(el) => { tabRefs.current[index] = el; }}
                      key={step.num}
                      onClick={() => handleItemClick(index)}
                      style={isActive ? { backgroundColor: "#e5e5e5" } : undefined}
                      className={`relative py-1.5 px-2.5 sm:px-3.5 text-left transition-all duration-200 rounded flex items-center gap-1.5 sm:gap-2 group cursor-pointer border-none outline-none shrink-0 ${
                        isActive 
                          ? "text-black shadow-sm" 
                          : "bg-transparent text-white/40 hover:text-white/80"
                      }`}
                    >
                      <span className={`font-mono tracking-wider transition-all duration-200 ${isActive ? "text-[11.5px] text-black font-black" : "text-[9.5px] text-white/60"}`}>{step.num}</span>
                      <span className={`font-header font-black tracking-wider uppercase whitespace-nowrap transition-all duration-200 ${isActive ? "text-[13px] sm:text-[15px] text-black" : "text-[11px] sm:text-[12.5px] text-white/40 group-hover:text-white/80"}`}>
                        {step.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Red Triangle Indicator for More Services on Mobile */}
            {isMobile && (
              <AnimatePresence>
                {canScrollRight && (
                  <motion.div
                    initial={{ opacity: 0, x: 4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      const track = tabsTrackRef.current;
                      if (track) {
                        track.scrollBy({ left: 140, behavior: "smooth" });
                      }
                    }}
                    className="absolute right-0 top-0 bottom-0 pr-3 pl-6 flex items-center justify-end bg-gradient-to-l from-black via-black/90 to-transparent pointer-events-auto cursor-pointer"
                    aria-label="More services available"
                  >
                    <svg
                      width="9"
                      height="12"
                      viewBox="0 0 9 12"
                      className="animate-pulse"
                    >
                      <polygon points="1,1 8,6 1,11" fill={brandColor || "#f41c06"} />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Centered Service Box Container: Fills remaining height on mobile */}
          <motion.div 
            style={isMobile ? {} : { scale: contentScale }}
            className={`w-full z-10 ${
              isMobile 
                ? "flex-1 flex flex-col items-center justify-start p-3 min-h-0" 
                : "flex-1 flex flex-col items-center justify-center my-auto"
            }`}
          >
            {/* INDIVIDUAL ACTIVE SERVICE PRESENTATION WITH OPAQUE WHITE RECTANGLE */}
            {(() => {
              const currentStep = bentoData[activeIndex ?? 0] || bentoData[0];

              return (
                <div className={`w-full max-w-6xl mx-auto ${isMobile ? "h-full flex flex-col min-h-0" : "px-4 md:px-6"}`}>
                  {/* SERVICE BOX: Fills the screen vertically on mobile */}
                  <div 
                    onTouchStart={handleCardTouchStart}
                    onTouchEnd={handleCardTouchEnd}
                    className={`w-full shadow-[0_24px_64px_rgba(0,0,0,0.18)] rounded-[6px] overflow-hidden border border-black/10 touch-pan-y ${
                      isMobile ? "flex-1 flex flex-col min-h-0" : ""
                    }`}
                  >
                    {/* Top Part: Frosted Glass Header */}
                    <div 
                      style={{ WebkitBackdropFilter: "blur(16px)", backdropFilter: "blur(16px)" }}
                      className={`w-full bg-white/70 backdrop-blur-md border-b border-black/10 ${
                        isMobile ? "px-4 py-3 shrink-0" : "px-6 sm:px-8 md:px-9 py-5 md:py-6"
                      }`}
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep.num}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="flex flex-row items-center justify-between gap-3"
                        >
                          <div className="flex items-baseline gap-3 md:gap-6">
                            <span className="font-sans font-light text-black/40 text-sm md:text-lg">
                              [{currentStep.num}]
                            </span>
                            <h3 className="font-header font-black tracking-tight uppercase text-xl sm:text-3xl md:text-4xl text-black m-0 leading-none">
                              {currentStep.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-4 self-auto">
                            <span 
                              style={{ color: brandColor || "#f41c06" }}
                              className="font-header font-black uppercase tracking-wider text-[11px] sm:text-sm"
                            >
                              {currentStep.label}
                            </span>
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Bottom Part: Solid Opaque White Body */}
                    <div className={`w-full bg-white text-black ${
                      isMobile 
                        ? "flex-1 px-4 py-3.5 flex flex-col justify-between overflow-y-auto min-h-0" 
                        : "min-h-[430px] xl:min-h-[385px] px-6 sm:px-8 md:px-9 py-6 sm:py-8 md:py-9 flex flex-col justify-start"
                    }`}>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentStep.num}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className={`grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 w-full ${isMobile ? "flex-1 flex flex-col justify-between" : ""}`}
                        >
                          {/* Left Column: Description */}
                          <div className="flex flex-col justify-start lg:col-span-4">
                            <p className="font-sans font-light text-black/80 leading-relaxed text-[13.5px] sm:text-[15px] md:text-[17px] m-0">
                              {currentStep.longDesc}
                            </p>
                          </div>

                          {/* Right Column: Detailed Capabilities */}
                          <div className={`flex flex-col justify-start lg:pl-8 lg:border-l border-black/10 lg:col-span-8 ${isMobile ? "border-t border-black/10 pt-3" : ""}`}>
                            <h4 
                              className="font-header font-black tracking-widest uppercase mb-3 text-[11px] sm:text-sm text-black"
                            >
                              Detailed Capabilities
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 lg:gap-x-10 w-full">
                              {/* Left Column on Desktop (even index) / All items on Mobile */}
                              <ul className="flex flex-col gap-3.5 sm:gap-4 lg:gap-4.5 list-none m-0 p-0">
                                {currentStep.longFeatures.map((feat, idx) => (
                                  <li 
                                    key={feat.name} 
                                    className={`flex items-start gap-2.5 ${idx % 2 !== 0 ? "sm:hidden" : ""}`}
                                  >
                                    <span 
                                      style={{ color: brandColor }} 
                                      className="font-bold leading-none mt-0.5 text-base sm:text-lg shrink-0 select-none"
                                    >
                                      +
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="font-header font-black text-black uppercase tracking-wider block text-[13px] sm:text-[14px] lg:text-[15px] leading-tight">
                                        {feat.name}
                                      </span>
                                      <span className="font-sans font-light leading-snug block text-[12px] sm:text-[13px] lg:text-[13.5px] text-black/75 mt-1">
                                        {feat.desc}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>

                              {/* Right Column on Desktop (odd index, hidden on mobile) */}
                              <ul className="hidden sm:flex flex-col gap-3.5 sm:gap-4 lg:gap-4.5 list-none m-0 p-0">
                                {currentStep.longFeatures.filter((_, idx) => idx % 2 !== 0).map((feat) => (
                                  <li key={feat.name} className="flex items-start gap-2.5">
                                    <span 
                                      style={{ color: brandColor }} 
                                      className="font-bold leading-none mt-0.5 text-base sm:text-lg shrink-0 select-none"
                                    >
                                      +
                                    </span>
                                    <div className="flex flex-col">
                                      <span className="font-header font-black text-black uppercase tracking-wider block text-[13px] sm:text-[14px] lg:text-[15px] leading-tight">
                                        {feat.name}
                                      </span>
                                      <span className="font-sans font-light leading-snug block text-[12px] sm:text-[13px] lg:text-[13.5px] text-black/75 mt-1">
                                        {feat.desc}
                                      </span>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
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

        {/* SECTION 4: About Section - Comes from bottom, pushes Services up; pushed to right by Contact */}
        <motion.div
          id="about-section"
          initial={false}
          animate={{
            x: isContactOpen ? "100%" : "0%",
            y: (!isAboutOpen && !isContactOpen) ? "100%" : "0%",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`absolute inset-0 w-full h-full z-30 bg-white text-black ${
            isMobile ? "overflow-hidden" : "overflow-y-auto lg:overflow-hidden"
          }`}
        >
          {isMobile ? (
            /* MOBILE ZERO-SCROLL ABOUT LAYOUT */
            <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-white">
              {/* TOP HEADER BLOCK */}
              <div className="shrink-0 bg-[#444444] text-white px-5 py-3.5 flex flex-col justify-between shadow-md h-[92px] min-h-[92px]">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black tracking-tight text-white uppercase leading-none m-0">
                    ABOUT.
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileStage(8);
                    }}
                    className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/20 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase select-none bg-white/10"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="rotate-180">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back</span>
                  </button>
                </div>
                <p className="font-sans font-light text-white/90 text-[11.5px] sm:text-xs leading-tight m-0">
                  We believe the world is a better place when interesting and compelling ideas come to life.
                </p>
              </div>

              {/* WHITE CONTENT BODY */}
              <div className="flex-1 px-5 pt-3 pb-4 flex flex-col justify-between overflow-hidden min-h-0 bg-white">
                {/* WHO WE ARE */}
                <div className="pb-2 border-b border-black/10">
                  <span className="text-[10px] font-black tracking-widest uppercase block text-black/50">Who We Are</span>
                  <div className="border-t border-black/10 pt-1.5 mt-1">
                    <p className="font-sans font-light text-[12px] sm:text-[13px] tracking-normal leading-snug text-black/85 m-0">
                      PRODUCT DEPT. is an industry agnostic, full-stack product creation and infrastructure company. We partner with venture and established companies to scale physical product lines quickly, reliably, and profitably.
                    </p>
                  </div>
                </div>

                {/* CORE PRINCIPLES */}
                <div className="flex flex-col gap-2 py-1">
                  <span className="text-[10px] font-black tracking-widest uppercase block text-black/50">Core Principles</span>
                  
                  <div className="border-t border-black/10 pt-1.5">
                    <h3 className="font-black text-xs uppercase text-black m-0 leading-tight">Disciplined Strategy</h3>
                    <p className="font-sans font-light text-[11px] sm:text-[12px] leading-tight text-black/75 m-0 mt-0.5">We map constraints, establish requirements, and deploy with intentionality.</p>
                  </div>

                  <div className="border-t border-black/10 pt-1.5">
                    <h3 className="font-black text-xs uppercase text-black m-0 leading-tight">Technical Rigor</h3>
                    <p className="font-sans font-light text-[11px] sm:text-[12px] leading-tight text-black/75 m-0 mt-0.5">Every millimeter, surface finish, and mechanical tolerance is accounted for.</p>
                  </div>

                  <div className="border-t border-black/10 pt-1.5">
                    <h3 className="font-black text-xs uppercase text-black m-0 leading-tight">Calm Execution</h3>
                    <p className="font-sans font-light text-[11px] sm:text-[12px] leading-tight text-black/75 m-0 mt-0.5">We absorb supply chain chaos so our partners can focus exclusively on growth.</p>
                  </div>
                </div>

                {/* GET IN TOUCH CTA */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileStage(10);
                    }}
                    className="w-full bg-black text-white hover:bg-[#444444] transition-colors py-3 text-xs font-bold tracking-widest uppercase cursor-pointer flex items-center justify-center rounded-[2px]"
                  >
                    Get in Touch
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* DESKTOP TWO-COLUMN LAYOUT */
            <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full">
              {/* LEFT SIDE: RED TITLE BLOCK */}
              <div className="p-8 md:p-14 lg:p-16 flex flex-col justify-between bg-[#444444] text-white h-full">
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
              <div className="p-8 md:p-12 lg:p-16 bg-white text-black flex flex-col justify-between h-full overflow-y-auto border-t lg:border-t-0 lg:border-l border-black/10">
                <div className="max-w-2xl w-full mx-auto flex flex-col justify-between h-full">
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
                      <span className="text-xs font-black tracking-widest uppercase block mb-4 text-black/50">Core Principles</span>
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

                  <div className="pt-6 sm:pt-8 flex justify-start">
                    <button
                      type="button"
                      onClick={scrollToContact}
                      className="w-full max-w-[200px] bg-black text-white hover:bg-[#444444] hover:text-white border border-transparent transition-colors py-3.5 font-bold text-sm tracking-widest uppercase cursor-pointer flex items-center justify-center"
                    >
                      Get in Touch
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* SECTION 5: Contact Us - Comes in from the LEFT, pushing About page off to the right */}
        <motion.div
          id="contact-section"
          initial={false}
          animate={{
            x: isContactOpen ? "0%" : "-100%",
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1]
          }}
          className={`absolute inset-0 w-full h-full z-40 bg-[#444444] text-white ${
            isMobile ? "overflow-hidden" : "overflow-y-auto lg:overflow-hidden"
          }`}
        >
          {isMobile ? (
            /* MOBILE ZERO-SCROLL CONTACT LAYOUT */
            <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-white text-black">
              {/* TOP BRAND HEADER */}
              <div className="shrink-0 bg-[#444444] text-white px-5 py-3.5 flex flex-col justify-between shadow-md h-[92px] min-h-[92px]">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-black tracking-tight text-white uppercase leading-none m-0">
                    GET IN TOUCH.
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileStage(9);
                    }}
                    className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer border border-white/20 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase select-none bg-white/10"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="rotate-180">
                      <path d="M5 2L10 7L5 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Back</span>
                  </button>
                </div>
                <p className="font-sans font-light text-white/90 text-[11.5px] sm:text-xs leading-tight m-0">
                  Ready to scale your physical product lines? Reach out below.
                </p>
              </div>

              {/* WHITE FORM BODY */}
              <div className="flex-1 px-5 pt-3 pb-3 flex flex-col justify-between overflow-hidden min-h-0 bg-white">
                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between gap-2.5">
                    <input type="hidden" name="_subject" value="New Inquiry from Product Dept." />
                    <input type="hidden" name="_captcha" value="false" />

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mobile-name" className="text-[10px] font-black tracking-widest uppercase text-black">NAME</label>
                        <input type="text" id="mobile-name" name="name" className="border border-black/15 bg-white text-black py-2 px-3 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base rounded-[2px]" placeholder="Jane Doe" required />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label htmlFor="mobile-email" className="text-[10px] font-black tracking-widest uppercase text-black">EMAIL</label>
                        <input type="email" id="mobile-email" name="email" className="border border-black/15 bg-white text-black py-2 px-3 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base rounded-[2px]" placeholder="jane@co.com" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="mobile-company" className="text-[10px] font-black tracking-widest uppercase text-black">ORGANIZATION</label>
                      <input type="text" id="mobile-company" name="company" className="border border-black/15 bg-white text-black py-2 px-3 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base rounded-[2px]" placeholder="Organization name" />
                    </div>

                    <div className="flex flex-col gap-1 flex-1 min-h-0">
                      <label htmlFor="mobile-description" className="text-[10px] font-black tracking-widest uppercase text-black">MESSAGE</label>
                      <textarea id="mobile-description" name="description" rows={2} className="border border-black/15 bg-white text-black py-2 px-3 outline-none focus:border-black transition-colors resize-none font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base h-full min-h-[50px] rounded-[2px]" placeholder="How can we help?" required></textarea>
                    </div>

                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-black text-white hover:bg-[#444444] py-3 font-bold text-xs tracking-widest uppercase cursor-pointer transition-colors rounded-[2px]"
                      >
                        {isSubmitting ? "TRANSMITTING..." : "Send"}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-6">
                    <p className="text-base font-sans font-light text-black leading-relaxed">
                      Someone from Product Dept. will get back to you shortly. Thank you.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* DESKTOP TWO-COLUMN LAYOUT */
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
                        <input type="text" id="name" name="name" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base md:text-sm" placeholder="Jane Doe" required />
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <label htmlFor="email" className="text-xs font-black tracking-widest uppercase text-black">EMAIL</label>
                        <input type="email" id="email" name="email" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base md:text-sm" placeholder="jane@company.com" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="company" className="text-xs font-black tracking-widest uppercase text-black">ORGANIZATION</label>
                      <input type="text" id="company" name="company" className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base md:text-sm" placeholder="Organization name" />
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <label htmlFor="description" className="text-xs font-black tracking-widest uppercase text-black">MESSAGE</label>
                      <textarea id="description" name="description" rows={5} className="border border-black/10 bg-white text-black py-3.5 px-4 outline-none focus:border-black transition-colors resize-none font-sans font-light placeholder:font-neue-haas placeholder:font-thin placeholder:text-black/40 text-base md:text-sm" placeholder="How can we help?" required></textarea>
                    </div>

                    <div className="pt-4 flex justify-start">
                       <button
                         type="submit"
                         disabled={isSubmitting}
                         className="w-full max-w-[200px] bg-black text-white hover:bg-[#444444] hover:text-white border border-transparent transition-colors py-3.5 font-bold text-sm tracking-widest uppercase cursor-pointer"
                       >
                         {isSubmitting ? "TRANSMITTING..." : "Send"}
                       </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-start justify-center h-full max-w-2xl mx-auto py-12">
                    <p className="text-xl md:text-2xl font-sans font-light text-black leading-relaxed">
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
          )}
        </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
