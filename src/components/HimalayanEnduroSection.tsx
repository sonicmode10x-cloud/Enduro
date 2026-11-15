import React from "react";
import { Calendar, Map, CheckCircle2, ArrowRight, MapPin } from "lucide-react";
import { FormTab } from "./RegistrationModal";

interface HimalayanEnduroSectionProps {
  onOpenRegisterModal: (defaultTab?: FormTab, eventName?: string) => void;
}

export const HimalayanEnduroSection: React.FC<HimalayanEnduroSectionProps> = ({
  onOpenRegisterModal
}) => {
  return (
    <section id="himalayan-enduro" className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Event 1: Himalayan Enduro Pokhara (April 5 & 6) */}
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Action Image Panel */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[360px] bg-zinc-950">
            <img
              src="/src/assets/images/himalayan_enduro_pokhara_1794600531049.jpg"
              alt="Himalayan Enduro Pokhara Off-Road Mountain Trail Racing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs font-medium text-zinc-200">
                April 5 &amp; 6 <span aria-hidden="true">·</span> Registration Open
              </div>
              <div className="font-heading font-black text-3xl uppercase tracking-tight mt-0.5">
                Himalayan Enduro 2027 Pokhara
              </div>
            </div>
          </div>

          {/* Right Clean Details Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D60A19] mb-2">
                <span>Himalayan Enduro Series</span>
                <span className="text-zinc-400" aria-hidden="true">·</span>
                <span className="text-emerald-700">Registration Open</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none mb-3">
                HIMALAYAN ENDURO 2027 POKHARA
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                Two action-packed days of technical ridge climbs, valley riverbeds, and mountain singletrack across Pokhara&apos;s Annapurna foothills. Rider registration is open now.
              </p>

              {/* Key Event Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <Calendar size={13} className="text-[#D60A19]" />
                    <span>Event Dates</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-zinc-900 uppercase">
                    April 5 &amp; 6
                  </div>
                </div>

                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    <span>Entry Status</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-emerald-700 uppercase">
                    Registration Open
                  </div>
                </div>

                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <MapPin size={13} className="text-[#D60A19]" />
                    <span>Host City</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-zinc-900 uppercase">
                    Pokhara, Nepal
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Two-day enduro format · Limited rider entry slots
              </span>

              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("rider", "Himalayan Enduro 2027 Pokhara (April 5 & 6)")
                }
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <span>Register for Himalayan Enduro 2027 Pokhara</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Event 2: Himalayan Enduro 2027 Everest (Nov 2027) */}
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-stretch">
          {/* Left Action Image Panel */}
          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-[360px] bg-zinc-950">
            <img
              src="/src/assets/images/hard_enduro_river_boulders_1794590872498.jpg"
              alt="Himalayan Enduro 2027 Off-Road Mountain Racing"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="text-xs font-medium text-zinc-200">
                November 2027 <span aria-hidden="true">·</span> Registration Open
              </div>
              <div className="font-heading font-black text-3xl uppercase tracking-tight mt-0.5">
                Himalayan Enduro 2027 Everest
              </div>
            </div>
          </div>

          {/* Right Clean Details Panel */}
          <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#D60A19] mb-2">
                <span>New Championship Event</span>
                <span className="text-zinc-400" aria-hidden="true">·</span>
                <span className="text-emerald-700">Registration Open</span>
              </div>

              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none mb-3">
                HIMALAYAN ENDURO 2027 EVEREST
              </h2>

              <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                An all-new hard enduro expedition and championship stage heading into the Everest Himalayan corridor. Early rider entries are now open.
              </p>

              {/* Key Event Specs Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <Calendar size={13} className="text-[#D60A19]" />
                    <span>Event Date</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-zinc-900 uppercase">
                    Nov 2027
                  </div>
                </div>

                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <CheckCircle2 size={13} className="text-emerald-700" />
                    <span>Entry Status</span>
                  </div>
                  <div className="font-heading font-bold text-lg text-emerald-700 uppercase">
                    Registration Open
                  </div>
                </div>

                <div className="p-3.5 bg-[#F5F4F0] rounded-2xl">
                  <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-1">
                    <Map size={13} className="text-[#D60A19]" />
                    <span>Course Route</span>
                  </div>
                  <div className="font-heading font-bold text-base text-zinc-900 uppercase leading-tight">
                    To Be Confirmed Soon
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-zinc-500">
                Route GPS track &amp; stage maps will be confirmed soon
              </span>

              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("rider", "Himalayan Enduro 2027 Everest (Nov 2027)")
                }
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <span>Register for Himalayan Enduro 2027 Everest</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
