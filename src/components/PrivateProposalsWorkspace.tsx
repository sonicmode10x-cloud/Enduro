import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Download,
  FileText,
  Layers,
  Loader2,
  Map,
  Plus,
  Tag,
  Trash2,
  X
} from "lucide-react";
import {
  CompanyProposalIndustry,
  CompanyProposalRecord,
  CompanyProposalTier,
  PrivateRateCard
} from "../types/xtremeProposal";
import {
  BrochurePageSheet,
  GENERAL_PAGE_LABELS,
  XTREME_PAGE_LABELS
} from "./BrochureViewer";
import { downloadXtremeTitleSponsorBrochurePdf } from "../lib/xtremeBrochurePdf";
import { downloadHimalayanBrochurePdf } from "../lib/brochurePdf";
import { fetchPrivateJson } from "../lib/privateApi";

interface PrivateProposalsWorkspaceProps {
  companies: CompanyProposalRecord[];
  rateCard?: PrivateRateCard | null;
  onCompaniesChange: (next: CompanyProposalRecord[]) => void;
  getAuthHeader: () => Promise<string | null>;
  compact?: boolean;
}

const FALLBACK_TIER_LABELS: Array<{ value: CompanyProposalTier; label: string }> = [
  { value: "title", label: 'Title Sponsor ("Powered By" · 1 Slot)' },
  { value: "gold", label: "Gold Sponsor (2 Slots)" },
  { value: "silver", label: "Silver Sponsor (3 Slots)" },
  { value: "supporting", label: "Supporting Partner (10 Slots)" },
  { value: "showcase", label: "EV / Vehicle & Gear Showcase (2 Days)" },
  { value: "tech-pavilion", label: "Technology & Mobility Pavilion (2 Days)" },
  { value: "food-vendor", label: "Food & Beverage Vendor Stall (2 Days)" },
  { value: "retail-vendor", label: "Retail & Lifestyle Shop Stall (2 Days)" }
];

const INDUSTRY_OPTIONS: Array<{ value: CompanyProposalIndustry; label: string }> = [
  { value: "beverage", label: "Energy Drink & Beverage" },
  { value: "motorcycle", label: "Motorcycle & Off-Road OEM" },
  { value: "automotive", label: "EV & Automotive Brand" },
  { value: "lubricants", label: "Lubricants, Tires & Parts" },
  { value: "tech", label: "Telecom, Fintech & Tech" },
  { value: "gear", label: "Apparel, Helmets & Gear" },
  { value: "hospitality", label: "Food, Lifestyle & Hospitality" },
  { value: "other", label: "Corporate & Multi-Category" }
];

const GENERAL_DECK_ID = "__general__";

