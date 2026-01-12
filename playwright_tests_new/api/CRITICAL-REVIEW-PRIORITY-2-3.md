# Critical Review: Priority 2 & 3 Improvements - EXUI-4031

**Date:** 2026-01-12  
**Reviewer:** HMCTS AI Assistant  
**PR:** https://github.com/hmcts/rpx-xui-webapp/pull/4862  
**Status:** Priority 1 Complete ✅ | Priority 2 & 3 Pending

---

## 📋 Executive Summary

Priority 1 security and maintainability issues have been successfully addressed. This review identifies **Priority 2** (recommended) and **Priority 3** (optional) improvements to enhance code quality, observability, error handling, and long-term maintainability.

**Estimated Total Effort:** 8-12 hours

---

## 🔴 Priority 2: Recommended Improvements (6-8 hours)

### 1. **Replace console.log with Structured Logging** ⚠️ HIGH IMPACT
**Location:** `common/sessionCapture.ts` (12 instances)  
**Issue:** Direct console calls bypass structured logging and audit trails

**Current:**
```typescript
console.log(`GlobalSetup: Logging in as ${id} (${email}) to ${targetUrl}`);
console.warn(`SessionUtils: storage file missing for ${userIdentifier}: ${storageFile}`);
```

**Recommended:**
```typescript
const logger = createLogger({ serviceName: 'session-capture', format: 'pretty' });
logger.info('Logging in to EXUI', { userId: id, email, targetUrl, operation: 'session-capture' });
logger.warn('Storage file missing', { userIdentifier, storageFile, operation: 'load-session' });
```

**Benefits:**
- Enables centralized log aggregation (Azure Monitor / Sentinel)
- Provides structured data for debugging and auditing
- Meets HMCTS agents.md §4.2 traceability requirements
- Allows log level filtering in production

**Estimated Time:** 2 hours

---

### 2. **Add Error Context and Custom Error Types** ⚠️ MEDIUM IMPACT
**Location:** `auth.ts`, `fixtures.ts`, various test files  
**Issue:** Generic errors lack context for debugging production issues

**Current:**
```typescript
throw new Error(`Unable to read storage state for role "${role}".`);
throw new Error(`Failed to login as ${role}: ${(error as Error).message}`);
```

**Recommended:**
```typescript
class AuthenticationError extends Error {
  constructor(
    message: string,
    public readonly role: ApiUserRole,
    public readonly cause?: Error,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

throw new AuthenticationError(
  'Unable to read storage state',
  role,
  originalError,
  { storagePath, attemptNumber: 1 }
);
```

**Benefits:**
- Enables error-specific handling and recovery strategies
- Provides rich context for troubleshooting in CI/CD pipelines
- Facilitates automated alerting based on error types
- Improves stack trace clarity

**Error Types to Add:**
- `AuthenticationError` - IDAM/S2S token failures
- `StorageStateCorruptedError` - Session file corruption
- `ApiRetryExhaustedError` - Retry limit exceeded
- `ConfigurationError` - Missing env vars or config

**Estimated Time:** 2-3 hours

---

### 3. **Improve Test Naming and Documentation** ⚠️ MEDIUM IMPACT
**Location:** All `*.api.ts` test files  
**Issue:** Test names don't clearly communicate intent or prerequisites

**Current:**
```typescript
test('lists available locations', async ({ apiClient }) => {
  const response = await apiClient.get<Array<{ id: string; locationName: string }>>(
    `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
    { throwOnError: false }
  );
