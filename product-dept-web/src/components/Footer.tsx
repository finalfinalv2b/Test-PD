"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-black text-[#FAF9F6] border-t border-black">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* LEFT BLOCK */}
        <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#FAF9F6]/20 flex flex-col justify-between h-full min-h-[300px]">
          <div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
              PRODUCT DEPT.
            </h2>
            <p className="font-mono text-sm tracking-widest uppercase text-[#FAF9F6]/50">
              PHYSICAL HARDWARE // MANUFACTURED
            </p>
          </div>
          <p className="text-lg font-bold uppercase tracking-tight max-w-md mt-16">
            WE ARE THE ENGINEERING TEAM AMBITIOUS COMPANIES WISH THEY HAD IN-HOUSE.
          </p>
        </div>
        
        {/* RIGHT BLOCK */}
        <div className="p-8 md:p-12 flex flex-col justify-between">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="border-b border-[#FAF9F6]/20 pb-2 text-xs font-black tracking-widest uppercase text-[#FAF9F6]/40">INDEX</h4>
              <Link href="/about" className="font-bold uppercase tracking-tight hover:text-[#FAF9F6]/60 transition-colors">ABOUT</Link>
              <Link href="/#process" className="font-bold uppercase tracking-tight hover:text-[#FAF9F6]/60 transition-colors">PROCESS</Link>
              <Link href="/#capabilities" className="font-bold uppercase tracking-tight hover:text-[#FAF9F6]/60 transition-colors">CAPABILITIES</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="border-b border-[#FAF9F6]/20 pb-2 text-xs font-black tracking-widest uppercase text-[#FAF9F6]/40">DISPATCH</h4>
              <Link href="/contact" className="font-bold uppercase tracking-tight hover:text-[#FAF9F6]/60 transition-colors">
                INITIATE PROTOCOL &rarr;
              </Link>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col sm:flex-row justify-between items-start sm:items-end text-xs font-mono tracking-widest uppercase text-[#FAF9F6]/40 gap-4 border-t border-[#FAF9F6]/20 pt-8">
            <p>&copy; {new Date().getFullYear()} PRODUCT DEPT. // ALL OP-SEC RESERVED.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#FAF9F6] transition-colors">LINKEDIN</a>
              <a href="#" className="hover:text-[#FAF9F6] transition-colors">INSTAGRAM</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
