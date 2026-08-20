"use client";

import { useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SecretKeyInteraction() {
  const router = useRouter();
  const lockRef = useRef<HTMLAnchorElement>(null);
  const keyRef = useRef<HTMLImageElement>(null);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!lockRef.current || !keyRef.current) return;

    const lockRect = lockRef.current.getBoundingClientRect();
    const keyRect = keyRef.current.getBoundingClientRect();

    // Check for bounding box intersection
    const isOverlapping = !(
      keyRect.right < lockRect.left ||
      keyRect.left > lockRect.right ||
      keyRect.bottom < lockRect.top ||
      keyRect.top > lockRect.bottom
    );

    if (isOverlapping) {
      router.push("/secret");
    }
  };

  return (
    <>
      <Link 
        href="/secret"
        ref={lockRef}
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer"
        style={{
          left: `${(1 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <img src="/lock.svg" alt="Lock" className="w-1/2 h-1/2 object-contain" />
      </Link>

      <Link 
        href="/site3"
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer"
        style={{
          left: `${(2.2 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <img src="/lock-blue.svg" alt="Blue Lock" className="w-1/2 h-1/2 object-contain" />
      </Link>

      <Link 
        href="/site4"
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer"
        style={{
          left: `${(3.4 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <img src="/lock-skyblue.svg" alt="Skyblue Lock" className="w-1/2 h-1/2 object-contain" />
      </Link>

      <Link 
        href="/site5"
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer"
        style={{
          left: `${(4.6 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <img src="/lock-purple.svg" alt="Purple Lock" className="w-1/2 h-1/2 object-contain" />
      </Link>

      <Link 
        href="/product-mgmt"
        className="absolute z-20 flex justify-center items-center pointer-events-auto cursor-pointer"
        style={{
          left: `${(5.8 / 30) * 100}%`,
          top: `${(18 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <img src="/lock-green.svg" alt="Green Lock" className="w-1/2 h-1/2 object-contain" />
      </Link>

      <div 
        className="absolute z-20 flex justify-center items-center"
        style={{
          left: `${(29 / 30) * 100}%`,
          top: `${(19 / 20) * 100}%`,
          width: `${(1 / 30) * 100}%`,
          height: `${(1 / 20) * 100}%`
        }}
      >
        <motion.img 
          ref={keyRef}
          src="/key.svg" 
          alt="Key" 
          className="w-[45%] h-[45%] object-contain opacity-80 cursor-grab active:cursor-grabbing select-none touch-none"
          draggable={false}
          drag
          dragSnapToOrigin
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 1.2, opacity: 1 }}
        />
      </div>
    </>
  );
}
