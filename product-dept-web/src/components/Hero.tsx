import { InteractiveGrid } from "./InteractiveGrid";
import { WeatherWidget } from "./WeatherWidget";
import { LocalTimeWidget } from "./LocalTimeWidget";
import { SecretKeyInteraction } from "./SecretKeyInteraction";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-[calc(100vh-72px)] min-h-[max(500px,80vh)] mt-[72px] bg-background overflow-hidden flex flex-col justify-center p-[clamp(1.5rem,5vw,5rem)]">
      <div className="absolute inset-0 w-full h-full z-0">
        <InteractiveGrid />
      </div>
      
      <div className="absolute right-[clamp(1rem,4vw,2rem)] top-1/2 -translate-y-1/2 z-10">
        <img 
          src="/scroll-arrow-01.svg" 
          alt="Scroll Arrow"
          className="h-[clamp(180px,37.5vh,600px)] w-auto"
        />
      </div>

      <div 
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col justify-center items-center text-center pointer-events-none w-full px-4 md:px-8"
      >
        <h1 className="w-full max-w-[90vw] md:max-w-none mx-auto text-[clamp(1.5rem,3.5vw,5rem)] font-header tracking-[0.05em] text-foreground transition-colors duration-500 uppercase leading-[0.9] break-words">
          WE ARE THE PRODUCT TEAM<br />
          AMBITIOUS COMPANIES<br />
          WISH THEY HAD IN-HOUSE.
        </h1>
      </div>

      <div 
        className="absolute z-10 flex justify-center items-center text-center pointer-events-none"
        style={{
          left: `${(23 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(6 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <WeatherWidget />
      </div>

      <div 
        className="absolute z-10 flex justify-center items-center text-center pointer-events-none"
        style={{
          left: `${(18 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(3 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <LocalTimeWidget />
      </div>

      <Link 
        href="/test"
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer -translate-x-1/2 -translate-y-1/2 group/testdot"
        style={{
          left: `${(15 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: "24px",
          height: "24px"
        }}
        title="Test Page"
      >
        <span className="h-3 w-3 transition-transform duration-300 group-hover/testdot:scale-125 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
      </Link>

      <SecretKeyInteraction />
    </section>
  );
}
