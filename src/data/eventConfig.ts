/**
 * Centralized Event Configuration
 * Extreme Moto Enduro Cross Championship 2027
 * All dates, venues, contacts, metrics, and packages are maintained here.
 */

import { LOCAL_IMAGES } from "../lib/localImages";

export interface EventConfig {
  championship: {
    name: string;
    edition: string;
    year: number;
    tagline: string;
    subTagline: string;
    dates: string; // e.g. "To Be Announced (Spring 2027)"
    venue: string;
    city: string;
    country: string;
    elevation: string;
    organizer: {
      name: string;
      referenceWebsite: string;
      contactPerson: string;
      phone: string;
      phoneDisplay: string;
      email: string;
      address: string;
    };
    socials: {
      instagram: string;
      facebook: string;
      tiktok: string;
      youtube: string;
      whatsapp: string;
    };
  };
  previousAchievements: {
    riders: number;
    ridersSuffix: string;
    ridersLabel: string;
    spectators: number;
    spectatorsSuffix: string;
    spectatorsLabel: string;
    onlineViews: string;
    onlineViewsLabel: string;
    influencers: number;
    influencersSuffix: string;
    influencersLabel: string;
  };
}

export const EVENT_CONFIG: EventConfig = {
  championship: {
    name: "EXTREME MOTO ENDURO CROSS",
    edition: "CHAMPIONSHIP 2027",
    year: 2027,
    tagline: "NEPAL'S ULTIMATE OFF-ROAD MOTORSPORT.",
    subTagline: "Extreme racing, technical terrain, freestyle stunts, and an international motorsport festival in Pokhara.",
    dates: "Dates TBA — 2027 Season",
    venue: "Pokhara Championship Arena & Mountain Trail",
    city: "Pokhara",
    country: "Nepal",
    elevation: "822m - 1,400m",
    organizer: {
      name: "Adventure Sport Hub, Pokhara",
      referenceWebsite: "https://sportshubnepal.com",
      contactPerson: "Jagat Dhauli",
      phone: "+9779867695261",
      phoneDisplay: "+977 9867695261",
      email: "motoenduronp@gmail.com",
      address: "Lakeside 06, Pokhara, Nepal"
    },
    socials: {
      instagram: "https://instagram.com/sportshubnepal",
      facebook: "https://facebook.com/sportshubnepal",
      tiktok: "https://tiktok.com/@sportshubnepal",
      youtube: "https://youtube.com/@sportshubnepal",
      whatsapp: "https://wa.me/9779867695261?text=Inquiry:%20Extreme%20Moto%20Enduro%202027"
    }
  },
  previousAchievements: {
    riders: 80,
    ridersSuffix: "+",
    ridersLabel: "Competing Riders",
    spectators: 10000,
    spectatorsSuffix: "+",
    spectatorsLabel: "Spectators On-Site",
    onlineViews: "20M+",
    onlineViewsLabel: "Online Views",
    influencers: 50,
    influencersSuffix: "+",
    influencersLabel: "Influencers & Creators"
  }
};

export interface TrackZone {
  id: string;
  name: string;
  category: "track" | "paddock" | "spectator" | "commercial";
  shortDesc: string;
  fullDesc: string;
  features: string[];
  capacityOrLength: string;
  difficulty?: "Extreme" | "Pro / Advanced" | "All Classes" | "Public Access";
  viewingTip: string;
  photoUrl: string;
  coordinates: { x: number; y: number; width: number; height: number; radius?: number };
}

