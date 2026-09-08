import { motion } from "framer-motion";
import { timelineData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Timeline() {
  return (
    <section id="timeline" className="space-y-6">
      {/* Section Header */}
      <div className="space-y-2">
        <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
          04 / Milestones
        </span>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
            Milestones
          </h2>
          <span className="text-xs text-zinc-500">2022 – 2028+</span>
        </div>
      </div>

      {/* Vertical Trajectory Track */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-8 ml-2 sm:ml-4 pt-2">
        {timelineData.map((item, idx) => {
          const isPresent = item.date.toLowerCase() === "present";
          const isFuture = item.date.toLowerCase().includes("future");

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
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
              <DynamicGlow className="chamfer-box p-6 border border-borderCustom hover:border-white/30 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span
                    className={`text-xs px-2.5 py-0.5 rounded border ${
                      isPresent
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-medium"
                        : isFuture
                        ? "bg-sky-500/10 text-sky-400 border-sky-500/30 font-medium"
                        : "bg-white/5 text-zinc-400 border-white/10"
                    }`}
                  >
                    {item.date}
                  </span>
                  {isPresent && (
                    <span className="text-[11px] text-emerald-400 flex items-center gap-1.5 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blinking" />
                      Active Studies
                    </span>
                  )}
                  {isFuture && (
                    <span className="text-[11px] text-sky-400 font-medium">
                      Future Goal
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-medium text-white pt-1">
                  {item.title}
                </h3>

                <p className="text-sm text-zinc-400 font-light leading-relaxed">
                  {item.desc}
                </p>
              </DynamicGlow>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
