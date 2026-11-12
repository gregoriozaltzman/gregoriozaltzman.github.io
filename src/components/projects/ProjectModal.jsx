import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Box,
  Image as ImageIcon,
  Video,
  Code2,
  Copy,
  Check,
  RotateCcw,
  GitFork,
  Share2,
  BarChart3,
  Layers,
} from "lucide-react";
import "@google/model-viewer";
import ProjectWorkflowFlowchart from "./ProjectWorkflowFlowchart";
import ProjectDataVisualizer from "./ProjectDataVisualizer";

function getDefaultMediaTab(p) {
  if (!p) return "gallery";
  if (p.model) return "3d";
  if (p.video) return "video";
  if (p.codeSnippet && (!p.gallery || p.gallery.length === 0)) return "code";
  return "gallery";
}

export default function ProjectModal({
  project,
  projects = [],
  currentIndex = 0,
  onClose,
  onNavigate,
}) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNavigate) onNavigate(1);
      if (e.key === "ArrowLeft" && onNavigate) onNavigate(-1);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNavigate]);

  // Prevent background scroll while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow || "";
    };
  }, []);

  if (!project) return null;

  const totalProjects = projects.length;
  const prevProject =
    totalProjects > 0
      ? projects[(currentIndex - 1 + totalProjects) % totalProjects]
      : null;
  const nextProject =
    totalProjects > 0 ? projects[(currentIndex + 1) % totalProjects] : null;

  const modal = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-5 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Floating Side Arrow for Next/Prev on large screens */}
        {onNavigate && totalProjects > 1 && (
          <>
            <button
              onClick={() => onNavigate(-1)}
              title={`Previous: ${prevProject?.title || "Previous"}`}
              aria-label="Previous project"
              className="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-[101] w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black border border-white/20 text-zinc-300 items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-110"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => onNavigate(1)}
              title={`Next: ${nextProject?.title || "Next"}`}
              aria-label="Next project"
              className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-[101] w-12 h-12 rounded-full bg-black/80 hover:bg-white hover:text-black border border-white/20 text-zinc-300 items-center justify-center transition-all shadow-2xl cursor-pointer hover:scale-110"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        {/* Modal Window Container: ROUNDED CORNERS */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="relative w-full max-w-7xl h-[92vh] sm:h-[90vh] bg-[#070709] border border-white/15 rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.95)] flex flex-col z-[102]"
        >
          <ProjectModalContent
            key={project.id}
            project={project}
            projects={projects}
            currentIndex={currentIndex}
            onClose={onClose}
            onNavigate={onNavigate}
          />
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return typeof document !== "undefined"
    ? createPortal(modal, document.body)
    : null;
}

function ProjectModalContent({
  project,
  projects,
  currentIndex,
  onClose,
  onNavigate,
}) {
  const [activeMediaTab, setActiveMediaTab] = useState(() =>
    getDefaultMediaTab(project)
  );
  const [activeDetailsTab, setActiveDetailsTab] = useState("overview");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const modelViewerRef = useRef(null);

  const totalProjects = projects.length;
  const nextProject =
    totalProjects > 0 ? projects[(currentIndex + 1) % totalProjects] : null;

  const handleCopyCode = (snippet) => {
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShareProject = () => {
    const url = new URL(window.location.origin + window.location.pathname);
    url.searchParams.set("project", project.id);
    navigator.clipboard.writeText(url.toString());
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const handleResetModelCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "0deg 75deg 105%";
      modelViewerRef.current.resetTurntable();
    }
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="h-14 px-5 sm:px-8 border-b border-white/10 bg-[#09090c] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs text-white font-mono uppercase tracking-wider font-semibold">
            {project.category}
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {onNavigate && totalProjects > 1 && (
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-white/10 rounded-full overflow-hidden">
                <button
                  onClick={() => onNavigate(-1)}
                  title="Previous Project (Arrow Left)"
                  className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft size={18} />
                </button>
                <span className="w-[1px] h-4 bg-white/10" />
                <button
                  onClick={() => onNavigate(1)}
                  title="Next Project (Arrow Right)"
                  className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <button
                onClick={() => onNavigate(1)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/10 text-zinc-200 text-xs font-mono transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Share Project Link Button */}
          <button
            onClick={handleShareProject}
            title="Copy shareable link"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
          >
            {copiedShare ? (
              <>
                <Check size={13} className="text-white" />
                <span className="text-white font-mono text-[11px]">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 size={13} className="text-white" />
                <span className="hidden sm:inline font-mono text-xs">Share</span>
              </>
            )}
          </button>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Sub-Header Navigation Tabs: Rounded Pills */}
      {(project.workflow || project.reportFigures) && (
        <div className="px-5 sm:px-8 py-2.5 border-b border-white/10 bg-[#0c0c0e] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] border border-white/10 rounded-full">
            <button
              onClick={() => setActiveDetailsTab("overview")}
              className={`py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                activeDetailsTab === "overview"
                  ? "bg-white text-black font-bold shadow-sm"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Layers size={13} />
              <span>Project Overview</span>
            </button>

            {project.workflow && (
              <button
                onClick={() => setActiveDetailsTab("workflow")}
                className={`py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDetailsTab === "workflow"
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <GitFork size={13} />
                <span>Design Workflow</span>
              </button>
            )}

            {project.reportFigures && (
              <button
                onClick={() => setActiveDetailsTab("figures")}
                className={`py-1.5 px-4 rounded-full text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeDetailsTab === "figures"
                    ? "bg-white text-black font-bold shadow-sm"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <BarChart3 size={13} />
                <span>Technical Data</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 1: FULL-WIDTH DESIGN WORKFLOW */}
      {project.workflow && activeDetailsTab === "workflow" && (
        <div className="flex-grow overflow-y-auto bg-[#070709] p-5 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <ProjectWorkflowFlowchart
              workflow={project.workflow}
              projectTitle={project.title}
            />

            {/* Workflow Footer Navigation */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveDetailsTab("overview")}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Project Overview
              </button>

              <div className="flex items-center gap-3">
                {onNavigate && totalProjects > 1 && (
                  <>
                    <button
                      onClick={() => onNavigate(-1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => onNavigate(1)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                      <span>Next: {nextProject?.title || "Next"}</span>
                      <ArrowRight size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: FULL-WIDTH TECHNICAL FIGURES & DATA */}
      {project.reportFigures && activeDetailsTab === "figures" && (
        <div className="flex-grow overflow-y-auto bg-[#070709] p-5 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto space-y-8">
            <ProjectDataVisualizer project={project} />

            {/* Figures Footer Navigation */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={() => setActiveDetailsTab("overview")}
                className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                ← Return to Project Overview
              </button>

              <div className="flex items-center gap-3">
                {onNavigate && totalProjects > 1 && (
                  <>
                    <button
                      onClick={() => onNavigate(-1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                    >
                      <ArrowLeft size={14} />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => onNavigate(1)}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                      <span>Next: {nextProject?.title || "Next"}</span>
                      <ArrowRight size={14} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 3: SPLIT OVERVIEW */}
      {activeDetailsTab === "overview" && (
        <div className="flex flex-col lg:flex-row flex-grow overflow-hidden">
          {/* Left Column: Interactive Media Stage */}
          <div className="w-full lg:w-[54%] h-[42vh] lg:h-full bg-[#030304] flex flex-col border-b lg:border-b-0 lg:border-r border-white/10 relative">
            {/* Media Sub-navigation bar */}
            <div className="h-11 px-5 border-b border-white/10 bg-black/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                {project.gallery && project.gallery.length > 0 && (
                  <button
                    onClick={() => setActiveMediaTab("gallery")}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeMediaTab === "gallery"
                        ? "bg-white text-black font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <ImageIcon size={13} />
                    <span>Photos ({project.gallery.length})</span>
                  </button>
                )}

                {project.model && (
                  <button
                    onClick={() => setActiveMediaTab("3d")}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeMediaTab === "3d"
                        ? "bg-white text-black font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Box size={13} />
                    <span>3D Model</span>
                  </button>
                )}

                {project.video && (
                  <button
                    onClick={() => setActiveMediaTab("video")}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeMediaTab === "video"
                        ? "bg-white text-black font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Video size={13} />
                    <span>Video</span>
                  </button>
                )}

                {project.codeSnippet && (
                  <button
                    onClick={() => setActiveMediaTab("code")}
                    className={`px-3.5 py-1 rounded-full text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeMediaTab === "code"
                        ? "bg-white text-black font-semibold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    <Code2 size={13} />
                    <span>MATLAB Code</span>
                  </button>
                )}
              </div>

              {activeMediaTab === "3d" && (
                <button
                  onClick={handleResetModelCamera}
                  title="Reset 3D camera orbit"
                  className="p-1.5 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors flex items-center gap-1 text-[11px] font-mono cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span className="hidden sm:inline">Reset Camera</span>
                </button>
              )}
            </div>

            {/* Viewport for Active Media Tab */}
            <div className="flex-grow relative overflow-hidden bg-radial from-[#0c0c0f] to-[#030304] p-3 sm:p-4">
              {/* TAB 1: 3D MODEL VIEWER */}
              {activeMediaTab === "3d" && project.model && (
                <div className="w-full h-full relative rounded-2xl overflow-hidden border border-white/5">
                  <model-viewer
                    ref={modelViewerRef}
                    src={project.model}
                    alt={project.title}
                    auto-rotate
                    rotation-per-second="20deg"
                    camera-controls
                    touch-action="pan-y"
                    shadow-intensity="1.5"
                    exposure="1.0"
                    style={{ width: "100%", height: "100%", backgroundColor: "transparent" }}
                  >
                    <div slot="poster" className="w-full h-full flex items-center justify-center text-zinc-500 text-xs font-mono">
                      Loading 3D CAD geometry...
                    </div>
                  </model-viewer>
                  <div className="absolute bottom-3 left-3 px-3 py-1 bg-black/80 backdrop-blur-md rounded-full border border-white/10 text-[11px] text-zinc-400 pointer-events-none font-mono">
                    Drag to rotate • Scroll to zoom • Two-finger drag to pan
                  </div>
                </div>
              )}

              {/* TAB 2: IMAGE GALLERY */}
              {activeMediaTab === "gallery" && (
                <div className="w-full h-full flex flex-col justify-between p-2">
                  <div className="flex-grow flex items-center justify-center relative overflow-hidden rounded-2xl">
                    <img
                      src={project.gallery?.[activeImageIndex] || project.image}
                      alt={`${project.title} slide`}
                      className="max-h-full max-w-full object-contain rounded-2xl"
                    />
                  </div>

                  {/* Image Thumbnails Slider */}
                  {project.gallery && project.gallery.length > 1 && (
                    <div className="flex items-center justify-center gap-2 pt-3 shrink-0 overflow-x-auto py-1">
                      {project.gallery.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImageIndex(i)}
                          className={`w-14 h-10 rounded-xl overflow-hidden border transition-all shrink-0 cursor-pointer ${
                            activeImageIndex === i
                              ? "border-white scale-105 shadow-md"
                              : "border-white/20 opacity-50 hover:opacity-80"
                          }`}
                        >
                          <img
                            src={img}
                            alt="thumb"
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: VIDEO PLAYER */}
              {activeMediaTab === "video" && project.video && (
                <div className="w-full h-full flex items-center justify-center p-2">
                  <video
                    src={project.video}
                    controls
                    autoPlay
                    loop
                    muted
                    className="max-h-full max-w-full rounded-2xl border border-white/10 shadow-2xl"
                  />
                </div>
              )}

              {/* TAB 4: CODE SNIPPET (MATLAB) */}
              {activeMediaTab === "code" && project.codeSnippet && (
                <div className="w-full h-full p-5 overflow-y-auto font-mono text-xs text-zinc-300 relative bg-[#07090e] rounded-2xl border border-white/5">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 sticky top-0 bg-[#07090e]/95 backdrop-blur-md pt-1">
                    <span className="text-[11px] text-white font-semibold tracking-wider">
                      {project.codeSnippet.filename}
                    </span>
                    <button
                      onClick={() => handleCopyCode(project.codeSnippet.code)}
                      className="px-3 py-1 bg-white/10 hover:bg-white hover:text-black text-white rounded-full flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check size={12} className="text-emerald-400" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-zinc-300 select-all font-mono">
                    {project.codeSnippet.code}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Engineering Details */}
          <div className="w-full lg:w-[46%] h-[50vh] lg:h-full p-6 sm:p-8 lg:p-10 overflow-y-auto flex flex-col justify-between space-y-8 bg-[#070709]">
            <div className="space-y-6">
              {/* Title & Metadata */}
              <div className="space-y-2">
                <span className="text-xs text-zinc-400 font-mono uppercase tracking-wider font-semibold">
                  {project.category}
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-[-0.04em] text-white leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Executive Summary */}
              <div className="space-y-2">
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider block">
                  Executive Summary
                </span>
                <p className="text-sm text-zinc-300 font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Technical Sections */}
              {project.sections &&
                project.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="space-y-3 pt-2">
                    <h3 className="text-sm font-semibold text-white tracking-wide border-b border-white/10 pb-1.5">
                      {sec.heading}
                    </h3>
                    <div className="space-y-3">
                      {sec.items.map((item, iIdx) => (
                        <div key={iIdx} className="space-y-1">
                          <span className="text-xs font-semibold text-white flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                            {item.title}
                          </span>
                          <p className="text-xs text-zinc-400 font-light pl-3.5 leading-relaxed">
                            {item.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

              {/* Skills & Technologies Tags */}
              <div className="space-y-2 pt-2">
                <span className="text-xs text-zinc-500 font-mono uppercase tracking-wider block">
                  Tools & Methods
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.skills?.map((s, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 rounded-full"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Reports / PDFs */}
              {project.pdfs && project.pdfs.length > 0 && (
                <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                  {project.pdfs.map((pdf, i) => (
                    <a
                      key={i}
                      href={pdf.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-mono uppercase font-semibold hover:bg-zinc-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-full cursor-pointer"
                    >
                      {pdf.title} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Next Project Navigation Footer */}
            {onNavigate && totalProjects > 1 && (
              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  onClick={() => onNavigate(-1)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-400 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <button
                  onClick={() => onNavigate(1)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-zinc-200 text-black text-xs font-mono font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer ml-auto"
                >
                  <span>Next: {nextProject?.title || "Next"}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}