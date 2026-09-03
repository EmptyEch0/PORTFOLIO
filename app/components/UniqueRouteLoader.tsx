'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function UniqueRouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Ignore first mount if handled by SignatureIntro, but show on route changes
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          key={pathname + '-loader'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[9990] bg-[#09090B] flex flex-col items-center justify-center pointer-events-auto select-none"
        >
          {/* Unique Black & White Central Dot Loader */}
          <div className="relative flex items-center justify-center w-28 h-28">
            {/* Spinning Dotted Ring Outer Orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-dashed border-zinc-700/80"
            />
            {/* Counter-Spinning Orbit Dot */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
              className="absolute inset-0 flex items-start justify-center p-1"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_12px_#ffffff]" />
            </motion.div>
            {/* Center Pulsing Trio of Wave Dots */}
            <div className="flex items-center gap-2.5 z-10">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.25, 1, 0.25],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.9,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                  className="w-3 h-3 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                />
              ))}
            </div>
          </div>

          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 0.7, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-[10px] text-zinc-400 font-mono tracking-[0.3em] uppercase"
          >
            Loading...
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
