import { useState } from "react";
import FlightReelModal from "./FlightReelModal";

export default function FlightReelBadge() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Bottom-Left Circular Rotating Badge */}
      <div className="fixed bottom-6 left-6 z-30 pointer-events-auto">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open Aerospace Flight Reel"
          className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center group focus:outline-none transition-transform hover:scale-105"
        >
          {/* Inner Preview Thumbnail */}
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-sky-400 shadow-xl relative z-10 transition-colors">
            <img
              src="/assets/bwb_jetzero_spin.gif"
              alt="Flight Reel Preview"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Continuous Spinning Orbital Text (SVG Path) */}
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
              <path
                id="textPath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[7.5px] uppercase font-mono tracking-[0.22em] fill-zinc-400 group-hover:fill-sky-300 transition-colors">
                <textPath href="#textPath" startOffset="0%">
                  FLIGHT REEL • 2026 • TELEMETRY •
                </textPath>
              </text>
            </svg>
          </div>
        </button>
      </div>

      {/* Flight Reel Cinematic Modal */}
      <FlightReelModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
