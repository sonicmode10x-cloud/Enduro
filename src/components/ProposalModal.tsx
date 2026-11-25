import React from "react";
import { X, Printer, Download, Calendar, Mail, Phone, MapPin, CheckCircle2, Trophy, Shield, Sparkles } from "lucide-react";
import { EVENT_CONFIG, SPONSOR_PACKAGES, INFLUENCERS } from "../data/eventConfig";

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestMeeting: () => void;
}

export const ProposalModal: React.FC<ProposalModalProps> = ({
  isOpen,
  onClose,
  onRequestMeeting
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const { championship, previousAchievements } = EVENT_CONFIG;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#0c0c0e] border border-zinc-700 max-w-4xl w-full p-6 sm:p-10 shadow-2xl relative my-8 text-zinc-100 max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
        id="printable-proposal"
      >
        {/* Modal Controls Toolbar (Hidden in Print) */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800 mb-8 sticky top-0 bg-[#0c0c0e]/95 backdrop-blur-sm z-20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold uppercase text-[#E50920]">
              Official Championship Document
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs font-mono text-zinc-400">
              Sponsorship Prospectus 2027
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-zinc-200 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded transition-colors"
              title="Print or Save as PDF"
            >
              <Printer size={13} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestMeeting();
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#E50920] hover:bg-red-700 clip-slanted transition-colors"
            >
              <Calendar size={13} />
              <span>Request Meeting</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 ml-2"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PROPOSAL DOCUMENT BODY */}
        <div className="space-y-12">
          {/* Cover Header */}
          <div className="border-b-2 border-[#E50920] pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                  OFFICIAL SPONSORSHIP & PARTNERSHIP PROPOSAL
                </span>
                <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none">
                  EXTREME MOTO ENDURO CROSS
                </h1>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#E50920] mt-1">
                  CHAMPIONSHIP 2027 · POKHARA, NEPAL
                </h2>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 text-left sm:text-right shrink-0">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Host Entity</span>
                <span className="text-sm font-bold text-white block">{championship.organizer.name}</span>
                <span className="text-xs text-zinc-400">{championship.organizer.referenceWebsite}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              <strong>Executive Summary:</strong> Nepal's premier off-road motorsport championship combining hard enduro racing, motocross, freestyle stunts, and creator culture in Pokhara. Outlines commercial tiers, exposure metrics, and partnership deliverables.
            </p>
          </div>

          {/* Section 1: Previous Edition Achievements */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>1. Proven Historical Benchmarks</span>
            </h3>
            <p className="text-xs text-zinc-400 mb-3 leading-relaxed">
              Audited previous edition metrics verifying attendance and digital engagement:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white">80+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Competing Riders</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white">10,000+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Live Spectators</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-[#E50920]">20M+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Online Video Views</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white">50+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Influencers & Creators</div>
              </div>
            </div>
          </div>

          {/* Section 2: Sponsorship Tiers Overview */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>2. Championship Sponsorship Packages</span>
            </h3>
            <div className="space-y-4">
              {SPONSOR_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-4 bg-zinc-950 border border-zinc-800">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-heading font-black text-lg uppercase text-white">
                        {pkg.tier}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-red-950 text-[#E50920] border border-red-900">
                        {pkg.badge}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-300 font-medium mb-3">{pkg.headline}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-400">
                    {pkg.keyHighlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 size={12} className="text-[#E50920] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Digital Reach & Creator Ecosystem */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>3. Digital Creator Ecosystem & Media Reach</span>
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed mb-4">
              The 2027 championship partners with over 50 leading adventure, travel, and moto vloggers across Nepal and South Asia, generating an estimated combined reach of <strong>2.5M - 4M+ followers</strong> and a projected <strong>5M - 10M+ impressions</strong> across YouTube, Instagram, Facebook, and TikTok.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {INFLUENCERS.map((inf) => (
                <div key={inf.name} className="p-3 bg-zinc-950 border border-zinc-800">
                  <div className="font-heading font-bold text-sm text-white uppercase">{inf.name}</div>
                  <div className="text-[10px] text-[#E50920] font-mono">{inf.role}</div>
                  <div className="text-[10px] text-zinc-400 mt-1">{inf.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Operational Safety & Venue */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>4. Safety Protocols & Venue Management</span>
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
              <li className="p-2.5 bg-zinc-950 border border-zinc-800">
                <strong>FIM-Standard Race Marshals:</strong> Every obstacle and high-speed corner monitored with standardized flags and instant radio comms.
              </li>
              <li className="p-2.5 bg-zinc-950 border border-zinc-800">
                <strong>Medical Emergency Squad:</strong> On-site trauma doctors, 4x4 off-road ambulances, and pre-cleared hospital corridor.
              </li>
              <li className="p-2.5 bg-zinc-950 border border-zinc-800">
                <strong>District Police & Traffic Alignment:</strong> Coordinated security with District Police Office Kaski and Gandaki Traffic Police.
              </li>
              <li className="p-2.5 bg-zinc-950 border border-zinc-800">
                <strong>Barricaded Spectator Perimeters:</strong> High-tensile steel fences and 6-meter buffer zones separating crowd from track.
              </li>
            </ul>
          </div>

          {/* Section 5: Official Contact & Verification */}
          <div className="pt-6 border-t-2 border-zinc-800">
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4">
              5. Commercial Contacts & Meeting Coordination
            </h3>
            <div className="p-5 bg-zinc-950 border border-zinc-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-zinc-500 uppercase font-mono block">Organizing Director</span>
                <span className="font-bold text-white text-sm">{championship.organizer.contactPerson}</span>
                <span className="text-zinc-400 block">{championship.organizer.name}</span>
                <span className="text-zinc-400 block mt-1">{championship.organizer.address}</span>
              </div>
              <div className="space-y-1">
                <div>
                  <span className="text-zinc-500 font-mono">Direct Phone: </span>
                  <a href={`tel:${championship.organizer.phone}`} className="text-white font-bold hover:text-[#E50920]">
                    {championship.organizer.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Email: </span>
                  <a href={`mailto:${championship.organizer.email}`} className="text-white font-bold hover:text-[#E50920]">
                    {championship.organizer.email}
                  </a>
                </div>
                <div>
                  <span className="text-zinc-500 font-mono">Official Site: </span>
                  <a href={championship.organizer.referenceWebsite} target="_blank" rel="noreferrer" className="text-[#E50920] underline">
                    sportshubnepal.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions (Hidden in Print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-8 border-t border-zinc-800 print:hidden">
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-xs text-zinc-400 hover:text-white"
          >
            Close Proposal
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="cursor-pointer px-4 py-2 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 transition-colors"
            >
              Print Document
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestMeeting();
              }}
              className="cursor-pointer font-heading font-black uppercase text-xs px-6 py-2.5 bg-[#E50920] hover:bg-red-700 text-white clip-slanted transition-colors"
            >
              Request Commercial Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
