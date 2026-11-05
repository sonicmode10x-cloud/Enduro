import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { Youtube, Instagram, MessageCircle, ArrowUp, Upload } from "lucide-react";
import { FormTab } from "./RegistrationModal";
import { useBrandLogo } from "../context/LogoContext";

interface FooterProps {
  onOpenRegisterModal: (defaultTab?: FormTab) => void;
  onOpenProposalModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRegisterModal, onOpenProposalModal }) => {
  const { logoConfig, openUploadModal } = useBrandLogo();
  const { championship } = EVENT_CONFIG;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "THE EVENT", href: "#experiences" },
    { name: "RACE MAP", href: "#arena-layout" },
    { name: "GALLERY", href: "#gallery" },
    { name: "MEDIA", href: "#influencers" },
    { name: "CONTACT", href: "#contact" }
  ];

  return (
    <footer className="bg-[#050507] border-t border-zinc-800/80 text-zinc-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Single Row Bar (Direct Match to Reference) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-800/60">
          {/* Logo on Left */}
          <button
            type="button"
            onClick={scrollToTop}
            title="Return to top"
            className={`px-2.5 py-1 rounded-[2px] border-l-3 border-l-[#E10600] flex items-center shadow-md cursor-pointer transition-all hover:brightness-110 ${
              logoConfig.plateStyle === "white"
                ? "bg-white"
                : logoConfig.plateStyle === "dark"
                ? "bg-zinc-900 border border-zinc-700"
                : "bg-transparent"
            }`}
          >
            <div className="h-[32px] sm:h-[36px] px-1 flex items-center justify-center relative">
              <img
                src={logoConfig.url}
                alt="Moto Enduro Cross Championship"
                style={{ transform: `scale(${logoConfig.zoom / 100})` }}
                className="h-full w-auto max-w-[150px] sm:max-w-[180px] object-contain select-none pointer-events-none"
              />
            </div>
          </button>

          {/* Nav Links in Center */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-semibold tracking-wider text-zinc-300 uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons on Right (Direct Match to Reference) */}
          <div className="flex items-center gap-3">
            <a
              href={championship.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700/80 hover:border-[#E10600] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={14} />
            </a>
            <a
              href={championship.socials.youtube}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700/80 hover:border-[#E10600] text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={14} />
            </a>
            <a
              href={championship.socials.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-zinc-700/80 hover:border-emerald-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              aria-label="WhatsApp"
            >
              <MessageCircle size={14} />
            </a>
          </div>
        </div>

        {/* Sub-Footer Meta: Organizer Info & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2027 Extreme Moto Enduro Cross Championship.</span>
            <span>·</span>
            <span>Powered by <a href={championship.organizer.referenceWebsite} target="_blank" rel="noreferrer" className="text-zinc-300 hover:text-white underline">{championship.organizer.name}</a></span>
            <span>·</span>
            <span>Pokhara, Nepal (+977 9867695261)</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={openUploadModal}
              className="hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <Upload size={12} className="text-[#E10600]" />
              <span>Upload Logo</span>
            </button>
            <button
              type="button"
              onClick={onOpenProposalModal}
              className="hover:text-zinc-300 underline cursor-pointer"
            >
              Event Proposal
            </button>
            <button
              type="button"
              onClick={() => onOpenRegisterModal("rider")}
              className="hover:text-[#E10600] font-semibold cursor-pointer"
            >
              Rider Portal
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Top</span>
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
