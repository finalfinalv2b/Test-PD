"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-black pt-[clamp(56px,6vh,72px)] lg:overflow-hidden">
      <section className="flex-grow w-full border-b border-black/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[calc(100vh-clamp(56px,6vh,72px))]">
          
          {/* LEFT SIDE TITLE BLOCK */}
          <div className="p-8 md:p-16 flex flex-col justify-start bg-[#f41c06] text-white lg:h-full min-h-[300px] lg:min-h-0">
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white uppercase leading-none mb-12">
              ABOUT.
            </h1>
          </div>

          {/* RIGHT SIDE DATA CASCADE */}
          <div className="p-6 md:p-10 lg:p-12 bg-white text-black flex flex-col justify-start lg:h-full lg:overflow-y-auto border-t lg:border-t-0 border-black/10">
            
            {/* WHO WE ARE */}
            <div className="pb-6 border-b border-black/10">
              <div className="font-sans font-light space-y-4 text-xs md:text-[14.5px] tracking-normal leading-relaxed text-black/80">
                <p>
                  At PRODUCT DEPT., we believe the world is a better place when interesting and compelling ideas come to life.
                </p>
                <p>
                  PRODUCT DEPT. is a full-stack product and venture infrastructure partner integrating strategy, design, engineering, sourcing, manufacturing, logistics, and supply chain optimization into one seamless experience. We are a global team that collaborates deeply with our clients through every step of the process, ensuring that great ideas become exceptional products.
                </p>
              </div>
            </div>

            {/* PRINCIPLES */}
            <div className="pt-6">
              <h2 className="text-xs font-black tracking-widest uppercase mb-6 text-black">CORE PRINCIPLES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
                
                <div className="border-t border-black/20 pt-3">
                  <h3 className="font-black text-lg md:text-xl mb-2 tracking-tighter uppercase text-black">DISCIPLINED STRATEGY</h3>
                  <p className="font-sans font-light text-xs md:text-[13.5px] tracking-normal leading-relaxed text-black/75">We don&apos;t guess. We map constraints, establish rigid requirements, and deploy with intentionality.</p>
                </div>

                <div className="border-t border-black/20 pt-3">
                  <h3 className="font-black text-lg md:text-xl mb-2 tracking-tighter uppercase text-black">TECHNICAL RIGOR</h3>
                  <p className="font-sans font-light text-xs md:text-[13.5px] tracking-normal leading-relaxed text-black/75">Excellence is binary. Every millimeter, surface finish, and mechanical tolerance is accounted for.</p>
                </div>

                <div className="border-t border-black/20 pt-3 md:col-span-2">
                  <h3 className="font-black text-lg md:text-xl mb-2 tracking-tighter uppercase text-black">CALM EXECUTION</h3>
                  <p className="font-sans font-light text-xs md:text-[13.5px] tracking-normal leading-relaxed text-black/75 max-w-xl">Hardware is hard. We absorb the chaos of the supply chain so our partners can focus exclusively on growth and deployment.</p>
                </div>

              </div>

              <div className="border-t border-black/20 pt-6 flex justify-start">
                <Link
                  href="/#contact-section"
                  className="inline-block bg-[#f41c06] text-white hover:bg-black hover:border-black border border-[#f41c06] transition-colors px-8 py-3 font-black text-xs tracking-widest uppercase cursor-pointer"
                >
                  Get in Touch
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
