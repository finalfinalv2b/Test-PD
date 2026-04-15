"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "CAPABILITIES", href: "/#capabilities" },
    { name: "PROCESS", href: "/#process" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#FAF9F6] border-b border-black">
      <div className="w-full pl-6 pr-0 md:pr-6 h-[72px] flex items-center justify-between">
        
        {/* LOGO BLOCK */}
        <Link href="/" className="flex items-center gap-4 h-full py-4 border-r border-transparent md:border-black pr-8 hover:opacity-70 transition-opacity">
          <img 
            src={"/PD Logo Black line.svg"} 
            alt="PD Logo" 
            className="h-6 w-auto" 
          />
          <img 
            src={"/PD wordmark.svg"} 
            alt="Product Dept." 
            className="h-4 w-auto hidden sm:block" 
          />
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center h-full">
          {links.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className={`h-full flex items-center justify-center px-8 text-xs font-black tracking-widest text-black transition-colors hover:bg-black hover:text-[#FAF9F6] ${
                idx !== 0 ? 'border-l border-black' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-black h-full px-6 border-l border-black flex items-center hover:bg-black hover:text-[#FAF9F6] transition-colors"
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
            className="md:hidden absolute top-[72px] left-0 w-full bg-[#FAF9F6] border-b border-black overflow-hidden flex flex-col shadow-2xl"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-6 text-sm font-black tracking-widest text-black border-t border-black hover:bg-black hover:text-[#FAF9F6] transition-colors uppercase"
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
