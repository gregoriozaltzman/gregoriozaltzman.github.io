import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/portfolioData";

export default function PacomeMenuExpansion({ activeSection, onSelectSection }) {
  const [isOpen, setIsOpen] = useState(false);
  const prevSectionRef = useRef(activeSection);

  const menuLinks = [
    { label: "Projects", id: "projects", num: "01" },
    { label: "Experience", id: "experience", num: "02" },
    { label: "Milestones", id: "milestones", num: "03" },
    { label: "Skills", id: "skills", num: "04" },
    { label: "About", id: "about", num: "05" },
    { label: "Contact", id: "contact", num: "06" },
  ];

  useEffect(() => {
    prevSectionRef.current = activeSection;
  }, [activeSection]);

  // Close menu on Escape key press
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const activeLink = menuLinks.find((l) => l.id === activeSection) || menuLinks[0];

  const handleLinkClick = (id) => {
    if (onSelectSection) {
      onSelectSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative flex flex-col items-end">
      {/* 
        PERMANENT UNIFIED BUTTON:
        Never unmounts, never shifts coordinates.
        Layout springs provide fluid capsule expansion/contraction like Pacome design.
      */}
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.92 }}
        transition={{
          layout: { type: "spring", stiffness: 440, damping: 28 },
          scale: { type: "spring", stiffness: 500, damping: 25 },
        }}
        className={`relative z-50 self-end ml-auto h-[42px] px-4 rounded-full liquid-glass-pill flex items-center justify-center gap-2 text-xs font-mono tracking-wider cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.08)] select-none transition-colors duration-200 ${
          isOpen
            ? "bg-white text-black border-white hover:bg-zinc-200 shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            : "text-white hover:border-white/40"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close-state"
              initial={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 450, damping: 24 }}
              className="flex items-center gap-1.5 font-bold"
            >
              <span>close</span>
              <X size={13} className="text-black" />
            </motion.div>
          ) : (
            <motion.div
              key="menu-state"
              initial={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.75, filter: "blur(4px)" }}
              transition={{ type: "spring", stiffness: 450, damping: 24 }}
              className="flex items-center gap-2"
            >
              <span className="text-zinc-400">menu</span>
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              <span className="text-white font-semibold uppercase tracking-wider">
                {activeLink.label}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Full-Screen Backdrop & Anchored Drawer (Portaled to document.body) */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <>
                {/* Dimming Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60]"
                />

                {/* Menu Drawer: Smooth pop-up expansion originating from the menu button */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: -14, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    scale: 0.90,
                    y: -10,
                    filter: "blur(4px)",
                    transition: { duration: 0.18, ease: "easeInOut" },
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 24,
                    mass: 0.75,
                  }}
                  style={{ position: "fixed", transformOrigin: "top right" }}
                  className="top-20 sm:top-24 right-4 sm:right-8 md:right-12 z-[70] w-[calc(100vw-32px)] sm:w-[460px] max-h-[calc(100vh-104px)] rounded-[32px] bg-[#08080b]/92 backdrop-blur-2xl border border-white/20 shadow-[0_25px_80px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.12)] overflow-y-auto select-none flex flex-col justify-between p-6 sm:p-8"
                >
                  {/* Header Title inside Drawer */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                      NAVIGATION
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500 uppercase">
                      {menuLinks.length} Sections
                    </span>
                  </div>

                  {/* Navigation Links with Active Highlight */}
                  <nav className="py-6 space-y-2">
                    {menuLinks.map((item, idx) => {
                      const isActive = activeSection === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ x: 20, opacity: 0, filter: "blur(4px)" }}
                          animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
                          transition={{
                            delay: 0.05 + idx * 0.025,
                            type: "spring",
                            stiffness: 340,
                            damping: 24,
                          }}
                          whileHover={{ x: 3, scale: 1.01 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleLinkClick(item.id)}
                          className={`group flex items-center justify-between py-2.5 px-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                            isActive
                              ? "bg-white text-black font-semibold shadow-lg"
                              : "hover:bg-white/10 text-zinc-300 hover:text-white"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs font-mono ${
                                isActive ? "text-zinc-600 font-bold" : "text-zinc-500"
                              }`}
                            >
                              {item.num}
                            </span>
                            <span className="text-xl sm:text-2xl tracking-tight">
                              {item.label}
                            </span>
                          </div>

                          <ArrowUpRight
                            size={18}
                            className={`transition-all duration-200 ${
                              isActive
                                ? "text-black opacity-100"
                                : "text-zinc-500 opacity-0 group-hover:opacity-100 group-hover:text-white"
                            }`}
                          />
                        </motion.div>
                      );
                    })}
                  </nav>

                  {/* Bottom Profile Links */}
                  <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/10">
                    <button
                      onClick={() => handleLinkClick("contact")}
                      className="text-xs font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-2 cursor-pointer group"
                    >
                      <Mail size={14} className="text-white group-hover:scale-110 transition-transform" />
                      <span>Send a Message</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <a
                        href={personalInfo.linkedinUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                      >
                        <LinkedinIcon size={14} />
                      </a>
                      <a
                        href={personalInfo.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:bg-white hover:text-black flex items-center justify-center transition-all"
                      >
                        <GithubIcon size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}