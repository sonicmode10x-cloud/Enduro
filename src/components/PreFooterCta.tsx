import React from "react";
import { LOCAL_IMAGES } from "../lib/localImages";

interface PreFooterCtaProps {
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const PreFooterCta: React.FC<PreFooterCtaProps> = ({ onOpenRegisterModal }) => {
  return (
    <section className="relative pt-10 px-4 sm:px-6 lg:px-8">
      {/* Split Canvas Backdrop: Warm Stone Top -> Dark Charcoal Footer Bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 bg-[#222224] pointer-events-none"
        aria-hidden="true"
      />

      {/* Overlapping Pure White Rounded Card (Direct Match to Bottom Reference Card) */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white rounded-[28px] shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-stone-200/70 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          {/* Left Visual Portrait */}
          <div className="md:col-span-5 h-56 md:h-64 bg-zinc-950 overflow-hidden">
            <img
              src={LOCAL_IMAGES.heroMotocrossRider}
              alt="Extreme Moto Enduro Rider 2027"
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Right Clean Typography & Action */}
          <div className="md:col-span-7 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-xs font-medium text-[#D60A19] mb-1">
                Pokhara, Nepal <span aria-hidden="true">·</span> 2027 Season
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-zinc-900 leading-none">
                EXTREME MOTO ENDURO CROSS
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-2 max-w-sm leading-relaxed">
                Your machine, our championship arena, one race in the heart of the Himalayas.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onOpenRegisterModal("rider")}
              className="cursor-pointer shrink-0 bg-[#242426] hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm px-7 py-3 rounded-full transition-colors shadow-sm whitespace-nowrap self-start sm:self-center"
            >
              Submit Registration
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
