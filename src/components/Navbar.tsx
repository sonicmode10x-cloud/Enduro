import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { useBrandLogo } from "../context/LogoContext";

interface NavbarProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRegisterModal }) => {
  const { logoConfig } = useBrandLogo();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "HOME", href: "#hero" },
    { name: "THE EVENT", href: "#experiences" },
    { name: "RACE MAP", href: "#arena-layout" },
    { name: "GALLERY", href: "#gallery" },
    { name: "MEDIA", href: "#influencers" },
    { name: "CONTACT", href: "#contact" }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#050507]/95 backdrop-blur-md border-b border-zinc-800 shadow-2xl py-3"
            : "bg-gradient-to-b from-black/90 via-black/50 to-transparent py-4 sm:py-5 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            {/* Main Header Brand Logo */}
            <div className="flex items-center gap-2">
              <a
                href="#hero"
                className="group flex items-center gap-2.5 whitespace-nowrap shrink-0 focus-visible:outline-none"
                title="Extreme Moto Enduro Cross Championship"
                aria-label="Extreme Moto Enduro Cross Championship"
              >
                <div
                  className={`px-3 py-1.5 rounded-[2px] transition-all flex items-center justify-center ${
                    logoConfig.plateStyle === "white"
                      ? "bg-white hover:bg-zinc-100 border-l-4 border-l-[#E10600] shadow-[0_2px_14px_rgba(0,0,0,0.6)]"
                      : logoConfig.plateStyle === "dark"
                      ? "bg-zinc-900 hover:bg-zinc-850 border border-zinc-700/80 border-l-4 border-l-[#E10600] shadow-md"
                      : "bg-transparent hover:opacity-90"
                  }`}
                >
                  <div className="h-[36px] sm:h-[42px] px-1 flex items-center justify-center relative">
                    <img
                      src={logoConfig.url}
                      alt="Moto Enduro Cross Championship"
                      style={{
                        transform: `scale(${logoConfig.zoom / 100})`,
                        transition: "transform 0.15s ease-out"
                      }}
                      className="h-full w-auto max-w-[160px] sm:max-w-[190px] object-contain select-none pointer-events-none group-hover:scale-105 transition-transform"
                    />
                  </div>
                </div>
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7 text-[11px] font-medium tracking-widest text-zinc-300 uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="whitespace-nowrap shrink-0 hover:text-white transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-[#E10600] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Button - Sharp Red with Arrow (matching reference) */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => onOpenRegisterModal("rider")}
                className="cursor-pointer inline-flex items-center gap-2 bg-[#E10600] hover:bg-[#b80500] text-white font-heading font-extrabold uppercase tracking-wider text-xs px-5 py-2.5 rounded-[2px] transition-all shadow-lg shadow-red-950/40 active:translate-y-0.5 whitespace-nowrap"
              >
                <span>REGISTER NOW</span>
                <span className="text-sm font-bold">→</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                className="lg:hidden p-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
              >
                {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-[#0d0d10] border-l border-zinc-800 p-6 flex flex-col justify-between shadow-2xl z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <a
                    href="#hero"
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-2.5 py-1 rounded-[2px] border-l-3 border-l-[#E10600] block ${
                      logoConfig.plateStyle === "white"
                        ? "bg-white"
                        : logoConfig.plateStyle === "dark"
                        ? "bg-zinc-900 border border-zinc-700"
                        : "bg-transparent"
                    }`}
                  >
                    <div className="h-[32px] px-1 flex items-center justify-center relative">
                      <img
                        src={logoConfig.url}
                        alt="Moto Enduro Cross Championship"
                        style={{ transform: `scale(${logoConfig.zoom / 100})` }}
                        className="h-full w-auto max-w-[140px] object-contain select-none pointer-events-none"
                      />
                    </div>
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-zinc-400 hover:text-white rounded-md"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="py-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded text-sm font-semibold tracking-wider text-zinc-200 hover:text-white hover:bg-zinc-900 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight size={14} className="text-zinc-500" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-zinc-800 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRegisterModal("rider");
                }}
                className="w-full text-center font-heading font-black text-sm tracking-wider uppercase py-3 bg-[#E50920] text-white clip-slanted shadow-md hover:bg-red-700"
              >
                REGISTER / PARTNER WITH US
              </button>

              <a
                href={EVENT_CONFIG.championship.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-800/40 py-2.5 rounded hover:bg-emerald-900/30 transition-colors"
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