```

**Recommended:**
```typescript
test('GET /workallocation/location returns locations for authenticated users with valid service codes', async ({ apiClient }) => {
  // Given: A solicitor user authenticated with valid session
  const serviceCodes = ['IA', 'CIVIL', 'PRIVATELAW'];
  
  // When: Requesting locations for configured service codes
  const response = await apiClient.get<LocationItem[]>(
    `workallocation/location?serviceCodes=${encodeURIComponent(serviceCodes.join(','))}`,
    { throwOnError: false }
  );
  
  // Then: API returns 200 OK with structured location array
  expectStatus(response.status, StatusSets.guardedBasic);
  expect(response.data).toBeDefined();
  
  // And: Each location contains required fields
  if (response.status === 200 && response.data.length > 0) {
    expect(response.data[0]).toMatchObject({
      id: expect.any(String),
      locationName: expect.any(String)
    });
  }
});
```

**Benefits:**
- Self-documenting test intent (Given-When-Then pattern)
- Easier to identify failing tests in CI reports
- Clear prerequisites and expected outcomes
- Facilitates test maintenance by other developers

**Estimated Time:** 2-3 hours (refactor 20-30 key tests)

---

### 4. **Add API Response Time Monitoring** ⚠️ MEDIUM IMPACT
**Location:** `fixtures.ts`, `apiTestUtils.ts`  
**Issue:** No visibility into API performance degradation

**Recommended:**
```typescript
// In fixtures.ts - enhance PlaywrightApiClient instantiation
return new PlaywrightApiClient({
  baseUrl,
  name: `node-api-${role}`,
  logger,
  captureRawBodies: process.env.PLAYWRIGHT_DEBUG_API === '1',
  onResponse: (entry) => {
    entries.push(entry);
    
    // Track slow API calls
    const duration = entry.duration;
    if (duration > 5000) {
      logger.warn('Slow API response detected', {
        endpoint: entry.url,
        method: entry.method,
        duration,
        status: entry.status,
        threshold: 5000
      });
    }
    
    // Emit performance metrics
    if (process.env.EMIT_METRICS === '1') {
      emitMetric('api.response.time', duration, {
        endpoint: entry.url,
        method: entry.method,
        status: entry.status
      });
    }
  }
});
```

**Benefits:**
- Early detection of performance regressions
- Data for SLA monitoring and capacity planning
- Identifies bottlenecks in microservice dependencies
- Supports Azure Monitor / Application Insights integration

**Estimated Time:** 1-2 hours

---

## 🟡 Priority 3: Optional Enhancements (2-4 hours)

### 5. **Add Retry Budget and Circuit Breaker Pattern** 💡 NICE TO HAVE
**Location:** `utils/apiTestUtils.ts`  
**Issue:** Unlimited retries can mask systemic issues or cause cascading failures

**Current:**
```typescript
export async function withRetry<T extends { status: number }>(
  fn: () => Promise<T>,
  opts: { retries?: number; retryStatuses?: number[] } = {}
): Promise<T> {
  const retries = opts.retries ?? 1;
  // ... basic retry loop
}
```

**Recommended:**
```typescript
class RetryBudget {
  private failureCount = 0;
  private readonly windowMs = 60000; // 1 minute
  private windowStart = Date.now();
  
  canRetry(maxFailures = 10): boolean {
    if (Date.now() - this.windowStart > this.windowMs) {
      this.failureCount = 0;
      this.windowStart = Date.now();
    }
    return this.failureCount < maxFailures;
  }
  
  recordFailure() {
    this.failureCount++;
  }
}

const globalRetryBudget = new RetryBudget();

export async function withRetry<T extends { status: number }>(
  fn: () => Promise<T>,
  opts: { 
    retries?: number; 
    retryStatuses?: number[];
    respectBudget?: boolean;
  } = {}
): Promise<T> {
  // Check retry budget before attempting
  if (opts.respectBudget && !globalRetryBudget.canRetry()) {
    throw new ApiRetryExhaustedError('Retry budget exhausted - possible systemic issue');
  }
  
  // ... existing retry logic with budget tracking
}
```

**Benefits:**
- Prevents retry storms during outages
- Provides early warning of systemic failures
- Reduces unnecessary load on failing services
- Improves test suite stability

**Estimated Time:** 2 hours

---

### 6. **Create API Contract Tests** 💡 NICE TO HAVE
**Location:** New file `playwright_tests_new/api/contracts/`  
**Issue:** No explicit validation of API contract changes

**Recommended:**
```typescript
// contracts/work-allocation-contracts.api.ts
test.describe('Work Allocation API Contracts', () => {
  test('GET /workallocation/location response schema is stable', async ({ apiClient }) => {
    const response = await apiClient.get('workallocation/location?serviceCodes=IA');
    
    expect(response.status).toBe(200);
    expect(response.data).toMatchSchema({
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'locationName'],
        properties: {
          id: { type: 'string', minLength: 1 },
          locationName: { type: 'string', minLength: 1 },
          regionId: { type: 'string' },
          regionName: { type: 'string' }
        },
        additionalProperties: false // Detect unexpected fields
      }
    });
  });
  
  test('POST /workallocation/task request schema validation', async ({ apiClient }) => {
    const invalidRequest = { invalid: 'field' };
    
    const response = await apiClient.post('workallocation/task', {
      data: invalidRequest,
      throwOnError: false
    });
    
    expect(response.status).toBe(400);
    expect(response.data).toMatchObject({
      message: expect.stringContaining('validation'),
      errors: expect.arrayContaining([
        expect.objectContaining({
          field: expect.any(String),
          message: expect.any(String)
        })
      ])
    });
  });
});
```

**Benefits:**
- Detects breaking API changes before production
- Documents expected API behavior
- Prevents regression of error responses
- Supports API versioning strategy

**Estimated Time:** 2-3 hours (10-15 key contracts)

---

### 7. **Add Test Data Builders and Factories** 💡 NICE TO HAVE
**Location:** New file `playwright_tests_new/api/test-data/builders.ts`  
**Issue:** Repetitive test data creation scattered across files

**Recommended:**
```typescript
// test-data/builders.ts
export class TaskSearchRequestBuilder {
  private view: 'AllWork' | 'MyTasks' = 'AllWork';
  private userIds: string[] = [];
  private locations: string[] = [];
  private states: string[] = [];
  private pageSize = 25;
  
