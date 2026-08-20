"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-black text-[#FFFFFF] border-t border-black">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT BLOCK */}
        <div className="p-[clamp(2rem,5vw,3rem)] border-b md:border-b-0 md:border-r border-[#FFFFFF]/20 flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <img 
              src="/product-department-logo-white.svg" 
              alt="Product Dept." 
              className="w-[80%] max-w-[300px] h-auto mb-6" 
            />
          </div>

        </div>
        
        {/* RIGHT BLOCK */}
        <div className="p-[clamp(2rem,5vw,3rem)] flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-[clamp(1.5rem,4vw,2.5rem)]">
            <div className="flex flex-col gap-4">
              <h4 className="border-b border-[#FFFFFF]/20 pb-2 text-xs font-sans font-medium tracking-widest uppercase text-[#FFFFFF]/40">INDEX</h4>
              <Link href="/about" className="font-sans font-light uppercase tracking-tight hover:text-[#FFFFFF]/60 transition-colors">ABOUT</Link>
              <Link href="/#process" className="font-sans font-light uppercase tracking-tight hover:text-[#FFFFFF]/60 transition-colors">PROCESS</Link>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs font-sans font-light tracking-widest uppercase text-[#FFFFFF]/40 gap-4 border-t border-[#FFFFFF]/20 pt-8">
            <p>&copy; {new Date().getFullYear()} PRODUCT DEPT. // ALL OP-SEC RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FFFFFF] transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-[#FFFFFF] transition-colors">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
