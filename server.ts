import "dotenv/config";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const IS_PROD = process.env.NODE_ENV === "production";
const BOOTSTRAPPED_ADMIN_EMAIL = "motoenduronp@gmail.com";

// Ephemeral in-memory HMAC signing secret fallback when SESSION_SECRET is unset
const SESSION_SIGNING_SECRET =
  process.env.SESSION_SECRET && process.env.SESSION_SECRET.trim().length >= 16
    ? process.env.SESSION_SECRET.trim()
    : crypto.randomBytes(32).toString("hex");

// Salted scrypt digest of the user-requested initial passcode when XTREME_PROPOSAL_PASSWORD env var is unset
const DEFAULT_PASSCODE_SALT = "6e241ce8f2d2aaf62cdec51750e14330";
const DEFAULT_PASSCODE_HASH =
  "254ab3e13bfd141915468ef0018ec5b1cbeb8b6a5fc8679edc73061242b2036e4d24f88b59e35541b5a3a67debe180cf4d7a72b287051c1aceac23c930c0bde8";

const TOKEN_TTL_MS = 4 * 60 * 60 * 1000; // 4 hours
const MAX_CUSTOM_COMPANIES = 40;

type CompanyProposalTier =
  | "title"
  | "gold"
  | "silver"
  | "supporting"
  | "showcase"
  | "tech-pavilion"
  | "food-vendor"
  | "retail-vendor";
type CompanyProposalIndustry =
  | "beverage"
  | "motorcycle"
  | "automotive"
  | "lubricants"
  | "tech"
  | "gear"
  | "hospitality"
  | "other";

interface FirebaseAppletConfig {
  apiKey?: string;
  projectId?: string;
  firestoreDatabaseId?: string;
}

interface ProposalPillar {
  heading: string;
  items: string[];
}

interface CompanyProposalContent {
  coverEyebrow: string;
  coverSubtitle: string;
  coverBanner: string;
  coverDescription: string;
  everestDescription: string;
  whyHeading: string;
  whyDescription: string;
  archive2026Title: string;
  page8Eyebrow: string;
  page8Title: string;
  investmentAmount: string;
  investmentLabel: string;
  titleLockupEyebrow: string;
  titleLockupHeadline: string;
  titleLockupSubtext: string;
  titlePillars: ProposalPillar[];
  commercialEcosystemHeading: string;
  commercialEcosystemItems: string[];
  digitalHeading: string;
  digitalDeliverables: string[];
  secretariatEyebrow: string;
  secretariatTitle: string;
  secretariatDescription: string;
  footerLabel: string;
  pdfFilename: string;
}

interface CompanyProposalRecord {
  id: string;
  companyName: string;
  tier: CompanyProposalTier;
  tierLabel: string;
  investmentAmount: string;
  industry: CompanyProposalIndustry;
  industryLabel: string;
  isBuiltIn: boolean;
  createdAt: string;
  content: CompanyProposalContent;
}

function loadFirebaseConfig(): FirebaseAppletConfig {
  try {
    const raw = fs.readFileSync(
      path.resolve(__dirname, "firebase-applet-config.json"),
      "utf8"
    );
    return JSON.parse(raw) as FirebaseAppletConfig;
  } catch {
    return {};
  }
}

const firebaseConfig = loadFirebaseConfig();

// Confidential Xtreme Energy Drink Title Proposal content (served only after server-side verification)
const XTREME_PROPOSAL_CONTENT: CompanyProposalContent = {
  coverEyebrow: "Complete Championship & Title Proposal",
  coverSubtitle: "Prepared Exclusively for Xtreme Energy Drink · 2027",
  coverBanner: "POWERED BY XTREME ENERGY DRINK",
  coverDescription:
    "Complete 10-page master proposal uniting every section of Himalayan Moto Enduro 2027 — Pokhara & Everest stages, all 8 motorsport & festival experiences, 2026 & 2024 archives, 2KM circuit map, 8 track sectors, 8 arena zones, official photo gallery, 50+ creators, FIM safety standards, and exclusive Title Sponsor deliverables for Xtreme Energy Drink.",
  everestDescription:
    "An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with GPS track files and stage maps to be confirmed ahead of race week — creating an unmatched international media storyline for Xtreme Energy Drink.",
  whyHeading: "Why Xtreme Energy Drink + Himalayan Moto Enduro",
  whyDescription:
    "Peak youth & adventure audience (18–35), extreme physical endurance creating natural demand for chilled energy drinks, proven 2026 podium brand equity, and year-round viral replay across 20M+ views on YouTube, Instagram, Facebook, and TikTok.",
  archive2026Title: "MOTO ENDURO 2026 — XTREME ENERGY DRINK PODIUM LEGACY",
  page8Eyebrow: "07. Exclusive Title Sponsorship Ownership · 1 Slot Only",
  page8Title: "XTREME ENERGY DRINK TITLE DELIVERABLES",
  investmentAmount: "NPR 15,00,000",
  investmentLabel: "Exclusive Title Package",
  titleLockupEyebrow:
    'Official "Powered By" Naming Rights & 100% Category Exclusivity',
  titleLockupHeadline:
    '"Pokhara Motocross Enduro Championship 2027 — Powered by Xtreme Energy Drink"',
  titleLockupSubtext:
    "Exclusive energy drink & functional beverage lock — zero competing brands permitted across track, expo, or media.",
  titlePillars: [
    {
      heading: "A. Dominant Naming & Trackside Visibility",
      items: [
        "Largest logo across all digital & physical championship assets",
        "Primary Start Gate, Finish Truss Arch & Main Podium backdrop",
        "Co-branded official T-shirts, rider bibs, trophies & medals",
        "Perimeter hoardings on MX jumps, river crossing & bridge"
      ]
    },
    {
      heading: "B. Press, Broadcast & Creator Ownership",
      items: [
        "Title mention in every press release & national media report",
        "Co-branded Creator Zone interview wall for 50+ vloggers",
        "Dedicated interviews with Nepal's top moto & travel creators",
        "Title mic shout-outs across heats, stunts & trophy finals"
      ]
    },
    {
      heading: "C. Flagship Brand Expo & Chilled Sampling",
      items: [
        "Prime flagship Xtreme Energy Drink pavilion in Brand Expo",
        "Exclusive chilled can sampling, giveaways & merchandise",
        "Branded rider hydration & recovery zone in Rider Paddock",
        "Fan challenges integrated with Live Music & DJ stage"
      ]
    },
    {
      heading: "D. Category Lock & VIP Leadership Access",
      items: [
        "100% energy drink & beverage exclusivity across the arena",
        "VIP Sky Lounge hospitality passes for brand executives",
        "Main stage champion trophy presentation at closing ceremony",
        "First right to extend Title Rights to Everest stage (Nov 2027)"
      ]
    }
  ],
  commercialEcosystemHeading:
    "2027 Championship Rate Card & Commercial Ecosystem",
  commercialEcosystemItems: [
    "Title Sponsor (1 Slot — Reserved for Xtreme Energy Drink): NPR 15,00,000 — Face of the Championship, naming rights & 100% category lock.",
    "Gold Sponsors (2 Slots): NPR 7,50,000 each — High-visibility race zone branding & Brand Expo pavilion (non-competing categories only).",
    "Silver Sponsors (3 Slots): NPR 4,00,000 each · Supporting Partners (10 Slots): NPR 1,50,000 each — Banners, lifestyle visibility & sampling.",
    "Vendor Marketplace (2 Days): EV/Bikes Arena NPR 1,50,000 · Tech Pavilion NPR 75,000 · Food Stalls NPR 35,000 · Retail Shops NPR 25,000."
  ],
  digitalHeading: "Xtreme Energy Drink Digital & Content Integration",
  digitalDeliverables: [
    "Official title credit & visual lockup on pre-event hype trailers, daily race recaps, and 4K drone aftermovies.",
    "Creator Zone media backdrop wall co-branded with Xtreme Energy Drink for all post-heat rider & vlogger interviews.",
    "Coordinated reels, stories, and TikTok walkthroughs featuring the Xtreme sampling pavilion and chilled drink drops.",
    "Full press release inclusion across national Nepali sports desks, automotive portals, and tourism publications."
  ],
  secretariatEyebrow:
    "Official Organizing Secretariat · Executive Partnership Desk",
  secretariatTitle: "PARTNER AS 2027 TITLE SPONSOR",
  secretariatDescription:
    "Title Sponsor investment (NPR 15,00,000), custom Xtreme Energy Drink arena branding blueprints, chilled distribution logistics, and multi-event Pokhara + Everest bundle options are finalized directly in an executive briefing with our organizing committee.",
  footerLabel:
    "Himalayan Moto Enduro 2027 · Xtreme Energy Drink Title Proposal · www.sporthubnepal.com",
  pdfFilename: "Xtreme-Energy-Drink-Himalayan-Moto-Enduro-2027-Proposal.pdf"
};

