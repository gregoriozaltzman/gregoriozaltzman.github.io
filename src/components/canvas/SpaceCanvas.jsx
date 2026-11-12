import { useEffect, useRef } from "react";

export default function SpaceCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let isTabVisible = true;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // 1. High-Density Starfield (950+ Pinpoint Stars across depth layers)
    class Star {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.baseY = Math.random() * (height * 2.2);
        const roll = Math.random();
        if (roll < 0.8) {
          this.size = Math.random() * 0.7 + 0.3; // 0.3 - 1.0px
          this.baseAlpha = Math.random() * 0.5 + 0.25;
        } else if (roll < 0.95) {
          this.size = Math.random() * 0.9 + 1.0; // 1.0 - 1.9px
          this.baseAlpha = Math.random() * 0.4 + 0.5;
        } else {
          this.size = Math.random() * 0.9 + 2.0; // 2.0 - 2.9px
          this.baseAlpha = Math.random() * 0.25 + 0.75;
          this.hasDiffraction = true;
        }

        this.alpha = this.baseAlpha;
        this.twinkleSpeed = Math.random() * 0.025 + 0.008;
        this.twinklePhase = Math.random() * Math.PI * 2;
        this.parallax = Math.random() * 0.16 + 0.03;

        // Astronomical Spectral Classes (Cool White & Ice-Blue)
        const spectralRoll = Math.random();
        if (spectralRoll < 0.65) this.rgb = "255, 255, 255";       // Pure White
        else if (spectralRoll < 0.85) this.rgb = "220, 238, 255";  // Class B Ice-Blue
        else this.rgb = "240, 245, 255";                           // Cool Silver
      }

      update() {
        this.alpha = this.baseAlpha + Math.sin(Date.now() * this.twinkleSpeed + this.twinklePhase) * 0.2;
        this.alpha = Math.max(0.12, Math.min(1.0, this.alpha));
      }

      draw() {
        const y = (this.baseY - scrollY * this.parallax) % (height * 2.2);
        if (y < -20 || y > height + 20) return;

        ctx.fillStyle = `rgba(${this.rgb}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // 4-point cross diffraction spike for bright anchor stars
        if (this.hasDiffraction && this.alpha > 0.65) {
          ctx.strokeStyle = `rgba(${this.rgb}, ${this.alpha * 0.35})`;
          ctx.lineWidth = 0.6;
          const spikeLen = this.size * 3.2;
          ctx.beginPath();
          ctx.moveTo(this.x - spikeLen, y);
          ctx.lineTo(this.x + spikeLen, y);
          ctx.moveTo(this.x, y - spikeLen);
          ctx.lineTo(this.x + spikeLen, y);
          ctx.stroke();
        }
      }
    }

    // 2. Visible, Beautiful Astronomical Interstellar Nebulae (Organic Multi-Lobe Clouds)
    // Modeled after authentic Hubble & JWST emission/reflection nebulae (H-alpha, O-III, Cosmic Dust)
    const nebulaClouds = [
      // Nebula 1: Large Cosmic Violet & Ionized Hydrogen Cloud (Upper Right field)
      {
        cx: 0.76,
        cy: 0.32,
        r: 380,
        parallax: 0.035,
        lobes: [
          { dx: 0, dy: 0, r: 340, color: "rgba(95, 35, 135, 0.22)" },      // Core emission violet
          { dx: -70, dy: 50, r: 260, color: "rgba(65, 30, 110, 0.16)" },   // Secondary lobe
          { dx: 80, dy: -40, r: 220, color: "rgba(125, 45, 115, 0.14)" },  // Hydrogen-alpha rose
          { dx: 40, dy: 70, r: 180, color: "rgba(35, 75, 120, 0.15)" },    // Oxygen III teal rim
        ],
      },
      // Nebula 2: Deep Interstellar Oxygen-III Teal Cloud (Mid-Left field, behind hero/projects)
      {
        cx: 0.2,
        cy: 0.85,
        r: 360,
        parallax: 0.045,
        lobes: [
          { dx: 0, dy: 0, r: 320, color: "rgba(20, 95, 125, 0.2)" },       // Core O-III teal
          { dx: 60, dy: -50, r: 240, color: "rgba(15, 65, 105, 0.16)" },   // Cyan-blue cloud
          { dx: -50, dy: 40, r: 210, color: "rgba(45, 40, 95, 0.14)" },    // Deep indigo boundary
          { dx: 70, dy: 60, r: 170, color: "rgba(30, 110, 135, 0.12)" },   // Faint ionization veil
        ],
      },
      // Nebula 3: Ethereal Cosmic Dust & Deep Violet Cloud (Lower-Right field)
      {
        cx: 0.72,
        cy: 1.55,
        r: 390,
        parallax: 0.04,
        lobes: [
          { dx: 0, dy: 0, r: 350, color: "rgba(80, 35, 110, 0.19)" },      // Deep cosmic dust
          { dx: -80, dy: -40, r: 250, color: "rgba(110, 45, 95, 0.15)" },  // Emission rose
          { dx: 50, dy: 60, r: 220, color: "rgba(25, 75, 110, 0.14)" },    // Interstellar teal
        ],
      },
      // Nebula 4: Delicate Deep Space Reflection Veil (Lower-Left field)
      {
        cx: 0.28,
        cy: 1.95,
        r: 330,
        parallax: 0.038,
        lobes: [
          { dx: 0, dy: 0, r: 300, color: "rgba(35, 70, 115, 0.18)" },      // Reflection blue
          { dx: 40, dy: -30, r: 210, color: "rgba(75, 40, 100, 0.13)" },   // Violet rim
        ],
      },
    ];

    const drawVisibleNebulae = () => {
      ctx.save();
      // Using 'screen' blend mode allows gaseous nebula lobes to combine naturally with luminous depth
      ctx.globalCompositeOperation = "screen";

      for (const cloud of nebulaClouds) {
        const baseX = width * cloud.cx;
        const baseY = (height * cloud.cy - scrollY * cloud.parallax) % (height * 2.2);

        for (const lobe of cloud.lobes) {
          const x = baseX + lobe.dx;
          const y = baseY + lobe.dy;
          const r = lobe.r * (width < 768 ? 0.7 : 1.0);

          if (y < -r || y > height + r) continue;

          const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
          grad.addColorStop(0, lobe.color);
          grad.addColorStop(0.35, lobe.color.replace(/[\d\.]+\)$/, "0.08)"));
          grad.addColorStop(0.7, lobe.color.replace(/[\d\.]+\)$/, "0.02)"));
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
    };

    // 3. Astronomical Constellations with Connecting Faint White Lines
    const constellations = [
      // Constellation 1: Cygnus / Northern Cross (Upper-left sky)
      {
        parallax: 0.05,
        nodes: [
          { rx: 0.16, ry: 0.18, size: 2.2 }, // Deneb
          { rx: 0.19, ry: 0.24, size: 1.6 }, // Sadr
          { rx: 0.22, ry: 0.31, size: 1.8 }, // Albireo
          { rx: 0.13, ry: 0.22, size: 1.5 }, // Gienah
          { rx: 0.25, ry: 0.26, size: 1.5 }, // Delta Cygni
        ],
        edges: [
          [0, 1],
          [1, 2],
          [3, 1],
          [1, 4],
        ],
      },
      // Constellation 2: Cassiopeia (Mid-right sky)
      {
        parallax: 0.06,
        nodes: [
          { rx: 0.82, ry: 0.38, size: 1.7 }, // Segin
          { rx: 0.85, ry: 0.42, size: 1.9 }, // Ruchbah
          { rx: 0.83, ry: 0.47, size: 2.1 }, // Gamma Cas
          { rx: 0.88, ry: 0.51, size: 2.0 }, // Schedar
          { rx: 0.86, ry: 0.56, size: 1.8 }, // Caph
        ],
        edges: [
          [0, 1],
          [1, 2],
          [2, 3],
          [3, 4],
        ],
      },
      // Constellation 3: Orion / Trapezium Navigation Asterism (Lower sky)
      {
        parallax: 0.045,
        nodes: [
          { rx: 0.24, ry: 1.25, size: 2.2 }, // Betelgeuse
          { rx: 0.32, ry: 1.24, size: 2.3 }, // Bellatrix
          { rx: 0.27, ry: 1.33, size: 1.8 }, // Alnitak
          { rx: 0.28, ry: 1.34, size: 1.8 }, // Alnilam
          { rx: 0.29, ry: 1.35, size: 1.8 }, // Mintaka
          { rx: 0.25, ry: 1.44, size: 2.0 }, // Saiph
          { rx: 0.33, ry: 1.43, size: 2.4 }, // Rigel
        ],
        edges: [
          [0, 2],
          [1, 4],
          [2, 3],
          [3, 4],
          [2, 5],
          [4, 6],
          [0, 1],
        ],
      },
    ];

    const drawConstellations = () => {
      ctx.save();
      const time = Date.now() * 0.0015;

      for (const constel of constellations) {
        const points = constel.nodes.map((node) => {
          const px = width * node.rx;
          const py = (height * node.ry - scrollY * constel.parallax) % (height * 2.2);
          return { x: px, y: py, size: node.size };
        });

        // Connecting faint white lines
        ctx.strokeStyle = "rgba(255, 255, 255, 0.16)";
        ctx.lineWidth = 0.85;
        ctx.setLineDash([2, 3]);

        for (const [fromIdx, toIdx] of constel.edges) {
          const p1 = points[fromIdx];
          const p2 = points[toIdx];

          if (Math.abs(p1.y - p2.y) < height * 0.6) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        ctx.setLineDash([]);

        // Star nodes with luminous core
        for (let i = 0; i < points.length; i++) {
          const p = points[i];
          if (p.y < -20 || p.y > height + 20) continue;

          const twinkle = 0.75 + Math.sin(time + i * 1.3) * 0.25;

          ctx.fillStyle = `rgba(255, 255, 255, ${0.2 * twinkle})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${0.98 * twinkle})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();
    };

    // 4. Moving Objects: Orbital Satellites
    class Satellite {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = -50;
        this.y = Math.random() * (height * 0.7) + 50;
        this.angle = (Math.random() * 0.3 - 0.15) * Math.PI;
        this.speed = Math.random() * 0.7 + 0.4;
        this.size = 1.2;
        this.beaconBlink = 0;
        this.cooldown = Math.random() * 400 + 100;
        this.active = false;
      }
      update() {
        if (!this.active) {
          this.cooldown--;
          if (this.cooldown <= 0) this.active = true;
          return;
        }

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.beaconBlink += 0.08;

        if (this.x > width + 60 || this.y > height + 60 || this.y < -60) {
          this.active = false;
          this.reset();
        }
      }
      draw() {
        if (!this.active) return;
        const beaconOn = Math.sin(this.beaconBlink) > 0.4;

        ctx.fillStyle = "rgba(225, 235, 255, 0.85)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (beaconOn) {
          ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 5. Moving Objects: Fast Atmospheric Meteor Streaks
    class Meteor {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width * 1.1;
        this.y = Math.random() * (height * 0.5);
        this.len = Math.random() * 110 + 60;
        this.speed = Math.random() * 10 + 8;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.25;
        this.size = Math.random() * 1.3 + 0.7;
        this.active = false;
        this.cooldown = Math.random() * 600 + 250;
      }
      update() {
        if (this.active) {
          this.x += Math.cos(this.angle) * this.speed;
          this.y += Math.sin(this.angle) * this.speed;
          if (this.x > width + 100 || this.y > height + 100) {
            this.active = false;
            this.reset();
          }
        } else {
          this.cooldown--;
          if (this.cooldown <= 0) this.active = true;
        }
      }
      draw() {
        if (!this.active) return;
        ctx.save();
        const tailX = this.x - Math.cos(this.angle) * this.len;
        const tailY = this.y - Math.sin(this.angle) * this.len;

        const grad = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.25, "rgba(220, 235, 255, 0.75)");
        grad.addColorStop(0.7, "rgba(200, 220, 255, 0.25)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.restore();
      }
    }

    const stars = Array.from({ length: 950 }, () => new Star());
    const satellites = Array.from({ length: 2 }, () => new Satellite());
    const meteors = Array.from({ length: 2 }, () => new Meteor());

    const render = () => {
      if (!isTabVisible) return;

      ctx.clearRect(0, 0, width, height);

      // Deep obsidian base
      ctx.fillStyle = "#030304";
      ctx.fillRect(0, 0, width, height);

      // Draw visible, rich cosmic nebulae clouds
      drawVisibleNebulae();

      // Draw constellations with faint connecting white lines
      drawConstellations();

      // Draw dense starfield
      for (let i = 0; i < stars.length; i++) {
        stars[i].update();
        stars[i].draw();
      }

      // Draw moving satellites
      for (let i = 0; i < satellites.length; i++) {
        satellites[i].update();
        satellites[i].draw();
      }

      // Draw moving meteors
      for (let i = 0; i < meteors.length; i++) {
        meteors[i].update();
        meteors[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars.forEach((s) => s.reset());
      satellites.forEach((sat) => sat.reset());
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        cancelAnimationFrame(animationFrameId);
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{
        background: "#030304",
      }}
    />
  );
}