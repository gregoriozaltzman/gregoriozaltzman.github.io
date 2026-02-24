# Aerospace Engineering Portfolio | Gregorio Zaltzman D'Ambrosio

![Portfolio Preview](assets/screenshot.jpg) **Live Demo:** [gregoriozaltzman.github.io](https://gregoriozaltzman.github.io) A high-performance, interactive web portfolio built to showcase aerospace engineering concepts, CAD modeling, and simulation-driven design. Engineered with a "stealth aerospace startup" aesthetic, the site features a custom interactive physics canvas, dynamic glassmorphism, and native synthetic audio.

## 🚀 Key Features

* **Interactive WebGL Space Engine:** A lightweight, custom 2D `<canvas>` engine rendering a dynamic background of twinkling stars, multi-color volumetric gas nebulas, comets, and destructible asteroids.
* **Acoustic UI (Web Audio API):** Zero-dependency synthetic audio generates mechanical UI clicks and deep space thuds in real-time using mathematical sine waves (no `.mp3` assets required).
* **Dynamic Glassmorphism & Telemetry Tracking:** Frosted glass UI panels (`backdrop-filter`) combined with a custom JavaScript mouse-tracking effect that projects a subtle "flashlight" glow on the edges of cards as the user hovers.
* **3D CAD Integration:** Immersive split-screen modals featuring interactive 3D model viewing via Google's `<model-viewer>` component.
* **Asymmetrical Dossier Layout:** Native smooth scrolling with Intersection Observer-based scroll-spy navigation, pure CSS parallax image effects, and a responsive data-driven grid.
* **Accessibility & Performance:** Includes a debounced resize listener to prevent memory leaks and strict `prefers-reduced-motion` compliance to disable complex animations for sensitive users.
* **Terminal-Themed 404 Page:** A custom error page designed as a "lost signal" telemetry readout.

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and `<canvas>` integration.
* **CSS3:** CSS Grid, Flexbox, custom properties (variables), Glassmorphism, and fluid typography (`clamp()`).
* **Vanilla JavaScript (ES6+):** Object-oriented physics engine, DOM manipulation, Intersection Observers, and Web Audio API. 
* **Model-Viewer:** For rendering interactive `.glb` 3D files.

## 📁 Project Structure

```text
├── index.html          # Main portfolio layout and content
├── 404.html            # Custom telemetry-themed error page
├── styles.css          # Global styling, layout grids, and animations
├── script.js           # Interactive UI logic, Space Engine, and Audio API
└── assets/             # Images, CAD files (.glb), and PDF reports
