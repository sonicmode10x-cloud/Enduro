/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
      <div className="min-h-screen bg-[#050507] text-[#f4f4f5] selection:bg-[#E10600] selection:text-white font-sans">
        {/* Sticky Navigation */}
        <Navbar onOpenRegisterModal={handleOpenRegisterModal} />

      <main>
        {/* Section 1 & 3: Hero Section */}
        <Hero
          onOpenRegisterModal={handleOpenRegisterModal}
          onOpenProposalModal={handleOpenProposalModal}
        />

        {/* Section 4: Event Achievements & Aerodynamic Ribbon Numbers */}
        <StatsCounter />

        {/* Section 6: The Event Experience / Disciplines */}
        <EventExperiences />

        {/* Section 5: Creating Champions Pillars (matching reference) */}
        <ChampionshipPillars onOpenRegisterModal={handleOpenRegisterModal} />

        {/* Section 7: Race Arena and Event Layout */}
        <TrackArenaMap />

        {/* Section 8: Previous Championship Gallery */}
        <GallerySection />

        {/* Section 9: Influencers and Media */}
        <InfluencersSection onOpenRegisterModal={handleOpenRegisterModal} />

        {/* Section 12: Safety and Event Management */}
        <SafetySection />

        {/* Pre-Footer Action Banner (matching reference) */}
        <PreFooterCta onOpenRegisterModal={handleOpenRegisterModal} />

        {/* Section 15: Contact and Registration */}
        <ContactSection onOpenRegisterModal={handleOpenRegisterModal} />
      </main>

      {/* Section 16: Footer */}
      <Footer
        onOpenRegisterModal={handleOpenRegisterModal}
        onOpenProposalModal={handleOpenProposalModal}
      />

      {/* Multi-Form Registration Modal (Rider, Sponsor, Vendor, Media, General) */}
      <RegistrationModal
        isOpen={registerModalOpen}
        onClose={() => setRegisterModalOpen(false)}
        initialTab={activeFormTab}
      />

      {/* Sponsorship Proposal PDF / Presentation Deck Modal */}
      <ProposalModal
        isOpen={proposalModalOpen}
        onClose={() => setProposalModalOpen(false)}
        onRequestMeeting={() => handleOpenRegisterModal("sponsor")}
      />

      {/* Championship Brand Logo Upload & Customization Modal */}
      <LogoUploadModal />
    </div>
    </LogoProvider>
  );
}
