import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  db,
  auth,
  signInWithGoogle,
  logOutUser,
  BOOTSTRAPPED_ADMIN_EMAIL,
  handleFirestoreError,
  OperationType
} from "../lib/firebase";
import {
  Trophy,
  Search,
  Download,
  LogIn,
  LogOut,
  CheckCircle2,
  Clock,
  ShieldCheck,
  XCircle,
  Edit3,
  Trash2,
  Plus,
  Phone,
  Save,
  X,
  Building2
} from "lucide-react";
import { FormTab } from "./RegistrationModal";

export interface RiderRegistrationDoc {
  id: string;
  userId: string;
  userEmail: string;
  eventSelection: string;
  fullName: string;
  email: string;
  phone: string;
  cityCountry: string;
  bikeMakeModel: string;
  engineDisplacement: string;
  raceCategory: string;
  racingExperienceYears: string;
  bloodGroup: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  acceptsSafetyRules: boolean;
  status: "pending" | "scrutineered" | "confirmed" | "withdrawn";
  raceNumber: string;
  adminNotes: string;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

export interface PartnerRegistrationDoc {
  id: string;
  userId: string;
  userEmail: string;
  registrationType: "sponsor" | "vendor" | "media" | "general";
  contactName: string;
  organization: string;
  email: string;
  phone: string;
  categoryOrTier: string;
  details: string;
  notes: string;
  status: "pending" | "approved" | "declined" | "withdrawn";
  adminNotes: string;
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

interface RiderTrackerSectionProps {
  onOpenRegisterModal: (defaultTab?: FormTab, eventName?: string) => void;
  onOpenAdminConsole?: () => void;
}

export const RiderTrackerSection: React.FC<RiderTrackerSectionProps> = ({
  onOpenRegisterModal,
  onOpenAdminConsole
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [trackerView, setTrackerView] = useState<"riders" | "partners">("riders");

  const [registrations, setRegistrations] = useState<RiderRegistrationDoc[]>([]);
  const [partnerRegistrations, setPartnerRegistrations] = useState<PartnerRegistrationDoc[]>([]);
  const [loadingRiders, setLoadingRiders] = useState(false);
  const [loadingPartners, setLoadingPartners] = useState(false);

  // Rider Filters
  const [eventFilter, setEventFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Partner Filters
  const [partnerTypeFilter, setPartnerTypeFilter] = useState<string>("ALL");
  const [partnerStatusFilter, setPartnerStatusFilter] = useState<string>("ALL");
  const [partnerSearchQuery, setPartnerSearchQuery] = useState<string>("");

  // Admin inline edit state for Riders
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDraft, setEditDraft] = useState<{
    status: "pending" | "scrutineered" | "confirmed" | "withdrawn";
    raceNumber: string;
    adminNotes: string;
    raceCategory: string;
    bikeMakeModel: string;
    engineDisplacement: string;
  }>({
    status: "pending",
    raceNumber: "",
    adminNotes: "",
    raceCategory: "Pro Open",
    bikeMakeModel: "",
    engineDisplacement: "250cc - 450cc"
  });

  // Admin inline edit state for Partner / Vendor / Media / General
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerEditDraft, setPartnerEditDraft] = useState<{
    status: "pending" | "approved" | "declined" | "withdrawn";
    adminNotes: string;
  }>({
    status: "pending",
    adminNotes: ""
  });

  const [savingId, setSavingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const isAdmin =
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email === BOOTSTRAPPED_ADMIN_EMAIL;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  // Listen to riderRegistrations
  useEffect(() => {
    if (!authReady || !currentUser) {
      setRegistrations([]);
      setLoadingRiders(false);
      return;
    }

    setLoadingRiders(true);
    const path = "riderRegistrations";
    const colRef = collection(db, path);

    const q = isAdmin
      ? query(colRef)
      : query(colRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: RiderRegistrationDoc[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            userId: String(data.userId || ""),
            userEmail: String(data.userEmail || ""),
            eventSelection: String(data.eventSelection || ""),
            fullName: String(data.fullName || ""),
            email: String(data.email || ""),
            phone: String(data.phone || ""),
            cityCountry: String(data.cityCountry || ""),
            bikeMakeModel: String(data.bikeMakeModel || ""),
            engineDisplacement: String(data.engineDisplacement || ""),
            raceCategory: String(data.raceCategory || "Pro Open"),
            racingExperienceYears: String(data.racingExperienceYears || ""),
            bloodGroup: String(data.bloodGroup || "O+"),
            emergencyContactName: String(data.emergencyContactName || ""),
            emergencyContactPhone: String(data.emergencyContactPhone || ""),
            acceptsSafetyRules: Boolean(data.acceptsSafetyRules),
            status: (data.status as RiderRegistrationDoc["status"]) || "pending",
            raceNumber: String(data.raceNumber || ""),
            adminNotes: String(data.adminNotes || ""),
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null
          };
        });

        docs.sort((a, b) => {
          const tA = a.createdAt?.toMillis?.() || 0;
          const tB = b.createdAt?.toMillis?.() || 0;
          return tB - tA;
        });

        setRegistrations(docs);
        setLoadingRiders(false);
      },
      (error) => {
        setLoadingRiders(false);
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [authReady, currentUser, isAdmin]);

  // Listen to partnerRegistrations (Sponsors, Vendors, Media, General)
  useEffect(() => {
    if (!authReady || !currentUser) {
      setPartnerRegistrations([]);
      setLoadingPartners(false);
      return;
    }

    setLoadingPartners(true);
    const path = "partnerRegistrations";
    const colRef = collection(db, path);

    const q = isAdmin
      ? query(colRef)
      : query(colRef, where("userId", "==", currentUser.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs: PartnerRegistrationDoc[] = snapshot.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            userId: String(data.userId || ""),
            userEmail: String(data.userEmail || ""),
            registrationType:
              (data.registrationType as PartnerRegistrationDoc["registrationType"]) ||
              "general",
            contactName: String(data.contactName || ""),
            organization: String(data.organization || ""),
            email: String(data.email || ""),
            phone: String(data.phone || ""),
            categoryOrTier: String(data.categoryOrTier || ""),
            details: String(data.details || ""),
            notes: String(data.notes || ""),
            status: (data.status as PartnerRegistrationDoc["status"]) || "pending",
            adminNotes: String(data.adminNotes || ""),
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null
          };
        });

        docs.sort((a, b) => {
          const tA = a.createdAt?.toMillis?.() || 0;
          const tB = b.createdAt?.toMillis?.() || 0;
          return tB - tA;
        });

        setPartnerRegistrations(docs);
        setLoadingPartners(false);
      },
      (error) => {
        setLoadingPartners(false);
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [authReady, currentUser, isAdmin]);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(
        err instanceof Error ? err.message : "Unable to sign in with Google."
      );
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      await logOutUser();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Sign out failed.");
    }
  };

