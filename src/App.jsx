import SpaceCanvas from "./components/canvas/SpaceCanvas";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import ProjectGrid from "./components/projects/ProjectGrid";
import Experience from "./components/experience/Experience";
import SkillsMatrix from "./components/skills/SkillsMatrix";
import Timeline from "./components/timeline/Timeline";
import Aspirations from "./components/aspirations/Aspirations";
import ContactForm from "./components/contact/ContactForm";
import Typewriter from "./components/ui/Typewriter";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-sky-500/30 selection:text-white relative">
      {/* Dynamic Cosmic Space Background */}
      <SpaceCanvas />

      {/* Mobile Top Navigation */}
      <MobileNav />

      {/* Main Dual-Column Aerospace Application Layout */}
      <div className="flex flex-col lg:flex-row lg:items-start relative z-10 max-w-[1600px] mx-auto">
        {/* Sticky Sidebar on Desktop */}
        <Sidebar />

        {/* Primary Content Stream */}
        <main className="w-full lg:w-[64%] xl:w-[68%] p-6 sm:p-10 lg:p-14 xl:p-16 space-y-24 sm:space-y-32">
          {/* Clean Focus Header */}
          <div className="p-6 sm:p-8 chamfer-box border border-white/10 bg-white/[0.02] backdrop-blur-md">
            <div className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              <span className="font-semibold text-white">Focus: </span>
              <Typewriter
                text="Aircraft design, aerodynamics, space systems, and spacecraft engineering."
                delay={0.4}
                speed={25}
              />
            </div>
          </div>

          {/* Section 01: Engineering Projects & Dossiers */}
          <ProjectGrid />

          {/* Section 02: Practical Engineering Experience */}
          <Experience />

          {/* Section 03: Skills Matrix */}
          <SkillsMatrix />

          {/* Section 04: Engineering Trajectory & Timeline */}
          <Timeline />

          {/* Section 05: Space Aspirations & TUM 2028 */}
          <Aspirations />

          {/* Section 06: Contact Link */}
          <ContactForm />

          {/* Site Footer */}
          <Footer />
        </main>
      </div>

      {/* Floating Scroll to Top Action */}
      <ScrollToTop />
    </div>
  );
}