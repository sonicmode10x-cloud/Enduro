import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PartnerStrip } from "./components/PartnerStrip";
import { StatsCounter } from "./components/StatsCounter";
import { EventExperiences } from "./components/EventExperiences";
import { UpcomingEventsSection } from "./components/UpcomingEventsSection";
import { PastEvent2026Section } from "./components/PastEvent2026Section";
import { PastEvent2024Section } from "./components/PastEvent2024Section";
import { TrackArenaMap } from "./components/TrackArenaMap";
import { GallerySection } from "./components/GallerySection";
import { InfluencersSection } from "./components/InfluencersSection";
import { SafetySection } from "./components/SafetySection";
import { PreFooterCta } from "./components/PreFooterCta";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { RegistrationModal, FormTab } from "./components/RegistrationModal";
import { ProposalModal } from "./components/ProposalModal";
import { LogoProvider } from "./context/LogoContext";
import { LogoUploadModal } from "./components/LogoUploadModal";
import { AdminDashboard } from "./components/AdminDashboard";

export default function App() {
  const [isAdminView, setIsAdminView] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return (
      window.location.hash === "#admin" ||
      new URLSearchParams(window.location.search).has("admin")
    );
  });

  React.useEffect(() => {
    const syncHash = () => {
      setIsAdminView(
        window.location.hash === "#admin" ||
          new URLSearchParams(window.location.search).has("admin")
      );
    };
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  const openAdminView = () => {
    window.location.hash = "admin";
    setIsAdminView(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const exitAdminView = () => {
    if (window.location.hash === "#admin") {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setIsAdminView(false);
  };
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<FormTab>("rider");
  const [selectedEventName, setSelectedEventName] = useState<string>("Extreme Moto Enduro Cross 2027");
  const [proposalModalOpen, setProposalModalOpen] = useState(false);

  const handleOpenRegisterModal = (
    defaultTab: FormTab = "rider",
    eventName: string = "Extreme Moto Enduro Cross 2027"
  ) => {
    setActiveFormTab(defaultTab);
    setSelectedEventName(eventName);
    setRegisterModalOpen(true);
  };

  const handleOpenProposalModal = () => {
    setProposalModalOpen(true);
  };

  return (
    <LogoProvider>
      {isAdminView ? (
        <AdminDashboard
          onExitAdmin={exitAdminView}
          onOpenRegisterModal={handleOpenRegisterModal}
        />
      ) : (
        <div className="min-h-screen bg-[#EAE8E3] text-zinc-900 selection:bg-[#D60A19] selection:text-white font-sans">
          {/* Clean Minimal Sticky Navigation */}
          <Navbar onOpenRegisterModal={handleOpenRegisterModal} />

        <main>
          {/* Hero Section */}
          <Hero
            onOpenRegisterModal={handleOpenRegisterModal}
            onOpenProposalModal={handleOpenProposalModal}
          />

          {/* Official Organizers & Sanctioning Partner Strip */}
          <PartnerStrip />

          {/* Upcoming Events Calendar (2027 Season) */}
          <UpcomingEventsSection onOpenRegisterModal={handleOpenRegisterModal} />

          {/* Information & Benchmarks Card */}
          <StatsCounter />

          {/* Event Experiences Showcase Grid */}
          <EventExperiences />

          {/* Past Event Archive: Moto Enduro 2026 */}
          <PastEvent2026Section />

          {/* Past Event Archive: Moto Enduro 2024 */}
          <PastEvent2024Section />

          {/* Official Pokhara Circuit Map & Telemetry */}
          <TrackArenaMap />

          {/* Non-Clickable Championship Photo Gallery */}
          <GallerySection />

          {/* Influencers & Digital Media Reach */}
          <InfluencersSection />

          {/* FIM Safety & Event Management Standards */}
          <SafetySection />

          {/* Contact & Rapid Registration Portals */}
          <ContactSection onOpenRegisterModal={handleOpenRegisterModal} />

          {/* Floating Pre-Footer Registration Banner overlapping Footer */}
          <PreFooterCta onOpenRegisterModal={handleOpenRegisterModal} />
        </main>

        {/* Matte Charcoal Footer */}
        <Footer
          onOpenRegisterModal={handleOpenRegisterModal}
          onOpenProposalModal={handleOpenProposalModal}
          onOpenAdminConsole={openAdminView}
        />
        </div>
      )}

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialTab={activeFormTab}
        initialEvent={selectedEventName}
      />

      {/* Sponsorship Proposal Modal */}
      <ProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        onRequestMeeting={() => handleOpenRegisterModal("sponsor")}
      />

      {/* Championship Logo Modal */}
      <LogoUploadModal />
    </LogoProvider>
  );
}
