import React from "react";
import { Calendar, Map, ArrowRight } from "lucide-react";
import { FormTab } from "./RegistrationModal";
import { LOCAL_IMAGES } from "../lib/localImages";

interface UpcomingEventsSectionProps {
  onOpenRegisterModal: (defaultTab?: FormTab, eventName?: string) => void;
}

export const UpcomingEventsSection: React.FC<UpcomingEventsSectionProps> = ({
  onOpenRegisterModal
}) => {
  return (
    <section id="upcoming-events" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Event 1 (Featured Next Event): Himalayan Enduro 2027 Pokhara */}
        <div
          id="himalayan-enduro"
          className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden"
        >
          {/* Action Image Panel */}
          <div className="relative h-[260px] sm:h-[320px] lg:h-[360px] bg-zinc-950">
            <img
              src={LOCAL_IMAGES.himalayanEnduroPokhara}
              alt="Himalayan Enduro 2027 Pokhara Off-Road Mountain Trail Racing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs font-medium text-zinc-200">
                April 5 &amp; 6, 2027 <span aria-hidden="true">·</span> Registration Open
              </div>
              <div className="font-heading font-black text-3xl uppercase tracking-tight mt-0.5 leading-none">
                Himalayan Enduro 2027 Pokhara
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events 2 & 3: Flagship Arena Championship & Everest Expedition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Event 2: Extreme Moto Enduro Cross 2027 */}
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="relative flex-1 min-h-56 sm:min-h-60 bg-zinc-950 overflow-hidden">
              <img
                src={LOCAL_IMAGES.motocrossMxJump}
                alt="Extreme Moto Enduro Cross Championship 2027 Pokhara Arena"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="text-xs font-medium text-zinc-200">
                  2027 Season <span aria-hidden="true">·</span> Dates TBA
                </div>
                <div className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight mt-0.5 leading-none">
                  Extreme Moto Enduro Cross 2027
                </div>
              </div>
            </div>
          </div>

          {/* Event 3: Himalayan Enduro 2027 Everest */}
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden flex flex-col">
            <div className="relative h-56 sm:h-60 bg-zinc-950 overflow-hidden">
              <img
                src={LOCAL_IMAGES.hardEnduroRiverBoulders}
                alt="Himalayan Enduro 2027 Everest Off-Road Mountain Expedition"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-5 left-6 right-6 text-white">
                <div className="text-xs font-medium text-zinc-200">
                  November 2027 <span aria-hidden="true">·</span> Early Entry Open
                </div>
                <div className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight mt-0.5 leading-none">
                  Himalayan Enduro 2027 Everest
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D60A19] mb-2">
                  <span>High-Altitude Expedition</span>
                  <span className="text-zinc-400" aria-hidden="true">·</span>
                  <span className="text-emerald-700">Registration Open</span>
                </div>

                <p className="text-sm text-zinc-600 leading-relaxed mb-5">
                  An all-new hard enduro expedition and championship stage heading into the Everest Himalayan corridor. Early rider entries are open now.
                </p>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[#F5F4F0] rounded-2xl">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-0.5">
                      <Calendar size={12} className="text-[#D60A19]" />
                      <span>Event Date</span>
                    </div>
                    <div className="font-heading font-bold text-base text-zinc-900 uppercase tabular-nums">
                      Nov 2027
                    </div>
                  </div>
                  <div className="p-3 bg-[#F5F4F0] rounded-2xl">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 mb-0.5">
                      <Map size={12} className="text-[#D60A19]" />
                      <span>Course Route</span>
                    </div>
                    <div className="font-heading font-bold text-base text-zinc-900 uppercase truncate">
                      Everest · Route TBA
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
                <span className="text-xs text-zinc-500">
                  GPS track &amp; stage map TBA
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onOpenRegisterModal("rider", "Himalayan Enduro 2027 Everest (Nov 2027)")
                  }
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white font-semibold text-xs px-5 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Register for Everest</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
