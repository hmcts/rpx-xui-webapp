# Hearings telemetry

## Workbook

Open the relevant Application Insights resource in Azure, choose Workbooks, create a new workbook,
open its Advanced Editor, and import the contents of `hearings.workbook`. Apply and save it in
the intended subscription/resource group. The queries inherit the Application Insights resource
context; do not import it as a workspace-scoped workbook with different table names.
This repository supplies the artifact only; it does not provision or modify an Azure resource.
The format follows Microsoft's [workbook schema](https://github.com/microsoft/Application-Insights-Workbooks/blob/master/schema/workbook.json).

The workbook shows starts and outcomes by journey type, observed drop-off by last step,
page visits, page/journey duration, actions including retries, validation failures, exceptions,
and correlated ExUI requests/dependencies. Counts are explicitly labelled observed: sampling is
unchanged, and delivery is not guaranteed when telemetry is disabled, blocked, or initialization fails.

## Event contract

- `Hearings.JourneyStarted`: anonymous ID, journey type and current normalized step.
- `Hearings.Action`: explicit continue/back/change/submit/cancel/retry and cumulative action count.
- `Hearings.ValidationFailed`: step, closed `validationId` (`form-invalid` or
  `case-context-mismatch`), category and numeric error count. No field IDs/messages/values are copied.
- `Hearings.JourneyCompleted`: confirmation reached, or cancellation API succeeded for the same active journey.
- `Hearings.JourneyAbandoned`: an observed non-confirmation ending, with its last step and reason.
- `Hearings.JourneyDuration`: retained for existing consumers, alongside exactly one outcome per ended journey.

A browse journey can evolve into request/amend/etc. without changing its anonymous ID;
the start event describes the entry type, while the outcome describes the final type.
Do not compute type-specific conversion rates by dividing those groups without joining by journeyId.
Browse/view exits are not necessarily failed transactions and are excluded from the drop-off panel.
Browser termination may prevent pagehide from being delivered; a missing completion alone does not
prove abandonment. A browser-cache restoration starts a fresh observed visit/journey.

## Pages and duration

Each successful supported Angular navigation emits one normalized native `pageViews` item immediately.
Rejected/cancelled navigation emits no page view; redirects record only their final destination.
Query/fragment navigations that Angular actually completes count as new visits, without copying their values.
Angular NavigationSkipped events are not successful new navigations and are ignored.

Elapsed time is only known on departure. To avoid emitting a second page view or delaying entry until
departure, it is sent separately as native `customMetrics` named `Hearings.PageDuration`, in milliseconds.
Join `pageViews.customDimensions.pageVisitId` to `customMetrics.customDimensions.pageVisitId` for individual
visit durations; do not use the pageViews built-in duration column for measured dwell time.
Duration is wall-clock elapsed time, including time in a background tab, not active user engagement.

## Privacy and correlation

Page URLs and names use route templates, never actual route/query/fragment values. Explicit permitted
metadata is limited to caseId, hearingId where known, and jurisdiction, plus the anonymous journey/visit IDs
and closed telemetry fields. Case names, personal details, form values, bodies and serialized responses
must never be added. The original application Error is not changed; the SDK's serialized copy removes
unsafe messages/locations while retaining safe stack frames and line/column numbers.

Browser requests carry the anonymous journey header only to allowlisted same-origin endpoints.
Server request/dependency/trace telemetry is enriched in request-local context. Native operation IDs
link browser dependencies to server requests; browser dependency items need not themselves carry a
journeyId dimension. Verify the native trace chain in the deployed environment before sign-off.

## Deployment verification

1. Verify telemetry configuration/sampling, then enter a hearing and check one normalized page view per navigation.
2. Continue, go back, change a section, submit/cancel, and retry a failed hearings-tab load; inspect structured actions.
3. Trigger validation and handled API/resolver errors; check safe identifiers, counts, status when available and journey context.
4. Complete a request/link/actuals/cancellation journey and leave another unfinished; verify outcomes and durations.
5. Switch cases/hearings while requests are slow; old results must retain their initiating correlation and never end the new journey.
6. Import the workbook, select the correct resource/time range, validate the queries against ingested telemetry, and inspect for prohibited data.

Unit tests cannot verify Azure ingestion, resource permissions, deployment sampling, or workbook rendering.
