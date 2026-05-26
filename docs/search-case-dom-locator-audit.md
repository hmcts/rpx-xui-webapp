# Search Case DOM Locator Audit

## Scope

- Case list page
- Find case page
- Global search page
- 16-digit header search
- Case details page
- No results page

## DOM Evidence Sources

- Playwright error snapshots in:
  - `test-results/playwright_tests_new-E2E-t-65f3f-ing-Public-Law-jurisdiction-chromium/error-context.md`
  - `test-results/playwright_tests_new-E2E-t-0737d-ase-id-and-FPL-jurisdiction-chromium/error-context.md`
  - `test-results/playwright_tests_new-E2E-t-8bc1c-ing-wildcard-on-case-number-chromium/error-context.md`
  - `test-results/playwright_tests_new-E2E-t-39aa4--by-16-digit-case-reference-chromium/error-context.md`

## Locator Strategy Applied

1. Stable IDs and deterministic CSS selectors first
2. Stable component classes next
3. ARIA and visible text locators only where deterministic ID/class is not available

## Page Object Updates

- `playwright_tests_new/E2E/page-objects/pages/exui/caseList.po.ts`
  - Added comprehensive list/filter/results locators
  - Hardened random case reference extraction from both `href` and visible text
- `playwright_tests_new/E2E/page-objects/pages/exui/findCase.po.ts`
  - Fixed navigation locator to `case-search`
  - Added page/filter/results locators for find-case workflow
- `playwright_tests_new/E2E/page-objects/pages/exui/globalSearch.po.ts`
  - Added form/results/pagination locators and tightened CSS selection
- `playwright_tests_new/E2E/page-objects/pages/exui/searchCase.po.ts`
  - Added quick-search container and no-results container locators
