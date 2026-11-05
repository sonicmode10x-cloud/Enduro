import React, { useState } from "react";
import { X, Send, Phone, CheckCircle2, AlertCircle, Trophy, Building2, Store, Camera, MessageSquare } from "lucide-react";
import { EVENT_CONFIG } from "../data/eventConfig";

export type FormTab = "rider" | "sponsor" | "vendor" | "media" | "general";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: FormTab;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  initialTab = "rider"
}) => {
  const [activeTab, setActiveTab] = useState<FormTab>(initialTab);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submittedData, setSubmittedData] = useState<Record<string, string> | null>(null);

  // Rider Form State
  const [riderForm, setRiderForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    cityCountry: "",
    bikeMakeModel: "",
    engineDisplacement: "250cc - 450cc",
    raceCategory: "Pro Open",
    racingExperienceYears: "3-5 years",
    bloodGroup: "O+",
    emergencyContactName: "",
    emergencyContactPhone: "",
    acceptsSafetyRules: false
  });

  // Sponsor Form State
  const [sponsorForm, setSponsorForm] = useState({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    industry: "Automotive & Motorcycles",
    tierInterest: "Title Sponsor",
    marketingBudget: "Custom Partnership",
    keyObjectives: ""
  });

  // Vendor Form State
  const [vendorForm, setVendorForm] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    vendorCategory: "EV Cars, Motorbikes & Riding Gear",
    stallSizeNeeded: "10x10 ft (100 sq.ft)",
    requiresPower: true,
    productDetails: ""
  });

  // Media Form State
  const [mediaForm, setMediaForm] = useState({
    fullName: "",
    organization: "",
    email: "",
    phone: "",
    mediaType: "Digital Creator / Vlogger",
    portfolioUrl: "",
    equipmentPlanned: "4K Drone, Action Cams & Mirrorless",
    coveragePlan: ""
  });

  // General Form State
  const [generalForm, setGeneralForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: ""
  });

  if (!isOpen) return null;

  const handleTabChange = (tab: FormTab) => {
    setActiveTab(tab);
    setSubmitSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Realistic form processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      let dataSummary: Record<string, string> = {};

      if (activeTab === "rider") {
        dataSummary = {
          Type: "Rider Registration",
          Name: riderForm.fullName,
          Phone: riderForm.phone,
          Category: riderForm.raceCategory,
          Machine: riderForm.bikeMakeModel
        };
      } else if (activeTab === "sponsor") {
        dataSummary = {
          Type: "Sponsorship Inquiry",
          Company: sponsorForm.companyName,
          Contact: sponsorForm.contactPerson,
          Phone: sponsorForm.phone,
          Tier: sponsorForm.tierInterest
        };
      } else if (activeTab === "vendor") {
        dataSummary = {
          Type: "Vendor Booth Booking",
          Business: vendorForm.businessName,
          Category: vendorForm.vendorCategory,
          Size: vendorForm.stallSizeNeeded
        };
      } else if (activeTab === "media") {
        dataSummary = {
          Type: "Media Accreditation",
          Name: mediaForm.fullName,
          Organization: mediaForm.organization,
          Role: mediaForm.mediaType
        };
      } else {
        dataSummary = {
          Type: "General Enquiry",
          Name: generalForm.fullName,
          Subject: generalForm.subject
        };
      }
      setSubmittedData(dataSummary);
    }, 600);
  };

  const getWhatsAppMessageUrl = () => {
    const phone = EVENT_CONFIG.championship.organizer.phone.replace("+", "");
    let text = `Hello Jagat Dhauli, I am submitting an inquiry for Extreme Moto Enduro Cross 2027:`;
    if (submittedData) {
      Object.entries(submittedData).forEach(([k, v]) => {
        text += `\n• ${k}: ${v}`;
      });
    } else {
      text += `\nInquiry Type: ${activeTab.toUpperCase()}`;
    }
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f12] border border-zinc-700 max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-zinc-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#E50920] uppercase font-bold">
              <span>OFFICIAL REGISTRATION & ENQUIRY DESK</span>
            </div>
            <h3 className="font-heading font-black text-2xl sm:text-3xl uppercase text-white mt-1">
              EXTREME MOTO ENDURO CROSS 2027
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Powered by Adventure Sport Hub, Pokhara · Contact: Jagat Dhauli (+977 9867695261)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-zinc-800 transition-colors"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 overflow-x-auto py-3 border-b border-zinc-800 scrollbar-none">
          <button
            type="button"
            onClick={() => handleTabChange("rider")}
            className={`cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === "rider"
                ? "bg-[#E50920] text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Trophy size={13} />
            <span>1. Rider Registration</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("sponsor")}
            className={`cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === "sponsor"
                ? "bg-[#E50920] text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Building2 size={13} />
            <span>2. Sponsorship</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("vendor")}
            className={`cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === "vendor"
                ? "bg-[#E50920] text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Store size={13} />
            <span>3. Vendor Booth</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("media")}
            className={`cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === "media"
                ? "bg-[#E50920] text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <Camera size={13} />
            <span>4. Media Pass</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("general")}
            className={`cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors ${
              activeTab === "general"
                ? "bg-[#E50920] text-white"
                : "text-zinc-400 hover:text-white hover:bg-zinc-900"
            }`}
          >
            <MessageSquare size={13} />
            <span>5. General</span>
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        {submitSuccess ? (
          <div className="py-8 space-y-6">
            <div className="p-6 bg-zinc-900/90 border border-emerald-600/60 rounded flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <CheckCircle2 size={36} className="text-emerald-500 shrink-0" />
              <div>
                <h4 className="font-heading font-black text-2xl uppercase text-white">
                  Enquiry Successfully Received
                </h4>
                <p className="text-xs text-zinc-300 mt-1">
                  Thank you! Your submission has been captured in the Championship Desk records. Jagat Dhauli and the Adventure Sport Hub organizing committee will contact you within 24 hours.
                </p>
              </div>
            </div>

            {submittedData && (
              <div className="p-4 bg-zinc-950 border border-zinc-800 text-xs space-y-1.5 font-mono">
                <span className="text-zinc-500 uppercase block mb-1">Receipt Summary:</span>
                {Object.entries(submittedData).map(([k, v]) => (
                  <div key={k} className="flex justify-between text-zinc-300">
                    <span className="text-zinc-500">{k}:</span>
                    <span className="text-white font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="cursor-pointer text-xs text-zinc-400 hover:text-white underline"
              >
                Submit another enquiry
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href={getWhatsAppMessageUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer flex-1 sm:flex-none inline-flex items-center justify-center gap-2 font-heading font-bold uppercase text-xs px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors"
                >
                  <Phone size={14} />
                  <span>Notify via WhatsApp Directly</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer px-4 py-2.5 text-xs font-semibold text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-6 space-y-4">
            {/* 1. RIDER FORM */}
            {activeTab === "rider" && (
              <div className="space-y-4">
                <div className="p-3 bg-red-950/30 border border-red-900/40 text-xs text-zinc-300">
                  <strong className="text-white">Rider Requirements:</strong> All competitors must wear FIM/DOT certified helmets, knee braces, and back armor. Mandatory mechanical scrutineering takes place before free practice.
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Full Rider Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={riderForm.fullName}
                      onChange={(e) => setRiderForm({ ...riderForm, fullName: e.target.value })}
                      placeholder="e.g. Roshan Thapa"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Mobile Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={riderForm.phone}
                      onChange={(e) => setRiderForm({ ...riderForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={riderForm.email}
                      onChange={(e) => setRiderForm({ ...riderForm, email: e.target.value })}
                      placeholder="rider@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      City / Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={riderForm.cityCountry}
                      onChange={(e) => setRiderForm({ ...riderForm, cityCountry: e.target.value })}
                      placeholder="Pokhara, Nepal / International"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Motorcycle Make & Model *
                    </label>
                    <input
                      type="text"
                      required
                      value={riderForm.bikeMakeModel}
                      onChange={(e) => setRiderForm({ ...riderForm, bikeMakeModel: e.target.value })}
                      placeholder="e.g. KTM 300 EXC / Honda CRF 250"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Class Category *
                    </label>
                    <select
                      value={riderForm.raceCategory}
                      onChange={(e) => setRiderForm({ ...riderForm, raceCategory: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="Pro Open">Pro Open (International & Top National)</option>
                      <option value="National Expert">National Expert</option>
                      <option value="Novice Grassroots">Novice / Grassroots</option>
                      <option value="Veterans (40+)">Veterans (Over 40)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Blood Group *
                    </label>
                    <select
                      value={riderForm.bloodGroup}
                      onChange={(e) => setRiderForm({ ...riderForm, bloodGroup: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Emergency Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={riderForm.emergencyContactName}
                      onChange={(e) => setRiderForm({ ...riderForm, emergencyContactName: e.target.value })}
                      placeholder="Kin / Team Manager name"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Emergency Contact Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={riderForm.emergencyContactPhone}
                      onChange={(e) => setRiderForm({ ...riderForm, emergencyContactPhone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="riderRules"
                    required
                    checked={riderForm.acceptsSafetyRules}
                    onChange={(e) => setRiderForm({ ...riderForm, acceptsSafetyRules: e.target.checked })}
                    className="accent-[#E50920]"
                  />
                  <label htmlFor="riderRules" className="text-xs text-zinc-300">
                    I acknowledge that motorsport involves risk and confirm I have valid personal accident insurance and FIM-standard protective gear.
                  </label>
                </div>
              </div>
            )}

            {/* 2. SPONSORSHIP FORM */}
            {activeTab === "sponsor" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Company / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={sponsorForm.companyName}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, companyName: e.target.value })}
                      placeholder="e.g. Himalayan Motors Pvt. Ltd."
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Contact Person & Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={sponsorForm.contactPerson}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, contactPerson: e.target.value })}
                      placeholder="e.g. Head of Marketing"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={sponsorForm.email}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, email: e.target.value })}
                      placeholder="partner@company.com"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Direct Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={sponsorForm.phone}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Partnership Tier of Interest *
                    </label>
                    <select
                      value={sponsorForm.tierInterest}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, tierInterest: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="Title Sponsor">Title Sponsor (Championship Naming Rights)</option>
                      <option value="Presenting Sponsor">Presenting Sponsor (Co-Branded)</option>
                      <option value="Official Partner">Official Category Partner</option>
                      <option value="Motorcycle & Automotive">Motorcycle & Automotive Partner</option>
                      <option value="Digital & Media">Digital & Broadcast Partner</option>
                      <option value="Food & Lifestyle">Food & Lifestyle Partner</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Industry Sector *
                    </label>
                    <select
                      value={sponsorForm.industry}
                      onChange={(e) => setSponsorForm({ ...sponsorForm, industry: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="Automotive & Motorcycles">Automotive & Motorcycles</option>
                      <option value="Lubricants & Fuel">Lubricants, Tires & Fuel</option>
                      <option value="Beverages & Energy Drinks">Beverages & Energy Drinks</option>
                      <option value="Telecom & Technology">Telecom, Tech & ISP</option>
                      <option value="Banking & Digital Wallets">Banking & FinTech</option>
                      <option value="Apparel & Riding Gear">Apparel & Riding Gear</option>
                      <option value="Hospitality & Tourism">Hospitality & Tourism</option>
                      <option value="Other">Other Sector</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Key Brand Objectives / Custom Requests
                  </label>
                  <textarea
                    rows={3}
                    value={sponsorForm.keyObjectives}
                    onChange={(e) => setSponsorForm({ ...sponsorForm, keyObjectives: e.target.value })}
                    placeholder="Tell us about your campaign goals (e.g., vehicle launch on-site, sampling to 10k attendees, creator integrations)..."
                    className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>
            )}

            {/* 3. VENDOR BOOTH FORM */}
            {activeTab === "vendor" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Business / Brand Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={vendorForm.businessName}
                      onChange={(e) => setVendorForm({ ...vendorForm, businessName: e.target.value })}
                      placeholder="e.g. Annapurna Moto Gear"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      required
                      value={vendorForm.contactName}
                      onChange={(e) => setVendorForm({ ...vendorForm, contactName: e.target.value })}
                      placeholder="Name"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Vendor Category *
                    </label>
                    <select
                      value={vendorForm.vendorCategory}
                      onChange={(e) => setVendorForm({ ...vendorForm, vendorCategory: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="EV Cars, Motorbikes & Riding Gear">EV Cars, Motorbikes & Riding Gear</option>
                      <option value="Food & Beverage Vendors">Food & Beverage Vendors</option>
                      <option value="Retail & Lifestyle Shops">Retail & Lifestyle Shops</option>
                      <option value="Technology & Mobility">Technology & Mobility</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Stall Space Desired *
                    </label>
                    <select
                      value={vendorForm.stallSizeNeeded}
                      onChange={(e) => setVendorForm({ ...vendorForm, stallSizeNeeded: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="10x10 ft (100 sq.ft) Standard">10x10 ft (100 sq.ft) Standard</option>
                      <option value="20x20 ft (400 sq.ft) Premier">20x20 ft (400 sq.ft) Premier</option>
                      <option value="30x30 ft (900 sq.ft) Dealership Pavilion">30x30 ft (900 sq.ft) Dealership Pavilion</option>
                      <option value="Food Truck / Mobile Cart">Food Truck / Mobile Cart Space</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={vendorForm.phone}
                      onChange={(e) => setVendorForm({ ...vendorForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={vendorForm.email}
                      onChange={(e) => setVendorForm({ ...vendorForm, email: e.target.value })}
                      placeholder="shop@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Products to Sell / Showcase
                  </label>
                  <textarea
                    rows={2}
                    value={vendorForm.productDetails}
                    onChange={(e) => setVendorForm({ ...vendorForm, productDetails: e.target.value })}
                    placeholder="Briefly describe products, menu items, or machinery..."
                    className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>
            )}

            {/* 4. MEDIA ACCREDITATION */}
            {activeTab === "media" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={mediaForm.fullName}
                      onChange={(e) => setMediaForm({ ...mediaForm, fullName: e.target.value })}
                      placeholder="Journalist / Creator Name"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Media House / Channel *
                    </label>
                    <input
                      type="text"
                      required
                      value={mediaForm.organization}
                      onChange={(e) => setMediaForm({ ...mediaForm, organization: e.target.value })}
                      placeholder="e.g. Kantipur / YouTube Channel Name"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Media Role *
                    </label>
                    <select
                      value={mediaForm.mediaType}
                      onChange={(e) => setMediaForm({ ...mediaForm, mediaType: e.target.value })}
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white focus:outline-none focus:border-[#E50920]"
                    >
                      <option value="Digital Creator / Vlogger">Digital Creator / Vlogger</option>
                      <option value="Action Photographer">Action Sports Photographer</option>
                      <option value="Broadcast TV / Radio">Broadcast Television / Radio</option>
                      <option value="Print / Online Journalist">Print / Online News Journalist</option>
                      <option value="Drone Operator">Licensed Drone Pilot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Channel / Portfolio URL *
                    </label>
                    <input
                      type="url"
                      required
                      value={mediaForm.portfolioUrl}
                      onChange={(e) => setMediaForm({ ...mediaForm, portfolioUrl: e.target.value })}
                      placeholder="https://youtube.com/@channel or instagram"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={mediaForm.phone}
                      onChange={(e) => setMediaForm({ ...mediaForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={mediaForm.email}
                      onChange={(e) => setMediaForm({ ...mediaForm, email: e.target.value })}
                      placeholder="press@domain.com"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Coverage Plan / Story Angle
                  </label>
                  <textarea
                    rows={2}
                    value={mediaForm.coveragePlan}
                    onChange={(e) => setMediaForm({ ...mediaForm, coveragePlan: e.target.value })}
                    placeholder="Outline your planned content, publication dates, and platform distribution..."
                    className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>
            )}

            {/* 5. GENERAL ENQUIRY */}
            {activeTab === "general" && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={generalForm.fullName}
                      onChange={(e) => setGeneralForm({ ...generalForm, fullName: e.target.value })}
                      placeholder="Your full name"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={generalForm.email}
                      onChange={(e) => setGeneralForm({ ...generalForm, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={generalForm.phone}
                      onChange={(e) => setGeneralForm({ ...generalForm, phone: e.target.value })}
                      placeholder="+977 98XXXXXXXX"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={generalForm.subject}
                      onChange={(e) => setGeneralForm({ ...generalForm, subject: e.target.value })}
                      placeholder="e.g. Spectator Tickets / Volunteer Program"
                      className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={generalForm.message}
                    onChange={(e) => setGeneralForm({ ...generalForm, message: e.target.value })}
                    placeholder="How can we assist you with the Extreme Moto Enduro Cross Championship 2027?"
                    className="w-full bg-zinc-900 border border-zinc-700 p-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#E50920]"
                  />
                </div>
              </div>
            )}

            {/* Modal Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
              <a
                href={EVENT_CONFIG.championship.socials.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer flex items-center gap-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                <Phone size={14} />
                <span>Or Chat Directly via WhatsApp (+977 9867695261)</span>
              </a>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="cursor-pointer px-4 py-2.5 text-xs font-semibold text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cursor-pointer font-heading font-black uppercase text-xs px-6 py-3 bg-[#E50920] hover:bg-[#c70719] text-white clip-slanted shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? "PROCESSING..." : "SUBMIT REGISTRATION"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
