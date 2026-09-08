import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  const handleLaunch = () => {
    if (isLaunching) return;
    setIsLaunching(true);

    // Smooth scroll up while rocket fires
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset rocket back to standby launchpad after flight completes
    setTimeout(() => {
      setIsLaunching(false);
    }, 1400);
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed bottom-8 right-8 z-40 pointer-events-auto select-none">
          {/* Main Launch Button Container */}
          <motion.button
            onClick={handleLaunch}
            initial={{ opacity: 0, y: 30, scale: 0.7 }}
            animate={
              isLaunching
                ? {
                    y: -window.innerHeight - 100,
                    scale: [1, 1.1, 0.75],
                    transition: {
                      duration: 0.95,
                      ease: [0.45, 0, 0.55, 1],
                    },
                  }
                : {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.3 },
                  }
            }
            exit={{ opacity: 0, y: 30, scale: 0.7 }}
            whileHover={!isLaunching ? { scale: 1.08, y: -3 } : {}}
            whileTap={!isLaunching ? { scale: 0.95 } : {}}
            aria-label="Launch rocket to scroll to top"
            className="relative flex flex-col items-center justify-center p-3.5 chamfer-pill bg-[#06080d]/90 hover:bg-[#0c1220]/95 border border-sky-500/30 hover:border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.2)] backdrop-blur-xl group cursor-pointer transition-colors"
          >
            {/* Rocket SVG Asset */}
            <div className="relative w-6 h-7 flex items-center justify-center">
              <svg
                viewBox="0 0 24 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full text-zinc-200 group-hover:text-white transition-colors"
              >
                {/* Nosecone & Aerodynamic Body */}
                <path
                  d="M12 2C8 6 6 11 6 18H18C18 11 16 6 12 2Z"
                  fill="currentColor"
                  className="transition-colors"
                />
                {/* Cockpit / Telemetry Window */}
                <circle cx="12" cy="9" r="2" fill="#38bdf8" />
                {/* Left Delta Fin */}
                <path
                  d="M6 14L2 19L6 20V14Z"
                  fill="#94a3b8"
                />
                {/* Right Delta Fin */}
                <path
                  d="M18 14L22 19L18 20V14Z"
                  fill="#94a3b8"
                />
                {/* Center Engine Gimbal / Nozzle */}
                <path
                  d="M9 18H15L14 21H10L9 18Z"
                  fill="#475569"
                />
              </svg>

              {/* Engine Exhaust Flame (Animated on Click & Standby Glow on Hover) */}
              <AnimatePresence>
                {isLaunching && (
                  <motion.div
                    initial={{ opacity: 0, scaleY: 0.2 }}
                    animate={{
                      opacity: [0.8, 1, 0.9, 1],
                      scaleY: [1, 1.6, 1.4, 1.7],
                      scaleX: [0.8, 1.1, 0.9, 1.2],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.15,
                      ease: "easeInOut",
                    }}
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none"
                  >
                    {/* Outer Flame Plume */}
                    <div className="w-3.5 h-6 bg-gradient-to-b from-sky-300 via-amber-400 to-transparent rounded-b-full blur-[1px] shadow-[0_0_15px_#f59e0b]" />
                    {/* Intense Core Flame */}
                    <div className="w-1.5 h-4 -mt-5 bg-gradient-to-b from-white to-sky-400 rounded-b-full blur-[0.5px]" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Subtle Standby Ion Glow on Hover */}
              {!isLaunching && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-1 bg-sky-400/0 group-hover:bg-sky-400/60 rounded-full blur-[2px] transition-all duration-300" />
              )}
            </div>

            {/* Launchpad Telemetry Label */}
            <span className="text-[8px] font-mono tracking-widest text-zinc-500 group-hover:text-sky-300 mt-1 uppercase transition-colors">
              {isLaunching ? "BOOST" : "TOP"}
            </span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
