import React, { useCallback, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  Lock,
  LogIn,
  ShieldCheck
} from "lucide-react";
import { auth, BOOTSTRAPPED_ADMIN_EMAIL, signInWithGoogle } from "../lib/firebase";
import { CompanyProposalRecord, PrivateRateCard } from "../types/xtremeProposal";
import { PrivateProposalsWorkspace } from "./PrivateProposalsWorkspace";

interface XtremeProposalPageProps {
  onBackToHome: () => void;
  companies: CompanyProposalRecord[] | null;
  rateCard: PrivateRateCard | null;
  accessMethod: "admin" | "passcode" | null;
  sessionToken: string | null;
  onUnlockSuccess: (
    companies: CompanyProposalRecord[],
    rateCard: PrivateRateCard | null,
    method: "admin" | "passcode",
    token?: string
  ) => void;
  onCompaniesChange: (next: CompanyProposalRecord[]) => void;
  onLock: () => void;
}

export const XtremeProposalPage: React.FC<XtremeProposalPageProps> = ({
  onBackToHome,
  companies,
  rateCard,
  accessMethod,
  sessionToken,
  onUnlockSuccess,
  onCompaniesChange,
  onLock
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const [checkingAdmin, setCheckingAdmin] = useState<boolean>(!companies);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [signingInAdmin, setSigningInAdmin] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Automatically unlock if the current Firebase user is a verified admin
  useEffect(() => {
    let active = true;

    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!active) return;
      setCurrentUser(user);

      if (companies) {
        setCheckingAdmin(false);
        return;
      }

      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      setCheckingAdmin(true);
      try {
        const idToken = await user.getIdToken();
        const res = await fetch("/api/xtreme-proposal/content", {
          headers: { Authorization: `Bearer ${idToken}` }
        });
        if (!active) return;

        if (res.ok) {
          const data = (await res.json()) as {
            companies: CompanyProposalRecord[];
            rateCard?: PrivateRateCard;
            accessMethod: "admin" | "passcode";
          };
          onUnlockSuccess(data.companies, data.rateCard || null, data.accessMethod);
          setErrorMessage(null);
        }
      } catch {
        // Fall through to passcode gate
      } finally {
        if (active) setCheckingAdmin(false);
      }
    });

    return () => {
      active = false;
      unsub();
    };
  }, [companies, onUnlockSuccess]);

  const handlePasswordUnlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setErrorMessage(null);

    const trimmed = password.trim();
    if (!trimmed) {
      setErrorMessage("Please enter the access password.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/xtreme-proposal/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: trimmed })
      });

      const data = (await res.json()) as {
        token?: string;
        companies?: CompanyProposalRecord[];
        rateCard?: PrivateRateCard;
        accessMethod?: "admin" | "passcode";
        error?: string;
      };

      if (!res.ok || !data.companies) {
        setErrorMessage(data.error || "Incorrect password. Access denied.");
        return;
      }

      setPassword("");
      onUnlockSuccess(
        data.companies,
        data.rateCard || null,
        data.accessMethod || "passcode",
        data.token
      );
    } catch {
      setErrorMessage("Unable to verify access right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAdminGoogleSignIn = async () => {
    if (signingInAdmin) return;
    setErrorMessage(null);
    setSigningInAdmin(true);
    try {
      const cred = await signInWithGoogle();
      const idToken = await cred.user.getIdToken(true);
      const res = await fetch("/api/xtreme-proposal/content", {
        headers: { Authorization: `Bearer ${idToken}` }
      });

      if (!res.ok) {
        setErrorMessage(
          `Signed in as ${cred.user.email || "non-admin account"}. Organizer admin authorization (${BOOTSTRAPPED_ADMIN_EMAIL}) or the access password is required.`
        );
        return;
      }

      const data = (await res.json()) as {
        companies: CompanyProposalRecord[];
        rateCard?: PrivateRateCard;
        accessMethod: "admin" | "passcode";
      };
      onUnlockSuccess(data.companies, data.rateCard || null, data.accessMethod);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Admin Google Sign-In failed."
      );
    } finally {
      setSigningInAdmin(false);
    }
  };

  const getAuthHeader = useCallback(async (): Promise<string | null> => {
    if (sessionToken) {
      return `Bearer ${sessionToken}`;
    }
    if (auth.currentUser) {
      const idToken = await auth.currentUser.getIdToken();
      return `Bearer ${idToken}`;
    }
    return null;
  }, [sessionToken]);

  return (
    <div className="min-h-screen bg-[#EAE8E3] text-zinc-900 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="cursor-pointer inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to Championship Home</span>
          </button>

          {companies && (
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <ShieldCheck size={14} />
                <span>
                  {accessMethod === "admin"
                    ? `Admin Verified (${currentUser?.email || BOOTSTRAPPED_ADMIN_EMAIL})`
                    : "Private Access Unlocked"}
                </span>
              </span>
              <button
                type="button"
                onClick={onLock}
                className="cursor-pointer inline-flex items-center gap-1.5 bg-white hover:bg-stone-100 border border-stone-300 text-zinc-800 text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors"
              >
                <Lock size={12} />
                <span>Lock Proposals</span>
              </button>
            </div>
          )}
        </div>

        {/* LOCKED STATE: Password / Admin Gate */}
        {!companies ? (
          <div className="max-w-md mx-auto mt-10 bg-white rounded-[28px] border border-stone-200/80 shadow-sm overflow-hidden">
            <div className="bg-[#121214] text-white p-6 sm:p-8 border-b border-zinc-800">
              <div className="w-11 h-11 rounded-xl bg-[#D60A19]/20 border border-[#D60A19]/40 text-[#F03845] flex items-center justify-center mb-4">
                <Lock size={20} />
              </div>
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#F03845]">
                Confidential Executive Proposals
              </p>
              <h1 className="font-heading font-black text-3xl uppercase tracking-tight text-white leading-none mt-1">
                PRIVATE ACCESS REQUIRED
              </h1>
              <p className="text-xs text-zinc-400 leading-relaxed mt-2">
                This private proposals hub is restricted to the event organizer and authorized reviewers. Enter the access password or sign in with your admin account to view and download tailored company proposals.
              </p>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              {checkingAdmin ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-xs text-zinc-500">
                  <Loader2 size={20} className="animate-spin text-[#D60A19]" />
                  <span>Checking admin authorization...</span>
                </div>
              ) : (
                <>
                  {errorMessage && (
                    <div
                      role="alert"
                      className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 leading-relaxed"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <form onSubmit={handlePasswordUnlock} className="space-y-4">
                    <div>
                      <label
                        htmlFor="xtreme-proposal-password"
                        className="block text-xs font-semibold text-zinc-700 mb-1.5"
                      >
                        Access Password
                      </label>
                      <div className="relative">
                        <KeyRound
                          size={15}
                          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                        />
                        <input
                          id="xtreme-proposal-password"
                          type={showPassword ? "text" : "password"}
                          autoComplete="off"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full bg-[#F5F4F0] border border-stone-300 rounded-xl pl-10 pr-10 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-900 focus:bg-white transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          aria-label={showPassword ? "Hide password" : "Show password"}
                          className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-900"
                        >
                          {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 bg-[#D60A19] hover:bg-[#b80815] disabled:opacity-60 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors"
                    >
                      {submitting ? (
                        <>
                          <Loader2 size={15} className="animate-spin" />
                          <span>Verifying...</span>
                        </>
                      ) : (
                        <>
                          <Lock size={14} />
                          <span>Unlock Proposals</span>
                        </>
                      )}
                    </button>
                  </form>

                  <div className="relative flex items-center justify-center py-1">
                    <div className="border-t border-stone-200 w-full" />
                    <span className="bg-white px-3 text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                      or organizer admin
                    </span>
                    <div className="border-t border-stone-200 w-full" />
                  </div>

                  <button
                    type="button"
                    onClick={handleAdminGoogleSignIn}
                    disabled={signingInAdmin}
                    className="cursor-pointer w-full inline-flex items-center justify-center gap-2 bg-[#121214] hover:bg-zinc-800 disabled:opacity-60 text-white font-semibold text-xs sm:text-sm px-5 py-3 rounded-full transition-colors"
                  >
                    {signingInAdmin ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <LogIn size={14} />
                        <span>Sign In as Admin ({BOOTSTRAPPED_ADMIN_EMAIL})</span>
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        ) : (
          /* UNLOCKED STATE: Multi-Company Private Proposals Workspace */
          <PrivateProposalsWorkspace
            companies={companies}
            rateCard={rateCard}
            onCompaniesChange={onCompaniesChange}
            getAuthHeader={getAuthHeader}
          />
        )}
      </div>
    </div>
  );
};
