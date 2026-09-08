import { useState } from "react";
import { Wind, Orbit, Activity } from "lucide-react";
import AirfoilSimulator from "./AirfoilSimulator";
import OrbitSimulator from "./OrbitSimulator";

export default function FlightDeck() {
  const [activeLab, setActiveLab] = useState("airfoil");

  return (
    <section id="simulations" className="space-y-8 scroll-mt-24">
      {/* Section Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-medium block">
            Interactive Sim Lab
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
          <div>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-[-0.04em] text-white">
              Aerospace Simulation Lab
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-xl font-light">
              Interactive numerical solvers for 2D aerodynamic flow-field circulation and low Earth orbit (LEO) Keplerian propagation.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <Activity size={14} className="text-sky-400" />
            <span>Real-Time Numerical Engine</span>
          </div>
        </div>
      </div>

      {/* Lab Switcher Controls */}
      <div className="flex items-center gap-2 p-1.5 bg-white/[0.03] border border-white/10 rounded-lg max-w-md">
        <button
          onClick={() => setActiveLab("airfoil")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded text-xs font-medium transition-all cursor-pointer ${
            activeLab === "airfoil"
              ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Wind size={14} className={activeLab === "airfoil" ? "text-sky-600" : ""} />
          <span>Airfoil Aerodynamics</span>
        </button>

        <button
          onClick={() => setActiveLab("orbit")}
          className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded text-xs font-medium transition-all cursor-pointer ${
            activeLab === "orbit"
              ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.15)]"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          <Orbit size={14} className={activeLab === "orbit" ? "text-sky-600" : ""} />
          <span>LEO Orbit Propagator</span>
        </button>
      </div>

      {/* Render Active Lab */}
      <div>
        {activeLab === "airfoil" ? <AirfoilSimulator /> : <OrbitSimulator />}
      </div>
    </section>
  );
}