export const TRACK_ZONES: TrackZone[] = [
  {
    id: "enduro-section",
    name: "Hard Enduro Boulder Matrix",
    category: "track",
    shortDesc: "Natural river boulders and timber matrix.",
    fullDesc: "Massive Seti riverbed boulders, staggered timber matrix, and steep rock climbs testing trials balance.",
    features: ["Granite Boulders", "Log Matrix", "Steep Ascent"],
    capacityOrLength: "450m technical loop",
    difficulty: "Extreme",
    viewingTip: "Hillside amphitheater with direct sightlines of rider traction battles.",
    photoUrl: LOCAL_IMAGES.hardEnduroRiverBoulders,
    coordinates: { x: 18, y: 22, width: 28, height: 26 }
  },
  {
    id: "motocross-section",
    name: "Supercross Motocross Arena",
    category: "track",
    shortDesc: "High-speed rhythm berms and triple tabletops.",
    fullDesc: "120m straightaway into banked clay berms, rhythm doubles, and 25m tabletop launches.",
    features: ["25m Tabletop", "Banked Berms", "20-Gate Drop"],
    capacityOrLength: "1,200m sprint track",
    difficulty: "Pro / Advanced",
    viewingTip: "Grandstand A overlooks the holeshot and premier airborne jump.",
    photoUrl: LOCAL_IMAGES.motocrossMxJump,
    coordinates: { x: 50, y: 15, width: 34, height: 32 }
  },
  {
    id: "technical-terrain",
    name: "Mud Trench & Water Splash",
    category: "track",
    shortDesc: "Deep mud ruts and concrete pipe jumps.",
    fullDesc: "Brutal 3-foot silt canal testing water protection and throttle control.",
    features: ["Silt Water Trench", "Pipe Step-Up"],
    capacityOrLength: "180m mud zone",
    difficulty: "Extreme",
    viewingTip: "Standing rail area right at the water crossing for action shots.",
    photoUrl: LOCAL_IMAGES.hardEnduroRiverBoulders,
    coordinates: { x: 26, y: 52, width: 22, height: 24 }
  },
  {
    id: "rider-paddock",
    name: "Rider Paddock & Pit Bays",
    category: "paddock",
    shortDesc: "Team mechanics, tool bays, and tech check.",
    fullDesc: "Race operations hub for machine prep, tire swaps, and engine tuning.",
    features: ["Scrutineering Tent", "Tire & Tool Hub", "Rider Briefing"],
    capacityOrLength: "100+ Team Bays",
    difficulty: "All Classes",
    viewingTip: "Paddock pass holders get direct autograph access.",
    photoUrl: LOCAL_IMAGES.heroMotocrossRider,
    coordinates: { x: 4, y: 56, width: 20, height: 36 }
  },
  {
    id: "fmx-stunt-zone",
    name: "Freestyle Stunt Ramp",
    category: "track",
    shortDesc: "FMX backflips, whips, and stunt shows.",
    fullDesc: "Pro stunt riders executing 65-foot gap backflips, whips, and synchronized tricks.",
    features: ["Steel Launch Ramp", "Dirt Landing Berm", "Pyro FX"],
    capacityOrLength: "65-foot launch gap",
    difficulty: "Pro / Advanced",
    viewingTip: "Central arena provides 360-degree aerial views.",
    photoUrl: LOCAL_IMAGES.freestyleStuntFmx,
    coordinates: { x: 52, y: 52, width: 20, height: 22 }
  },
  {
    id: "vip-sponsor-lounge",
    name: "VIP Sponsor Sky Lounge",
    category: "spectator",
    shortDesc: "Elevated covered deck with hospitality.",
    fullDesc: "Panoramic arena views, indoor lounge, gourmet catering, and corporate networking.",
    features: ["Elevated Balcony", "LED Broadcast", "Private Catering"],
    capacityOrLength: "400 VIP Guests",
    difficulty: "Public Access",
    viewingTip: "Highest vantage point over entire track with Annapurna view.",
    photoUrl: LOCAL_IMAGES.motocrossMxJump,
    coordinates: { x: 74, y: 48, width: 22, height: 24 }
  },
  {
    id: "brand-expo-zone",
    name: "Brand Expo & Test Rides",
    category: "commercial",
    shortDesc: "Automotive, EV bikes, and gear showcases.",
    fullDesc: "Leading brands showcase 2027 motorcycles, EV mobility, and gear with live test rides.",
    features: ["Vehicle Displays", "Demo Arenas", "Gear Shops"],
    capacityOrLength: "40+ Brand Booths",
    difficulty: "Public Access",
    viewingTip: "South gate boulevard with exclusive discounts.",
    photoUrl: LOCAL_IMAGES.enduroHelmetStudio,
    coordinates: { x: 30, y: 78, width: 36, height: 18 }
  },
  {
    id: "food-lifestyle-village",
    name: "Food, Music & Festival Hub",
    category: "commercial",
    shortDesc: "Himalayan BBQ, live DJs, and chill zones.",
    fullDesc: "Nepali BBQ, woodfired pizzas, specialty coffee, and live acoustic/DJ sets.",
    features: ["Street Eats & BBQ", "Live DJ Stage", "Chill Lounge"],
    capacityOrLength: "3,500 Festival Visitors",
    difficulty: "Public Access",
    viewingTip: "Central hub connecting moto action and evening afterparty.",
    photoUrl: LOCAL_IMAGES.freestyleStuntFmx,
    coordinates: { x: 68, y: 74, width: 28, height: 22 }
  }
];

