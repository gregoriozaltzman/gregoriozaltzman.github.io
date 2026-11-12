import { motion } from "framer-motion";
import { personalInfo } from "../../data/portfolioData";
import { ArrowUpRight, Mail } from "lucide-react";
import { TUMLogo, UCSDLogo } from "../ui/UniversityLogos";

export default function JamAbout() {
  const scrollToContact = () => {
    const el = document.getElementById("contact");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 py-20 sm:py-28 border-b border-white/10 select-none">
      {/* Section Header with Scroll Animation */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="pb-10 border-b border-white/10"
      >
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-[-0.04em] text-white">
          ABOUT
        </h2>
      </motion.div>

      <div className="pt-10 space-y-10">
        {/* Statement Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-12 md:p-14 rounded-[32px] liquid-glass-card space-y-6 relative hover:border-white/20 transition-colors"
        >
          <div className="glass-reflection" />
          <div className="relative z-10 space-y-6">
            <p className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight uppercase tracking-tight">
              Aspiring to advance European space initiatives, contributing to space exploration and scientific missions through next-generation orbital systems.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              <p>
                My primary long-term ambition is to help propel European space capabilities into the future by contributing to space exploration and scientific missions with organizations such as the{" "}
                <strong className="text-white font-medium">European Space Agency (ESA)</strong>, <strong className="text-white font-medium">EUSPA</strong>, and Europe’s pioneering spaceflight ecosystem. I am driven by the development of resilient space systems, orbital architectures, and exploration technologies that strengthen Europe's sovereign presence in space while advancing scientific discovery.
              </p>
              <p>
                Currently based in Munich, I am pursuing my Master of Science in Aerospace Engineering at the{" "}
                <strong className="text-white font-medium">Technical University of Munich (TUM)</strong>, deepening my expertise in spacecraft engineering, orbital mechanics, and space systems. My foundation was established at{" "}
                <strong className="text-white font-medium">UC San Diego (UCSD)</strong> with a Bachelor of Science in Aerospace Engineering, leading capstone programs as Chief Engineer and building a rigorous foundation across systems engineering and aerospace design.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Education Dual Cards with Official University Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalInfo.degrees.map((deg, idx) => {
            const isTUM =
              deg.institution.toLowerCase().includes("munich") ||
              deg.institution.toLowerCase().includes("tum");

            return (
              <motion.a
                key={deg.degree}
                href={deg.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="p-6 sm:p-8 rounded-[28px] liquid-glass-card group flex items-center justify-between cursor-pointer relative hover:border-white/20 transition-all"
              >
                <div className="glass-reflection" />
                <div className="flex items-center gap-4 sm:gap-5 relative z-10">
                  {/* Circular School Profile Pic Badge */}
                  <div
                    className={`w-13 h-13 sm:w-15 sm:h-15 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 shadow-md ${
                      isTUM
                        ? "bg-[#0065BD]/20 border-[#0065BD]/50 group-hover:border-[#0065BD] group-hover:shadow-[0_0_25px_rgba(0,101,189,0.45)] p-3"
                        : "bg-[#182B49]/40 border-[#C69214]/50 group-hover:border-[#C69214] group-hover:shadow-[0_0_25px_rgba(198,146,20,0.35)] p-2.5"
                    }`}
                  >
                    {isTUM ? (
                      <TUMLogo className="w-full h-auto text-[#3070B3] group-hover:text-white transition-colors" />
                    ) : (
                      <UCSDLogo className="w-full h-auto" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-zinc-200 transition-colors uppercase tracking-tight">
                      {deg.institution}
                    </h4>
                    <p className="text-xs sm:text-sm font-mono text-zinc-400">
                      {deg.degree}
                    </p>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full liquid-glass-pill group-hover:bg-white group-hover:text-black flex items-center justify-center transition-all shrink-0 ml-4">
                  <ArrowUpRight size={18} />
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Quick Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-between gap-4 p-6 sm:p-8 rounded-[32px] liquid-glass-card hover:border-white/20 transition-colors"
        >
          <p className="text-sm font-medium text-white">
            Open to engineering roles, collaborations, and initiatives aligned with European space programs and advanced aerospace missions.
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={scrollToContact}
              className="px-5 py-2.5 rounded-full bg-white hover:bg-zinc-200 text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-white/10"
            >
              <Mail size={14} />
              <span>Get In Touch</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}