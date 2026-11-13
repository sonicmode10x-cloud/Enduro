import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { StatsCounter } from "./components/StatsCounter";
import { EventExperiences } from "./components/EventExperiences";
import { ChampionshipPillars } from "./components/ChampionshipPillars";
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

export default function App() {
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState<FormTab>("rider");
  const [proposalModalOpen, setProposalModalOpen] = useState(false);

  const handleOpenRegisterModal = (defaultTab: FormTab = "rider") => {
    setActiveFormTab(defaultTab);
    setRegisterModalOpen(true);
  };

  const handleOpenProposalModal = () => {
    setProposalModalOpen(true);
  };

  return (
    <LogoProvider>
      <div className="min-h-screen bg-[#EAE8E3] text-zinc-900 selection:bg-[#D60A19] selection:text-white font-sans">
        {/* Clean Minimal Sticky Navigation */}
        <Navbar onOpenRegisterModal={handleOpenRegisterModal} />

        <main>
          {/* Hero Section */}
          <Hero
            onOpenRegisterModal={handleOpenRegisterModal}
            onOpenProposalModal={handleOpenProposalModal}
          />

          {/* Floating Information & Benchmarks Overlap Card */}
          <StatsCounter />

          {/* Event Experiences Showcase Grid */}
          <EventExperiences />

          {/* Split Red & Charcoal Feature Banner: Creating Champions */}
          <ChampionshipPillars onOpenRegisterModal={handleOpenRegisterModal} />

          {/* Official Pokhara Circuit Map & Telemetry */}
          <TrackArenaMap />

          {/* Championship Visual Archive */}
          <GallerySection />

          {/* Influencers & Digital Media Reach */}
          <InfluencersSection onOpenRegisterModal={handleOpenRegisterModal} />

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
        />

        {/* Registration Modal */}
        <RegistrationModal
          isOpen={registerModalOpen}
          onClose={() => setRegisterModalOpen(false)}
          initialTab={activeFormTab}
        />

        {/* Sponsorship Proposal Modal */}
        <ProposalModal
          isOpen={proposalModalOpen}
          onClose={() => setProposalModalOpen(false)}
          onRequestMeeting={() => handleOpenRegisterModal("sponsor")}
        />

        {/* Championship Logo Modal */}
        <LogoUploadModal />
      </div>
    </LogoProvider>
  );
}
