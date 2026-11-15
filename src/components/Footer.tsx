import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { Youtube, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { FormTab } from "./RegistrationModal";
import { useBrandLogo } from "../context/LogoContext";

interface FooterProps {
  onOpenRegisterModal: (defaultTab?: FormTab) => void;
  onOpenProposalModal: () => void;
  onOpenAdminConsole?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenRegisterModal,
  onOpenProposalModal,
  onOpenAdminConsole
}) => {
  const { logoConfig } = useBrandLogo();
  const { championship } = EVENT_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#hero" },
    { name: "Moto Enduro", href: "#experiences" },
    { name: "Himalayan Enduro", href: "#himalayan-enduro" },
    { name: "Race Map", href: "#arena-layout" },
    { name: "Gallery", href: "#gallery" },
    { name: "Media", href: "#influencers" },
    { name: "Contact", href: "#contact" }
  ];

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
              className={`px-3 py-1.5 rounded-lg inline-flex items-center cursor-pointer transition-opacity hover:opacity-90 ${
                logoConfig.plateStyle === "white"
                  ? "bg-white"
                  : logoConfig.plateStyle === "dark"
                  ? "bg-zinc-900 border border-white/15"
                  : "bg-transparent"
              }`}
            >
              <div className="h-[32px] px-0.5 flex items-center justify-center">
                <img
                  src={logoConfig.url}
                  alt="Moto Enduro Cross Championship"
                  style={{ transform: `scale(${logoConfig.zoom / 100})` }}
                  className="h-full w-auto max-w-[140px] object-contain select-none pointer-events-none"
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
                  <a href={link.href} className="hover:text-white transition-colors">
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
            <div className="flex flex-wrap items-center gap-4 mt-3">
              <button
                type="button"
                onClick={onOpenProposalModal}
                className="cursor-pointer text-white underline decoration-zinc-500 hover:decoration-white inline-block"
              >
                Event Proposal
              </button>
              {onOpenAdminConsole && (
                <button
                  type="button"
                  onClick={onOpenAdminConsole}
                  className="cursor-pointer text-white underline decoration-zinc-500 hover:decoration-white inline-block"
                >
                  Admin Console
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
            <button
              type="button"
              onClick={() => onOpenRegisterModal("rider")}
              className="cursor-pointer text-xs font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-1.5 rounded-full transition-colors"
            >
              Rider Portal
            </button>
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
