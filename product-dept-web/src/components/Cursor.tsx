"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      setIsPointer(window.getComputedStyle(target).cursor === "pointer");
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.2 : 1,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
      style={{ marginLeft: "-2px", marginTop: "-3px" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="white"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-sm"
      >
        {/* Classic default arrow geometry */}
        <path d="M4 2L20 12L13 14L10 22L4 2Z" />
      </svg>
    </motion.div>
  );
}
