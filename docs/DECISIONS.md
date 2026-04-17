# Branch Delivery Decisions

## D1. Enforce mandatory mocked Work Allocation attributes at helper-entry points

The ticket is about mocked integration reliability, so the most useful enforcement point is the shared route/bootstrap layer rather than individual spec assertions. Shared helpers now reject invalid task-list and case-task payloads before the browser flow starts.

## D2. Express ticket field names in validation failures, not only repo property names

The acceptance criteria asks for clear failures on missing or malformed mandatory attributes. Validation errors therefore reference the ticket language such as `task_id`, `task_type`, `due_date_time`, and `work_type.id` so failures are diagnostically useful.

## D3. Keep access-rule modelling in pure helpers with lightweight direct tests

The access-scenario logic is deterministic data transformation. That belongs in pure helper functions with node-api coverage, not only inside slower browser tests.

## D4. Use targeted browser coverage only where UI wiring matters

`My access` and `Roles and access` still need integration proof because those flows exercise the real UI tables, exclusion rendering, and judicial-name resolution. Browser coverage is limited to those surfaces instead of duplicating all scenario permutations in the UI layer.

## D5. Keep `My access` modelling aligned with the current specific-access contract

The repo's current `My access` mapping is driven by the specific-access subset and excludes challenged records. The Playwright scenario helper therefore mirrors that existing contract instead of inventing a broader access-projection rule for the ticket slice.

## D6. Reuse existing mock builders and page objects rather than inventing a parallel WA fixture stack

The repo already has task-list, case-task, case-detail, and `My access` mock builders plus page objects. The new coverage extends those contracts instead of creating a second mock ecosystem.

## D7. Keep current delivery at targeted validation breadth

This branch intentionally validates the touched Work Allocation helpers/specs, not the entire Playwright estate. That keeps feedback fast and honest while still proving the EXUI-4213 slice.

## D8. No `P2` waivers are accepted for the current branch state

If the final review finds a material behavioural or maintainability gap in this slice, it should be fixed before handoff rather than carried as an undocumented waiver.

## D9. Keep active roles and exclusions as independent surfaces in the entity-to-users view

The current application loads role assignments and exclusions separately. Scenario helpers and specs therefore keep active roles visible while also rendering matching exclusions, rather than suppressing one with the other.

## D10. Validate mandatory date fields as strict calendar timestamps, not `Date.parse(...)`-compatible strings

The branch claims clear failures for malformed mandatory task attributes. Date validation therefore rejects impossible calendar values such as February 31 rather than accepting browser-normalized overflow dates.
