import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, FileText, ArrowUpRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/portfolioData";

export default function MenuDrawer({ isOpen, onClose, activeSection, onSelectSection }) {
  const menuLinks = [
    { label: "projects •", id: "projects", tag: "Orbit 01 // 3D Trajectory & Dossiers" },
    { label: "experience •", id: "experience", tag: "Orbit 02 // DBF & ITS Leadership" },
    { label: "milestones •", id: "milestones", tag: "Orbit 03 // UCSD · TUM · Future" },
    { label: "skills •", id: "skills", tag: "Orbit 04 // CAD, MDO, DAQ & Analysis" },
    { label: "about •", id: "about", tag: "Orbit 05 // Space Aspirations & Vision" },
    { label: "contact •", id: "contact", tag: "Orbit 06 // Transmission Terminal" },
  ];

  const handleLinkClick = (id) => {
    onSelectSection(id);
    onClose();
  };

  // Staggered reveal animations matching Pacôme Pertant's style
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.12,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: "130%", opacity: 0, skewY: 3 },
    visible: {
      y: "0%",
      opacity: 1,
      skewY: 0,
      transition: {
        type: "spring",
        damping: 24,
        stiffness: 220,
      },
    },
    exit: {
      y: "-120%",
      opacity: 0,
      transition: { duration: 0.25 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8">
          {/* Backdrop Blur Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-2xl"
          />

          {/* Floating High-Radius Navigation Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="relative w-full max-w-3xl bg-[#090909] border border-white/20 rounded-[28px] p-6 sm:p-10 md:p-12 shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col justify-between min-h-[580px] z-10 overflow-hidden"
          >
            {/* Top Bar: Title + Close Pill */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 blinking" />
                <span>SPATIAL DIRECTORY • NAVIGATOR</span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close Menu"
                className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-black transition-all flex items-center gap-2 text-xs font-mono group"
              >
                <span>close</span>
                <X size={14} className="group-hover:rotate-90 transition-transform duration-200" />
              </button>
            </div>

            {/* Menu Links with Staggered Slide-Up Text Masks */}
            <motion.nav
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="py-6 sm:py-8 space-y-2 sm:space-y-3"
            >
              {menuLinks.map((item, idx) => {
                const isActive = activeSection === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleLinkClick(item.id)}
                    className="overflow-hidden cursor-pointer group"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center justify-between py-1 transition-all"
                    >
                      <div className="flex items-baseline gap-3 sm:gap-6">
                        <span
                          className={`text-xs sm:text-sm font-mono transition-colors duration-200 ${
                            isActive
                              ? "text-sky-400 font-semibold"
                              : "text-zinc-600 group-hover:text-sky-400"
                          }`}
                        >
                          0{idx + 1}
                        </span>

                        <span
                          className={`text-2xl sm:text-4xl md:text-5xl font-semibold tracking-[-0.04em] transition-all duration-300 transform group-hover:translate-x-3 ${
                            isActive
                              ? "text-white"
                              : "text-zinc-400 group-hover:text-white"
                          }`}
                        >
                          {item.label}
                        </span>
                      </div>

                      <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        <span className="text-[10px] tracking-wider uppercase text-zinc-600 group-hover:text-sky-400">
                          {item.tag}
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-zinc-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.nav>

            {/* Bottom Meta & External Links */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/10">
              <div className="flex flex-col">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-xs sm:text-sm font-mono text-zinc-400 hover:text-sky-400 transition-colors flex items-center gap-2"
                >
                  <Mail size={14} className="text-zinc-500" />
                  <span>{personalInfo.email}</span>
                </a>
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mt-0.5">
                  Munich, Germany · M.S. Aerospace '28 (TUM)
                </span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400">
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
                >
                  <LinkedinIcon size={16} />
                </a>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
                >
                  <GithubIcon size={16} />
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Resume PDF"
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-all"
                >
                  <FileText size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
