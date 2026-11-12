import { useState, useCallback, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectsData } from "../../data/portfolioData";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight } from "lucide-react";

const FILTERS = [
  "All",
  "Aerodynamics",
  "Space & Propulsion",
  "Structures & CAD",
  "Systems & Testing",
];

export default function JamProjects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const updateUrlParam = useCallback((projectId) => {
    try {
      const url = new URL(window.location);
      if (projectId) {
        url.searchParams.set("project", projectId);
      } else {
        url.searchParams.delete("project");
      }
      window.history.pushState({}, "", url.toString());
    } catch {
      // Fallback
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const pId = params.get("project");
        if (pId) {
          const match = projectsData.find((p) => p.id === pId);
          setActiveProject(match || null);
        } else {
          setActiveProject(null);
        }
      } catch {
        setActiveProject(null);
      }
    };

    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const openProjectModal = (proj) => {
    setActiveProject(proj);
    updateUrlParam(proj.id);
  };

  const closeProjectModal = () => {
    setActiveProject(null);
    updateUrlParam(null);
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") return projectsData;
    if (activeFilter === "Aerodynamics") {
      return projectsData.filter((p) =>
        ["manta", "citadel", "wind-tunnel"].includes(p.id)
      );
    }
    if (activeFilter === "Space & Propulsion") {
      return projectsData.filter((p) =>
        ["cfd-rocket", "orbit-det"].includes(p.id)
      );
    }
    if (activeFilter === "Structures & CAD") {
      return projectsData.filter((p) =>
        ["wing-spar", "piston-engine"].includes(p.id)
      );
    }
    if (activeFilter === "Systems & Testing") {
      return projectsData.filter((p) =>
        ["seaglide", "lab-ops"].includes(p.id)
      );
    }
    return projectsData;
  }, [activeFilter]);

  const currentModalIndex = activeProject
    ? projectsData.findIndex((p) => p.id === activeProject.id)
    : -1;

  const handleNavigateModal = (direction) => {
    if (currentModalIndex === -1) return;
    const total = projectsData.length;
    let nextIndex = (currentModalIndex + direction + total) % total;
    const nextProj = projectsData[nextIndex];
    setActiveProject(nextProj);
    updateUrlParam(nextProj.id);
  };

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Section Header & Simple Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10"
      >
        <div>
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
            PROJECTS
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 text-xs font-mono rounded-full transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.25)]"
                    : "text-zinc-400 hover:text-white liquid-glass-pill"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* High-Level Editorial Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-10"
      >
        <AnimatePresence>
          {filteredProjects.map((proj, idx) => (
            <motion.div
              layout
              key={proj.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col justify-between p-6 sm:p-8 rounded-[32px] liquid-glass-card group relative hover:border-white/20 transition-colors"
            >
              <div className="glass-reflection" />
              <div className="space-y-5 relative z-10">
                {/* Image Banner */}
                <div
                  onClick={() => openProjectModal(proj)}
                  className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden border border-white/10 relative cursor-pointer group"
                >
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3.5 py-1 text-xs font-mono text-zinc-200 liquid-glass-pill rounded-full">
                    {proj.category}
                  </div>
                </div>

                {/* Project Header */}
                <div className="space-y-1.5">
                  <h3
                    onClick={() => openProjectModal(proj)}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-white group-hover:text-zinc-200 transition-colors cursor-pointer"
                  >
                    {proj.title}
                  </h3>
                </div>

                {/* High-Level Topic Summary */}
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {proj.summary}
                </p>

                {/* Core Tools / Skills Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-3 py-1 text-zinc-300 text-xs font-mono liquid-glass-pill rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/5 relative z-10">
                <button
                  onClick={() => openProjectModal(proj)}
                  className="w-full py-3 px-4 rounded-full liquid-glass-pill text-zinc-100 hover:text-black hover:bg-white font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>View Project</span>
                  <ArrowUpRight size={14} className="text-white group-hover:text-black" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Project Modal */}
      {activeProject && (
        <ProjectModal
          key={activeProject.id}
          project={activeProject}
          projects={projectsData}
          currentIndex={currentModalIndex}
          onClose={closeProjectModal}
          onNavigate={handleNavigateModal}
        />
      )}
    </section>
  );
}