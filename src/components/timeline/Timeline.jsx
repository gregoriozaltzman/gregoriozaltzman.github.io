import { motion } from "framer-motion";
import { timelineData } from "../../data/portfolioData";
import DynamicGlow from "../ui/DynamicGlow";

export default function Timeline() {
  return (
    <section id="timeline" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 04 — TRAJECTORY
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Engineering Milestones
          </h2>
          <span className="font-mono text-xs text-zinc-500">2022 – 2028+</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          Chronological progression across university studies, technical leadership, rocketry, competition aircraft, capstone systems, and forward-looking graduate studies.
        </p>
      </div>

      {/* Vertical Trajectory Track */}
      <div className="relative pl-6 sm:pl-8 border-l border-white/15 space-y-8 ml-2 sm:ml-4">
        {timelineData.map((item, idx) => {
          const isFuture = item.date.includes("2026") && item.title.includes("TUM");
          const isPresent = item.date.toLowerCase() === "present";

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
                  isFuture
                    ? "bg-sky-400 border-sky-300 shadow-[0_0_12px_#38bdf8]"
                    : isPresent
                    ? "bg-emerald-400 border-emerald-300 shadow-[0_0_12px_#22c55e]"
                    : "bg-[#070707] border-zinc-400"
                }`}
              />

              {/* Milestone Card */}
              <DynamicGlow className="chamfer-box p-6 border border-borderCustom hover:border-white/30 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
                  <span
                    className={`font-mono text-xs tracking-wider px-2 py-0.5 rounded border ${
                      isFuture
                        ? "bg-sky-500/10 text-sky-400 border-sky-500/30 font-semibold"
                        : isPresent
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-semibold"
                        : "bg-white/5 text-zinc-400 border-white/10"
                    }`}
                  >
                    {item.date}
                  </span>
                  {isPresent && (
                    <span className="font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blinking" />
                      ACTIVE INITIATIVE
                    </span>
                  )}
                  {isFuture && (
                    <span className="font-mono text-[10px] text-sky-400">
                      UPCOMING HORIZON
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold text-white pt-1">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
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