  const startEditing = (reg: RiderRegistrationDoc) => {
    setEditingId(reg.id);
    setEditDraft({
      status: reg.status,
      raceNumber: reg.raceNumber,
      adminNotes: reg.adminNotes,
      raceCategory: reg.raceCategory,
      bikeMakeModel: reg.bikeMakeModel,
      engineDisplacement: reg.engineDisplacement
    });
  };

  const handleAdminSave = async (reg: RiderRegistrationDoc) => {
    setSavingId(reg.id);
    const path = `riderRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "riderRegistrations", reg.id), {
        status: editDraft.status,
        raceNumber: editDraft.raceNumber.trim().slice(0, 15),
        adminNotes: editDraft.adminNotes.trim().slice(0, 500),
        raceCategory: editDraft.raceCategory,
        bikeMakeModel: editDraft.bikeMakeModel.trim().slice(0, 100),
        engineDisplacement: editDraft.engineDisplacement.trim().slice(0, 50),
        updatedAt: serverTimestamp()
      });
      setEditingId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleRiderWithdraw = async (reg: RiderRegistrationDoc) => {
    if (reg.status === "withdrawn") return;
    setSavingId(reg.id);
    const path = `riderRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "riderRegistrations", reg.id), {
        status: "withdrawn",
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleAdminDelete = async (regId: string) => {
    setDeletingId(regId);
    const path = `riderRegistrations/${regId}`;
    try {
      await deleteDoc(doc(db, "riderRegistrations", regId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    } finally {
      setDeletingId(null);
    }
  };

  const handlePartnerAdminSave = async (reg: PartnerRegistrationDoc) => {
    setSavingId(reg.id);
    const path = `partnerRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "partnerRegistrations", reg.id), {
        status: partnerEditDraft.status,
        adminNotes: partnerEditDraft.adminNotes.trim().slice(0, 500),
        updatedAt: serverTimestamp()
      });
      setEditingPartnerId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handlePartnerWithdraw = async (reg: PartnerRegistrationDoc) => {
    if (reg.status !== "pending") return;
    setSavingId(reg.id);
    const path = `partnerRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "partnerRegistrations", reg.id), {
        status: "withdrawn",
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handlePartnerAdminDelete = async (regId: string) => {
    setDeletingId(regId);
    const path = `partnerRegistrations/${regId}`;
    try {
      await deleteDoc(doc(db, "partnerRegistrations", regId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredRegistrations = registrations.filter((reg) => {
    if (eventFilter !== "ALL" && reg.eventSelection !== eventFilter) {
      return false;
    }
    if (statusFilter !== "ALL" && reg.status !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        reg.fullName.toLowerCase().includes(q) ||
        reg.bikeMakeModel.toLowerCase().includes(q) ||
        reg.phone.toLowerCase().includes(q) ||
        reg.raceNumber.toLowerCase().includes(q) ||
        reg.cityCountry.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredPartnerRegistrations = partnerRegistrations.filter((reg) => {
    if (partnerTypeFilter !== "ALL" && reg.registrationType !== partnerTypeFilter) {
      return false;
    }
    if (partnerStatusFilter !== "ALL" && reg.status !== partnerStatusFilter) {
      return false;
    }
    if (partnerSearchQuery.trim()) {
      const q = partnerSearchQuery.toLowerCase();
      return (
        reg.contactName.toLowerCase().includes(q) ||
        reg.organization.toLowerCase().includes(q) ||
        reg.email.toLowerCase().includes(q) ||
        reg.phone.toLowerCase().includes(q) ||
        reg.categoryOrTier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleExportRidersCsv = () => {
    if (filteredRegistrations.length === 0) return;
    const headers = [
      "Race Number",
      "Status",
      "Event",
      "Rider Name",
      "Category",
      "Motorcycle",
      "Displacement",
      "Phone",
      "Email",
      "City/Country",
      "Blood Group",
      "Emergency Contact",
      "Emergency Phone",
      "Admin Notes"
    ];
    const rows = filteredRegistrations.map((r) => [
      r.raceNumber || "Unassigned",
      r.status.toUpperCase(),
      r.eventSelection,
      r.fullName,
      r.raceCategory,
      r.bikeMakeModel,
      r.engineDisplacement,
      r.phone,
      r.email,
      r.cityCountry,
      r.bloodGroup,
      r.emergencyContactName,
      r.emergencyContactPhone,
      r.adminNotes
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) =>
          row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `moto_enduro_registered_riders_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPartnersCsv = () => {
    if (filteredPartnerRegistrations.length === 0) return;
    const headers = [
      "Type",
      "Status",
      "Contact Name",
      "Organization / Business",
      "Category / Tier / Subject",
      "Details",
      "Phone",
      "Email",
      "Notes",
      "Admin Notes"
    ];
    const rows = filteredPartnerRegistrations.map((r) => [
      r.registrationType.toUpperCase(),
      r.status.toUpperCase(),
      r.contactName,
      r.organization,
      r.categoryOrTier,
      r.details,
      r.phone,
      r.email,
      r.notes,
      r.adminNotes
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) =>
          row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(",")
        )
        .join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `moto_enduro_partner_registrations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalCount = registrations.length;
  const confirmedCount = registrations.filter((r) => r.status === "confirmed").length;
  const scrutineeredCount = registrations.filter((r) => r.status === "scrutineered").length;
  const pendingCount = registrations.filter((r) => r.status === "pending").length;

  return (
    <section id="rider-tracker" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
            <div>
              <p className="text-xs font-semibold text-[#D60A19] mb-1">
                Live Championship Database{" "}
                <span aria-hidden="true">·</span>{" "}
                {isAdmin
                  ? "Organizer Admin Console"
                  : "Registration Status Portal"}
              </p>
              <h2 className="font-heading font-black text-3xl sm:text-5xl uppercase tracking-tight text-zinc-900 leading-none">
                REGISTRATIONS TRACKER
              </h2>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {onOpenAdminConsole && (
                <button
                  type="button"
                  onClick={onOpenAdminConsole}
                  className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <ShieldCheck size={14} />
                  <span>Admin Console</span>
                </button>
              )}

              <button
                type="button"
                onClick={() =>
                  onOpenRegisterModal(trackerView === "riders" ? "rider" : "vendor")
                }
                className="cursor-pointer inline-flex items-center gap-1.5 bg-[#D60A19] hover:bg-[#b50814] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <Plus size={14} />
                <span>
                  {trackerView === "riders" ? "Register New Rider" : "New Partner / Vendor"}
                </span>
              </button>

              {currentUser ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="cursor-pointer inline-flex items-center gap-1.5 bg-[#F5F4F0] hover:bg-stone-200 text-zinc-800 text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <LogOut size={13} />
                  <span>Sign Out ({currentUser.email?.split("@")[0]})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
                >
                  <LogIn size={13} />
                  <span>Sign In to Track Registrations</span>
                </button>
              )}
            </div>
          </div>

          {authError && (
            <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
              {authError}
            </div>
          )}

          {/* Unauthenticated State */}
          {!currentUser ? (
            <div className="py-12 text-center max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F4F0] text-[#D60A19] flex items-center justify-center mx-auto mb-4">
                <Trophy size={22} />
              </div>
              <h3 className="font-heading font-bold text-2xl uppercase text-zinc-900 mb-2">
                Sign In to Track Registered People
              </h3>
              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed mb-6">
                Championship organizers (<span className="font-medium text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</span>) can sign in to view, filter, assign race numbers, approve vendors/media/sponsors, and export everyone who registered. Registrants can sign in to view their own entry status.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleSignIn}
                  className="cursor-pointer inline-flex items-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  <LogIn size={15} />
                  <span>Sign In with Google</span>
                </button>
                <button
                  type="button"
                  onClick={() => onOpenRegisterModal("rider")}
                  className="cursor-pointer inline-flex items-center gap-2 bg-[#F5F4F0] hover:bg-stone-200 text-zinc-900 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors"
                >
                  <span>Open Registration Form</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-6 space-y-6">
              {/* View Switcher Tabs: Riders vs Sponsors/Vendors/Media */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="inline-flex items-center gap-1 p-1 bg-[#F5F4F0] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setTrackerView("riders")}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      trackerView === "riders"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Trophy size={13} className="text-[#D60A19]" />
                    <span>Riders ({registrations.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTrackerView("partners")}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      trackerView === "partners"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Building2 size={13} className="text-[#D60A19]" />
                    <span>Sponsors, Vendors &amp; Media ({partnerRegistrations.length})</span>
                  </button>
                </div>

                <span className="text-xs text-zinc-500">
                  Signed in as <strong className="text-zinc-800">{currentUser.email}</strong>
                </span>
              </div>

              {/* VIEW 1: RIDERS TRACKER */}
              {trackerView === "riders" && (
                <>
                  {/* Summary Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 bg-[#F5F4F0] rounded-2xl">
                      <div className="text-xs text-zinc-500">
                        {isAdmin ? "Total Registered Riders" : "Your Rider Entries"}
                      </div>
                      <div className="font-heading font-black text-3xl text-zinc-900 tabular-nums mt-0.5">
                        {totalCount}
                      </div>
                    </div>
                    <div className="p-4 bg-[#F5F4F0] rounded-2xl">
                      <div className="text-xs text-zinc-500">Confirmed Grid</div>
                      <div className="font-heading font-black text-3xl text-emerald-700 tabular-nums mt-0.5">
                        {confirmedCount}
                      </div>
                    </div>
                    <div className="p-4 bg-[#F5F4F0] rounded-2xl">
                      <div className="text-xs text-zinc-500">Scrutineered</div>
                      <div className="font-heading font-black text-3xl text-zinc-900 tabular-nums mt-0.5">
                        {scrutineeredCount}
                      </div>
                    </div>
                    <div className="p-4 bg-[#F5F4F0] rounded-2xl">
                      <div className="text-xs text-zinc-500">Pending Review</div>
                      <div className="font-heading font-black text-3xl text-[#D60A19] tabular-nums mt-0.5">
                        {pendingCount}
                      </div>
                    </div>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F5F4F0] p-3.5 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search
                          size={14}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search rider name, bike, bib #, city, phone..."
                          className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium focus:outline-none focus:border-zinc-900"
                      >
                        <option value="ALL">All Championship Events</option>
                        <option value="Extreme Moto Enduro Cross 2027">
                          Extreme Moto Enduro Cross 2027
                        </option>
                        <option value="Himalayan Enduro 2027 Pokhara (April 5 & 6)">
                          Himalayan Enduro 2027 Pokhara (Apr 5 &amp; 6)
                        </option>
                        <option value="Himalayan Enduro 2027 Everest (Nov 2027)">
                          Himalayan Enduro 2027 Everest (Nov 2027)
                        </option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium focus:outline-none focus:border-zinc-900"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="scrutineered">Scrutineered</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    {filteredRegistrations.length > 0 && (
                      <button
                        type="button"
                        onClick={handleExportRidersCsv}
                        className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <Download size={13} />
                        <span>Export CSV ({filteredRegistrations.length})</span>
                      </button>
                    )}
                  </div>

                  {/* Riders Roster List */}
                  {loadingRiders ? (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      Loading registered riders from championship database...
                    </div>
                  ) : filteredRegistrations.length === 0 ? (
                    <div className="py-12 text-center bg-[#F5F4F0] rounded-2xl p-6">
                      <p className="text-sm font-semibold text-zinc-800 mb-1">
                        No Registered Riders Found
                      </p>
                      <p className="text-xs text-zinc-500 mb-4">
                        {registrations.length === 0
                          ? isAdmin
                            ? "No riders have submitted registrations yet."
                            : "You haven't registered a rider entry under this account yet."
                          : "No riders match your current search or event filter."}
                      </p>
                      <button
                        type="button"
                        onClick={() => onOpenRegisterModal("rider")}
                        className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full transition-colors"
                      >
                        <Plus size={14} />
                        <span>Register Rider Now</span>
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredRegistrations.map((reg) => {
                        const isEditing = editingId === reg.id;
                        return (
                          <div
                            key={reg.id}
                            className="p-5 rounded-2xl border border-stone-200/90 bg-white hover:border-stone-300 transition-colors"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-mono font-bold text-zinc-900">
                                    {reg.raceNumber ? `#${reg.raceNumber}` : "BIB UNASSIGNED"}
                                  </span>
                                  <span aria-hidden="true" className="text-zinc-300">·</span>
                                  <span className="font-semibold text-[#D60A19]">
                                    {reg.eventSelection}
                                  </span>
                                  <span aria-hidden="true" className="text-zinc-300">·</span>
                                  <span className="text-zinc-600 font-medium">
                                    {reg.raceCategory}
                                  </span>
                                  <span aria-hidden="true" className="text-zinc-300">·</span>
                                  {reg.status === "confirmed" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                                      <CheckCircle2 size={13} />
                                      <span>Confirmed</span>
                                    </span>
                                  )}
                                  {reg.status === "scrutineered" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
                                      <ShieldCheck size={13} />
                                      <span>Scrutineered</span>
                                    </span>
                                  )}
                                  {reg.status === "pending" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                                      <Clock size={13} />
                                      <span>Pending Review</span>
                                    </span>
                                  )}
                                  {reg.status === "withdrawn" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-500">
                                      <XCircle size={13} />
                                      <span>Withdrawn</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                                    {reg.fullName}
                                  </h3>
                                  <span className="text-xs text-zinc-600 font-medium">
                                    {reg.bikeMakeModel} ({reg.engineDisplacement})
                                  </span>
                                  <span className="text-xs text-zinc-500">
                                    {reg.cityCountry}
                                  </span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 pt-1">
                                  <span>
                                    Phone: <strong className="text-zinc-900">{reg.phone}</strong>
                                  </span>
                                  <span>
                                    Email: <strong className="text-zinc-900">{reg.email}</strong>
                                  </span>
                                  <span>
                                    Blood: <strong className="text-[#D60A19]">{reg.bloodGroup}</strong>
                                  </span>
                                  <span>
                                    Experience: <strong className="text-zinc-900">{reg.racingExperienceYears}</strong>
                                  </span>
                                  <span>
                                    Emergency: <strong className="text-zinc-900">{reg.emergencyContactName} ({reg.emergencyContactPhone})</strong>
                                  </span>
                                </div>

                                {reg.adminNotes && !isEditing && (
                                  <div className="text-xs text-zinc-600 pt-1">
                                    <span className="font-semibold text-zinc-800">Race Control Notes:</span>{" "}
                                    {reg.adminNotes}
                                  </div>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 shrink-0">
                                {isAdmin ? (
                                  <>
                                    <a
                                      href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                        `Hello ${reg.fullName}, this is Race Control for ${reg.eventSelection}.`
                                      )}`}
                                      target="_blank"
                                      rel="noreferrer"
                                      className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                                    >
                                      <Phone size={12} />
                                      <span>WhatsApp</span>
                                    </a>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        isEditing ? setEditingId(null) : startEditing(reg)
                                      }
                                      className="cursor-pointer inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-stone-200 text-zinc-900 text-xs font-semibold transition-colors"
                                    >
                                      <Edit3 size={12} />
                                      <span>{isEditing ? "Cancel" : "Manage Rider"}</span>
                                    </button>
                                    <button
                                      type="button"
                                      disabled={deletingId === reg.id}
                                      onClick={() => handleAdminDelete(reg.id)}
                                      className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors disabled:opacity-50"
                                    >
                                      <Trash2 size={12} />
                                      <span>{deletingId === reg.id ? "..." : "Delete"}</span>
                                    </button>
                                  </>
                                ) : (
                                  reg.status !== "withdrawn" && (
                                    <button
                                      type="button"
                                      disabled={savingId === reg.id}
                                      onClick={() => handleRiderWithdraw(reg)}
                                      className="cursor-pointer inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-zinc-700 text-xs font-semibold transition-colors disabled:opacity-50"
                                    >
                                      <XCircle size={13} />
                                      <span>
                                        {savingId === reg.id ? "Updating..." : "Withdraw Entry"}
                                      </span>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            {/* Admin Inline Editor Drawer */}
                            {isAdmin && isEditing && (
                              <div className="mt-4 pt-4 border-t border-stone-200 bg-[#F5F4F0] p-4 rounded-xl space-y-3">
                                <div className="text-xs font-bold uppercase text-zinc-800">
                                  Race Control Management · {reg.fullName}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Entry Status
                                    </label>
                                    <select
                                      value={editDraft.status}
                                      onChange={(e) =>
                                        setEditDraft({
                                          ...editDraft,
                                          status: e.target.value as RiderRegistrationDoc["status"]
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    >
                                      <option value="pending">Pending Review</option>
                                      <option value="scrutineered">Scrutineered (Tech Passed)</option>
                                      <option value="confirmed">Confirmed on Grid</option>
                                      <option value="withdrawn">Withdrawn</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Assigned Bib / Race #
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={15}
                                      value={editDraft.raceNumber}
                                      onChange={(e) =>
                                        setEditDraft({
                                          ...editDraft,
                                          raceNumber: e.target.value
                                        })
                                      }
                                      placeholder="e.g. 917"
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Race Class
                                    </label>
                                    <select
                                      value={editDraft.raceCategory}
                                      onChange={(e) =>
                                        setEditDraft({
                                          ...editDraft,
                                          raceCategory: e.target.value
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    >
                                      <option value="Pro Open">Pro Open</option>
                                      <option value="National Expert">National Expert</option>
                                      <option value="Novice Grassroots">Novice Grassroots</option>
                                      <option value="Veterans (40+)">Veterans (40+)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Motorcycle Model
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={100}
                                      value={editDraft.bikeMakeModel}
                                      onChange={(e) =>
                                        setEditDraft({
                                          ...editDraft,
                                          bikeMakeModel: e.target.value
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                    Scrutineering &amp; Organizer Notes
                                  </label>
                                  <input
                                    type="text"
                                    maxLength={500}
                                    value={editDraft.adminNotes}
                                    onChange={(e) =>
                                      setEditDraft({
                                        ...editDraft,
                                        adminNotes: e.target.value
                                      })
                                    }
                                    placeholder="e.g. Entry fee verified via eSewa, FIM helmet inspected"
                                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                  />
                                </div>

                                <div className="flex items-center justify-end gap-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={() => setEditingId(null)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900"
                                  >
                                    <X size={13} />
                                    <span>Cancel</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handleAdminSave(reg)}
                                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Save size={13} />
                                    <span>
                                      {savingId === reg.id ? "Saving..." : "Save Changes"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* VIEW 2: SPONSORS, VENDORS, MEDIA & GENERAL REGISTRATIONS */}
              {trackerView === "partners" && (
                <>
                  {/* Filter & Search Bar */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F5F4F0] p-3.5 rounded-2xl">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 flex-1">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search
                          size={14}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                          type="text"
                          value={partnerSearchQuery}
                          onChange={(e) => setPartnerSearchQuery(e.target.value)}
                          placeholder="Search name, company, email, phone..."
                          className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <select
                        value={partnerTypeFilter}
                        onChange={(e) => setPartnerTypeFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium focus:outline-none focus:border-zinc-900"
                      >
                        <option value="ALL">All Registration Types</option>
                        <option value="sponsor">Sponsors</option>
                        <option value="vendor">Vendor Booths</option>
                        <option value="media">Media Passes</option>
                        <option value="general">General Enquiries</option>
                      </select>

                      <select
                        value={partnerStatusFilter}
                        onChange={(e) => setPartnerStatusFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium focus:outline-none focus:border-zinc-900"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    {filteredPartnerRegistrations.length > 0 && (
                      <button
                        type="button"
                        onClick={handleExportPartnersCsv}
                        className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors whitespace-nowrap shrink-0"
                      >
                        <Download size={13} />
                        <span>Export CSV ({filteredPartnerRegistrations.length})</span>
                      </button>
                    )}
                  </div>

                  {loadingPartners ? (
                    <div className="py-12 text-center text-xs text-zinc-500">
                      Loading partner, vendor, and media registrations...
                    </div>
                  ) : filteredPartnerRegistrations.length === 0 ? (
                    <div className="py-12 text-center bg-[#F5F4F0] rounded-2xl p-6">
                      <p className="text-sm font-semibold text-zinc-800 mb-1">
                        No Partner, Vendor, or Media Registrations Found
                      </p>
                      <p className="text-xs text-zinc-500 mb-4">
                        {partnerRegistrations.length === 0
                          ? "Submissions from Sponsorship, Vendor Booth, Media Pass, and General tabs will appear here in real time."
                          : "No submissions match your current search or filter."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPartnerRegistrations.map((reg) => {
                        const isEditing = editingPartnerId === reg.id;
                        return (
                          <div
                            key={reg.id}
                            className="p-5 rounded-2xl border border-stone-200/90 bg-white hover:border-stone-300 transition-colors"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-mono font-bold uppercase text-[#D60A19]">
                                    {reg.registrationType}
                                  </span>
                                  <span aria-hidden="true" className="text-zinc-300">·</span>
                                  <span className="font-medium text-zinc-700">
                                    {reg.categoryOrTier}
                                  </span>
                                  <span aria-hidden="true" className="text-zinc-300">·</span>
                                  {reg.status === "approved" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                                      <CheckCircle2 size={13} />
                                      <span>Approved</span>
                                    </span>
                                  )}
                                  {reg.status === "pending" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                                      <Clock size={13} />
                                      <span>Pending Review</span>
                                    </span>
                                  )}
                                  {(reg.status === "declined" || reg.status === "withdrawn") && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-500">
                                      <XCircle size={13} />
                                      <span className="capitalize">{reg.status}</span>
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                                    {reg.contactName}
                                  </h3>
                                  {reg.organization && (
                                    <span className="text-xs text-zinc-700 font-semibold">
                                      {reg.organization}
                                    </span>
                                  )}
                                  {reg.details && (
                                    <span className="text-xs text-zinc-500">
                                      {reg.details}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600 pt-1">
                                  {reg.phone && (
                                    <span>
                                      Phone: <strong className="text-zinc-900">{reg.phone}</strong>
                                    </span>
                                  )}
                                  <span>
                                    Email: <strong className="text-zinc-900">{reg.email}</strong>
                                  </span>
                                </div>

                                {reg.notes && (
                                  <p className="text-xs text-zinc-600 pt-1">
                                    <strong className="text-zinc-800">Submitted Notes:</strong> {reg.notes}
                                  </p>
                                )}

                                {reg.adminNotes && !isEditing && (
                                  <p className="text-xs text-zinc-600 pt-1">
                                    <strong className="text-zinc-800">Organizer Notes:</strong> {reg.adminNotes}
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 shrink-0">
                                {isAdmin ? (
                                  <>
                                    {reg.phone && (
                                      <a
                                        href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                          `Hello ${reg.contactName}, regarding your ${reg.registrationType} submission for Extreme Moto Enduro Cross 2027.`
                                        )}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                                      >
                                        <Phone size={12} />
                                        <span>WhatsApp</span>
                                      </a>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (isEditing) {
                                          setEditingPartnerId(null);
                                        } else {
                                          setEditingPartnerId(reg.id);
                                          setPartnerEditDraft({
                                            status: reg.status,
                                            adminNotes: reg.adminNotes
                                          });
                                        }
                                      }}
                                      className="cursor-pointer inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-stone-200 text-zinc-900 text-xs font-semibold transition-colors"
                                    >
                                      <Edit3 size={12} />
                                      <span>{isEditing ? "Cancel" : "Manage"}</span>
                                    </button>
                                    <button
                                      type="button"
                                      disabled={deletingId === reg.id}
                                      onClick={() => handlePartnerAdminDelete(reg.id)}
                                      className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors disabled:opacity-50"
                                    >
                                      <Trash2 size={12} />
                                      <span>{deletingId === reg.id ? "..." : "Delete"}</span>
                                    </button>
                                  </>
                                ) : (
                                  reg.status === "pending" && (
                                    <button
                                      type="button"
                                      disabled={savingId === reg.id}
                                      onClick={() => handlePartnerWithdraw(reg)}
                                      className="cursor-pointer inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200 text-zinc-700 text-xs font-semibold transition-colors disabled:opacity-50"
                                    >
                                      <XCircle size={13} />
                                      <span>
                                        {savingId === reg.id ? "Updating..." : "Withdraw"}
                                      </span>
                                    </button>
                                  )
                                )}
                              </div>
                            </div>

                            {isAdmin && isEditing && (
                              <div className="mt-4 pt-4 border-t border-stone-200 bg-[#F5F4F0] p-4 rounded-xl space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Approval Status
                                    </label>
                                    <select
                                      value={partnerEditDraft.status}
                                      onChange={(e) =>
                                        setPartnerEditDraft({
                                          ...partnerEditDraft,
                                          status: e.target.value as PartnerRegistrationDoc["status"]
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    >
                                      <option value="pending">Pending Review</option>
                                      <option value="approved">Approved</option>
                                      <option value="declined">Declined</option>
                                      <option value="withdrawn">Withdrawn</option>
                                    </select>
                                  </div>

                                  <div className="sm:col-span-2">
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Organizer Notes
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={500}
                                      value={partnerEditDraft.adminNotes}
                                      onChange={(e) =>
                                        setPartnerEditDraft({
                                          ...partnerEditDraft,
                                          adminNotes: e.target.value
                                        })
                                      }
                                      placeholder="e.g. Stall #B4 assigned, press vest confirmed"
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs text-zinc-900"
                                    />
                                  </div>
                                </div>

                                <div className="flex items-center justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingPartnerId(null)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900"
                                  >
                                    <X size={13} />
                                    <span>Cancel</span>
                                  </button>
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handlePartnerAdminSave(reg)}
                                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors disabled:opacity-50"
                                  >
                                    <Save size={13} />
                                    <span>
                                      {savingId === reg.id ? "Saving..." : "Save Changes"}
                                    </span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
