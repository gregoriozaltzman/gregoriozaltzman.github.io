import { useState, useEffect, useCallback } from "react";
import { projectsData } from "../../data/portfolioData";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SpiralView from "../pacome/SpiralView";
import ListView from "../pacome/ListView";

export default function ProjectGrid({ activeView = "spiral", onViewChange }) {
  const [internalView, setInternalView] = useState(activeView);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    setInternalView(activeView);
  }, [activeView]);

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
      // Fallback
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
    <section id="projects" className="w-full">
      {/* Main Spatial Viewport (Spiral 3D vs Typographic List) */}
      {internalView === "spiral" ? (
        <SpiralView
          projects={projectsData}
          onSelectProject={openProjectModal}
        />
      ) : (
        <ListView
          projects={projectsData}
          onSelectProject={openProjectModal}
        />
      )}

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
