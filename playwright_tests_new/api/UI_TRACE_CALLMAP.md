# UI Trace Call Map

This document records downstream API call sequences captured from traced UI runs and is used to keep `@journeys` API monitors aligned with real UI behavior.

## Capture Context

- Date: 2026-02-12
- Config: `playwright.e2e.config.ts`
- Trace mode: `--trace on`
- Source specs:
  - `playwright_tests_new/E2E/test/myWork/myTasks.spec.ts`
  - `playwright_tests_new/E2E/test/searchCase/globalSearch.spec.ts`

## My Tasks (Observed Calls)

Ordered (single traced failure attempt):

1. `GET /api/configuration?configurationKey=termsAndConditionsEnabled` -> `200`
1. `GET /api/user/details?refreshRoleAssignments=true` -> `200`
1. `GET /api/monitoring-tools` -> `200`
1. `GET /auth/isAuthenticated` -> `200`
1. `GET /api/healthCheck?path=%2Fwork%2Fmy-work%2Flist` -> `200`
1. `POST /workallocation/region-location` -> `200`
1. `GET /api/role-access/roles/get-my-access-new-count` -> `200`
1. `GET /api/wa-supported-jurisdiction/get` -> `200`
1. `GET /workallocation/task/types-of-work` -> `200`
1. `POST /workallocation/caseworker/getUsersByServiceName` -> `200`
1. `POST /workallocation/task` -> `504`

Notes:

- `GET /api/role-access/roles/get-my-access-new-count` and `GET /api/wa-supported-jurisdiction/get` were observed twice in the same run.
- The task list fetch (`POST /workallocation/task`) is the high-risk call for timeouts/5xx in this trace.
- A direct trace extract of `POST /workallocation/task` request body (from `/tmp/trace_my_tasks/resources/ebca9a69795973204a1a8dae57a2f6e1bbc99b4b.json`) shows the UI baseline payload:

```json
{
  "searchRequest": {
    "search_parameters": [
      { "key": "user", "operator": "IN", "values": ["<userId>"] },
      { "key": "state", "operator": "IN", "values": ["assigned"] }
    ],
    "sorting_parameters": [],
    "search_by": "caseworker"
  },
  "view": "MyTasks"
}
```

- `@journeys` now mirrors this payload shape by default (no implicit jurisdiction/pagination filters) and still reproduces downstream `502/504`, indicating an environment/downstream issue rather than a malformed journey request.

## Global Search (Observed Calls)

Deduplicated (across traced run + retry):

1. `GET /api/configuration?configurationKey=termsAndConditionsEnabled` -> `200`
1. `GET /api/user/details?refreshRoleAssignments=true` -> `200`
1. `GET /api/monitoring-tools` -> mostly `200` (one unresolved `-1` in trace stream)
1. `GET /api/organisation` -> `403` (guarded/expected in this user context)
1. `GET /api/globalSearch/services` -> `200`
1. `POST /api/globalsearch/results` -> `200` (plus unresolved attempts `-1` in trace stream)
1. `GET /api/wa-supported-jurisdiction/get` -> `200`
1. `POST /api/role-access/roles/manageLabellingRoleAssignment/:caseId` -> `204`

Notes:

- `POST /api/globalsearch/results` uses lower-case `globalsearch` path in UI source (`SearchService.getResults`).
- Some trace records show `status=-1` when request snapshots were captured without a finalized response.

## Journey Alignment

`playwright_tests_new/api/user-journey.api.ts` should prioritize this sequence for realism:

1. Session/bootstrap endpoints (`auth`, `configuration`, `user/details`, `monitoring-tools`)
1. Global search (`/api/globalSearch/services`, `/api/globalsearch/results`)
1. My tasks filter seed calls (`wa-supported-jurisdiction/get`, `region-location`, `task/types-of-work`, `caseworker/getUsersByServiceName`)
1. Final task list fetch (`/workallocation/task`) with explicit timeout + retry policy
