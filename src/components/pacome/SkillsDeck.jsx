import { motion } from "framer-motion";
import { skillsData } from "../../data/portfolioData";

export default function SkillsDeck() {
  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 space-y-8 select-none">
      {/* Clean Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          Skills
        </h2>
      </div>

      {/* Typographic Directory Rows */}
      <div className="space-y-6">
        {skillsData.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="rounded-[28px] p-6 sm:p-8 bg-[#0a0a0a]/90 border border-white/15 hover:border-sky-400/40 transition-all duration-300 space-y-4 group"
          >
            {/* Row Title */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-3">
              <span className="text-xs font-mono text-sky-400">
                0{idx + 1}
              </span>
              <h3 className="text-lg sm:text-2xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
                {group.category}
              </h3>
            </div>

            {/* Pill Capsules */}
            <div className="flex flex-wrap gap-2 pt-1">
              {group.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white text-zinc-300 hover:text-black border border-white/10 hover:border-white text-xs sm:text-sm font-light transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
