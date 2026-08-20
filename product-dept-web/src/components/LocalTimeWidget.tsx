"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LocalTimeWidget() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true, timeZoneName: "short" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {time && (
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
            {time}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