export interface InfluencerProfile {
  name: string;
  role: string;
  platforms: string[];
  reach: string;
  focus: string;
  quote: string;
  badge: string;
  photoUrl?: string;
}

export const INFLUENCERS: InfluencerProfile[] = [
  {
    name: "Surakshya KC",
    role: "Moto Vlogger",
    platforms: ["Instagram", "YouTube", "TikTok"],
    reach: "Top Tier",
    focus: "Expeditions & Youth Culture",
    quote: "Brings world-class hard enduro racing right to Pokhara.",
    badge: "Digital Ambassador"
  },
  {
    name: "Motomaniac Prabhat",
    role: "Moto-Vlogger & Mechanic",
    platforms: ["YouTube", "Facebook"],
    reach: "Leading Moto Channel",
    focus: "Tech Reviews & Track Breakdown",
    quote: "80+ tuned machines revving at the gate is pure adrenaline.",
    badge: "Tech Analyst"
  },
  {
    name: "Mandira Bhandari",
    role: "Motorsport Creator",
    platforms: ["Instagram", "TikTok"],
    reach: "High Engagement",
    focus: "Action Sports & Lifestyle",
    quote: "Inspiring more young riders to take on technical trails.",
    badge: "Lifestyle Host"
  },
  {
    name: "Raj Kumar Thapamagar",
    role: "Enduro Specialist",
    platforms: ["YouTube", "Instagram"],
    reach: "Pro Off-Road",
    focus: "Hard Enduro & Hill Climbs",
    quote: "Pokhara's boulder matrix separates champions from the rest.",
    badge: "Enduro Pro"
  },
  {
    name: "Bibid Jung Thapa",
    role: "Action Filmmaker",
    platforms: ["YouTube", "Instagram"],
    reach: "Global Audience",
    focus: "4K Drone Cinematography",
    quote: "Riders flying through dust with the Annapurnas is unreal.",
    badge: "Cinematographer"
  },
  {
    name: "Susmita Adhikari",
    role: "Event Host",
    platforms: ["Instagram", "TikTok"],
    reach: "Mass Audience",
    focus: "Fan Interactions & Festival Vibe",
    quote: "Extreme racing and festival beats create pure electricity.",
    badge: "Stage Host"
  }
];

export interface SponsorPackage {
  id: string;
  tier: string;
  headline: string;
  badge: string;
  priceNote: string;
  keyHighlights: string[];
  entitlements: {
    branding: string[];
    media: string[];
    hospitality: string[];
    activation: string[];
  };
  recommendedFor: string;
}

