export interface BrochureExperience {
  title: string;
  tagline: string;
  category: string;
  desc: string;
  highlights: string[];
}

export interface BrochureCircuitSector {
  id: string;
  name: string;
  surface: string;
  pace: string;
  difficulty: string;
  description: string;
  features: string[];
  viewingTip: string;
}

export interface BrochureGalleryPhoto {
  id: string;
  src: string;
  caption: string;
  alt: string;
  focalY?: number;
  focalClass?: string;
}

export const CHAMPIONSHIP_EXPERIENCES: BrochureExperience[] = [
  {
    title: "01. Motocross Racing",
    tagline: "High-speed wheel-to-wheel battles",
    category: "Speed & Agility",
    desc: "20-gate synchronized starts, sculpted clay berms, and 25m tabletop leaps across championship heats.",
    highlights: [
      "20-Gate synchronized start",
      "Pro Open, Expert & Novice heats",
      "25m tabletop jumps & rhythm lines"
    ]
  },
  {
    title: "02. Hard Enduro Challenge",
    tagline: "Technical river boulders & mud",
    category: "Hard Enduro",
    desc: "Stamina battle over Seti riverbed granite boulders, staggered timber logs, forest roots, and water.",
    highlights: [
      "Granite riverbed boulder matrix",
      "Staggered timber matrix logs",
      "Elimination format racing"
    ]
  },
  {
    title: "03. Freestyle Stunts (FMX)",
    tagline: "Gravity-defying FMX shows",
    category: "Action Sports",
    desc: "Veteran FMX riders executing 60-65 ft gap backflips, seat-grabs, tandem leaps, and pyrotechnics.",
    highlights: [
      "Backflip combos & seat-grabs",
      "Tandem jumps & pyrotechnics",
      "Street burnout & wheelie shows"
    ]
  },
  {
    title: "04. Pokhara Street Parade",
    tagline: "Hundreds of bikes along Phewa Lake",
    category: "Community Ride",
    desc: "Escorted ceremonial motorcycle rally uniting touring clubs and racers along Lakeside Pokhara.",
    highlights: [
      "Escorted ride through Lakeside",
      "Open to all registered riders",
      "Promoting helmet safety culture"
    ]
  },
  {
    title: "05. Live Music Stage",
    tagline: "Bands, DJs & festival audio",
    category: "Festival Audio",
    desc: "High-energy Nepali DJ acts, live rock sets between heats, race commentary, and acoustic sunset lounge.",
    highlights: [
      "Live DJ sound & race commentary",
      "Live rock sets between main heats",
      "Evening acoustic sunset lounge"
    ]
  },
  {
    title: "06. Food & Lifestyle Village",
    tagline: "Himalayan BBQ & specialty coffee",
    category: "Catering & Culture",
    desc: "Festival eats with smoky Nepali sekuwa, woodfired pizzas, specialty espresso, and shaded arena screens.",
    highlights: [
      "Curated local & global food stalls",
      "Shaded dining with arena screens",
      "Artisanal coffee & juice bars"
    ]
  },
  {
    title: "07. Brand Expo Zone",
    tagline: "2027 motorcycles & safety gear",
    category: "Automotive & Gear",
    desc: "40+ brand booths showcasing 2027 motorcycles, EV prototypes, safety gear discounts, and test rides.",
    highlights: [
      "Vehicle unveils & dealership deals",
      "Designated consumer test-ride lane",
      "Discounts on helmets & armor"
    ]
  },
  {
    title: "08. Rider Afterparty",
    tagline: "Celebrate with champions & fans",
    category: "Nightlife & Podium",
    desc: "Official champion trophy toast, pro rider meet-and-greet, and closing DJ party under Pokhara night skies.",
    highlights: [
      "Champion trophy toast & podium meet",
      "VIP meet-and-greet with pro riders",
      "Signature closing DJ party"
    ]
  }
];

