import { useEffect, useRef } from "react";
import * as THREE from "three";

const orbitRadii = {
  projects: 3.8,
  experience: 6.2,
  milestones: 8.6,
  skills: 11.0,
  about: 13.4,
  contact: 15.8,
};

const cameraPositions = {
  projects: { x: 0, y: 1.8, z: 9.5, lookY: 0 },
  experience: { x: 2.5, y: 3.2, z: 12.0, lookY: 0.5 },
  milestones: { x: -3.0, y: 2.8, z: 14.0, lookY: -0.2 },
  skills: { x: 0, y: 4.5, z: 16.0, lookY: 0 },
  about: { x: 3.5, y: 2.2, z: 15.5, lookY: 0.2 },
  contact: { x: 0, y: 2.0, z: 14.0, lookY: 0 },
};

export default function StarSystemCanvas({ activeSection = "projects" }) {
  const canvasRef = useRef(null);
  const activeSectionRef = useRef(activeSection);
  activeSectionRef.current = activeSection;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 9.5);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3. Central Celestial Star (Core + Glowing Corona)
    const starGroup = new THREE.Group();

    // Inner glowing core
    const coreGeo = new THREE.SphereGeometry(0.85, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    starGroup.add(coreMesh);

    // Outer plasma corona
    const coronaGeo = new THREE.SphereGeometry(1.25, 32, 32);
    const coronaMat = new THREE.MeshBasicMaterial({
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.25,
      side: THREE.BackSide,
    });
    const coronaMesh = new THREE.Mesh(coronaGeo, coronaMat);
    starGroup.add(coronaMesh);

    // Coronal Halo Ring
    const haloGeo = new THREE.RingGeometry(1.1, 2.2, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.18,
      side: THREE.DoubleSide,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    haloMesh.rotation.x = Math.PI / 2.3;
    starGroup.add(haloMesh);

    scene.add(starGroup);

    // 4. Concentric 3D Orbital Rings & Satellite Nodes
    const orbitMeshes = [];
    const satellites = [];

    Object.entries(orbitRadii).forEach(([secId, radius], idx) => {
      // Orbital Ring Path
      const ringGeo = new THREE.RingGeometry(radius - 0.012, radius + 0.012, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.12,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      orbitMeshes.push({ secId, ring });

      // Revolving Satellite / Station Node along the orbit
      const satGeo = new THREE.SphereGeometry(0.08 + idx * 0.015, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: secId === "projects" ? 0x00e5ff : 0x38bdf8,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      scene.add(sat);
      satellites.push({
        secId,
        mesh: sat,
        radius,
        speed: 0.18 / (idx + 1),
        angle: (idx * Math.PI) / 3,
      });
    });

    // 5. Deep Space 3D Starfield
    const starCount = 1800;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const dist = 25 + Math.random() * 50;
      starPositions[i * 3] = dist * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = dist * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = dist * Math.cos(phi);
    }
    const starFieldGeo = new THREE.BufferGeometry();
    starFieldGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    const starFieldMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.07,
      transparent: true,
      opacity: 0.65,
    });
    const starField = new THREE.Points(starFieldGeo, starFieldMat);
    scene.add(starField);

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 6. Animation Loop with Smooth Camera Orbital Lerp
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Rotate Star & Corona
      starGroup.rotation.y += delta * 0.2;
      haloMesh.rotation.z += delta * 0.15;
      starField.rotation.y += delta * 0.02;

      // Orbit Satellites around Star
      satellites.forEach((sat) => {
        sat.angle += delta * sat.speed;
        sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
        sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
        sat.mesh.position.y = Math.sin(sat.angle * 2) * 0.35;
      });

      // Highlight active orbit ring
      const currentSec = activeSectionRef.current;
      orbitMeshes.forEach(({ secId, ring }) => {
        const isActive = secId === currentSec;
        ring.material.opacity = THREE.MathUtils.lerp(
          ring.material.opacity,
          isActive ? 0.45 : 0.08,
          0.06
        );
        ring.material.color.setHex(isActive ? 0x00e5ff : 0x38bdf8);
      });

      // Smooth Camera Transition to Active Orbital Deck
      const targetCam = cameraPositions[currentSec] || cameraPositions.projects;
      const targetX = targetCam.x + mouseX * 0.4;
      const targetY = targetCam.y + mouseY * 0.3;
      const targetZ = targetCam.z;

      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.position.z += (targetZ - camera.position.z) * 0.04;
      camera.lookAt(0, targetCam.lookY, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