export const SPONSOR_PACKAGES: SponsorPackage[] = [
  {
    id: "title-sponsor",
    tier: "TITLE SPONSOR",
    headline: "Championship Naming Rights & Maximum Exposure",
    badge: "Exclusive (1 Brand)",
    priceNote: "Custom Partnership",
    keyHighlights: [
      "'[Your Brand] Extreme Moto Enduro Cross 2027' across all media",
      "Prime logo on rider bibs, medals, and champion trophy",
      "Full digital, broadcast, and print campaign ownership",
      "100 VIP Passes + Private Hospitality Sky Lounge"
    ],
    entitlements: {
      branding: [
        "Championship naming rights across all marketing channels",
        "Start gate banner, finish arch, and podium backdrop billing",
        "Logo on official rider jerseys and champion trophy",
        "100+ high-visibility trackside perimeter hoardings"
      ],
      media: [
        "Guaranteed 5M+ social impressions via creator roster",
        "Dedicated brand documentary feature video",
        "Top-tier banner on official site and ticketing"
      ],
      hospitality: [
        "100 VIP Championship All-Access Passes",
        "Private 40-seat Sky Lounge with gourmet hospitality",
        "Trophy presentation during the awards ceremony"
      ],
      activation: [
        "1,000 sq.ft. experiential brand pavilion at main entrance",
        "Exclusive vehicle or product launch on main arena stage"
      ]
    },
    recommendedFor: "Automotive OEMs, Telecom, Energy Drinks, National Banks"
  },
  {
    id: "presenting-sponsor",
    tier: "PRESENTING SPONSOR",
    headline: "High-Visibility Co-Branding Across Touchpoints",
    badge: "Limited (2 Brands)",
    priceNote: "Premium Co-Sponsorship",
    keyHighlights: [
      "'Championship Presented by [Your Brand]'",
      "Podium and starting gate perimeter branding",
      "Custom creator campaign with 3M+ impressions",
      "50 VIP Passes with Sky Lounge Access"
    ],
    entitlements: {
      branding: [
        "Co-branding on stage backdrops and starting gate sides",
        "60+ trackside banners along high-action jumps",
        "Logo on spectator wristbands and official posters"
      ],
      media: [
        "3M+ digital impressions across Instagram & YouTube",
        "Feature integration in official video aftermovie"
      ],
      hospitality: [
        "50 VIP Championship Passes with lounge access",
        "Category awards stage presentation rights"
      ],
      activation: [
        "600 sq.ft. exhibition space in Brand Expo boulevard"
      ]
    },
    recommendedFor: "Lubricants, Tires, Electronics, FinTech & Digital Wallets"
  },
  {
    id: "category-partners",
    tier: "CATEGORY PARTNER",
    headline: "Exclusive Industry Sector Dominance",
    badge: "Category Exclusive",
    priceNote: "Strategic Category Tier",
    keyHighlights: [
      "Official Partner status in your exclusive sector",
      "Obstacle naming rights (e.g., '[Brand] Matrix Wall')",
      "30 Trackside banners & digital spotlight",
      "25 VIP Passes + 400 sq.ft. display booth"
    ],
    entitlements: {
      branding: [
        "Exclusive title: 'Official [Category] Partner'",
        "Naming rights for one signature track obstacle",
        "30 High-impact trackside banners"
      ],
      media: [
        "1.5M+ digital impressions via sponsored reels",
        "Logo on partners wall and official program"
      ],
      hospitality: [
        "25 VIP All-Access passes with Hospitality access"
      ],
      activation: [
        "400 sq.ft. Brand Expo display space"
      ]
    },
    recommendedFor: "Riding Gear, Helmets, Dealerships, Energy Beverages"
  },
  {
    id: "automotive-mobility",
    tier: "AUTOMOTIVE PARTNER",
    headline: "Test-Rides, Dealership Leads & Vehicle Unveils",
    badge: "Automotive / EV",
    priceNote: "High ROI Commercial",
    keyHighlights: [
      "Dedicated consumer test-ride track area",
      "New 2027 vehicle reveal on the podium stage",
      "Direct leads from 10,000+ motorsport fans",
      "20 VIP Passes + 800 sq.ft. Pavilion"
    ],
    entitlements: {
      branding: [
        "Official Motorcycle / EV Mobility Partner",
        "Paddock and track perimeter signage"
      ],
      media: [
        "Dedicated bike walkthrough by top moto-vlogger",
        "Spotlight social campaign promoting test rides"
      ],
      hospitality: [
        "20 VIP passes for executive dealership clients"
      ],
      activation: [
        "800 sq.ft. pavilion with consumer test-ride registration"
      ]
    },
    recommendedFor: "Motorcycle Manufacturers, EV Dirtbikes, ATV Importers"
  },
  {
    id: "digital-media",
    tier: "DIGITAL & MEDIA PARTNER",
    headline: "Broadcast Overlays & Creator Amplification",
    badge: "Media & Tech",
    priceNote: "Content Distribution",
    keyHighlights: [
      "Live stream graphics overlay and stream branding",
      "Creator lounge naming rights ('[Brand] Media Hub')",
      "Co-branded viral clip series",
      "15 VIP Passes + Media Accreditation"
    ],
    entitlements: {
      branding: [
        "Branding inside Media & Press Lounge",
        "Overlay logo on live broadcast streams and reels"
      ],
      media: [
        "Co-branded video highlights across YouTube channels",
        "Exclusive champion rider interviews"
      ],
      hospitality: [
        "15 VIP passes + priority media pit passes"
      ],
      activation: [
        "Interactive photo/video streaming booth"
      ]
    },
    recommendedFor: "Broadcasters, Action Cameras, Tech Brands, ISPs"
  },
  {
    id: "food-lifestyle",
    tier: "FOOD & LIFESTYLE PARTNER",
    headline: "Festival Dining & Afterparty Co-Hosting",
    badge: "Food & Beverage",
    priceNote: "Hospitality & Retail",
    keyHighlights: [
      "Exclusive pouring or dining village rights",
      "Branding across picnic zones and afterparty",
      "Direct cash flow from 10,000+ festival goers",
      "10 VIP Passes + Food Village Stalls"
    ],
    entitlements: {
      branding: [
        "Branding on dining tables, umbrellas, and banners",
        "Official Afterparty co-host branding"
      ],
      media: [
        "Social media shout-outs as official Food Partner"
      ],
      hospitality: [
        "10 VIP passes + catering vouchers"
      ],
      activation: [
        "Prime location food stalls with utility power"
      ]
    },
    recommendedFor: "Breweries, Coffee Brands, Restaurants, Lifestyle Apparel"
  }
];

