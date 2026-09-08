import { motion } from "framer-motion";
import { Rocket, Compass, Sparkles } from "lucide-react";
import { aspirationsData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Aspirations() {
  return (
    <section id="aspirations" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 05 — MISSION STATEMENT
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Aspirations & Space Vision
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <DynamicGlow className="chamfer-box p-8 sm:p-10 border border-borderCustom hover:border-white/30 space-y-8 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-sky-500/[0.02]">
          {/* Subtle decorative background telemetry watermark */}
          <div className="absolute -right-6 -bottom-8 text-white/[0.02] pointer-events-none">
            <Rocket size={240} />
          </div>

          {/* Quote Block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs">
              <Sparkles size={14} />
              <span>CORE MISSION OBJECTIVE</span>
            </div>
            <blockquote className="text-lg sm:text-xl md:text-2xl font-light text-zinc-100 leading-relaxed border-l-2 border-sky-400 pl-4 sm:pl-6 italic">
              "{aspirationsData.quote}"
            </blockquote>
          </div>

          {/* Body Narrative */}
          <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed max-w-3xl">
            {aspirationsData.body}
          </p>

          {/* Destination Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {aspirationsData.destinations.map((dest, i) => (
              <div
                key={i}
                className="p-4 bg-white/[0.02] border border-white/5 rounded space-y-1"
              >
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>{dest.year}</span>
                  <Compass size={13} className="text-sky-400" />
                </div>
                <div className="text-sm font-medium text-white">{dest.label}</div>
                <div className="text-xs text-zinc-400 font-mono">{dest.org}</div>
              </div>
            ))}
          </div>
        </DynamicGlow>
      </motion.div>
    </section>
  );
}
