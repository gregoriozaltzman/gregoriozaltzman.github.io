import { motion } from "framer-motion";
import { ArrowRight, Box, Video, FileText, Code2 } from "lucide-react";
import DynamicGlow from "../ui/DynamicGlow";

export default function ProjectCard({ project, onSelect, index }) {
  const isLarge = project.size === "large";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08, type: "spring", stiffness: 120 }}
      className={isLarge ? "md:col-span-2" : "md:col-span-1"}
    >
      <DynamicGlow
        onClick={() => onSelect(project)}
        className="chamfer-pill group cursor-pointer border border-borderCustom hover:border-white/40 overflow-hidden transition-all duration-300 h-full flex flex-col"
      >
        {/* Media Preview Header */}
        <div className={`overflow-hidden relative border-b border-borderCustom ${isLarge ? "h-64 sm:h-72 lg:h-80" : "h-56 sm:h-64"}`}>
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />

          {/* Media Feature Badges in top-right */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5 z-10">
            {project.model && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag text-[10px] text-sky-400 font-medium flex items-center gap-1">
                <Box size={11} /> 3D Model
              </span>
            )}
            {project.video && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag text-[10px] text-amber-400 font-medium flex items-center gap-1">
                <Video size={11} /> Video
              </span>
            )}
            {project.codeSnippet && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                <Code2 size={11} /> MATLAB
              </span>
            )}
            {project.pdfs && project.pdfs.length > 0 && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag text-[10px] text-zinc-300 font-medium flex items-center gap-1">
                <FileText size={11} /> PDF Report
              </span>
            )}
          </div>

          {/* Dark gradient fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
          <div className="space-y-2">
            <span className="text-xs text-sky-400 font-medium uppercase tracking-wider block">
              {project.category}
            </span>

            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight group-hover:text-zinc-200 transition-colors">
              {project.title}
            </h3>

            <p className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Skills pills and Arrow Action */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.skills?.slice(0, 3).map((skill, i) => (
                <span
                  key={i}
                  className="chamfer-tag px-2.5 py-0.5 bg-white/[0.04] border border-white/10 text-[11px] text-zinc-400"
                >
                  {skill}
                </span>
              ))}
              {project.skills?.length > 3 && (
                <span className="text-[11px] text-zinc-500 self-center">
                  +{project.skills.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-sky-400 transition-colors shrink-0">
              <span>View Project</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </DynamicGlow>
    </motion.div>
  );
}
