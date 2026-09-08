import { useState } from "react";
import { projectsData } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";

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
    setActiveProject(projectsData[nextIndex]);
  };

  return (
    <section id="projects" className="space-y-8">
      {/* Section Header */}
      <div className="space-y-3">
        <div className="inline-block font-mono text-[11px] text-sky-400 tracking-widest uppercase">
          // DATA BLOCK 01 — DOSSIERS
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
            Featured Projects
          </h2>
          <span className="font-mono text-xs text-zinc-500">
            {projectsData.length} Selected Technical Case Studies
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-2xl leading-relaxed">
          From multi-disciplinary design optimization (MDO) to high-fidelity CFD, wind tunnel testing, and space flight simulation. Click any card to launch the interactive engineering dossier.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 pt-2">
        {categoryFilters.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-2">
        {filteredProjects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={idx}
            onSelect={(p) => setActiveProject(p)}
          />
        ))}
      </div>

      {/* Interactive Dossier Modal */}
      <ProjectModal
        key={activeProject?.id || "none"}
        project={activeProject}
        projects={projectsData}
        currentIndex={currentModalIndex}
        onClose={() => setActiveProject(null)}
        onNavigate={handleNavigateModal}
      />
    </section>
  );
}
