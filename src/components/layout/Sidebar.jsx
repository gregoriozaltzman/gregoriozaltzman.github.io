import { useEffect, useState } from "react";
import { ExternalLink, Mail, ChevronRight } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/portfolioData";
import ChamferButton from "../ui/ChamferButton";

const navSections = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Technical Skills" },
  { id: "timeline", label: "Milestones" },
  { id: "aspirations", label: "Aspirations" },
  { id: "contact", label: "Contact" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of navSections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="lg:w-[36%] xl:w-[32%] lg:h-screen lg:sticky top-0 bg-[#030303]/90 backdrop-blur-2xl border-b lg:border-b-0 lg:border-r border-borderCustom p-8 lg:p-12 xl:p-14 flex flex-col justify-between overflow-y-auto scrollbar-none z-20">
      {/* Top Header / Profile Info */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-lg tracking-wider px-3 py-1 bg-white/10 border border-white/20 chamfer-pill text-white">
            {personalInfo.initials}
          </div>

          <div className="flex items-center gap-3 text-muted">
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="p-1.5 hover:text-[#0a66c2] hover:bg-white/5 rounded transition-all"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="p-1.5 hover:text-white hover:bg-white/5 rounded transition-all"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.email}`}
              aria-label="Email"
              className="p-1.5 hover:text-sky-400 hover:bg-white/5 rounded transition-all"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-medium">
            Aerospace Engineering
          </p>

          <h1 className="text-3xl xl:text-4xl font-semibold tracking-[-0.04em] text-white leading-[1.1]">
            {personalInfo.name} <br />
            <span className="text-zinc-400 font-normal">{personalInfo.surname}</span>
          </h1>

          <p className="text-sm text-zinc-400 font-light leading-relaxed pt-1">
            {personalInfo.focus}
          </p>
        </div>

        {/* Education Blocks */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider block">
            Education
          </span>
          {personalInfo.degrees.map((deg, i) => (
            <a
              key={i}
              href={deg.url}
              target="_blank"
              rel="noreferrer"
              className="group block p-2.5 bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-white/20 transition-all rounded"
            >
              <div className="text-xs font-medium text-zinc-200 group-hover:text-white flex items-center justify-between">
                <span>{deg.degree}</span>
                <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-[11px] text-zinc-500 group-hover:text-zinc-400">
                {deg.institution}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Middle Navigation - Desktop Scrollspy */}
      <div className="hidden lg:block py-6 my-auto">
        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider block mb-3">
          Navigation
        </span>
        <nav className="space-y-1">
          {navSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`group flex items-center justify-between py-2 px-3 rounded text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 border-l-2 border-white font-medium translate-x-1"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
              >
                <span>{sec.label}</span>
                <ChevronRight
                  size={12}
                  className={`transition-transform duration-200 ${
                    isActive ? "translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-60"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <ChamferButton
          href="/assets/resume.pdf"
          target="_blank"
          variant="outline"
          className="w-full justify-center text-xs py-2.5"
        >
          View Resume
        </ChamferButton>
      </div>
    </aside>
  );
}
