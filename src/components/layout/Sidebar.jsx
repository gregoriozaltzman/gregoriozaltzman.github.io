import { useEffect, useState } from "react";
import { ExternalLink, Mail, FileText, ChevronRight } from "lucide-react";
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
          <div className="flex items-center gap-3">
            <span className="font-mono text-xl font-bold tracking-wider px-2.5 py-1 bg-white/10 border border-white/20 chamfer-pill">
              {personalInfo.initials}
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 blinking" />
              <span>SYS.ACTIVE</span>
            </div>
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

        <div className="space-y-4">
          <div className="inline-block font-mono text-[11px] text-sky-400/90 tracking-widest uppercase px-2.5 py-1 bg-sky-500/10 border border-sky-500/20 chamfer-tag">
            // AEROSPACE ENGINEERING
          </div>

          <h1 className="text-3xl xl:text-4xl font-semibold tracking-tight text-white leading-[1.15]">
            {personalInfo.name} <br />
            <span className="text-zinc-400 font-normal">{personalInfo.surname}</span>
          </h1>

          <p className="text-xs xl:text-sm text-zinc-400 font-light leading-relaxed">
            {personalInfo.focus}
          </p>
        </div>

        {/* Education Blocks */}
        <div className="space-y-2.5 pt-2 border-t border-white/10">
          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block">
            Academic Track
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
              <div className="text-[11px] text-zinc-500 group-hover:text-zinc-400 font-mono">
                {deg.institution}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Middle Navigation - Desktop Scrollspy */}
      <div className="hidden lg:block py-6 my-auto">
        <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-3">
          Telemetry Index
        </span>
        <nav className="space-y-1">
          {navSections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className={`group flex items-center justify-between py-2 px-3 rounded font-mono text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-white bg-white/10 border-l-2 border-sky-400 font-semibold translate-x-1"
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] ${isActive ? "text-sky-400" : "text-zinc-600 group-hover:text-zinc-400"}`}>
                    // {sec.tag}
                  </span>
                  <span>{sec.label}</span>
                </div>
                <ChevronRight
                  size={14}
                  className={`transition-transform duration-200 ${
                    isActive ? "translate-x-0 opacity-100 text-sky-400" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions & Status */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <ChamferButton
          href={personalInfo.resumeUrl}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          icon={FileText}
          className="w-full"
        >
          View Curriculum Vitae
        </ChamferButton>

        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 pt-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">{personalInfo.status}</span>
          </div>
          <span>{personalInfo.location}</span>
        </div>
      </div>
    </aside>
  );
}
