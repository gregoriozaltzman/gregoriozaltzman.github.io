import { motion } from "framer-motion";
import { CheckCircle2, Calendar, ShieldCheck } from "lucide-react";
import { experienceData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Experience() {
  return (
    <section id="experience" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 02 — ROLES & OPERATIONS
        </div>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Engineering & Leadership Experience
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          Practical applications spanning collegiate competitive aircraft engineering and managing high-stakes university technical operations.
        </p>
      </div>

      {/* Experience Cards Stack */}
      <div className="space-y-6">
        {experienceData.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <DynamicGlow className="chamfer-box border border-borderCustom hover:border-white/30 overflow-hidden flex flex-col md:flex-row transition-all duration-300">
              {/* Image Preview */}
              <div className="w-full md:w-[38%] h-56 md:h-auto min-h-[220px] relative overflow-hidden shrink-0 border-b md:border-b-0 md:border-r border-borderCustom">
                <img
                  src={exp.image}
                  alt={exp.org}
                  loading="lazy"
                  className="w-full h-full object-cover filter contrast-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent via-black/40 to-black/80" />
                <div className="absolute bottom-3 left-4 font-mono text-[10px] text-zinc-300 bg-black/70 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1.5">
                  <ShieldCheck size={12} className="text-sky-400" /> VERIFIED ROLE
                </div>
              </div>

              {/* Role & Achievements Content */}
              <div className="p-6 sm:p-8 flex-grow space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-white">
                      {exp.org}
                    </h3>
                    <div className="text-xs sm:text-sm text-sky-400 font-mono mt-0.5">
                      {exp.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <Calendar size={13} className="text-zinc-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  {exp.desc}
                </p>

                {/* Key Highlights */}
                {exp.highlights && exp.highlights.length > 0 && (
                  <div className="space-y-2 pt-2">
                    <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
                      Core Responsibilities & Milestones:
                    </span>
                    <ul className="space-y-1.5">
                      {exp.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-xs text-zinc-400 font-light"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-emerald-400 mt-0.5 shrink-0"
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </DynamicGlow>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
