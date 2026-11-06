import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Calendar,
  Sparkles,
  Layers,
  Compass,
} from "lucide-react";
import { milestoneGroups } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Timeline() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredGroups =
    activeTab === "all"
      ? milestoneGroups
      : milestoneGroups.filter((g) => g.id === activeTab);

  const totalMilestonesCount = milestoneGroups.reduce(
    (acc, g) => acc + g.milestones.length,
    0
  );

  return (
    <section id="timeline" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
          04 / Milestones
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
              Milestones
            </h2>
            <p className="text-sm text-zinc-400 font-light mt-1">
              Academic progression, engineering leadership, and strategic aerospace trajectory.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-white/5 border border-white/10 rounded text-zinc-400 self-start sm:self-auto shrink-0">
            2022 – 2028+
          </span>
        </div>
      </div>

      {/* Group Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
            activeTab === "all"
              ? "bg-white text-black shadow-lg shadow-white/10"
              : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
          }`}
        >
          <Layers size={13} />
          All Groups
          <span
            className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === "all"
                ? "bg-black/20 text-black font-semibold"
                : "bg-white/10 text-zinc-400"
            }`}
          >
            {totalMilestonesCount}
          </span>
        </button>

        {milestoneGroups.map((group) => {
          const isActive = activeTab === group.id;
          return (
            <button
              key={group.id}
              onClick={() => setActiveTab(group.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${
                isActive
                  ? "bg-white text-black shadow-lg shadow-white/10"
                  : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              {group.id === "ucsd" && <GraduationCap size={13} />}
              {group.id === "tum" && <Sparkles size={13} />}
              {group.id === "future" && <Compass size={13} />}
              <span>{group.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isActive
                    ? "bg-black/20 text-black font-semibold"
                    : "bg-white/10 text-zinc-400"
                }`}
              >
                {group.milestones.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Milestone Groups Stream */}
      <div className="space-y-14">
        <AnimatePresence mode="wait">
          {filteredGroups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Group Banner / Context Header */}
              <div className="relative chamfer-box p-6 sm:p-7 bg-[#070707]/90 border border-white/15 overflow-hidden">
                {/* Background Ambient Glow */}
                <div
                  className="absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl opacity-15 pointer-events-none"
                  style={{ backgroundColor: group.glowColor }}
                />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="text-xl sm:text-2xl font-semibold tracking-[-0.03em] text-white">
                        {group.name}
                      </h3>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded border font-medium ${group.accentColor}`}
                      >
                        {group.badge}
                      </span>
                      {group.id === "tum" && (
                        <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blinking" />
                          Active Studies
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-zinc-400 font-light">
                      {group.fullName}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-400 shrink-0">
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <Calendar size={12} className="text-zinc-500" />
                      {group.period}
                    </span>
                    <span className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                      <MapPin size={12} className="text-zinc-500" />
                      {group.location}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed pt-3">
                  {group.summary}
                </p>
              </div>

              {/* Vertical Trajectory Track for this Group */}
              <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-6 ml-2 sm:ml-4 pt-1">
                {group.milestones.map((item, idx) => {
                  const isPresent = item.active || item.date.toLowerCase() === "present";
                  const isFuture = group.id === "future" || item.date.toLowerCase().includes("future") || item.date.includes("2028+");

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -14 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-30px" }}
                      transition={{ duration: 0.35, delay: idx * 0.06 }}
                      className="relative"
                    >
                      {/* Milestone Node */}
                      <div
                        className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all ${
                          isPresent
                            ? "bg-emerald-400 border-emerald-300 shadow-[0_0_12px_#22c55e]"
                            : isFuture
                            ? "bg-sky-400 border-sky-300 shadow-[0_0_12px_#38bdf8]"
                            : "bg-[#070707] border-zinc-500"
                        }`}
                      />

                      {/* Milestone Card */}
                      <DynamicGlow className="chamfer-box p-5 border border-borderCustom hover:border-white/30 space-y-2.5 bg-[#050505]">
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                          <span
                            className={`text-xs px-2.5 py-0.5 rounded border ${
                              isPresent
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium"
                                : isFuture
                                ? "bg-sky-500/10 text-sky-400 border-sky-500/30 font-medium"
                                : "bg-white/5 text-zinc-300 border-white/10 font-mono"
                            }`}
                          >
                            {item.date}
                          </span>

                          <div className="flex items-center gap-2">
                            {isPresent && (
                              <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blinking" />
                                Active
                              </span>
                            )}
                            {isFuture && (
                              <span className="text-[11px] text-sky-400 font-medium">
                                Future Focus
                              </span>
                            )}
                            {item.tag && (
                              <span className="text-[11px] text-zinc-400 px-2 py-0.5 bg-white/5 rounded border border-white/5 font-medium">
                                {item.tag}
                              </span>
                            )}
                          </div>
                        </div>

                        <h4 className="text-base sm:text-lg font-medium text-white pt-0.5">
                          {item.title}
                        </h4>

                        <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                          {item.desc}
                        </p>

                        {item.courses && item.courses.length > 0 && (
                          <div className="pt-2.5 border-t border-white/5 space-y-2">
                            <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-medium block">
                              Current Graduate Coursework:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {item.courses.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="text-xs px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-light"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </DynamicGlow>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
