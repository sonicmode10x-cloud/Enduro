import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { FormTab } from "./RegistrationModal";

interface ContactSectionProps {
  onOpenRegisterModal: (defaultTab?: FormTab) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenRegisterModal }) => {
  const { organizer, name, year, socials } = EVENT_CONFIG.championship;

  return (
    <section id="contact" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-medium text-[#D60A19] mb-1">
            Official Organizing Committee <span aria-hidden="true">·</span> Pokhara Secretariat
          </p>
          <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none mb-3 text-balance">
            CONNECT WITH US
          </h2>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Inquire directly for rider entry, corporate sponsorship, vendor booths, or media passes.
          </p>
        </div>

        {/* 2-Column Clean White Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Official Organizing Body Details (5 columns) */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="pb-4 border-b border-stone-200 mb-5">
                <span className="text-xs font-medium text-[#D60A19]">Host Organization</span>
                <h3 className="font-heading font-black text-2xl uppercase text-zinc-900 mt-1">
                  {name} {year}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Powered by {organizer.name}
                </p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-zinc-500 block">Primary Contact</span>
                  <span className="text-sm font-semibold text-zinc-900 block">
                    {organizer.contactPerson}
                  </span>
                  <span className="text-zinc-500">Race Director & Lead Organizer</span>
                </div>

                <div>
                  <span className="text-zinc-500 block">Direct Hotline</span>
                  <a
                    href={`tel:${organizer.phone}`}
                    className="text-sm font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors tabular-nums"
                  >
                    {organizer.phoneDisplay}
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block">Official Email</span>
                  <a
                    href={`mailto:${organizer.email}`}
                    className="text-sm font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors"
                  >
                    {organizer.email}
                  </a>
                </div>

                <div>
                  <span className="text-zinc-500 block">Headquarters</span>
                  <span className="text-sm font-semibold text-zinc-900 block">
                    {organizer.address}
                  </span>
                </div>

                <div>
                  <span className="text-zinc-500 block">Official Website</span>
                  <a
                    href="https://www.sporthubnepal.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-[#D60A19] hover:underline"
                  >
                    www.sporthubnepal.com
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-5 mt-6 border-t border-stone-200">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer w-full flex items-center justify-center gap-2 font-semibold text-xs py-3 bg-[#242426] hover:bg-zinc-900 text-white rounded-full transition-colors"
              >
                <MessageCircle size={15} />
                <span>Chat on WhatsApp ({organizer.phoneDisplay})</span>
              </a>
            </div>
          </div>

          {/* Rapid Portal Actions (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <span className="text-xs font-medium text-zinc-500 block mb-1">
                  Official Entry & Partnership Portals
                </span>
                <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                  Choose Registration Category
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("rider")}
                  className="text-left cursor-pointer group p-5 bg-[#F5F4F0] hover:bg-stone-200/70 rounded-2xl transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-medium text-[#D60A19]">Class Heats 2027</span>
                    <h4 className="font-heading font-black text-xl uppercase text-zinc-900 mt-1">
                      Rider Registration
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      Pro Open, Expert, Novice, and Veteran classes.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-300/70 flex items-center justify-between text-xs font-semibold text-zinc-900">
                    <span>Register Machine</span>
                    <ArrowUpRight size={14} className="text-[#D60A19]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("sponsor")}
                  className="text-left cursor-pointer group p-5 bg-[#F5F4F0] hover:bg-stone-200/70 rounded-2xl transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-medium text-[#D60A19]">Commercial Tiers</span>
                    <h4 className="font-heading font-black text-xl uppercase text-zinc-900 mt-1">
                      Sponsorship Tiers
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      Title rights, demo arenas, and 20M+ digital reach.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-300/70 flex items-center justify-between text-xs font-semibold text-zinc-900">
                    <span>Request Meeting</span>
                    <ArrowUpRight size={14} className="text-[#D60A19]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("vendor")}
                  className="text-left cursor-pointer group p-5 bg-[#F5F4F0] hover:bg-stone-200/70 rounded-2xl transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-medium text-[#D60A19]">Expo & Food Village</span>
                    <h4 className="font-heading font-black text-xl uppercase text-zinc-900 mt-1">
                      Vendor Booths
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      Moto gear, EV displays, BBQ & café stalls.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-300/70 flex items-center justify-between text-xs font-semibold text-zinc-900">
                    <span>Book Stall</span>
                    <ArrowUpRight size={14} className="text-[#D60A19]" />
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("media")}
                  className="text-left cursor-pointer group p-5 bg-[#F5F4F0] hover:bg-stone-200/70 rounded-2xl transition-colors flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-medium text-[#D60A19]">Press & Creators</span>
                    <h4 className="font-heading font-black text-xl uppercase text-zinc-900 mt-1">
                      Media Pass
                    </h4>
                    <p className="text-xs text-zinc-600 mt-1 leading-relaxed">
                      Infield bibs, drone permits, and rider access.
                    </p>
                  </div>
                  <div className="pt-3 mt-3 border-t border-stone-300/70 flex items-center justify-between text-xs font-semibold text-zinc-900">
                    <span>Request Pass</span>
                    <ArrowUpRight size={14} className="text-[#D60A19]" />
                  </div>
                </button>
              </div>
            </div>

            <div className="p-4 bg-[#F5F4F0] rounded-2xl text-xs text-zinc-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span>Looking for general inquiries or volunteer roles?</span>
              <button
                type="button"
                onClick={() => onOpenRegisterModal("general")}
                className="cursor-pointer font-semibold text-zinc-900 underline decoration-zinc-400 hover:decoration-zinc-900 self-start sm:self-auto"
              >
                Send General Message →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
