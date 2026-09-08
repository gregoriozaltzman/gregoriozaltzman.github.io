import { motion } from "framer-motion";
import { ArrowUpRight, Box, Video, FileText, Code2 } from "lucide-react";
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
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag font-mono text-[10px] text-sky-400 flex items-center gap-1">
                <Box size={11} /> 3D GLB
              </span>
            )}
            {project.video && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag font-mono text-[10px] text-amber-400 flex items-center gap-1">
                <Video size={11} /> VIDEO
              </span>
            )}
            {project.codeSnippet && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag font-mono text-[10px] text-emerald-400 flex items-center gap-1">
                <Code2 size={11} /> MATLAB
              </span>
            )}
            {project.pdfs && project.pdfs.length > 0 && (
              <span className="px-2 py-1 bg-black/75 backdrop-blur-md border border-white/20 chamfer-tag font-mono text-[10px] text-zinc-300 flex items-center gap-1">
                <FileText size={11} /> PDF
              </span>
            )}
          </div>

          {/* Dark gradient fade for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Tag Overlay */}
          <div className="absolute bottom-3 left-4 z-10">
            <span className="font-mono text-[11px] text-zinc-300 tracking-wider bg-black/70 px-2 py-0.5 rounded border border-white/10">
              {project.tag}
            </span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] text-sky-400/90 uppercase tracking-wider">
                {project.category}
              </span>
              <div className="p-1 rounded bg-white/5 group-hover:bg-white text-zinc-400 group-hover:text-black transition-all">
                <ArrowUpRight size={16} />
              </div>
            </div>

            <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Skills pills */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
            {project.skills?.slice(0, 4).map((skill, i) => (
              <span
                key={i}
                className="chamfer-tag px-2 py-0.5 bg-white/[0.04] border border-white/10 font-mono text-[10px] text-zinc-400"
              >
                {skill}
              </span>
            ))}
            {project.skills?.length > 4 && (
              <span className="font-mono text-[10px] text-zinc-500 self-center">
                +{project.skills.length - 4}
              </span>
            )}
          </div>
        </div>
      </DynamicGlow>
    </motion.div>
  );
}
