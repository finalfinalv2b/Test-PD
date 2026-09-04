/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTheme, setActiveTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.getAttribute("data-theme") || "default";
    }
    return "default";
  });

  const pathname = usePathname();
  const isSecret = pathname === "/secret";
  const isSite3 = pathname === "/" || pathname === "/site3" || pathname === "/site4" || pathname === "/site5";
  const isSite3Only = pathname === "/site3";
  const isProductMgmt = pathname === "/product-mgmt";

  useEffect(() => {
    // Watch for theme changes on html tag
    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme") || "default";
      setActiveTheme(updatedTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  const links = [
    { name: "PROCESS", href: "/#process-section" },
    { name: "ABOUT", href: "/about" },
    { name: "GET IN TOUCH", href: "/#contact-section" },
  ];

  // Map theme variables based on current URL path and active global theme
  const currentTheme = activeTheme === "default" ? (isSecret ? "black" : "white") : activeTheme;

  let navBg = "bg-[#FFFFFF] border-black";
  let borderColor = "border-black";
  let textColor = "text-black";
  let hoverClass = "hover:bg-black hover:text-[#FFFFFF]";
  let useWhiteLogo = false;

  if (isSite3Only || isProductMgmt) {
    navBg = "bg-[#f9f4ef] border-black/15";
    borderColor = "border-black/15";
    textColor = "text-black";
    hoverClass = "hover:bg-black hover:text-[#f9f4ef]";
    useWhiteLogo = false;
  } else if (pathname === "/" || pathname === "/site4" || pathname === "/site5") {
    navBg = "bg-black border-white/10";
    borderColor = "border-white/10";
    textColor = "text-white";
    hoverClass = "hover:bg-white hover:text-black";
    useWhiteLogo = true;
  } else if (currentTheme === "red") {
    navBg = "bg-[#e31a1c] border-white";
    borderColor = "border-white";
    textColor = "text-white";
    hoverClass = "hover:bg-white hover:text-[#e31a1c]";
    useWhiteLogo = true;
  } else if (currentTheme === "beige") {
    navBg = "bg-[#f5f2eb] border-black";
    borderColor = "border-black";
    textColor = "text-black";
    hoverClass = "hover:bg-black hover:text-[#f5f2eb]";
    useWhiteLogo = false;
  } else if (currentTheme === "black") {
    navBg = "bg-black border-[#e31a1c]";
    borderColor = "border-[#e31a1c]";
    textColor = "text-[#e31a1c]";
    hoverClass = "hover:bg-[#e31a1c] hover:text-black";
    useWhiteLogo = true;
  }

  const contactTextColor = currentTheme === "red" ? textColor : "text-[#f41c06]";
  const contactHoverClass = currentTheme === "red" ? hoverClass : "hover:bg-[#f41c06] hover:text-white";

  return (
    <nav className={`fixed top-0 w-full z-50 ${navBg} border-b transition-colors duration-300`}>
      <div className="w-full pl-6 pr-0 md:pr-6 h-[clamp(56px,6vh,72px)] flex items-center justify-between relative">

        {/* LOGO BLOCK (LEFT) */}
        <Link href="/" className={`flex items-center h-full py-[clamp(10px,1.2vh,16px)] border-r border-transparent md:${borderColor} md:pr-8 hover:opacity-70 transition-opacity z-10`}>
          <img
            src={useWhiteLogo ? "/PD Logo - White no Words.svg" : "/PD Logo - Black no Words.svg"}
            alt="PD Logo"
            className="h-[clamp(24px,2.5vh,32px)] w-auto"
          />
        </Link>

        {/* WORDMARK (CENTER) */}
        <Link 
          href="/"
          aria-label="Product Dept. Home"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-auto hover:opacity-70 transition-opacity flex items-center justify-center py-2"
        >
          <img
            src={useWhiteLogo ? "/pd-wordmark-white.svg" : "/pd-wordmark-black.svg"}
            alt="Product Dept."
            style={{ height: "clamp(8.4px, 1.12vw, 15.4px)" }}
            className="w-auto"
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center h-full">
          {links.map((link) => {
            const isProcessLink = link.name === "PROCESS";
            const isContactLink = link.name === "CONTACT US" || link.name === "GET IN TOUCH";
            return (
              <Link
                key={link.name}
                href={
                  isContactLink
                    ? (pathname === "/" || pathname === "/site5" ? "#contact-section" : "/#contact-section")
                    : (isSite3 && link.name === "PROCESS" ? "#process-section" : link.href)
                }
                onClick={(e) => {
                  if (isContactLink) {
                    if (pathname === "/" || pathname === "/site5") {
                      e.preventDefault();
                      const element = document.getElementById("contact-section");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    }
                  } else if (isSite3 && link.name === "PROCESS") {
                    e.preventDefault();
                    const element = document.getElementById("process-section");
                    if (element) element.scrollIntoView({ behavior: "smooth" });
                  } else if (isProcessLink && isSecret) {
                    e.preventDefault();
                    window.dispatchEvent(new CustomEvent("scroll-to-process-details"));
                  }
                }}
                className={`h-full flex items-center justify-center px-8 text-xs font-black tracking-widest ${isContactLink ? contactTextColor : textColor} transition-colors ${isContactLink ? contactHoverClass : hoverClass} border-l ${borderColor}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className={`md:hidden ${textColor} h-full px-6 border-l ${borderColor} flex items-center ${hoverClass} transition-colors`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className={`md:hidden absolute top-[clamp(56px,6vh,72px)] left-0 w-full ${navBg} border-b overflow-hidden flex flex-col shadow-2xl`}
          >
            {links.map((link) => {
              const isProcessLink = link.name === "PROCESS";
              const isContactLink = link.name === "CONTACT US" || link.name === "GET IN TOUCH";
              return (
                <Link
                  key={link.name}
                  href={
                    isContactLink
                      ? (pathname === "/" || pathname === "/site5" ? "#contact-section" : "/#contact-section")
                      : (isSite3 && link.name === "PROCESS" ? "#process-section" : link.href)
                  }
                  onClick={(e) => {
                    setIsOpen(false);
                    if (isContactLink) {
                      if (pathname === "/" || pathname === "/site5") {
                        e.preventDefault();
                        const element = document.getElementById("contact-section");
                        if (element) element.scrollIntoView({ behavior: "smooth" });
                      }
                    } else if (isSite3 && link.name === "PROCESS") {
                      e.preventDefault();
                      const element = document.getElementById("process-section");
                      if (element) element.scrollIntoView({ behavior: "smooth" });
                    } else if (isProcessLink && isSecret) {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent("scroll-to-process-details"));
                    }
                  }}
                  className={`w-full text-center py-6 text-sm font-black tracking-widest ${isContactLink ? contactTextColor : textColor} border-t ${borderColor} ${isContactLink ? contactHoverClass : hoverClass} transition-colors uppercase`}
                >
                  {link.name}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
