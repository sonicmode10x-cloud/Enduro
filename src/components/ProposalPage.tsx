import React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Mail,
  MessageCircle,
  Phone
} from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";
import { FormTab } from "./RegistrationModal";
import { BrochureSection } from "./BrochureSection";

interface ProposalPageProps {
  onBackToHome: () => void;
  onOpenRegisterModal: (defaultTab?: FormTab, eventName?: string) => void;
  onOpenProposalModal: () => void;
}

const TITLE_SPONSOR_BENEFITS = [
  'Event named as "Pokhara Motocross Enduro Championship 2027 — Powered by YOUR BRAND"',
  "The highest level — exclusive, dominant, prestige placement as the Face of the Championship",
  "Largest logo on all championship assets (digital + physical)",
  "Mention in every press release, media coverage & influencer content",
  "Title sponsor shout-outs on mic during all major moments",
  "Premium booth in the Brand Expo",
  "Co-branded official T-shirts, banners, and creator backdrops",
  "Interview features with top influencers",
  "Right to distribute merchandise, giveaways, and brand samples",
  "Exclusive category lock (no competitor allowed)"
];

interface SecondaryTier {
  id: string;
  tier: string;
  slots: string;
  subtitle: string;
  summary: string;
  benefits: string[];
  ctaLabel: string;
  modalValue: string;
}

const SECONDARY_SPONSOR_TIERS: SecondaryTier[] = [
  {
    id: "gold",
    tier: "GOLD SPONSOR",
    slots: "2 Slots",
    subtitle: "High Visibility Brand Partner",
    summary: "Strong, consistent brand presence across the entire event.",
    benefits: [
      "Logo displayed prominently on key race zones",
      "On-track branding for maximum eyeballs",
      "Shoutouts during race & stunt moments",
      "Inclusion in social media reels, posters & recap videos",
      "Premium booth in the expo",
      "Co-branded influencer content at the Creator Zone",
      "Logo on rider bibs or paddock boards (optional)"
    ],
    ctaLabel: "Inquire for Gold",
    modalValue: "Gold Sponsor"
  },
  {
    id: "silver",
    tier: "SILVER SPONSOR",
    slots: "3 Slots",
    subtitle: "Core Event Supporter",
    summary: "Solid brand integration across key event touchpoints.",
    benefits: [
      "Logo on event banners & standees",
      "Mention in selected reels & stories",
      "On-site product display",
      "Brand visibility inside the Food & Lifestyle Zone",
      "Invitation to press meet"
    ],
    ctaLabel: "Inquire for Silver",
    modalValue: "Silver Sponsor"
  },
  {
    id: "supporting",
    tier: "SUPPORTING PARTNER",
    slots: "10 Slots",
    subtitle: "Community Builder",
    summary: "Visual presence as an official supporting partner.",
    benefits: [
      "Logo on selected banners",
      "Social media acknowledgment",
      "2 general passes",
      "Opportunity to place small product samples or flyers"
    ],
    ctaLabel: "Become a Partner",
    modalValue: "Supporting Partner"
  }
];

