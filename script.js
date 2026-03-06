document.addEventListener('DOMContentLoaded', () => {

  /* =========================================
     1) WEB AUDIO API (ACOUSTIC UI)
  ========================================= */
  let audioCtx;
  let audioEnabled = false;
  const audioToggle = document.getElementById('audio-toggle');

  function initAudio() {
      if (!audioCtx) {
          audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
          audioCtx.resume();
      }
  }

  if (audioToggle) {
      audioToggle.addEventListener('click', () => {
          audioEnabled = !audioEnabled;
          audioToggle.textContent = audioEnabled ? "Audio: ON" : "Audio: OFF";
          if (audioEnabled) {
              initAudio();
              playClick();
          }
      });
  }

  function playClick() {
      if (!audioEnabled || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.05);
      gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
  }

  function playThud() {
      if (!audioEnabled || !audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, audioCtx.currentTime + 0.15);
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);
      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
  }

  document.querySelectorAll('a, button, .project-card, .timeline-card').forEach(el => {
      el.addEventListener('mousedown', (e) => {
          if(el.id !== 'mode-toggle' && el.id !== 'audio-toggle') {
              playClick();
          }
      });
  });

  /* =========================================
     2) LOADING, TYPEWRITER & REVEALS
  ========================================= */
  const loadingScreen = document.getElementById('loading-screen');
  const typeTextElement = document.getElementById('typewriter-text');
  const rawText = "B.S. Aerospace Engineering at UC San Diego (Class of 2026).";
  
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
                  if (char === '^') {
                      typeTextElement.innerHTML += "<br><br>";
                  } else {
                      typeTextElement.innerHTML += char;
                  }
                  i++;
                  setTimeout(typeWriter, speed);
              }
          }
          setTimeout(typeWriter, 500); 
      }
    }, 800);
  });

  /* =========================================
     3) DYNAMIC MOUSE GLOW
  ========================================= */
  const glowBoxes = document.querySelectorAll('.dynamic-glow');
  glowBoxes.forEach(box => {
      box.addEventListener('mousemove', (e) => {
          const rect = box.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          box.style.setProperty('--mouse-x', `${x}px`);
          box.style.setProperty('--mouse-y', `${y}px`);
      });
  });

  /* =========================================
     4) NATIVE SCROLL OBSERVERS (REVEALS & PARALLAX)
  ========================================= */
  const rocketBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
      let scrollPosition = window.pageYOffset;
      if (scrollPosition > 300) {
          rocketBtn.classList.add('show');
      } else {
          rocketBtn.classList.remove('show');
      }
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          updateParallax();
      }
  });

  rocketBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -40px 0px" };
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".reveal-mask, .stagger-reveal").forEach(el => revealObserver.observe(el));

  /* =========================================
     5) IMAGE PARALLAX ENGINE
  ========================================= */
  const parallaxImages = document.querySelectorAll('.parallax-img');
  function updateParallax() {
      parallaxImages.forEach(img => {
          const rect = img.parentElement.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          if (rect.top < windowHeight && rect.bottom > 0) {
              const distanceToCenter = rect.top + (rect.height / 2) - (windowHeight / 2);
              const yOffset = distanceToCenter * 0.15; 
              img.style.transform = `translateY(${yOffset}px)`;
          }
      });
  }

