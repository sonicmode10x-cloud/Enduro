import React from "react";
import { ChevronDown, MapPin, Calendar, Flag, Sparkles, ShieldCheck } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { MotocrossPhoto } from "./MotocrossPhoto";

interface HeroProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
  onOpenProposalModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRegisterModal, onOpenProposalModal }) => {
  const { championship } = EVENT_CONFIG;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0">
        <MotocrossPhoto
          src="https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1920&q=85"
          alt="Extreme motocross rider jumping against mountainous sky"
          fallbackType="hero-jump"
          className="w-full h-full object-cover"
        />
        {/* Deep layered gradient scrims ensuring > 4.5:1 WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/70" />
        
        {/* Subtle dynamic particle & grid overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
            backgroundSize: "40px 40px"
          }}
        />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between">
        <div className="max-w-2xl">
          {/* Red Kicker with Dash (matching reference) */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#E10600]" />
            <span className="text-[11px] font-mono tracking-widest uppercase font-bold text-[#E10600]">
              POKHARA MOTORSPORT · {championship.year} EDITION
            </span>
          </div>

          {/* Main Headline in Condensed Display Font (matching reference) */}
          <h1 className="font-heading font-black text-6xl sm:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-[0.88] mb-4 text-balance">
            EXTREME MOTO<br />
            <span className="text-[#E10600]">ENDURO CROSS</span><br />
            CHAMPIONSHIP
          </h1>

          {/* Supporting Description (2 clean lines matching reference) */}
          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-lg mb-8">
            Nepal's ultimate off-road motorsport experience. 80+ competing riders, brutal boulder matrix obstacles, and 10,000+ passionate spectators in Pokhara.
          </p>

          {/* Action Buttons (matching reference: red button with arrow + outline with play icon) */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#experiences"
              className="cursor-pointer inline-flex items-center gap-2.5 bg-[#E10600] hover:bg-[#b80500] text-white font-heading font-black tracking-wider uppercase text-xs px-6 py-3.5 rounded-[2px] transition-all shadow-xl shadow-red-950/50 hover:shadow-red-600/30"
            >
              <span>EXPLORE RACE</span>
              <span className="text-sm font-bold">→</span>
            </a>

            <a
              href="#gallery"
              className="cursor-pointer inline-flex items-center gap-2.5 bg-black/60 hover:bg-white/10 text-white font-heading font-bold tracking-wider uppercase text-xs px-6 py-3.5 rounded-[2px] border border-zinc-700/80 hover:border-zinc-400 transition-all backdrop-blur-sm"
            >
              <span className="w-4 h-4 rounded-full border border-zinc-400 flex items-center justify-center text-[9px] text-[#E10600]">
                ▶
              </span>
              <span>WATCH AFTERMOVIE</span>
            </a>
          </div>

          {/* Trust Marker Footer Bar */}
          <div className="pt-4 border-t border-zinc-800/80 flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 uppercase text-[10px] font-mono">Host:</span>
              <a
                href={championship.organizer.referenceWebsite}
                target="_blank"
                rel="noreferrer"
                className="text-zinc-200 hover:text-white font-semibold underline decoration-zinc-600"
              >
                {championship.organizer.name}
              </a>
            </div>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>FIM Marshal Standards</span>
            </div>
            <span className="text-zinc-700" aria-hidden="true">·</span>
            <div className="flex items-center gap-1.5">
              <Sparkles size={13} className="text-[#E10600]" />
              <span>Sanctioned Pokhara Arena</span>
            </div>
          </div>
        </div>

        {/* Vertical Pagination Indicator (matching right side of reference) */}
        <div className="hidden md:flex flex-col items-end gap-3 text-xs font-mono select-none">
          <div className="flex items-center gap-2 text-[#E10600] font-bold">
            <span className="w-4 h-[2px] bg-[#E10600]" />
            <span>01</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>02</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>03</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-600 hover:text-zinc-400 cursor-pointer transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            <span>04</span>
          </div>
        </div>
      </div>

      {/* Animated Scroll Indicator (Double Chevron matching reference) */}
      <a
        href="#achievements"
        aria-label="Scroll to event achievements"
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-zinc-500 hover:text-[#E10600] transition-colors group cursor-pointer"
      >
        <span className="text-xs font-mono -space-y-1 flex flex-col items-center">
          <ChevronDown size={16} className="text-zinc-500 group-hover:text-[#E10600] transition-colors" />
          <ChevronDown size={16} className="-mt-2 text-[#E10600] animate-bounce" />
        </span>
      </a>
    </section>
  );
};
