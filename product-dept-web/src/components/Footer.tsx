"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-charcoal text-white pt-24 pb-12 px-6 mt-16">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 border-b border-white/20 pb-12 mb-12">
        <div className="flex flex-col gap-6">
          <h2 className="text-3xl font-bold tracking-tighter">Product Dept.</h2>
          <p className="text-white/60 max-w-sm font-light">
            We are the product team ambitious companies wish they had in-house. Strategy, design, engineering, and manufacturing.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-end gap-12 md:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">Company</h4>
            <Link href="/about" className="hover:text-white/70 transition-colors">About</Link>
            <Link href="/#process" className="hover:text-white/70 transition-colors">Process</Link>
            <Link href="/#capabilities" className="hover:text-white/70 transition-colors">Capabilities</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-2">Engage</h4>
            <Link href="/contact" className="hover:text-white/70 transition-colors inline-flex items-center gap-1">
              Start a Project <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-4">
        <p>&copy; {new Date().getFullYear()} Product Dept. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