export const PrivateProposalsWorkspace: React.FC<PrivateProposalsWorkspaceProps> = ({
  companies,
  rateCard = null,
  onCompaniesChange,
  getAuthHeader,
  compact = false
}) => {
  const tierOptions =
    rateCard?.tierOptions && rateCard.tierOptions.length > 0
      ? rateCard.tierOptions
      : FALLBACK_TIER_LABELS.map((item) => ({ ...item, defaultPrice: "" }));

  const [selectedId, setSelectedId] = useState<string>(
    companies[0]?.id || "xtreme-energy-drink"
  );
  const [viewMode, setViewMode] = useState<"single" | "all">("single");
  const [activePage, setActivePage] = useState<number>(1);
  const [showRateCard, setShowRateCard] = useState<boolean>(true);

  // Create company form state
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState("");
  const [tier, setTier] = useState<CompanyProposalTier>("title");
  const [customPrice, setCustomPrice] = useState(
    rateCard?.tierOptions?.find((opt) => opt.value === "title")?.defaultPrice || ""
  );
  const [industry, setIndustry] = useState<CompanyProposalIndustry>("beverage");
  const [customNote, setCustomNote] = useState("");
  const [creating, setCreating] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!rateCard?.tierOptions?.length) return;
    setCustomPrice((current) => {
      if (current.trim().length > 0) return current;
      const matched = rateCard.tierOptions.find((opt) => opt.value === tier);
      return matched?.defaultPrice || "";
    });
  }, [rateCard, tier]);

  // Per-card download & delete state
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [downloadedId, setDownloadedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [downloadingMap, setDownloadingMap] = useState(false);

  const selectedCompany =
    selectedId === GENERAL_DECK_ID
      ? null
      : companies.find((c) => c.id === selectedId) || companies[0] || null;

  const isGeneralSelected = selectedId === GENERAL_DECK_ID || !selectedCompany;
  const pageLabels = isGeneralSelected ? GENERAL_PAGE_LABELS : XTREME_PAGE_LABELS;
  const totalPages = pageLabels.length;

  const handleSelectDeck = (id: string) => {
    setSelectedId(id);
    setActivePage(1);
  };

  const handleDownloadCompanyPdf = async (company: CompanyProposalRecord) => {
    if (downloadingId) return;
    setDownloadingId(company.id);
    setDownloadedId(null);
    try {
      await downloadXtremeTitleSponsorBrochurePdf(company.content);
      setDownloadedId(company.id);
      window.setTimeout(() => {
        setDownloadedId((curr) => (curr === company.id ? null : curr));
      }, 3000);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadGeneralPdf = async () => {
    if (downloadingId) return;
    setDownloadingId(GENERAL_DECK_ID);
    setDownloadedId(null);
    try {
      await downloadHimalayanBrochurePdf(rateCard);
      setDownloadedId(GENERAL_DECK_ID);
      window.setTimeout(() => {
        setDownloadedId((curr) => (curr === GENERAL_DECK_ID ? null : curr));
      }, 3000);
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadMap = async () => {
    if (downloadingMap) return;
    setDownloadingMap(true);
    try {
      const response = await fetch(
        "/assets/aistudio/Moto_Enduro_Brochure_long_Digital_e5afbf30.png"
      );
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Himalayan-Moto-Enduro-Pokhara-2KM-Circuit-Map.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } finally {
      setDownloadingMap(false);
    }
  };

  const handleCreateCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) return;
    setFormError(null);

    const trimmedName = companyName.trim();
    if (trimmedName.length < 2) {
      setFormError("Enter a company or brand name (at least 2 characters).");
      return;
    }

    setCreating(true);
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        setFormError("Your session expired. Please unlock proposals again.");
        return;
      }

      const result = await fetchPrivateJson<{
        company?: CompanyProposalRecord;
        companies?: CompanyProposalRecord[];
        error?: string;
      }>("/api/private-proposals/companies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader
        },
        body: JSON.stringify({
          companyName: trimmedName,
          tier,
          industry,
          customPrice: customPrice.trim(),
          customNote: customNote.trim()
        })
      });

      if (!result.ok || !result.data?.company || !result.data?.companies) {
        setFormError(result.errorMessage || "Unable to create company proposal.");
        return;
      }

      onCompaniesChange(result.data.companies);
      setSelectedId(result.data.company.id);
      setActivePage(1);
      setCompanyName("");
      setCustomNote("");
      const tierOption = tierOptions.find((opt) => opt.value === tier);
      setCustomPrice(tierOption?.defaultPrice || "");
      setShowCreateForm(false);
    } catch {
      setFormError("Unable to create proposal right now. Please try again.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCompany = async (id: string) => {
    if (deletingId) return;
    setDeletingId(id);
    setFormError(null);
    try {
      const authHeader = await getAuthHeader();
      if (!authHeader) {
        setFormError("Your session expired. Please unlock proposals again.");
        return;
      }

      const result = await fetchPrivateJson<{
        companies?: CompanyProposalRecord[];
        error?: string;
      }>(`/api/private-proposals/companies/${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { Authorization: authHeader }
      });

      if (!result.ok || !result.data?.companies) {
        setFormError(result.errorMessage || "Unable to remove company proposal.");
        return;
      }

      onCompaniesChange(result.data.companies);
      setConfirmDeleteId(null);
      if (selectedId === id) {
        setSelectedId(result.data.companies[0]?.id || GENERAL_DECK_ID);
        setActivePage(1);
      }
    } catch {
      setFormError("Unable to remove proposal right now.");
    } finally {
      setDeletingId(null);
    }
  };

  const activeDeckId = isGeneralSelected ? GENERAL_DECK_ID : selectedCompany!.id;
  const isDownloadingActive = downloadingId === activeDeckId;
  const isDownloadedActive = downloadedId === activeDeckId;

  return (
    <div className="space-y-6">
      {/* Top Vault Directory Card */}
      <div
        className={`bg-white rounded-[28px] border border-stone-200/80 shadow-sm ${
          compact ? "p-5 sm:p-6" : "p-5 sm:p-8 lg:p-10"
        } space-y-6`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-stone-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#D60A19] mb-1">
              Private Executive Vault <span aria-hidden="true">·</span> Multi-Company Sponsorship Decks
            </p>
            <h1 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
              COMPANY PROPOSAL LIBRARY
            </h1>
            <p className="text-sm text-zinc-600 leading-relaxed mt-2.5">
              Download tailored 10-page sponsorship proposals for different partner companies, or create a brand-new company deck with customized naming rights, industry fit, and deliverables in seconds.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setFormError(null);
                setShowCreateForm((prev) => !prev);
              }}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#121214] hover:bg-zinc-800 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              {showCreateForm ? <X size={15} /> : <Plus size={15} />}
              <span>{showCreateForm ? "Close Builder" : "New Company Proposal"}</span>
            </button>
          </div>
        </div>

        {/* Inline Custom Company Proposal Generator */}
        {showCreateForm && (
          <form
            onSubmit={handleCreateCompany}
            className="bg-[#F5F4F0] rounded-2xl border border-stone-300/80 p-5 sm:p-6 space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#D60A19]">
                  Instant 10-Page Deck Generator
                </p>
                <h2 className="font-heading font-black text-xl sm:text-2xl uppercase tracking-tight text-zinc-900 mt-0.5">
                  BUILD TAILORED COMPANY PROPOSAL
                </h2>
              </div>
            </div>

            {formError && (
              <div
                role="alert"
                className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700"
              >
                {formError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label
                  htmlFor="proposal-company-name"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Company / Brand Name
                </label>
                <input
                  id="proposal-company-name"
                  type="text"
                  required
                  maxLength={80}
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Red Bull Nepal, KTM Nepal, BYD"
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="proposal-company-tier"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Category &amp; Standard Rate
                </label>
                <select
                  id="proposal-company-tier"
                  value={tier}
                  onChange={(e) => {
                    const nextTier = e.target.value as CompanyProposalTier;
                    setTier(nextTier);
                    const matched = tierOptions.find((opt) => opt.value === nextTier);
                    if (matched) {
                      setCustomPrice(matched.defaultPrice);
                    }
                  }}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
                >
                  {tierOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="proposal-company-price"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Package Investment (Editable)
                </label>
                <input
                  id="proposal-company-price"
                  type="text"
                  maxLength={48}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  placeholder="Enter custom package price"
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-zinc-900 tabular-nums focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div>
                <label
                  htmlFor="proposal-company-industry"
                  className="block text-xs font-semibold text-zinc-700 mb-1.5"
                >
                  Industry / Sector
                </label>
                <select
                  id="proposal-company-industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value as CompanyProposalIndustry)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
                >
                  {INDUSTRY_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="proposal-company-note"
                className="block text-xs font-semibold text-zinc-700 mb-1.5"
              >
                Optional Executive Note (appended to closing Secretariat page)
              </label>
              <input
                id="proposal-company-note"
                type="text"
                maxLength={260}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                placeholder="e.g. Includes custom Pokhara Lakeside activation & Everest November co-branding rights."
                className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="cursor-pointer text-xs font-semibold text-zinc-600 hover:text-zinc-900 px-3 py-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={creating}
                className="cursor-pointer inline-flex items-center gap-2 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full transition-colors"
              >
                {creating ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>Building Proposal...</span>
                  </>
                ) : (
                  <>
                    <Plus size={14} />
                    <span>Create &amp; Preview 10-Page Proposal</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Company Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies.map((company) => {
            const isSelected = !isGeneralSelected && selectedCompany?.id === company.id;
            const isCardDownloading = downloadingId === company.id;
            const isCardDownloaded = downloadedId === company.id;

            return (
              <div
                key={company.id}
                className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all ${
                  isSelected
                    ? "bg-[#121214] text-white border-zinc-900 shadow-md"
                    : "bg-[#F8F7F4] text-zinc-900 border-stone-200 hover:border-stone-400"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wide ${
                        isSelected ? "text-[#F03845]" : "text-[#D60A19]"
                      }`}
                    >
                      {company.tierLabel} · {company.industryLabel}
                    </span>
                    {!company.isBuiltIn && (
                      confirmDeleteId === company.id ? (
                        <div className="inline-flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            disabled={deletingId === company.id}
                            onClick={() => handleDeleteCompany(company.id)}
                            className="cursor-pointer text-[10px] font-bold px-2 py-0.5 rounded bg-[#D60A19] text-white"
                          >
                            {deletingId === company.id ? "..." : "Remove"}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className={`cursor-pointer text-[10px] font-semibold ${
                              isSelected ? "text-zinc-400" : "text-zinc-500"
                            }`}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(company.id)}
                          aria-label={`Remove ${company.companyName} proposal`}
                          className={`cursor-pointer p-1 rounded transition-colors ${
                            isSelected
                              ? "text-zinc-400 hover:text-white hover:bg-white/10"
                              : "text-zinc-400 hover:text-red-600 hover:bg-red-50"
                          }`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Building2
                        size={16}
                        className={isSelected ? "text-[#F03845] shrink-0" : "text-zinc-500 shrink-0"}
                      />
                      <h3 className="font-heading font-black text-xl uppercase tracking-tight leading-tight truncate">
                        {company.companyName}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`font-heading font-black text-lg tabular-nums leading-none ${
                      isSelected ? "text-white" : "text-zinc-900"
                    }`}
                  >
                    {company.investmentAmount || company.content.investmentAmount || "Confidential Rate"}
                  </div>

                  <p
                    className={`text-xs leading-relaxed line-clamp-2 ${
                      isSelected ? "text-zinc-300" : "text-zinc-600"
                    }`}
                  >
                    10-page tailored deck · {company.content.coverSubtitle}
                  </p>
                </div>

                <div
                  className={`pt-3 border-t flex items-center justify-between gap-2 ${
                    isSelected ? "border-white/15" : "border-stone-200"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectDeck(company.id)}
                    className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                      isSelected
                        ? "bg-white/15 text-white"
                        : "bg-white border border-stone-200 text-zinc-800 hover:bg-stone-100"
                    }`}
                  >
                    {isSelected ? "Viewing Below" : "Preview 10 Pages"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownloadCompanyPdf(company)}
                    disabled={Boolean(downloadingId)}
                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-60 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                  >
                    {isCardDownloading ? (
                      <>
                        <Loader2 size={12} className="animate-spin" />
                        <span>Building...</span>
                      </>
                    ) : isCardDownloaded ? (
                      <>
                        <CheckCircle2 size={12} />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Download size={12} />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}

          {/* Built-in General Master Deck Card */}
          <div
            className={`rounded-2xl border p-5 flex flex-col justify-between gap-4 transition-all ${
              isGeneralSelected
                ? "bg-[#121214] text-white border-zinc-900 shadow-md"
                : "bg-[#F8F7F4] text-zinc-900 border-stone-200 hover:border-stone-400"
            }`}
          >
            <div className="space-y-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wide ${
                  isGeneralSelected ? "text-[#F03845]" : "text-[#D60A19]"
                }`}
              >
                All Sponsorship Tiers · Vendor Marketplace
              </span>

              <div className="flex items-center gap-2">
                <FileText
                  size={16}
                  className={
                    isGeneralSelected ? "text-[#F03845] shrink-0" : "text-zinc-500 shrink-0"
                  }
                />
                <h3 className="font-heading font-black text-xl uppercase tracking-tight leading-tight">
                  General Master Deck
                </h3>
              </div>

              <div
                className={`font-heading font-black text-lg tabular-nums leading-none ${
                  isGeneralSelected ? "text-white" : "text-zinc-900"
                }`}
              >
                {rateCard?.summaryRange || "Confidential 2027 Rate Card"}
              </div>

              <p
                className={`text-xs leading-relaxed line-clamp-2 ${
                  isGeneralSelected ? "text-zinc-300" : "text-zinc-600"
                }`}
              >
                Complete 10-page general championship brochure with full pricing for all 4 tiers &amp; 4 vendor zones.
              </p>
            </div>

            <div
              className={`pt-3 border-t flex items-center justify-between gap-2 ${
                isGeneralSelected ? "border-white/15" : "border-stone-200"
              }`}
            >
              <button
                type="button"
                onClick={() => handleSelectDeck(GENERAL_DECK_ID)}
                className={`cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
                  isGeneralSelected
                    ? "bg-white/15 text-white"
                    : "bg-white border border-stone-200 text-zinc-800 hover:bg-stone-100"
                }`}
              >
                {isGeneralSelected ? "Viewing Below" : "Preview 10 Pages"}
              </button>

              <button
                type="button"
                onClick={handleDownloadGeneralPdf}
                disabled={Boolean(downloadingId)}
                className="cursor-pointer inline-flex items-center gap-1.5 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-60 text-white text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                {downloadingId === GENERAL_DECK_ID ? (
                  <>
                    <Loader2 size={12} className="animate-spin" />
                    <span>Building...</span>
                  </>
                ) : downloadedId === GENERAL_DECK_ID ? (
                  <>
                    <CheckCircle2 size={12} />
                    <span>Saved</span>
                  </>
                ) : (
                  <>
                    <Download size={12} />
                    <span>Download PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Private 2027 Official Rate Card (Visible Strictly Inside Authenticated Private Workspace) */}
      {rateCard && (
        <div
          className={`bg-white rounded-[28px] border border-stone-200/80 shadow-sm ${
            compact ? "p-5 sm:p-6" : "p-5 sm:p-8 lg:p-10"
          } space-y-5`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-[#D60A19] inline-flex items-center gap-1.5">
                <Tag size={12} />
                <span>Private Commercial Schedule · Organizer &amp; Authorized Access Only</span>
              </p>
              <h2 className="font-heading font-black text-2xl sm:text-3xl uppercase tracking-tight text-zinc-900 leading-none mt-1">
                2027 PRIVATE RATE CARD — ALL CATEGORIES
              </h2>
            </div>

            <button
              type="button"
              onClick={() => setShowRateCard((prev) => !prev)}
              className="cursor-pointer inline-flex items-center gap-1.5 bg-[#F5F4F0] hover:bg-stone-200/80 border border-stone-200 text-zinc-800 text-xs font-semibold px-3.5 py-2 rounded-full transition-colors whitespace-nowrap"
            >
              <span>{showRateCard ? "Hide Rate Card" : "Show Rate Card"}</span>
              {showRateCard ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {showRateCard && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-2 border-t border-stone-200">
              {/* Column 1: Sponsorship Tiers */}
              <div className="bg-[#121214] text-white rounded-2xl p-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#F03845]">
                  Sponsorship Tiers (4 Categories)
                </p>
                <div className="divide-y divide-white/10">
                  {rateCard.sponsorshipCategories.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-white leading-snug">{item.name}</p>
                        <p className="text-[11px] text-zinc-400">{item.slotsOrSize} · {item.period}</p>
                      </div>
                      <span className="font-heading font-black text-base text-white tabular-nums whitespace-nowrap shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 2: Vendor & Showcase Zones */}
              <div className="bg-[#F8F7F4] rounded-2xl border border-stone-200 p-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#D60A19]">
                  Vendor &amp; Showcase Zones (4 Categories)
                </p>
                <div className="divide-y divide-stone-200">
                  {rateCard.vendorCategories.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-900 leading-snug">{item.name}</p>
                        <p className="text-[11px] text-zinc-500">{item.slotsOrSize} · {item.period}</p>
                      </div>
                      <span className="font-heading font-black text-base text-zinc-900 tabular-nums whitespace-nowrap shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Column 3: Rider Race Classes */}
              <div className="bg-[#F8F7F4] rounded-2xl border border-stone-200 p-5 space-y-3">
                <p className="text-[11px] font-bold uppercase tracking-wide text-[#D60A19]">
                  Rider Entry Fees (4 Race Classes)
                </p>
                <div className="divide-y divide-stone-200">
                  {rateCard.riderCategories.map((item) => (
                    <div key={item.id} className="py-2.5 first:pt-0 last:pb-0 flex items-baseline justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-zinc-900 leading-snug">{item.name}</p>
                        <p className="text-[11px] text-zinc-500">{item.slotsOrSize} · {item.period}</p>
                      </div>
                      <span className="font-heading font-black text-base text-zinc-900 tabular-nums whitespace-nowrap shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Live 10-Page Reader for Selected Company Proposal */}
      <div
        className={`bg-white rounded-[28px] border border-stone-200/80 shadow-sm ${
          compact ? "p-5 sm:p-6" : "p-5 sm:p-8 lg:p-10"
        } space-y-6`}
      >
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-stone-200">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-[#D60A19] mb-1">
              {isGeneralSelected
                ? "Active Preview · General Championship Proposal · Full 2027 Rate Card"
                : `Active Preview · ${selectedCompany!.tierLabel}${
                    selectedCompany!.investmentAmount || selectedCompany!.content.investmentAmount
                      ? ` · ${
                          selectedCompany!.investmentAmount ||
                          selectedCompany!.content.investmentAmount
                        }`
                      : ""
                  } · ${selectedCompany!.industryLabel}`}
            </p>
            <h2 className="font-heading font-black text-2xl sm:text-4xl uppercase tracking-tight text-zinc-900 leading-none text-balance">
              {isGeneralSelected
                ? "GENERAL CHAMPIONSHIP PROPOSAL"
                : `${selectedCompany!.companyName} — ${selectedCompany!.tierLabel}`}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mt-2">
              {isGeneralSelected
                ? "Complete 10-page general proposal & brochure featuring every section from the homepage, all 4 sponsorship tiers, and vendor showcase zones."
                : selectedCompany!.content.coverDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() =>
                isGeneralSelected
                  ? handleDownloadGeneralPdf()
                  : handleDownloadCompanyPdf(selectedCompany!)
              }
              disabled={Boolean(downloadingId)}
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-70 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              {isDownloadingActive ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>Preparing PDF...</span>
                </>
              ) : isDownloadedActive ? (
                <>
                  <CheckCircle2 size={15} />
                  <span>Proposal Downloaded</span>
                </>
              ) : (
                <>
                  <Download size={15} />
                  <span>
                    {isGeneralSelected
                      ? "Download General PDF (10 Pages)"
                      : `Download ${selectedCompany!.companyName} PDF`}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadMap}
              disabled={downloadingMap}
              className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#F5F4F0] hover:bg-stone-200/80 text-zinc-900 font-semibold text-xs px-4 py-3 rounded-full border border-stone-200 transition-colors whitespace-nowrap shrink-0"
            >
              <Map size={14} className="text-[#D60A19]" />
              <span>{downloadingMap ? "Downloading..." : "2KM Map"}</span>
            </button>
          </div>
        </div>

        {/* Reader Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-xs font-semibold text-zinc-700">
            {isGeneralSelected
              ? "Official General Event & Sponsorship Prospectus · 10 Pages"
              : `${selectedCompany!.content.coverSubtitle} · 10 Pages`}
          </div>

          <div className="inline-flex items-center gap-1 p-1 bg-[#F2F0EB] rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode("single")}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === "single"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <BookOpen size={13} />
              <span>Single Page</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("all")}
              className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                viewMode === "all"
                  ? "bg-white text-zinc-900 shadow-sm"
                  : "text-zinc-600 hover:text-zinc-900"
              }`}
            >
              <Layers size={13} />
              <span>View All 10 Pages</span>
            </button>
          </div>
        </div>

        {/* Page Jump Bar */}
        {viewMode === "single" && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              {pageLabels.map((p) => (
                <button
                  key={p.page}
                  type="button"
                  onClick={() => setActivePage(p.page)}
                  className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                    activePage === p.page
                      ? "bg-[#D60A19] text-white"
                      : "bg-[#F5F4F0] text-zinc-700 hover:bg-stone-200/80"
                  }`}
                >
                  {p.short}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
              <button
                type="button"
                onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                disabled={activePage === 1}
                aria-label="Previous proposal page"
                className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 text-zinc-800 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-xs font-semibold text-zinc-700 tabular-nums min-w-[78px] text-center">
                Page {activePage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                disabled={activePage === totalPages}
                aria-label="Next proposal page"
                className="cursor-pointer inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-200 bg-white hover:bg-stone-100 disabled:opacity-40 text-zinc-800 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Proposal Sheets Canvas */}
        <div className="bg-[#EAE8E3] rounded-2xl p-3 sm:p-5 lg:p-6 border border-stone-200/90">
          {viewMode === "single" ? (
            <div className="max-w-4xl mx-auto space-y-4">
              <BrochurePageSheet
                edition={isGeneralSelected ? "general" : "xtreme"}
                pageNumber={activePage}
                xtremeContent={isGeneralSelected ? null : selectedCompany?.content}
                privateRateCard={isGeneralSelected ? rateCard : null}
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setActivePage((prev) => Math.max(1, prev - 1))}
                  disabled={activePage === 1}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-40 border border-stone-200 text-xs font-semibold text-zinc-800 transition-colors whitespace-nowrap"
                >
                  <ChevronLeft size={14} />
                  <span>Previous Page</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("all")}
                  className="cursor-pointer text-xs font-semibold text-zinc-700 hover:text-[#D60A19] transition-colors whitespace-nowrap"
                >
                  Expand All {totalPages} Pages
                </button>

                <button
                  type="button"
                  onClick={() => setActivePage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={activePage === totalPages}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-stone-100 disabled:opacity-40 border border-stone-200 text-xs font-semibold text-zinc-800 transition-colors whitespace-nowrap"
                >
                  <span>Next Page</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {pageLabels.map((p) => (
                <BrochurePageSheet
                  key={`${activeDeckId}-page-${p.page}`}
                  edition={isGeneralSelected ? "general" : "xtreme"}
                  pageNumber={p.page}
                  xtremeContent={isGeneralSelected ? null : selectedCompany?.content}
                  privateRateCard={isGeneralSelected ? rateCard : null}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
