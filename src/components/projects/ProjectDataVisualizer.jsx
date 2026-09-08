import { Activity, ShieldCheck, Gauge, Layers, BarChart2, Compass } from "lucide-react";

export default function ProjectDataVisualizer({ project }) {
  const rf = project.reportFigures;

  if (!rf) return null;

  return (
    <div className="space-y-6 pt-2">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              Technical Dossier & Extracted Figures
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs text-zinc-400 font-mono">Formal Report Ground Truth</span>
          </div>
          <h4 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
            {project.title} — Empirical & Analytical Results
          </h4>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-zinc-300 shrink-0 self-start sm:self-auto font-mono">
          <Activity size={14} className="text-sky-400" />
          <span>Verified Engineering Data</span>
        </div>
      </div>

      {/* Render Specific Visualizer based on Project ID */}
      {project.id === "manta" && <MantaVisualizer rf={rf} />}
      {project.id === "citadel" && <CitadelVisualizer rf={rf} />}
      {project.id === "cfd-rocket" && <CfdRocketVisualizer rf={rf} />}
      {project.id === "wing-spar" && <WingSparVisualizer rf={rf} />}
      {project.id === "wind-tunnel" && <WindTunnelVisualizer rf={rf} />}
      {project.id === "orbit-det" && <OrbitDetVisualizer rf={rf} />}
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 1. BWB MANTA VISUALIZER                                                   */
/* ------------------------------------------------------------------------- */
function MantaVisualizer({ rf }) {
  const { dragPolar, massDistribution, stabilityModes } = rf;

  return (
    <div className="space-y-6">
      {/* Top Grid: Drag Polar Breakdown & Efficiency Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Drag Breakdown Card */}
        <div className="lg:col-span-7 p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Gauge size={16} className="text-sky-400 shrink-0" />
                <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
                  Transonic Cruise Drag Polar Breakdown
                </h5>
              </div>
              <span className="px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20 text-xs font-mono font-semibold text-sky-400 self-start sm:self-auto">
                Total CD = {dragPolar.cdTotal}
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Aerodynamic synthesis evaluated in MIT AVL and NASA OpenVSP at Mach 0.85 cruise conditions (h = 40,000 ft, CL = {dragPolar.clCruise}, α = {dragPolar.aoaCruise}).
            </p>
          </div>

          {/* Stacked Drag Bar */}
          <div className="space-y-3 pt-1">
            <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex p-0.5 border border-white/5">
              <div
                style={{ width: "60.5%" }}
                className="h-full bg-sky-400 rounded-l-full hover:brightness-110 transition-all cursor-pointer"
                title="Parasite Drag CD,0 (60.5%)"
              />
              <div
                style={{ width: "35.8%" }}
                className="h-full bg-indigo-400 hover:brightness-110 transition-all cursor-pointer"
                title="Induced Drag CD,i (35.8%)"
              />
              <div
                style={{ width: "3.7%" }}
                className="h-full bg-amber-400 rounded-r-full hover:brightness-110 transition-all cursor-pointer"
                title="Wave Drag CD,w (3.7%)"
              />
            </div>

            {/* Drag Legend Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                  <span className="font-mono">Parasite (CD,0)</span>
                </div>
                <div className="text-base font-bold font-mono text-white tracking-tight">
                  {dragPolar.cd0}
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">60.5% • Wetted Area</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-indigo-400 shrink-0" />
                  <span className="font-mono">Induced (CD,i)</span>
                </div>
                <div className="text-base font-bold font-mono text-white tracking-tight">
                  {dragPolar.cdi}
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">35.8% • Lift-Dependent</span>
              </div>

              <div className="p-3 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-1">
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="font-mono">Wave (CD,w)</span>
                </div>
                <div className="text-base font-bold font-mono text-white tracking-tight">
                  {dragPolar.cdw}
                </div>
                <span className="text-[11px] text-zinc-500 font-mono">3.7% • Transonic Shock</span>
              </div>
            </div>
          </div>

          {/* Aerodynamic Polar Curve Representation */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-zinc-400">Lift-Curve Slope (dCL / dα):</span>
            <span className="font-mono font-semibold text-white">{dragPolar.dCldAlpha}</span>
          </div>
        </div>

        {/* Efficiency Banner */}
        <div className="lg:col-span-5 p-5 sm:p-6 chamfer-card bg-sky-950/20 border border-sky-500/25 flex flex-col justify-between space-y-5">
          <div className="space-y-2">
            <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
              Converged Aerodynamic Efficiency
            </span>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-mono">
                {dragPolar.ldCruise}
              </span>
              <span className="text-sm text-sky-300 font-mono font-semibold">L/D Cruise</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed font-light pt-1">
              Particle Swarm Optimization (PySwarms, 40 particles, 25 iterations) converged the baseline L/D from 24.85 to 25.30 while satisfying ICAO Gate E wingspan envelope limits (b = 64.7 m &le; 65.0 m).
            </p>
          </div>

          <div className="space-y-2.5 pt-4 border-t border-sky-500/20 text-xs font-mono">
            <div className="flex justify-between items-center text-zinc-300">
              <span className="text-zinc-400">Cruise Lift Coeff (CL):</span>
              <span className="font-semibold text-white">{dragPolar.clCruise}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span className="text-zinc-400">Cruise Angle of Attack:</span>
              <span className="font-semibold text-white">{dragPolar.aoaCruise}</span>
            </div>
            <div className="flex justify-between items-center text-zinc-300">
              <span className="text-zinc-400">Longitudinal Static Margin:</span>
              <span className="font-semibold text-emerald-400">+7.8% MAC (Inherent Trim)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mass Distribution Section */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Maximum Takeoff Weight (MTOW) Allocation — 1,435,400 N
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">250 Passengers • 7,400 nmi Range</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {massDistribution.map((item) => (
            <div
              key={item.category}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-200 leading-snug">
                    {item.category}
                  </span>
                  <span className="font-mono font-bold text-white text-sm shrink-0">
                    {item.pct}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  className="h-full rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/5">
                <span>Weight:</span>
                <span className="font-semibold text-white">{item.massN.toLocaleString()} N</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dynamic Stability Modes Table */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Dynamic Stability Eigenvalues & Handling Quality Levels
            </h5>
          </div>
          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-xs font-mono font-semibold text-amber-400 self-start sm:self-auto">
            Motivates Active Fly-By-Wire
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Flight Dynamic Mode</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Eigenvalues (λ)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Damping Ratio (ζ / τ)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Doubling Time (T2)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">FAA / MIL Handling Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {stabilityModes.map((row) => {
                const isUnstable = row.damping.includes("Unstable");
                return (
                  <tr key={row.mode} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                      {row.mode}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">
                      {row.eigenvalues}
                    </td>
                    <td
                      className={`py-3.5 px-4 whitespace-nowrap ${
                        isUnstable ? "text-amber-400 font-bold" : "text-emerald-400 font-semibold"
                      }`}
                    >
                      {row.damping}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">
                      {row.timeDouble}
                    </td>
                    <td className="py-3.5 px-4 font-sans whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium ${
                          isUnstable
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                            : "bg-white/5 text-zinc-300 border border-white/10"
                        }`}
                      >
                        {row.level}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 2. RC AIRCRAFT CITADEL VISUALIZER                                         */
/* ------------------------------------------------------------------------- */
function CitadelVisualizer({ rf }) {
  const { massBudget, mdoStateVector, propulsionData } = rf;

  return (
    <div className="space-y-6">
      {/* Mass Budget & Payload Distribution */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Gross Takeoff Weight Allocation (2.04 kg / 20.02 N MTOW)
            </h5>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 self-start sm:self-auto">
            Load Factor Verified (+2.5g)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {massBudget.map((item) => (
            <div
              key={item.component}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-zinc-200 leading-snug">
                    {item.component}
                  </span>
                  <span className="font-mono font-bold text-white text-sm shrink-0">
                    {item.pct}%
                  </span>
                </div>
              </div>

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  style={{ width: `${item.pct}%`, backgroundColor: item.color }}
                  className="h-full rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/5">
                <span>Mass: {item.massKg} kg</span>
                <span className="font-semibold text-white">{(item.massKg * 9.81).toFixed(2)} N</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MDO Normalized Variable State Vector */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Gauge size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Gradient-Based MDO Optimal State Vector (JAX / modOpt / IPOPT)
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">9 Design Variables • 24 Active Constraints</span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Symbol</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Design Parameter</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Optimized Numerical Value</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Active Governing Constraint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {mdoStateVector.map((row) => (
                <tr key={row.var} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 text-sky-400 font-bold whitespace-nowrap">{row.var}</td>
                  <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    {row.name}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold whitespace-nowrap">
                    {row.optimal}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 font-sans whitespace-nowrap">
                    {row.constraint}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Propulsion Dynamometer Matching */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Propulsion System Matching: SunnySky X2216 V3 + APC Propellers
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">ESC Thermal Boundary: 35.0 A</span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[720px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Propeller</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Brushless Motor</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Static Thrust</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Cruise Current</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">ESC Ceiling</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Dynamometer Evaluation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {propulsionData.map((row) => {
                const isOptimal = row.status.includes("Optimal");
                const isOver = row.status.includes("Over");
                return (
                  <tr key={row.prop} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 text-white font-bold whitespace-nowrap">{row.prop}</td>
                    <td className="py-3.5 px-4 text-zinc-300 font-sans whitespace-nowrap">{row.motor}</td>
                    <td className="py-3.5 px-4 text-sky-300 font-semibold whitespace-nowrap">
                      {row.staticThrust}
                    </td>
                    <td
                      className={`py-3.5 px-4 font-bold whitespace-nowrap ${
                        isOver ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {row.cruiseCurrent}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">{row.escLimit}</td>
                    <td className="py-3.5 px-4 font-sans whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded text-[11px] font-medium ${
                          isOptimal
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/30"
                            : isOver
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                            : "bg-white/5 text-zinc-400 border border-white/10"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 3. WING SPAR STRUCTURAL VISUALIZER                                        */
/* ------------------------------------------------------------------------- */
function WingSparVisualizer({ rf }) {
  const { materialComparison, loadCaseMargins } = rf;

  return (
    <div className="space-y-6">
      {/* Material Comparison Banner */}
      <div className="p-5 sm:p-6 chamfer-card bg-sky-950/20 border border-sky-500/25 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="text-[11px] font-mono tracking-widest text-sky-400 uppercase font-semibold">
            Structural Optimization Summary
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 font-bold self-start sm:self-auto">
            -68.4% Structural Mass Reduction
          </span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
          Substituting standard aerospace Aluminum 7075-T6 with a modulus-weighted Carbon/Epoxy skin-stringer wingbox achieved a structural weight reduction of 68.4% while maintaining positive Margins of Safety across all critical FAA V-n diagram load conditions.
        </p>
      </div>

      {/* Material Properties Comparison Grid */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-sky-400 shrink-0" />
          <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Material Trade: Al 7075-T6 Baseline vs Optimized Carbon/Epoxy
          </h5>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Performance Metric</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Aluminum 7075-T6 Baseline</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Carbon/Epoxy Composite</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Net Structural Advantage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {materialComparison.map((row) => (
                <tr key={row.metric} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">{row.al7075}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-semibold whitespace-nowrap">
                    {row.carbonEpoxy}
                  </td>
                  <td className="py-3.5 px-4 text-sky-300 font-semibold whitespace-nowrap">
                    {row.delta}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Flight Load Cases & Margins of Safety */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Critical Flight Load Cases & Verified Margins of Safety (MS &gt; 0)
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">Classical Thin-Walled Beam Analysis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loadCaseMargins.map((item) => (
            <div
              key={item.case}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-3"
            >
              <div className="space-y-1">
                <div className="text-xs font-semibold text-white leading-snug">{item.case}</div>
              </div>

              <div className="space-y-1.5 text-xs text-zinc-400 font-mono">
                <div className="flex items-center justify-between">
                  <span>Load Factor:</span>
                  <span className="font-semibold text-white">{item.loadFactor}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Peak Stress:</span>
                  <span className="font-semibold text-white">{item.maxStressMPa}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400 font-mono">Margin of Safety:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-400">
                  {item.marginOfSafety}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 4. WIND TUNNEL EXPERIMENTAL VISUALIZER                                    */
/* ------------------------------------------------------------------------- */
function WindTunnelVisualizer({ rf }) {
  const { polarComparison, wakeSurveyRake, experimentalParameters } = rf;

  return (
    <div className="space-y-6">
      {/* Test Parameters Overview */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-sky-400 shrink-0" />
          <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Wind Tunnel Calibration & Test Matrix Overview
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Airfoil Specimen
            </span>
            <p className="text-zinc-200 font-medium text-sm">{experimentalParameters.airfoil}</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Test Velocities & Re Range
            </span>
            <p className="text-zinc-200 font-medium text-sm">{experimentalParameters.velocities}</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
              Data Acquisition Rake
            </span>
            <p className="text-zinc-200 font-medium text-sm">18-Port Downstream Rake + Strain Balance</p>
          </div>
        </div>
      </div>

      {/* Aerodynamic Coefficients Table */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <BarChart2 size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Lift (CL) & Drag (CD) Variation vs Angle of Attack (α)
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">Incompressible Reynolds Invariance Confirmed</span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Angle of Attack (α)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">CL (20 m/s)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">CL (35 m/s)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">CL (50 m/s)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Drag (CD,avg)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Pitching Moment (Cm,c/4)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {polarComparison.map((row) => {
                const isStall = row.alphaDeg.includes("Stall");
                return (
                  <tr key={row.alphaDeg} className="hover:bg-white/[0.03] transition-colors">
                    <td className="py-3.5 px-4 text-sky-400 font-bold whitespace-nowrap">
                      {row.alphaDeg}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">{row.cl_20ms.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-zinc-300 whitespace-nowrap">{row.cl_35ms.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-white font-semibold whitespace-nowrap">
                      {row.cl_50ms.toFixed(2)}
                    </td>
                    <td
                      className={`py-3.5 px-4 font-semibold whitespace-nowrap ${
                        isStall ? "text-amber-400" : "text-sky-300"
                      }`}
                    >
                      {row.cd.toFixed(4)}
                    </td>
                    <td className="py-3.5 px-4 text-zinc-400 whitespace-nowrap">{row.cmLE.toFixed(3)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Wake Survey Momentum Deficit */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              18-Port Wake Survey Rake Dynamic Pressure Deficit Profile (Δq / q∞)
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">Momentum Integral Form Drag</span>
        </div>

        <p className="text-xs text-zinc-400 leading-relaxed font-light">
          Downstream pitot-static rake samples the turbulent boundary layer momentum deficit behind the Clark Y-14 airfoil to compute form drag directly without tunnel boundary interference.
        </p>

        <div className="overflow-x-auto scrollbar-thin pt-2">
          <div className="grid grid-cols-7 gap-2 min-w-[550px]">
            {wakeSurveyRake.map((point) => (
              <div
                key={point.y_over_c}
                className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-center flex flex-col justify-between space-y-2"
              >
                <div className="text-[11px] font-mono font-semibold text-sky-400">
                  {(point.normDeficit * 100).toFixed(0)}%
                </div>
                <div className="h-24 bg-white/5 rounded-md relative flex flex-col justify-end p-1">
                  <div
                    style={{ height: `${Math.max(point.normDeficit * 100, 4)}%` }}
                    className="w-full bg-gradient-to-t from-sky-600 to-sky-400 rounded transition-all"
                  />
                </div>
                <div className="text-[11px] font-mono text-zinc-400">y/c: {point.y_over_c}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 5. QUICKSCAT LEO ORBIT DETERMINATION VISUALIZER                           */
/* ------------------------------------------------------------------------- */
function OrbitDetVisualizer({ rf }) {
  const { filterComparison, missionOrbit, stateElements } = rf;

  return (
    <div className="space-y-6">
      {/* Orbit Mission Architecture Card */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-sky-400 shrink-0" />
          <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Mission Architecture: {missionOrbit.satellite} ({missionOrbit.orbitType})
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Orbit Geometry</span>
            <p className="text-zinc-200 font-semibold text-sm">
              Alt: {missionOrbit.altitude} • Inc: {missionOrbit.inclination}
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Ground Tracking</span>
            <p className="text-zinc-200 font-semibold text-sm">{missionOrbit.trackingStations}</p>
          </div>
          <div className="p-3.5 rounded-lg bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Perturbative Forces</span>
            <p className="text-zinc-200 font-semibold text-sm">{missionOrbit.forceModel}</p>
          </div>
        </div>
      </div>

      {/* Filter Architecture Comparison */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Orbit Estimation Filter Performance: Batch Least-Squares vs Sequential EKF
            </h5>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-semibold text-emerald-400 self-start sm:self-auto">
            QuickSCAT Telemetry Validated
          </span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Estimation Metric</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Batch Weighted Least-Squares</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Sequential EKF (Joseph Form)</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Algorithmic Performance Note</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {filterComparison.map((row) => (
                <tr key={row.metric} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    {row.metric}
                  </td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold whitespace-nowrap">
                    {row.batchLeastSquares}
                  </td>
                  <td className="py-3.5 px-4 text-sky-300 font-semibold whitespace-nowrap">
                    {row.sequentialEKF}
                  </td>
                  <td className="py-3.5 px-4 font-sans text-zinc-300 whitespace-nowrap">
                    {row.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 18-State Vector Breakdown */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Linearized 18-Element Estimated State Vector Decomposition
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">Gravitational + Atmospheric Drag Forces</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateElements.map((elem) => (
            <div
              key={elem.parameter}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-2"
            >
              <div className="text-xs font-semibold text-white leading-snug">{elem.parameter}</div>
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 pt-1 border-t border-white/5">
                <span>Dimension: {elem.dimension}</span>
                <span className="text-emerald-400 font-bold">{elem.uncertainty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------- */
/* 6. CFD VORTEX-COOLED ROCKET ENGINE VISUALIZER                             */
/* ------------------------------------------------------------------------- */
function CfdRocketVisualizer({ rf }) {
  const { vortexThermalData, coolingEffectiveness } = rf;

  return (
    <div className="space-y-6">
      {/* Wall Temperature & Heat Flux Distribution */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Activity size={16} className="text-sky-400 shrink-0" />
            <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
              Vortex Boundary Layer Thermal Mapping Across Engine Stations
            </h5>
          </div>
          <span className="text-xs font-mono text-zinc-400">Project Maelstrom (Ansys Fluent CFD)</span>
        </div>

        <div className="overflow-x-auto scrollbar-thin">
          <table className="w-full text-left text-xs min-w-[750px]">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px]">
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Chamber Station</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Insulated Wall Temp</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Core Gas Temp</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Wall Heat Flux</th>
                <th className="py-3 px-4 font-normal uppercase tracking-wider">Fluid Flow Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {vortexThermalData.map((row) => (
                <tr key={row.station} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-4 font-sans font-medium text-white whitespace-nowrap">
                    {row.station}
                  </td>
                  <td className="py-3.5 px-4 text-sky-400 font-bold whitespace-nowrap">
                    {row.wallTempK} K
                  </td>
                  <td className="py-3.5 px-4 text-amber-400 font-bold whitespace-nowrap">
                    {row.coreTempK} K
                  </td>
                  <td className="py-3.5 px-4 text-zinc-200 font-semibold whitespace-nowrap">
                    {row.heatFluxMW} MW/m²
                  </td>
                  <td className="py-3.5 px-4 font-sans text-zinc-300 whitespace-nowrap">
                    {row.regime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Oxidizer Mass Flow Effectiveness */}
      <div className="p-5 sm:p-6 chamfer-card bg-white/[0.02] border border-white/10 space-y-4">
        <div className="flex items-center gap-2">
          <Gauge size={16} className="text-sky-400 shrink-0" />
          <h5 className="text-sm sm:text-base font-semibold text-white tracking-tight">
            Thermal Insulation Effectiveness vs Oxidizer Mass Flow (m_ox)
          </h5>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coolingEffectiveness.map((item) => (
            <div
              key={item.flowRate}
              className="p-4 rounded-lg bg-white/[0.02] border border-white/5 flex flex-col justify-between space-y-2"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                  Flow Condition
                </span>
                <div className="text-sm font-semibold text-white">{item.flowRate}</div>
              </div>
              <div className="text-sm font-mono font-bold text-sky-300">
                {item.wallTempReduction}
              </div>
              <div className="text-xs text-zinc-400 font-light pt-1 border-t border-white/5">
                {item.coreInsulation}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