export const CIRCUIT_SECTORS: BrochureCircuitSector[] = [
  {
    id: "start-finish",
    name: "01. Start / Finish Straight",
    surface: "Compacted Clay / Timing Gate",
    pace: "Max Acceleration",
    difficulty: "High Speed",
    description: "Launch straight with electronic timing loops and transponder gates into sweeping turn 1.",
    features: ["20-Gate Drop Grid", "Holeshot Line", "Digital Timing Beacon"],
    viewingTip: "Grandstand main straight gives direct view of the 80-bike drop."
  },
  {
    id: "flat-river",
    name: "02. Flat [Stones / Water] & River",
    surface: "Wet River Stones, Silt & Cold Current",
    pace: "Slow / High Precision",
    difficulty: "Extreme",
    description: "Natural Himalayan riverbed strewn with slippery granite boulders and 2-foot water crossings.",
    features: ["Submerged Granite Boulders", "Current Resistance", "Traction Battles"],
    viewingTip: "Riverbank amphitheater offers close-up spray and splash views."
  },
  {
    id: "bridge",
    name: "03. Bridge [Narrow / Technical]",
    surface: "Timber Planks & Reinforced Span",
    pace: "Single-File Technical",
    difficulty: "Hard",
    description: "Suspended crossing over river gorge demanding pin-point handlebar precision.",
    features: ["Narrow 1.8m Bottleneck", "Approach Ramp", "Gorge Crossing"],
    viewingTip: "Footpath bridge vantage captures riders balancing across the span."
  },
  {
    id: "village",
    name: "04. Village Section [Hardpack]",
    surface: "Compacted Clay & Natural Stone Trails",
    pace: "Medium / Fast Sweepers",
    difficulty: "Hard",
    description: "Winding village pathways with hardpack clay offering high traction between terraced walls.",
    features: ["Blind Corners", "Stone Wall Run-Offs", "Rhythm Sweepers"],
    viewingTip: "Village hillside terraces provide elevated views of speed transitions."
  },
  {
    id: "enduro-forest",
    name: "05. Enduro [Forest / Roots]",
    surface: "Loam, Pine Needles & Tree Roots",
    pace: "Technical Endurance",
    difficulty: "Extreme",
    description: "Dense forest switchbacks crawling over slick diagonal tree roots and steep gradient climbs.",
    features: ["Root Staircases", "Off-Camber Bankings", "Canopy Shadow Shifts"],
    viewingTip: "Forest trail walking paths place spectators right beside the climb."
  },
  {
    id: "bamboo",
    name: "06. Bamboo [Sharp Turns]",
    surface: "Organic Humus & Sharp Chicanes",
    pace: "Tight S-Bends",
    difficulty: "Technical",
    description: "Intense bamboo grove maze featuring fast left-right flicks with tight handlebar clearance.",
    features: ["Natural Slalom", "Hairpin S-Bends", "Low Overhead Canopy"],
    viewingTip: "Corner 38 chicane entrance shows clutch slipping and pivot turns."
  },
  {
    id: "mx-section",
    name: "07. MX Section [Jumps / Berms]",
    surface: "Sculpted Motocross Clay & Ruts",
    pace: "Fast but Tiring",
    difficulty: "High Speed",
    description: "Motocross arena segment loaded with rhythm tabletops, step-downs, and 45-degree berms.",
    features: ["25m Tabletop Air", "Double Jump Line", "Banked Clay Berms"],
    viewingTip: "Central spectator hill provides 360-degree aerial jump views."
  },
  {
    id: "sand-section",
    name: "08. Sand [Deep Rutting]",
    surface: "Heavy Soft Sand",
    pace: "Physically Exhausting",
    difficulty: "Hard",
    description: "Deep silt-sand stretch testing endurance and throttle control as deep rolling ruts develop.",
    features: ["Unpredictable Rut Traps", "High RPM Sand Blasts", "Heavy Drag Zone"],
    viewingTip: "South bend overlooks riders charging through deep sand waves."
  }
];

export const SURFACE_MIX_SUMMARY = [
  { terrain: "River (wet, stones)", pace: "Slow / Technical Balance" },
  { terrain: "Village trails (hardpack)", pace: "Medium / Rhythm Sweepers" },
  { terrain: "Forest enduro + bamboo", pace: "Technical / Tight S-Bends" },
  { terrain: "MX + deep sand", pace: "Fast but Physically Tiring" }
];

