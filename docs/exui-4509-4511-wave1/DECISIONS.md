# EXUI-4509 and EXUI-4511 Wave 1 Decisions

## Decision 001

Keep `.gitignore` unchanged.

Reason:

- the user explicitly requested that `.gitignore` stays as-is
- the review concern was traceability visibility, not ignore-rule correctness

Outcome:

- store Wave 1 traceability artefacts in `docs/exui-4509-4511-wave1/` so they are reviewable without changing ignore rules

## Decision 002

Add minimal location-picker support to the existing `TaskListPage`.

Reason:

- the remaining work-filters gap is a real user interaction on the shared work filter UI
- reusing the current page object preserves the test intent and avoids adding a new helper layer for one interaction

Outcome:

- the filter interaction stays inside the shared `TaskListPage`

## Decision 003

Keep Booking UI implementation ownership with `EXUI-4131` / PR `#5061`.

Reason:

- the user confirmed PR `#5061` is the priority path and will merge first
- carrying duplicate Booking UI mocks, specs, and page objects in this branch would create avoidable conflicts and review noise

Outcome:

- remove Booking UI Playwright files from this branch
- restore the legacy booking feature to its pre-retirement tag state on this branch
- retain the generic ngIntegration zero-selection exit handling so the follow-up rebase can retire the last legacy booking feature cleanly after `#5061` lands
