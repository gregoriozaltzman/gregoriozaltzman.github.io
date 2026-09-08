import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Box,
  Image as ImageIcon,
  Video,
  Code2,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";
import "@google/model-viewer";

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
  currentIndex = -1,
  onClose,
  onNavigate,
}) {
  const [activeMediaTab, setActiveMediaTab] = useState(() => getDefaultMediaTab(project));
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState(false);
  const modelViewerRef = useRef(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Keyboard navigation listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!project) return;
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowLeft" && onNavigate) {
        onNavigate(-1);
      } else if (e.key === "ArrowRight" && onNavigate) {
        onNavigate(1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose, onNavigate]);

  const handleCopyCode = () => {
    if (!project?.codeSnippet) return;
    navigator.clipboard.writeText(project.codeSnippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleResetModelCamera = () => {
    if (modelViewerRef.current) {
      modelViewerRef.current.cameraOrbit = "0deg 75deg 105%";
      modelViewerRef.current.resetTurntable();
    }
  };

  if (!project) return null;

  const totalProjects = projects.length;
  const projectNumber =
    currentIndex >= 0
      ? String(currentIndex + 1).padStart(2, "0")
      : "01";
  const totalFormatted = String(totalProjects || 9).padStart(2, "0");

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="relative w-full max-w-7xl h-[92vh] bg-[#070707] border border-white/20 rounded-xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.9)] flex flex-col z-10"
        >
          {/* Top Telemetry Header */}
          <div className="h-14 px-6 border-b border-white/10 bg-[#0a0a0a]/90 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-sky-400 font-semibold tracking-wider">
                DOSSIER // {project.tag}
              </span>
              <span className="text-zinc-600 hidden sm:inline">|</span>
              <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
                {projectNumber} / {totalFormatted}
              </span>
            </div>

            {/* Cycling navigation and close button */}
            <div className="flex items-center gap-2">
              {onNavigate && totalProjects > 1 && (
                <div className="flex items-center border border-white/10 rounded overflow-hidden mr-2">
                  <button
                    onClick={() => onNavigate(-1)}
                    title="Previous Project (Arrow Left)"
                    className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <span className="w-[1px] h-4 bg-white/10" />
                  <button
                    onClick={() => onNavigate(1)}
                    title="Next Project (Arrow Right)"
                    className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}

              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-1.5 hover:bg-white/10 text-zinc-400 hover:text-white rounded transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Modal Split View */}
          <div className="flex-grow flex flex-col lg:flex-row overflow-hidden">
            {/* Left Station: Interactive Media Viewer */}
            <div className="w-full lg:w-[52%] xl:w-[55%] h-[40vh] sm:h-[45vh] lg:h-full bg-black/80 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col relative shrink-0">
              {/* Media Mode Tabs */}
              <div className="p-3 border-b border-white/10 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-1.5 overflow-x-auto">
                  {project.model && (
                    <button
                      onClick={() => setActiveMediaTab("3d")}
                      className={`px-3 py-1 chamfer-tag font-mono text-[11px] flex items-center gap-1.5 transition-all ${
                        activeMediaTab === "3d"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                          : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                      }`}
                    >
                      <Box size={13} /> 3D Model
                    </button>
                  )}

                  {project.gallery && project.gallery.length > 0 && (
                    <button
                      onClick={() => setActiveMediaTab("gallery")}
                      className={`px-3 py-1 chamfer-tag font-mono text-[11px] flex items-center gap-1.5 transition-all ${
                        activeMediaTab === "gallery"
                          ? "bg-sky-500/20 text-sky-300 border border-sky-400/40"
                          : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                      }`}
                    >
                      <ImageIcon size={13} /> Gallery ({project.gallery.length})
                    </button>
                  )}

                  {project.video && (
                    <button
                      onClick={() => setActiveMediaTab("video")}
                      className={`px-3 py-1 chamfer-tag font-mono text-[11px] flex items-center gap-1.5 transition-all ${
                        activeMediaTab === "video"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-400/40"
                          : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                      }`}
                    >
                      <Video size={13} /> Video
                    </button>
                  )}

                  {project.codeSnippet && (
                    <button
                      onClick={() => setActiveMediaTab("code")}
                      className={`px-3 py-1 chamfer-tag font-mono text-[11px] flex items-center gap-1.5 transition-all ${
                        activeMediaTab === "code"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-400/40"
                          : "text-zinc-400 hover:text-white bg-white/5 border border-transparent"
                      }`}
                    >
                      <Code2 size={13} /> MATLAB Code
                    </button>
                  )}
                </div>

                {activeMediaTab === "3d" && (
                  <button
                    onClick={handleResetModelCamera}
                    title="Reset 3D camera"
                    className="p-1 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors text-xs flex items-center gap-1 font-mono"
                  >
                    <RotateCcw size={12} /> Reset
                  </button>
                )}
              </div>

              {/* Media Display Area */}
              <div className="flex-grow flex items-center justify-center p-4 relative overflow-hidden">
                {activeMediaTab === "3d" && project.model && (
                  <div className="w-full h-full relative">
                    <model-viewer
                      ref={modelViewerRef}
                      src={project.model}
                      alt={`3D Model of ${project.title}`}
                      auto-rotate
                      rotation-per-second="20deg"
                      camera-controls
                      touch-action="pan-y"
                      shadow-intensity="1.5"
                      exposure="1.0"
                      environment-image="neutral"
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, rgba(0, 0, 0, 0.8) 100%)",
                      }}
                    />
                    <div className="absolute bottom-3 left-4 font-mono text-[10px] text-zinc-500 bg-black/60 px-2.5 py-1 rounded border border-white/10 pointer-events-none">
                      Drag to orbit • Scroll to zoom
                    </div>
                  </div>
                )}

                {activeMediaTab === "gallery" && project.gallery && (
                  <div className="w-full h-full flex flex-col items-center justify-center">
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                      <img
                        src={project.gallery[activeGalleryIndex] || project.image}
                        alt={`${project.title} view ${activeGalleryIndex + 1}`}
                        className="max-h-[85%] max-w-[95%] object-contain rounded border border-white/10 shadow-2xl"
                      />
                    </div>
                    {/* Thumbnail strip if multiple images */}
                    {project.gallery.length > 1 && (
                      <div className="flex gap-2 p-2 max-w-full overflow-x-auto">
                        {project.gallery.map((img, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveGalleryIndex(i)}
                            className={`w-14 h-10 rounded overflow-hidden border transition-all ${
                              activeGalleryIndex === i
                                ? "border-sky-400 scale-105"
                                : "border-white/20 opacity-60 hover:opacity-100"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumbnail ${i + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeMediaTab === "video" && project.video && (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <video
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="max-h-full max-w-full rounded border border-white/15 shadow-2xl"
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                {activeMediaTab === "code" && project.codeSnippet && (
                  <div className="w-full h-full flex flex-col bg-[#050505] rounded border border-white/10 overflow-hidden">
                    <div className="px-4 py-2 border-b border-white/10 bg-white/[0.02] flex items-center justify-between text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 blinking" />
                        <span>MATLAB_RUNTIME // WING_SPAR_ANALYSIS.m</span>
                      </div>
                      <button
                        onClick={handleCopyCode}
                        className="flex items-center gap-1.5 px-2.5 py-1 bg-white/10 hover:bg-white/20 text-white rounded transition-colors text-[11px]"
                      >
                        {copiedCode ? (
                          <>
                            <Check size={12} className="text-emerald-400" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy size={12} /> Copy Code
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 font-mono text-xs text-sky-300 overflow-y-auto leading-relaxed flex-grow selection:bg-sky-500/30 selection:text-white">
                      <code>{project.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </div>
            </div>

            {/* Right Station: Technical Dossier Details */}
            <div className="w-full lg:w-[48%] xl:w-[45%] h-auto lg:h-full overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Meta header */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-sky-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white leading-tight">
                    {project.title}
                  </h2>
                </div>

                {/* Executive Summary */}
                <div className="space-y-2">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                    // Executive Summary
                  </span>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    {project.summary}
                  </p>
                </div>

                {/* Technical Sections (Analysis, Decisions, Lessons Learned) */}
                {project.sections &&
                  project.sections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-3 pt-2">
                      <h3 className="font-mono text-xs font-semibold text-zinc-200 uppercase tracking-wider border-b border-white/10 pb-1.5">
                        {sec.heading}
                      </h3>
                      <div className="space-y-3">
                        {sec.items.map((item, iIdx) => (
                          <div key={iIdx} className="space-y-0.5">
                            <span className="text-xs font-medium text-white flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                              {item.title}
                            </span>
                            <p className="text-xs text-zinc-400 font-light pl-3 leading-relaxed">
                              {item.text}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}

                {/* Skills & Technologies Tags */}
                <div className="space-y-2 pt-2">
                  <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                    // Tools & Competencies
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills?.map((s, i) => (
                      <span
                        key={i}
                        className="chamfer-pill px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-zinc-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons: View Reports / PDFs */}
              {project.pdfs && project.pdfs.length > 0 && (
                <div className="pt-6 border-t border-white/10 flex flex-wrap gap-3">
                  {project.pdfs.map((pdf, i) => (
                    <a
                      key={i}
                      href={pdf.url}
                      target="_blank"
                      rel="noreferrer"
                      className="chamfer-clip inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-mono text-xs uppercase font-bold hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-transform hover:-translate-y-0.5"
                    >
                      {pdf.title} <ExternalLink size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
