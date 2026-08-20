"use client";

import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-500 pt-[72px]">
      <section className="flex-grow w-full border-b border-foreground transition-colors duration-500">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] h-full min-h-[calc(100vh-72px)]">
          
          {/* LEFT SIDE TITLE BLOCK */}
          <div className="border-b lg:border-b-0 lg:border-r border-foreground transition-colors duration-500 p-8 md:p-16 flex flex-col justify-start bg-background">
            <h1 className="text-6xl md:text-[8vw] font-black tracking-tighter text-foreground transition-colors duration-500 uppercase leading-none mb-12">
              THE <br/> DEPARTMENT.
            </h1>
            <p className="text-lg font-bold text-foreground transition-colors duration-500 tracking-wide max-w-none md:whitespace-nowrap mb-8">
              Where great ideas become exceptional products.
            </p>
            <div className="w-full h-[2px] bg-foreground transition-colors duration-500 mb-8" />
          </div>

          {/* RIGHT SIDE DATA CASCADE */}
          <div className="p-0 bg-background text-foreground transition-colors duration-500 flex flex-col justify-start">
            
            {/* WHO WE ARE */}
            <div className="p-8 md:p-16 border-b border-foreground transition-colors duration-500">
              <div className="font-sans font-light space-y-6 text-xs md:text-base tracking-normal leading-relaxed text-foreground/80">
                <p>
                  At PRODUCT DEPT., we believe the world is a better place when interesting and compelling ideas come to life.
                </p>
                <p>
                  PRODUCT DEPT. is a full-stack product and venture infrastructure partner integrating strategy, design, engineering, sourcing, manufacturing, logistics, and supply chain optimization into one seamless experience. We are a global team that collaborates deeply with our clients through every step of the process, ensuring that great ideas become exceptional products.
                </p>
              </div>
            </div>

            {/* PRINCIPLES */}
            <div className="p-8 md:p-16">
              <h2 className="text-sm font-black tracking-widest uppercase mb-8">CORE PRINCIPLES</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                
                <div className="border-t border-foreground transition-colors duration-500 pt-4">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase text-foreground">DISCIPLINED STRATEGY</h3>
                  <p className="font-sans font-light text-xs md:text-base tracking-normal leading-relaxed text-foreground/80 transition-colors duration-500">We don&apos;t guess. We map constraints, establish rigid requirements, and deploy with intentionality.</p>
                </div>

                <div className="border-t border-foreground transition-colors duration-500 pt-4">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase text-foreground">TECHNICAL RIGOR</h3>
                  <p className="font-sans font-light text-xs md:text-base tracking-normal leading-relaxed text-foreground/80 transition-colors duration-500">Excellence is binary. Every millimeter, surface finish, and mechanical tolerance is accounted for.</p>
                </div>

                <div className="border-t border-foreground transition-colors duration-500 pt-4 md:col-span-2">
                  <h3 className="font-black text-2xl mb-4 tracking-tighter uppercase text-foreground">CALM EXECUTION</h3>
                  <p className="font-sans font-light text-xs md:text-base tracking-normal leading-relaxed text-foreground/80 transition-colors duration-500 max-w-xl">Hardware is hard. We absorb the chaos of the supply chain so our partners can focus exclusively on growth and deployment.</p>
                </div>

              </div>

              <div className="border-t border-foreground transition-colors duration-500 pt-8 flex justify-start">
                <Link
                  href="/site5#contact-section"
                  className="inline-block bg-[#f41c06] text-white hover:bg-transparent hover:text-[#f41c06] border border-[#f41c06] transition-colors px-8 py-4 font-black text-xs md:text-sm tracking-widest uppercase cursor-pointer"
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
