import { motion } from "framer-motion";
import { milestoneGroups } from "../../data/portfolioData";
import { GraduationCap, Compass } from "lucide-react";
import { TUMLogo, UCSDLogo } from "../ui/UniversityLogos";

export default function JamMilestones() {
  const renderHeaderBadge = (id) => {
    switch (id) {
      case "tum":
        return (
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0065BD]/20 border border-[#0065BD]/50 flex items-center justify-center p-2.5 shadow-[0_0_20px_rgba(0,101,189,0.35)] shrink-0">
            <TUMLogo className="w-full h-auto text-[#3070B3]" />
          </div>
        );
      case "ucsd":
        return (
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#182B49]/40 border border-[#C69214]/50 flex items-center justify-center p-2 shadow-[0_0_20px_rgba(198,146,20,0.3)] shrink-0">
            <UCSDLogo className="w-full h-auto" />
          </div>
        );
      case "future":
        return (
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-sky-500/10 border border-sky-400/40 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.25)]">
            <Compass size={22} className="text-sky-400" />
          </div>
        );
      default:
        return (
          <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full liquid-glass-pill flex items-center justify-center shrink-0">
            <GraduationCap size={20} className="text-white" />
          </div>
        );
    }
  };

  return (
    <section id="milestones" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Section Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-10 border-b border-white/10"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
          MILESTONES
        </h2>
      </motion.div>

      {/* Chapters: Vertical Timelines */}
      <div className="space-y-12 pt-10">
        {milestoneGroups.map((group, idx) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 md:p-12 rounded-[32px] liquid-glass-card space-y-8 relative hover:border-white/20 transition-colors"
          >
            <div className="glass-reflection" />
            <div className="relative z-10 space-y-8">
              {/* Chapter Header Banner */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-4">
                  {renderHeaderBadge(group.id)}
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white uppercase">
                      {group.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 font-mono text-xs text-zinc-400">
                      <span>{group.period}</span>
                      <span>·</span>
                      <span>{group.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 text-xs font-mono rounded-full liquid-glass-pill text-white border-white/20">
                    {group.status}
                  </span>
                </div>
              </div>

              {/* Degrees / Trajectory Statement */}
              <div className="space-y-2">
                <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {group.degree}
                </h4>
                <p className="text-sm text-zinc-300 font-light leading-relaxed max-w-4xl">
                  {group.description}
                </p>
              </div>

              {/* VERTICAL TIMELINE TRACK */}
              {group.milestones && group.milestones.length > 0 && (
                <div className="pt-4 border-t border-white/10 space-y-4">
                  <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-8 my-2">
                    {group.milestones.map((m, mIdx) => (
                      <motion.div
                        key={mIdx}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.4, delay: mIdx * 0.06 }}
                        className="relative group"
                      >
                        {/* Timeline Node on Spine */}
                        <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-black shadow-[0_0_10px_rgba(255,255,255,0.6)] group-hover:scale-125 transition-transform" />

                        {/* Milestone Capsule Content */}
                        <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all space-y-2.5">
                          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                            <h5 className="text-base sm:text-lg font-bold text-white tracking-tight">
                              {m.title}
                            </h5>
                            {m.date && (
                              <span className="text-xs font-mono text-zinc-400 shrink-0">
                                {m.date}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                            {m.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}