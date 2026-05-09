import { Hero } from "@/components/Hero";
import { CoreOffering } from "@/components/CoreOffering";
import { ProcessSequence } from "@/components/ProcessSequence";
import { FadeIn } from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative z-10 bg-background">
        <Hero />
      </div>

      {/* Image Section below Hero */}
      <section className="relative z-10 bg-background w-full h-screen min-h-[600px] border-b border-black/20">
        <Image
          src="/space-suit-and-michael.jpg"
          alt="Space Suit and Michael"
          fill
          className="object-cover object-center"
        />
      </section>

      {/* Content below Hero */}
      <div className="relative z-20">




      </div>

      {/* Capabilities / Core Offering */}

      {/* Process */}
      <div id="process" className="relative z-10 bg-[#FFFFFF]">
        <ProcessSequence />
      </div>

      {/* Spacer to reveal fixed Footer CTA */}
      <div className="h-[120px] md:h-[160px] pointer-events-none bg-transparent" />

      {/* Footer CTA (Fixed Parallax Reveal) */}
      <div className="fixed bottom-0 left-0 w-full h-[120px] md:h-[160px] z-0 bg-black border-t border-[#ffb000]/30 pointer-events-auto">
        <Link 
          href="/contact"
          className="w-full h-full group flex items-center justify-center cursor-pointer pointer-events-auto"
        >
          <div className="container mx-auto px-4 flex flex-row items-center justify-center gap-6 md:gap-10">
            <h2 className="text-[clamp(1.2rem,2.5vw,2.5rem)] font-header tracking-tighter text-white uppercase group-hover:text-[#ffb000] transition-colors duration-300 leading-none drop-shadow-2xl whitespace-nowrap">
              START YOUR NEXT PROJECT TODAY
            </h2>
            <div className="text-white group-hover:text-[#ffb000] transition-all duration-300 opacity-50 group-hover:opacity-100 flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="square">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </div>
          </div>
        </Link>
      </div>    </>
  );
}