export interface VendorOpportunity {
  id: string;
  title: string;
  category: string;
  iconName: string;
  description: string;
  benefits: string[];
  stallSizes: string;
  suitableFor: string;
  footfallTarget: string;
}

export const VENDOR_OPPORTUNITIES: VendorOpportunity[] = [
  {
    id: "ev-auto-gear",
    title: "EV, Bikes & Riding Gear",
    category: "Automotive & Gear",
    iconName: "Bike",
    description: "Showcase motorcycles, EV off-roaders, helmets, boots, and performance parts directly to active riders.",
    benefits: [
      "Audience of 80+ racers and thousands of bike owners",
      "Live gear fitting, tire demos, and exhaust sound tests",
      "Designated test-ride demo corridor access"
    ],
    stallSizes: "20x20 ft (400 sq.ft) or 30x30 ft",
    suitableFor: "Dealerships, Helmets, Armor, EV Bikes",
    footfallTarget: "10,000+ enthusiasts"
  },
  {
    id: "food-beverage",
    title: "Food & Beverage Vendors",
    category: "Hospitality & Dining",
    iconName: "Utensils",
    description: "Serve spectators, team crews, and travelers in the high-energy Food & Lifestyle Village.",
    benefits: [
      "Non-stop footfall from morning heats to afterparty",
      "Covered dining zone with live DJ sound system",
      "Power hookups and mobile payment support"
    ],
    stallSizes: "10x10 ft (100 sq.ft) or Food Truck",
    suitableFor: "Nepali BBQ, Pizzas, Coffee, Refreshments",
    footfallTarget: "8,000+ meal servings"
  },
  {
    id: "retail-lifestyle",
    title: "Retail & Lifestyle Shops",
    category: "Apparel & Gadgets",
    iconName: "ShoppingBag",
    description: "Sell streetwear, outdoor sunglasses, action cams, and adventure lifestyle apparel.",
    benefits: [
      "High impulse shopping along the main grandstand path",
      "Youth audience seeking motorsport fashion",
      "Overnight security patrol provided"
    ],
    stallSizes: "10x10 ft or 10x15 ft",
    suitableFor: "T-Shirts, Caps, Shades, Action Cam Gear",
    footfallTarget: "Prime grandstand walkway"
  },
  {
    id: "tech-mobility",
    title: "Technology & Mobility",
    category: "Clean Tech & EV",
    iconName: "Zap",
    description: "Demo portable solar power, EV chargers, telemetry sensors, and smart adventure gadgets.",
    benefits: [
      "Spotlight on Nepal's green transition and clean energy",
      "Engage tech-forward youth and adventure travelers",
      "Covered tech pavilion with reliable power"
    ],
    stallSizes: "10x20 ft (200 sq.ft)",
    suitableFor: "Battery Tech, Portable Solar, GPS, Drones",
    footfallTarget: "Tech & adventure seekers"
  }
];