  withView(view: 'AllWork' | 'MyTasks'): this {
    this.view = view;
    return this;
  }
  
  withUsers(...userIds: string[]): this {
    this.userIds = userIds;
    return this;
  }
  
  withLocations(...locations: string[]): this {
    this.locations = locations;
    return this;
  }
  
  assignedOnly(): this {
    this.states = ['assigned'];
    return this;
  }
  
  build() {
    return buildTaskSearchRequest(this.view, {
      userIds: this.userIds.length ? this.userIds : undefined,
      locations: this.locations.length ? this.locations : undefined,
      states: this.states.length ? this.states : undefined,
      pageSize: this.pageSize
    });
  }
}

// Usage in tests
test('MyTasks returns assigned tasks for user', async ({ apiClient }) => {
  const request = new TaskSearchRequestBuilder()
    .withView('MyTasks')
    .withUsers(userId!)
    .assignedOnly()
    .build();
    
  const response = await apiClient.post('workallocation/task', { data: request });
  expect(response.status).toBe(200);
});
```

**Benefits:**
- Reduces code duplication across test files
- Provides fluent, readable test data creation
- Centralizes valid/invalid data patterns
- Simplifies test refactoring when APIs change

**Estimated Time:** 1-2 hours

---

## 📊 Impact Assessment

| Priority | Items | Estimated Hours | Risk Mitigation | Observability | Maintainability |
|----------|-------|-----------------|-----------------|---------------|-----------------|
| **2**    | 4     | 6-8             | ⭐⭐⭐           | ⭐⭐⭐⭐        | ⭐⭐⭐⭐          |
| **3**    | 3     | 2-4             | ⭐⭐             | ⭐⭐            | ⭐⭐⭐            |

---

## 🎯 Recommended Implementation Order

1. **Session Capture Logging** (P2.1) - Immediate observability improvement
2. **Custom Error Types** (P2.2) - Foundation for better error handling
3. **API Response Monitoring** (P2.4) - Quick win for performance visibility
4. **Test Naming** (P2.3) - Improves daily developer experience
5. **Retry Budget** (P3.5) - If retry-related flakiness observed
6. **Contract Tests** (P3.6) - If API changes are frequent
7. **Test Builders** (P3.7) - When test duplication becomes painful

---

## 🔍 Additional Observations

### ✅ **Strengths**
- Comprehensive API endpoint coverage (work allocation, CCD, evidence manager, role access)
- Proper fixture isolation and parallel execution support
- Good use of retry logic for transient failures
- Environment-aware configuration (AAT, Demo, Prod guards)

### ⚠️ **Risks**
- **No explicit timeout management:** Tests may hang indefinitely on slow APIs
- **Shared mutable state:** `cachedLocationId`, `userId` in beforeAll hooks could cause race conditions
- **Hard-coded service codes:** `['IA', 'CIVIL', 'PRIVATELAW']` should come from config
- **No test data cleanup:** Created tasks/cases/roles may persist across runs

### 💡 **Quick Wins**
- Add `timeout: 30000` to slow API test cases
- Extract magic strings to constants file
- Add `test.describe.configure({ mode: 'serial' })` to stateful test groups
- Document environment variables in README

---

## 📝 Acceptance Criteria for Priority 2 Completion

- [ ] Zero `console.log`/`console.warn` calls in production code paths
- [ ] All auth/storage errors use custom error types with context
- [ ] 20+ critical tests follow Given-When-Then naming pattern
- [ ] API response time warnings logged for calls >5s
- [ ] Code review confirms no new `console.*` calls introduced

---

## 📚 References

- [HMCTS agents.md](./agents.md) §4.2 Traceability & §6 Best Practices
- [Playwright Best Practices - Logging](https://playwright.dev/docs/test-configuration#global-configuration)
- [Microsoft Azure Monitor - Custom Metrics](https://docs.microsoft.com/en-us/azure/azure-monitor/essentials/metrics-custom-overview)
- [Circuit Breaker Pattern](https://martinfowler.com/bliki/CircuitBreaker.html)
- [JSON Schema Validation](https://json-schema.org/)

---

**Next Steps:** Prioritize P2 items for next sprint. P3 items can be tackled opportunistically during related work.
