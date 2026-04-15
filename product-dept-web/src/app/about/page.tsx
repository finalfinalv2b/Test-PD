"use client";

import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAF9F6] pt-[72px]">
      <section className="flex-grow w-full border-b border-black">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] h-full min-h-[calc(100vh-72px)]">
          
          {/* LEFT SIDE TITLE BLOCK */}
          <div className="border-b lg:border-b-0 lg:border-r border-black p-8 md:p-16 flex flex-col justify-start bg-[#FAF9F6]">
            <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-black uppercase leading-none mb-12">
              THE <br/> APPARATUS.
            </h1>
            <p className="text-lg font-bold text-black uppercase tracking-widest max-w-sm mb-8">
              WE ARE THE PRODUCT TEAM AMBITIOUS COMPANIES WISH THEY HAD IN-HOUSE.
            </p>
            <div className="w-full h-[2px] bg-black mb-8" />
            <p className="font-mono text-sm tracking-widest text-black/60 uppercase">
              // NO SILOS <br/> // NO FRAGMENTATION
            </p>
          </div>

          {/* RIGHT SIDE DATA CASCADE */}
          <div className="p-0 bg-[#FAF9F6] text-black flex flex-col justify-start">
            
            {/* WHO WE ARE */}
            <div className="p-8 md:p-16 border-b border-black">
              <h2 className="text-sm font-black tracking-widest uppercase mb-8">[ ORG_STRUCTURE ]</h2>
              <div className="font-bold space-y-6 text-xl md:text-3xl tracking-tighter uppercase leading-tight">
                <p>
                  PRODUCT DEPT. OPERATES AT THE INTERSECTION OF INDUSTRIAL DESIGN, METICULOUS ENGINEERING, AND GLOBAL MANUFACTURING.
                </p>
                <p>
                  AS A FULLY INTEGRATED PARTNER, WE COLLAPSE THE TRADITIONAL SILOS BETWEEN CREATIVE STUDIOS AND CONTRACT MANUFACTURERS. THE ORIGINAL VISION IS NEVER COMPROMISED.
                </p>
              </div>
            </div>

            {/* MISSION */}
            <div className="p-8 md:p-16 border-b border-black bg-black text-[#FAF9F6]">
              <h2 className="text-sm font-black tracking-widest uppercase mb-8 text-[#FAF9F6]/50">[ MISSION_DIRECTIVE ]</h2>
              <div className="font-bold text-xl md:text-3xl tracking-tighter uppercase leading-tight">
                <p>
                  BRING RIGOR TO CREATIVITY. CLARITY TO COMPLEXITY. MOMENTUM TO VISION. EXCEPTIONAL PRODUCTS REQUIRE STRICT HOLISTIC INTEGRATION FROM DAY ONE.
                </p>
              </div>
            </div>

            {/* PRINCIPLES */}
            <div className="p-8 md:p-16 border-b border-black">
              <h2 className="text-sm font-black tracking-widest uppercase mb-8">[ CORE_PRINCIPLES ]</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                
                <div className="border-t border-black pt-4">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase">DISCIPLINED STRATEGY</h3>
                  <p className="font-bold tracking-tight uppercase text-black/70">WE DON'T GUESS. WE MAP CONSTRAINTS, ESTABLISH RIGID REQUIREMENTS, AND DEPLOY WITH INTENTIONALITY.</p>
                </div>

                <div className="border-t border-black pt-4">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase">TECHNICAL RIGOR</h3>
                  <p className="font-bold tracking-tight uppercase text-black/70">EXCELLENCE IS BINARY. EVERY MILLIMETER, SURFACE FINISH, AND MECHANICAL TOLERANCE IS ACCOUNTED FOR.</p>
                </div>

                <div className="border-t border-black pt-4 md:col-span-2">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase">CALM EXECUTION</h3>
                  <p className="font-bold tracking-tight uppercase text-black/70 max-w-xl">HARDWARE IS HARD. WE ABSORB THE CHAOS OF THE SUPPLY CHAIN SO OUR PARTNERS CAN FOCUS EXCLUSIVELY ON GROWTH AND DEPLOYMENT.</p>
                </div>

              </div>
            </div>

            {/* TIMELINE */}
            <div className="p-8 md:p-16">
              <h2 className="text-sm font-black tracking-widest uppercase mb-12">[ EVENT_LOG ]</h2>
              
              <div className="space-y-0 border-l-2 border-black ml-2 pl-8 relative">
                
                <div className="relative mb-16 group">
                  <div className="absolute w-4 h-4 bg-black -left-[39px] top-1"></div>
                  <span className="font-black tracking-widest text-black mb-2 block border-b border-black pb-2 uppercase max-w-[150px]">
                    EPOCH // 1996
                  </span>
                  <p className="font-bold text-lg tracking-tight uppercase text-black/80 max-w-xl mt-4">
                    THE ORIGINAL FOUNDATION IS LAID, BRIDGING CREATIVE CONCEPTS WITH STRUCTURAL MECHANICAL ENGINEERING.
                  </p>
                </div>

                <div className="relative mb-16 group">
                  <div className="absolute w-4 h-4 bg-black -left-[39px] top-1"></div>
                  <span className="font-black tracking-widest text-black mb-2 block border-b border-black pb-2 uppercase max-w-[150px]">
                    EPOCH // 2010
                  </span>
                  <p className="font-bold text-lg tracking-tight uppercase text-black/80 max-w-xl mt-4">
                    GLOBAL MANUFACTURING PRESENCE VASTLY EXPANDED ACROSS MULTIPLE STRATEGIC ASIAN AND EUROPEAN REGIONS.
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute w-4 h-4 bg-black -left-[39px] top-1"></div>
                  <span className="font-black tracking-widest text-black mb-2 block border-b border-black pb-2 uppercase max-w-[150px]">
                    STATUS // ACTIVE
                  </span>
                  <p className="font-bold text-lg tracking-tight uppercase text-black/80 max-w-xl mt-4">
                    INTEGRATED FULL-STACK PRODUCT PLATFORM. LAUNCHING BEST-IN-CLASS CONSUMER HARDWARE NATIVELY.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}
