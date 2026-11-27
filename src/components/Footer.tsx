import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { Youtube, Instagram, MessageCircle, ArrowUp, Lock } from "lucide-react";
import { FormTab } from "./RegistrationModal";
import { useBrandLogo } from "../context/LogoContext";

interface FooterProps {
  onOpenRegisterModal: (defaultTab?: FormTab) => void;
  onOpenProposalModal: () => void;
  onOpenAdminConsole?: () => void;
  onOpenXtremeProposal?: () => void;
  onNavigateHome?: (sectionHash?: string) => void;
  onNavigateProposal?: (sectionId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegisterModal,
  onOpenProposalModal,
  onOpenAdminConsole,
  onOpenXtremeProposal,
  onNavigateHome,
  onNavigateProposal
}) => {
  const { logoConfig } = useBrandLogo();
  const { championship } = EVENT_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero", isPage: false },
    { name: "Upcoming Events", href: "#himalayan-enduro", isPage: false },
    { name: "Moto Enduro", href: "#experiences", isPage: false },
    { name: "2026 Edition", href: "#moto-enduro-2026", isPage: false },
    { name: "2024 Edition", href: "#moto-enduro-2024", isPage: false },
    { name: "Race Map", href: "#arena-layout", isPage: false },
    { name: "Brochure", href: "#proposal", isPage: true, sectionId: "brochure" },
    { name: "Sponsorship Proposals", href: "#proposal", isPage: true },
    { name: "Gallery", href: "#gallery", isPage: false },
    { name: "Media", href: "#influencers", isPage: false },
    { name: "Contact", href: "#contact", isPage: false }
  ];

  const handleFooterLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; isPage: boolean; sectionId?: string }
  ) => {
    if (link.isPage && onNavigateProposal) {
      e.preventDefault();
      onNavigateProposal(link.sectionId);
      return;
    }
    if (!link.isPage && onNavigateHome) {
      e.preventDefault();
      onNavigateHome(link.href);
    }
  };

  return (
    <footer className="bg-[#222224] text-zinc-300 text-xs pt-14 pb-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Row: Logo + 4 Minimal Columns (Direct Match to Reference Footer) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Column 1: Brand Mark */}
          <div>
            <button
              type="button"
              onClick={scrollToTop}
              title="Return to top"
              className={`rounded-lg inline-flex items-center cursor-pointer transition-opacity hover:opacity-90 ${
                logoConfig.plateStyle === "white"
                  ? "px-3 py-1.5 bg-white"
                  : logoConfig.plateStyle === "dark"
                  ? "px-3 py-1.5 bg-zinc-900 border border-white/15"
                  : "bg-transparent"
              }`}
            >
              <div
                className={`flex items-center justify-center ${
                  logoConfig.plateStyle === "transparent"
                    ? "h-[54px] -my-1.5"
                    : "h-[32px] px-0.5"
                }`}
              >
                <img
                  src={logoConfig.url}
                  alt="Himalayan Moto Enduro 2027"
                  style={{ transform: `scale(${logoConfig.zoom / 100})` }}
                  className="h-full w-auto max-w-[180px] object-contain select-none pointer-events-none"
                />
              </div>
            </button>
            <p className="text-zinc-400 mt-4 leading-relaxed">
              Nepal&apos;s ultimate off-road motorsport championship in Pokhara.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="font-semibold text-white mb-3">Championship</h4>
            <ul className="space-y-2 text-zinc-400">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleFooterLinkClick(e, link)}
                    className="hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Organizer */}
          <div>
            <h4 className="font-semibold text-white mb-3">Organizer</h4>
            <p className="text-zinc-400 leading-relaxed">
              {championship.organizer.name}
              <br />
              {championship.organizer.address}
              <br />
              {championship.organizer.phoneDisplay}
            </p>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-3">
              <button
                type="button"
                onClick={onOpenProposalModal}
                className="cursor-pointer text-white underline decoration-zinc-500 hover:decoration-white inline-block"
              >
                Event Proposal
              </button>
              {onOpenXtremeProposal && (
                <button
                  type="button"
                  onClick={onOpenXtremeProposal}
                  className="cursor-pointer text-zinc-300 hover:text-white underline decoration-zinc-500 hover:decoration-white inline-flex items-center gap-1"
                >
                  <Lock size={11} className="text-[#F03845]" />
                  <span>Proposals</span>
                </button>
              )}
            </div>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-semibold text-white mb-3">Connect</h4>
            <div className="flex items-center gap-2.5 mb-4">
              <a
                href={championship.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={14} />
              </a>
              <a
                href={championship.socials.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={14} />
              </a>
              <a
                href={championship.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-white/15 hover:border-white text-zinc-300 hover:text-white flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <span>© 2027 Extreme Moto Enduro Cross Championship · Adventure Sport Hub, Pokhara</span>
          <button
            type="button"
            onClick={scrollToTop}
            className="cursor-pointer hover:text-white inline-flex items-center gap-1 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
};
