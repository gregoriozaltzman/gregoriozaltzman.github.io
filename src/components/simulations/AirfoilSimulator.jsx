import { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, AlertTriangle, Wind } from "lucide-react";

const AIRFOIL_PRESETS = [
  { id: "clark-y", name: "Clark Y-14 (Wind Tunnel)", camber: 0.035, maxCamberPos: 0.35, thickness: 0.14, alpha0: -3.5 },
  { id: "naca-2412", name: "NACA 2412 (General Aviation)", camber: 0.02, maxCamberPos: 0.4, thickness: 0.12, alpha0: -2.0 },
  { id: "s1223", name: "Selig S1223 (High-Lift RC)", camber: 0.08, maxCamberPos: 0.5, thickness: 0.12, alpha0: -6.0 },
  { id: "naca-0012", name: "NACA 0012 (Symmetric)", camber: 0.0, maxCamberPos: 0.0, thickness: 0.12, alpha0: 0.0 },
];

export default function AirfoilSimulator() {
  const canvasRef = useRef(null);
  const [selectedAirfoil, setSelectedAirfoil] = useState(AIRFOIL_PRESETS[0]);
  const [alpha, setAlpha] = useState(4.0); // Angle of attack in degrees
  const [velocity, setVelocity] = useState(30); // Freestream velocity m/s
  const [isPlaying, setIsPlaying] = useState(true);
  const [showVectors, setShowVectors] = useState(true);

  // Physics calculation values
  const rho = 1.225; // kg/m^3 air density at sea level
  const chord = 1.0; // 1 meter chord reference
  const dynamicPressure = 0.5 * rho * velocity * velocity; // Pa

  // Effective lift and drag coefficients with realistic stall post-critical angle
  const stallAngle = 14.5;
  const isStalled = Math.abs(alpha) >= stallAngle;

  // Thin-airfoil & empirical stall model
  const effectiveAlpha = alpha - selectedAirfoil.alpha0;
  const radAlpha = (effectiveAlpha * Math.PI) / 180;
  
  let cl = 2 * Math.PI * radAlpha;
  if (alpha > stallAngle) {
    const stallDrop = (alpha - stallAngle) * 0.12;
    cl = Math.max(0.4, 2 * Math.PI * ((stallAngle - selectedAirfoil.alpha0) * Math.PI / 180) - stallDrop);
  } else if (alpha < -stallAngle) {
    cl = Math.min(-0.3, -1.2);
  }
  // Drag polar: Cd = Cd0 + k * Cl^2
  const cd0 = 0.008 + selectedAirfoil.thickness * 0.03;
  const inducedK = 0.045;
  const stallDrag = isStalled ? Math.pow((Math.abs(alpha) - stallAngle) * 0.08, 1.8) : 0;
  const cd = Math.max(0.009, cd0 + inducedK * (cl * cl) + stallDrag);
  const liftToDrag = cd > 0 ? (cl / cd).toFixed(1) : "0.0";
  const liftForce = (cl * dynamicPressure * chord).toFixed(0);
  const dragForce = (cd * dynamicPressure * chord).toFixed(0);

  // Canvas particle streamline simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width * 0.45;
    const centerY = height * 0.52;
    const chordPx = width * 0.38;

    // Generate stream particles
    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 1.5 + Math.random() * 1.5,
      size: 1 + Math.random() * 1.5,
      alpha: 0.3 + Math.random() * 0.5,
    }));

    const render = () => {
      // Semi-transparent clearing for motion blur trails
      ctx.fillStyle = "rgba(4, 7, 13, 0.28)";
      ctx.fillRect(0, 0, width, height);

      // Rotate airfoil coordinate frame based on alpha
      const rad = (-alpha * Math.PI) / 180;

      // 1. Draw Streamline Particles
      particles.forEach((p) => {
        if (isPlaying) {
          const streamSpeed = (velocity / 25) * p.speed;
          p.x += streamSpeed;
          if (p.x > width) {
            p.x = 0;
            p.y = Math.random() * height;
          }

          // Flow deflection around airfoil
          const dx = p.x - centerX;
          const dy = p.y - centerY;
          const distToAirfoil = Math.sqrt(dx * dx + dy * dy);

          // Bound circulation deflection
          if (distToAirfoil < chordPx * 0.9) {
            const flowDeflection = Math.sin(rad) * (chordPx / Math.max(distToAirfoil, 30)) * 1.6;
            p.y += flowDeflection;

            // Stall separation wake turbulence
            if (isStalled && dx > 0) {
              p.y += (Math.random() - 0.5) * (Math.abs(alpha) - stallAngle) * 1.2;
            }
          }
        }

        // Draw particle with speed-based color
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        if (isStalled && p.x > centerX && Math.abs(p.y - centerY) < 40) {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.alpha * 0.8})`; // Red stall separation wake
        } else {
          ctx.fillStyle = `rgba(56, 189, 248, ${p.alpha * 0.7})`; // Sky-blue laminar stream
        }
        ctx.fill();
      });

      // 2. Draw Airfoil Section
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rad);

      // Parametric NACA 4-digit / Cambered airfoil profile
      ctx.beginPath();
      const numPoints = 80;
      const pts = [];

      // Upper surface
      for (let i = 0; i <= numPoints; i++) {
        const xNorm = i / numPoints; // 0 to 1
        const yt =
          5 *
          selectedAirfoil.thickness *
          (0.2969 * Math.sqrt(Math.max(xNorm, 0)) -
            0.126 * xNorm -
            0.3516 * Math.pow(xNorm, 2) +
            0.2843 * Math.pow(xNorm, 3) -
            0.1015 * Math.pow(xNorm, 4));

        let yc = 0;
        const m = selectedAirfoil.camber;
        const p = selectedAirfoil.maxCamberPos;
        if (p > 0) {
          yc =
            xNorm < p
              ? (m / (p * p)) * (2 * p * xNorm - xNorm * xNorm)
              : (m / Math.pow(1 - p, 2)) * (1 - 2 * p + 2 * p * xNorm - xNorm * xNorm);
        }

        const px = (xNorm - 0.3) * chordPx;
        const py = -(yc + yt) * chordPx;
        pts.push({ x: px, y: py });
      }

      // Lower surface
      for (let i = numPoints; i >= 0; i--) {
        const xNorm = i / numPoints;
        const yt =
          5 *
          selectedAirfoil.thickness *
          (0.2969 * Math.sqrt(Math.max(xNorm, 0)) -
            0.126 * xNorm -
            0.3516 * Math.pow(xNorm, 2) +
            0.2843 * Math.pow(xNorm, 3) -
            0.1015 * Math.pow(xNorm, 4));

        let yc = 0;
        const m = selectedAirfoil.camber;
        const p = selectedAirfoil.maxCamberPos;
        if (p > 0) {
          yc =
            xNorm < p
              ? (m / (p * p)) * (2 * p * xNorm - xNorm * xNorm)
              : (m / Math.pow(1 - p, 2)) * (1 - 2 * p + 2 * p * xNorm - xNorm * xNorm);
        }

        const px = (xNorm - 0.3) * chordPx;
        const py = -(yc - yt) * chordPx;
        pts.push({ x: px, y: py });
      }

      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach((pt) => ctx.lineTo(pt.x, pt.y));
      ctx.closePath();

      // Airfoil skin styling
      const grad = ctx.createLinearGradient(-0.3 * chordPx, -40, 0.7 * chordPx, 40);
      grad.addColorStop(0, "#38bdf8");
      grad.addColorStop(0.3, "#1e293b");
      grad.addColorStop(1, "#0f172a");
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = isStalled ? "#ef4444" : "#e2e8f0";
      ctx.stroke();

      // Quarter-chord aerodynamic center marker
      ctx.beginPath();
      ctx.arc((-0.3 + 0.25) * chordPx, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();

      // 3. Draw Aerodynamic Vectors (Lift & Drag)
      if (showVectors) {
        // Lift vector (perpendicular to freestream, pointing up)
        const liftLen = Math.min(Math.max(cl * 65, -60), 120);
        ctx.beginPath();
        ctx.moveTo((-0.3 + 0.25) * chordPx, 0);
        ctx.lineTo((-0.3 + 0.25) * chordPx, -liftLen);
        ctx.strokeStyle = isStalled ? "#ef4444" : "#10b981";
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Arrowhead
        ctx.beginPath();
        ctx.fillStyle = isStalled ? "#ef4444" : "#10b981";
        const arrY = -liftLen;
        const arrX = (-0.3 + 0.25) * chordPx;
        ctx.moveTo(arrX, arrY);
        ctx.lineTo(arrX - 4, arrY + 7 * Math.sign(liftLen || 1));
        ctx.lineTo(arrX + 4, arrY + 7 * Math.sign(liftLen || 1));
        ctx.fill();

        // Drag vector (aligned with freestream, pointing back)
        const dragLen = Math.min(cd * 300, 90);
        ctx.beginPath();
        ctx.moveTo((-0.3 + 0.25) * chordPx, 0);
        ctx.lineTo((-0.3 + 0.25) * chordPx + dragLen, 0);
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedAirfoil, alpha, velocity, isPlaying, showVectors, cl, cd, isStalled]);

  return (
    <div className="space-y-6">
      {/* Simulation Interactive Canvas Stage */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-[#03060c] rounded-lg border border-white/10 overflow-hidden shadow-inner">
        <canvas
          ref={canvasRef}
          width={760}
          height={380}
          className="w-full h-full object-cover select-none"
        />

        {/* Live HUD Overlays on Canvas */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none">
          <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="text-zinc-500 mr-1.5">PROFILE:</span>
            <span className="text-sky-300 font-semibold">{selectedAirfoil.name}</span>
          </div>
          <div className="px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-300">
            <span className="text-zinc-500 mr-1.5">AoA (α):</span>
            <span className="text-white font-semibold">{alpha.toFixed(1)}°</span>
          </div>
        </div>

        {/* Stall Warning Banner */}
        {isStalled && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-red-950/80 border border-red-500/80 rounded flex items-center gap-1.5 text-xs font-mono text-red-200 animate-pulse pointer-events-none">
            <AlertTriangle size={14} className="text-red-400" />
            <span>FLOW SEPARATION / STALL</span>
          </div>
        )}

        {/* Freestream Wind Vector Indicator */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[11px] font-mono text-zinc-400 pointer-events-none">
          <Wind size={13} className="text-sky-400 animate-pulse" />
          <span>V∞ = {velocity} m/s ({((velocity * 3.6).toFixed(0))} km/h)</span>
        </div>

        {/* Vectors Legend */}
        <div className="absolute bottom-3 right-3 hidden sm:flex items-center gap-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded border border-white/10 text-[10px] font-mono pointer-events-none">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-2 h-0.5 bg-emerald-400 inline-block" /> Lift (L)
          </span>
          <span className="flex items-center gap-1 text-amber-400">
            <span className="w-2 h-0.5 bg-amber-400 inline-block" /> Drag (D)
          </span>
        </div>
      </div>

      {/* Physics Telemetry Output Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Lift Coeff (C_L)
          </span>
          <div className="text-lg font-semibold text-white font-mono">
            {cl.toFixed(3)}
          </div>
          <span className="text-[10px] text-zinc-500">
            Lift Force: {liftForce} N/m
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Drag Coeff (C_D)
          </span>
          <div className="text-lg font-semibold text-amber-300 font-mono">
            {cd.toFixed(4)}
          </div>
          <span className="text-[10px] text-zinc-500">
            Induced + Profile: {dragForce} N/m
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Efficiency (L / D)
          </span>
          <div className={`text-lg font-semibold font-mono ${parseFloat(liftToDrag) > 15 ? "text-emerald-400" : "text-sky-300"}`}>
            {liftToDrag}
          </div>
          <span className="text-[10px] text-zinc-500">
            Glide Ratio
          </span>
        </div>

        <div className="p-3.5 chamfer-card bg-white/[0.02] border border-white/10">
          <span className="text-[10px] font-mono tracking-wider text-zinc-500 uppercase block mb-1">
            Dyn Pressure (q)
          </span>
          <div className="text-lg font-semibold text-zinc-200 font-mono">
            {dynamicPressure.toFixed(0)} <span className="text-xs text-zinc-500 font-normal">Pa</span>
          </div>
          <span className="text-[10px] text-zinc-500">
            Re ≈ {((velocity * chord) / 1.5e-5 / 1000).toFixed(0)}k
          </span>
        </div>
      </div>

      {/* Control Station (Sliders & Preset Selector) */}
      <div className="p-5 chamfer-box bg-white/[0.02] border border-white/10 space-y-5">
        {/* Airfoil Profile Selector */}
        <div>
          <label className="text-xs font-semibold text-white block mb-2">
            Airfoil Geometry Selection
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AIRFOIL_PRESETS.map((foil) => (
              <button
                key={foil.id}
                onClick={() => setSelectedAirfoil(foil)}
                className={`px-3 py-2 text-left rounded border text-xs transition-all cursor-pointer ${
                  selectedAirfoil.id === foil.id
                    ? "bg-sky-500/20 border-sky-400 text-white font-medium shadow-[0_0_12px_rgba(56,189,248,0.2)]"
                    : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                }`}
              >
                <div className="font-medium truncate">{foil.name.split(" ")[0]}</div>
                <div className="text-[10px] text-zinc-500 truncate">{foil.name.split(" ").slice(1).join(" ")}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
          {/* Angle of Attack Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">Angle of Attack (α)</span>
              <span className="font-mono text-sky-400 font-semibold">{alpha.toFixed(1)}°</span>
            </div>
            <input
              type="range"
              min="-6"
              max="20"
              step="0.5"
              value={alpha}
              onChange={(e) => setAlpha(parseFloat(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer bg-zinc-800"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>-6° (Negative)</span>
              <span>0° (Level)</span>
              <span>+14° (Stall Limit)</span>
              <span>+20°</span>
            </div>
          </div>

          {/* Freestream Airspeed Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-300 font-medium">Freestream Airspeed (V∞)</span>
              <span className="font-mono text-sky-400 font-semibold">{velocity} m/s</span>
            </div>
            <input
              type="range"
              min="10"
              max="60"
              step="2"
              value={velocity}
              onChange={(e) => setVelocity(parseInt(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer bg-zinc-800"
            />
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>10 m/s (Low Speed)</span>
              <span>30 m/s (Cruise)</span>
              <span>60 m/s (High Speed)</span>
            </div>
          </div>
        </div>

        {/* Simulation Execution Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded text-xs text-white font-medium transition-colors cursor-pointer"
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
              <span>{isPlaying ? "Pause Flow" : "Resume Flow"}</span>
            </button>

            <button
              onClick={() => {
                setAlpha(4.0);
                setVelocity(30);
                setSelectedAirfoil(AIRFOIL_PRESETS[0]);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] hover:bg-white/10 border border-white/10 rounded text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <RotateCcw size={13} />
              <span>Reset Nominal</span>
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-zinc-400 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={showVectors}
              onChange={(e) => setShowVectors(e.target.checked)}
              className="accent-sky-400 rounded cursor-pointer"
            />
            <span>Show Force Vectors</span>
          </label>
        </div>
      </div>
    </div>
  );
}
