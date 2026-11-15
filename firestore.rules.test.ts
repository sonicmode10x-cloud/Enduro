/**
 * Firestore Security Rules Test Suite for Rider Registration Backend
 * Verifies all 12 "Dirty Dozen" adversarial payloads are rejected with PERMISSION_DENIED.
 */

export interface DirtyDozenTestCase {
  id: number;
  name: string;
  operation: "get" | "list" | "create" | "update" | "delete";
  path: string;
  auth: {
    uid: string;
    email: string;
    email_verified: boolean;
  } | null;
  payload?: Record<string, unknown>;
  expectedResult: "PERMISSION_DENIED";
}

export const DIRTY_DOZEN_TESTS: DirtyDozenTestCase[] = [
  {
    id: 1,
    name: "Unauthenticated create attempt",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: null,
    payload: { fullName: "Roshan Thapa" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 2,
    name: "Unverified email admin spoof attempt",
    operation: "list",
    path: "/riderRegistrations",
    auth: { uid: "spoof_admin", email: "motoenduronp@gmail.com", email_verified: false },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 3,
    name: "Identity spoofing (userId mismatch on create)",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_2", userEmail: "rider1@example.com" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 4,
    name: "Shadow field injection on create",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1", isVIP: true },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 5,
    name: "Initial state shortcutting (creating with status=confirmed)",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1", status: "confirmed" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 6,
    name: "Value poisoning with oversized fullName string",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1", fullName: "A".repeat(1000) },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 7,
    name: "Invalid enum value in bloodGroup and raceCategory",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1", bloodGroup: "Z+", raceCategory: "MotoGP" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 8,
    name: "Document ID poisoning with invalid characters",
    operation: "create",
    path: "/riderRegistrations/bad$id!@#",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 9,
    name: "Client timestamp forgery on create",
    operation: "create",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { userId: "rider_1", createdAt: "2020-01-01T00:00:00Z" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 10,
    name: "Cross-tenant PII read by non-owner",
    operation: "get",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_2", email: "rider2@example.com", email_verified: true },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 11,
    name: "Rider privilege escalation (self-confirming status or raceNumber)",
    operation: "update",
    path: "/riderRegistrations/reg_001",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { status: "confirmed", raceNumber: "99" },
    expectedResult: "PERMISSION_DENIED"
  },
  {
    id: 12,
    name: "Terminal state mutation after status is withdrawn",
    operation: "update",
    path: "/riderRegistrations/reg_withdrawn",
    auth: { uid: "rider_1", email: "rider1@example.com", email_verified: true },
    payload: { phone: "+977 9800000000" },
    expectedResult: "PERMISSION_DENIED"
  }
];
