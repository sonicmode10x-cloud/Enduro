import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { useBrandLogo } from "../context/LogoContext";

interface NavbarProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
  activeView?: "home" | "proposal";
  onNavigateHome?: (sectionHash?: string) => void;
  onNavigateProposal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenRegisterModal,
  activeView = "home",
  onNavigateHome,
  onNavigateProposal
}) => {
  const { logoConfig } = useBrandLogo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Upcoming Events", href: "#himalayan-enduro", isPage: false },
    { name: "Moto Enduro", href: "#experiences", isPage: false },
    { name: "2026 Edition", href: "#moto-enduro-2026", isPage: false },
    { name: "2024 Edition", href: "#moto-enduro-2024", isPage: false },
    { name: "Race Map", href: "#arena-layout", isPage: false },
    { name: "Proposal", href: "#proposal", isPage: true },
    { name: "Gallery", href: "#gallery", isPage: false },
    { name: "Contact", href: "#contact", isPage: false }
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: { href: string; isPage: boolean }
  ) => {
    setMobileMenuOpen(false);
    if (link.isPage && onNavigateProposal) {
      e.preventDefault();
      onNavigateProposal();
      return;
    }
    if (!link.isPage && activeView !== "home" && onNavigateHome) {
      e.preventDefault();
      onNavigateHome(link.href);
    }
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    if (activeView !== "home" && onNavigateHome) {
      e.preventDefault();
      onNavigateHome();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-black text-white ${
          isScrolled
            ? "border-b border-white/15 shadow-md py-2.5"
            : "border-b border-white/10 py-3"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Zone 1: Brand Logo */}
            <a
              href="#hero"
              onClick={handleBrandClick}
              className="group flex items-center whitespace-nowrap shrink-0 focus-visible:outline-none"
              title="Himalayan Moto Enduro 2027"
              aria-label="Himalayan Moto Enduro 2027"
            >
              <div
                className={`rounded-lg transition-all flex items-center justify-center ${
                  logoConfig.plateStyle === "white"
                    ? "px-3 py-1.5 bg-white hover:bg-stone-100 shadow-sm"
                    : logoConfig.plateStyle === "dark"
                    ? "px-3 py-1.5 bg-zinc-900 border border-white/15"
                    : "bg-transparent"
                }`}
              >
                <div
                  className={`flex items-center justify-center ${
                    logoConfig.plateStyle === "transparent"
                      ? "h-[76px] sm:h-[92px] -my-3.5 sm:-my-5"
                      : "h-[42px] sm:h-[48px] px-0.5"
                  }`}
                >
                  <img
                    src={logoConfig.url}
                    alt="Himalayan Moto Enduro 2027"
                    style={{
                      transform: `scale(${logoConfig.zoom / 100})`,
                      transition: "transform 0.15s ease-out"
                    }}
                    className="h-full w-auto max-w-[220px] sm:max-w-[260px] object-contain select-none pointer-events-none"
                  />
                </div>
              </div>
            </a>

            {/* Zone 2: Clean Single-Line Nav Links */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-5 text-[15px] font-heading font-bold uppercase tracking-wider text-white/95">
              {navLinks.map((link) => {
                const isActive = link.isPage && activeView === "proposal";
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link)}
                    aria-current={isActive ? "page" : undefined}
                    className={`whitespace-nowrap shrink-0 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-white after:transition-transform after:origin-left ${
                      isActive
                        ? "text-white after:scale-x-100"
                        : "after:scale-x-0 hover:after:scale-x-100"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Single Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenRegisterModal("rider")}
                className="cursor-pointer inline-flex items-center justify-center bg-white hover:bg-stone-100 text-zinc-900 font-semibold text-xs px-5 py-2.5 rounded-full transition-colors shadow-sm whitespace-nowrap shrink-0"
              >
                Register Now
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 text-zinc-200 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-[#222224] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <a
                  href="#hero"
                  onClick={handleBrandClick}
                  className={`rounded-lg block ${
                    logoConfig.plateStyle === "white"
                      ? "px-2.5 py-1 bg-white"
                      : logoConfig.plateStyle === "dark"
                      ? "px-2.5 py-1 bg-zinc-900 border border-white/15"
                      : "bg-transparent"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center ${
                      logoConfig.plateStyle === "transparent"
                        ? "h-[48px] -my-1.5"
                        : "h-[30px] px-0.5"
                    }`}
                  >
                    <img
                      src={logoConfig.url}
                      alt="Himalayan Moto Enduro 2027"
                      style={{ transform: `scale(${logoConfig.zoom / 100})` }}
                      className="h-full w-auto max-w-[165px] object-contain select-none pointer-events-none"
                    />
                  </div>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white rounded-full cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-1.5">
                {navLinks.map((link) => {
                  const isActive = link.isPage && activeView === "proposal";
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      aria-current={isActive ? "page" : undefined}
                      className={`flex items-center justify-between py-2.5 px-3 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? "text-white bg-white/15"
                          : "text-zinc-200 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      <span>{link.isPage ? "Sponsorship Proposals" : link.name}</span>
                      <ChevronRight size={14} className="text-zinc-500" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegisterModal("rider");
                }}
                className="cursor-pointer w-full text-center font-semibold text-sm py-3 bg-[#D60A19] text-white rounded-full shadow-sm hover:bg-[#b80814] transition-colors"
              >
                Register Now
              </button>

              <a
                href={EVENT_CONFIG.championship.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-emerald-300 bg-emerald-950/50 border border-emerald-800/40 py-2.5 rounded-full hover:bg-emerald-900/50 transition-colors"
              >
                <Phone size={14} />
                <span>WhatsApp: {EVENT_CONFIG.championship.organizer.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