export interface SafetyProtocol {
  title: string;
  badge: string;
  description: string;
  details: string[];
}

export const SAFETY_PROTOCOLS: SafetyProtocol[] = [
  {
    title: "FIM-Standard Race Marshals",
    badge: "Track Control",
    description: "Every corner and obstacle is manned by trained marshals with flags and radio links to Race Direction.",
    details: ["Instant flag deployment", "Radio link within 1 second", "Rapid rider extraction"]
  },
  {
    title: "First-Aid & 4x4 Ambulance Fleet",
    badge: "Medical Response",
    description: "On-site trauma doctors, 4x4 field evacuation units, and a dedicated hospital corridor in Pokhara.",
    details: ["On-site trauma unit", "4x4 field rescue vehicles", "Pre-coordinated hospital pathway"]
  },
  {
    title: "Fire & Paddock Safety",
    badge: "Paddock & Fuel",
    description: "Strict containment protocols across all pit bays, fuel storage, and spectator areas.",
    details: ["Foam extinguishers every 20m", "Mandatory eco floor mats", "Fire squad on standby"]
  },
  {
    title: "Mandatory Insurance & Scrutineering",
    badge: "Rider Compliance",
    description: "Every rider undergoes mechanical scrutineering, medical check, and insurance validation.",
    details: ["Brake & kill-switch checks", "DOT/ECE helmet inspection", "Accident policy verification"]
  },
  {
    title: "Police & Traffic Coordination",
    badge: "Community Order",
    description: "Partnering with District Police Office Kaski and Traffic Police for smooth crowd and parking flow.",
    details: ["Designated parking fields", "Traffic diversion plan", "Perimeter security detail"]
  },
  {
    title: "Controlled Spectator Barricades",
    badge: "Crowd Safety",
    description: "Double-perimeter steel fences and 6-meter buffer zones separating race lines from viewing hills.",
    details: ["6m buffer run-off zones", "Steel barricades on banks", "Marked emergency exits"]
  }
];

export interface NewsArticle {
  id: string;
  date: string;
  category: "Championship Announcement" | "Rider Spotlight" | "Destination" | "Sponsor Update";
  title: string;
  summary: string;
  readTime: string;
  author: string;
  photoUrl: string;
}

