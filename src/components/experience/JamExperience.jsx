import { motion } from "framer-motion";
import { experienceData } from "../../data/portfolioData";
import { CheckCircle2 } from "lucide-react";

export default function JamExperience() {
  return (
    <section id="experience" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-10 border-b border-white/10"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
          EXPERIENCE
        </h2>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-10">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 rounded-[32px] liquid-glass-card space-y-6 flex flex-col justify-between relative group hover:border-white/20 transition-colors"
          >
            <div className="glass-reflection" />
            <div className="space-y-5 relative z-10">
              {/* Image Banner */}
              {exp.image && (
                <div className="w-full h-52 sm:h-64 rounded-2xl overflow-hidden border border-white/10 relative">
                  <img
                    src={exp.image}
                    alt={exp.org}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 text-xs font-mono text-zinc-200 liquid-glass-pill rounded-full">
                    {exp.period}
                  </div>
                </div>
              )}

              {/* Title & Organization */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider block">
                  {exp.org}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors">
                  {exp.role}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-400 font-light leading-relaxed">
                {exp.desc}
              </p>

              {/* Highlights */}
              {exp.highlights && (
                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {exp.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-zinc-300 font-light">
                      <CheckCircle2 size={14} className="text-white shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}