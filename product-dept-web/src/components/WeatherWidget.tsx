"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function WeatherWidget() {
  const [weather, setWeather] = useState<string | null>(null);

  useEffect(() => {
    // Fetch user location weather via JSON to extract descriptive text instead of emojis
    fetch("https://wttr.in/?format=j1")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        try {
          const area = data.nearest_area?.[0]?.areaName?.[0]?.value || "";
          const region = data.nearest_area?.[0]?.region?.[0]?.value || "";
          const desc = data.current_condition?.[0]?.weatherDesc?.[0]?.value || "";
          const temp = data.current_condition?.[0]?.temp_F || "";
          
          if (area && temp && desc) {
            const location = region ? `${area}, ${region}` : area;
            setWeather(`${location}: ${desc} +${temp}°F`);
          }
        } catch (e) {
          console.error("Failed to parse weather JSON:", e);
        }
      })
      .catch((err) => console.error("Failed to fetch weather:", err));
  }, []);

  return (
    <AnimatePresence>
      {weather && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full h-full flex items-center justify-center pointer-events-none"
        >
          <div 
            className="text-black uppercase leading-[0.9] text-[clamp(0.6rem,0.9vw,1.1rem)] px-4 font-bold tracking-tight whitespace-nowrap"
            style={{ fontFamily: 'var(--font-neue-haas)' }}
          >
            {weather}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
