# Playwright Migration Go-Live Gate

This checklist defines objective criteria for Codecept retirement in rpx-xui-webapp.

## Required checks

- Parity matrix is complete for all legacy suites in migration scope.
- `yarn test:parity:report` has been attached to the PR evidence.
- `yarn test:parity:gate` passes, or every remaining blocking row has an accepted waiver recorded in the sign-off pack.
- No unresolved P0 or P1 migration blockers.
- Flake threshold is within agreed limits for E2E, integration, and API suites.
- Required evidence is published in CI (Odhin, HTML, JUnit, trace on failure).
- Sign-off package includes residual risk and rollback notes.

## Evidence links

- Parity matrix: docs/playwright-migration-parity-matrix.md
- Machine-readable register: docs/playwright-migration-parity-map.json
- Local parity report command: `yarn test:parity:report`
- Closure gate command: `yarn test:parity:gate`
- CI evidence: pending
- Sign-off page: pending

## Sign-off

- QA: pending
- Engineering: pending
- Product: pending
