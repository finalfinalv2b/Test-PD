"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();
  const isDarkTheme = pathname === "/" && !scrolled;

  const links = [
    { name: "Capabilities", href: "/#capabilities" },
    { name: "Process", href: "/#process" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-background/90 backdrop-blur-md border-b border-charcoal/10" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img 
            src={isDarkTheme ? "/PD logo white line.svg" : "/PD Logo Black line.svg"} 
            alt="PD Logo" 
            className="h-6 w-auto" 
          />
          <img 
            src={isDarkTheme ? "/PD white wordmark.svg" : "/PD wordmark.svg"} 
            alt="Product Dept." 
            className="h-4 w-auto" 
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isDarkTheme ? "text-white/80 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className={isDarkTheme ? "text-white md:hidden" : "text-foreground md:hidden"}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-charcoal/10 flex flex-col items-center py-8 gap-6 shadow-xl"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-medium text-foreground tracking-tight"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
