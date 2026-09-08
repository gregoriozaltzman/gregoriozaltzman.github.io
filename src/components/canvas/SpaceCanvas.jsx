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

    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = (Math.random() - 0.5) * 0.08;
        this.vy = (Math.random() - 0.5) * 0.08;
        this.alpha = Math.random() * 0.7 + 0.3;
        this.twinkleSpeed = Math.random() * 0.02 + 0.005;
      }
      update() {
        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;
        this.alpha += Math.sin(Date.now() * this.twinkleSpeed) * 0.01;
        this.alpha = Math.max(0.2, Math.min(0.9, this.alpha));
      }
      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width * 1.2;
        this.y = Math.random() * height * 0.5;
        this.len = Math.random() * 90 + 30;
        this.speed = Math.random() * 12 + 8;
        this.size = Math.random() * 1.5 + 0.6;
        this.active = false;
        this.cooldown = Math.random() * 300 + 100;
      }
      update() {
        if (this.active) {
          this.x -= this.speed;
          this.y += this.speed * 0.55;
          if (this.x < -this.len || this.y > height + this.len) {
            this.active = false;
            this.reset();
          }
        } else {
          this.cooldown--;
          if (this.cooldown <= 0) {
            this.active = true;
          }
        }
      }
      draw() {
        if (!this.active) return;
        ctx.save();
        ctx.beginPath();
        const grad = ctx.createLinearGradient(
          this.x,
          this.y,
          this.x + this.len,
          this.y - this.len * 0.55
        );
        grad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
        grad.addColorStop(0.3, "rgba(56, 189, 248, 0.7)");
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.strokeStyle = grad;
        ctx.lineWidth = this.size;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.len, this.y - this.len * 0.55);
        ctx.stroke();
        ctx.restore();
      }
    }

    class Nebula {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.radius = Math.random() * 240 + 140;
        const colors = [
          [56, 189, 248],  // Cyan
          [139, 92, 246], // Purple
          [16, 185, 129], // Emerald
        ];
        this.col = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.02;
        this.vy = (Math.random() - 0.5) * 0.02;
      }
      update() {
        this.x = (this.x + this.vx + width) % width;
        this.y = (this.y + this.vy + height) % height;
      }
      draw() {
        const grad = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius
        );
        grad.addColorStop(0, `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, 0.045)`);
        grad.addColorStop(0.6, `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, 0.012)`);
        grad.addColorStop(1, `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class Galaxy {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.angle = Math.random() * Math.PI * 2;
        this.stars = [];
        const count = Math.floor(Math.random() * 40 + 30);
        for (let i = 0; i < count; i++) {
          const dist = Math.random() * 110;
          const a = Math.random() * Math.PI * 2;
          this.stars.push({
            x: Math.cos(a) * dist,
            y: Math.sin(a) * dist * 0.45,
            size: Math.random() * 1.3 + 0.3,
            alpha: Math.random() * 0.4 + 0.1,
          });
        }
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 110);
        grad.addColorStop(0, "rgba(255, 255, 255, 0.04)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(0, 0, 110, 0, Math.PI * 2);
        ctx.fill();
        this.stars.forEach((s) => {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        });
        ctx.restore();
      }
    }

    class Asteroid {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        const typeRand = Math.random();
        if (typeRand > 0.6) this.color = "#475569";
        else if (typeRand > 0.3) this.color = "#334155";
        else this.color = "#1e293b";

        this.radius = Math.random() * 14 + 5;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.12 + 0.04;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.rotation = 0;
        this.rotationSpeed = (Math.random() - 0.5) * 0.004;

        this.vertices = [];
        const numPoints = 6 + Math.floor(Math.random() * 4);
        for (let i = 0; i < numPoints; i++) {
          const a = (i / numPoints) * Math.PI * 2;
          const dist = this.radius * (0.7 + Math.random() * 0.3);
          this.vertices.push({ x: Math.cos(a) * dist, y: Math.sin(a) * dist });
        }
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;
        if (this.x < -100) this.x = width + 100;
        if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100;
        if (this.y > height + 100) this.y = -100;
      }
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.vertices[0].x, this.vertices[0].y);
        for (let i = 1; i < this.vertices.length; i++) {
          ctx.lineTo(this.vertices[i].x, this.vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.stroke();
        ctx.restore();
      }
    }

    class Comet {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.tint = "rgba(56, 189, 248,";
        this.coreColor = "#38bdf8";
        this.radius = Math.random() * 2 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 0.9 + 0.5;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.history = [];
      }
      update() {
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 25) this.history.shift();
        this.x += this.vx;
        this.y += this.vy;
        if (
          this.x < -200 ||
          this.x > width + 200 ||
          this.y < -200 ||
          this.y > height + 200
        ) {
          this.reset();
        }
      }
      draw() {
        for (let i = 0; i < this.history.length; i++) {
          const pt = this.history[i];
          const opacity = (i + 1) / this.history.length;
          const trailSize = this.radius * ((i + 1) / this.history.length);
          ctx.beginPath();
          ctx.fillStyle = `${this.tint} ${opacity * 0.25})`;
          ctx.arc(pt.x, pt.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.beginPath();
        ctx.fillStyle = this.coreColor;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.coreColor;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const stars = Array.from({ length: 220 }, () => new Star());
    const shootingStars = Array.from({ length: 3 }, () => new ShootingStar());
    const nebulas = Array.from({ length: 3 }, () => new Nebula());
    const galaxies = Array.from({ length: 2 }, () => new Galaxy());
    const asteroids = Array.from({ length: 5 }, () => new Asteroid());
    const comets = Array.from({ length: 2 }, () => new Comet());

    const render = () => {
      if (!isTabVisible) return;
      ctx.clearRect(0, 0, width, height);

      galaxies.forEach((g) => g.draw());
      nebulas.forEach((n) => {
        n.update();
        n.draw();
      });
      stars.forEach((s) => {
        s.update();
        s.draw();
      });
      shootingStars.forEach((ss) => {
        ss.update();
        ss.draw();
      });
      asteroids.forEach((a) => {
        a.update();
        a.draw();
      });
      comets.forEach((c) => {
        c.update();
        c.draw();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-black"
    />
  );
}
