---
name: aerospace-web-design
description: Guidelines, design tokens, and frontend engineering principles for high-end aerospace, scientific, and engineering portfolio websites.
---

# Aerospace & Scientific Web Design Skill Guide

This skill governs the aesthetic, interactive design, and technical frontend implementation for cutting-edge aerospace and engineering portfolios.

---

## 1. Core Visual Aesthetic: "Flight Deck & Telemetry"

- **Color Palette & Contrast**:
  - Pure Void Backgrounds: `#000000`, `#030303`, `#070707`
  - Structural Grids & Dividers: `white/10`, `white/15`, subtle chamfer borders
  - Active Telemetry Accents:
    - **Sky / Orbit**: `#38bdf8` / `#0284c7` (Space Systems, Orbits, Future Horizons)
    - **Emerald / Sensor**: `#10b981` / `#22c55e` (Active Studies, Validated Metrics, Compliant Loads)
    - **Amber / Caution**: `#f59e0b` (Flight Envelope Limits, Warning Thresholds)
- **Typography Hierarchy**:
  - Primary Headings: Clean, geometric sans-serif with tight tracking (`tracking-[-0.04em]`).
  - Telemetry & Data Badges: Monospace fonts (`font-mono`) with uppercase micro-labels (`tracking-[0.2em] text-[10px] sm:text-xs`).
  - Body: High-legibility sans-serif with light weight (`font-light text-zinc-300`).
- **Aerospace Geometry**:
  - Chamfered box corners (`clip-path` or chamfer pill borders).
  - Tactical crosshairs, coordinate badges (e.g. `[LAT 32.8801° N]`, `[REV 04/2026]`).
  - Dynamic ambient glows positioned behind key hardware / diagrams.

---

## 2. Interactive 3D & Hardware Presentation

- **Model Viewer & WebGL**:
  - Keep 3D `.glb` models interactive with touch/mouse rotation, inertia damping, and auto-rotate when idle.
  - Provide interactive camera presets (e.g., Top View / Planform, Side Elevation, Isometric, Engine Aft).
  - Render wireframe or technical cross-section views where appropriate.
- **Blueprint & CAD Schematics**:
  - Clean SVG diagrams with glowing node connection points.
  - Exploded view callouts and dimension leader lines.

---

## 3. Motion & Scrollytelling (Framer Motion)

- **Spring-Based Physics**:
  - Prefer smooth spring transitions (`stiffness: 260, damping: 20`) over abrupt ease curves.
  - Staggered entrances for project dossier sections (`staggerChildren: 0.08`).
- **Interactive Micro-Interactions**:
  - Cursor-tracking dynamic glows (`DynamicGlow.jsx`) on hoverable cards.
  - Blinking telemetry indicators for active status and live states.
  - Smooth modal transitions with backdrop blur (`backdrop-blur-xl`).

---

## 4. Engineering Data Storytelling

- Every project should highlight **tangible quantitative outcomes**:
  - Equations, coefficients, and convergence figures ($L/D = 25.30$, $C_{D,0} = 0.0049$, $\Delta V$).
  - Interactive data charts (mass distributions, stability derivatives, drag polars).

---

## 5. Strict Anti-AI Clutter Directives (Mandatory User Rule)

- **NEVER use generic "AI-style" header pills or micro-badges**:
  - For example: `[HORIZON // ...]`, `[VERIFIED DATA]`, or decorative pill chips floating above section titles. The user explicitly dislikes these as "super AI" and synthetic.
  - Keep section headings and card titles clean, authentic, and uncluttered.
- **Natural, Human Technical Phrasing**:
  - When describing aerospace career focus and ambitions, frame around **"space exploration and scientific missions"** and European sovereign initiatives (ESA, EUSPA) in clean prose.
- **Genuine University & Institutional Identity**:
  - Use official institution logos (e.g., TUM and UC San Diego) within circular profile badges rather than generic placeholder icons.
  - Clear methodology workflows (e.g., Initial Sizing → OpenVSP Loft → AVL Trim → MDO Optimization → Flight Testing).
