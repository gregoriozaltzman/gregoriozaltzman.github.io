import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/portfolioData";
import ChamferButton from "../ui/ChamferButton";

const navSections = [
  { id: "projects", label: "Projects", tag: "01" },
  { id: "experience", label: "Experience", tag: "02" },
  { id: "skills", label: "Skills", tag: "03" },
  { id: "timeline", label: "Timeline", tag: "04" },
  { id: "aspirations", label: "Aspirations", tag: "05" },
  { id: "contact", label: "Contact", tag: "06" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <header className="lg:hidden sticky top-0 z-40 bg-[#030303]/90 backdrop-blur-xl border-b border-borderCustom px-6 py-4 flex items-center justify-between">
      <a href="#" className="flex items-center gap-2.5">
        <span className="font-mono text-sm font-bold px-2 py-0.5 bg-white/10 border border-white/20 chamfer-pill">
          {personalInfo.initials}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-white">{personalInfo.name}</span>
          <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">
            // Aerospace Engineering
          </span>
        </div>
      </a>

      <button
        onClick={toggle}
        className="p-2 text-zinc-300 hover:text-white bg-white/5 border border-white/10 rounded transition-colors"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-b border-borderCustom p-6 shadow-2xl flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-2">
              {navSections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={close}
                  className="flex items-center justify-between p-3 rounded font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <span className="text-zinc-500">// {sec.tag}</span>
                  <span className="font-semibold">{sec.label}</span>
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-white/10 flex flex-col gap-4">
              <ChamferButton
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                variant="primary"
                icon={FileText}
                onClick={close}
                className="w-full"
              >
                View Resume
              </ChamferButton>

              <div className="flex items-center justify-center gap-6 text-zinc-400">
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="hover:text-[#0a66c2] transition-colors"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="hover:text-white transition-colors"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  aria-label="Email"
                  className="hover:text-sky-400 transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