const TIER_METADATA: Record<
  CompanyProposalTier,
  {
    label: string;
    defaultPrice: string;
    priceLabel: string;
    slotNote: string;
    bannerPrefix: string;
    eyebrow: string;
    lockupEyebrow: string;
    secretariatTitle: string;
  }
> = {
  title: {
    label: "Title Sponsor",
    defaultPrice: "NPR 15,00,000",
    priceLabel: "Exclusive Title Package",
    slotNote: "1 Slot Only · Powered By Rights",
    bannerPrefix: "POWERED BY",
    eyebrow: "07. Exclusive Title Sponsorship Ownership · 1 Slot Only",
    lockupEyebrow: 'Official "Powered By" Naming Rights & 100% Category Exclusivity',
    secretariatTitle: "PARTNER AS 2027 TITLE SPONSOR"
  },
  gold: {
    label: "Gold Sponsor",
    defaultPrice: "NPR 7,50,000",
    priceLabel: "Gold Sponsorship Package",
    slotNote: "2 Slots · High Visibility Brand Partner",
    bannerPrefix: "OFFICIAL GOLD SPONSOR ·",
    eyebrow: "07. Gold Sponsorship Package · 2 Exclusive Slots",
    lockupEyebrow: "High-Visibility Championship Brand Partner & Race Zone Ownership",
    secretariatTitle: "LOCK YOUR 2027 GOLD PARTNERSHIP"
  },
  silver: {
    label: "Silver Sponsor",
    defaultPrice: "NPR 4,00,000",
    priceLabel: "Silver Sponsorship Package",
    slotNote: "3 Slots · Core Event Supporter",
    bannerPrefix: "OFFICIAL SILVER SPONSOR ·",
    eyebrow: "07. Silver Sponsorship Package · 3 Slots",
    lockupEyebrow: "Core Championship Integration Across Arena & Digital Touchpoints",
    secretariatTitle: "PARTNER AS 2027 SILVER SPONSOR"
  },
  supporting: {
    label: "Supporting Partner",
    defaultPrice: "NPR 1,50,000",
    priceLabel: "Supporting Partner Package",
    slotNote: "10 Slots · Community Builder",
    bannerPrefix: "OFFICIAL SUPPORTING PARTNER ·",
    eyebrow: "07. Supporting Partner Package · 10 Slots",
    lockupEyebrow: "Official Championship Community & Lifestyle Brand Partner",
    secretariatTitle: "JOIN AS 2027 SUPPORTING PARTNER"
  },
  showcase: {
    label: "EV / Vehicle & Gear Showcase",
    defaultPrice: "NPR 1,50,000",
    priceLabel: "2-Day Showcase Arena",
    slotNote: "Dedicated Vehicle Display Arena",
    bannerPrefix: "OFFICIAL SHOWCASE PARTNER ·",
    eyebrow: "07. Vehicle, EV & Gear Showcase Partnership",
    lockupEyebrow: "Dedicated Display Arena, Live Demos & Lead Generation Hub",
    secretariatTitle: "RESERVE YOUR 2027 SHOWCASE ARENA"
  },
  "tech-pavilion": {
    label: "Technology & Mobility Pavilion",
    defaultPrice: "NPR 75,000",
    priceLabel: "2-Day Tech Pavilion",
    slotNote: "10x20 ft Covered Clean Tech & EV Booth",
    bannerPrefix: "OFFICIAL TECH PAVILION ·",
    eyebrow: "07. Technology & Mobility Pavilion Showcase",
    lockupEyebrow: "Clean Energy, EV Charging & Smart Adventure Tech Zone",
    secretariatTitle: "RESERVE YOUR 2027 TECH PAVILION"
  },
  "food-vendor": {
    label: "Food & Beverage Vendor",
    defaultPrice: "NPR 35,000",
    priceLabel: "2-Day Food Court Stall",
    slotNote: "10x10 ft Stall or Food Truck · Food Court Zone",
    bannerPrefix: "OFFICIAL FOOD COURT PARTNER ·",
    eyebrow: "07. Food & Beverage Village Vendor Package",
    lockupEyebrow: "High-Footfall Festival Food Court & Dining Zone Placement",
    secretariatTitle: "BOOK YOUR 2027 FOOD COURT STALL"
  },
  "retail-vendor": {
    label: "Retail & Lifestyle Shop",
    defaultPrice: "NPR 25,000",
    priceLabel: "2-Day Retail Stall",
    slotNote: "10x10 ft or 10x15 ft · Lifestyle Market Zone",
    bannerPrefix: "OFFICIAL LIFESTYLE SHOP ·",
    eyebrow: "07. Retail & Lifestyle Market Vendor Package",
    lockupEyebrow: "Main Grandstand Walkway Apparel, Gear & Lifestyle Retail Stall",
    secretariatTitle: "BOOK YOUR 2027 LIFESTYLE STALL"
  }
};