export const ARCHIVE_2026_PHOTOS: BrochureGalleryPhoto[] = [
  {
    id: "a26-1",
    src: "/assets/aistudio/670957943_17869316799664194_1306959075209737257_n_b64c1da3.jpg",
    caption: "2026 Champion & Xtreme Trophy",
    alt: "Moto Enduro 2026 champion lifting the Winner sprocket trophy on stage with officials",
    focalY: 0.2,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "a26-2",
    src: "/assets/aistudio/670458791_17869313697664194_8037005004255165029_n__1__f44fb12a.jpg",
    caption: "Women's Division Podium",
    alt: "Women's division podium winners celebrating with trophies at Moto Enduro 2026",
    focalY: 0.2,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "a26-3",
    src: "/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg",
    caption: "Riverbed Wheelie · #555",
    alt: "Rider #555 pulling a wheelie across the riverbed water crossing in 2026",
    focalY: 0.3,
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "a26-4",
    src: "/assets/aistudio/671136712_17871000903664194_8704857497115292326_n__1__d7b574a4.jpg",
    caption: "Forest Logs & Roots Climb",
    alt: "Hard enduro rider navigating steep forest logs and roots past spectators in 2026",
    focalY: 0.35,
    focalClass: "object-cover object-[center_35%]"
  }
];

export const ARCHIVE_2024_PHOTOS: BrochureGalleryPhoto[] = [
  {
    id: "a24-1",
    src: "/assets/aistudio/602450155_122097115155183336_3931125237093247231_n_22a08ed1.jpg",
    caption: "2024 Start / Finish Arch",
    alt: "Rider beneath the Pokhara Moto Enduro Cross Championship 2024 truss arch",
    focalY: 0.28,
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "a24-2",
    src: "/assets/aistudio/605090937_122097125283183336_1382602027749110508_n_ac9a713f.jpg",
    caption: "Pokhara Street Parade",
    alt: "Championship street rally through Pokhara featuring #07 and #333",
    focalY: 0.28,
    focalClass: "object-cover object-[center_28%]"
  },
  {
    id: "a24-3",
    src: "/assets/aistudio/604708308_122097118593183336_8428160474394075660_n_02918b7e.jpg",
    caption: "Cultural Welcome Stage",
    alt: "Traditional cultural dance performance before the Moto Enduro 2024 main stage",
    focalY: 0.22,
    focalClass: "object-cover object-[center_22%]"
  },
  {
    id: "a24-4",
    src: "/assets/aistudio/604535159_122097114141183336_8252793026547161334_n_136b1eac.jpg",
    caption: "International Spectators",
    alt: "International visitors enjoying the 2024 Moto Enduro Cross festival in Pokhara",
    focalY: 0.18,
    focalClass: "object-cover object-[center_18%]"
  }
];

