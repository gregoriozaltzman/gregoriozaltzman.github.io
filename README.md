# Gregorio Zaltzman D'Ambrosio — Aerospace Engineering Portfolio

An aerospace engineering portfolio and technical project archive showcasing aircraft conceptual design, multidisciplinary design optimization (MDO), computational fluid dynamics (CFD), structural sizing, experimental wind tunnel testing, and spacecraft systems.

## Key Features

- **Cosmic Space Background Engine**: High-performance HTML5 Canvas rendering twinkling starfields, glowing nebulae, rotating galaxies, tumbling 3D asteroids, comets, and shooting stars with automatic tab-visibility throttling.
- **Aerospace Telemetry Design System**: Custom HUD aesthetics featuring 45° chamfered clip-paths (`chamfer-box`, `chamfer-clip`, `chamfer-pill`, `chamfer-tag`), dynamic cursor radial spotlight tracking, glassmorphism panels, and live telemetry beacons.
- **Interactive Engineering Dossier System**:
  - Full-screen multi-tab dossiers for 9 major projects.
  - Interactive 3D Model viewer (`<model-viewer>`) with orbital rotation and camera reset controls.
  - Multi-image gallery and video playback.
  - Interactive MATLAB code terminal with typewriter animation and one-click copy.
  - Keyboard navigation shortcuts (`←` Previous, `→` Next, `Esc` Close).
  - Direct downloads for technical whitepapers and executive PDF reports.
- **Interactive Engineering & Leadership Experience**: Comprehensive cards for Design-Build-Fly (DBF) and UCSD ITS Service Desk Lead.
- **Skills Matrix with Filtering**: Software & CAD, Analysis & Simulation, Hardware & Lab, and Languages with category filter chips and glowing badges.
- **Milestone Trajectory Timeline**: Chronological path from UCSD B.S. '22 to TUM M.S. '28.
- **Aspirations & Mission Statement**: Vision card focused on next-generation astronautical vehicles and deep space exploration.
- **Direct Comm Link Contact**: Chamfered contact form integrated with Formspree AJAX submission, real-time loading spinner, and transmission feedback.
- **Responsive Navigation**: Desktop sticky sidebar with live scroll-spy navigation, plus mobile HUD header and slide-down drawer.

---

## Technical Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS + Custom Aerospace HUD Chamfers & Design Tokens
- **Animations**: Framer Motion (spring dynamics, staggered typography, modal transitions)
- **3D Graphics**: `@google/model-viewer` (Web Component for interactive `.glb` inspection)
- **Icons**: Lucide Icons + Custom Vector SVG Social Icons
- **Linting**: Oxlint

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev
```

### Production Build

```bash
# Run linter
npm run lint

# Build optimized production bundle to dist/
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment (GitHub Pages)

The production build in `dist/` is ready to be deployed directly to GitHub Pages or any static hosting provider (Vercel, Netlify, Cloudflare Pages).
