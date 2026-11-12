import { motion } from "framer-motion";
import { personalInfo, aspirationsData } from "../../data/portfolioData";
import { FileText, Mail } from "lucide-react";
import { LinkedinIcon, GithubIcon } from "../ui/SocialIcons";

export default function AboutDeck({ onNavigateToContact }) {
  const bioWords = [
    "I", "am", "an", "aerospace", "engineer", "specializing", "in",
    "advanced", "spacecraft", "design,", "orbital", "mechanics,", "aerodynamic",
    "optimization,", "and", "space", "systems.", "Currently", "pursuing", "a",
    "Master", "of", "Science", "at", "the", "Technical", "University", "of",
    "Munich", "(Class", "of", "2028),", "building", "upon", "a", "rigorous",
    "aerospace", "engineering", "foundation", "from", "UC", "San", "Diego."
  ];

  return (
    <div className="w-full max-w-5xl mx-auto py-4 sm:py-8 space-y-8 select-none">
      {/* Clean Header */}
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-[-0.04em] text-white">
          About
        </h2>
      </div>

      {/* Illuminating Manifesto Card */}
      <div className="rounded-[28px] p-8 sm:p-14 bg-[#0a0a0a]/90 border border-white/15 relative overflow-hidden space-y-8 shadow-2xl">
        <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full blur-3xl opacity-10 bg-sky-500 pointer-events-none" />

        {/* Large Typographic Text with Staggered Word Illumination */}
        <p className="text-xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[1.35] text-zinc-400 flex flex-wrap gap-x-2.5 gap-y-1.5">
          {bioWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.35 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
              className="text-white hover:text-sky-300 transition-colors"
            >
              {word}
            </motion.span>
          ))}
        </p>

        {/* Long-Term Horizon Quote */}
        <blockquote className="p-5 rounded-2xl bg-white/[0.03] border-l-2 border-sky-400 text-sm sm:text-base text-zinc-300 font-light italic leading-relaxed">
          "{aspirationsData.quote}"
        </blockquote>

        {/* Education Capsules */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
          {aspirationsData.destinations.map((dest, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-sky-400">
                <span>{dest.year}</span>
                {dest.org.includes("TUM") && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 blinking" />
                )}
              </div>
              <h4 className="text-sm font-semibold text-white">{dest.label}</h4>
              <p className="text-xs text-zinc-400 font-light">{dest.org}</p>
            </div>
          ))}
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <button
            onClick={onNavigateToContact}
            className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs transition-all hover:bg-zinc-200 shadow-lg shadow-white/10 flex items-center gap-2"
          >
            <Mail size={14} />
            <span>Transmit Message</span>
          </button>

          <a
            href={personalInfo.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-all flex items-center gap-2"
          >
            <FileText size={14} />
            <span>Download Resume PDF</span>
          </a>

          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-all"
          >
            <LinkedinIcon size={16} />
          </a>

          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-all"
          >
            <GithubIcon size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}
