export interface XtremeTitlePillar {
  heading: string;
  items: string[];
}

export type CompanyProposalTier =
  | "title"
  | "gold"
  | "silver"
  | "supporting"
  | "showcase"
  | "tech-pavilion"
  | "food-vendor"
  | "retail-vendor";

export type CompanyProposalIndustry =
  | "beverage"
  | "motorcycle"
  | "automotive"
  | "lubricants"
  | "tech"
  | "gear"
  | "hospitality"
  | "other";

export interface XtremeProposalContent {
  coverEyebrow: string;
  coverSubtitle: string;
  coverBanner: string;
  coverDescription: string;
  everestDescription: string;
  whyHeading: string;
  whyDescription: string;
  archive2026Title: string;
  page8Eyebrow?: string;
  page8Title?: string;
  investmentAmount?: string;
  investmentLabel?: string;
  titleLockupEyebrow: string;
  titleLockupHeadline: string;
  titleLockupSubtext: string;
  titlePillars: XtremeTitlePillar[];
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

export interface CompanyProposalRecord {
  id: string;
  companyName: string;
  tier: CompanyProposalTier;
  tierLabel: string;
  investmentAmount: string;
  industry: CompanyProposalIndustry;
  industryLabel: string;
  isBuiltIn: boolean;
  createdAt: string;
  content: XtremeProposalContent;
}

export interface PrivateCategoryPrice {
  id: string;
  name: string;
  price: string;
  period: string;
  slotsOrSize: string;
}

export interface PrivateTierOption {
  value: CompanyProposalTier;
  label: string;
  defaultPrice: string;
}

export interface PrivateRateCard {
  summaryRange: string;
  sponsorPrices: Record<string, { price: string; period: string }>;
  vendorPrices: Record<string, { price: string; period: string }>;
  sponsorshipCategories: PrivateCategoryPrice[];
  vendorCategories: PrivateCategoryPrice[];
  riderCategories: PrivateCategoryPrice[];
  tierOptions: PrivateTierOption[];
}
