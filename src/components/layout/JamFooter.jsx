import { useState, useEffect } from "react";
import { personalInfo } from "../../data/portfolioData";
import { ArrowUpRight, ArrowUp } from "lucide-react";

export default function JamFooter() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Berlin",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${timeStr} CET`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full pt-16 sm:pt-20 pb-12 select-none">
      {/* 3-Tier Bordered Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-white/10 divide-y md:divide-y-0 md:divide-x divide-white/10 text-xs font-mono">
        {/* Tier 1: Links */}
        <div className="p-6 sm:p-8 space-y-3">
          <span className="text-zinc-500 uppercase tracking-widest block text-[11px]">
            Profiles & Connect
          </span>
          <div className="space-y-2">
            <div>
              <a
                href={personalInfo.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition-colors flex items-center justify-between group"
              >
                <span>LinkedIn</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <div>
              <a
                href={personalInfo.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition-colors flex items-center justify-between group"
              >
                <span>GitHub</span>
                <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <div className="pt-1 text-[11px] text-zinc-500">
              <span>CV available upon request</span>
            </div>
          </div>
        </div>

        {/* Tier 2: Location & Telemetry Time */}
        <div className="p-6 sm:p-8 space-y-3">
          <span className="text-zinc-500 uppercase tracking-widest block text-[11px]">
            Location
          </span>
          <div className="space-y-1.5 text-zinc-300">
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Base:</span>
              <span className="text-white font-medium">Munich, Germany</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Local Time:</span>
              <span className="text-emerald-400 font-mono font-bold tracking-wider">{time}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-zinc-500">Academics:</span>
              <span className="text-white">TUM Aerospace</span>
            </div>
          </div>
        </div>

        {/* Tier 3: Return to Top */}
        <div className="p-6 sm:p-8 space-y-3 flex flex-col justify-between">
          <div>
            <span className="text-zinc-500 uppercase tracking-widest block text-[11px]">
              Aerospace Engineering
            </span>
            <p className="text-zinc-400 font-light mt-1.5 text-[11px] leading-relaxed">
              Spacecraft systems, orbital dynamics, rocketry, and aerodynamic optimization.
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="flex items-center justify-between w-full text-zinc-400 hover:text-white transition-colors pt-4 border-t border-white/5 cursor-pointer"
          >
            <span>Return to Top</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>

      {/* Massive Editorial Monospace Name */}
      <div className="pt-12 sm:pt-16 pb-4 flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-4">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white/90">
          GREGORIO ZALTZMAN
        </h1>
        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
          Aerospace Engineer
        </span>
      </div>
    </footer>
  );
}