const INDUSTRY_METADATA: Record<
  CompanyProposalIndustry,
  {
    label: string;
    audienceFit: string;
    activationIdea: string;
    exclusivityCategory: string;
  }
> = {
  beverage: {
    label: "Energy Drink & Beverage",
    audienceFit:
      "Peak youth & adventure audience (18–35), intense physical endurance driving natural demand for chilled beverages, and 20M+ proven digital video views.",
    activationIdea:
      "Flagship chilled sampling pavilion in Brand Expo, branded Rider Paddock hydration station, and crowd refreshment drops.",
    exclusivityCategory: "beverage & refreshment category"
  },
  motorcycle: {
    label: "Motorcycle & Off-Road OEM",
    audienceFit:
      "Direct access to 80+ competitive racers, 10,000+ passionate motorcycle enthusiasts, riding clubs, and Nepal's top moto vloggers.",
    activationIdea:
      "Dedicated 2027 model unveil pad, consumer test-ride lane, factory team paddock branding, and stunt show integration.",
    exclusivityCategory: "motorcycle OEM category"
  },
  automotive: {
    label: "EV & Automotive Brand",
    audienceFit:
      "High-intent adventure buyers, Pokhara tourism visitors, and nationwide digital audiences discovering rugged SUVs and next-gen EVs.",
    activationIdea:
      "Prime Vehicle Display Arena with live torque/terrain demos, official pace/recovery vehicle branding, and VIP shuttle showcase.",
    exclusivityCategory: "automotive & EV category"
  },
  lubricants: {
    label: "Lubricants, Tires & Parts",
    audienceFit:
      "Hardcore enduro & motocross terrain (river rocks, mud, roots, deep sand) provides real-world product proof in front of riders and mechanics.",
    activationIdea:
      "Official Paddock Service & Tech Pit branding, scrutineering bay presence, and mechanic demonstration workshops.",
    exclusivityCategory: "lubricants, tires & performance parts category"
  },
  tech: {
    label: "Telecom, Fintech & Tech",
    audienceFit:
      "Digitally active 18–35 crowd with 50+ live creators streaming reels, YouTube vlogs, and instant race highlights across Nepal.",
    activationIdea:
      "Official connectivity/timing partner branding, digital entry & QR fan engagement zone, and creator livestream hub.",
    exclusivityCategory: "telecom & digital services category"
  },
  gear: {
    label: "Apparel, Helmets & Gear",
    audienceFit:
      "FIM-aligned mandatory protective gear culture puts helmets, boots, armor, and technical apparel front and center across every race photo.",
    activationIdea:
      "Safety gear fitting lounge in Brand Expo, marshal & crew apparel co-branding, and exclusive festival rider discounts.",
    exclusivityCategory: "riding gear & motorsport apparel category"
  },
  hospitality: {
    label: "Food, Lifestyle & Hospitality",
    audienceFit:
      "Two full festival days in Pokhara uniting families, tourists, racing teams, and international riders with high on-site dwell time.",
    activationIdea:
      "Featured Food & Lifestyle Village flagship lounge, VIP hospitality hosting, and afterparty brand experience.",
    exclusivityCategory: "hospitality & lifestyle category"
  },
  other: {
    label: "Corporate & Multi-Category",
    audienceFit:
      "Unites 80+ national & international racers, 10,000+ live Pokhara spectators, and 20M+ proven multi-platform video views under FIM safety standards.",
    activationIdea:
      "Custom flagship Brand Expo booth, trackside visual dominance, and tailored creator storytelling across Pokhara and Everest.",
    exclusivityCategory: "brand category"
  }
};

function sanitizeSlug(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "Partner";
}

