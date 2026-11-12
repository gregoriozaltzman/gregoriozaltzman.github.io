import { useState, useEffect } from "react";
import SpaceCanvas from "./components/canvas/SpaceCanvas";
import JamHeader from "./components/layout/JamHeader";
import MorphingHeroTitle from "./components/hero/MorphingHeroTitle";
import JamHero from "./components/hero/JamHero";
import JamProjects from "./components/projects/JamProjects";
import JamExperience from "./components/experience/JamExperience";
import JamMilestones from "./components/milestones/JamMilestones";
import JamSkills from "./components/skills/JamSkills";
import JamAbout from "./components/about/JamAbout";
import JamContact from "./components/contact/JamContact";
import JamFooter from "./components/layout/JamFooter";

const SECTION_IDS = [
  "projects",
  "experience",
  "milestones",
  "skills",
  "about",
  "contact",
];

export default function App() {
  const [activeSection, setActiveSection] = useState("projects");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const id = SECTION_IDS[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#030304] text-white selection:bg-white/20 selection:text-white relative overflow-x-hidden">
      {/* 1. Deep Space Canvas: High-density stars, subtle cosmic nebulae, constellations, satellites & meteors */}
      <SpaceCanvas />

      {/* 2. Unified Right Header Navigation */}
      <JamHeader
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />

      {/* 3. Morphing Hero Title: Seen morphing and shrinking in height from hero into top-left bar */}
      <MorphingHeroTitle />

      {/* 4. Continuous Vertical Editorial Layout with Smooth Scrolling Animations */}
      <main className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 relative z-10 flex flex-col">
        {/* Hero Bio & Actions */}
        <JamHero />

        {/* 01: Projects (Rounded Modal, High-Level Summaries, Filter Pills) */}
        <JamProjects />

        {/* 02: Experience */}
        <JamExperience />

        {/* 03: Milestones (Vertical Timeline for Each Chapter) */}
        <JamMilestones />

        {/* 04: Skills */}
        <JamSkills />

        {/* 05: About Profile */}
        <JamAbout />

        {/* 06: Contact Transmission Form */}
        <JamContact />

        {/* 07: Editorial Swiss Footer */}
        <JamFooter />
      </main>
    </div>
  );
}