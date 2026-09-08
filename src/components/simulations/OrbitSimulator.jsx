import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, Compass, Globe } from "lucide-react";

const ORBIT_PRESETS = [
  { id: "quickscat", name: "QuickSCAT (Sun-Sync LEO)", hp: 803, ha: 803, inc: 98.6, desc: "MAE 182 Orbit Determination Baseline" },
  { id: "iss", name: "ISS (Low Circular)", hp: 420, ha: 420, inc: 51.6, desc: "Crewed Space Station Orbit" },
  { id: "starlink", name: "Mega-Constellation (LEO)", hp: 550, ha: 550, inc: 53.0, desc: "Commercial Broadband Incline" },
  { id: "elliptical", name: "High Eccentricity LEO", hp: 400, ha: 2200, inc: 63.4, desc: "Molniya-style Critical Incline" },
];

export default function OrbitSimulator() {
  const canvasRef = useRef(null);
  const [selectedPreset, setSelectedPreset] = useState(ORBIT_PRESETS[0]);
  const [hp, setHp] = useState(803); // Perigee altitude km
  const [ha, setHa] = useState(803); // Apogee altitude km
  const [inc, setInc] = useState(98.6); // Inclination degrees
  const [timeMultiplier, setTimeMultiplier] = useState(5);
  const [isPlaying, setIsPlaying] = useState(true);

  // Constants for Earth
  const RE = 6378.137; // Earth radius km
  const MU = 398600.4418; // Standard gravitational parameter km^3/s^2
  const J2 = 0.00108263;

  // Orbital Mechanics Calculations
  const rp = RE + hp;
  const ra = RE + ha;
  const a = (rp + ra) / 2; // Semi-major axis
  const e = Math.abs(ra - rp) / (ra + rp); // Eccentricity
  const p = a * (1 - e * e); // Semi-latus rectum
  const periodSeconds = 2 * Math.PI * Math.sqrt(Math.pow(a, 3) / MU);
  const periodMinutes = (periodSeconds / 60).toFixed(1);

  // Mean motion rad/s
  const n = Math.sqrt(MU / Math.pow(a, 3));

  // J2 Nodal Precession rate (deg/day)
  const incRad = (inc * Math.PI) / 180;
  const omegaDotRadPerSec = -1.5 * J2 * Math.pow(RE / p, 2) * n * Math.cos(incRad);
  const omegaDotDegPerDay = ((omegaDotRadPerSec * 180 / Math.PI) * 86400).toFixed(3);
  const isSunSync = Math.abs(parseFloat(omegaDotDegPerDay) - 0.9856) < 0.15;

  // Real-time animation ref for satellite true anomaly
  const stateRef = useRef({
    meanAnomaly: 0,
    lastTime: 0,
  });

  const [instantSpeed, setInstantSpeed] = useState("7.45");
  const [instantAlt, setInstantAlt] = useState("803");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width * 0.5;
    const centerY = height * 0.52;

    // Scale: map max orbit to fit within canvas
    const maxDimensionKm = Math.max(ra, 4000);
    const scale = (height * 0.38) / maxDimensionKm;

    const render = (time) => {
      const dt = stateRef.current.lastTime > 0 ? (time - stateRef.current.lastTime) / 1000 : 0.016;
      stateRef.current.lastTime = time;

      if (isPlaying) {
        stateRef.current.meanAnomaly += n * dt * timeMultiplier * 40;
        if (stateRef.current.meanAnomaly > Math.PI * 2) {
          stateRef.current.meanAnomaly -= Math.PI * 2;
        }
      }

      // Solve Kepler's Equation for Eccentric Anomaly E: M = E - e*sin(E)
      let M = stateRef.current.meanAnomaly;
      let E = M;
      for (let iter = 0; iter < 5; iter++) {
        E = E - (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
      }

      // True anomaly nu
      const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));

      // Instantaneous radius r
      const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
      const v = Math.sqrt(MU * (2 / r - 1 / a));
      const currentAltKm = (r - RE).toFixed(0);

      // Update state for UI display
      setInstantSpeed(v.toFixed(2));
      setInstantAlt(currentAltKm);

      // Clear Canvas
      ctx.fillStyle = "#04070e";
      ctx.fillRect(0, 0, width, height);

      // Draw Cosmic Grid Lines
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 1. Draw Earth Central Body
      const earthRadiusPx = RE * scale;

      // Atmospheric outer glow
      const atmoGrad = ctx.createRadialGradient(centerX, centerY, earthRadiusPx * 0.9, centerX, centerY, earthRadiusPx * 1.35);
      atmoGrad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
      atmoGrad.addColorStop(1, "rgba(56, 189, 248, 0)");
      ctx.fillStyle = atmoGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadiusPx * 1.35, 0, Math.PI * 2);
      ctx.fill();

      // Earth Sphere with Day/Night Shading
      const earthGrad = ctx.createRadialGradient(centerX - earthRadiusPx * 0.4, centerY - earthRadiusPx * 0.4, 2, centerX, centerY, earthRadiusPx);
      earthGrad.addColorStop(0, "#38bdf8");
      earthGrad.addColorStop(0.5, "#0284c7");
      earthGrad.addColorStop(0.85, "#0f172a");
      earthGrad.addColorStop(1, "#020617");
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, earthRadiusPx, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Earth Equator Line
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, earthRadiusPx, earthRadiusPx * 0.25, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Earth Polar Axis
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - earthRadiusPx * 1.3);
      ctx.lineTo(centerX, centerY + earthRadiusPx * 1.3);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Keplerian Orbit Ellipse
      // Tilt orbit based on inclination (projected 2D angle)
      const visualIncAngle = (inc * Math.PI) / 180;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(-visualIncAngle * 0.4); // Projection tilt

      // Semi-major axis in pixels
      const aPx = a * scale;
      const bPx = a * Math.sqrt(1 - e * e) * scale;
      const cPx = a * e * scale; // Focal distance from center to Earth focus

      // Ellipse center is shifted from Earth focus by cPx
      ctx.strokeStyle = isSunSync ? "rgba(56, 189, 248, 0.7)" : "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.ellipse(-cPx, 0, aPx, bPx, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Line of Apsides
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.setLineDash([2, 4]);
      ctx.beginPath();
      ctx.moveTo(-cPx - aPx - 10, 0);
      ctx.lineTo(-cPx + aPx + 10, 0);
      ctx.stroke();
      ctx.setLineDash([]);

      // Perigee Marker
      const perigeeX = -cPx + aPx;
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(perigeeX, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // Apogee Marker
      const apogeeX = -cPx - aPx;
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(apogeeX, 0, 3, 0, Math.PI * 2);
      ctx.fill();

      // 3. Draw Satellite Position along Orbit
      // Satellite position relative to Earth focus (0, 0)
      const satDistPx = r * scale;
      const satX = satDistPx * Math.cos(nu);
      const satY = satDistPx * Math.sin(nu);

      // Satellite Orbital Trail (Fade)
      ctx.beginPath();
      ctx.arc(satX, satY, 12, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(56, 189, 248, 0.15)";
      ctx.fill();

      // Velocity Vector (tangent to orbit)
      const gamma = Math.atan2(e * Math.sin(nu), 1 + e * Math.cos(nu)); // Flight path angle
      const velAngle = nu + Math.PI / 2 - gamma;
      const velVectorLen = Math.min(v * 4.5, 45);

      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(satX, satY);
      ctx.lineTo(satX + velVectorLen * Math.cos(velAngle), satY + velVectorLen * Math.sin(velAngle));
      ctx.stroke();

      // Satellite Hardware Icon (Core + Solar Panels)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(satX - 3.5, satY - 3.5, 7, 7);
      // Left Solar Array
      ctx.fillStyle = "#38bdf8";
      ctx.fillRect(satX - 10, satY - 2, 5, 4);
      // Right Solar Array
      ctx.fillRect(satX + 5, satY - 2, 5, 4);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [hp, ha, inc, isPlaying, timeMultiplier, a, e, n, ra, rp, isSunSync]);

  return (
    <div className="space-y-6">
      {/* Orbital Mechanics Interactive Canvas Stage */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#02050b] rounded-lg border border-white/10 overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={760}
          height={380}
          className="w-full h-full object-cover select-none"
        />

        {/* Live HUD Overlays on Canvas */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="text-zinc-500 mr-1.5">MISSION:</span>
            <span className="text-sky-300 font-semibold">{selectedPreset.name.split(" ")[0]}</span>
          </div>
          <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="text-zinc-500 mr-1.5">ALT:</span>
            <span className="text-white font-semibold">{instantAlt} km</span>
          </div>
          <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="text-zinc-500 mr-1.5">INCLINATION:</span>
            <span className="text-sky-400 font-semibold">{inc.toFixed(1)}°</span>
          </div>
        </div>

        {/* Sun-Synchronous Status Indicator */}
        {isSunSync && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-sky-950/80 border border-sky-400/70 rounded flex items-center gap-1.5 text-xs font-mono text-sky-200 pointer-events-none">
            <Globe size={13} className="text-sky-400 animate-spin" />
            <span>SUN-SYNCHRONOUS MATCH (0.986°/day)</span>
          </div>
        )}

        {/* Velocity Telemetry Readout */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300 pointer-events-none">
          <span className="text-zinc-500">ORBITAL VELOCITY:</span>
          <span className="text-white font-semibold font-mono">{instantSpeed} km/s</span>
          <span className="text-zinc-500">({(parseFloat(instantSpeed) * 3600).toFixed(0)} km/h)</span>
        </div>

        {/* Markers Legend */}
        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono pointer-events-none">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" /> Perigee (r_p)
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Apogee (r_a)
          </span>
        </div>
      </div>

      {/* Orbital Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Semi-Major Axis (a)
          </span>
          <div className="text-lg font-semibold text-white font-mono">
            {a.toFixed(1)} <span className="text-xs text-zinc-500 font-normal">km</span>
          </div>
          <span className="text-[10px] text-zinc-500">
            Perigee {hp} km | Apogee {ha} km
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Eccentricity (e)
          </span>
          <div className="text-lg font-semibold text-sky-400 font-mono">
            {e.toFixed(4)}
          </div>
          <span className="text-[10px] text-zinc-500">
            {e < 0.01 ? "Near-Circular" : "Elliptical"} LEO
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Orbital Period (T)
          </span>
          <div className="text-lg font-semibold text-white font-mono">
            {periodMinutes} <span className="text-xs text-zinc-500 font-normal">min</span>
          </div>
          <span className="text-[10px] text-zinc-500">
            {(1440 / parseFloat(periodMinutes)).toFixed(1)} revs / day
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            J2 Nodal Drift (dΩ/dt)
          </span>
          <div className="text-lg font-semibold text-emerald-400 font-mono">
            {omegaDotDegPerDay}° <span className="text-xs text-zinc-500 font-normal">/ day</span>
          </div>
          <span className="text-[10px] text-zinc-500">
            {isSunSync ? "Precession = Earth orbit" : "Oblateness drift"}
          </span>
        </div>
      </div>

      {/* Control Station (Sliders & Preset Selector) */}
      <div className="p-5 chamfer-box bg-white/[0.02] border border-white/10 space-y-5">
        {/* Preset Mission Orbits */}
        <div>
          <label className="text-xs font-semibold text-white block mb-2">
            Mission Orbit Presets
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ORBIT_PRESETS.map((orb) => (
              <button
                key={orb.id}
                onClick={() => {
                  setSelectedPreset(orb);
                  setHp(orb.hp);
                  setHa(orb.ha);
                  setInc(orb.inc);
                }}
                className={`px-3 py-2 text-left rounded border text-xs transition-all cursor-pointer ${
                  selectedPreset.id === orb.id
                    ? "bg-sky-500/20 border-sky-400 text-white font-medium shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="font-medium truncate">{orb.name.split(" ")[0]}</div>
                <div className="text-[10px] text-zinc-500 truncate">{orb.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
          {/* Perigee Altitude Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">Perigee Altitude (h_p)</span>
              <span className="font-mono text-emerald-400 font-semibold">{hp} km</span>
            </div>
            <input
              type="range"
              min="300"
              max="1500"
              step="25"
              value={hp}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setHp(val);
                if (ha < val) setHa(val);
              }}
              className="w-full accent-emerald-400 cursor-pointer bg-zinc-800"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>300 km (LEO limit)</span>
              <span>1500 km</span>
            </div>
          </div>

          {/* Apogee Altitude Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">Apogee Altitude (h_a)</span>
              <span className="font-mono text-amber-400 font-semibold">{ha} km</span>
            </div>
            <input
              type="range"
              min="300"
              max="2500"
              step="50"
              value={ha}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                setHa(val);
                if (hp > val) setHp(val);
              }}
              className="w-full accent-amber-400 cursor-pointer bg-zinc-800"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>300 km</span>
              <span>2500 km (Elliptical)</span>
            </div>
          </div>

          {/* Inclination Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">Inclination (i)</span>
              <span className="font-mono text-sky-400 font-semibold">{inc.toFixed(1)}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="110"
              step="0.5"
              value={inc}
              onChange={(e) => setInc(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer bg-zinc-800"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>0° (Equatorial)</span>
              <span>51.6° (ISS)</span>
              <span>98.6° (Sun-Sync)</span>
            </div>
          </div>
        </div>

        {/* Simulation Execution Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs text-white font-medium transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause Propagator" : "Propagate Orbit"}</span>
            </button>

            <button
              onClick={() => {
                setHp(803);
                setHa(803);
                setInc(98.6);
                setSelectedPreset(ORBIT_PRESETS[0]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Nominal</span>
            </button>
          </div>

          {/* Time Warp Multiplier Buttons */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-zinc-500 mr-1.5 flex items-center gap-1">
              <Compass size={13} /> Time Warp:
            </span>
            {[1, 5, 20].map((warp) => (
              <button
                key={warp}
                onClick={() => setTimeMultiplier(warp)}
                className={`px-2 py-1 rounded font-mono text-[11px] cursor-pointer transition-colors ${
                  timeMultiplier === warp
                    ? "bg-sky-500 text-white font-semibold"
                    : "bg-white/5 text-zinc-400 hover:text-white"
                }`}
              >
                {warp}×
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
