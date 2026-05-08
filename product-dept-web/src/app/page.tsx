import { Hero } from "@/components/Hero";
import { CoreOffering } from "@/components/CoreOffering";
import { ProcessSequence } from "@/components/ProcessSequence";
import { FadeIn } from "@/components/FadeIn";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Image Section below Hero */}
      <section className="relative w-full h-screen min-h-[600px] border-b border-black/20">
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
      <div id="process">
        <ProcessSequence />
      </div>

      {/* Footer CTA */}
      <Link 
        href="/contact"
        className="block w-full bg-black py-20 md:py-32 group border-t border-[#F41C06]/30 transition-colors duration-300 cursor-pointer"
      >
        <div className="container mx-auto px-4 text-center flex flex-col items-center">
          <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[120px] font-header tracking-tighter text-white uppercase group-hover:text-[#F41C06] transition-colors duration-300 leading-none drop-shadow-2xl">
            START YOUR NEXT <br className="hidden md:block"/> PROJECT TODAY
          </h2>
          <div className="mt-8 md:mt-12 text-white group-hover:text-[#F41C06] transition-all duration-300 flex items-center justify-center opacity-50 group-hover:opacity-100">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
        </div>
      </Link>    </>
  );
}
