import { Hero } from "@/components/Hero";
import { CoreOffering } from "@/components/CoreOffering";
import { ProcessSequence } from "@/components/ProcessSequence";
import { FadeIn } from "@/components/FadeIn";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Slide UP and OVER the Hero video layer below it */}
      <div className="relative z-20 -mt-[100vh]">
        
        {/* Action Button */}
        <div className="w-full border-t border-white/20 bg-black/40 backdrop-blur-md">
          <Link
            href="/contact"
            className="flex items-center justify-center text-[#FAF9F6] transition-colors py-8 w-full font-black text-xl md:text-3xl tracking-tighter uppercase hover:bg-[#FAF9F6] hover:text-black"
          >
            EXECUTE PROJECT NOW &rarr;
          </Link>
        </div>

        {/* Positioning Statement */}
        <section className="py-40 px-6 bg-charcoal text-white flex items-center justify-center min-h-[60vh] border-t border-white/5 relative overflow-hidden">
          <FadeIn className="w-full max-w-5xl px-4 md:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.05] text-white/95">
              We are the product team ambitious companies wish they had in-house.
            </h2>
            <div className="mt-16 w-full max-w-2xl mx-auto h-[1px] bg-white/10" />
            <p className="mt-16 text-xl md:text-3xl font-light text-mid-gray/90 w-full tracking-tight leading-relaxed max-w-4xl mx-auto">
              We bring structure to creativity, clarity to complexity, and momentum to vision. For every brief, every sketch, and every unit on the shelf, we ask: How can this be better?
            </p>
          </FadeIn>
        </section>
      </div>

      {/* Capabilities / Core Offering */}
      <div id="capabilities">
        <CoreOffering />
      </div>

      {/* Process */}
      <div id="process">
        <ProcessSequence />
      </div>

      {/* About (Credibility / Metrics) */}
      <section id="about" className="py-32 px-6 bg-white border-y border-charcoal/10 relative overflow-hidden">
        <div className="w-full px-4 md:px-12 grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 text-center md:text-left mx-auto max-w-screen-2xl">
          {[
            { metric: "25+", label: "Years Experience" },
            { metric: "8", label: "Countries Operated" },
            { metric: "Global", label: "Vendor Network" },
            { metric: "100%", label: "Supply Chain Visibility" }
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.15} className="relative group">
              <div className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-charcoal mb-6 transition-colors duration-500">
                {item.metric}
              </div>
              <div className="w-12 h-[2px] bg-charcoal/20 mb-6 group-hover:bg-charcoal group-hover:w-24 transition-all duration-500 md:mx-0 mx-auto" />
              <div className="text-sm font-semibold tracking-widest uppercase text-mid-gray transition-colors">
                {item.label}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Manifesto & CTA */}
      <section className="py-48 px-6 bg-background flex flex-col items-center justify-center text-center">
        <FadeIn className="w-full px-4 md:px-8 max-w-6xl">
          <blockquote className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-charcoal leading-[1.05] mb-24">
            "We bring structure to creativity, <br className="hidden md:block" />
            clarity to complexity, <br className="hidden md:block" />
            and momentum to vision."
          </blockquote>
          
          <div className="pt-16 border-t border-charcoal/10 flex flex-col items-center mt-20">
            <p className="text-2xl text-mid-gray mb-10 font-light tracking-tight">Start your product journey.</p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center bg-charcoal text-white hover:bg-black transition-all hover:scale-105 active:scale-95 px-12 py-6 rounded-full font-medium text-lg tracking-wide shadow-lg hover:shadow-2xl"
            >
              Contact Us
            </a>
          </div>
        </FadeIn>
      </section>
    </>
  );
}
