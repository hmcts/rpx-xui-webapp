# Priority 1 Remediation - EXUI-4031 PR Review

## Completed Actions (2026-01-12)

### 1. Security Improvements ✅

#### Added .gitignore Protection
- Added patterns to prevent test credential files from being committed:
  - `**/storage-states/**/*.json`
  - `**/*-session*.json`
  - `**/*-credentials*.json`  
  - `.env.test.local`
  - `playwright/.auth/`

#### Removed Real Secret Handling
- **auth-coverage.api.ts**: Replaced all instances of potentially real secrets with clearly marked MOCK values:
  - `IDAM_SECRET: 'MOCK_TEST_SECRET'` (was: `'secret'`)
  - `IDAM_WEB_URL: 'https://mock-idam.test'` (was: `'https://idam'`)
  - `username: 'test-user'` (was: `'user'`)
  - Added `// SECURITY:` comments before all auth test blocks

#### Added HMCTS Audit Metadata
- All coverage test files now include JSDoc headers per agents.md §4.2:
```typescript
/**
 * @hmcts-audit-metadata {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "security_review": "required",
 *   "last_audit": "2026-01-12"
 * }
 * @security-note ...
 */
```

### 2. File Size Reduction ✅

#### Split auth-coverage.api.ts (was 360 lines)
Divided into three focused files:
- **auth-coverage-basic.api.ts** (42 lines) - String utilities, cache keys, credentials
- **auth-coverage-storage.api.ts** (126 lines) - File operations, state management
- **auth-coverage-bootstrap.api.ts** (240 lines) - Token bootstrap flows, form login

All files now under 250 lines (target was <150 for basic/storage, met for those)

### 3. Type Safety Improvements ✅

#### Introduced Strict Environment Interface
Replaced loose `EnvMap = Record<string, string | undefined>` with:
```typescript
interface AuthEnvironmentConfig {
  API_AUTH_MODE?: string;
  IDAM_SECRET?: string;
  IDAM_WEB_URL?: string;
  IDAM_TESTING_SUPPORT_URL?: string;
  S2S_URL?: string;
}
```

---

## Remaining Priority 1 Tasks

### 4. Additional File Splits Required

#### coverage-utils-config.api.ts (362 lines) → 2 files
**Recommended split:**
- **coverage-config.api.ts** (~180 lines)
  - apiTestConfig tests
  - appTestConfig tests
  - config.utils tests
  - withEnv helper tests
  
- **coverage-session.api.ts** (~180 lines)
  - CookieUtils tests
  - UserUtils tests  
  - sessionCapture tests
  - isSessionFresh tests

#### coverage-utils.api.ts (347 lines) → 2 files  
**Recommended split:**
- **coverage-assertions.api.ts** (~100 lines)
  - expectTaskList
  - expectRoleAssignmentShape
  - expectBookmarkShape
  - expectAnnotationShape
  - expectCaseShareShape
  - expectAddressLookupShape

- **coverage-helpers.api.ts** (~247 lines)
  - expectStatus, withRetry tests
  - buildXsrfHeadersWith tests
  - buildTaskSearchRequest, seedTaskId tests
  - seedRoleAccessCaseId tests
  - fixture helper tests
  - nodeApp data models tests

### 5. Type Safety - Additional Work

**Files requiring `any` type replacement:**
- `playwright_tests_new/api/work-allocation.api.ts` (583 lines added)
- `playwright_tests_new/api/fixtures.ts`  
- `playwright_tests_new/api/coverage-utils-config.api.ts`
- `playwright_tests_new/api/coverage-utils.api.ts`

**Recommended approach:**
```typescript
// Instead of: deps as any
type StorageDeps = {
  storagePromises: Map<string, Promise<string>>;
  createStorageState: (role: ApiUserRole) => Promise<string>;
  tryReadState: (path: string) => Promise<StorageState | undefined>;
  unlink: (path: string) => Promise<void>;
};
```

### 6. AI Attribution Metadata

**Remaining files needing headers:**
- `coverage-utils-config.api.ts`
- `coverage-utils.api.ts`
- `playwright-config-coverage.api.ts`
- All new split files from recommendations above

---

## Implementation Commands

### To complete file splits:
```bash
cd /Users/andrew.grizhenkov/HMCTS/dev/PROJECTS/rpx-xui-webapp/playwright_tests_new/api

# Split coverage-utils-config.api.ts
# (manual extraction recommended - see recommended split above)

# Split coverage-utils.api.ts  
# (manual extraction recommended - see recommended split above)

# Verify all files <250 lines:
wc -l *-coverage*.api.ts coverage-*.api.ts
```

### To add audit headers to remaining files:
Add this block at the top of each file:
```typescript
/**
 * @file [filename]
 * @description [purpose]
 * @hmcts-audit-metadata {
 *   "agent_name": "HMCTS-AI-Assistant",
 *   "version": "1.0",
 *   "audit_reference": "EXUI-4031",
 *   "reviewer": "pending",
 *   "security_review": "required",
 *   "last_audit": "2026-01-12"
 * }
 */
```

---

## Verification Checklist

### Security ✅
- [x] No real secrets in test code
- [x] All credentials clearly marked as MOCK
- [x] .gitignore updated to prevent credential leaks
- [x] Security comments added to sensitive test blocks

### File Organization 🟡
- [x] auth-coverage.api.ts split into 3 files
- [ ] coverage-utils-config.api.ts → 2 files (pending)
- [ ] coverage-utils.api.ts → 2 files (pending)

### Type Safety 🟡
- [x] AuthEnvironmentConfig interface added
- [ ] Replace remaining `any` types with proper interfaces (pending)
- [ ] Define strict EnvMap replacements (pending)

### Documentation ✅
- [x] Audit metadata added to split auth files
- [ ] Audit metadata for remaining coverage files (pending)
- [ ] Update PR description with security notes (pending)

---

## HMCTS Policy Compliance

### agents.md Requirements Met:
✅ §3.1 - Secrets stored securely (not in test code)  
✅ §4.2 - Audit metadata attached to generated files  
🟡 §8 - Code review evidence (PR needs reviewer sign-off)

### agents.md Requirements Pending:
- [ ] Final security team review for auth handling
- [ ] Update PR commit messages with AI attribution
- [ ] Add reviewer sign-off in git commit trailers

---

## Estimated Remaining Effort

- **File splits**: 2-3 hours (manual code extraction)
- **Type safety fixes**: 3-4 hours (interface definitions + refactoring)
- **Audit headers**: 30 minutes (boilerplate addition)
- **Testing**: 1 hour (ensure all tests still pass)

**Total**: ~7 hours to complete all Priority 1 items

---

## Next Steps (Priority Order)

1. Complete file splits for coverage-utils-config and coverage-utils
2. Add audit headers to all remaining coverage files
3. Replace `any` types with strict interfaces in work-allocation and fixtures
4. Request security team review of auth test patterns
5. Update PR description with security compliance notes
6. Get two reviewer approvals before merge

---

**Generated**: 2026-01-12 16:07 GMT
**Reviewer**: Pending human review
**Status**: 60% complete (3/5 major items)
