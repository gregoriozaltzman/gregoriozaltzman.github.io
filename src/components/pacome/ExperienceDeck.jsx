import { motion } from "framer-motion";
import { experienceData } from "../../data/portfolioData";
import { CheckCircle2 } from "lucide-react";

export default function ExperienceDeck() {
  return (
    <div className="w-full max-w-6xl mx-auto py-4 sm:py-8 space-y-8 select-none">
      {/* Clean Minimalist Title */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          Experience
        </h2>
      </div>

      {/* Experience Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className="h-full group"
          >
            <div className="rounded-[28px] p-6 sm:p-8 bg-[#0a0a0a]/90 border border-white/15 hover:border-sky-400/50 shadow-2xl transition-all duration-300 h-full flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Media Banner */}
                {exp.image && (
                  <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-white/10 relative">
                    <img
                      src={exp.image}
                      alt={exp.org}
                      className="w-full h-full object-cover grayscale-[25%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300">
                      {exp.period}
                    </div>
                  </div>
                )}

                {/* Org & Role */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono text-sky-400 uppercase tracking-widest">
                    <span>{exp.org}</span>
                    <span className="text-zinc-600">0{idx + 1}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                    {exp.role}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {exp.desc}
                </p>

                {/* Highlights */}
                {exp.highlights && (
                  <div className="space-y-2 pt-3 border-t border-white/10">
                    {exp.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-light">
                        <CheckCircle2 size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
