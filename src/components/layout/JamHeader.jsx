import { useState, useEffect } from "react";
import PacomeMenuExpansion from "../pacome/PacomeMenuExpansion";

export default function JamHeader({ activeSection, onSelectSection }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[80] px-4 sm:px-8 md:px-12 h-16 sm:h-20 flex items-center justify-between pointer-events-none transition-all duration-300 ${
        scrolled
          ? "bg-[#030304]/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      {/* Top Left Reserved Slot for Morphing Title */}
      <div className="min-w-[140px] sm:min-w-[200px] h-full flex items-center pointer-events-none" />

      {/* Top Right: Unified Menu Trigger */}
      <div className="pointer-events-auto flex items-center justify-end">
        <PacomeMenuExpansion
          activeSection={activeSection}
          onSelectSection={onSelectSection}
        />
      </div>
    </header>
  );
}