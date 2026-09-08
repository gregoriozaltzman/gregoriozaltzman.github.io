import { useState, useEffect, useCallback } from "react";
import { projectsData } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Typewriter from "../ui/Typewriter";

const categoryFilters = [
  "All",
  "Conceptual Aircraft Design",
  "Aircraft Design & Testing",
  "CFD & Simulation",
  "Structures & Sizing",
  "Aerodynamic Testing",
  "Orbital Simulation",
];

export default function ProjectGrid() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  // Sync URL query param with active modal state
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
      // Fallback if URL manipulation is restricted
    }
  }, []);

  // Listen to browser popstate (back/forward navigation)
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

    // Check initial URL on mount
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

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === activeCategory);

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
    <section id="projects" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
            01 / Projects
          </span>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
              Projects
            </h2>
            <span className="text-xs text-zinc-500">
              {projectsData.length} Projects
            </span>
          </div>
        </div>

        {/* Refined Integrated Focus Bar */}
        <div className="flex items-center gap-2.5 px-4 py-2.5 border-l-2 border-white/40 bg-white/[0.02] rounded-r-md text-sm text-zinc-300">
          <span className="text-zinc-500 font-medium shrink-0">Focus:</span>
          <Typewriter
            text="Aircraft design, aerodynamics, space systems, and spacecraft engineering."
            delay={0.3}
            speed={22}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-1">
        {categoryFilters.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 chamfer-tag text-xs font-medium transition-all cursor-pointer ${
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

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onSelect={openProjectModal}
          />
        ))}
      </div>

      {/* Interactive Dossier Modal */}
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
