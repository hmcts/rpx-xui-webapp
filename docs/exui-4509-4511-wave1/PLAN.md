# EXUI-4509 and EXUI-4511 Wave 1 Plan

## Scope

- finish the work-filters parity needed to retire the active legacy filter feature safely
- finish the task-event-completion negative-path parity needed to retire the active legacy task-event feature safely
- keep Booking UI implementation out of this branch because PR `#5061` for `EXUI-4131` is the priority owner for that area
- keep `.gitignore` unchanged and place reviewable traceability under a non-ignored `docs/` subdirectory

## Findings to close

- add the missing organisation-only location-search parity for IA and SSCS after clearing selected locations
- add negative-path Playwright coverage for task-event completion
- remove Booking UI Playwright overlap from this branch after the decision to prioritise PR `#5061`
- keep traceability artefacts reviewable in the branch diff without editing ignore rules