export const NEWS_ARTICLES: NewsArticle[] = [
  {
    id: "championship-2027-launch",
    date: "Official Bulletin",
    category: "Championship Announcement",
    title: "Adventure Sport Hub Announces 2027 Moto Enduro Cross",
    summary: "Following 80+ riders and 20M+ views, the 2027 edition expands with international heats in Pokhara.",
    readTime: "2 min read",
    author: "Race Committee",
    photoUrl: LOCAL_IMAGES.heroMotocrossRider
  },
  {
    id: "pokhara-adventure-capital",
    date: "Tourism Feature",
    category: "Destination",
    title: "Pokhara: South Asia's Hard Enduro Frontier",
    summary: "Himalayan elevation and lakeside hospitality create the ultimate natural arena for motorsports.",
    readTime: "2 min read",
    author: "Editorial Desk",
    photoUrl: LOCAL_IMAGES.hardEnduroRiverBoulders
  },
  {
    id: "rider-registration-open",
    date: "Rider Bulletin",
    category: "Rider Spotlight",
    title: "2027 Rider Categories & Scrutineering Guidelines",
    summary: "Classes open for Pro Open, Expert, Novice, and Veterans with international transport support.",
    readTime: "3 min read",
    author: "Scrutineering Bureau",
    photoUrl: LOCAL_IMAGES.motocrossMxJump
  },
  {
    id: "corporate-partnerships-rolling",
    date: "Partner Update",
    category: "Sponsor Update",
    title: "Sponsorship Deck Released for Corporate Partners",
    summary: "Title sponsorship, category rights, and experiential booths open for 10,000+ attendee reach.",
    readTime: "2 min read",
    author: "Commercial Team",
    photoUrl: LOCAL_IMAGES.freestyleStuntFmx
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  category: "Racing Action" | "Championship Highlights" | "Riders" | "Spectators" | "Awards & Winners" | "Influencers & Creators" | "Behind the Scenes";
  aspect: "landscape" | "portrait" | "square";
  caption: string;
  tag: string;
  gradientColors: string;
  customUrl?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Holeshot Battle at Arena Gate",
    category: "Racing Action",
    aspect: "landscape",
    caption: "20 riders launching simultaneously into the first high-banked clay corner under cloudless Pokhara skies.",
    tag: "Pro Open Heat 1",
    gradientColors: "from-red-950/80 via-neutral-900 to-black",
    customUrl: LOCAL_IMAGES.motocrossMxJump
  },
  {
    id: "g2",
    title: "Conquering the Boulder Matrix",
    category: "Racing Action",
    aspect: "portrait",
    caption: "Hard enduro machine balancing across massive granite rocks on the steep mountain technical trail.",
    tag: "Technical Stage",
    gradientColors: "from-zinc-900 via-neutral-900 to-black",
    customUrl: LOCAL_IMAGES.hardEnduroRiverBoulders
  },
  {
    id: "g3",
    title: "Mid-Air Whip Over Annapurna Backdrop",
    category: "Championship Highlights",
    aspect: "landscape",
    caption: "A freestyle stunt rider sending a massive 25-meter leap with the majestic Himalayas reflected on the horizon.",
    tag: "Freestyle Stunt Show",
    gradientColors: "from-red-900/60 via-zinc-900 to-black",
    customUrl: LOCAL_IMAGES.freestyleStuntFmx
  },
  {
    id: "g4",
    title: "Paddock Focused Preparation",
    category: "Behind the Scenes",
    aspect: "square",
    caption: "Riders and mechanics fine-tuning 250cc race machines before the opening drop.",
    tag: "Paddock Bay",
    gradientColors: "from-neutral-900 via-zinc-900 to-black",
    customUrl: LOCAL_IMAGES.heroMotocrossRider
  },
  {
    id: "g5",
    title: "10,000 Fans Roaring in Pokhara",
    category: "Spectators",
    aspect: "landscape",
    caption: "Passionate motorsport enthusiasts and adventure travelers lining the natural hills surrounding the race arena.",
    tag: "Hillside Arena",
    gradientColors: "from-red-950/70 via-neutral-950 to-black",
    customUrl: LOCAL_IMAGES.motocrossMxJump
  },
  {
    id: "g6",
    title: "Creators Capturing the Roost",
    category: "Influencers & Creators",
    aspect: "portrait",
    caption: "Leading travel vloggers and action film crews recording 4K slow-motion passes on the water trench obstacle.",
    tag: "Media Corridor",
    gradientColors: "from-zinc-900 via-neutral-950 to-black",
    customUrl: LOCAL_IMAGES.hardEnduroRiverBoulders
  },
  {
    id: "g7",
    title: "Full-Carbon Championship Gear",
    category: "Awards & Winners",
    aspect: "landscape",
    caption: "Official safety-spec motocross helmets and championship hardware inspected prior to main event finals.",
    tag: "Main Stage",
    gradientColors: "from-amber-950/70 via-neutral-900 to-black",
    customUrl: LOCAL_IMAGES.enduroHelmetStudio
  },
  {
    id: "g8",
    title: "Dusk Freestyle Airborne Showcase",
    category: "Riders",
    aspect: "square",
    caption: "Evening arena floodlights framing high-flying motorcycle stunts for thousands of Pokhara spectators.",
    tag: "FMX Class",
    gradientColors: "from-red-950/90 via-zinc-950 to-black",
    customUrl: LOCAL_IMAGES.freestyleStuntFmx
  }
];
