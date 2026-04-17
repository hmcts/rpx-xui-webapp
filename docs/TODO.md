# Branch Delivery TODO

- [x] Create `codex/exui-4213-wa-playwright-coverage` from `origin/master`.
- [x] Confirm the current Playwright framework does not fully deliver EXUI-4213.
- [x] Add shared validation for mandatory Work Allocation task-list mock fields.
- [x] Add shared validation for mandatory case-task mock fields.
- [x] Wire shared task-list and case-task route helpers to validate mocked payloads by default.
- [x] Validate `setupManageTasksBaseRoutes(...)` task-list responses before fulfillment.
- [x] Add direct node-api coverage for valid mocked payloads and clear field-level failures.
- [x] Add scenario-helper support for `user + entity`, `user -> entities`, and `entity -> users`.
- [x] Add direct node-api coverage for access matching and `EXCLUDED` behaviour.
- [x] Add Playwright integration coverage proving `user -> entities` exclusion behaviour on `My access`.
- [x] Add Playwright integration coverage proving `entity -> users` separation of active roles and exclusions on `Roles and access`.
- [x] Move case-task integration specs onto the shared validated route helper where appropriate.
- [x] Remove the `docs/*.md` ignore rules so traceability artefacts are reviewable in the branch.
- [x] Replace stale branch traceability docs with EXUI-4213-specific plan, decisions, and results.
- [x] Run targeted unit and integration validation for the touched Work Allocation areas.
- [x] Run a final review pass and record residual risks instead of overstating delivery.
