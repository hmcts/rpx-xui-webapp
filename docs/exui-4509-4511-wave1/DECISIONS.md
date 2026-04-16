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