function buildCompanyProposal(params: {
  id: string;
  companyName: string;
  tier: CompanyProposalTier;
  industry: CompanyProposalIndustry;
  customPrice?: string;
  customNote?: string;
}): CompanyProposalRecord {
  const { id, companyName, tier, industry, customPrice, customNote } = params;
  const tierMeta = TIER_METADATA[tier];
  const industryMeta = INDUSTRY_METADATA[industry];
  const upperName = companyName.toUpperCase();
  const slug = sanitizeSlug(companyName);
  const investmentAmount =
    customPrice && customPrice.trim().length > 0
      ? customPrice.trim()
      : tierMeta.defaultPrice;

  const lockupHeadline =
    tier === "title"
      ? `"Pokhara Motocross Enduro Championship 2027 — Powered by ${companyName}"`
      : `"${companyName} — ${tierMeta.label} of Himalayan Moto Enduro 2027"`;

  const lockupSubtext =
    tier === "title"
      ? `Exclusive ${industryMeta.exclusivityCategory} lock — zero competing brands permitted across track, expo, or official media.`
      : `Tailored ${tierMeta.label.toLowerCase()} deliverables crafted for ${companyName} across Pokhara Arena, Brand Expo, and digital creator coverage.`;

  const pillars: ProposalPillar[] =
    tier === "title"
      ? [
          {
            heading: "A. Dominant Naming & Trackside Visibility",
            items: [
              `Largest ${companyName} logo across all digital & physical championship assets`,
              "Primary Start Gate, Finish Truss Arch & Main Podium backdrop",
              "Co-branded official T-shirts, rider bibs, trophies & medals",
              "Perimeter hoardings on MX jumps, river crossing & bridge"
            ]
          },
          {
            heading: "B. Press, Broadcast & Creator Ownership",
            items: [
              `${companyName} title credit in every press release & national media report`,
              "Co-branded Creator Zone interview wall for 50+ vloggers",
              "Dedicated interviews with Nepal's top moto & travel creators",
              "Title mic shout-outs across heats, stunts & trophy finals"
            ]
          },
          {
            heading: "C. Flagship Brand Expo & Fan Activation",
            items: [
              `Prime flagship ${companyName} pavilion in Brand Expo Zone`,
              industryMeta.activationIdea,
              "Direct product sampling, giveaways & lead-capture zone",
              "Fan challenges integrated with Live Music & DJ stage"
            ]
          },
          {
            heading: "D. Category Lock & VIP Leadership Access",
            items: [
              `100% exclusivity in the ${industryMeta.exclusivityCategory}`,
              "VIP Sky Lounge hospitality passes for brand executives",
              "Main stage champion trophy presentation at closing ceremony",
              "First right to extend Title Rights to Everest stage (Nov 2027)"
            ]
          }
        ]
      : tier === "gold"
      ? [
          {
            heading: "A. High-Visibility Race Zone Branding",
            items: [
              `Prominent ${companyName} logos across key race sectors & jumps`,
              "High-impact on-track hoarding banners for maximum broadcast capture",
              "Optional logo placement on rider bibs or paddock pit boards",
              "Official podium & main stage partner logo lockup"
            ]
          },
          {
            heading: "B. Creator Zone & Digital Reels",
            items: [
              "Inclusion in championship social reels, posters & recap aftermovies",
              `Co-branded influencer content featuring ${companyName} at Creator Zone`,
              "Live stage & race-heat announcer shout-outs during stunt moments",
              "Official press meet invitation & media wall visibility"
            ]
          },
          {
            heading: "C. Premium Brand Expo Pavilion",
            items: [
              `Prime ${companyName} exhibition booth in high-traffic Brand Expo`,
              industryMeta.activationIdea,
              "Direct sales, product demonstrations & customer lead capture",
              "Dedicated VIP passes for leadership & distributor guests"
            ]
          },
          {
            heading: "D. Two-Stage 2027 Series Extension",
            items: [
              "Priority Pokhara April 5–6, 2027 showcase positioning",
              "Preferred option to join Everest Corridor stage (Nov 2027)",
              "Post-event photo & 4K drone video asset rights package",
              "Dedicated organizing committee account coordinator"
            ]
          }
        ]
      : tier === "silver"
      ? [
          {
            heading: "A. Core Arena & Banner Visibility",
            items: [
              `${companyName} branding on official event banners & arena standees`,
              "Brand visibility inside the Food & Lifestyle Village",
              "Recognition on official digital race schedules & entry portals",
              "Official partner credit on website & arena maps"
            ]
          },
          {
            heading: "B. On-Site Product Display & Sampling",
            items: [
              `Dedicated ${companyName} product display counter in high-footfall zone`,
              industryMeta.activationIdea,
              "Direct spectator engagement across both championship race days",
              "Opportunity for branded giveaways & promotional vouchers"
            ]
          },
          {
            heading: "C. Social Media & Press Inclusion",
            items: [
              "Mentions in selected championship reels, stories & countdown posts",
              "Official invitation to pre-event press meet & media briefing",
              "Tagging across Adventure Sport Hub social channels",
              "Access to official race-day photography highlights"
            ]
          },
          {
            heading: "D. Hospitality & Networking",
            items: [
              "VIP & partner hospitality passes for company representatives",
              "Networking access with riders, dealers & Pokhara tourism leaders",
              "Priority upgrade option for Everest November 2027 edition",
              "Streamlined load-in and on-site logistics support"
            ]
          }
        ]
      : tier === "supporting"
      ? [
          {
            heading: "A. Official Partner Recognition",
            items: [
              `${companyName} logo featured on selected championship banners`,
              "Official Supporting Partner acknowledgment on event materials",
              "Digital partner credit across championship recap communications",
              "Association with Nepal's premier FIM-aligned motorsport festival"
            ]
          },
          {
            heading: "B. Community Sampling & Distribution",
            items: [
              "Opportunity to distribute product samples, flyers, or promo cards",
              industryMeta.activationIdea,
              "Direct touchpoint with 10,000+ live Pokhara spectators",
              "Inclusion in rider welcome kits (optional add-on)"
            ]
          },
          {
            heading: "C. Digital & Creator Exposure",
            items: [
              "Official social media thank-you & partner spotlight posts",
              "Organic brand capture across 50+ creator festival walkthroughs",
              "Cross-promotion alongside Adventure Sport Hub announcements",
              "Shareable official championship media assets"
            ]
          },
          {
            heading: "D. Event Access & Hospitality",
            items: [
              "Complimentary championship passes for brand team members",
              "Direct networking inside the Brand Expo & Paddock corridor",
              "Early-bird partner priority for future Himalayan Moto Series events",
              "Dedicated organizer desk coordination"
            ]
          }
        ]
      : tier === "showcase"
      ? [
          {
            heading: "A. Dedicated Vehicle & Gear Display Arena",
            items: [
              `Prime open-air ${companyName} display pad in Brand Expo Boulevard`,
              "Space engineered for EVs, motorcycles, off-road rigs, or gear rigs",
              "High-visibility approach right along the main spectator walkway",
              "Power hookup, perimeter security & overnight venue marshaling"
            ]
          },
          {
            heading: "B. Live Demos & Consumer Test Zone",
            items: [
              industryMeta.activationIdea,
              "Guided consumer walkarounds & product tech demonstrations",
              "Direct test-drive / test-ride booking desk for warm leads",
              "On-site sales, pre-orders & dealership sign-ups"
            ]
          },
          {
            heading: "C. Creator Walkthroughs & Media Features",
            items: [
              "Scheduled moto & automotive vlogger walkthrough features",
              `Dedicated ${companyName} showcase clips in official recap reels`,
              "Live MC call-outs directing crowds to your demo schedule",
              "High-resolution photography of your arena display"
            ]
          },
          {
            heading: "D. Lead Generation & Series Reach",
            items: [
              "Direct engagement with 10,000+ motorsport & adventure visitors",
              "Exposure to 80+ pro & amateur riders plus national riding clubs",
              "Full access to Pokhara April 2027 festival audience",
              "Priority invitation to Everest November 2027 expedition showcase"
            ]
          }
        ]
      : tier === "tech-pavilion"
      ? [
          {
            heading: "A. Covered Clean Tech & EV Pavilion (10x20 ft)",
            items: [
              `Dedicated ${companyName} 200 sq.ft. exhibition space inside Tech Pavilion`,
              "Reliable power hookups for EV chargers, portable solar & live telemetry",
              "High-visibility placement along the Brand Expo corridor",
              "Overnight venue security & load-in logistics coordination"
            ]
          },
          {
            heading: "B. Hands-On Product Demonstrations",
            items: [
              industryMeta.activationIdea,
              "Live charging, battery, GPS, drone, or gadget demos for attendees",
              "Direct customer consultation & B2B/B2C lead capture",
              "Right to run exclusive festival discounts & pre-order offers"
            ]
          },
          {
            heading: "C. Creator & Tech Media Spotlight",
            items: [
              "Organic walk-through coverage from 50+ digital creators & tech vloggers",
              `Inclusion of ${companyName} in Brand Expo highlight reels`,
              "MC stage mentions driving curious spectators to the Tech Pavilion",
              "Official exhibitor listing across digital venue maps"
            ]
          },
          {
            heading: "D. Full 2-Day Festival Access",
            items: [
              "Exhibitor staff passes for both Pokhara championship race days",
              "Direct exposure to 10,000+ youth, riders & adventure travelers",
              "Networking access with dealerships, riders & Pokhara tourism leaders",
              "Priority exhibitor slot for Everest November 2027 stage"
            ]
          }
        ]
      : tier === "food-vendor"
      ? [
          {
            heading: "A. Prime Food Court Zone Placement (2 Days)",
            items: [
              `Dedicated ${companyName} 10x10 ft stall or food truck bay in Food Village`,
              "Positioned beside shaded spectator dining and the Live Music & DJ stage",
              "Non-stop crowd footfall from morning heats to evening afterparty",
              "Electrical power connection & waste management support"
            ]
          },
          {
            heading: "B. High-Volume Festival Sales Potential",
            items: [
              "Direct access to 10,000+ spectators, 80+ race teams & support crews",
              "Estimated 8,000+ meal and beverage servings across both race days",
              "QR / mobile wallet & cash fast-service counter layout",
              "Right to display branded menu boards, flags & takeaway packaging"
            ]
          },
          {
            heading: "C. Influencer & Stage Exposure",
            items: [
              "Visibility in creator food-village walk-throughs & Instagram stories",
              "Live MC announcements highlighting the Food & Lifestyle Village",
              "Official food vendor directory listing on festival signage",
              "Shareable photo coverage of your active stall"
            ]
          },
          {
            heading: "D. Logistics & Vendor Support",
            items: [
              "Dedicated morning supply drop-off & service vehicle access window",
              "Overnight venue perimeter security between Day 1 and Day 2",
              "Vendor crew entry wristbands for kitchen & service team",
              "Priority returning-vendor invitation for future Himalayan Series rounds"
            ]
          }
        ]
      : [
          {
            heading: "A. Lifestyle Market Zone Placement (2 Days)",
            items: [
              `Dedicated ${companyName} 10x10 ft or 10x15 ft retail booth along grandstand path`,
              "High impulse shopping visibility between race heats & FMX stunt shows",
              "Ideal for apparel, sunglasses, helmets, accessories & action gear",
              "Overnight venue security patrol & covered stall structure"
            ]
          },
          {
            heading: "B. Direct Retail Sales & Product Launches",
            items: [
              "Direct-to-consumer sales to 10,000+ motorsport & adventure visitors",
              "Great launchpad for limited-edition festival merch or new collections",
              "Direct interaction with 80+ riders, riding clubs & youth fans",
              "Full freedom for branded displays, try-ons & promotional bundles"
            ]
          },
          {
            heading: "C. Social & Festival Content Exposure",
            items: [
              "Organic brand capture across 50+ lifestyle & moto vlogger walkthroughs",
              "Official Lifestyle Market vendor credit in championship maps",
              "Stage MC shout-outs directing fans to the Lifestyle Market Zone",
              "Access to official race-weekend event highlight photos"
            ]
          },
          {
            heading: "D. Vendor Access & Operations",
            items: [
              "Complimentary exhibitor staff wristbands for both race days",
              "Streamlined setup & teardown schedule with organizer support",
              "Power hookup option for lighting & POS devices",
              "Early-bird booking access for upcoming Himalayan Moto Series events"
            ]
          }
        ];

  const noteSuffix =
    customNote && customNote.trim().length > 0 ? ` ${customNote.trim()}` : "";

  return {
    id,
    companyName,
    tier,
    tierLabel: tierMeta.label,
    investmentAmount,
    industry,
    industryLabel: industryMeta.label,
    isBuiltIn: false,
    createdAt: new Date().toISOString(),
    content: {
      coverEyebrow: `Tailored ${tierMeta.label} Proposal`,
      coverSubtitle: `Prepared Exclusively for ${companyName} · 2027`,
      coverBanner: `${tierMeta.bannerPrefix} ${upperName}`,
      coverDescription: `Complete 10-page partnership proposal prepared exclusively for ${companyName} (${tierMeta.label} · ${investmentAmount}) — uniting every section of Himalayan Moto Enduro 2027 across Pokhara & Everest, all 8 experiences, 2026 & 2024 archives, 2KM circuit map, 8 track sectors, photo gallery, 50+ creators, FIM safety standards, and customized brand deliverables.`,
      everestDescription: `An all-new hard enduro expedition and high-altitude championship stage heading into the iconic Everest Himalayan corridor. Early rider entries are open now, with GPS track files and stage maps to be confirmed ahead of race week — creating an unforgettable international brand storyline for ${companyName}.`,
      whyHeading: `Why ${companyName} + Himalayan Moto Enduro`,
      whyDescription: industryMeta.audienceFit,
      archive2026Title: "MOTO ENDURO 2026 — PROVEN CHAMPIONSHIP LEGACY",
      page8Eyebrow: tierMeta.eyebrow,
      page8Title: `${upperName} — ${tierMeta.label.toUpperCase()} DELIVERABLES`,
      investmentAmount,
      investmentLabel: tierMeta.priceLabel,
      titleLockupEyebrow: tierMeta.lockupEyebrow,
      titleLockupHeadline: lockupHeadline,
      titleLockupSubtext: lockupSubtext,
      titlePillars: pillars,
      commercialEcosystemHeading: `2027 Rate Card & Commercial Ecosystem (${companyName} Positioning)`,
      commercialEcosystemItems: [
        `Selected Partnership for ${companyName}: ${tierMeta.label} — ${investmentAmount} (${tierMeta.slotNote}).`,
        "Sponsorship Tiers: Title Sponsor NPR 15,00,000 (1 Slot) · Gold Sponsor NPR 7,50,000 (2 Slots) · Silver NPR 4,00,000 (3 Slots) · Supporting NPR 1,50,000 (10 Slots).",
        "Vendor & Showcase Zones (2 Days): EV/Bikes Arena NPR 1,50,000 · Tech & Mobility Pavilion NPR 75,000 · Food & Beverage NPR 35,000 · Retail Shops NPR 25,000.",
        `Customized Sector Fit: Tailored ${industryMeta.label} activation plan across Pokhara Arena, Brand Expo, and 50+ creators.`
      ],
      digitalHeading: `${companyName} Digital & Creator Integration`,
      digitalDeliverables: [
        `Prominent ${companyName} visual integration across pre-event trailers, daily Pokhara recaps, and 4K drone aftermovies.`,
        "Creator Zone media backdrop & infield coverage uniting 50+ partnered moto, adventure, and travel vloggers.",
        `Coordinated reels, stories, and TikTok walkthroughs spotlighting ${companyName}'s on-site brand activation.`,
        "Press inclusion across national Nepali sports desks, automotive portals, and Pokhara tourism media."
      ],
      secretariatEyebrow:
        "Official Organizing Secretariat · Executive Partnership Desk",
      secretariatTitle: tierMeta.secretariatTitle,
      secretariatDescription: `Proposed package investment for ${companyName}: ${investmentAmount} (${tierMeta.label}). Customized arena branding layouts, activation logistics, and multi-event Pokhara + Everest bundle options are finalized directly with our organizing committee.${noteSuffix}`,
      footerLabel: `Himalayan Moto Enduro 2027 · ${companyName} (${tierMeta.label}) Proposal · www.sporthubnepal.com`,
      pdfFilename: `${slug}-Himalayan-Moto-Enduro-2027-Proposal.pdf`
    }
  };
}

