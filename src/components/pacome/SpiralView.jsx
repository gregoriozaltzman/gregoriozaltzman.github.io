import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Compass, ArrowUpRight, Play, Pause } from "lucide-react";

export default function SpiralView({ projects, onSelectProject }) {
  const containerRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);

  const stateRef = useRef({
    scene: null,
    camera: null,
    renderer: null,
    cards: [],
    scrollOffset: 0,
    targetScrollOffset: 0,
    wheelDelta: 0,
    autoSpeed: 0.003,
    isHovered: false,
    isDragging: false,
    dragStartY: 0,
    raycaster: new THREE.Raycaster(),
    mouse: new THREE.Vector2(-1000, -1000),
    hoveredIndex: -1,
  });

  const numProjects = projects.length;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup (Pacôme camera FOV & distance)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(width < 768 ? 45 : 34, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);
    camera.lookAt(0, 0, 0);

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(8, 10, 8);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x00e5ff, 1.5);
    dirLight2.position.set(-8, -6, -4);
    scene.add(dirLight2);

    // 4. Create 3D Project Cards using Pacôme's Exact Helical Geometry
    const textureLoader = new THREE.TextureLoader();
    const cards = [];
    const cardWidth = 2.4;
    const cardHeight = 1.5;
    const cardGeo = new THREE.PlaneGeometry(cardWidth, cardHeight);
    const frameGeo = new THREE.EdgesGeometry(cardGeo);

    projects.forEach((proj, index) => {
      const texture = textureLoader.load(proj.image || "/assets/bwb.jpg");
      texture.colorSpace = THREE.SRGBColorSpace;

      const cardMat = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.3,
        metalness: 0.1,
        side: THREE.DoubleSide,
      });

      const mesh = new THREE.Mesh(cardGeo, cardMat);
      mesh.userData = { project: proj, index };

      // Electric-Cyan Border Frame
      const frameMat = new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.25,
        linewidth: 2,
      });
      const frame = new THREE.LineSegments(frameGeo, frameMat);
      frame.position.z = 0.012;
      mesh.add(frame);
      mesh.userData.frame = frame;

      scene.add(mesh);
      cards.push(mesh);
    });

    stateRef.current = {
      ...stateRef.current,
      scene,
      camera,
      renderer,
      cards,
    };

    // 5. Input Listeners
    const handleWheel = (e) => {
      e.preventDefault();
      stateRef.current.wheelDelta += e.deltaY * 0.0015;
    };

    const handlePointerDown = (e) => {
      stateRef.current.isDragging = true;
      stateRef.current.dragStartY = e.clientY;
    };

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      stateRef.current.mouse.set(x, y);

      if (stateRef.current.isDragging) {
        const deltaY = e.clientY - stateRef.current.dragStartY;
        stateRef.current.wheelDelta += deltaY * 0.004;
        stateRef.current.dragStartY = e.clientY;
      }
    };

    const handlePointerUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleClick = () => {
      const { raycaster, mouse, camera, cards } = stateRef.current;
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cards);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.project) {
          onSelectProject(hit.userData.project);
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("click", handleClick);

    // 6. Animation Loop (Pacôme's exact cylindrical helical formulas)
    let animationFrameId;
    const baseRadius = 3.6;
    const verticalGap = 0.62;
    const angleGap = 0.72; // radians separation
    const centerIndex = numProjects / 2;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const st = stateRef.current;

      // Auto-drift when not actively interacting
      if (!st.isHovered && isAutoScrolling && !st.isDragging) {
        st.scrollOffset += st.autoSpeed;
      }

      // Smooth inertia momentum
      st.scrollOffset += st.wheelDelta;
      st.wheelDelta *= 0.9;

      // Subtle mouse parallax
      st.camera.position.x = THREE.MathUtils.lerp(st.camera.position.x, st.mouse.x * 0.4, 0.05);
      st.camera.position.y = THREE.MathUtils.lerp(st.camera.position.y, st.mouse.y * 0.3, 0.05);
      st.camera.lookAt(0, 0, 0);

      // Position ALL cards simultaneously along the cylindrical helix
      st.cards.forEach((card) => {
        let N = card.userData.index - st.scrollOffset;
        N = ((N % numProjects) + numProjects) % numProjects;
        const B = N - centerIndex;

        const U = B * verticalGap;
        const V = B * angleGap;
        const H = Math.cos(V);
        const W = Math.sin(V);

        card.position.set(H * baseRadius, U, W * baseRadius);
        card.rotation.y = -V + Math.PI / 2;

        // Depth perspective opacity
        const dist = card.position.distanceTo(st.camera.position);
        card.material.opacity = THREE.MathUtils.clamp(1.2 - dist / 14, 0.25, 1);
        card.material.transparent = true;
      });

      // Raycasting Hover Detection
      st.raycaster.setFromCamera(st.mouse, st.camera);
      const intersects = st.raycaster.intersectObjects(st.cards);

      if (intersects.length > 0) {
        const topHit = intersects[0].object;
        const hitIdx = topHit.userData.index;

        st.isHovered = true;
        if (st.hoveredIndex !== hitIdx) {
          st.hoveredIndex = hitIdx;
          setHoveredProject(topHit.userData.project);
        }

        st.cards.forEach((card, i) => {
          if (i === hitIdx) {
            card.scale.set(1.2, 1.2, 1.2);
            card.userData.frame.material.opacity = 1.0;
            card.userData.frame.material.color.setHex(0x00e5ff);
          } else {
            card.scale.set(1, 1, 1);
            card.userData.frame.material.opacity = 0.25;
            card.userData.frame.material.color.setHex(0x38bdf8);
          }
        });
        container.style.cursor = "pointer";
      } else {
        if (st.hoveredIndex !== -1) {
          st.isHovered = false;
          st.hoveredIndex = -1;
          setHoveredProject(null);
          st.cards.forEach((card) => {
            card.scale.set(1, 1, 1);
            card.userData.frame.material.opacity = 0.25;
            card.userData.frame.material.color.setHex(0x38bdf8);
          });
          container.style.cursor = "grab";
        }
      }

      st.renderer.render(st.scene, st.camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("click", handleClick);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [projects, numProjects, onSelectProject, isAutoScrolling]);

  return (
    <div className="relative w-full h-[84vh] sm:h-[88vh] min-h-[600px] overflow-hidden select-none bg-transparent">
      {/* 3D WebGL Canvas */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Subtle Top Control */}
      <div className="absolute top-4 right-6 pointer-events-auto">
        <button
          onClick={() => setIsAutoScrolling(!isAutoScrolling)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400 hover:text-white transition-all"
        >
          {isAutoScrolling ? <Pause size={10} /> : <Play size={10} />}
          <span>{isAutoScrolling ? "pause flow" : "resume flow"}</span>
        </button>
      </div>

      {/* Active Project Highlight Card Overlay */}
      {hoveredProject && (
        <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md pointer-events-auto">
          <div
            onClick={() => onSelectProject(hoveredProject)}
            className="p-5 rounded-2xl bg-[#080808]/95 backdrop-blur-2xl border border-sky-400/60 shadow-[0_0_35px_rgba(0,229,255,0.25)] cursor-pointer transition-all hover:border-sky-300 group space-y-2"
          >
            <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                #{hoveredProject.tag} · {hoveredProject.category}
              </span>
              <span className="text-xs text-zinc-400 font-light flex items-center gap-1 group-hover:text-white transition-colors">
                <span>View Project</span>
                <ArrowUpRight size={13} className="text-sky-400" />
              </span>
            </div>

            <h4 className="text-base sm:text-xl font-semibold text-white tracking-tight group-hover:text-sky-300 transition-colors">
              {hoveredProject.title}
            </h4>
          </div>
        </div>
      )}
    </div>
  );
}
