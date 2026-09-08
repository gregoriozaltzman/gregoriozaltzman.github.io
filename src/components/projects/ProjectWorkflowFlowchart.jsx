import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, Cpu } from "lucide-react";

export default function ProjectWorkflowFlowchart({ workflow, projectTitle }) {
  const [selectedStep, setSelectedStep] = useState(0);

  if (!workflow || workflow.length === 0) return null;

  return (
    <div className="space-y-6 pt-2">
      {/* Flowchart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              Engineering Synthesis Pipeline
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono">End-to-End Methodology</span>
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            {projectTitle} — Design Workflow
          </h4>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 shrink-0 self-start sm:self-auto font-mono">
          <Cpu size={14} className="text-sky-400" />
          <span>Interactive Synthesis Loop</span>
        </div>
      </div>

      {/* Horizontal Flow Pipeline */}
      <div className="overflow-x-auto pb-4 pt-1 scrollbar-thin">
        <div className="flex items-center gap-3 min-w-[850px]">
          {workflow.map((node, idx) => {
            const isSelected = selectedStep === idx;
            const isPassed = idx < selectedStep;

            return (
              <div key={node.step} className="flex items-center">
                {/* Node Button */}
                <button
                  onClick={() => setSelectedStep(idx)}
                  className={`relative p-4 chamfer-card text-left transition-all cursor-pointer min-w-[210px] w-56 ${
                    isSelected
                      ? "bg-white/[0.08] border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.2)] ring-1 ring-sky-400"
                      : isPassed
                      ? "bg-white/[0.03] border-white/20 hover:border-white/40 text-zinc-300"
                      : "bg-white/[0.015] border-white/10 hover:border-white/25 text-zinc-400"
                  } border`}
                >
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`text-[10px] font-mono tracking-wider px-2 py-0.5 rounded font-semibold ${
                        isSelected
                          ? "bg-sky-400/20 text-sky-300 border border-sky-400/40"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      PHASE 0{node.step}
                    </span>
                    {isPassed && (
                      <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    )}
                  </div>

                  {/* Phase Title */}
                  <h5
                    className={`text-xs font-semibold leading-snug ${
                      isSelected ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {node.phase}
                  </h5>

                  {/* Primary Tool Tag */}
                  <div className="mt-3 text-[11px] font-mono text-zinc-400">
                    {node.tools[0]}
                  </div>

                  {/* Active Indicator Arrow */}
                  {isSelected && (
                    <motion.div
                      layoutId="activeArrow"
                      className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-sky-400"
                    />
                  )}
                </button>

                {/* Connecting Arrow between Nodes */}
                {idx < workflow.length - 1 && (
                  <div className="px-2 text-zinc-600 shrink-0">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Detailed Dossier Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedStep}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 chamfer-card border border-sky-500/25 bg-sky-950/20 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-sky-400 font-semibold">
                  PHASE 0{workflow[selectedStep].step} OF 0{workflow.length}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400 font-mono">Detailed Engineering Methodology</span>
              </div>
              <h5 className="text-base sm:text-lg font-semibold text-white tracking-tight">
                {workflow[selectedStep].phase}
              </h5>
            </div>

            {/* Tools Utilized in this Phase */}
            <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
              {workflow[selectedStep].tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 text-xs font-mono bg-white/[0.04] border border-white/10 rounded text-zinc-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
            {workflow[selectedStep].desc}
          </p>

          {/* Verified Output / Convergence Metric */}
          <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex items-start gap-2.5 text-xs">
            <span className="text-sky-400 font-mono font-semibold shrink-0 flex items-center gap-1.5">
              <ChevronRight size={14} /> Key Deliverable / Output:
            </span>
            <span className="text-white font-medium leading-relaxed">
              {workflow[selectedStep].output}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
