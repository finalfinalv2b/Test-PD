"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [isOverBlack, setIsOverBlack] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target) return;

      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
      setIsOverBlack(target.closest('.bg-black') !== null);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.2 : 1,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      style={{ marginLeft: "-8px", marginTop: "-8px" }}
    >
      <img
        src="/red-box.svg"
        alt="Cursor"
        className="w-4 h-4 drop-shadow-sm transition-all duration-200"
        style={{ 
          filter: isOverBlack ? 'none' : 'brightness(0)',
        }}
      />
    </motion.div>
  );
}