const BUILTIN_XTREME_COMPANY: CompanyProposalRecord = {
  id: "xtreme-energy-drink",
  companyName: "Xtreme Energy Drink",
  tier: "title",
  tierLabel: "Title Sponsor",
  investmentAmount: "NPR 15,00,000",
  industry: "beverage",
  industryLabel: "Energy Drink & Beverage",
  isBuiltIn: true,
  createdAt: "2026-11-26T00:00:00.000Z",
  content: XTREME_PROPOSAL_CONTENT
};

// Confidential 2027 Rate Card (served strictly after server-side auth — never shipped in public JS)
const PRIVATE_RATE_CARD = {
  summaryRange: "NPR 25,000 – NPR 15,00,000",
  sponsorPrices: {
    "title-sponsor": { price: "NPR 15,00,000", period: "Exclusive Title Package" },
    "gold-sponsor": { price: "NPR 7,50,000", period: "Per Slot" },
    "silver-sponsor": { price: "NPR 4,00,000", period: "Per Slot" },
    "supporting-partner": { price: "NPR 1,50,000", period: "Per Slot" }
  },
  vendorPrices: {
    "ev-auto-gear": { price: "NPR 1,50,000", period: "2-Day Showcase Arena" },
    "tech-mobility": { price: "NPR 75,000", period: "2-Day Tech Pavilion" },
    "food-beverage": { price: "NPR 35,000", period: "2-Day Food Stall" },
    "retail-lifestyle": { price: "NPR 25,000", period: "2-Day Retail Stall" }
  },
  sponsorshipCategories: [
    {
      id: "title-sponsor",
      name: "Title Sponsor",
      price: "NPR 15,00,000",
      period: "Exclusive Title Package",
      slotsOrSize: "1 Slot · Powered By"
    },
    {
      id: "gold-sponsor",
      name: "Gold Sponsor",
      price: "NPR 7,50,000",
      period: "Per Slot",
      slotsOrSize: "2 Slots"
    },
    {
      id: "silver-sponsor",
      name: "Silver Sponsor",
      price: "NPR 4,00,000",
      period: "Per Slot",
      slotsOrSize: "3 Slots"
    },
    {
      id: "supporting-partner",
      name: "Supporting Partner",
      price: "NPR 1,50,000",
      period: "Per Slot",
      slotsOrSize: "10 Slots"
    }
  ],
  vendorCategories: [
    {
      id: "ev-auto-gear",
      name: "EV, Bikes & Riding Gear",
      price: "NPR 1,50,000",
      period: "2-Day Showcase Arena",
      slotsOrSize: "20x20 / 30x30 ft"
    },
    {
      id: "tech-mobility",
      name: "Technology & Mobility",
      price: "NPR 75,000",
      period: "2-Day Tech Pavilion",
      slotsOrSize: "10x20 ft Pavilion"
    },
    {
      id: "food-beverage",
      name: "Food & Beverage Vendors",
      price: "NPR 35,000",
      period: "2-Day Food Stall",
      slotsOrSize: "10x10 ft / Food Truck"
    },
    {
      id: "retail-lifestyle",
      name: "Retail & Lifestyle Shops",
      price: "NPR 25,000",
      period: "2-Day Retail Stall",
      slotsOrSize: "10x10 / 10x15 ft"
    }
  ],
  riderCategories: [
    {
      id: "pro-open",
      name: "Pro Open",
      price: "NPR 5,000",
      period: "Rider Entry Fee",
      slotsOrSize: "International & Top National"
    },
    {
      id: "national-expert",
      name: "National Expert",
      price: "NPR 4,000",
      period: "Rider Entry Fee",
      slotsOrSize: "Competitive Class"
    },
    {
      id: "veterans",
      name: "Veterans (40+)",
      price: "NPR 3,500",
      period: "Rider Entry Fee",
      slotsOrSize: "Over 40 Division"
    },
    {
      id: "novice",
      name: "Novice / Grassroots",
      price: "NPR 3,000",
      period: "Rider Entry Fee",
      slotsOrSize: "Open Grassroots Class"
    }
  ],
  tierOptions: [
    {
      value: "title" as CompanyProposalTier,
      label: 'Title Sponsor ("Powered By" · 1 Slot) — NPR 15,00,000',
      defaultPrice: "NPR 15,00,000"
    },
    {
      value: "gold" as CompanyProposalTier,
      label: "Gold Sponsor (2 Slots) — NPR 7,50,000",
      defaultPrice: "NPR 7,50,000"
    },
    {
      value: "silver" as CompanyProposalTier,
      label: "Silver Sponsor (3 Slots) — NPR 4,00,000",
      defaultPrice: "NPR 4,00,000"
    },
    {
      value: "supporting" as CompanyProposalTier,
      label: "Supporting Partner (10 Slots) — NPR 1,50,000",
      defaultPrice: "NPR 1,50,000"
    },
    {
      value: "showcase" as CompanyProposalTier,
      label: "EV / Vehicle & Gear Showcase (2 Days) — NPR 1,50,000",
      defaultPrice: "NPR 1,50,000"
    },
    {
      value: "tech-pavilion" as CompanyProposalTier,
      label: "Technology & Mobility Pavilion (2 Days) — NPR 75,000",
      defaultPrice: "NPR 75,000"
    },
    {
      value: "food-vendor" as CompanyProposalTier,
      label: "Food & Beverage Vendor Stall (2 Days) — NPR 35,000",
      defaultPrice: "NPR 35,000"
    },
    {
      value: "retail-vendor" as CompanyProposalTier,
      label: "Retail & Lifestyle Shop Stall (2 Days) — NPR 25,000",
      defaultPrice: "NPR 25,000"
    }
  ]
};

