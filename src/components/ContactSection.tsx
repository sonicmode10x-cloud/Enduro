import React from "react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { MapPin, Phone, Mail, Globe, MessageCircle, User, ShieldCheck, ArrowUpRight } from "lucide-react";
import { FormTab } from "./RegistrationModal";

interface ContactSectionProps {
  onOpenRegisterModal: (defaultTab?: FormTab) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenRegisterModal }) => {
  const { organizer, name, edition, year, socials } = EVENT_CONFIG.championship;

  return (
    <section id="contact" className="py-24 bg-[#050507] border-t border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-4 h-[2px] bg-[#E10600]" />
            <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-[#E10600]">
              OFFICIAL DESK · ORGANIZING COMMITTEE
            </span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tighter text-white leading-[0.92] mb-3 text-balance">
            CONNECT WITH THE<br />
            <span className="text-[#E10600]">CHAMPIONSHIP DIRECTORS</span>
          </h2>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Inquire directly for rider entry, corporate sponsorship, vendor stalls, or press passes in Pokhara.
          </p>
        </div>

        {/* 2-Column Split: Official Contacts & Rapid Registration Portals */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* Official Organizing Body Details (5 columns) */}
          <div className="lg:col-span-5 bg-[#09090c] border border-zinc-800/80 p-6 sm:p-8 rounded-[2px] space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#E10600] font-bold">
                Host Organization
              </span>
              <h3 className="font-heading font-black text-3xl uppercase text-white mt-1">
                {name} {year}
              </h3>
              <p className="text-xs font-semibold text-zinc-400 mt-1">
                Powered by {organizer.name}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t border-zinc-800 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-[2px] flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                  <User size={15} />
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block text-[10px]">Primary Contact Person</span>
                  <span className="text-sm font-bold text-white">{organizer.contactPerson}</span>
                  <span className="text-zinc-400 block text-[11px]">Race Director & Lead Organizer</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-[2px] flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                  <Phone size={15} />
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block text-[10px]">Direct Hotline</span>
                  <a
                    href={`tel:${organizer.phone}`}
                    className="text-sm font-bold text-white hover:text-[#E10600] transition-colors"
                  >
                    {organizer.phoneDisplay}
                  </a>
                  <span className="text-zinc-400 block text-[11px]">Calls & SMS</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-[2px] flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                  <Mail size={15} />
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block text-[10px]">Official Email</span>
                  <a
                    href={`mailto:${organizer.email}`}
                    className="text-sm font-bold text-white hover:text-[#E10600] transition-colors"
                  >
                    {organizer.email}
                  </a>
                  <span className="text-zinc-400 block text-[11px]">Official communications</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-[2px] flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                  <MapPin size={15} />
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block text-[10px]">Secretariat Headquarters</span>
                  <span className="text-sm font-bold text-white">{organizer.address}</span>
                  <span className="text-zinc-400 block text-[11px]">Pokhara, Gandaki Province, Nepal</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-zinc-900 border border-zinc-800 rounded-[2px] flex items-center justify-center text-[#E10600] shrink-0 mt-0.5">
                  <Globe size={15} />
                </div>
                <div>
                  <span className="text-zinc-500 uppercase font-mono block text-[10px]">Reference Website</span>
                  <a
                    href={organizer.referenceWebsite}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-bold text-[#E10600] hover:text-white transition-colors underline"
                  >
                    sportshubnepal.com
                  </a>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Callout */}
            <div className="pt-4 border-t border-zinc-800">
              <a
                href={socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer w-full flex items-center justify-center gap-2.5 font-heading font-black uppercase text-xs tracking-wider py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-[2px] shadow-lg shadow-emerald-950/40 transition-colors"
              >
                <MessageCircle size={16} />
                <span>CHAT ON WHATSAPP (+977 9867695261)</span>
              </a>
            </div>
          </div>

          {/* Rapid Portal Actions (7 columns) */}
          <div className="lg:col-span-7 bg-[#09090c] border border-zinc-800/80 p-6 sm:p-8 rounded-[2px]">
            <span className="text-xs font-mono uppercase text-zinc-500 mb-1 block">
              Official Entry & Partnership Portals
            </span>
            <h3 className="font-heading font-black text-2xl uppercase text-white mb-2">
              Choose Your Registration Category
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-6">
              Select your department below to launch the dedicated registration form with custom fields and immediate response processing.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div
                onClick={() => onOpenRegisterModal("rider")}
                className="cursor-pointer group p-5 bg-[#09090b] border border-zinc-800 hover:border-[#E50920] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E50920] font-bold">
                    Class Heats 2027
                  </span>
                  <h4 className="font-heading font-black text-xl uppercase text-white mt-1 group-hover:text-[#E50920] transition-colors">
                    Rider Registration
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">
                    Pro Open, Expert, Novice, and Veteran classes. Transponder timing & paddock bay allocation.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-semibold">
                  <span>Register Machine</span>
                  <ArrowUpRight size={14} className="text-[#E50920]" />
                </div>
              </div>

              <div
                onClick={() => onOpenRegisterModal("sponsor")}
                className="cursor-pointer group p-5 bg-[#09090b] border border-zinc-800 hover:border-[#E50920] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E50920] font-bold">
                    Commercial Tiers
                  </span>
                  <h4 className="font-heading font-black text-xl uppercase text-white mt-1 group-hover:text-[#E50920] transition-colors">
                    Sponsorship Packages
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">
                    Title sponsorship, vehicle demo arenas, 10,000+ spectators, and 20M+ digital views.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-semibold">
                  <span>Request Meeting</span>
                  <ArrowUpRight size={14} className="text-[#E50920]" />
                </div>
              </div>

              <div
                onClick={() => onOpenRegisterModal("vendor")}
                className="cursor-pointer group p-5 bg-[#09090b] border border-zinc-800 hover:border-[#E50920] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E50920] font-bold">
                    Expo & Food Village
                  </span>
                  <h4 className="font-heading font-black text-xl uppercase text-white mt-1 group-hover:text-[#E50920] transition-colors">
                    Vendor Booth Booking
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">
                    Motorcycle gear, EV automotive displays, Nepali BBQ & barista café stalls.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-semibold">
                  <span>Book Stall</span>
                  <ArrowUpRight size={14} className="text-[#E50920]" />
                </div>
              </div>

              <div
                onClick={() => onOpenRegisterModal("media")}
                className="cursor-pointer group p-5 bg-[#09090b] border border-zinc-800 hover:border-[#E50920] transition-colors flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#E50920] font-bold">
                    Press & Creators
                  </span>
                  <h4 className="font-heading font-black text-xl uppercase text-white mt-1 group-hover:text-[#E50920] transition-colors">
                    Media Accreditation
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-snug">
                    Infield safety bibs, drone flight permits, press workstations, and rider interviews.
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-300 font-semibold">
                  <span>Request Pass</span>
                  <ArrowUpRight size={14} className="text-[#E50920]" />
                </div>
              </div>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 flex items-center justify-between">
              <span>Looking for a general enquiry or volunteer opportunities?</span>
              <button
                type="button"
                onClick={() => onOpenRegisterModal("general")}
                className="cursor-pointer text-xs font-semibold text-white underline decoration-zinc-600 hover:decoration-white"
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
