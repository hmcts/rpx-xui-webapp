# EXUI-4509 and EXUI-4511 Wave 1 Plan

## Scope

- finish the booking UI parity needed to retire the active legacy booking feature safely
- finish the work-filters parity needed to retire the active legacy filter feature safely
- keep `.gitignore` unchanged and place reviewable traceability under a non-ignored `docs/` subdirectory

## Findings to close

- pre-register the booking guard request observer before navigation so the negative test cannot miss an early bookings call
- restore third-booking rendering coverage for the existing-bookings booking flow
- add the missing organisation-only location-search parity for IA and SSCS after clearing selected locations
- keep traceability artefacts reviewable in the branch diff without editing ignore rules
