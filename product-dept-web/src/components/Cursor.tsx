"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState(false);
  const [activeTheme, setActiveTheme] = useState("default");
  const [cursorColor, setCursorColor] = useState("#e31a1c"); // default to red

  useEffect(() => {
    // Read initial theme set on document element
    const initialTheme = document.documentElement.getAttribute("data-theme") || "default";
    setActiveTheme(initialTheme);

    // Watch for theme changes on html tag
    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme") || "default";
      setActiveTheme(updatedTheme);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"]
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== "function" || !(target instanceof Element)) return;

      try {
        const computed = window.getComputedStyle(target);
        if (computed) {
          setIsPointer(computed.cursor === "pointer");
        }
      } catch (err) {
        console.warn("Cursor style calculation failed:", err);
      }

      // Find the effective background color of the closest container under the cursor
      const hasBgForeground = target.closest(".bg-foreground") !== null;

      let theme = activeTheme;
      // If we are on the secret page, default theme is black if not specified
      if (theme === "default" && window.location.pathname === "/secret") {
        theme = "black";
      }
      if (theme === "default" && (window.location.pathname === "/site3" || window.location.pathname === "/product-mgmt")) {
        theme = "beige";
      }

      let bg = "white"; // default background
      if (hasBgForeground) {
        if (theme === "red") bg = "white";
        else if (theme === "beige") bg = "black";
        else if (theme === "black") bg = "white";
        else bg = "black"; // default theme bg-foreground is black
      } else {
        if (theme === "red") bg = "red";
        else if (theme === "beige") bg = "beige";
        else if (theme === "black") bg = "black";
        else bg = "white"; // default theme bg-background is white
      }

      // Cursor color mapping:
      // - brand beige when over red
      // - red when over black
      // - black when over beige (or white)
      if (bg === "red") {
        setCursorColor("#f5f2eb"); // Brand Beige
      } else if (bg === "black") {
        setCursorColor("#e31a1c"); // Brand Red
      } else {
        // beige or white
        setCursorColor("#000000"); // Brand Black
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [activeTheme]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[10000] hidden md:block"
      animate={{
        x: position.x,
        y: position.y,
        scale: isPointer ? 1.2 : 1,
      }}
      transition={{ type: "tween", ease: "linear", duration: 0 }}
    >
      <svg 
        id="Layer_1" 
        data-name="Layer 1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 986.41 1016.36"
        className="w-4 h-4 drop-shadow-sm transition-colors duration-200"
        style={{ fill: cursorColor }}
      >
        <polygon points="953.92 1016.36 91.46 1016.36 0 0 986.41 241.25 953.92 1016.36"/>
      </svg>
    </motion.div>
  );
}
