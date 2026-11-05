import React from "react";
import { MotocrossPhoto } from "./MotocrossPhoto";

interface PreFooterCtaProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const PreFooterCta: React.FC<PreFooterCtaProps> = ({ onOpenRegisterModal }) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#050507] border-t border-zinc-800/80 overflow-hidden">
      {/* Background Racing Speed Light Trails (Direct Match to Reference) */}
      <div className="absolute inset-0 z-0">
        <MotocrossPhoto
          src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1920&q=80"
          alt="Motocross high speed light trails"
          fallbackType="hero-jump"
          className="w-full h-full object-cover opacity-25"
        />
        {/* Aerodynamic Red Light Streaks Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 85% 65%, rgba(225, 6, 0, 0.45) 0%, rgba(225, 6, 0, 0.1) 40%, transparent 75%)"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050507] via-[#050507]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-[#050507]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-[2px] bg-[#E10600]" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#E10600]">
              POKHARA, NEPAL · 2027
            </span>
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white leading-[0.92] mb-4 text-balance">
            JOIN THE FUTURE OF<br />
            <span className="text-[#E10600]">EXTREME MOTORSPORT</span>
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-normal leading-relaxed max-w-lg mb-8">
            Your machine. Our championship stage. One shared goal — victory in the heart of the Himalayas.
          </p>

          <button
            type="button"
            onClick={() => onOpenRegisterModal("rider")}
            className="cursor-pointer inline-flex items-center gap-3 bg-[#E10600] hover:bg-[#b80500] text-white font-heading font-black tracking-wider uppercase text-xs sm:text-sm px-7 py-3.5 rounded-[2px] transition-all shadow-xl shadow-red-950/60 hover:shadow-red-600/40 active:translate-y-0.5"
          >
            <span>SUBMIT REGISTRATION</span>
            <span className="text-base font-bold">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};
