import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { personalInfo } from "../../data/portfolioData";

export default function JamHero() {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative w-full pt-28 sm:pt-36 md:pt-40 pb-16 sm:pb-24 border-b border-white/10 select-none">
      <div className="space-y-10 sm:space-y-12">
        {/* Placeholder spacer for MorphingHeroTitle */}
        <div className="h-[105px] sm:h-[145px] md:h-[175px] w-full" aria-hidden="true" />

        {/* Summary Statement & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 pt-2"
        >
          <p className="text-base sm:text-xl md:text-2xl font-light text-zinc-300 leading-relaxed tracking-tight max-w-4xl">
            Master of Science candidate at the{" "}
            <span className="text-white font-medium">Technical University of Munich</span> (Class of '28), specializing in spacecraft engineering, rocketry, and orbital mechanics. Grounded in a Bachelor of Science in Aerospace Engineering from{" "}
            <span className="text-white font-medium">UC San Diego</span> ('26).
          </p>

          {/* Action Buttons: Rounded Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => scrollTo("projects")}
              className="px-6 py-3 rounded-full text-black font-semibold text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer bg-white hover:bg-zinc-200 shadow-[0_0_25px_rgba(255,255,255,0.2)]"
            >
              <span>View Projects</span>
              <ArrowDown size={14} className="text-black" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="px-5 py-3 rounded-full text-white text-xs font-mono uppercase tracking-wider flex items-center gap-2 cursor-pointer liquid-glass-pill hover:bg-white hover:text-black transition-all"
            >
              <span>Contact</span>
              <Mail size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}