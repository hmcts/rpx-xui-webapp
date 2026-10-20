# 2026 EXUI SRT automation coverage matrix

Owner: EXUI-4875. Inspected test-source revision: `ec61f66a028ef76dc26a1bf21bfc01cf9da7da32` (20 October 2026). This is a traceability inventory, not a test-result report or a claim that the SRT passed.

## How to read this matrix

- `Existing assertion` identifies a static source assertion at this revision. It proves what the test *would check if run*, not that it passed or that a live service worked. Integration tests use mocked routes unless stated otherwise.
- `Missing / unverified assertion` is a decision for the owning story. `Unverified` means the underlying SRT acceptance row or an exact-head run is unavailable here; it must not be converted into a new test or a Done status on this matrix alone.
- Commands are repo-root commands selecting the named file. They require project dependencies and, for browser runs, the documented local service/session prerequisites. Run with `--list` appended for discovery; remove it for execution. File selection and a green run are separate evidence.
- `No automation in EXUI-4875` gives the reason this matrix branch adds no domain spec. It does not waive the named owner's acceptance criteria.

Source basis: the local `exui-srt-coverage/active/2026-10-20-srt-gap-analysis/{FINDINGS,DECISIONS,TRACEABILITY,DESIGN,IMPLEMENTATION_PLAN}.md` bundle. That bundle links the [2026 SRT index](https://hmcts.atlassian.net/wiki/spaces/EXUI/pages/276988246/2026), [September brief](https://hmcts.atlassian.net/wiki/spaces/EXUI/pages/319882306/2026) and [October brief](https://hmcts.atlassian.net/wiki/spaces/EXUI/pages/343278093/2026). The linked pages and individual acceptance rows were not reopened in this branch. Tracker status below is the bundle's inspection snapshot, not a live Jira status.

## SRT source index

| SRT period | SRT tracker | Locally available attribution | Source verification needed |
| --- | --- | --- | --- |
| 20–22 Jan | EXUI-4046 | Query Management theme assigned to EXUI-4876. | Reconcile every brief row with query scenarios and run evidence. |
| 17–19 Feb | EXUI-4155 | Earlier-SRT automation cohort EXUI-4875–4882. | Exact row-to-owner and test mapping unavailable. |
| 3–5 Mar | EXUI-4229 | Earlier-SRT cohort. | Exact row-to-owner and test mapping unavailable. |
| 14–16 Apr | EXUI-4478 | Earlier-SRT cohort. | Exact row-to-owner and test mapping unavailable. |
| 12–14 May | EXUI-4563 | Earlier-SRT cohort. | Exact row-to-owner and test mapping unavailable. |
| 10–12 Jun | EXUI-4700 | Earlier-SRT cohort. | Confirm tracker identity against similarly titled EXUI-4753 before closure; row mapping unavailable. |
| 23–25 Jun | EXUI-4784 | Earlier-SRT cohort. | Exact row-to-owner and test mapping unavailable. |
| 28–30 Jul | EXUI-5016 | Earlier-SRT cohort. | Exact row-to-owner and test mapping unavailable. |
| 29 Sep–1 Oct | EXUI-5255 | SRT tracker reported Done in source bundle; GOV.UK/accessibility reviews Done; visual baseline moved to EXUI-5433. | Tracker completion does not establish repeatable screenshot coverage or current CI proof. |
| 20–23 Oct | EXUI-5361 | SRT in progress in source bundle; visual and Hearings stale-state questions moved to EXUI-5433/5434. | No pass or closure inferred while the brief is in progress. |

The theme rows below are *candidate mappings from the approved design*, not a reconstructed set of SRT acceptance rows. For Feb–Jul, the specific SRT tracker for each theme is **unverified** until the source brief rows are reconciled. This is the chief outstanding EXUI-4875 acceptance task.

## Candidate test-to-SRT rows

### QM-1 — Query creation and response

- SRT ticket / period: EXUI-4046 (Jan); other Jan–Jul attribution unverified.
- Owning Jira / layer: EXUI-4876; mocked UI integration.
- Existing spec and helper: [`integration/test/queryManagement/queryManagement.positive.spec.ts`](integration/test/queryManagement/queryManagement.positive.spec.ts#L26); [`integration/helpers/queryManagementMockRoutes.helper.ts`](integration/helpers/queryManagementMockRoutes.helper.ts).
- Exact existing assertion: query event `submittedEvents` has one item and the message has the entered subject/body (`positive.spec.ts:72,86–93`); response event checks `responseMessage` (`positive.spec.ts:180`) and task completion (`positive.spec.ts:189`).
- Missing / unverified assertion: the design asks for outgoing communication, unique responses and close-query payload. These exact acceptance rows are not demonstrated by the cited assertions; determine whether they are elsewhere before adding a test.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/queryManagement/queryManagement.positive.spec.ts`.
- No automation in EXUI-4875: domain assertions belong to EXUI-4876; this row records existing proof and the decision still needed.

### WA-1 — Work Allocation filters and role context

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4877; mocked UI integration.
- Existing spec; adjacent support helper (not imported by this spec): [`integration/test/manageTasks/workFilters.positive.spec.ts`](integration/test/manageTasks/workFilters.positive.spec.ts#L111); [`integration/helpers/workAllocationAccessScenarios.helper.ts`](integration/helpers/workAllocationAccessScenarios.helper.ts).
- Exact existing assertion: selected service/work-type values appear in `searchRequest.search_parameters` (`workFilters.positive.spec.ts:206`), with the expected filtered case/task row (`:218–221`).
- Missing / unverified assertion: the design names role guard, menu, fragment and short-search behaviour. The cited filter test does not prove those four contracts; compare with search/menu, judicial-task and API tests before deciding what is missing.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/manageTasks/workFilters.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4877 owns any verified behaviour gap.

### WA-2 — Search menu route (adjacent evidence)

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4877; mocked UI integration.
- Existing spec: [`integration/test/searchCase/globalSearchMenu.positive.spec.ts`](integration/test/searchCase/globalSearchMenu.positive.spec.ts#L53).
- Exact existing assertion: the View link targets `/cases/case-details/PUBLICLAW/PRLAPPS/` (`globalSearchMenu.positive.spec.ts:74`); nonexistent 16-digit reference leads to no-results route and heading (`:84–86`).
- Missing / unverified assertion: no claim here for role-restricted menu visibility, fragment preservation or short input; reconcile the ticket's exact search rule first.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/searchCase/globalSearchMenu.positive.spec.ts`.
- No automation in EXUI-4875: this existing adjacent assertion avoids duplicating a generic search path.

### CCD-1 — Event CYA and submitted data

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4878; mocked UI integration.
- Existing spec and helper: [`integration/test/eventBehaviour/eventBehaviour.positive.spec.ts`](integration/test/eventBehaviour/eventBehaviour.positive.spec.ts#L11); [`integration/helpers/eventBehaviourMockRoutes.helper.ts`](integration/helpers/eventBehaviourMockRoutes.helper.ts).
- Exact existing assertion: CYA rows contain Outcome type, Decision reference and Internal note (`eventBehaviour.positive.spec.ts:37–41`); the POST payload equals the expected event token/data object (`:63–72`), and refreshed state/history are checked (`:80–98`).
- Missing / unverified assertion: the approved design also names collection-row removal, dynamic-list choice and retained-hidden-value payload; this one spec does not prove those variants. Check the adjacent dynamic-field and collection specs against the exact ticket rows.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/eventBehaviour/eventBehaviour.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4878 owns only genuinely absent data contracts.

### CCD-2 — Conditional hidden-value retention (adjacent evidence)

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4878; mocked UI integration.
- Existing spec: [`integration/test/createCase/dynamicFieldConfig.positive.spec.ts`](integration/test/createCase/dynamicFieldConfig.positive.spec.ts#L32).
- Exact existing assertion: the configured CYA and request data are matched (`dynamicFieldConfig.positive.spec.ts:45,55`) after hidden-with/without-retention fields change visibility (`:23–29`).
- Missing / unverified assertion: determine whether EXUI-4878 requires a different event type or collection-row payload; do not equate create-case configuration with all CCD events.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/createCase/dynamicFieldConfig.positive.spec.ts`.
- No automation in EXUI-4875: reference existing coverage before EXUI-4878 adds a variant.

### H-1 — Hearings active context

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4879; mocked UI integration.
- Existing spec: [`integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`](integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts#L28).
- Exact existing assertion: non-default jurisdiction reaches service-values request (`:60–61`), selected location reaches lookup (`:75`), and update payload matches expected case context (`:76`).
- Missing / unverified assertion: design asks for complete flags and invalid-linked-state failure. This scenario is not a one-session Case A-to-B delayed-response proof (EXUI-5434); those are separate acceptance decisions.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4879 owns context/flags gaps; EXUI-5434 owns a conditional stale-state journey.

### DT-1 — Booking date display and entry

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4880; mocked UI integration.
- Existing spec: [`integration/test/bookingUI/booking-ui.positive.spec.ts`](integration/test/bookingUI/booking-ui.positive.spec.ts#L36).
- Exact existing assertion: the booking CYA duration row equals the selected dates (`booking-ui.positive.spec.ts:96–97`), and submitted booking response matches request begin/end times (`:118–119`).
- Missing / unverified assertion: this does not establish locale/timezone rendering, initial keyboard focus or skip-link behaviour. Exact EXUI-4880 row and EXUI-5223 toolkit ownership require confirmation.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/bookingUI/booking-ui.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4880 owns browser-visible gaps; toolkit product contracts remain with their owner.

### SEC-1 — CORS and session boundaries

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4881; API and support unit.
- Existing specs: [`api/cors-and-role-access.api.ts`](api/cors-and-role-access.api.ts#L16); [`api/unit/session-storage-state.unit.api.ts`](api/unit/session-storage-state.unit.api.ts#L28).
- Exact existing assertion: OPTIONS status and `assertCorsHeaders` are invoked for allowed/disallowed origins (`cors-and-role-access.api.ts:25–32`); stored sessions require a matching fingerprint/auth cookie (`session-storage-state.unit.api.ts:41–61`).
- Missing / unverified assertion: the CORS helper unit case explicitly accepts `204` with *no* `Access-Control-Allow-Origin` header (`cors-and-role-access.api.ts:72`); the approved design requires falsification before claiming allowed-origin protection. CSP/cookie acceptance rows and environment allowlist also need verification.
- Command: `npx playwright test --project=node-api playwright_tests_new/api/cors-and-role-access.api.ts playwright_tests_new/api/unit/session-storage-state.unit.api.ts`.
- No automation in EXUI-4875: EXUI-4881 owns any security test correction; the current assertion is recorded as insufficient, not passed security proof.

### GA-1 — Multiple role categories and case access

- SRT ticket / period: Feb–Jul cohort; EXUI-4758 is product/SRT context in the supplied ticket wording, exact brief row unverified.
- Owning Jira / layer: EXUI-4882; mocked UI integration in webapp.
- Existing specs: [`integration/test/caseDetails/rolesAndAccess.positive.spec.ts`](integration/test/caseDetails/rolesAndAccess.positive.spec.ts#L49); [`integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts`](integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts#L58).
- Exact existing assertion: Judicial and Legal Ops reallocate URLs carry their respective `roleCategory` (`rolesAndAccess.positive.spec.ts:166,182`); restricted view lists the expected users (`restrictedCaseAccess.positive.spec.ts:119–120`).
- Missing / unverified assertion: the two assertions do not establish every menu combination, OGD/group access or a multi-category user's effective access. Reconcile the supplied EXUI-4882 rows before extending tests.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts playwright_tests_new/integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4882 is the webapp domain owner; Manage Organisations group-access routing is adjacent evidence only.

### GA-2 — Specific request and share-case journey (adjacent evidence)

- SRT ticket / period: Feb–Jul cohort; specific tracker unverified.
- Owning Jira / layer: EXUI-4882; mocked UI integration.
- Existing specs: [`integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts`](integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts#L62); [`integration/test/shareCase/caseListSelection.positive.spec.ts`](integration/test/shareCase/caseListSelection.positive.spec.ts#L26).
- Exact existing assertion: approved specific-access request payload contains the requested role and dates (`reviewSpecificAccessRequest.positive.spec.ts:94–96`); selected case IDs reach the share-case route (`caseListSelection.positive.spec.ts:73,76`).
- Missing / unverified assertion: these are separate scenarios, not a proved group-access end-to-end transition or OGD access outcome.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts playwright_tests_new/integration/test/shareCase/caseListSelection.positive.spec.ts`.
- No automation in EXUI-4875: avoid reproducing existing positive journeys to satisfy a matrix row.

### VIS-1 — Repeatable visual baseline

- SRT ticket / period: EXUI-5255 (Sep), EXUI-5361 (Oct); source attribution per local bundle.
- Owning Jira / layer: EXUI-5433; proposed fixed-state browser visual proof across three apps.
- Existing spec/helper: none identified for repeatable `toHaveScreenshot` baselines in webapp integration/E2E test paths. [`E2E/test/accessibility/webapp.a11y.spec.ts`](E2E/test/accessibility/webapp.a11y.spec.ts#L112) takes a Lighthouse screenshot, which is not a comparison assertion.
- Exact existing assertion: none for a visual baseline.
- Missing / unverified assertion: fixed form/table/navigation/date-picker screenshot comparison, baseline provenance and human classification; verify each application independently. Absence is based on a bounded local `rg`, not a claim that no undocumented image exists.
- Command: `rg -n 'toHaveScreenshot|screenshot\(' playwright_tests_new/integration/test playwright_tests_new/E2E/test` (static inventory; executable visual command pending EXUI-5433 implementation).
- No automation in EXUI-4875: visual fixtures/approvals and app-specific baselines belong to EXUI-5433; no release gate is authorised.

### HS-1 — Case A-to-B stale response

- SRT ticket / period: EXUI-5361 (Oct); source attribution per local bundle.
- Owning Jira / layer: EXUI-5434, conditional mocked UI integration after EXUI-5209/4879 audit.
- Existing spec: [`integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`](integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts#L28).
- Exact existing assertion: non-default case service/location request and update payload are asserted (`:60–76`).
- Missing / unverified assertion: one-session A-to-B late/failing response must keep visible case B identity and B submission payload. This is absent from the cited single-context scenario; exact-head EXUI-5209 and other tests still need audit.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts` (existing adjacent proof only; A-to-B command pending if a test is warranted).
- No automation in EXUI-4875: EXUI-5434 is conditional on that audit, and product defects remain with EXUI-5209.

## Closure checks for EXUI-4875

1. Replace every `specific tracker unverified` statement only after reading the underlying dated SRT brief row and recording its exact row identifier/text, owner, assertion and command. Do not infer attribution from theme or tracker title.
2. Confirm the June EXUI-4700 versus EXUI-4753 tracker identity; retain both identifiers in review notes until resolved.
3. For each claimed covered row, run the selected scenario on a pinned revision and record command, project, result, report path and environment. Keep mocked, live API, E2E and exact-head CI evidence separate.
4. If a row is not worth automating, replace the provisional owner decision with a brief row-specific no-automation rationale and the manual evidence owner. A missing source row is not itself a no-automation decision.
