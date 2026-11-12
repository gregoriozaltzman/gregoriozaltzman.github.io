import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, Pause, Compass, Layers } from "lucide-react";

const reels = [
  {
    id: "bwb-spin",
    title: "BWB 'Manta' 3D Aerodynamic Loft",
    subtitle: "Particle Swarm Optimization · Cruise L/D 25.30",
    type: "image",
    src: "/assets/bwb_jetzero_spin.gif",
    tag: "01",
  },
  {
    id: "seaglide",
    title: "SeaGlide Autonomous Buoyancy Flight",
    subtitle: "Variable Pitch Hydrodynamics · MAE 190",
    type: "video",
    src: "/assets/seaglide.mp4",
    tag: "02",
  },
  {
    id: "piston",
    title: "4-Piston Engine Kinematic Motion",
    subtitle: "SolidWorks Parametric GD&T Assembly",
    type: "video",
    src: "/assets/piston_engine.mp4",
    tag: "03",
  },
  {
    id: "thermo",
    title: "Experimental Thermodynamics & DAQ",
    subtitle: "Lumped-Capacitance Heat Transfer Validation",
    type: "image",
    src: "/assets/lab_work.gif",
    tag: "04",
  },
];

export default function FlightReelModal({ isOpen, onClose }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeClip = reels[activeIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-2xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-4xl bg-[#090909] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh]"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2.5 font-mono text-xs text-zinc-300">
                <Compass size={14} className="text-sky-400 animate-spin-slow" />
                <span className="uppercase tracking-widest">
                  AEROSPACE FLIGHT REEL • 2026
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Showreel"
                className="px-3 py-1 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                <span>close</span>
                <X size={13} />
              </button>
            </div>

            {/* Media Player Showcase */}
            <div className="relative w-full aspect-video bg-black flex items-center justify-center overflow-hidden">
              {activeClip.type === "video" ? (
                <video
                  key={activeClip.src}
                  src={activeClip.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  key={activeClip.src}
                  src={activeClip.src}
                  alt={activeClip.title}
                  className="w-full h-full object-contain"
                />
              )}

              {/* Title Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end">
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest">
                  CLIP #{activeClip.tag}
                </span>
                <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight">
                  {activeClip.title}
                </h3>
                <p className="text-xs text-zinc-400 font-light">
                  {activeClip.subtitle}
                </p>
              </div>
            </div>

            {/* Filmstrip Scrubber Timeline */}
            <div className="p-4 sm:p-6 border-t border-white/10 bg-black/60 flex items-center gap-3 overflow-x-auto scrollbar-none">
              {reels.map((clip, idx) => (
                <button
                  key={clip.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative shrink-0 w-28 sm:w-36 h-18 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    activeIndex === idx
                      ? "border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105"
                      : "border-white/15 opacity-50 hover:opacity-90"
                  }`}
                >
                  <img
                    src={clip.src}
                    alt={clip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 left-1.5 text-[9px] font-mono text-white bg-black/70 px-1.5 py-0.2 rounded">
                    0{idx + 1}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