// Server-side in-memory vault of custom company proposals (persists across browser reloads)
const customCompanyProposals: CompanyProposalRecord[] = [];

function getAllCompanyProposals(): CompanyProposalRecord[] {
  return [BUILTIN_XTREME_COMPANY, ...customCompanyProposals];
}

// Simple in-memory rate limiter for unlock attempts (max 10 failed attempts / 15 min per IP)
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_ATTEMPTS = 10;
const failedAttempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: express.Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (now > entry.resetAt) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= RATE_LIMIT_MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string): void {
  const now = Date.now();
  const entry = failedAttempts.get(ip);
  if (!entry || now > entry.resetAt) {
    failedAttempts.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  } else {
    entry.count += 1;
  }
}

function clearFailedAttempts(ip: string): void {
  failedAttempts.delete(ip);
}

function verifyPasscode(candidate: string): boolean {
  const configured = process.env.XTREME_PROPOSAL_PASSWORD;
  if (typeof configured === "string" && configured.length > 0) {
    const expectedDigest = crypto.createHash("sha256").update(configured).digest();
    const candidateDigest = crypto.createHash("sha256").update(candidate).digest();
    return crypto.timingSafeEqual(expectedDigest, candidateDigest);
  }
  const derived = crypto.scryptSync(candidate, DEFAULT_PASSCODE_SALT, 64);
  const expected = Buffer.from(DEFAULT_PASSCODE_HASH, "hex");
  return derived.length === expected.length && crypto.timingSafeEqual(derived, expected);
}

