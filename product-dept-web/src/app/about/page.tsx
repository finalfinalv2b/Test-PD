"use client";

import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-background pt-20">
      <section className="py-24 px-6 max-w-4xl mx-auto w-full">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-charcoal mb-12">About Us.</h1>
        
        <div className="space-y-20">
          
          {/* Who We Are */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <h2 className="text-sm font-semibold tracking-wide text-mid-gray uppercase">Who We Are</h2>
            <div className="text-charcoal space-y-6 text-xl leading-relaxed">
              <p>
                We are the product team ambitious companies wish they had in-house. Product Dept. operates at the intersection of industrial design, meticulous engineering, and global manufacturing.
              </p>
              <p>
                As a fully integrated operational partner, we collapse the traditional silos between creative studios and contract manufacturers, ensuring that the original vision is never compromised during production.
              </p>
            </div>
          </div>

          {/* Mission */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <h2 className="text-sm font-semibold tracking-wide text-mid-gray uppercase">Mission</h2>
            <div className="text-charcoal space-y-6 text-xl leading-relaxed">
              <p>
                To bring rigor to creativity, clarity to complexity, and momentum to vision. We believe that exceptional products require a holistic approach where aesthetics, usability, and scale are considered simultaneously from day one.
              </p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <h2 className="text-sm font-semibold tracking-wide text-mid-gray uppercase">Principles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-charcoal">
              <div>
                <h3 className="font-semibold text-xl mb-2">Disciplined Strategy</h3>
                <p className="text-mid-gray">We don't guess. We map constraints, establish requirements, and build with deep intentionality.</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Technical Rigor</h3>
                <p className="text-mid-gray">Excellence is binary. Every millimeter, surface finish, and mechanical tolerance is accounted for.</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Calm execution</h3>
                <p className="text-mid-gray">Developing hardware is hard. We absorb the chaos of the supply chain so our partners can focus on growth.</p>
              </div>
            </div>
          </div>

          {/* History Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <h2 className="text-sm font-semibold tracking-wide text-mid-gray uppercase">Timeline</h2>
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-charcoal/20 before:to-transparent">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-charcoal shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-4 rounded bg-white shadow shadow-charcoal/5">
                  <span className="font-bold text-mid-gray mb-1 block">1996</span>
                  <p className="text-charcoal leading-relaxed">The original foundation is laid, bridging creative concepts with structural engineering.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-charcoal shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-4 rounded bg-white shadow shadow-charcoal/5">
                  <span className="font-bold text-mid-gray mb-1 block">2010</span>
                  <p className="text-charcoal leading-relaxed">Expanded global manufacturing presence across multiple strategic regions.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border border-white bg-charcoal shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.25rem)] p-4 rounded bg-white shadow shadow-charcoal/5">
                  <span className="font-bold text-mid-gray mb-1 block">Present</span>
                  <p className="text-charcoal leading-relaxed">Integrated full-stack product development platform launching best-in-class consumer goods natively.</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
