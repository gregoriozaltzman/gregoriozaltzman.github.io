import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MorphingHeroTitle() {
  const { scrollY } = useScroll();
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Responsive offsets
  // Mobile (<640px): hero starts at top 115px, docks at top 16px (inside h-16 bar)
  // Tablet (640-1024px): hero starts at top 140px, docks at top 18px (inside h-20 bar)
  // Desktop (>1024px): hero starts at top 155px, docks at top 20px (inside h-20 bar)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const startTop = isMobile ? 115 : isTablet ? 140 : 155;
  const endTop = isMobile ? 16 : isTablet ? 18 : 20;

  // Responsive padding-left matching max-w-[1500px] layout
  // Desktop centers max-w-[1500px] with px-12
  const maxW = 1500;
  const horizontalPadding = isMobile ? 16 : isTablet ? 32 : 48;
  const containerLeft =
    windowWidth > maxW
      ? (windowWidth - maxW) / 2 + horizontalPadding
      : horizontalPadding;

  // Scroll mapping: 0px to 220px scroll
  const top = useTransform(scrollY, [0, 220], [startTop, endTop]);
  const scale = useTransform(
    scrollY,
    [0, 220],
    [1, isMobile ? 0.28 : isTablet ? 0.24 : 0.22]
  );
  const opacity = useTransform(scrollY, [0, 20, 220], [1, 0.95, 1]);

  // Clickable to scroll to top when docked in header
  const [isDocked, setIsDocked] = useState(false);
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsDocked(latest > 180);
    });
  }, [scrollY]);

  return (
    <motion.div
      style={{
        position: "fixed",
        top,
        left: containerLeft,
        scale,
        opacity,
        transformOrigin: "top left",
        zIndex: 90,
      }}
      className={`select-none ${isDocked ? "pointer-events-auto cursor-pointer" : "pointer-events-none"}`}
      onClick={() => {
        if (isDocked) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      title={isDocked ? "Return to top" : undefined}
    >
      <div className="flex flex-col space-y-1">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-[-0.04em] leading-[0.92] text-white">
          GREGORIO ZALTZMAN
        </h1>
        <div className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-[-0.03em] text-zinc-400">
          AEROSPACE ENGINEER
        </div>
      </div>
    </motion.div>
  );
}