export const ProposalPage: React.FC<ProposalPageProps> = ({
  onBackToHome,
  onOpenRegisterModal,
  onOpenProposalModal
}) => {
  const { championship, previousAchievements } = EVENT_CONFIG;

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[#EAE8E3] text-zinc-900">
      {/* Dark Editorial Proposal Hero Header */}
      <section className="relative bg-[#08080A] text-white pt-28 pb-14 sm:pt-36 sm:pb-18 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 80% 20%, rgba(200, 8, 21, 0.24) 0%, rgba(8, 8, 10, 0.85) 55%, rgba(8, 8, 10, 1) 100%)"
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={onBackToHome}
            className="cursor-pointer inline-flex items-center gap-2 text-xs font-medium text-zinc-300 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            <span>Back to Championship Home</span>
          </button>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-10 border-b border-white/15">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#F03845] mb-2">
                Official Commercial Prospectus <span aria-hidden="true">·</span> {championship.year} Championship <span aria-hidden="true">·</span> Pokhara, Nepal
              </p>
              <h1 className="font-heading font-black text-4xl sm:text-6xl uppercase tracking-tight text-white leading-[0.94] text-balance">
                SPONSORSHIP PROPOSALS
              </h1>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mt-4 max-w-xl">
                Partner directly with Nepal&apos;s premier off-road motorsport championship across Title, Gold, Silver, Supporting Partner tiers, and high-footfall marketplace vendor showcases.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenProposalModal}
                className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-zinc-200 hover:text-white px-4 py-3 rounded-full border border-white/20 hover:border-white/45 transition-colors whitespace-nowrap shrink-0"
              >
                <FileText size={14} />
                <span>Print / Save PDF</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("sponsor", "2027 Sponsorship Proposal Inquiry")
                }
                className="cursor-pointer inline-flex items-center gap-2 bg-[#D60A19] hover:bg-[#b80815] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <span>Request Sponsorship</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Audited Benchmarks Proof Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white tabular-nums leading-none">
                {previousAchievements.riders}
                {previousAchievements.ridersSuffix}
              </div>
              <div className="text-xs text-zinc-400 mt-1.5">
                {previousAchievements.ridersLabel}
              </div>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white tabular-nums leading-none">
                {previousAchievements.spectators.toLocaleString()}
                {previousAchievements.spectatorsSuffix}
              </div>
              <div className="text-xs text-zinc-400 mt-1.5">
                {previousAchievements.spectatorsLabel}
              </div>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#F03845] tabular-nums leading-none">
                {previousAchievements.onlineViews}
              </div>
              <div className="text-xs text-zinc-400 mt-1.5">
                {previousAchievements.onlineViewsLabel}
              </div>
            </div>
            <div>
              <div className="font-heading font-black text-3xl sm:text-4xl text-white tabular-nums leading-none">
                {previousAchievements.influencers}
                {previousAchievements.influencersSuffix}
              </div>
              <div className="text-xs text-zinc-400 mt-1.5">
                {previousAchievements.influencersLabel}
              </div>
            </div>
          </div>

          {/* Page Jump Controls */}
          <div className="flex flex-wrap items-center gap-2 pt-8">
            <button
              type="button"
              onClick={() => scrollToSection("sponsorship-tiers")}
              className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
            >
              01. Sponsorship Tiers
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("vendor-showcase")}
              className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
            >
              02. Vendor &amp; Showcase
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("brochure")}
              className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
            >
              03. Event Brochure
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("commercial-desk")}
              className="cursor-pointer px-4 py-2 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors whitespace-nowrap shrink-0"
            >
              04. Commercial Desk
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 01: SPONSORSHIP TIERS */}
      <section
        id="sponsorship-tiers"
        className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#D60A19] mb-1">
                01. Sponsorship Opportunities <span aria-hidden="true">·</span> 4 Partnership Tiers
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
                CHAMPIONSHIP SPONSORSHIP TIERS
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
                Structured commercial packages designed for maximum on-track visibility, media integration, and direct creator amplification.
              </p>
            </div>

            {/* Marquee Title Sponsor Block */}
            <div className="bg-[#121214] text-white rounded-2xl p-6 sm:p-8 border border-zinc-800">
              <div className="pb-6 border-b border-white/10">
                <div className="text-xs font-semibold text-[#F03845] mb-1">
                  1 Slot <span aria-hidden="true">·</span> &ldquo;Powered By&rdquo; Partner <span aria-hidden="true">·</span> Exclusive Category Lock
                </div>
                <h3 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none text-white">
                  TITLE SPONSOR
                </h3>
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2.5 py-6 text-xs sm:text-sm text-zinc-200">
                {TITLE_SPONSOR_BENEFITS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 leading-relaxed">
                    <Check size={15} className="text-[#E50920] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <span className="text-xs text-zinc-400">
                  Become the official face of Pokhara Motocross Enduro Championship 2027.
                </span>
                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("sponsor", "Title Sponsor")}
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#D60A19] hover:bg-[#b80815] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Claim Title Sponsorship</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            {/* Gold, Silver & Supporting Partner Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
              {SECONDARY_SPONSOR_TIERS.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#F5F4F0] rounded-2xl p-6 flex flex-col justify-between border border-stone-200/70"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#D60A19] mb-1">
                      {pkg.slots} <span aria-hidden="true">·</span> {pkg.subtitle}
                    </div>
                    <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-zinc-900 leading-none pb-4 border-b border-stone-300/70">
                      {pkg.tier}
                    </h3>
                    <p className="text-xs text-zinc-600 mt-3 mb-4 leading-relaxed">
                      {pkg.summary}
                    </p>

                    <ul className="space-y-2 text-xs text-zinc-700">
                      {pkg.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 leading-relaxed">
                          <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-6 border-t border-stone-300/70">
                    <button
                      type="button"
                      onClick={() => onOpenRegisterModal("sponsor", pkg.modalValue)}
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 bg-white hover:bg-zinc-900 text-zinc-900 hover:text-white border border-stone-300 hover:border-zinc-900 font-semibold text-xs px-4 py-2.5 rounded-full transition-colors whitespace-nowrap"
                    >
                      <span>{pkg.ctaLabel}</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: VENDOR & PRODUCT SHOWCASE OPPORTUNITIES */}
      <section
        id="vendor-showcase"
        className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-10 space-y-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold text-[#D60A19] mb-1">
                02. Marketplace &amp; Brand Expo <span aria-hidden="true">·</span> High-Traffic Zones
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
                VENDOR &amp; PRODUCT SHOWCASE OPPORTUNITIES
              </h2>
              <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
                A high-traffic championship marketplace where brands can sell, demonstrate products, and interact directly with thousands of visitors, riders, and influencers.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              {/* Primary Showcase Block: EV Cars, Motorbikes & Gear */}
              <div className="lg:col-span-6 bg-[#B80B18] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="pb-4 border-b border-white/20">
                    <span className="text-xs font-semibold text-red-100">
                      Vehicle Display Arena
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-3xl uppercase tracking-tight leading-tight mt-4">
                    EV CARS, MOTORBIKES &amp; GEAR SHOWCASE
                  </h3>
                  <p className="text-xs sm:text-sm text-red-50/90 leading-relaxed mt-2">
                    Dedicated space for vehicle displays and live demonstrations.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    <div>
                      <div className="text-xs font-semibold text-red-100 mb-2">
                        Suitable For
                      </div>
                      <ul className="space-y-2 text-xs text-white/95">
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>EV car brands</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Motorbike companies &amp; dealerships</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Riding gear and accessories</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>EV charging &amp; mobility tech brands</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-red-100 mb-2">
                        Benefits
                      </div>
                      <ul className="space-y-2 text-xs text-white/95">
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Vehicle display arena</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Demo opportunities</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Influencer features</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check size={13} className="shrink-0 mt-0.5" />
                          <span>Lead generation &amp; brand visibility</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-white/20">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenRegisterModal("vendor", "EV Cars, Motorbikes & Gear Showcase")
                    }
                    className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-stone-100 text-zinc-900 font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap"
                  >
                    <span>Reserve Showcase Space</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

              {/* Right Column: Food & Beverage + Retail & Lifestyle */}
              <div className="lg:col-span-6 flex flex-col gap-5">
                <div className="bg-[#F5F4F0] rounded-2xl p-6 border border-stone-200/70 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="pb-3 border-b border-stone-300/70">
                      <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-zinc-900">
                        FOOD &amp; BEVERAGE VENDORS
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-3 mb-3">
                      Ideal for momo stalls, BBQ, cafés, beverage brands, and fast-food outlets.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Placement in the Food Court Zone</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>High footfall throughout the day</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Strong sales potential</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Visibility in influencer walk-throughs</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-5 border-t border-stone-300/70">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRegisterModal("vendor", "Food & Beverage Vendor Stall")
                      }
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors whitespace-nowrap"
                    >
                      <span>Book Food Court Stall</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

                <div className="bg-[#F5F4F0] rounded-2xl p-6 border border-stone-200/70 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="pb-3 border-b border-stone-300/70">
                      <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-zinc-900">
                        RETAIL &amp; LIFESTYLE SHOPS
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed mt-3 mb-3">
                      Perfect for clothing, accessories, gadgets, beauty products, and riding gear.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700">
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Lifestyle Market Zone placement</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Direct product sales</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Exposure in social media content</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check size={13} className="text-[#D60A19] shrink-0 mt-0.5" />
                        <span>Great for new product launches</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 mt-5 border-t border-stone-300/70">
                    <button
                      type="button"
                      onClick={() =>
                        onOpenRegisterModal("vendor", "Retail & Lifestyle Shop Stall")
                      }
                      className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-zinc-900 hover:text-[#D60A19] transition-colors whitespace-nowrap"
                    >
                      <span>Book Lifestyle Shop Stall</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03: DOWNLOAD BROCHURES (XTREME ENERGY DRINK TITLE + GENERAL) */}
      <BrochureSection onOpenRegisterModal={onOpenRegisterModal} />

      {/* SECTION 04: COMMERCIAL DESK & DIRECT CONTACT */}
      <section
        id="commercial-desk"
        className="pt-4 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="max-w-5xl mx-auto">
          <div className="bg-[#242426] text-white rounded-[28px] p-6 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <p className="text-xs font-semibold text-[#F03845] mb-1">
                04. Commercial Partnerships Desk <span aria-hidden="true">·</span> {championship.organizer.name}
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight leading-none">
                READY TO LOCK YOUR 2027 PARTNERSHIP?
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mt-3">
                Speak directly with {championship.organizer.contactPerson} for commercial terms, custom category exclusivity, brand expo booth sizing, or multi-event Pokhara &amp; Everest sponsorship bundles.
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-5 text-xs text-zinc-300">
                <a
                  href={`tel:${championship.organizer.phone}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors tabular-nums"
                >
                  <Phone size={13} className="text-[#F03845]" />
                  <span>{championship.organizer.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${championship.organizer.email}`}
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail size={13} className="text-[#F03845]" />
                  <span>{championship.organizer.email}</span>
                </a>
                <a
                  href={championship.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <MessageCircle size={13} className="text-emerald-400" />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("sponsor", "2027 Championship Sponsorship Proposal")
                }
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#D60A19] hover:bg-[#b80815] text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                <span>Submit Sponsor Inquiry</span>
                <ArrowRight size={14} />
              </button>
              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal("vendor", "2027 Vendor & Showcase Inquiry")
                }
                className="cursor-pointer inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm px-6 py-3 rounded-full transition-colors whitespace-nowrap"
              >
                <span>Book Vendor Stall</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