function signSessionToken(subject: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      sub: subject,
      scope: "xtreme-proposal",
      exp: Date.now() + TOKEN_TTL_MS
    })
  ).toString("base64url");

  const sig = crypto
    .createHmac("sha256", SESSION_SIGNING_SECRET)
    .update(payload)
    .digest("base64url");

  return `xp.${payload}.${sig}`;
}

function verifySessionToken(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3 || parts[0] !== "xp") return false;
  const [, payload, sig] = parts;
  const expectedSig = crypto
    .createHmac("sha256", SESSION_SIGNING_SECRET)
    .update(payload)
    .digest("base64url");

  const sigBuf = Buffer.from(sig);
  const expectedBuf = Buffer.from(expectedSig);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return false;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      scope?: string;
      exp?: number;
    };
    return parsed.scope === "xtreme-proposal" && typeof parsed.exp === "number" && Date.now() < parsed.exp;
  } catch {
    return false;
  }
}

async function verifyFirebaseAdminToken(idToken: string): Promise<boolean> {
  if (!firebaseConfig.apiKey || !firebaseConfig.projectId) return false;

  try {
    const lookupRes = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(firebaseConfig.apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken })
      }
    );

    if (!lookupRes.ok) return false;
    const lookupData = (await lookupRes.json()) as {
      users?: Array<{
        localId?: string;
        email?: string;
        emailVerified?: boolean;
      }>;
    };

    const user = lookupData.users?.[0];
    if (!user || user.emailVerified !== true || !user.localId) {
      return false;
    }

    if (user.email === BOOTSTRAPPED_ADMIN_EMAIL) {
      return true;
    }

    // Verify secondary admin membership in Firestore /admins/{uid} using the caller's own Firebase token
    const databaseId = firebaseConfig.firestoreDatabaseId || "(default)";
    const safeUid = encodeURIComponent(user.localId);
    const docUrl = `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      firebaseConfig.projectId
    )}/databases/${encodeURIComponent(databaseId)}/documents/admins/${safeUid}`;

    const docRes = await fetch(docUrl, {
      headers: { Authorization: `Bearer ${idToken}` }
    });
    if (!docRes.ok) return false;

    const docJson = (await docRes.json()) as {
      fields?: { role?: { stringValue?: string } };
    };
    return docJson.fields?.role?.stringValue === "admin";
  } catch {
    return false;
  }
}

