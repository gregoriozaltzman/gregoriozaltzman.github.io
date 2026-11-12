import { motion } from "framer-motion";
import { skillsData } from "../../data/portfolioData";
import { Wrench, Cpu, Compass, Globe } from "lucide-react";

export default function JamSkills() {
  const getCategoryIcon = (category) => {
    if (category.includes("CAD")) return <Wrench size={18} className="text-white" />;
    if (category.includes("Analysis")) return <Cpu size={18} className="text-white" />;
    if (category.includes("Hardware")) return <Compass size={18} className="text-white" />;
    return <Globe size={18} className="text-white" />;
  };

  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Section Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-10 border-b border-white/10"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
          SKILLS
        </h2>
      </motion.div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 items-start">
        {skillsData.map((cat, idx) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-8 md:p-10 rounded-[32px] liquid-glass-card relative hover:border-white/20 transition-colors flex flex-col justify-start"
          >
            <div className="glass-reflection" />
            <div className="relative z-10 flex flex-col justify-start w-full">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full liquid-glass-pill flex items-center justify-center shrink-0">
                    {getCategoryIcon(cat.category)}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                    {cat.category}
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline">
                  {cat.skills.length} skills
                </span>
              </div>

              {/* Skills Pills */}
              <div className="flex flex-wrap gap-2.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="px-4 py-2 text-xs sm:text-sm font-mono text-zinc-200 liquid-glass-pill rounded-full cursor-default hover:text-white hover:border-white/30 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}