export const GALLERY_SHOWCASE_PHOTOS: BrochureGalleryPhoto[] = [
  {
    id: "gal-1",
    src: "/assets/aistudio/670458791_17869313697664194_8037005004255165029_n__1__f44fb12a.jpg",
    caption: "Women's Podium",
    alt: "Women's class podium winners celebrating with trophies",
    focalY: 0.18,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "gal-2",
    src: "/assets/aistudio/670927885_17869316787664194_1615222443891936316_n__1__855cbbea.jpg",
    caption: "Champion · #444",
    alt: "Champion rider with #444 dirt bike holding winner trophy on podium",
    focalY: 0.18,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "gal-3",
    src: "/assets/aistudio/672352852_17870149437664194_5890226800590230447_n__1__50dae4cc.jpg",
    caption: "River Wheelie · #555",
    alt: "Rider #555 popping a wheelie through water crossing in front of spectators",
    focalY: 0.3,
    focalClass: "object-cover object-[center_30%]"
  },
  {
    id: "gal-4",
    src: "/assets/aistudio/671136712_17871000903664194_8704857497115292326_n__1__d7b574a4.jpg",
    caption: "Forest Roots Stage",
    alt: "Hard enduro rider navigating steep forest logs and tree roots",
    focalY: 0.35,
    focalClass: "object-cover object-[center_35%]"
  },
  {
    id: "gal-5",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__2__b75a4b04.png",
    caption: "Trackside Crowd · #917",
    alt: "Rider #917 charging down the Pokhara track past cheering fans",
    focalY: 0.22,
    focalClass: "object-cover object-[center_22%]"
  },
  {
    id: "gal-6",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__4__82afe659.png",
    caption: "Paddock · #43, #909 & #36",
    alt: "Three riders in orange racing jerseys on bikes #43, #909, and #36 outside paddock tent",
    focalY: 0.18,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "gal-7",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__1__c6ed1c3e.png",
    caption: "Riders & Crew, Pokhara",
    alt: "Pokhara Moto Enduro riders and organizing team portrait",
    focalY: 0.18,
    focalClass: "object-cover object-[center_18%]"
  },
  {
    id: "gal-8",
    src: "/assets/aistudio/Moto_Enduro_Master_Proposal__3__04a0628c.png",
    caption: "Pokhara Highlights",
    alt: "Pokhara Moto Enduro Championship highlights collage",
    focalY: 0.5,
    focalClass: "object-cover object-center"
  }
];

export const XTREME_TITLE_PILLARS = [
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
];

export const COMMERCIAL_ECOSYSTEM_ITEMS = [
  "Title Sponsor (1 Slot — Reserved for Xtreme Energy Drink): Face of the Championship, naming rights & 100% category lock.",
  "Gold Sponsors (2 Slots): High-visibility race zone branding & Brand Expo pavilion (non-competing categories only).",
  "Silver Sponsors (3 Slots) & Supporting Partners (10 Slots): Event banners, lifestyle zone visibility & community sampling.",
  "Vendor Marketplace: EV Cars, Motorbikes & Gear Display Arena, Food Court Stalls, Retail Shops & Clean Tech Pavilion."
];

export const XTREME_DIGITAL_DELIVERABLES = [
  "Official title credit & visual lockup on pre-event hype trailers, daily race recaps, and 4K drone aftermovies.",
  "Creator Zone media backdrop wall co-branded with Xtreme Energy Drink for all post-heat rider & vlogger interviews.",
  "Coordinated reels, stories, and TikTok walkthroughs featuring the Xtreme sampling pavilion and chilled drink drops.",
  "Full press release inclusion across national Nepali sports desks, automotive portals, and tourism publications."
];

export const GENERAL_DIGITAL_DELIVERABLES = [
  "50+ partnered moto, adventure, and travel vloggers delivering continuous pre-event hype and live race-day coverage.",
  "Dedicated Creator Zone backdrop wall and infield media corridor capturing 4K slow-motion passes and interviews.",
  "Multi-platform campaign across YouTube, Instagram, Facebook, and TikTok targeting 5M-10M+ 2027 impressions.",
  "National press coverage across Nepali sports desks, automotive publications, and Pokhara tourism channels."
];

export const ENTRY_PORTALS = [
  {
    title: "Rider Registration",
    tag: "Class Heats 2027",
    desc: "Pro Open, Expert, Novice, Veteran & Women's classes with full scrutineering."
  },
  {
    title: "Sponsorship Tiers",
    tag: "Commercial Partnerships",
    desc: "Title, Gold, Silver & Supporting rights across track, expo & 20M+ digital reach."
  },
  {
    title: "Vendor Booths",
    tag: "Expo & Food Village",
    desc: "EV & motorbike display arenas, riding gear shops, BBQ & specialty cafés."
  },
  {
    title: "Media & Creator Pass",
    tag: "Press & Film Crews",
    desc: "Infield photo bibs, 4K drone permits, and direct paddock & rider access."
  }
];

export const STRICT_TRACK_RULE =
  "Strict Track Rule: Extreme motorcycle racing occurs strictly within designated, marshaled, and barricaded track arenas. All racers must hold valid competition insurance and approved DOT/ECE safety gear.";
