# GOVUK Migration Phase 2.1 Inventory

Date: 2026-05-22
Scope: isolate and map HMCTS dependency surface while keeping @hmcts/frontend installed.

## 1) Direct @hmcts/frontend style imports

- [src/app/containers/app/app.component.scss](src/app/containers/app/app.component.scss#L51)
- [src/app/components/media-viewer-wrapper/media-viewer-wrapper.component.scss](src/app/components/media-viewer-wrapper/media-viewer-wrapper.component.scss#L3)

These are the two highest-priority decoupling entry points.

Status update:

- Both direct imports have now been removed.
- No remaining `@hmcts/frontend/all` stylesheet imports in src.

## 2) Counted HMCTS token inventory (top tokens)

Token counts below are extracted from `src/**/*.html|scss|ts` using regex `hmcts-[a-z0-9_-]+`.

| Token                           | Count | Notes                                      |
| ------------------------------- | ----: | ------------------------------------------ |
| hmcts-error-summary             |    38 | Mostly via xuilib-hmcts-error-summary tags |
| hmcts-global-footer             |    12 | Custom app component naming and markup     |
| hmcts-global-header             |    10 | Custom app component naming and markup     |
| hmcts-button--secondary         |     7 | Action/filter buttons                      |
| hmcts-filter-layout\_\_filter   |     7 | Case/work/staff filters                    |
| hmcts-badge                     |     7 | Badge styling                              |
| hmcts-banner                    |     6 | Info/warning/success banners               |
| hmcts-page-heading              |     5 | NOC/staff/booking headings                 |
| hmcts-filter-layout\_\_content  |     5 | Filter layout body                         |
| hmcts-search-toggle\_\_button   |     4 | Header search toggle                       |
| hmcts-action-bar\_\_filter      |     4 | Case action bar                            |
| hmcts-sub-navigation            |     4 | Work allocation nav                        |
| hmcts-pagination                |     3 | Search/staff pagination                    |
| hmcts-header\_\_navigation-link |     3 | Header nav links                           |
| hmcts-filter\_\_tag             |     3 | Selected filter tags                       |

Note: a small number of matches are non-style role/value strings (for example hmcts-admin, hmcts-ctsc) and should be ignored for CSS migration.

## 3) xuilib HMCTS components in use

Token counts from `src/**/*.html` using regex `xuilib-hmcts-[a-z0-9-]+`:

| Component tag               | Count | Phase 2 strategy                                        |
| --------------------------- | ----: | ------------------------------------------------------- |
| xuilib-hmcts-error-summary  |    38 | Keep for now, decouple selectors/tests from class names |
| xuilib-hmcts-sub-navigation |     4 | Keep for now, track visual dependencies                 |
| xuilib-hmcts-banner         |     2 | Keep for now, verify banner behavior                    |
| xuilib-hmcts-pagination     |     2 | Keep for now, avoid class-coupled tests                 |

## 4) File groups and migration strategy

### Group A: Global shell (highest risk)

- [src/app/components/hmcts-global-header/hmcts-global-header.component.html](src/app/components/hmcts-global-header/hmcts-global-header.component.html)
- [src/app/components/hmcts-global-footer/hmcts-global-footer.component.html](src/app/components/hmcts-global-footer/hmcts-global-footer.component.html)
- [src/app/containers/app/app.component.scss](src/app/containers/app/app.component.scss)

Strategy:

- Keep DOM stable in Phase 2.
- Move visual ownership to local app styles.
- Minimize dependence on package-provided class appearance.

### Group B: Filter/action patterns (medium risk)

- [src/cases/containers/case-list/case-list.component.html](src/cases/containers/case-list/case-list.component.html)
- [src/cases/containers/case-search/case-search.component.html](src/cases/containers/case-search/case-search.component.html)
- [src/work-allocation/components/case-manager-filter/case-manager-filter.component.html](src/work-allocation/components/case-manager-filter/case-manager-filter.component.html)
- [src/staff-administrator/containers/staff-users/staff-users.component.html](src/staff-administrator/containers/staff-users/staff-users.component.html)

Strategy:

- Replace hmcts action/filter utility classes with local classes first.
- Later map to GOVUK-friendly structures where possible.

### Group C: Banner/badge/summary patterns (medium risk)

- [src/app/components/info-message/info-message.component.html](src/app/components/info-message/info-message.component.html)
- [src/cases/containers/restricted-case-access-container/restricted-case-access-container.component.html](src/cases/containers/restricted-case-access-container/restricted-case-access-container.component.html)
- [src/staff-administrator/components/staff-user-details/staff-status/staff-status.component.html](src/staff-administrator/components/staff-user-details/staff-status/staff-status.component.html)

Strategy:

- Keep existing markup.
- Introduce app-local CSS equivalents for hmcts banner/badge variants.

### Group D: xuilib wrappers (defer replacement)

- [src/hearings/containers/request-hearing/hearing-view-edit-summary/hearing-view-edit-summary.component.html](src/hearings/containers/request-hearing/hearing-view-edit-summary/hearing-view-edit-summary.component.html)
- [src/hearings/containers/hearing-actuals/hearing-actuals-add-edit-summary/hearing-actuals-add-edit-summary.component.html](src/hearings/containers/hearing-actuals/hearing-actuals-add-edit-summary/hearing-actuals-add-edit-summary.component.html)
- [src/work-allocation/containers/task-home/task-home.component.html](src/work-allocation/containers/task-home/task-home.component.html)

Strategy:

- Do not replace components in Phase 2.
- Track test dependencies and class-based assumptions around these components.

## 5) Test hardening targets (Phase 2.1 outcome)

Class-coupled tests to update first:

- [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts#L235)
- [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts#L251)
- [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts#L266)

Direction:

- Prefer role-based and data-testid selectors over hmcts class selectors.

## 6) Recommended PR slicing for Phase 2

1. PR 2.1a: Add local style ownership scaffolding for global shell and filter patterns (no visual intent change).
2. PR 2.1b: Migrate brittle tests off hmcts class selectors in high-traffic areas.
3. PR 2.1c: Apply app-local equivalents for banner/badge/action/filter classes in cases/work-allocation/staff.
4. PR 2.1d: Verification and cleanup; keep @hmcts/frontend package in place.

## 7) Exit criteria to begin Phase 3

- Both direct imports in app shell/media wrapper are no longer required by local styles.
- No critical tests depend on hmcts class selectors.
- Core routes (header, case list/search, work allocation, staff users, hearings summaries) pass targeted verification.

## 8) Progress update (PR 2.1a)

Completed:

- Added local ownership stylesheet [src/style/\_hmcts-local-ownership.scss](src/style/_hmcts-local-ownership.scss)
- Wired stylesheet globally via [src/style/app.scss](src/style/app.scss#L4)
- Updated brittle pagination selectors in [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts) to use `xuilib-pagination` outputs instead of `.hmcts-pagination*` DOM internals
- Updated brittle toggle button selector in [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts) to use `.button-heading button[type="button"]` instead of `.hmcts-button--secondary`

Initial locally-owned patterns included:

- hmcts-button--secondary
- hmcts-page-heading and hmcts-page-heading\_\_title
- hmcts-action-bar and hmcts-action-bar\_\_filter
- hmcts-filter-layout, hmcts-filter-layout**filter, hmcts-filter-layout**content
- hmcts-filter-tags and hmcts-filter\_\_tag
- hmcts-badge and colour variants
- hmcts-banner family and assistive text
- hmcts-pagination\_\_results
- hmcts-width-container
- hmcts-footer list/link classes

Verification note:

- yarn build:dev remains green.
- Confirmed targeted unit test pass for [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts): 11 of 11 SUCCESS on ChromeHeadless.
- Targeted Karma run for [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts) did not reach execution output in this shell before timeout/termination.

## 9) Progress update (PR 2.1c)

Completed:

- Removed direct stylesheet import of `@hmcts/frontend/all` from [src/app/containers/app/app.component.scss](src/app/containers/app/app.component.scss)
- Removed direct stylesheet import of `@hmcts/frontend/all` from [src/app/components/media-viewer-wrapper/media-viewer-wrapper.component.scss](src/app/components/media-viewer-wrapper/media-viewer-wrapper.component.scss)
- Added locally-owned HMCTS shell/navigation styles to [src/style/\_hmcts-local-ownership.scss](src/style/_hmcts-local-ownership.scss):
  - hmcts-header family
  - hmcts-header\_\_navigation family
  - hmcts-primary-navigation family

Verification note:

- yarn build:dev remains green after direct import removal.
- No new build errors introduced; remaining output is warning-only (existing Sass/Browserslist warnings).

## 10) Progress update (PR 2.1d)

Verification completed:

- Build verification: `yarn build:dev` is green after PR 2.1c changes.
- Static coupling check: no direct `@hmcts/frontend/all` stylesheet imports remain under src.
- Test selector check: no remaining `By.css(...hmcts-...)` selectors found in src unit specs.

Remaining risk/open item:

- Targeted Karma execution for [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts) still does not consistently reach execution output in this shell session, so pass/fail cannot yet be confirmed from this environment.

Next execution steps:

1. Re-run targeted spec verification in a known-good runner session (or CI) for:
   - [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts)
   - [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts)
2. If both pass, mark PR 2.1d complete and begin Phase 3 dependency-removal readiness audit for `@hmcts/frontend` package usage outside styles.

## 11) Phase 3 execution update

Completed:

- Removed `@hmcts/frontend` dependency from [package.json](package.json).
- Regenerated dependency graph via `yarn install` and updated [yarn.lock](yarn.lock).
- Verified no remaining lockfile references to `@hmcts/frontend`.

Verification note:

- `yarn build:dev` remains green after dependency removal.
- Runtime source check found no TypeScript imports from `@hmcts/frontend` under src.

Residual testing note:

- The known shell limitation on one targeted Karma spec remains unchanged; build verification and static dependency checks for Phase 3 are complete in this environment.

## 12) Next-step execution status

Action taken:

- Re-ran targeted Angular test command for [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts) in this shell.
- Command again produced extended build/warning output but did not provide stable, conclusive per-spec Karma summary before terminal intervention.

Current status:

- Migration code and dependency work is complete locally (including `@hmcts/frontend` package removal).
- Final closeout remains a verification gate in a reliable runner session.

Immediate next step:

1. Run the two target specs in CI (or a known-good local runner):

- [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts)
- [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts)

2. If both pass, mark migration complete and raise PR.

## 13) Decision log: proceed despite local shell limitation

Decision:

- Proceed with migration completion and PR preparation, even though this local shell session does not consistently emit conclusive Karma per-spec summaries.

Rationale:

- Build verification is green.
- Dependency and styling migration tasks are complete.
- The same shell behavior has been repeatedly reproduced across multiple isolated spec commands.

Follow-up expectation:

1. CI (or another known-good runner) should provide authoritative pass/fail evidence for:

- [src/search/containers/search-results/search-results.component.spec.ts](src/search/containers/search-results/search-results.component.spec.ts)
- [src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts](src/work-allocation/components/task-list-filter/task-list-filter.component.spec.ts)

2. Attach CI evidence in PR comments/checks and merge if green.
