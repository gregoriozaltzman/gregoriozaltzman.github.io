import { useState } from "react";
import { motion } from "framer-motion";
import { skillsData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function SkillsMatrix() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...skillsData.map((s) => s.category)];

  const displayData =
    selectedCategory === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === selectedCategory);

  const totalSkills = skillsData.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 03 — CAPABILITIES
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Technical Skills & Tools
          </h2>
          <span className="font-mono text-xs text-zinc-500">
            {totalSkills} Specialized Competencies
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          Computational aero tools, parametric CAD assemblies, analytical sizing, experimental wind tunnel data acquisition, and multilingual communication.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 chamfer-tag font-mono text-xs transition-all cursor-pointer ${
                isSelected
                  ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Skills Group Cards */}
      <div className="grid gap-6">
        {displayData.map((group, gIdx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: gIdx * 0.08 }}
          >
            <DynamicGlow className="chamfer-box p-6 sm:p-8 border border-borderCustom hover:border-white/30 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <h3 className="font-mono text-xs sm:text-sm text-zinc-200 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  {group.category}
                </h3>
                <span className="font-mono text-[11px] text-zinc-500">
                  {group.skills.length} Items
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-1">
                {group.skills.map((skill, sIdx) => (
                  <motion.span
                    key={sIdx}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="chamfer-pill px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.12] border border-white/10 hover:border-sky-400/40 text-xs sm:text-sm font-mono text-zinc-300 hover:text-white transition-all cursor-default shadow-sm"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </DynamicGlow>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
