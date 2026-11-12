import { motion } from "framer-motion";
import { Compass } from "lucide-react";
import PacomeMenuExpansion from "./PacomeMenuExpansion";

export default function PacomeHeader({
  activeSection,
  onSelectSection,
  activeView,
  onViewChange,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 sm:py-6 flex items-center justify-between pointer-events-none">
      {/* Left: Interactive Aerospace Orb / Monogram Badge */}
      <div className="pointer-events-auto flex items-center gap-3">
        <button
          onClick={() => onSelectSection("projects")}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/15 hover:border-white/40 transition-all group shadow-lg shadow-black/50"
        >
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-emerald-400 p-[1.5px] flex items-center justify-center animate-spin-slow">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <span className="text-[9px] font-bold text-white tracking-wider">GZ</span>
            </div>
          </div>
          <span className="text-xs font-semibold text-white tracking-tight">
            Gregorio Zaltzman
          </span>
        </button>
      </div>

      {/* Center: Segmented View Switcher Pill (in projects mode) or Orbit Indicator */}
      <div className="pointer-events-auto">
        {activeSection === "projects" ? (
          <div className="flex items-center p-1 rounded-full bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/15 shadow-xl shadow-black/50">
            <button
              onClick={() => onViewChange("spiral")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 ${
                activeView === "spiral"
                  ? "text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeView === "spiral" && (
                <motion.div
                  layoutId="activeViewPill"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">spiral •</span>
            </button>

            <button
              onClick={() => onViewChange("list")}
              className={`relative px-4 py-1.5 rounded-full text-xs font-mono transition-colors duration-200 ${
                activeView === "list"
                  ? "text-black font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {activeView === "list" && (
                <motion.div
                  layoutId="activeViewPill"
                  className="absolute inset-0 bg-white rounded-full shadow-md"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">list •</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0a0a0a]/85 backdrop-blur-xl border border-white/15 shadow-xl text-xs font-mono text-zinc-300">
            <Compass size={12} className="text-sky-400 animate-spin-slow" />
            <span className="uppercase tracking-widest text-[11px]">
              {activeSection} •
            </span>
          </div>
        )}
      </div>

      {/* Right: Expanding Origin Menu Card */}
      <div className="pointer-events-auto">
        <PacomeMenuExpansion
          activeSection={activeSection}
          onSelectSection={onSelectSection}
        />
      </div>
    </header>
  );
}
