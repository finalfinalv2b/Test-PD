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

        {/* Action Button */}
        <div className="w-full border-t border-white/20 bg-black/40 backdrop-blur-md">
          <Link
            href="/contact"
            className="flex items-center justify-center text-[#FAF9F6] transition-colors py-8 w-full font-black text-xl md:text-3xl tracking-tighter uppercase hover:bg-[#FAF9F6] hover:text-black"
          >
            START YOUR PROJECT &rarr;
          </Link>
        </div>


      </div>

      {/* Capabilities / Core Offering */}
      <div id="capabilities">
        <CoreOffering />
      </div>

      {/* Process */}
      <div id="process">
        <ProcessSequence />
      </div>


      {/* Manifesto & CTA */}
      <section className="py-48 px-6 bg-background flex flex-col items-center justify-center text-center">
        <FadeIn className="w-full px-4 md:px-8 max-w-6xl">
          <div className="pt-16 flex flex-col items-center">
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
