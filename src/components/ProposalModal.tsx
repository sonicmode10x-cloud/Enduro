import React from "react";
import { X, Printer, Calendar, CheckCircle2 } from "lucide-react";
import {
  EVENT_CONFIG,
  SPONSOR_PACKAGES,
  INFLUENCERS,
  SAFETY_PROTOCOLS,
  VENDOR_OPPORTUNITIES
} from "../data/eventConfig";
import {
  CHAMPIONSHIP_EXPERIENCES,
  CIRCUIT_SECTORS,
  STRICT_TRACK_RULE,
  SURFACE_MIX_SUMMARY
} from "../data/brochureData";

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

  const { championship } = EVENT_CONFIG;

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
              Complete Sponsorship Prospectus 2027
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
              className="cursor-pointer p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 ml-2"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PROPOSAL DOCUMENT BODY */}
        <div className="space-y-10">
          {/* Cover Header */}
          <div className="border-b-2 border-[#E50920] pb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-mono tracking-widest uppercase text-zinc-400 block mb-1">
                  OFFICIAL SPONSORSHIP &amp; PARTNERSHIP PROPOSAL
                </span>
                <h1 className="font-heading font-black text-4xl sm:text-5xl uppercase tracking-tight text-white leading-none">
                  THE HIMALAYAN SERIES OF MOTO ADVENTURES
                </h1>
                <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-[#E50920] mt-1">
                  EXTREME MOTO ENDURO CROSS 2027 · POKHARA &amp; EVEREST
                </h2>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 text-left sm:text-right shrink-0">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block">Host Entity</span>
                <span className="text-sm font-bold text-white block">{championship.organizer.name}</span>
                <span className="text-xs text-zinc-400">www.sporthubnepal.com</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
              <strong>Executive Summary:</strong> Nepal&apos;s premier off-road motorsport festival in Pokhara and the Everest corridor — uniting hard enduro river boulder battles, high-speed motocross racing, freestyle stunts (FMX), Pokhara Street Parade, Live Music, Food &amp; Lifestyle Village, Brand Expo, and 50+ digital creators under FIM-grade safety governance.
            </p>
          </div>

          {/* Section 1: Proven Historical Benchmarks & 2027 Calendar */}
          <div className="space-y-5">
            <h3 className="font-heading font-bold text-xl uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>1. Proven Benchmarks &amp; 2027 Championship Calendar</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white tabular-nums">80+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Competing Riders</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white tabular-nums">10,000+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Live Spectators</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-[#E50920] tabular-nums">20M+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Online Video Views</div>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <div className="font-heading font-black text-3xl text-white tabular-nums">50+</div>
                <div className="text-[11px] font-mono uppercase text-zinc-400 mt-1">Influencers &amp; Creators</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#E50920]">
                  Stage 01 · April 5 &amp; 6, 2027 · Pokhara, Nepal
                </div>
                <div className="font-heading font-bold text-lg text-white uppercase">
                  Himalayan Enduro 2027 Pokhara
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  Two action-packed days across Pokhara&apos;s Annapurna foothills (822m–1,400m) with the official 2.0 KM 55-corner circuit, Brand Expo, FMX stunts, and 10,000+ spectators.
                </p>
              </div>
              <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#E50920]">
                  Stage 02 · November 2027 · Everest Corridor, Nepal
                </div>
                <div className="font-heading font-bold text-lg text-white uppercase">
                  Himalayan Enduro 2027 Everest
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  All-new high-altitude hard enduro expedition stage entering the iconic Everest corridor. Early rider entries are open; GPS routes to be confirmed ahead of race week.
                </p>
              </div>
            </div>
          </div>

          {/* Section 2: All 8 Championship Experiences */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>2. All 8 Championship Sections &amp; Experiences</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {CHAMPIONSHIP_EXPERIENCES.map((exp) => (
                <div key={exp.title} className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#E50920]">{exp.category}</div>
                  <div className="font-heading font-bold text-sm text-white uppercase">{exp.title}</div>
                  <p className="text-zinc-400 leading-relaxed">{exp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: 2KM Pokhara Circuit Telemetry & 8 Track Sectors */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>3. Official 2.0 KM Pokhara Circuit &amp; 8 Track Sectors</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              {SURFACE_MIX_SUMMARY.map((sm) => (
                <div key={sm.terrain} className="p-3 bg-zinc-950 border border-zinc-800">
                  <div className="font-bold text-[#E50920]">{sm.terrain}</div>
                  <div className="text-zinc-400 mt-0.5">{sm.pace}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {CIRCUIT_SECTORS.map((sec) => (
                <div key={sec.id} className="p-3 bg-zinc-950 border border-zinc-800">
                  <div className="font-bold text-white">
                    {sec.name}{" "}
                    <span className="text-[10px] font-mono text-[#E50920]">({sec.difficulty})</span>
                  </div>
                  <div className="text-zinc-400 mt-0.5">{sec.surface} · {sec.pace}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Sponsorship Tiers & Vendor Marketplace (Price-Free Public View) */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-xl uppercase text-white flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>4. Championship Sponsorship Packages &amp; Vendor Zones</span>
            </h3>
            <div className="space-y-3">
              {SPONSOR_PACKAGES.map((pkg) => (
                <div key={pkg.id} className="p-4 bg-zinc-950 border border-zinc-800">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-heading font-black text-lg uppercase text-white">
                      {pkg.tier}
                    </span>
                    <span className="text-[10px] font-mono text-[#E50920]">
                      · {pkg.badge} · Commercial Terms Upon Request
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-medium mb-2.5">{pkg.headline}</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              {VENDOR_OPPORTUNITIES.map((v) => (
                <div key={v.id} className="p-3.5 bg-zinc-950 border border-zinc-800 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-[#E50920]">
                    {v.category} · {v.stallSizes}
                  </div>
                  <div className="font-bold text-white">{v.title}</div>
                  <p className="text-zinc-400">{v.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Digital Reach & Creator Ecosystem */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>5. Digital Creator Ecosystem &amp; Media Reach</span>
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

          {/* Section 6: All 6 FIM Safety Protocols */}
          <div>
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-[#E50920]" />
              <span>6. FIM Safety Governance &amp; Venue Management</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
              {SAFETY_PROTOCOLS.map((proto) => (
                <div key={proto.title} className="p-3 bg-zinc-950 border border-zinc-800">
                  <strong className="text-white block">{proto.title}</strong>
                  <span className="text-zinc-400">{proto.description}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 mt-3 p-3 bg-zinc-950 border border-red-900/50">
              {STRICT_TRACK_RULE}
            </p>
          </div>

          {/* Section 7: Official Contact & Verification */}
          <div className="pt-6 border-t-2 border-zinc-800">
            <h3 className="font-heading font-bold text-xl uppercase text-white mb-4">
              7. Commercial Contacts &amp; Meeting Coordination
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
                  <span className="text-zinc-500 font-mono">Direct Phone / WhatsApp: </span>
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
                  <span className="text-zinc-500 font-mono">Official Website: </span>
                  <a href="https://www.sporthubnepal.com" target="_blank" rel="noreferrer" className="text-[#E50920] underline">
                    www.sporthubnepal.com
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
