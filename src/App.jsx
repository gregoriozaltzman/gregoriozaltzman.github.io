import SpaceCanvas from "./components/canvas/SpaceCanvas";
import Sidebar from "./components/layout/Sidebar";
import MobileNav from "./components/layout/MobileNav";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import ProjectGrid from "./components/projects/ProjectGrid";
import FlightDeck from "./components/simulations/FlightDeck";
import Experience from "./components/experience/Experience";
import SkillsMatrix from "./components/skills/SkillsMatrix";
import Timeline from "./components/timeline/Timeline";
import Aspirations from "./components/aspirations/Aspirations";
import ContactForm from "./components/contact/ContactForm";

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
          {/* Section 01: Engineering Projects & Dossiers */}
          <ProjectGrid />

          {/* Section 02: Interactive Aerospace Simulation Lab */}
          <FlightDeck />

          {/* Section 03: Practical Engineering Experience */}
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