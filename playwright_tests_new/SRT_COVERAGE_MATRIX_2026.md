# 2026 EXUI SRT automation coverage matrix

Owner: EXUI-4875. Inspected test-source revision: `ec61f66a028ef76dc26a1bf21bfc01cf9da7da32` (20 October 2026). This is a traceability inventory, not a test-result report or a claim that the SRT passed.

## How to read this matrix

- `Existing assertion` identifies a static source assertion at this revision. It proves what the test _would check if run_, not that it passed or that a live service worked. Integration tests use mocked routes unless stated otherwise.
- `Missing / unverified assertion` is a decision for the owning story. `Unverified` means the underlying SRT acceptance row or an exact-head run is unavailable here; it must not be converted into a new test or a Done status on this matrix alone.
- Commands are repo-root commands selecting the named file. They require project dependencies and, for browser runs, the documented local service/session prerequisites. Run with `--list` appended for discovery; remove it for execution. File selection and a green run are separate evidence.
- `No automation in EXUI-4875` gives the reason this matrix branch adds no domain spec. It does not waive the named owner's acceptance criteria.

Source basis: the [2026 SRT index](https://hmcts.atlassian.net/wiki/spaces/EXUI/pages/276988246/2026), the ten signed-in dated Confluence briefs, and the workspace `exui-srt-coverage/active/2026-10-20-srt-gap-analysis/SRT_SOURCE_ROWS.md` source-row audit (20 October 2026). Brief inclusion is not test execution, product acceptance, or a live Jira status.

## SRT source index

| SRT period   | SRT tracker | Locally available attribution                                                                                                          | Source verification needed                                                                                                                                                                                         |
| ------------ | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 20–22 Jan    | EXUI-4046   | EXUI-3695/3696/3697/3698 Query Management → EXUI-4876.                                                                                 | Feature tech-released OFF; mocked tests cannot prove live FPL/Civil no-regression.                                                                                                                                 |
| 17–19 Feb    | EXUI-4155   | EXUI-2918/3663/3680 → EXUI-4877; EXUI-4069/4080 → XR-1 external manual evidence owners.                                                | EXUI-3995 removed. XR-1 is an owner decision, not a passed regression.                                                                                                                                             |
| 3–5 Mar      | EXUI-4229   | EXUI-3995 → EXUI-4878; EXUI-4123 → EXUI-4881.                                                                                          | Hearing logging 3664/3666 is adjacent regression, not route-context proof.                                                                                                                                         |
| 14–16 Apr    | EXUI-4478   | EXUI-4494 Group Access/OGD → EXUI-4882 context and EXUI-5438 MO follow-up.                                                             | EXUI-4494 names the combined Cases tab and new user flows; legacy Assigned/Unassigned tabs should not be used. The EXUI-5438 MO branch has local mocked UI evidence, not live group entitlement or SRT acceptance. |
| 12–14 May    | EXUI-4563   | EXUI-2241/2242 → EXUI-4877; EXUI-2645 caseworker lookup is work-allocation adjacency; 4190/4191 → EXUI-4881.                           | EXUI-3241 shown Withdrawn; EXUI-4011 removed. The cited filter assertion does not prove the EXUI-2645 lookup.                                                                                                      |
| 10–12 Jun    | EXUI-4700   | EXUI-4529 active-route hearing case ID → EXUI-4879/5434.                                                                               | The brief links EXUI-4700; rare live fault was not directly reproducible.                                                                                                                                          |
| 23–25 Jun    | EXUI-4784   | EXUI-3003/3005/3066 system-generated local timestamps → EXUI-4880.                                                                     | User-entered dates must remain unchanged; bugs were detected before release.                                                                                                                                       |
| 28–30 Jul    | EXUI-5016   | EXUI-2632/4212 → EXUI-4878; 2645 → EXUI-4877; 4189/4216 → EXUI-4881; 4758 → EXUI-4882; EXUI-2195/3046 → existing CL-1/FC-1 assertions. | EXUI-3003/3005/3066, 3740, 3839 removed. CL-1/FC-1 are static mappings, not executed results.                                                                                                                      |
| 29 Sep–1 Oct | EXUI-5255   | SRT tracker reported Done in source bundle; GOV.UK/accessibility reviews Done; visual baseline moved to EXUI-5433.                     | Tracker completion does not establish repeatable screenshot coverage or current CI proof.                                                                                                                          |
| 20–23 Oct    | EXUI-5361   | SRT in progress in source bundle; visual and Hearings stale-state questions moved to EXUI-5433/5434.                                   | No pass or closure inferred while the brief is in progress.                                                                                                                                                        |

The theme rows below are _candidate assertion mappings_, not run results. Source-row inclusion was checked against the dated briefs above; exact assertion and execution evidence still needs the owner shown. Included non-theme rows receive an explicit existing-test, external manual-owner, or open-gap decision below rather than being silently treated as covered.

## Candidate test-to-SRT rows

### QM-1 — Query creation and response

- SRT ticket / period: EXUI-3695/3696/3697/3698 in January (tracker EXUI-4046).
- Owning Jira / layer: EXUI-4876; mocked UI integration.
- Existing spec and helper: [`integration/test/queryManagement/queryManagement.positive.spec.ts`](integration/test/queryManagement/queryManagement.positive.spec.ts#L26); [`integration/helpers/queryManagementMockRoutes.helper.ts`](integration/helpers/queryManagementMockRoutes.helper.ts).
- Exact existing assertion: query event `submittedEvents` has one item and the message has the entered subject/body (`positive.spec.ts:72,86–93`); response event checks `responseMessage` (`positive.spec.ts:180`) and task completion (`positive.spec.ts:189`).
- Missing / unverified assertion: the design asks for outgoing communication, unique responses and close-query payload. These exact acceptance rows are not demonstrated by the cited assertions; determine whether they are elsewhere before adding a test.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/queryManagement/queryManagement.positive.spec.ts`.
- No automation in EXUI-4875: domain assertions belong to EXUI-4876; this row records existing proof and the decision still needed.

### WA-1 — Work Allocation filters and role context

- SRT ticket / period: EXUI-3663 (February), EXUI-2241/2242 and adjacent EXUI-2645 (May), EXUI-2645 (July).
- Owning Jira / layer: EXUI-4877; mocked UI integration.
- Existing spec; adjacent support helper (not imported by this spec): [`integration/test/manageTasks/workFilters.positive.spec.ts`](integration/test/manageTasks/workFilters.positive.spec.ts#L111); [`integration/helpers/workAllocationAccessScenarios.helper.ts`](integration/helpers/workAllocationAccessScenarios.helper.ts).
- Exact existing assertion: selected service/work-type values appear in `searchRequest.search_parameters` (`workFilters.positive.spec.ts:206`), with the expected filtered case/task row (`:218–221`).
- Missing / unverified assertion: the design names role guard, menu, fragment and short-search behaviour. The cited filter test does not prove those four contracts or the May/July EXUI-2645 caseworker lookup; compare with search/menu, judicial-task and API tests before deciding what is missing.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/manageTasks/workFilters.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4877 owns any verified behaviour gap.

### WA-2 — Search menu route (adjacent evidence)

- SRT ticket / period: EXUI-2918/3680 (February) and EXUI-2242 (May); this route assertion is adjacent evidence only.
- Owning Jira / layer: EXUI-4877; mocked UI integration.
- Existing spec: [`integration/test/searchCase/globalSearchMenu.positive.spec.ts`](integration/test/searchCase/globalSearchMenu.positive.spec.ts#L53).
- Exact existing assertion: the View link targets `/cases/case-details/PUBLICLAW/PRLAPPS/` (`globalSearchMenu.positive.spec.ts:74`); nonexistent 16-digit reference leads to no-results route and heading (`:84–86`).
- Missing / unverified assertion: no claim here for role-restricted menu visibility, fragment preservation or short input; reconcile the ticket's exact search rule first.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/searchCase/globalSearchMenu.positive.spec.ts`.
- No automation in EXUI-4875: this existing adjacent assertion avoids duplicating a generic search path.

### CL-1 — Case-list filter isolation across case types

- SRT ticket / period: EXUI-2195 in July (tracker EXUI-5016). [The source ticket](https://hmcts.atlassian.net/browse/EXUI-2195) describes a hidden Divorce filter persisting into a Probate search.
- Owning Jira / layer: EXUI-4875 existing-coverage decision; mocked UI integration. A newly discovered defect remains with EXUI-2195/product owner.
- Existing spec: [`integration/test/caseList/caseList.positive.spec.ts`](integration/test/caseList/caseList.positive.spec.ts#L325).
- Exact existing assertion: a Divorce-specific `case.TextField0` filter is sent for Divorce (`:364`), then after switching to Probate the request uses the Probate case type and omits `case.TextField0` (`:376–379`). The same spec also checks each selected state filter reaches the request and expected list (`:251–319`).
- Missing / unverified assertion: no live AAT execution or exact-head result is recorded here; the mocked request assertion does not prove service-side search results. The existing isolation test is the exact EXUI-facing regression contract, so no duplicate spec is proposed.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/caseList/caseList.positive.spec.ts --grep 'does not carry hidden dynamic filters'`.
- No automation in EXUI-4875: reuse the existing test; the owner records a pinned execution/result before claiming delivered coverage.

### FC-1 — Multiple Probate handoff reasons in Find Case

- SRT ticket / period: EXUI-3046 in July (tracker EXUI-5016). [The source ticket](https://hmcts.atlassian.net/browse/EXUI-3046) says only the first of several selected handoff reasons was sent to search.
- Owning Jira / layer: EXUI-4875 existing-coverage decision; mocked UI integration. A new product defect remains with EXUI-3046/product owner.
- Existing spec and page object: [`integration/test/searchCase/findCaseProbate.positive.spec.ts`](integration/test/searchCase/findCaseProbate.positive.spec.ts#L47); [`E2E/page-objects/pages/exui/findCase.po.ts`](E2E/page-objects/pages/exui/findCase.po.ts#L163).
- Exact existing assertion: the journey selects Double Probate, Horizon Scheme and Literary Estate (`findCase.po.ts:171–175`); the ensuing `/searchCases` query parameter `case.boHandoffReasonList.value.caseHandoffReason` is parsed and asserted to contain all three codes, not just the first (`:210–230`). The spec also checks that a result row renders (`findCaseProbate.positive.spec.ts:64–70`).
- Missing / unverified assertion: the mocked route does not establish live Probate search filtering or a real account result. The exact client request contract is already asserted, so no duplicate spec is proposed.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/searchCase/findCaseProbate.positive.spec.ts`.
- No automation in EXUI-4875: reuse this test and record a pinned execution/result; no new generic collection-search helper.

### XR-1 — Cross-repository February regressions

- SRT ticket / period: EXUI-4069 and EXUI-4080 in February (tracker EXUI-4155).
- Owning Jira / layer: [EXUI-4069](https://hmcts.atlassian.net/browse/EXUI-4069) / Media Viewer and [EXUI-4080](https://hmcts.atlassian.net/browse/EXUI-4080) / Hearings–List Assist integration; live manual acceptance. These are not claimed by a webapp-only mocked integration test.
- Existing spec/helper: no exact `playwright_tests_new` assertion found for concurrent slow document opening or the List Assist discrepancy-amendment journey at this revision. EXUI-5434 Case A-to-B is adjacent context only, not List Assist correction proof.
- Missing / unverified assertion: EXUI-4069 needs one delayed document and rapidly opened subsequent documents to remain viewable, rather than display a misleading unsupported-type message. EXUI-4080 needs a discrepant case name highlighted and amendable in List Assist; its Jira description explicitly asks QA regression.
- Command / evidence: no honest webapp mocked command proves the cross-repository viewer race or live List Assist correction. Record February AAT manual SRT results under the original tickets; if repeatable fixtures and ownership are agreed, propose media-viewer or Hearings integration automation separately rather than mislabel a generic EXUI run.
- No automation in EXUI-4875: this branch is a webapp traceability inventory. Manual evidence owners are EXUI-4069 assignee Shamrez Darwish and EXUI-4080 assignee Kasi Subramaniam (Jira as read 20 October 2026); their teams must confirm SRT evidence and later automation suitability. This is an ownership decision, not a passed regression.

### CCD-1 — Event CYA and submitted data

- SRT ticket / period: EXUI-3995 (March), EXUI-2632/4212 (July).
- Owning Jira / layer: EXUI-4878; mocked UI integration.
- Existing spec and helper: [`integration/test/eventBehaviour/eventBehaviour.positive.spec.ts`](integration/test/eventBehaviour/eventBehaviour.positive.spec.ts#L11); [`integration/helpers/eventBehaviourMockRoutes.helper.ts`](integration/helpers/eventBehaviourMockRoutes.helper.ts).
- Exact existing assertion: CYA rows contain Outcome type, Decision reference and Internal note (`eventBehaviour.positive.spec.ts:37–41`); the POST payload equals the expected event token/data object (`:63–72`), and refreshed state/history are checked (`:80–98`).
- Missing / unverified assertion: the approved design also names collection-row removal, dynamic-list choice and retained-hidden-value payload; this one spec does not prove those variants. Check the adjacent dynamic-field and collection specs against the exact ticket rows.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/eventBehaviour/eventBehaviour.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4878 owns only genuinely absent data contracts.

### CCD-2 — Conditional hidden-value retention (adjacent evidence)

- SRT ticket / period: EXUI-3995 (March). EXUI-3740/3839 were removed from July and must not be counted as July coverage.
- Owning Jira / layer: EXUI-4878; mocked UI integration.
- Existing spec: [`integration/test/createCase/dynamicFieldConfig.positive.spec.ts`](integration/test/createCase/dynamicFieldConfig.positive.spec.ts#L32).
- Exact existing assertion: the configured CYA and request data are matched (`dynamicFieldConfig.positive.spec.ts:45,55`) after hidden-with/without-retention fields change visibility (`:23–29`).
- Missing / unverified assertion: determine whether EXUI-4878 requires a different event type or collection-row payload; do not equate create-case configuration with all CCD events.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/createCase/dynamicFieldConfig.positive.spec.ts`.
- No automation in EXUI-4875: reference existing coverage before EXUI-4878 adds a variant.

### H-1 — Hearings active context

- SRT ticket / period: EXUI-4529 (June). EXUI-3664/3666 (March) and withdrawn EXUI-3241 (May) are adjacent hearing context.
- Owning Jira / layer: EXUI-4879; mocked UI integration.
- Existing spec: [`integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`](integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts#L28).
- Exact existing assertion: non-default jurisdiction reaches service-values request (`:60–61`), selected location reaches lookup (`:75`), and update payload matches expected case context (`:76`).
- Missing / unverified assertion: design asks for complete flags and invalid-linked-state failure. This scenario is not a one-session Case A-to-B delayed-response proof (EXUI-5434); those are separate acceptance decisions.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4879 owns context/flags gaps; EXUI-5434 owns a conditional stale-state journey.

### DT-1 — Booking date display and entry

- SRT ticket / period: EXUI-3003/3005/3066 (June); these rows were removed from July. The booking assertion below is only adjacent date evidence, not proof of the three target jurisdictions.
- Owning Jira / layer: EXUI-4880; mocked UI integration.
- Existing spec: [`integration/test/bookingUI/booking-ui.positive.spec.ts`](integration/test/bookingUI/booking-ui.positive.spec.ts#L36).
- Exact existing assertion: the booking CYA duration row equals the selected dates (`booking-ui.positive.spec.ts:96–97`), and submitted booking response matches request begin/end times (`:118–119`).
- Missing / unverified assertion: this does not establish local-time rendering of system-generated timestamps in Divorce, Financial Remedy and Probate, nor the requirement that user-entered dates remain unchanged. EXUI-4880 must identify a testable EXUI-facing contract for each jurisdiction rather than count this booking scenario as coverage.
- Approved implementation delta: the separate `test/EXUI-4880-timezone-dates` branch adds one shared CCD viewer fixture asserting a generated UTC event is displayed in Europe/London while an entered local date/time stays unchanged. It does **not** use Divorce, Financial Remedy or Probate-specific case fields/roles, so none of the three service rows can be closed from that local test. The EXUI-4880 workspace traceability assigns their representative evidence to the respective service SDET leads.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/bookingUI/booking-ui.positive.spec.ts`.
- No automation in EXUI-4875: EXUI-4880 owns an evidence-led test or an explicit cross-repository ownership decision for each jurisdiction.

### SEC-1 — CORS and session boundaries

- SRT ticket / period: EXUI-4123 (March), EXUI-4190/4191 (May), EXUI-4189/4216 (July).
- Owning Jira / layer: EXUI-4881; API and support unit.
- Existing specs: [`api/cors-and-role-access.api.ts`](api/cors-and-role-access.api.ts#L16); [`api/unit/session-storage-state.unit.api.ts`](api/unit/session-storage-state.unit.api.ts#L28).
- Exact existing assertion: OPTIONS status and `assertCorsHeaders` are invoked for allowed/disallowed origins (`cors-and-role-access.api.ts:25–32`); stored sessions require a matching fingerprint/auth cookie (`session-storage-state.unit.api.ts:41–61`).
- Missing / unverified assertion: the CORS helper unit case explicitly accepts `204` with _no_ `Access-Control-Allow-Origin` header (`cors-and-role-access.api.ts:72`); the approved design requires falsification before claiming allowed-origin protection. CSP/cookie acceptance rows and environment allowlist also need verification.
- Approved implementation delta: the separate `test/EXUI-4881-security-session` branch rejects a 2xx allowed preflight without exact ACAO in an isolated helper self-check. A configured target origin and authorised live run are still missing; an unconfigured positive check is visibly skipped as `INCONCLUSIVE` and cannot close this row. EXUI-5439 owns the target allowlist/AAT proof.
- Command: `npx playwright test --project=node-api playwright_tests_new/api/cors-and-role-access.api.ts playwright_tests_new/api/unit/session-storage-state.unit.api.ts`.
- No automation in EXUI-4875: EXUI-4881 owns any security test correction; the current assertion is recorded as insufficient, not passed security proof.

### GA-1 — Multiple role categories and case access

- SRT ticket / period: EXUI-4494 (April) and EXUI-4758 (July). April Manage Organisations UI has separate local mocked coverage, while live cross-app acceptance remains open.
- Owning Jira / layer: EXUI-4882; mocked UI integration in webapp.
- Existing specs: [`integration/test/caseDetails/rolesAndAccess.positive.spec.ts`](integration/test/caseDetails/rolesAndAccess.positive.spec.ts#L49); [`integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts`](integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts#L58).
- Exact existing assertion: Judicial and Legal Ops reallocate URLs carry their respective `roleCategory` (`rolesAndAccess.positive.spec.ts:166,182`); restricted view lists the expected users (`restrictedCaseAccess.positive.spec.ts:119–120`).
- Missing / unverified assertion: the two assertions do not establish every menu combination, OGD/group access or a multi-category user's effective access. Reconcile the supplied EXUI-4882 rows before extending tests.
- Approved implementation delta: the separate `test/EXUI-4882-group-access` branch compares category-dependent reassign confirmation rendering for dual- and single-category synthetic users. Its matched control does not prove entitlement or effective access. For April EXUI-4494, the separate MO `test/EXUI-4882-manage-org-group-access` branch edits `playwright_tests_new/integration/test/case-sharing/assignedCases.positive.spec.ts` and `playwright_tests_new/integration/test/user-admin/userAdmin.positive.spec.ts`: it proves the combined Cases filter and new `/users/manage` invite UI with synthetic routes, focused 2/2 and neighbouring 15/15 retry-disabled local runs, plus controlled wrong-path failures. These changes are uncommitted in the MO worktree; live group access and full service regression remain unproven.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/caseDetails/rolesAndAccess.positive.spec.ts playwright_tests_new/integration/test/restrictedAccess/restrictedCaseAccess.positive.spec.ts`.
- Separate MO command (run from the EXUI-5438/4882 MO worktree, not this webapp branch): `yarn playwright test --config=playwright.integration.config.ts --workers=2 --retries=0 playwright_tests_new/integration/test/case-sharing/assignedCases.positive.spec.ts playwright_tests_new/integration/test/user-admin/userAdmin.positive.spec.ts`; its workspace `RESULT.md` records the local 15/15 outcome and focused controlled faults. No durable MO HTML/Odhín/JUnit artifact was produced.
- No automation in EXUI-4875: EXUI-4882 owns webapp assertions and EXUI-5438 owns the separate MO UI assertions; this matrix only maps their evidence and does not prove effective group access.

### GA-2 — Specific request and share-case journey (adjacent evidence)

- SRT ticket / period: EXUI-4494 (April) and EXUI-4758 (July); the cited paths are adjacent, not an OGD/group-access proof.
- Owning Jira / layer: EXUI-4882; mocked UI integration.
- Existing specs: [`integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts`](integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts#L62); [`integration/test/shareCase/caseListSelection.positive.spec.ts`](integration/test/shareCase/caseListSelection.positive.spec.ts#L26).
- Exact existing assertion: approved specific-access request payload contains the requested role and dates (`reviewSpecificAccessRequest.positive.spec.ts:94–96`); selected case IDs reach the share-case route (`caseListSelection.positive.spec.ts:73,76`).
- Missing / unverified assertion: these are separate scenarios, not a proved group-access end-to-end transition or OGD access outcome.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/accessRequests/reviewSpecificAccessRequest.positive.spec.ts playwright_tests_new/integration/test/shareCase/caseListSelection.positive.spec.ts`.
- No automation in EXUI-4875: avoid reproducing existing positive journeys to satisfy a matrix row.

### VIS-1 — Repeatable visual baseline

- SRT ticket / period: September GOV UK upgrade brief (tracker EXUI-5255) and October Material/Hearings brief (tracker EXUI-5361).
- Owning Jira / layer: EXUI-5433; proposed fixed-state browser visual proof across three apps.
- Existing spec/helper: none identified for repeatable `toHaveScreenshot` baselines in webapp integration/E2E test paths. [`E2E/test/accessibility/webapp.a11y.spec.ts`](E2E/test/accessibility/webapp.a11y.spec.ts#L112) takes a Lighthouse screenshot, which is not a comparison assertion.
- Exact existing assertion: none for a visual baseline.
- Missing / unverified assertion: fixed form/table/navigation comparison, baseline provenance and human classification; verify each application independently. The user confirmed no date picker exists in the selected Manage Cases, Manage Organisations or Approve Org flows, so date-picker comparison is N/A for these flows, not silently passed. Absence of prior baselines was based on a bounded local `rg`, not a claim that no undocumented image exists.
- Approved implementation delta: the separate EXUI-5433 webapp branch adds `integration/test/visual/manageCases.visual.ts` with three synthetic baselines and a locally started candidate; two runs passed 2/2. Manage Organisations has a separate four-image opt-in local candidate. Approve Org remains source/discovery only without a locally available candidate app. Baseline visual classification and human acceptance remain open in all three apps.
- Command: `npx playwright test --config=playwright_tests_new/integration/visual.config.ts playwright_tests_new/integration/test/visual/manageCases.visual.ts` in the EXUI-5433 webapp branch; the command cannot run on this matrix branch because those files are isolated in another worktree.
- No automation in EXUI-4875: visual fixtures/approvals and app-specific baselines belong to EXUI-5433; no release gate is authorised.

### HS-1 — Case A-to-B stale response

- SRT ticket / period: EXUI-4529 (June) and October Hearings-refactor SRT (tracker EXUI-5361).
- Owning Jira / layer: EXUI-5434, conditional mocked UI integration after EXUI-5209/4879 audit.
- Existing spec: [`integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts`](integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts#L28).
- Exact existing assertion: non-default case service/location request and update payload are asserted (`:60–76`).
- Missing / unverified assertion: one-session A-to-B late/failing response must keep visible case B identity and B submission payload. This is absent from the cited single-context scenario. The separate EXUI-5434 branch now discovers three B-late, visible B-failure and direct-entry scenarios; its attempted A-after-B-load scenario was removed because its ordering could not falsify the EXUI-5209 cancellation contract. That acceptance row remains open. Approved STAFF_ADMIN identity is unavailable, so browser behavior and exact-head EXUI-5209 compatibility remain unproved.
- Command: `npx playwright test --config=playwright.integration.config.ts playwright_tests_new/integration/test/hearings/hearingCaseContextOrchestration.positive.spec.ts` selects the existing adjacent proof; the EXUI-5434 branch separately selects `hearingCrossCaseStaleState.positive.spec.ts` and `.negative.spec.ts`.
- No automation in EXUI-4875: EXUI-5434 is conditional on that audit, and product defects remain with EXUI-5209.

## Included source rows: decisions and open gap

These rows are deliberately not labelled covered merely because adjacent journeys exist. The decisions below distinguish exact assertions, external manual ownership and local mocked runs; none is an executed live SRT result. April EXUI-5438 now has local UI assertions and recorded focused/neighbouring runs. Independent packaged proof, full/live MO regression, exact-head CI and human SRT acceptance remain open.

| Source row                                                           | Period   | Current decision gap                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EXUI-4069 rapid consecutive document opening                         | February | XR-1 assigns live/manual evidence to the EXUI-4069 Media Viewer owner, Shamrez Darwish. No webapp-only automation claim.                                                                                                                                                                                                                                                                                                                                    |
| EXUI-4080 List Assist name                                           | February | XR-1 assigns live/manual QA evidence to the EXUI-4080 Hearings–List Assist owner, Kasi Subramaniam. EXUI-5434 is adjacent, not equivalent.                                                                                                                                                                                                                                                                                                                  |
| EXUI-2195 case-list filters                                          | July     | Mapped to CL-1's exact Divorce-to-Probate request assertion. Execution and live service evidence remain unverified.                                                                                                                                                                                                                                                                                                                                         |
| EXUI-3046 multi-collection search                                    | July     | Mapped to FC-1's exact three-code search query assertion. Live Probate result remains unverified.                                                                                                                                                                                                                                                                                                                                                           |
| EXUI-4494 Manage Organisations combined Cases and new Manage User UI | April    | EXUI-4494 says legacy separate Assigned/Unassigned tabs should not be used. EXUI-5438's separate MO branch now has route-mocked combined-Cases and new-Users specs, focused 2/2 with controlled faults and neighbouring 15/15 local passes (source base `03e07872e7edecd6ce090ad07343840f2e5f5efd`, uncommitted). Webapp EXUI-4882 alone cannot close this; full MO regression, live group entitlement, exact-head CI and human SRT acceptance remain open. |

Rows explicitly removed or withdrawn in the dated briefs are not included coverage: February EXUI-3995; May EXUI-4011 and withdrawn EXUI-3241; July EXUI-3003/3005/3066, EXUI-3740 and EXUI-3839. March EXUI-3995 and June EXUI-3003/3005/3066 remain valid in their respective briefs.

## Closure checks for EXUI-4875

1. Confirm the XR-1 manual owners have February evidence; run CL-1 and FC-1 on a pinned revision. April EXUI-5438 now has source-backed MO local mocked assertions and focused/neighbor runs in its separate worktree; obtain full MO regression, live group-entitlement/SRT and human acceptance before closure. The matrix decision alone does not establish acceptance.
2. Preserve the June EXUI-4700 identity from the linked brief; do not substitute EXUI-4753 from an earlier provisional note.
3. For each claimed covered row, run the selected scenario on a pinned revision and record command, project, result, report path and environment. Keep mocked, live API, E2E and exact-head CI evidence separate.
4. If a row is not worth automating, replace the provisional owner decision with a brief row-specific no-automation rationale and the manual evidence owner. A missing source row is not itself a no-automation decision.
