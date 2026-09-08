import { motion } from "framer-motion";
import { Rocket, Compass } from "lucide-react";
import { aspirationsData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Aspirations() {
  return (
    <section id="aspirations" className="space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
          05 / Aspirations
        </span>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
          Aspirations
        </h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
      >
        <DynamicGlow className="chamfer-box p-8 sm:p-10 border border-borderCustom hover:border-white/30 space-y-6 relative overflow-hidden bg-white/[0.02]">
          {/* Subtle decorative background watermark */}
          <div className="absolute -right-6 -bottom-8 text-white/[0.02] pointer-events-none">
            <Rocket size={240} />
          </div>

          {/* Long-term Goal (Clean without speech marks) */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-100 font-light leading-relaxed">
            {aspirationsData.quote}
          </p>

          {/* Body Narrative */}
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed max-w-3xl">
            {aspirationsData.body}
          </p>

          {/* Destination Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {aspirationsData.destinations.map((dest, i) => (
              <div
                key={i}
                className="p-4 bg-white/[0.02] border border-white/5 rounded space-y-1"
              >
                <div className="flex items-center justify-between text-xs text-zinc-500">
                  <span>{dest.year}</span>
                  <Compass size={14} className="text-sky-400" />
                </div>
                <div className="text-sm font-medium text-white">{dest.label}</div>
                <div className="text-xs text-zinc-400">{dest.org}</div>
              </div>
            ))}
          </div>
        </DynamicGlow>
      </motion.div>
    </section>
  );
}
