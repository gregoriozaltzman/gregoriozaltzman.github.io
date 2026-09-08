import { Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";
import { personalInfo } from "../../data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-20 pb-12 border-t border-borderCustom text-center space-y-8">
      {/* Telemetry Status Bar */}
      <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/[0.03] border border-white/10 chamfer-pill text-xs font-mono text-zinc-300">
        <span className="w-2 h-2 rounded-full bg-emerald-400 blinking" />
        <span className="font-semibold text-white">{personalInfo.status}</span>
        <span className="text-zinc-600">|</span>
        <span className="text-zinc-400">{personalInfo.location}</span>
      </div>

      {/* Social Links */}
      <div className="flex items-center justify-center gap-6">
        <a
          href={personalInfo.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 hover:text-[#0a66c2] transition-colors p-2"
          aria-label="LinkedIn"
        >
          <LinkedinIcon size={20} />
        </a>
        <a
          href={personalInfo.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="text-zinc-400 hover:text-white transition-colors p-2"
          aria-label="GitHub"
        >
          <GithubIcon size={20} />
        </a>
        <a
          href={`mailto:${personalInfo.email}`}
          className="text-zinc-400 hover:text-sky-400 transition-colors p-2"
          aria-label="Email"
        >
          <Mail size={20} />
        </a>
      </div>

      <div className="space-y-1 font-mono text-[11px] text-zinc-600">
        <p>© {currentYear} {personalInfo.name} {personalInfo.surname}. All rights reserved.</p>
        <p className="text-zinc-700">Aerospace Engineering & Computational Design</p>
      </div>
    </footer>
  );
}
