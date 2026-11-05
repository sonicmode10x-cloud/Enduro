import React, { useState } from "react";
import { SPONSOR_PACKAGES, SponsorPackage } from "../data/eventConfig";
import { Download, Calendar, CheckCircle2, ChevronRight, Trophy, Sparkles, Building2, Eye, Shield, ArrowRight } from "lucide-react";

interface SponsorshipSectionProps {
  onOpenProposalModal: () => void;
  onOpenRegisterModal: (defaultTab?: "rider" | "sponsor" | "vendor" | "media" | "general") => void;
}

export const SponsorshipSection: React.FC<SponsorshipSectionProps> = ({
  onOpenProposalModal,
  onOpenRegisterModal
}) => {
  const [activePackageId, setActivePackageId] = useState<string>("title-sponsor");

  const activePackage = SPONSOR_PACKAGES.find((p) => p.id === activePackageId) || SPONSOR_PACKAGES[0];

  const coreBenefits = [
    { title: "Arena Trackside Hoardings", desc: "Visible during live heats and broadcast replays", icon: Eye },
    { title: "Starting Gate & Podium Stage", desc: "Top billing on every trophy ceremony and holeshot", icon: Trophy },
    { title: "20M+ Digital Reach", desc: "Dedicated creator integrations across TikTok, IG & YT", icon: Sparkles },
    { title: "VIP Sky Lounge Hospitality", desc: "Host clients, executives & partners in private luxury", icon: Building2 },
    { title: "1,000 sq.ft. Activation Space", desc: "Launch new vehicles, sample products & capture leads", icon: Shield }
  ];

  return (
    <section id="sponsors" className="py-24 bg-[#0d0d10] border-t border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#E50920] mb-2">
            <span>COMMERCIAL PARTNERSHIPS</span>
            <span className="text-zinc-600" aria-hidden="true">·</span>
            <span className="text-zinc-400">2027 PACKAGES</span>
          </div>
          <h2 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.95] mb-4 text-balance">
            PUT YOUR BRAND AT THE<br />
            <span className="text-[#E50920]">CENTRE OF THE ACTION.</span>
          </h2>
          <p className="text-sm text-zinc-300 font-normal leading-relaxed">
            Connect your brand with thousands of motorsport fans, riders, and creators in Nepal.
          </p>

          {/* Action CTAs Header */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <button
              type="button"
              onClick={onOpenProposalModal}
              className="cursor-pointer inline-flex items-center gap-2 font-heading font-black uppercase tracking-wider text-xs px-5 py-3 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted shadow-lg shadow-red-950/50 transition-all"
            >
              <Download size={14} />
              <span>SPONSORSHIP DECK (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenRegisterModal("sponsor")}
              className="cursor-pointer inline-flex items-center gap-2 font-heading font-bold uppercase tracking-wider text-xs px-5 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-700 clip-slanted transition-all"
            >
              <Calendar size={14} className="text-[#E50920]" />
              <span>REQUEST MEETING</span>
            </button>
          </div>
        </div>

        {/* High-Level Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
            COMPREHENSIVE SPONSOR DELIVERABLES
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {coreBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="p-4 bg-zinc-900/50 border border-zinc-800/80">
                  <Icon size={18} className="text-[#E50920] mb-2" />
                  <h4 className="font-heading font-bold text-sm text-white uppercase mb-1">
                    {b.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-snug">
                    {b.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tier Selector & Interactive Package Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Tier Navigation Tabs (4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <span className="text-xs font-mono uppercase text-zinc-500 mb-1">
              Select Partnership Tier
            </span>
            {SPONSOR_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === activePackageId;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setActivePackageId(pkg.id)}
                  className={`cursor-pointer text-left p-4 border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-zinc-900 border-[#E50920] shadow-md shadow-red-950/20"
                      : "bg-[#09090b] border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-heading font-black text-lg text-white uppercase">
                      {pkg.tier}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 border ${
                      isSelected ? "bg-red-950/80 text-white border-red-800" : "bg-zinc-900 text-zinc-400 border-zinc-800"
                    }`}>
                      {pkg.badge}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 line-clamp-1">
                    {pkg.headline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Tier Breakdown (8 columns) */}
          <div className="lg:col-span-8 bg-[#09090b] border border-zinc-800 p-6 sm:p-8 rounded-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#E50920] font-bold">
                  {activePackage.badge}
                </span>
                <h3 className="font-heading font-black text-3xl sm:text-4xl uppercase text-white mt-1">
                  {activePackage.tier}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-medium mt-1">
                  {activePackage.headline}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onOpenRegisterModal("sponsor")}
                className="cursor-pointer font-heading font-black uppercase text-xs px-6 py-3 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted whitespace-nowrap self-start sm:self-auto transition-colors"
              >
                ACQUIRE THIS TIER
              </button>
            </div>

            {/* Recommended Brands */}
            <div className="p-3.5 bg-zinc-900/60 border border-zinc-800/80 mb-6 text-xs">
              <span className="font-mono uppercase text-zinc-400 block mb-0.5">
                Strategic Match / Recommended Industries:
              </span>
              <span className="text-zinc-200 font-medium">{activePackage.recommendedFor}</span>
            </div>

            {/* Key Highlights */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Signature Rights & Dominance
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePackage.keyHighlights.map((hl, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-zinc-200 bg-zinc-950 p-2.5 border border-zinc-800">
                    <CheckCircle2 size={14} className="text-[#E50920] shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Quadrants: Branding, Media, Hospitality, Activation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-zinc-800">
              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E50920]" />
                  <span>On-Site & Arena Branding</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activePackage.entitlements.branding.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-500">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E50920]" />
                  <span>Digital & Creator Media</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activePackage.entitlements.media.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-500">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E50920]" />
                  <span>Hospitality & VIP Access</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activePackage.entitlements.hospitality.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-500">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-xs font-mono uppercase text-zinc-400 mb-2 font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#E50920]" />
                  <span>On-Ground Brand Activation</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-zinc-300">
                  {activePackage.entitlements.activation.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-zinc-500">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-6 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-4">
              <div className="text-xs text-zinc-400">
                Contact: <strong className="text-zinc-200">Jagat Dhauli</strong> (+977 9867695261)
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenProposalModal}
                  className="cursor-pointer text-xs font-semibold text-zinc-300 hover:text-white underline decoration-zinc-600"
                >
                  Inspect Full Proposal Deck
                </button>
                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("sponsor")}
                  className="cursor-pointer font-heading font-bold uppercase text-xs px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white clip-slanted transition-colors"
                >
                  Schedule Commercial Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
