document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1) LOADING & FOCUS TYPEWRITER 
  ========================================= */
  const loadingScreen = document.getElementById('loading-screen');
  const typeTextElement = document.getElementById('focus-typewriter');
  
  const rawText = "Aircraft design, aerodynamics, space systems, and spacecraft engineering.";
  
  window.addEventListener('load', () => {
    resizeCanvas();
    initSpace(); 
    
    loadingScreen.style.opacity = '0';
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      loadingScreen.style.display = 'none';
      
      document.querySelectorAll('.reveal-mask').forEach(mask => mask.classList.add('visible'));
      
      if(typeTextElement) {
          let i = 0;
          let speed = 25; 
          function typeWriter() {
              if (i < rawText.length) {
                  let char = rawText.charAt(i);
                  typeTextElement.innerHTML += char;
                  i++;
                  setTimeout(typeWriter, speed);
              }
          }
          setTimeout(typeWriter, 800); 
      }
    }, 800);
  });

  /* =========================================
     2) DYNAMIC MOUSE GLOW & POP-UP OBSERVERS
  ========================================= */
  const glowBoxes = document.querySelectorAll('.dynamic-glow');
  glowBoxes.forEach(box => {
      box.addEventListener('mousemove', (e) => {
          const rect = box.getBoundingClientRect();
          box.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
          box.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
  });

  const rocketBtn = document.getElementById('scroll-top');
  const timelineSection = document.getElementById('timeline');
  const timelineLine = document.getElementById('timeline-line');
  
  window.addEventListener('scroll', () => {
      // Show/Hide Top Button
      rocketBtn.classList.toggle('show', window.pageYOffset > 300);
      
      // Parallax Effect
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          document.querySelectorAll('.parallax-img').forEach(img => {
              const rect = img.parentElement.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) {
                  const yOffset = (rect.top + rect.height / 2 - window.innerHeight / 2) * 0.15; 
                  img.style.transform = `translateY(${yOffset}px)`;
              }
          });
      }

      // Timeline Draw Effect
      if (window.innerWidth >= 1000 && timelineSection && timelineLine) {
          const rect = timelineSection.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
              let progress = (windowHeight - rect.top) / (rect.height + windowHeight * 0.2);
              progress = Math.max(0, Math.min(1, progress));
              timelineLine.style.setProperty('--draw-height', `${progress * 100}%`);
          }
      }
  });

  rocketBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Pop-Up Elements and Animated Headers
  const popUpObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".pop-up-element, .reveal-mask, .stagger-reveal").forEach(el => popUpObserver.observe(el));

  /* =========================================
     3) SIDEBAR NAV SCROLL SPY 
  ========================================= */
  const navLinks = Array.from(document.querySelectorAll('#sidebar-nav a'));
  const sections = Array.from(document.querySelectorAll('section[data-nav]'));

  function setActiveNav(id) {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.dataset.nav);
    });
  }, { rootMargin: "-30% 0px -50% 0px", threshold: 0 });

  sections.forEach(s => navObserver.observe(s));

  /* =========================================
     4) MAGNETIC BUTTON (CONTACT)
  ========================================= */
  const sendBtn = document.getElementById('send-btn');
  if(sendBtn) {
      sendBtn.addEventListener('mousemove', (e) => {
          const rect = sendBtn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          sendBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });
      sendBtn.addEventListener('mouseleave', () => {
          sendBtn.style.transform = `translate(0px, 0px)`;
      });
  }

  /* =========================================
     5) MODAL ENGINE WITH NAVIGATION
  ========================================= */
  const modal = document.getElementById('project-modal');
  const modalMediaContainer = document.getElementById('modal-media-container');
  const modalActions = document.getElementById('modal-actions');
  const projectCards = Array.from(document.querySelectorAll('.project-click-target'));
  
  let currentProjectIndex = -1;
  let codeTypewriterReq;

  function loadProjectData(item) {
    const title = item.dataset.title;
    const imgString = item.dataset.images;
    const skillsString = item.dataset.skills;
    const pdfLink = item.dataset.pdf;
    const modelLink = item.dataset.model;
    const videoLink = item.dataset.video;
    
    const descDiv = item.querySelector('.project-html-desc');
    const desc = descDiv ? descDiv.innerHTML : '';
    
    const codeNode = item.querySelector('.project-code');
    const codeText = codeNode ? codeNode.value : '';

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-description').innerHTML = desc;

    const skillsContainer = document.getElementById('modal-skills-container');
    skillsContainer.innerHTML = '';
    if (skillsString) {
      skillsString.split(',').filter(Boolean).forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill.trim();
        skillsContainer.appendChild(span);
      });
    }

    modalActions.innerHTML = '';
    if (pdfLink) {
      pdfLink.split(',').filter(Boolean).forEach((href, index, arr) => {
        const btn = document.createElement('a');
        btn.href = href.trim();
        btn.target = "_blank";
        btn.className = "btn chamfer-btn";
        btn.textContent = arr.length > 1 ? `View Report ${index + 1}` : `View Full Report`;
        modalActions.appendChild(btn);
      });
    }

    modalMediaContainer.innerHTML = '';
    if (modelLink) {
      modalMediaContainer.innerHTML = `<model-viewer src="${modelLink.trim()}" auto-rotate camera-controls shadow-intensity="1" exposure="1.0" environment-image="neutral"></model-viewer>`;
    } else {
      if (videoLink) {
        modalMediaContainer.innerHTML += `<video controls autoplay loop muted playsinline style="width:100%; max-height:70vh; border-radius:8px; margin-bottom:2rem;"><source src="${videoLink.trim()}" type="video/mp4"></video>`;
      }
      if (imgString) {
        modalMediaContainer.innerHTML += imgString.split(',').filter(Boolean).map(img => `<img src="${img.trim()}" alt="${title}" style="width: 100%; height: auto; margin-bottom: 2rem; border-radius: 8px;">`).join('');
      }
    }

    if (codeTypewriterReq) cancelAnimationFrame(codeTypewriterReq);

    if (codeText) {
      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'modal-code-wrapper chamfer-box';
      codeWrapper.innerHTML = `<div class="code-header"><span class="code-title">Terminal Output</span><span class="status-indicator blinking"></span></div>`;
      const codeEl = document.createElement('pre');
      codeEl.className = 'modal-code';
      codeWrapper.appendChild(codeEl);
      modalMediaContainer.appendChild(codeWrapper);

      let i = 0;
      function typeCode() {
        if (i < codeText.length) {
          codeEl.textContent += codeText.substring(i, i + 35);
          i += 35;
          codeEl.scrollTop = codeEl.scrollHeight; 
          codeTypewriterReq = requestAnimationFrame(typeCode);
        }
      }
      codeTypewriterReq = requestAnimationFrame(typeCode);
    }
  }

  function openModal(index) {
    document.body.style.overflow = 'hidden';
    modal.setAttribute("aria-hidden", "false");
    modal.style.display = 'block';
    
    currentProjectIndex = index;
    loadProjectData(projectCards[index]);

    setTimeout(() => { modal.classList.add('open'); }, 10);
  }

  function closeModalFunc() {
    if (codeTypewriterReq) cancelAnimationFrame(codeTypewriterReq);
    modal.classList.remove('open');
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ''; 
    currentProjectIndex = -1;
    setTimeout(() => { 
        modal.style.display = 'none';
        modalMediaContainer.innerHTML = ''; 
    }, 500);
  }

  document.querySelector('.close-modal').addEventListener('click', closeModalFunc);
  window.addEventListener('click', (e) => { if(e.target === modal) closeModalFunc(); });

  projectCards.forEach((item, index) => {
    item.addEventListener('click', () => {
      openModal(index);
    });
  });

  // Navigation Arrows Logic
  const prevBtn = document.querySelector('.prev-modal');
  const nextBtn = document.querySelector('.next-modal');

  function navigateModal(direction) {
      if (currentProjectIndex === -1) return;
      currentProjectIndex += direction;
      if (currentProjectIndex < 0) currentProjectIndex = projectCards.length - 1;
      if (currentProjectIndex >= projectCards.length) currentProjectIndex = 0;
      loadProjectData(projectCards[currentProjectIndex]);
  }

  if(prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(-1); });
  if(nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateModal(1); });

  /* =========================================
     6) TIMELINE DRAG (MOBILE ONLY)
  ========================================= */
  const timeline = document.querySelector('.timeline-container');
  let isDown = false, startX, scrollLeft;
  if (timeline) {
      timeline.addEventListener('mousedown', (e) => {
        if(window.innerWidth >= 1000) return;
        isDown = true; timeline.style.cursor = 'grabbing';
        startX = e.pageX - timeline.offsetLeft; scrollLeft = timeline.scrollLeft;
      });
      timeline.addEventListener('mouseleave', () => { isDown = false; if(window.innerWidth < 1000) timeline.style.cursor = 'grab'; });
      timeline.addEventListener('mouseup', () => { isDown = false; if(window.innerWidth < 1000) timeline.style.cursor = 'grab'; });
      timeline.addEventListener('mousemove', (e) => {
        if (!isDown || window.innerWidth >= 1000) return; 
        e.preventDefault();
        timeline.scrollLeft = scrollLeft - ((e.pageX - timeline.offsetLeft) - startX) * 2;
      });
  }

  /* =========================================
     7) ADVANCED SPACE CANVAS 
  ========================================= */
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [], nebulas = [], galaxies = [], clusters = [], asteroids = [], comets = [], shootingStars = [];
  
  function resizeCanvas() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeCanvas);

  class Star {
    constructor() { this.x = Math.random()*width; this.y = Math.random()*height; this.size = Math.random()*1.5+0.5; this.vx = (Math.random()-0.5)*0.1; this.vy = (Math.random()-0.5)*0.1; this.alpha = Math.random()*0.7+0.3; }
    update() { this.x = (this.x + this.vx + width) % width; this.y = (this.y + this.vy + height) % height; }
    draw() { ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
  }

  class ShootingStar {
    constructor() { this.reset(); }
    reset() { this.x = Math.random()*width; this.y = Math.random()*height*0.5; this.len = Math.random()*80+20; this.speed = Math.random()*10+6; this.size = Math.random()*1.5+0.5; this.active = false; }
    update() {
      if (this.active) { this.x -= this.speed; this.y += this.speed*0.5; if (this.x < -this.len || this.y > height + this.len) this.active = false; }
      else if (Math.random() < 0.005) { this.reset(); this.active = true; }
    }
    draw() {
      if (!this.active) return;
      ctx.beginPath();
      const grad = ctx.createLinearGradient(this.x, this.y, this.x + this.len, this.y - this.len*0.5);
      grad.addColorStop(0, "rgba(255, 255, 255, 1)"); grad.addColorStop(1, "rgba(255, 255, 255, 0)");
      ctx.strokeStyle = grad; ctx.lineWidth = this.size; ctx.moveTo(this.x, this.y); ctx.lineTo(this.x + this.len, this.y - this.len*0.5); ctx.stroke();
    }
  }

  class Nebula {
    constructor() {
      this.x = Math.random()*width; this.y = Math.random()*height; this.radius = Math.random()*300+150;
      const colors = [[56, 189, 248], [139, 92, 246], [236, 72, 153], [16, 185, 129]];
      this.col = colors[Math.floor(Math.random()*colors.length)];
      this.vx = (Math.random()-0.5)*0.05; this.vy = (Math.random()-0.5)*0.05;
    }
    update() { this.x = (this.x + this.vx + width) % width; this.y = (this.y + this.vy + height) % height; }
    draw() {
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
      grad.addColorStop(0, `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, 0.04)`); grad.addColorStop(1, `rgba(${this.col[0]}, ${this.col[1]}, ${this.col[2]}, 0)`);
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
    }
  }

  class Galaxy {
    constructor() {
      this.x = Math.random()*width; this.y = Math.random()*height; this.angle = Math.random()*Math.PI*2; this.stars = [];
      for (let i = 0; i < 40; i++) {
        const dist = Math.random()*100; const angle = Math.random()*Math.PI*2;
        this.stars.push({ x: Math.cos(angle)*dist, y: Math.sin(angle)*dist*0.6, size: Math.random()*1.5+0.5, alpha: Math.random()*0.1+0.05 });
      }
    }
    draw() {
      ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle);
      const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 120);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)'); grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(0, 0, 120, 0, Math.PI * 2); ctx.fill();
      this.stars.forEach(s => { ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); });
      ctx.restore();
    }
  }
  
  class StarCluster {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.stars = [];
        this.hue = Math.random() * 360;
        const count = Math.random() * 60 + 30; 
        for (let i = 0; i < count; i++) {
          const u = Math.random();
          const v = Math.random();
          const radiusDist = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) * 25; 
          const angle = Math.random() * Math.PI * 2;
          this.stars.push({ x: Math.cos(angle) * Math.abs(radiusDist), y: Math.sin(angle) * Math.abs(radiusDist), size: Math.random() * 1.5 + 0.3, alpha: Math.random() * 0.6 + 0.2 });
        }
      }
      draw() {
        ctx.save(); ctx.translate(this.x, this.y);
        const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
        grad.addColorStop(0, `hsla(${this.hue}, 50%, 70%, 0.1)`); grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad; ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.fill();
        this.stars.forEach(s => { ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`; ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); });
        ctx.restore();
      }
  }
  
  class Asteroid {
      constructor() { this.reset(); }
      reset() { 
        this.x = Math.random() * width; this.y = Math.random() * height;
        const typeRand = Math.random();
        if (typeRand > 0.7) { this.color = '#cbd5e1'; } else if (typeRand > 0.3) { this.color = '#64748b'; } else { this.color = '#334155'; }
        this.radius = Math.random() * 18 + 4; 
        const angle = Math.random() * Math.PI * 2; const speed = Math.random() * 0.1 + 0.05; 
        this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed; 
        this.rotation = 0; this.rotationSpeed = (Math.random() - 0.5) * 0.005; 
        this.vertices = []; const numPoints = 6 + Math.floor(Math.random() * 5); 
        for (let i = 0; i < numPoints; i++) { 
            const anglePoint = (i / numPoints) * Math.PI * 2; const dist = this.radius * (0.6 + Math.random() * 0.4); 
            this.vertices.push({ x: Math.cos(anglePoint) * dist, y: Math.sin(anglePoint) * dist }); 
        } 
      }
      update() { 
        this.x += this.vx; this.y += this.vy; this.rotation += this.rotationSpeed; 
        if (this.x < -100) this.x = width + 100; if (this.x > width + 100) this.x = -100;
        if (this.y < -100) this.y = height + 100; if (this.y > height + 100) this.y = -100;
      }
      draw() { 
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation); 
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.moveTo(this.vertices[0].x, this.vertices[0].y); 
        for (let i = 1; i < this.vertices.length; i++) { ctx.lineTo(this.vertices[i].x, this.vertices[i].y); }
        ctx.closePath(); ctx.fill(); ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill(); ctx.restore(); 
      }
  }

  class Comet {
      constructor() { this.reset(); }
      reset() { 
        this.x = Math.random() * width; this.y = Math.random() * height;
        const hue = Math.random() * 360;
        this.tint = `hsla(${hue}, 80%, 60%,`; this.coreColor = `hsl(${hue}, 80%, 70%)`;
        this.radius = Math.random() * 2 + 1; 
        const angle = Math.random() * Math.PI * 2; const speed = Math.random() * 1.5 + 0.8;
        this.vx = Math.cos(angle) * speed; this.vy = Math.sin(angle) * speed; 
        this.history = []; 
      }
      update() { 
        this.history.push({ x: this.x, y: this.y }); 
        if (this.history.length > 25) { this.history.shift(); } 
        this.x += this.vx; this.y += this.vy; 
        if (this.x < -200 || this.x > width + 200 || this.y < -200 || this.y > height + 200) { this.reset(); } 
      }
      draw() { 
        for (let i = 0; i < this.history.length; i++) { 
          const point = this.history[i]; const opacity = (i + 1) / this.history.length; const trailSize = this.radius * ((i + 1) / this.history.length); 
          ctx.beginPath(); ctx.fillStyle = `${this.tint} ${opacity * 0.4})`; ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2); ctx.fill(); 
        } 
        ctx.beginPath(); ctx.fillStyle = this.coreColor; ctx.shadowBlur = 10; ctx.shadowColor = this.coreColor; ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; 
      }
  }

  function initSpace() {
    stars = Array.from({ length: 200 }, () => new Star());
    nebulas = Array.from({ length: 3 }, () => new Nebula());
    galaxies = Array.from({ length: 2 }, () => new Galaxy());
    clusters = Array.from({ length: 2 }, () => new StarCluster());
    asteroids = Array.from({ length: 6 }, () => new Asteroid());
    comets = Array.from({ length: 3 }, () => new Comet());
    shootingStars = Array.from({ length: 3 }, () => new ShootingStar());
    animateSpace();
  }

  function animateSpace() {
    ctx.clearRect(0, 0, width, height);
    galaxies.forEach(g => g.draw());
    clusters.forEach(c => c.draw());
    nebulas.forEach(n => { n.update(); n.draw(); });
    stars.forEach(s => { s.update(); s.draw(); });
    asteroids.forEach(a => { a.update(); a.draw(); });
    comets.forEach(c => { c.update(); c.draw(); });
    shootingStars.forEach(ss => { ss.update(); ss.draw(); });
    requestAnimationFrame(animateSpace);
  }
});