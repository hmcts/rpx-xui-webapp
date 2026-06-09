# EXUI-4685 Remaining Parity Journeys

This document tracks the P1 parity journeys to be implemented in Playwright.

## Target journeys

- Share Case flow parity
- Case list selection persistence parity
- Media Viewer tools parity
- Create case hidden field and collection permissions parity completion

## Delivery slices

- Slice 1: Share case and case list selection integration coverage
  - Adds `@integration-share-case` coverage for share button enablement, selected-case persistence across pagination, navigation to `/cases/case-share?init=true`, and `api/caseshare/cases` query ids.
  - Keeps `api/caseshare/case-assignments` branch-code payload coverage in Angular component specs rather than a browser-side direct API shortcut.
- Slice 2: Media viewer tools coverage
- Slice 3: Create case hidden-field and collection-matrix parity

## Dependencies

- EXUI-4684 parity matrix updates
- EXUI-4688 a11y/reporting gate evidence
