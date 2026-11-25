import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { PartnerStrip } from "./components/PartnerStrip";
import { StatsCounter } from "./components/StatsCounter";
import { EventExperiences } from "./components/EventExperiences";
import { HimalayanEnduroSection } from "./components/HimalayanEnduroSection";
import { PastEvent2026Section } from "./components/PastEvent2026Section";
import { PastEvent2024Section } from "./components/PastEvent2024Section";
import { TrackArenaMap } from "./components/TrackArenaMap";
import { GallerySection } from "./components/GallerySection";
import { InfluencersSection } from "./components/InfluencersSection";
import { ProposalPage } from "./components/ProposalPage";
import { SafetySection } from "./components/SafetySection";
import { PreFooterCta } from "./components/PreFooterCta";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";
import { RegistrationModal, FormTab } from "./components/RegistrationModal";
import { ProposalModal } from "./components/ProposalModal";
import { LogoProvider } from "./context/LogoContext";
import { LogoUploadModal } from "./components/LogoUploadModal";
import { AdminDashboard } from "./components/AdminDashboard";

type AppView = "home" | "proposal" | "admin";

function resolveAppView(): AppView {
  if (typeof window === "undefined") return "home";
  const hash = window.location.hash.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  if (hash === "#admin" || params.has("admin")) return "admin";
  if (hash === "#proposal" || hash === "#sponsorship-proposal" || params.has("proposal")) {
    return "proposal";
  }
  return "home";
}

export default function App() {
  const [activeView, setActiveView] = useState<AppView>(resolveAppView);

  React.useEffect(() => {
    const syncView = () => {
      setActiveView(resolveAppView());
    };
    window.addEventListener("hashchange", syncView);
    return () => window.removeEventListener("hashchange", syncView);
  }, []);

  const openAdminView = () => {
    window.location.hash = "admin";
    setActiveView("admin");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProposalPage = (sectionId?: string) => {
    window.location.hash = "proposal";
    setActiveView("proposal");
    window.setTimeout(() => {
      if (sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

  const navigateHome = (sectionHash?: string) => {
    const cleanId = sectionHash ? sectionHash.replace(/^#/, "") : "";
    if (cleanId && cleanId !== "hero") {
      window.history.replaceState(
        null,
        "",
        `${window.location.pathname}${window.location.search}#${cleanId}`
      );
    } else {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    setActiveView("home");

    window.setTimeout(() => {
      if (cleanId) {
        const target = document.getElementById(cleanId);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 60);
  };

  const exitAdminView = () => {
    navigateHome();
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
      {activeView === "admin" ? (
        <AdminDashboard
          onExitAdmin={exitAdminView}
          onOpenRegisterModal={handleOpenRegisterModal}
        />
      ) : (
        <div className="min-h-screen bg-[#EAE8E3] text-zinc-900 selection:bg-[#D60A19] selection:text-white font-sans">
          {/* Clean Minimal Sticky Navigation */}
          <Navbar
            onOpenRegisterModal={handleOpenRegisterModal}
            activeView={activeView}
            onNavigateHome={navigateHome}
            onNavigateProposal={openProposalPage}
          />

          {activeView === "proposal" ? (
            <main>
              <ProposalPage
                onBackToHome={() => navigateHome()}
                onOpenRegisterModal={handleOpenRegisterModal}
                onOpenProposalModal={handleOpenProposalModal}
              />
            </main>
          ) : (
            <main>
              {/* Hero Section */}
              <Hero
                onOpenRegisterModal={handleOpenRegisterModal}
                onOpenProposalModal={handleOpenProposalModal}
              />

              {/* Official Organizers & Sanctioning Partner Strip */}
              <PartnerStrip />

              {/* Information & Benchmarks Card */}
              <StatsCounter />

              {/* Event Experiences Showcase Grid */}
              <EventExperiences />

              {/* Upcoming Events 2027: Himalayan Enduro Pokhara & Everest */}
              <HimalayanEnduroSection onOpenRegisterModal={handleOpenRegisterModal} />

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
          )}

          {/* Matte Charcoal Footer */}
          <Footer
            onOpenRegisterModal={handleOpenRegisterModal}
            onOpenProposalModal={handleOpenProposalModal}
            onOpenAdminConsole={openAdminView}
            onNavigateHome={navigateHome}
            onNavigateProposal={openProposalPage}
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
