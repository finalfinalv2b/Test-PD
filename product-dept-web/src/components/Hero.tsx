import Image from "next/image";
import { InteractiveGrid } from "./InteractiveGrid";

export function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[600px] mt-[72px] bg-background overflow-hidden flex flex-col justify-center p-6 md:p-12 lg:p-20">
      <div className="absolute inset-0 w-full h-full z-0">
        <InteractiveGrid />
      </div>
      
      <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10">
        <img 
          src="/scroll-arrow-01.svg" 
          alt="Scroll Arrow"
          className="h-[15vh] md:h-[33vh] w-auto"
        />
      </div>

      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center text-center pointer-events-none w-full px-4 md:px-8"
      >
        <h1 className="w-full max-w-[90vw] md:max-w-none mx-auto text-[clamp(1.5rem,3.5vw,5rem)] font-header tracking-[0.05em] text-black uppercase leading-[0.9] break-words">
          WE ARE THE PRODUCT TEAM<br />
          AMBITIOUS COMPANIES<br />
          WISH THEY HAD IN-HOUSE.
        </h1>
      </div>
    </section>
  );
}