/* =========================================
     6) SIDEBAR ACTIVE STATE (Scroll Spy)
  ========================================= */
  const navLinks = Array.from(document.querySelectorAll('#sidebar-nav a'));
  const sections = Array.from(document.querySelectorAll('section[data-nav]'));

  function setActiveNav(id) {
    navLinks.forEach(a => a.classList.toggle('active', a.dataset.section === id));
  }

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.dataset.nav);
      }
    });
  }, { 
    rootMargin: "-30% 0px -50% 0px", 
    threshold: 0 
  });

  sections.forEach(s => navObserver.observe(s));
  setActiveNav('skills'); 

  /* =========================================
     7) MODAL LOGIC + PDF REPORTS + CODE TYPING
  ========================================= */
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDescription = document.getElementById('modal-description');
  const modalSkillsContainer = document.getElementById('modal-skills-container');
  const modalMediaContainer = document.getElementById('modal-media-container');
  const modalActions = document.getElementById('modal-actions');
  const closeModalBtn = document.querySelector('.close-modal');

  let codeTypewriterReq;

  function makePdfButtons(pdfLinkRaw) {
    modalActions.innerHTML = '';
    if (!pdfLinkRaw || pdfLinkRaw.trim() === "") return;

    const links = pdfLinkRaw.split(',').map(s => s.trim()).filter(Boolean);

    links.forEach((href, index) => {
      const btn = document.createElement('a');
      btn.href = href;
      btn.target = "_blank";
      btn.className = "btn chamfer-btn";
      btn.textContent = links.length > 1 ? `View Full Report ${index + 1}` : `View Full Report`;
      
      btn.addEventListener('mousedown', playClick);
      
      modalActions.appendChild(btn);
    });
  }

  function openModal(title, desc, imgString, skillsString, pdfLink, modelLink, videoLink, codeText) {
    document.body.style.overflow = 'hidden';
    modal.setAttribute("aria-hidden", "false");

    modalTitle.textContent = title;
    modalDescription.innerHTML = desc;

    modalSkillsContainer.innerHTML = '';
    if (skillsString && skillsString.trim() !== "") {
      skillsString.split(',').map(s => s.trim()).filter(Boolean).forEach(skill => {
        const span = document.createElement('span');
        span.textContent = skill;
        modalSkillsContainer.appendChild(span);
      });
    }

    makePdfButtons(pdfLink);

    modalMediaContainer.innerHTML = '';
    if (modelLink && modelLink.trim() !== "") {
      modalMediaContainer.innerHTML = `
        <model-viewer
          src="${modelLink.trim()}"
          auto-rotate
          camera-controls
          interaction-prompt="none"
          shadow-intensity="1"
          exposure="1.0"
          environment-image="neutral">
        </model-viewer>
      `;
    } else if (videoLink && videoLink.trim() !== "") {
      modalMediaContainer.innerHTML = `
        <video controls autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;">
          <source src="${videoLink.trim()}" type="video/mp4">
        </video>
      `;
    } else if (imgString && imgString.trim() !== "") {
      const images = imgString.split(',').map(s => s.trim()).filter(Boolean);
      modalMediaContainer.innerHTML = images.map(img => `<img src="${img}" alt="${title}" style="margin-bottom: 2rem; border-radius: 8px;">`).join('');
    }

    // IF WE HAVE A MATLAB SCRIPT ATTATCHED, RENDER THE TERMINAL BOX UNDER IMAGES
    if (codeText && codeText.trim() !== "") {
      const codeWrapper = document.createElement('div');
      codeWrapper.className = 'modal-code-wrapper chamfer-box dynamic-glow';
      codeWrapper.innerHTML = `
        <div class="code-header">
            <span class="code-title">Wing_Analysis_Function.m</span>
            <span class="status-indicator blinking"></span>
        </div>
      `;
      const codeEl = document.createElement('pre');
      codeEl.className = 'modal-code';
      codeWrapper.appendChild(codeEl);
      modalMediaContainer.appendChild(codeWrapper);

      let i = 0;
      const charsPerFrame = 65; // Adjust this number to make it type faster or slower

      function typeCode() {
        if (i < codeText.length) {
          codeEl.textContent += codeText.substring(i, i + charsPerFrame);
          i += charsPerFrame;
          codeEl.scrollTop = codeEl.scrollHeight; // Auto-scroll to bottom of code element
          codeTypewriterReq = requestAnimationFrame(typeCode);
        }
      }
      codeTypewriterReq = requestAnimationFrame(typeCode);
    }

    modal.classList.add('open');
  }

  function closeModalFunc() {
    if (typeof codeTypewriterReq !== 'undefined') {
        cancelAnimationFrame(codeTypewriterReq);
    }
    modal.classList.remove('open');
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = ''; 
    setTimeout(() => { modalMediaContainer.innerHTML = ''; }, 200);
  }

  closeModalBtn.addEventListener('click', (e) => { e.stopPropagation(); closeModalFunc(); });
  window.addEventListener('click', (e) => { if(e.target === modal) closeModalFunc(); });

  document.querySelectorAll('.project-click-target').forEach(item => {
    item.addEventListener('click', () => {
      const descDiv = item.querySelector('.project-html-desc');
      const descHTML = descDiv ? descDiv.innerHTML : '';
      
      const codeNode = item.querySelector('.project-code');
      const codeText = codeNode ? codeNode.value : '';

      openModal(
        item.dataset.title,
        descHTML,
        item.dataset.images,
        item.dataset.skills,
        item.dataset.pdf,
        item.dataset.model,
        item.dataset.video,
        codeText
      );
    });
  });

  /* =========================================
     8) TIMELINE DRAG LOGIC
  ========================================= */
  const timeline = document.querySelector('.horizontal-timeline');
  let isDown = false;
  let startX;
  let scrollLeft;

  if (timeline) {
      timeline.addEventListener('mousedown', (e) => {
        isDown = true;
        timeline.style.cursor = 'grabbing';
        startX = e.pageX - timeline.offsetLeft;
        scrollLeft = timeline.scrollLeft;
      });
      timeline.addEventListener('mouseleave', () => {
        isDown = false;
        timeline.style.cursor = 'grab';
      });
      timeline.addEventListener('mouseup', () => {
        isDown = false;
        timeline.style.cursor = 'grab';
      });
      timeline.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - timeline.offsetLeft;
        const walk = (x - startX) * 2; 
        timeline.scrollLeft = scrollLeft - walk;
      });
  }

  /* =========================================
     9) SPACE MODE TOGGLE
  ========================================= */
  let isSpaceMode = true;
  const modeBtn = document.getElementById('mode-toggle');
  const modeLabel = document.getElementById('mode-label'); 
  const canvasElement = document.getElementById('space-canvas');
  
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isSpaceMode = false;
      modeLabel.textContent = "Clean Mode";
      canvasElement.style.opacity = '0';
  }

  modeBtn.addEventListener('click', () => {
    playThud();
    isSpaceMode = !isSpaceMode;
    if (isSpaceMode) {
        modeLabel.textContent = "Space Mode: ON";
        canvasElement.style.opacity = '1';
        initSpace(); 
    } else {
        modeLabel.textContent = "Clean Mode";
        canvasElement.style.opacity = '0'; 
    }
  });

  /* =========================================
     10) THE FULL SPACE ENGINE
  ========================================= */
  const canvas = document.getElementById('space-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;
  
  let stars = [], nebulas = [], galaxies = [], asteroids = [], comets = [], satellite; 
  let darts = []; 
  let explosions = [];
  
  let lastDartTime = Date.now(); 
  const DART_INTERVAL = 120000;

  const config = { 
      starCount: 150, 
      nebulaCount: 3, 
      galaxyCount: 2, 
      asteroidCount: 4, 
      cometCount: 1, 
      mouseRadius: 180, 
      connectionDistance: 110, 
      maxConnections: 2 
  };
  
  let mouse = { x: null, y: null };
  window.addEventListener('mousemove', (e) => { 
      mouse.x = e.clientX; 
      mouse.y = e.clientY; 
  });
  
  function resizeCanvas() { 
      width = window.innerWidth; 
      height = window.innerHeight; 
      canvas.width = width; 
      canvas.height = height; 
      config.connectionDistance = (width + height) / 25; 
  }

  class Star {
    constructor() { this.reset(); this.connections = 0; }
    reset() {
      this.x = Math.random() * width; 
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.05; 
      this.vy = (Math.random() - 0.5) * 0.05;
      this.isSupernova = false;
      const rand = Math.random();
      if (rand > 0.9) { this.color = '#bfdbfe'; this.size = Math.random() * 2.5 + 2; this.brightness = 0.9; }
      else if (rand > 0.7) { this.color = '#fde68a'; this.size = Math.random() * 1.5 + 1.5; this.brightness = 0.8; }
      else if (rand > 0.5) { this.color = '#fecaca'; this.size = Math.random() * 1.5 + 1; this.brightness = 0.7; }
      else { this.color = '#ffffff'; this.size = Math.random() * 1.5 + 0.5; this.brightness = Math.random() * 0.4 + 0.4; }
    }
    update() {
      this.connections = 0; 
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0) this.x = width; if (this.x > width) this.x = 0; 
      if (this.y < 0) this.y = height; if (this.y > height) this.y = 0;
    }
    draw() {
      ctx.beginPath(); 
      ctx.globalAlpha = this.brightness; 
      ctx.fillStyle = this.isSupernova ? '#ffffff' : this.color;
      ctx.shadowBlur = this.size * 3;
      ctx.shadowColor = this.color;
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); 
      ctx.fill(); 
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1.0; 
    }
  }

  class Galaxy {
      constructor() {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
          this.angle = Math.random() * Math.PI * 2;
          this.stars = [];
          const count = Math.random() * 40 + 20; 
          for(let i=0; i<count; i++) {
              const dist = Math.random() * 100; 
              const angle = Math.random() * Math.PI * 2;
              this.stars.push({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist * 0.6, size: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.1 + 0.05 });
          }
      }
      update() {}
      draw() {
          ctx.save();
          ctx.translate(this.x, this.y);
          ctx.rotate(this.angle);
          const grad = ctx.createRadialGradient(0,0,0, 0,0,120);
          grad.addColorStop(0, 'rgba(255, 255, 255, 0.03)');
          grad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = grad;
          ctx.beginPath(); ctx.arc(0,0,120,0,Math.PI*2); ctx.fill();
          this.stars.forEach(s => {
              ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
              ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.fill();
          });
          ctx.restore();
      }
  }

  class Asteroid {
    constructor() { this.reset(); }
    reset() { 
      const side = Math.floor(Math.random() * 4); 
      if(side === 0) { this.x = -50; this.y = Math.random() * height; } else if(side === 1) { this.x = width+50; this.y = Math.random() * height; } else if(side === 2) { this.x = Math.random() * width; this.y = -50; } else { this.x = Math.random() * width; this.y = height+50; } 
      const typeRand = Math.random();
      if (typeRand > 0.7) { this.type = 'Metallic'; this.color = '#cbd5e1'; } else if (typeRand > 0.3) { this.type = 'Silicate'; this.color = '#64748b'; } else { this.type = 'Carbon'; this.color = '#334155'; }
      this.radius = Math.random() * 12 + 6; 
      this.vx = (Math.random() - 0.5) * 1.5; this.vy = (Math.random() - 0.5) * 1.5; 
      this.rotation = 0; this.rotationSpeed = (Math.random() - 0.5) * 0.05; 
      this.vertices = []; 
      const numPoints = 6 + Math.floor(Math.random() * 6); 
      for (let i = 0; i < numPoints; i++) { 
          const angle = (i / numPoints) * Math.PI * 2; 
          const dist = this.radius * (0.7 + Math.random() * 0.3); 
          this.vertices.push({ x: Math.cos(angle) * dist, y: Math.sin(angle) * dist }); 
      } 
    }
    update() { 
        this.x += this.vx; this.y += this.vy; this.rotation += this.rotationSpeed; 
        if(this.x < -100 || this.x > width + 100 || this.y < -100 || this.y > height + 100) { this.reset(); } 
    }
    draw() { 
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.rotation); 
        ctx.fillStyle = this.color; 
        ctx.beginPath(); ctx.moveTo(this.vertices[0].x, this.vertices[0].y); 
        for(let i=1; i<this.vertices.length; i++) { ctx.lineTo(this.vertices[i].x, this.vertices[i].y); }
        ctx.closePath(); ctx.fill(); 
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.fill(); 
        ctx.restore(); 
    }
  }

  class Comet {
    constructor() { this.reset(); }
    reset() { 
      const side = Math.floor(Math.random() * 4); 
      const buffer = 1000 + Math.random() * 2000; 
      if(side === 0) { this.x = -buffer; this.y = Math.random() * height; } else if(side === 1) { this.x = width+buffer; this.y = Math.random() * height; } else if(side === 2) { this.x = Math.random() * width; this.y = -buffer; } else { this.x = Math.random() * width; this.y = height+buffer; } 
      const typeRand = Math.random();
      if (typeRand > 0.4) { this.tint = 'rgba(100, 200, 255,'; this.coreColor = '#bae6fd'; } else if (typeRand > 0.1) { this.tint = 'rgba(200, 200, 200,'; this.coreColor = '#e2e8f0'; } else { this.tint = 'rgba(50, 255, 150,'; this.coreColor = '#86efac'; } 
      this.radius = Math.random() * 4 + 3; this.size = this.radius; 
      this.vx = (Math.random() - 0.5) * 4; this.vy = (Math.random() - 0.5) * 4; 
      if(Math.abs(this.vx) < 1) this.vx += (this.vx > 0 ? 1 : -1); 
      if(Math.abs(this.vy) < 1) this.vy += (this.vy > 0 ? 1 : -1); 
      this.history = []; 
    }
    update() { 
        this.history.push({x: this.x, y: this.y}); 
        if(this.history.length > 20) { this.history.shift(); } 
        this.x += this.vx; this.y += this.vy; 
        const buffer = 3000; 
        if(this.x < -buffer || this.x > width + buffer || this.y < -buffer || this.y > height + buffer) { this.reset(); } 
    }
    draw() { 
        for(let i = 0; i < this.history.length; i++) { 
            const point = this.history[i]; 
            const opacity = (i + 1) / this.history.length; 
            const trailSize = this.size * ((i+1) / this.history.length) * 0.8; 
            ctx.beginPath(); ctx.fillStyle = `${this.tint} ${opacity * 0.4})`; ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2); ctx.fill(); 
        } 
        ctx.beginPath(); 
        ctx.fillStyle = this.coreColor; ctx.shadowBlur = 15; ctx.shadowColor = this.coreColor; ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 0; 
        ctx.globalAlpha = 1.0; 
    }
  }

  class Nebula {
    constructor() {
      let centerX = Math.random() * width; 
      let centerY = Math.random() * height; 
      
      this.particles = []; 
      const colors = [
          [56, 189, 248], // Sky Blue
          [139, 92, 246], // Purple
          [236, 72, 153], // Pink
          [16, 185, 129]  // Emerald
      ];
      this.col = colors[Math.floor(Math.random() * colors.length)];
      
      const particleCount = 40; 
      for(let i=0; i<particleCount; i++) { 
          this.particles.push(new CloudParticle(centerX, centerY, this.col[0], this.col[1], this.col[2])); 
      }
    }
    update() { this.particles.forEach(p => p.update()); }
    draw() { this.particles.forEach(p => p.draw()); }
  }

  class CloudParticle {
    constructor(cx, cy, r, g, b) { 
        this.x = cx + (Math.random() - 0.5) * 500; 
        this.y = cy + (Math.random() - 0.5) * 500; 
        this.radius = Math.random() * 300 + 150; 
        this.r = r; this.g = g; this.b = b; 
        this.a = Math.random() * 0.015 + 0.005; // Extremely soft opacity
        this.vx = (Math.random() - 0.5) * 0.05; 
        this.vy = (Math.random() - 0.5) * 0.05; 
    }
    update() { 
        this.x += this.vx; this.y += this.vy; 
        const buffer = 500; 
        if(this.x < -buffer) this.x = width + buffer; if(this.x > width + buffer) this.x = -buffer; 
        if(this.y < -buffer) this.y = height + buffer; if(this.y > height + buffer) this.y = -buffer; 
    }
    draw() { 
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius); 
        gradient.addColorStop(0, `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`); 
        gradient.addColorStop(1, `rgba(${this.r}, ${this.g}, ${this.b}, 0)`); 
        ctx.fillStyle = gradient; 
        ctx.beginPath(); 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); 
        ctx.fill(); 
    }
  }

  class Satellite {
    constructor() { this.types = ['shuttle', 'iss', 'hubble', 'jwst', 'voyager', 'sputnik', 'soyuz', 'apollo']; this.reset(); }
    reset() {
        this.type = this.types[Math.floor(Math.random() * this.types.length)];
        const wall = Math.floor(Math.random() * 4);
        let startX, startY, targetX, targetY; const buffer = 150;
        if (wall === 0) { startX = Math.random()*width; startY = -buffer; targetX = Math.random()*width; targetY = height+buffer; }
        else if (wall === 1) { startX = width+buffer; startY = Math.random()*height; targetX = -buffer; targetY = Math.random()*height; }
        else if (wall === 2) { startX = Math.random()*width; startY = height+buffer; targetX = Math.random()*width; targetY = -buffer; }
        else { startX = -buffer; startY = Math.random()*height; targetX = width+buffer; targetY = Math.random()*height; }
        this.x = startX; this.y = startY;
        const dx = targetX - startX; const dy = targetY - startY; const dist = Math.sqrt(dx*dx + dy*dy); const speed = 0.4 + Math.random()*0.3;
        this.vx = (dx/dist)*speed; this.vy = (dy/dist)*speed; this.angle = Math.atan2(this.vy, this.vx); this.scale = 0.8;
        this.name = this.type.toUpperCase(); this.velocity = Math.floor(Math.random()*15000+15000) + ' MPH';
    }
    update() { this.x += this.vx; this.y += this.vy; if (this.x < -200 || this.x > width + 200 || this.y < -200 || this.y > height + 200) { this.reset(); } }
    draw() {
        ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle); ctx.scale(this.scale, this.scale);
        ctx.strokeStyle = '#ccc'; ctx.fillStyle = '#222'; ctx.lineWidth = 1; 
        
        if (this.type === 'shuttle') {
             ctx.rotate(Math.PI/2);
             ctx.beginPath(); ctx.moveTo(0, -40); ctx.quadraticCurveTo(10, -30, 10, 20); ctx.lineTo(-10, 20); ctx.quadraticCurveTo(-10, -30, 0, -40); 
             let g=ctx.createLinearGradient(-10,0,10,0); g.addColorStop(0,'#ddd'); g.addColorStop(0.5,'#fff'); g.addColorStop(1,'#ddd'); ctx.fillStyle=g; ctx.fill(); ctx.stroke();
             ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(35, 20); ctx.lineTo(10, 20); ctx.fillStyle='#eee'; ctx.fill(); ctx.stroke();
             ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(-35, 20); ctx.lineTo(-10, 20); ctx.fill(); ctx.stroke();
             ctx.beginPath(); ctx.arc(0, -40, 3, 0, Math.PI*2); ctx.fillStyle='black'; ctx.fill();
        } else if (this.type === 'iss') {
             ctx.beginPath(); ctx.moveTo(-60,0); ctx.lineTo(60,0); ctx.lineWidth=4; ctx.stroke();
             ctx.fillStyle='#e3f2fd'; ctx.lineWidth=1;
             ctx.fillRect(-50,-20,15,40); ctx.strokeRect(-50,-20,15,40); ctx.fillRect(35,-20,15,40); ctx.strokeRect(35,-20,15,40);
             ctx.fillRect(-10,-5,20,10); ctx.strokeRect(-10,-5,20,10); 
        } else {
             ctx.beginPath(); ctx.arc(0,0,12,0,Math.PI*2); ctx.fill(); ctx.stroke();
        }
        ctx.restore();
    }
  }

  class DartSatellite {
      constructor(targetAsteroid) {
          const edge = Math.floor(Math.random() * 4);
          if (edge === 0) { this.x = Math.random() * width; this.y = -50; } else if (edge === 1) { this.x = width + 50; this.y = Math.random() * height; } else if (edge === 2) { this.x = Math.random() * width; this.y = height + 50; } else { this.x = -50; this.y = Math.random() * height; }
          this.target = targetAsteroid; this.speed = 7; this.dead = false; this.angle = 0;
      }
      update() {
          let dx = this.target.x - this.x; let dy = this.target.y - this.y; let dist = Math.sqrt(dx*dx + dy*dy);
          this.angle = Math.atan2(dy, dx); this.x += Math.cos(this.angle) * this.speed; this.y += Math.sin(this.angle) * this.speed;
          if (dist < 30) { this.dead = true; this.target.reset(); explosions.push(new Explosion(this.x, this.y, '#ef4444')); }
      }
      draw() {
          ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(this.angle + Math.PI/2);
          ctx.fillStyle = '#fff'; ctx.fillRect(-3, -10, 6, 20); ctx.fillStyle = '#38bdf8'; ctx.fillRect(-15, -5, 10, 15); ctx.fillRect(5, -5, 10, 15);
          ctx.restore();
      }
  }

  class Explosion {
      constructor(x, y, color) {
          this.x = x; this.y = y; this.particles = []; this.life = 50; this.color = color || '#fbbf24';
          for(let i=0; i<15; i++) { this.particles.push({ vx: (Math.random()-0.5)*10, vy: (Math.random()-0.5)*10, life: Math.random()*1, size: Math.random()*3+1 }); }
      }
      update() { this.life--; }
      draw() {
          ctx.save(); ctx.translate(this.x, this.y);
          this.particles.forEach(p => { p.life *= 0.9; ctx.fillStyle = this.color; ctx.globalAlpha = p.life; ctx.beginPath(); ctx.arc(p.vx * (50-this.life), p.vy * (50-this.life), p.size, 0, Math.PI*2); ctx.fill(); });
          ctx.restore(); ctx.globalAlpha = 1.0;
      }
  }

  function checkCollisions() {
      for(let i=0; i<asteroids.length; i++) {
          for(let j=i+1; j<asteroids.length; j++) {
              let a1 = asteroids[i]; let a2 = asteroids[j];
              let dx = a1.x - a2.x; let dy = a1.y - a2.y; let dist = Math.sqrt(dx*dx + dy*dy);
              if (dist < (a1.radius + a2.radius)) {
                  let midX = (a1.x + a2.x)/2; let midY = (a1.y + a2.y)/2;
                  explosions.push(new Explosion(midX, midY, a1.color)); a1.reset(); a2.reset();
              }
          }
      }
  }

  function connectStars() {
    ctx.lineWidth = 1;
    for (let a = 0; a < stars.length; a++) {
      if (stars[a].connections >= config.maxConnections) continue;
      for (let b = a + 1; b < stars.length; b++) {
        if (stars[b].connections >= config.maxConnections) continue;
        let dx = stars[a].x - stars[b].x; let dy = stars[a].y - stars[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < config.connectionDistance) {
          let opacity = 1 - (distance / config.connectionDistance);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`; 
          ctx.beginPath(); ctx.moveTo(stars[a].x, stars[a].y); ctx.lineTo(stars[b].x, stars[b].y); ctx.stroke();
          stars[a].connections++; stars[b].connections++;
        }
      }
    }
  }

  function animate() {
    if (!isSpaceMode) { requestAnimationFrame(animate); return; } // Pause physics when hidden
    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1.0; 

    galaxies.forEach(g => { g.update(); g.draw(); });
    nebulas.forEach(neb => { neb.update(); neb.draw(); });
    
    stars.forEach(star => {
        star.update();
    });
    connectStars(); 
    stars.forEach(star => star.draw());
    
    asteroids.forEach(ast => { ast.update(); ast.draw(); });
    comets.forEach(c => { c.update(); c.draw(); });
    satellite.update(); satellite.draw();

    if (Date.now() - lastDartTime > DART_INTERVAL && asteroids.length > 0) {
        let target = asteroids[Math.floor(Math.random() * asteroids.length)];
        darts.push(new DartSatellite(target));
        lastDartTime = Date.now();
    }

    darts.forEach((d, i) => { d.update(); d.draw(); if(d.dead) darts.splice(i,1); });
    explosions.forEach((e, i) => { e.update(); e.draw(); if(e.life <= 0) explosions.splice(i,1); });

    checkCollisions();
    requestAnimationFrame(animate);
  }

  let resizeTimer;
  window.addEventListener('resize', () => { 
      resizeCanvas(); 
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
          initSpace(); 
      }, 250);
  });
  
  resizeCanvas(); 
  
  function initSpace() {
    stars = []; nebulas = []; galaxies = []; asteroids = []; comets = [];
    for (let i = 0; i < config.starCount; i++) stars.push(new Star());
    for (let i = 0; i < config.nebulaCount; i++) nebulas.push(new Nebula());
    for (let i = 0; i < config.galaxyCount; i++) galaxies.push(new Galaxy()); 
    for (let i = 0; i < config.asteroidCount; i++) asteroids.push(new Asteroid());
    for (let i = 0; i < config.cometCount; i++) comets.push(new Comet());
    satellite = new Satellite(); 
  }
  
  initSpace(); 
  animate();
});
