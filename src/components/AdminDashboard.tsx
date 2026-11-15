import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp
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
  ArrowLeft,
  ShieldCheck,
  Trophy,
  Building2,
  Users,
  Search,
  Download,
  LogIn,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  Edit3,
  Trash2,
  Phone,
  Save,
  X,
  Plus,
  UserPlus
} from "lucide-react";
import {
  RiderRegistrationDoc,
  PartnerRegistrationDoc
} from "./RiderTrackerSection";
import { FormTab } from "./RegistrationModal";

interface AdminUserDoc {
  uid: string;
  email: string;
  role: string;
}

interface AdminDashboardProps {
  onExitAdmin: () => void;
  onOpenRegisterModal: (defaultTab?: FormTab, eventName?: string) => void;
}

const EVENTS_LIST = [
  "Extreme Moto Enduro Cross 2027",
  "Himalayan Enduro 2027 Pokhara (April 5 & 6)",
  "Himalayan Enduro 2027 Everest (Nov 2027)"
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onExitAdmin,
  onOpenRegisterModal
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [authReady, setAuthReady] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"riders" | "partners" | "admins">("riders");

  const [riders, setRiders] = useState<RiderRegistrationDoc[]>([]);
  const [partners, setPartners] = useState<PartnerRegistrationDoc[]>([]);
  const [admins, setAdmins] = useState<AdminUserDoc[]>([]);
  const [loading, setLoading] = useState(false);

  // Rider Filters
  const [eventFilter, setEventFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Partner Filters
  const [partnerTypeFilter, setPartnerTypeFilter] = useState<string>("ALL");
  const [partnerStatusFilter, setPartnerStatusFilter] = useState<string>("ALL");
  const [partnerSearchQuery, setPartnerSearchQuery] = useState<string>("");

  // Inline Edits
  const [editingRiderId, setEditingRiderId] = useState<string | null>(null);
  const [riderDraft, setRiderDraft] = useState<{
    status: RiderRegistrationDoc["status"];
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

  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null);
  const [partnerDraft, setPartnerDraft] = useState<{
    status: PartnerRegistrationDoc["status"];
    adminNotes: string;
  }>({
    status: "pending",
    adminNotes: ""
  });

  // 2-step delete confirmation state
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);

  // Add Admin form
  const [newAdminUid, setNewAdminUid] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [adminFormStatus, setAdminFormStatus] = useState<string | null>(null);

  const isBootstrappedAdmin =
    Boolean(currentUser?.emailVerified) &&
    currentUser?.email === BOOTSTRAPPED_ADMIN_EMAIL;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Ensure primary admin record exists in /admins/{uid} when logged in as motoenduronp@gmail.com
  useEffect(() => {
    if (!authReady || !currentUser || !isBootstrappedAdmin) return;
    let active = true;
    const adminRef = doc(db, "admins", currentUser.uid);
    getDoc(adminRef)
      .then((snap) => {
        if (!active || snap.exists()) return;
        return setDoc(adminRef, {
          email: currentUser.email || BOOTSTRAPPED_ADMIN_EMAIL,
          role: "admin",
          createdAt: serverTimestamp()
        });
      })
      .catch(() => {
        // Ignore transient offline errors on initial bootstrap check
      });
    return () => {
      active = false;
    };
  }, [authReady, currentUser, isBootstrappedAdmin]);

  // Subscribe to all collections when signed in as Bootstrapped Admin
  useEffect(() => {
    if (!authReady || !currentUser || !isBootstrappedAdmin) {
      setRiders([]);
      setPartners([]);
      setAdmins([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubRiders = onSnapshot(
      query(collection(db, "riderRegistrations")),
      (snap) => {
        const list: RiderRegistrationDoc[] = snap.docs.map((d) => {
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
        list.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        setRiders(list);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, "riderRegistrations");
      }
    );

    const unsubPartners = onSnapshot(
      query(collection(db, "partnerRegistrations")),
      (snap) => {
        const list: PartnerRegistrationDoc[] = snap.docs.map((d) => {
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
        list.sort((a, b) => (b.createdAt?.toMillis?.() || 0) - (a.createdAt?.toMillis?.() || 0));
        setPartners(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "partnerRegistrations");
      }
    );

    const unsubAdmins = onSnapshot(
      query(collection(db, "admins"), where("role", "==", "admin")),
      (snap) => {
        const list: AdminUserDoc[] = snap.docs.map((d) => ({
          uid: d.id,
          email: String(d.data().email || ""),
          role: String(d.data().role || "admin")
        }));
        setAdmins(list);
      },
      (error) => {
        handleFirestoreError(error, OperationType.LIST, "admins");
      }
    );

    return () => {
      unsubRiders();
      unsubPartners();
      unsubAdmins();
    };
  }, [authReady, currentUser, isBootstrappedAdmin]);

  const handleSignIn = async () => {
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Google Sign-In failed.");
    }
  };

  const handleSignOut = async () => {
    setAuthError(null);
    try {
      await logOutUser();
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : "Sign-out failed.");
    }
  };

  const handleQuickRiderStatus = async (
    reg: RiderRegistrationDoc,
    newStatus: RiderRegistrationDoc["status"]
  ) => {
    setSavingId(reg.id);
    const path = `riderRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "riderRegistrations", reg.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveRiderEdit = async (reg: RiderRegistrationDoc) => {
    setSavingId(reg.id);
    const path = `riderRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "riderRegistrations", reg.id), {
        status: riderDraft.status,
        raceNumber: riderDraft.raceNumber.trim().slice(0, 15),
        adminNotes: riderDraft.adminNotes.trim().slice(0, 500),
        raceCategory: riderDraft.raceCategory,
        bikeMakeModel: riderDraft.bikeMakeModel.trim().slice(0, 100),
        engineDisplacement: riderDraft.engineDisplacement.trim().slice(0, 50),
        updatedAt: serverTimestamp()
      });
      setEditingRiderId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleDeleteRider = async (regId: string) => {
    setSavingId(regId);
    const path = `riderRegistrations/${regId}`;
    try {
      await deleteDoc(doc(db, "riderRegistrations", regId));
      setConfirmDeleteId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleSavePartnerEdit = async (reg: PartnerRegistrationDoc) => {
    setSavingId(reg.id);
    const path = `partnerRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "partnerRegistrations", reg.id), {
        status: partnerDraft.status,
        adminNotes: partnerDraft.adminNotes.trim().slice(0, 500),
        updatedAt: serverTimestamp()
      });
      setEditingPartnerId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleQuickPartnerStatus = async (
    reg: PartnerRegistrationDoc,
    newStatus: PartnerRegistrationDoc["status"]
  ) => {
    setSavingId(reg.id);
    const path = `partnerRegistrations/${reg.id}`;
    try {
      await updateDoc(doc(db, "partnerRegistrations", reg.id), {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleDeletePartner = async (regId: string) => {
    setSavingId(regId);
    const path = `partnerRegistrations/${regId}`;
    try {
      await deleteDoc(doc(db, "partnerRegistrations", regId));
      setConfirmDeleteId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    } finally {
      setSavingId(null);
    }
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminFormStatus(null);
    const uid = newAdminUid.trim();
    const email = newAdminEmail.trim();
    if (!/^[a-zA-Z0-9_\-]+$/.test(uid)) {
      setAdminFormStatus("UID must contain only letters, numbers, underscores, or hyphens.");
      return;
    }
    const path = `admins/${uid}`;
    try {
      await setDoc(doc(db, "admins", uid), {
        email: email.slice(0, 160),
        role: "admin",
        createdAt: serverTimestamp()
      });
      setNewAdminUid("");
      setNewAdminEmail("");
      setAdminFormStatus(`Admin account added for ${email}.`);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, path);
    }
  };

  const handleRemoveAdmin = async (uid: string) => {
    const path = `admins/${uid}`;
    try {
      await deleteDoc(doc(db, "admins", uid));
      setConfirmDeleteId(null);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, path);
    }
  };

  const filteredRiders = riders.filter((r) => {
    if (eventFilter !== "ALL" && r.eventSelection !== eventFilter) return false;
    if (statusFilter !== "ALL" && r.status !== statusFilter) return false;
    if (categoryFilter !== "ALL" && r.raceCategory !== categoryFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        r.fullName.toLowerCase().includes(q) ||
        r.phone.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.bikeMakeModel.toLowerCase().includes(q) ||
        r.raceNumber.toLowerCase().includes(q) ||
        r.cityCountry.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredPartners = partners.filter((p) => {
    if (partnerTypeFilter !== "ALL" && p.registrationType !== partnerTypeFilter) return false;
    if (partnerStatusFilter !== "ALL" && p.status !== partnerStatusFilter) return false;
    if (partnerSearchQuery.trim()) {
      const q = partnerSearchQuery.toLowerCase();
      return (
        p.contactName.toLowerCase().includes(q) ||
        p.organization.toLowerCase().includes(q) ||
        p.email.toLowerCase().includes(q) ||
        p.phone.toLowerCase().includes(q) ||
        p.categoryOrTier.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const exportRidersCsv = () => {
    if (filteredRiders.length === 0) return;
    const headers = [
      "Bib #",
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
      "Race Control Notes"
    ];
    const rows = filteredRiders.map((r) => [
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
        .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `admin_riders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPartnersCsv = () => {
    if (filteredPartners.length === 0) return;
    const headers = [
      "Type",
      "Status",
      "Contact Name",
      "Organization",
      "Category/Tier",
      "Details",
      "Phone",
      "Email",
      "Notes",
      "Admin Notes"
    ];
    const rows = filteredPartners.map((p) => [
      p.registrationType.toUpperCase(),
      p.status.toUpperCase(),
      p.contactName,
      p.organization,
      p.categoryOrTier,
      p.details,
      p.phone,
      p.email,
      p.notes,
      p.adminNotes
    ]);
    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csvContent));
    link.setAttribute("download", `admin_partners_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#EAE8E3] text-zinc-900 font-sans">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#C80815] text-white border-b border-black/15 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onExitAdmin}
              className="cursor-pointer inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white text-xs font-semibold px-3.5 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft size={14} />
              <span>Back to Site</span>
            </button>
            <div>
              <div className="font-heading font-black text-lg sm:text-xl uppercase tracking-wide leading-none">
                RACE CONTROL ADMIN
              </div>
              <div className="text-[11px] text-white/80 mt-0.5">
                Extreme Moto Enduro Cross · Registrations Management
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => onOpenRegisterModal("rider")}
              className="cursor-pointer inline-flex items-center gap-1.5 bg-white text-zinc-900 hover:bg-stone-100 text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <Plus size={14} />
              <span>Add Entry</span>
            </button>
            {currentUser ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <LogOut size={13} />
                <span>Sign Out ({currentUser.email})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSignIn}
                className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap shrink-0"
              >
                <LogIn size={13} />
                <span>Admin Sign In</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {authError && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700">
            {authError}
          </div>
        )}

        {/* Gate 1: Not Signed In */}
        {!currentUser ? (
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-8 sm:p-14 text-center max-w-xl mx-auto mt-8">
            <div className="w-14 h-14 rounded-2xl bg-[#F5F4F0] text-[#C80815] flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={28} />
            </div>
            <h1 className="font-heading font-black text-3xl uppercase text-zinc-900 mb-2">
              Organizer Admin Console
            </h1>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              Sign in with the championship organizer account (<strong className="text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</strong>) to track all registered riders, assign race bib numbers, verify scrutineering, approve sponsors/vendors/media, and export rosters.
            </p>
            <button
              type="button"
              onClick={handleSignIn}
              className="cursor-pointer inline-flex items-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors"
            >
              <LogIn size={16} />
              <span>Sign In with Google ({BOOTSTRAPPED_ADMIN_EMAIL})</span>
            </button>
          </div>
        ) : !isBootstrappedAdmin ? (
          /* Gate 2: Signed In With Non-Admin Account */
          <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-8 sm:p-14 text-center max-w-xl mx-auto mt-8">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-5">
              <ShieldCheck size={28} />
            </div>
            <h1 className="font-heading font-black text-3xl uppercase text-zinc-900 mb-2">
              Admin Authorization Required
            </h1>
            <p className="text-sm text-zinc-600 leading-relaxed mb-6">
              You are currently signed in as <strong className="text-zinc-900">{currentUser.email}</strong>. Full organizer access is restricted to the verified championship admin account (<strong className="text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</strong>).
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSignOut}
                className="cursor-pointer inline-flex items-center gap-2 bg-[#242426] hover:bg-zinc-900 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <LogOut size={15} />
                <span>Switch Google Account</span>
              </button>
              <button
                type="button"
                onClick={onExitAdmin}
                className="cursor-pointer inline-flex items-center gap-2 bg-[#F5F4F0] hover:bg-stone-200 text-zinc-900 text-xs sm:text-sm font-semibold px-6 py-3 rounded-full transition-colors"
              >
                <span>Return to Public Site</span>
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Workspace */
          <div className="space-y-6">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
                <div className="text-xs text-zinc-500 font-medium">Total Registered Riders</div>
                <div className="font-heading font-black text-4xl text-zinc-900 tabular-nums mt-1">
                  {riders.length}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Across all 3 events</div>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
                <div className="text-xs text-zinc-500 font-medium">Confirmed on Grid</div>
                <div className="font-heading font-black text-4xl text-emerald-700 tabular-nums mt-1">
                  {riders.filter((r) => r.status === "confirmed").length}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {riders.filter((r) => r.status === "scrutineered").length} scrutineered
                </div>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
                <div className="text-xs text-zinc-500 font-medium">Pending Rider Review</div>
                <div className="font-heading font-black text-4xl text-[#C80815] tabular-nums mt-1">
                  {riders.filter((r) => r.status === "pending").length}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Awaiting bib &amp; approval</div>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200/80 p-5 shadow-xs">
                <div className="text-xs text-zinc-500 font-medium">Partners, Vendors &amp; Media</div>
                <div className="font-heading font-black text-4xl text-zinc-900 tabular-nums mt-1">
                  {partners.length}
                </div>
                <div className="text-xs text-zinc-500 mt-1">
                  {partners.filter((p) => p.status === "pending").length} pending review
                </div>
              </div>
            </div>

            {/* Event-by-Event Quick Filter Strip */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {EVENTS_LIST.map((evName) => {
                const count = riders.filter((r) => r.eventSelection === evName).length;
                const active = eventFilter === evName && activeTab === "riders";
                return (
                  <button
                    key={evName}
                    type="button"
                    onClick={() => {
                      setActiveTab("riders");
                      setEventFilter(active ? "ALL" : evName);
                    }}
                    className={`cursor-pointer text-left p-4 rounded-2xl border transition-colors ${
                      active
                        ? "bg-[#242426] text-white border-zinc-900"
                        : "bg-white text-zinc-900 border-stone-200/80 hover:border-zinc-400"
                    }`}
                  >
                    <div className={`text-xs font-medium ${active ? "text-zinc-300" : "text-zinc-500"}`}>
                      {active ? "Filtered Event (Click to Clear)" : "Click to Filter Event"}
                    </div>
                    <div className="flex items-baseline justify-between gap-2 mt-1">
                      <span className="font-heading font-bold text-base uppercase truncate">
                        {evName}
                      </span>
                      <span className={`font-heading font-black text-2xl tabular-nums shrink-0 ${active ? "text-white" : "text-[#C80815]"}`}>
                        {count}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Admin Workspace Card */}
            <div className="bg-white rounded-[28px] border border-stone-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              {/* Navigation Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-200 pb-4">
                <div className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#F5F4F0] rounded-xl">
                  <button
                    type="button"
                    onClick={() => setActiveTab("riders")}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === "riders"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Trophy size={13} className="text-[#C80815]" />
                    <span>Riders Roster ({riders.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("partners")}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === "partners"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Building2 size={13} className="text-[#C80815]" />
                    <span>Sponsors, Vendors &amp; Media ({partners.length})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("admins")}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                      activeTab === "admins"
                        ? "bg-white text-zinc-900 shadow-xs"
                        : "text-zinc-600 hover:text-zinc-900"
                    }`}
                  >
                    <Users size={13} className="text-[#C80815]" />
                    <span>Admin Accounts ({admins.length})</span>
                  </button>
                </div>

                <div className="text-xs text-zinc-500">
                  Live Firestore Sync · <strong className="text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</strong>
                </div>
              </div>

              {/* TAB 1: RIDERS MANAGEMENT */}
              {activeTab === "riders" && (
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F5F4F0] p-3.5 rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 flex-1">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search rider, bike, phone, bib..."
                          className="w-full bg-white border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <select
                        value={eventFilter}
                        onChange={(e) => setEventFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium"
                      >
                        <option value="ALL">All Events</option>
                        {EVENTS_LIST.map((ev) => (
                          <option key={ev} value={ev}>
                            {ev}
                          </option>
                        ))}
                      </select>

                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium"
                      >
                        <option value="ALL">All Classes</option>
                        <option value="Pro Open">Pro Open</option>
                        <option value="National Expert">National Expert</option>
                        <option value="Novice Grassroots">Novice Grassroots</option>
                        <option value="Veterans (40+)">Veterans (40+)</option>
                      </select>

                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="scrutineered">Scrutineered</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      disabled={filteredRiders.length === 0}
                      onClick={exportRidersCsv}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-40 whitespace-nowrap shrink-0"
                    >
                      <Download size={13} />
                      <span>Export CSV ({filteredRiders.length})</span>
                    </button>
                  </div>

                  {loading ? (
                    <div className="py-12 text-center text-xs text-zinc-500">Loading rider roster...</div>
                  ) : filteredRiders.length === 0 ? (
                    <div className="py-12 text-center bg-[#F5F4F0] rounded-2xl p-6">
                      <p className="text-sm font-semibold text-zinc-800">No Matching Riders</p>
                      <p className="text-xs text-zinc-500 mt-1">
                        {riders.length === 0
                          ? "No riders have registered yet. Use 'Add Entry' above or wait for rider submissions."
                          : "Adjust your filters or search query."}
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredRiders.map((reg) => {
                        const isEditing = editingRiderId === reg.id;
                        return (
                          <div key={reg.id} className="p-5 rounded-2xl border border-stone-200 bg-white">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-mono font-bold text-zinc-900">
                                    {reg.raceNumber ? `#${reg.raceNumber}` : "BIB UNASSIGNED"}
                                  </span>
                                  <span className="text-zinc-300">·</span>
                                  <span className="font-semibold text-[#C80815]">{reg.eventSelection}</span>
                                  <span className="text-zinc-300">·</span>
                                  <span className="font-medium text-zinc-600">{reg.raceCategory}</span>
                                  <span className="text-zinc-300">·</span>
                                  {reg.status === "confirmed" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                                      <CheckCircle2 size={13} /> Confirmed
                                    </span>
                                  )}
                                  {reg.status === "scrutineered" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-blue-700">
                                      <ShieldCheck size={13} /> Scrutineered
                                    </span>
                                  )}
                                  {reg.status === "pending" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                                      <Clock size={13} /> Pending Review
                                    </span>
                                  )}
                                  {reg.status === "withdrawn" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-500">
                                      <XCircle size={13} /> Withdrawn
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                                    {reg.fullName}
                                  </h3>
                                  <span className="text-xs font-medium text-zinc-600">
                                    {reg.bikeMakeModel} ({reg.engineDisplacement})
                                  </span>
                                  <span className="text-xs text-zinc-500">{reg.cityCountry}</span>
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600">
                                  <span>Phone: <strong className="text-zinc-900">{reg.phone}</strong></span>
                                  <span>Email: <strong className="text-zinc-900">{reg.email}</strong></span>
                                  <span>Blood: <strong className="text-[#C80815]">{reg.bloodGroup}</strong></span>
                                  <span>Emergency: <strong className="text-zinc-900">{reg.emergencyContactName} ({reg.emergencyContactPhone})</strong></span>
                                </div>

                                {reg.adminNotes && !isEditing && (
                                  <div className="text-xs text-zinc-600">
                                    <strong className="text-zinc-800">Notes:</strong> {reg.adminNotes}
                                  </div>
                                )}
                              </div>

                              {/* Quick Admin Controls */}
                              <div className="flex flex-wrap items-center gap-2 shrink-0">
                                {reg.status !== "confirmed" && (
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handleQuickRiderStatus(reg, "confirmed")}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                                  >
                                    <CheckCircle2 size={12} />
                                    <span>Confirm</span>
                                  </button>
                                )}
                                <a
                                  href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                                    `Hello ${reg.fullName}, Race Control update for ${reg.eventSelection}.`
                                  )}`}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-stone-200 text-zinc-800 text-xs font-semibold transition-colors"
                                >
                                  <Phone size={12} />
                                  <span>WhatsApp</span>
                                </a>
                                <button
                                  type="button"
                                  onClick={() => {
                                    if (isEditing) {
                                      setEditingRiderId(null);
                                    } else {
                                      setEditingRiderId(reg.id);
                                      setRiderDraft({
                                        status: reg.status,
                                        raceNumber: reg.raceNumber,
                                        adminNotes: reg.adminNotes,
                                        raceCategory: reg.raceCategory,
                                        bikeMakeModel: reg.bikeMakeModel,
                                        engineDisplacement: reg.engineDisplacement
                                      });
                                    }
                                  }}
                                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold transition-colors"
                                >
                                  <Edit3 size={12} />
                                  <span>{isEditing ? "Close" : "Edit"}</span>
                                </button>
                                {confirmDeleteId === reg.id ? (
                                  <div className="inline-flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={savingId === reg.id}
                                      onClick={() => handleDeleteRider(reg.id)}
                                      className="cursor-pointer px-3 py-1.5 rounded-full bg-[#C80815] text-white text-xs font-semibold"
                                    >
                                      Confirm Delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteId(null)}
                                      className="cursor-pointer px-2 py-1.5 text-xs text-zinc-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(reg.id)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors"
                                  >
                                    <Trash2 size={12} />
                                    <span>Delete</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {isEditing && (
                              <div className="mt-4 pt-4 border-t border-stone-200 bg-[#F5F4F0] p-4 rounded-xl space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Status
                                    </label>
                                    <select
                                      value={riderDraft.status}
                                      onChange={(e) =>
                                        setRiderDraft({
                                          ...riderDraft,
                                          status: e.target.value as RiderRegistrationDoc["status"]
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    >
                                      <option value="pending">Pending</option>
                                      <option value="scrutineered">Scrutineered</option>
                                      <option value="confirmed">Confirmed</option>
                                      <option value="withdrawn">Withdrawn</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Bib / Race #
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={15}
                                      value={riderDraft.raceNumber}
                                      onChange={(e) =>
                                        setRiderDraft({ ...riderDraft, raceNumber: e.target.value })
                                      }
                                      placeholder="e.g. 444"
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Class Category
                                    </label>
                                    <select
                                      value={riderDraft.raceCategory}
                                      onChange={(e) =>
                                        setRiderDraft({ ...riderDraft, raceCategory: e.target.value })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    >
                                      <option value="Pro Open">Pro Open</option>
                                      <option value="National Expert">National Expert</option>
                                      <option value="Novice Grassroots">Novice Grassroots</option>
                                      <option value="Veterans (40+)">Veterans (40+)</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Motorcycle
                                    </label>
                                    <input
                                      type="text"
                                      maxLength={100}
                                      value={riderDraft.bikeMakeModel}
                                      onChange={(e) =>
                                        setRiderDraft({ ...riderDraft, bikeMakeModel: e.target.value })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    />
                                  </div>
                                </div>
                                <div>
                                  <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                    Race Control Notes
                                  </label>
                                  <input
                                    type="text"
                                    maxLength={500}
                                    value={riderDraft.adminNotes}
                                    onChange={(e) =>
                                      setRiderDraft({ ...riderDraft, adminNotes: e.target.value })
                                    }
                                    placeholder="Scrutineering, fee payment, gear checks..."
                                    className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                  />
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingRiderId(null)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs text-zinc-600"
                                  >
                                    <X size={13} /> Cancel
                                  </button>
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handleSaveRiderEdit(reg)}
                                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
                                  >
                                    <Save size={13} />
                                    <span>{savingId === reg.id ? "Saving..." : "Save Rider"}</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: SPONSORS, VENDORS & MEDIA */}
              {activeTab === "partners" && (
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-[#F5F4F0] p-3.5 rounded-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={partnerSearchQuery}
                          onChange={(e) => setPartnerSearchQuery(e.target.value)}
                          placeholder="Search name, business, email..."
                          className="w-full bg-white border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-zinc-900 focus:outline-none focus:border-zinc-900"
                        />
                      </div>

                      <select
                        value={partnerTypeFilter}
                        onChange={(e) => setPartnerTypeFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium"
                      >
                        <option value="ALL">All Types</option>
                        <option value="sponsor">Sponsors</option>
                        <option value="vendor">Vendor Booths</option>
                        <option value="media">Media Passes</option>
                        <option value="general">General</option>
                      </select>

                      <select
                        value={partnerStatusFilter}
                        onChange={(e) => setPartnerStatusFilter(e.target.value)}
                        className="bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs text-zinc-800 font-medium"
                      >
                        <option value="ALL">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="declined">Declined</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      disabled={filteredPartners.length === 0}
                      onClick={exportPartnersCsv}
                      className="cursor-pointer inline-flex items-center justify-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-40 whitespace-nowrap shrink-0"
                    >
                      <Download size={13} />
                      <span>Export CSV ({filteredPartners.length})</span>
                    </button>
                  </div>

                  {filteredPartners.length === 0 ? (
                    <div className="py-12 text-center bg-[#F5F4F0] rounded-2xl p-6">
                      <p className="text-sm font-semibold text-zinc-800">
                        No Partner, Vendor, or Media Registrations Found
                      </p>
                      <p className="text-xs text-zinc-500 mt-1">
                        Submissions from Sponsorship, Vendor Booth, Media Pass, and General forms appear here.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredPartners.map((reg) => {
                        const isEditing = editingPartnerId === reg.id;
                        return (
                          <div key={reg.id} className="p-5 rounded-2xl border border-stone-200 bg-white">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                              <div className="space-y-1.5">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                  <span className="font-mono font-bold uppercase text-[#C80815]">
                                    {reg.registrationType}
                                  </span>
                                  <span className="text-zinc-300">·</span>
                                  <span className="font-medium text-zinc-700">{reg.categoryOrTier}</span>
                                  <span className="text-zinc-300">·</span>
                                  {reg.status === "approved" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-700">
                                      <CheckCircle2 size={13} /> Approved
                                    </span>
                                  )}
                                  {reg.status === "pending" && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-amber-700">
                                      <Clock size={13} /> Pending Review
                                    </span>
                                  )}
                                  {(reg.status === "declined" || reg.status === "withdrawn") && (
                                    <span className="inline-flex items-center gap-1 font-semibold text-zinc-500 capitalize">
                                      <XCircle size={13} /> {reg.status}
                                    </span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                                  <h3 className="font-heading font-black text-2xl uppercase text-zinc-900">
                                    {reg.contactName}
                                  </h3>
                                  {reg.organization && (
                                    <span className="text-xs font-semibold text-zinc-700">
                                      {reg.organization}
                                    </span>
                                  )}
                                  {reg.details && (
                                    <span className="text-xs text-zinc-500">{reg.details}</span>
                                  )}
                                </div>

                                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-zinc-600">
                                  {reg.phone && <span>Phone: <strong className="text-zinc-900">{reg.phone}</strong></span>}
                                  <span>Email: <strong className="text-zinc-900">{reg.email}</strong></span>
                                </div>

                                {reg.notes && (
                                  <p className="text-xs text-zinc-600">
                                    <strong className="text-zinc-800">Notes:</strong> {reg.notes}
                                  </p>
                                )}
                                {reg.adminNotes && !isEditing && (
                                  <p className="text-xs text-zinc-600">
                                    <strong className="text-zinc-800">Organizer Notes:</strong> {reg.adminNotes}
                                  </p>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-2 shrink-0">
                                {reg.status !== "approved" && (
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handleQuickPartnerStatus(reg, "approved")}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-colors"
                                  >
                                    <CheckCircle2 size={12} />
                                    <span>Approve</span>
                                  </button>
                                )}
                                {reg.phone && (
                                  <a
                                    href={`https://wa.me/${reg.phone.replace(/[^0-9]/g, "")}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#F5F4F0] hover:bg-stone-200 text-zinc-800 text-xs font-semibold transition-colors"
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
                                      setPartnerDraft({
                                        status: reg.status,
                                        adminNotes: reg.adminNotes
                                      });
                                    }
                                  }}
                                  className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold transition-colors"
                                >
                                  <Edit3 size={12} />
                                  <span>{isEditing ? "Close" : "Edit"}</span>
                                </button>
                                {confirmDeleteId === reg.id ? (
                                  <div className="inline-flex items-center gap-1">
                                    <button
                                      type="button"
                                      disabled={savingId === reg.id}
                                      onClick={() => handleDeletePartner(reg.id)}
                                      className="cursor-pointer px-3 py-1.5 rounded-full bg-[#C80815] text-white text-xs font-semibold"
                                    >
                                      Confirm Delete
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => setConfirmDeleteId(null)}
                                      className="cursor-pointer px-2 py-1.5 text-xs text-zinc-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                ) : (
                                  <button
                                    type="button"
                                    onClick={() => setConfirmDeleteId(reg.id)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold transition-colors"
                                  >
                                    <Trash2 size={12} />
                                    <span>Delete</span>
                                  </button>
                                )}
                              </div>
                            </div>

                            {isEditing && (
                              <div className="mt-4 pt-4 border-t border-stone-200 bg-[#F5F4F0] p-4 rounded-xl space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                  <div>
                                    <label className="block text-[11px] font-semibold text-zinc-600 mb-1">
                                      Status
                                    </label>
                                    <select
                                      value={partnerDraft.status}
                                      onChange={(e) =>
                                        setPartnerDraft({
                                          ...partnerDraft,
                                          status: e.target.value as PartnerRegistrationDoc["status"]
                                        })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    >
                                      <option value="pending">Pending</option>
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
                                      value={partnerDraft.adminNotes}
                                      onChange={(e) =>
                                        setPartnerDraft({ ...partnerDraft, adminNotes: e.target.value })
                                      }
                                      className="w-full bg-white border border-stone-300 rounded-lg px-2.5 py-1.5 text-xs"
                                    />
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setEditingPartnerId(null)}
                                    className="cursor-pointer inline-flex items-center gap-1 px-3 py-1.5 text-xs text-zinc-600"
                                  >
                                    <X size={13} /> Cancel
                                  </button>
                                  <button
                                    type="button"
                                    disabled={savingId === reg.id}
                                    onClick={() => handleSavePartnerEdit(reg)}
                                    className="cursor-pointer inline-flex items-center gap-1.5 bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg"
                                  >
                                    <Save size={13} />
                                    <span>Save</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: ADMIN ACCOUNTS MANAGEMENT */}
              {activeTab === "admins" && (
                <div className="space-y-6">
                  <form
                    onSubmit={handleAddAdmin}
                    className="bg-[#F5F4F0] p-5 rounded-2xl space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-zinc-900">
                      <UserPlus size={14} className="text-[#C80815]" />
                      <span>Authorize Additional Race Control Admin</span>
                    </div>
                    <p className="text-xs text-zinc-600">
                      Primary Super Admin <strong className="text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</strong> is authorized automatically. Add Firebase Auth UIDs below to grant organizer permissions in Firestore.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={newAdminUid}
                        onChange={(e) => setNewAdminUid(e.target.value)}
                        placeholder="Firebase Auth UID"
                        className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="email"
                        required
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="Organizer Email"
                        className="bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs"
                      />
                      <button
                        type="submit"
                        className="cursor-pointer bg-[#242426] hover:bg-zinc-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                      >
                        Add Organizer Admin
                      </button>
                    </div>
                    {adminFormStatus && (
                      <div className="text-xs font-medium text-emerald-700">{adminFormStatus}</div>
                    )}
                  </form>

                  <div className="space-y-2.5">
                    <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-zinc-900">{BOOTSTRAPPED_ADMIN_EMAIL}</div>
                        <div className="text-[11px] text-zinc-500">Bootstrapped Super Admin · Full Access</div>
                      </div>
                      <span className="text-xs font-semibold text-emerald-700">Active</span>
                    </div>
                    {admins
                      .filter((a) => a.email !== BOOTSTRAPPED_ADMIN_EMAIL)
                      .map((a) => (
                        <div
                          key={a.uid}
                          className="p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between gap-4"
                        >
                          <div>
                            <div className="text-xs font-bold text-zinc-900">{a.email}</div>
                            <div className="text-[11px] font-mono text-zinc-500">UID: {a.uid}</div>
                          </div>
                          {confirmDeleteId === a.uid ? (
                            <div className="inline-flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleRemoveAdmin(a.uid)}
                                className="cursor-pointer px-3 py-1 rounded-full bg-[#C80815] text-white text-xs font-semibold"
                              >
                                Confirm Revoke
                              </button>
                              <button
                                type="button"
                                onClick={() => setConfirmDeleteId(null)}
                                className="cursor-pointer text-xs text-zinc-500"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteId(a.uid)}
                              className="cursor-pointer px-3 py-1 rounded-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