async function authorizePrivateRequest(
  req: express.Request
): Promise<"passcode" | "admin" | null> {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  const token = match?.[1]?.trim();
  if (!token) return null;

  if (verifySessionToken(token)) {
    return "passcode";
  }

  const isFirebaseAdmin = await verifyFirebaseAdminToken(token);
  if (isFirebaseAdmin) {
    return "admin";
  }

  return null;
}

const VALID_TIERS = new Set<CompanyProposalTier>([
  "title",
  "gold",
  "silver",
  "supporting",
  "showcase",
  "tech-pavilion",
  "food-vendor",
  "retail-vendor"
]);
const VALID_INDUSTRIES = new Set<CompanyProposalIndustry>([
  "beverage",
  "motorcycle",
  "automotive",
  "lubricants",
  "tech",
  "gear",
  "hospitality",
  "other"
]);

async function startServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(express.json({ limit: "16kb" }));

  // Baseline security headers (omit X-Frame-Options for AI Studio iframe compatibility)
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // Unlock Private Proposals Vault via password
  app.post("/api/xtreme-proposal/unlock", (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const ip = getClientIp(req);

    if (isRateLimited(ip)) {
      res.status(429).json({
        error: "Too many incorrect attempts. Please wait 15 minutes and try again."
      });
      return;
    }

    const body = req.body as { password?: unknown } | undefined;
    const password = typeof body?.password === "string" ? body.password.trim() : "";

    if (!password || password.length > 128) {
      res.status(400).json({ error: "Please enter the access password." });
      return;
    }

    if (!verifyPasscode(password)) {
      recordFailedAttempt(ip);
      res.status(401).json({ error: "Incorrect password. Access denied." });
      return;
    }

    clearFailedAttempts(ip);
    const token = signSessionToken("passcode-viewer");
    res.status(200).json({
      token,
      accessMethod: "passcode",
      content: XTREME_PROPOSAL_CONTENT,
      companies: getAllCompanyProposals(),
      rateCard: PRIVATE_RATE_CARD
    });
  });

  // Fetch all Private Company Proposals using signed session Bearer token or Firebase Admin ID token
  app.get("/api/xtreme-proposal/content", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const accessMethod = await authorizePrivateRequest(req);
    if (!accessMethod) {
      const hasHeader = Boolean(req.headers.authorization);
      res.status(hasHeader ? 403 : 401).json({
        error: "Admin authorization or valid access password required."
      });
      return;
    }

    res.status(200).json({
      accessMethod,
      content: XTREME_PROPOSAL_CONTENT,
      companies: getAllCompanyProposals(),
      rateCard: PRIVATE_RATE_CARD
    });
  });

  // Create a custom company proposal in the private vault
  app.post("/api/private-proposals/companies", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const accessMethod = await authorizePrivateRequest(req);
    if (!accessMethod) {
      res.status(401).json({ error: "Authorization required." });
      return;
    }

    if (customCompanyProposals.length >= MAX_CUSTOM_COMPANIES) {
      res.status(400).json({
        error: `Maximum of ${MAX_CUSTOM_COMPANIES} custom company proposals reached. Remove one to add another.`
      });
      return;
    }

    const body = req.body as
      | {
          companyName?: unknown;
          tier?: unknown;
          industry?: unknown;
          customPrice?: unknown;
          customNote?: unknown;
        }
      | undefined;

    const rawName = typeof body?.companyName === "string" ? body.companyName : "";
    const companyName = rawName.replace(/[\r\n\t]+/g, " ").trim();
    if (companyName.length < 2 || companyName.length > 80) {
      res.status(400).json({
        error: "Company name must be between 2 and 80 characters."
      });
      return;
    }

    const tier = body?.tier as CompanyProposalTier;
    if (!VALID_TIERS.has(tier)) {
      res.status(400).json({ error: "Please select a valid sponsorship tier." });
      return;
    }

    const industry = body?.industry as CompanyProposalIndustry;
    if (!VALID_INDUSTRIES.has(industry)) {
      res.status(400).json({ error: "Please select a valid company industry." });
      return;
    }

    const rawPrice = typeof body?.customPrice === "string" ? body.customPrice : "";
    const customPrice = rawPrice.replace(/[\r\n\t]+/g, " ").trim().slice(0, 48);

    const rawNote = typeof body?.customNote === "string" ? body.customNote : "";
    const customNote = rawNote.replace(/[\r\n\t]+/g, " ").trim().slice(0, 260);

    const id = `custom-${sanitizeSlug(companyName).toLowerCase().slice(0, 32)}-${crypto
      .randomBytes(4)
      .toString("hex")}`;

    const created = buildCompanyProposal({
      id,
      companyName,
      tier,
      industry,
      customPrice,
      customNote
    });

    customCompanyProposals.unshift(created);
    res.status(201).json({
      company: created,
      companies: getAllCompanyProposals()
    });
  });

  // Delete a custom company proposal from the private vault
  app.delete("/api/private-proposals/companies/:id", async (req, res) => {
    res.setHeader("Cache-Control", "no-store");
    const accessMethod = await authorizePrivateRequest(req);
    if (!accessMethod) {
      res.status(401).json({ error: "Authorization required." });
      return;
    }

    const id = String(req.params.id || "");
    if (!/^custom-[a-z0-9-]+$/.test(id)) {
      res.status(400).json({ error: "Invalid custom proposal ID." });
      return;
    }

    const idx = customCompanyProposals.findIndex((c) => c.id === id);
    if (idx === -1) {
      res.status(404).json({ error: "Company proposal not found." });
      return;
    }

    customCompanyProposals.splice(idx, 1);
    res.status(200).json({
      companies: getAllCompanyProposals()
    });
  });

  // Frontend mounting: Vite middleware in dev, pre-built dist/ in production
  if (!IS_PROD) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("/{*path}", (req, res, next) => {
      if (req.path.startsWith("/api/")) {
        next();
        return;
      }
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
