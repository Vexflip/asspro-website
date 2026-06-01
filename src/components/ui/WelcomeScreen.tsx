"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function WelcomeScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hideTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800); // 1.8 seconds to allow the heartbeat to finish
    
    return () => {
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed top-0 left-0 w-full h-[100dvh] z-[100] flex flex-col sm:flex-row items-center justify-center bg-dark gap-2 sm:gap-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-32 h-12 sm:w-56 sm:h-20 shrink-0"
          >
            <Image
              src="/images/logo-dark-bg.webp"
              alt="ASSPRO Logo"
              fill
              className="object-contain"
              sizes="(max-width: 640px) 128px, 224px"
              priority
              loading="eager"
            />
          </motion.div>
          
          <motion.svg
            viewBox="0 0 150 60"
            className="w-[150px] sm:w-[250px] h-auto overflow-visible text-primary shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* The heartbeat line */}
            <motion.path
              d="M 0 30 L 35 30 L 40 25 L 45 30 L 50 30 L 55 45 L 60 10 L 65 50 L 70 30 L 150 30"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 4px currentColor)" }}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* The glowing dot tracking the line */}
            <motion.circle
              r="2.5"
              fill="currentColor"
              style={{ filter: "drop-shadow(0 0 6px currentColor)" }}
              initial={{ offsetDistance: "0%" }}
              animate={{ offsetDistance: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="[offset-path:path('M_0_30_L_35_30_L_40_25_L_45_30_L_50_30_L_55_45_L_60_10_L_65_50_L_70_30_L_150_30')]"
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
