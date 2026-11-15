# Security Specification (`security_spec.md`)

## 1. Data Invariants
1. **Authentication & Email Verification**: Every read and write operation to `/riderRegistrations/{registrationId}`, `/partnerRegistrations/{registrationId}`, and `/admins/{adminUid}` requires an authenticated user with a verified email (`request.auth != null && request.auth.token.email_verified == true`).
2. **PII Isolation & Query Enforcement**: `/riderRegistrations/{registrationId}` and `/partnerRegistrations/{registrationId}` contain registrant PII (`email`, `phone`, `emergencyContactPhone`, `bloodGroup`). `get` and `list` operations are restricted strictly to the document owner (`resource.data.userId == request.auth.uid`) or a verified championship administrator (`isAdmin()`).
3. **Strict Ownership & Identity Binding on Create**: When creating a `RiderRegistration` or `PartnerRegistration`, `incoming().userId == request.auth.uid` and `incoming().userEmail == request.auth.token.email`. Initial `status` must be `'pending'`, `adminNotes` must be `''` (and `raceNumber == ''` for riders).
4. **Strict Schema & Volumetric Bounds**: All fields are validated via `isValidRiderRegistration(data)` and `isValidPartnerRegistration(data)` with strict key checks (`hasAll` and `hasOnly`), exact enum checks, and explicit string length bounds matching `firebase-blueprint.json`.
5. **Temporal Integrity & Immortal Fields**: `createdAt == request.time` on `create`; `createdAt == existing().createdAt`, `userId == existing().userId`, and `userEmail == existing().userEmail` on `update`, with `updatedAt == request.time`.
6. **Terminal State Locking & Tiered Action Updates**: Once `existing().status == 'withdrawn'` (riders) or non-`pending` (partner submissions), non-admin users cannot modify the record. Admins can update status, bib numbers, and notes or delete invalid entries.

## 2. The "Dirty Dozen" Payloads
See `/firestore.rules.test.ts` for all 12 adversarial payloads tested against `riderRegistrations` and `partnerRegistrations`, all returning `PERMISSION_DENIED`.
