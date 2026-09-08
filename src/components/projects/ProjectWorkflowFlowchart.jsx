import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2, Cpu } from "lucide-react";

export default function ProjectWorkflowFlowchart({ workflow, projectTitle }) {
  const [selectedStep, setSelectedStep] = useState(0);

  if (!workflow || workflow.length === 0) return null;

  return (
    <div className="space-y-6 pt-4">
      {/* Flowchart Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
        <div>
          <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase">
            Engineering Synthesis Pipeline
          </span>
          <h4 className="text-lg font-semibold text-white tracking-[-0.02em]">
            {projectTitle} — Design Workflow
          </h4>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-400">
          <Cpu size={14} className="text-sky-400" />
          <span>Interactive Synthesis Loop</span>
        </div>
      </div>

      {/* Horizontal Flow Pipeline (Scrollable on small screens) */}
      <div className="overflow-x-auto pb-3 pt-1 scrollbar-none">
        <div className="flex items-center gap-2 min-w-[700px]">
          {workflow.map((node, idx) => {
            const isSelected = selectedStep === idx;
            const isPassed = idx < selectedStep;

            return (
              <div key={node.step} className="flex items-center">
                {/* Node Button */}
                <button
                  onClick={() => setSelectedStep(idx)}
                  className={`relative p-3.5 chamfer-card text-left transition-all cursor-pointer w-48 ${
                    isSelected
                      ? "bg-white/[0.08] border-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.25)] ring-1 ring-sky-400/50"
                      : isPassed
                      ? "bg-white/[0.03] border-white/20 hover:border-white/40 text-zinc-300"
                      : "bg-white/[0.01] border-white/10 hover:border-white/30 text-zinc-400"
                  } border`}
                >
                  {/* Step Badge */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded ${
                        isSelected
                          ? "bg-sky-400/20 text-sky-300 border border-sky-400/40"
                          : "bg-white/5 text-zinc-400"
                      }`}
                    >
                      PHASE {node.step}
                    </span>
                    {isPassed && (
                      <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                    )}
                  </div>

                  {/* Phase Title */}
                  <h5
                    className={`text-xs font-medium leading-tight line-clamp-2 ${
                      isSelected ? "text-white font-semibold" : "text-zinc-300"
                    }`}
                  >
                    {node.phase}
                  </h5>

                  {/* Primary Tool Tag */}
                  <div className="mt-2 text-[10px] text-zinc-400 truncate">
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
                  <div className="px-1 text-zinc-600">
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-5 sm:p-6 chamfer-box border border-sky-500/20 bg-[#090d16]/80 backdrop-blur-md space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-sky-400 font-semibold">
                  STEP {workflow[selectedStep].step} OF {workflow.length}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs text-zinc-400">Detailed Methodology</span>
              </div>
              <h5 className="text-base sm:text-lg font-semibold text-white">
                {workflow[selectedStep].phase}
              </h5>
            </div>

            {/* Tools Utilized in this Phase */}
            <div className="flex flex-wrap items-center gap-1.5">
              {workflow[selectedStep].tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2 py-0.5 text-[11px] bg-white/5 border border-white/10 rounded text-zinc-300 font-medium"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-zinc-300 font-light leading-relaxed">
            {workflow[selectedStep].desc}
          </p>

          {/* Verified Output / Convergence Metric */}
          <div className="pt-2 border-t border-white/10 flex items-start gap-2 text-xs">
            <span className="text-sky-400 font-medium shrink-0 flex items-center gap-1">
              <ChevronRight size={14} /> Key Deliverable / Output:
            </span>
            <span className="text-white font-medium">
              {workflow[selectedStep].output}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
