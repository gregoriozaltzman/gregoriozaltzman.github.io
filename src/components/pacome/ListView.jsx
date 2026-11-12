import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ListView({ projects, onSelectProject }) {
  const [hoveredProject, setHoveredProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[650px] py-12 px-4 sm:px-8 select-none flex flex-col justify-center items-center overflow-hidden bg-black/40 rounded-3xl border border-white/10"
    >
      {/* Centered Minimalist Project List */}
      <div className="w-full max-w-4xl space-y-2 z-10">
        {projects.map((proj, idx) => {
          const isHovered = hoveredProject?.id === proj.id;
          const isOtherHovered = hoveredProject && !isHovered;

          return (
            <div
              key={proj.id}
              onMouseEnter={() => setHoveredProject(proj)}
              onMouseLeave={() => setHoveredProject(null)}
              onClick={() => onSelectProject(proj)}
              className={`group flex items-center justify-between py-4 px-4 sm:px-6 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent ${
                isHovered
                  ? "bg-white/10 border-white/20 scale-[1.01]"
                  : isOtherHovered
                  ? "opacity-25 blur-[0.4px]"
                  : "opacity-85 hover:opacity-100"
              }`}
            >
              {/* Left: Tag + Title */}
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span className="text-xs sm:text-sm font-mono text-zinc-500 group-hover:text-sky-400 transition-colors">
                  0{idx + 1}
                </span>

                <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.03em] text-white group-hover:text-white transition-colors">
                  {proj.title}
                </h3>
              </div>

              {/* Right: Category / Metric & Arrow */}
              <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                <span className="hidden md:inline-block uppercase tracking-wider text-[11px] text-zinc-500 group-hover:text-zinc-300">
                  {proj.category}
                </span>
                <span className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-black group-hover:scale-110 transition-all">
                  <ArrowUpRight size={14} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Image Preview that Follows Cursor */}
      <AnimatePresence>
        {hoveredProject && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mousePos.x + 24,
              y: mousePos.y - 120,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              damping: 24,
              stiffness: 280,
              mass: 0.5,
            }}
            className="hidden lg:block pointer-events-none absolute top-0 left-0 z-30 w-72 h-44 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-2 border-sky-400/80 bg-black/90"
          >
            <img
              src={hoveredProject.image}
              alt={hoveredProject.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
              <span className="text-xs font-mono text-sky-300 font-medium tracking-wider uppercase">
                {hoveredProject.category}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
