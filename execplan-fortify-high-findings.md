# Remediate Fortify HIGH findings and stabilize Fortify report archiving

This ExecPlan is a living document. The sections Progress, Surprises & Discoveries, Decision Log, and Outcomes & Retrospective must be kept up to date as work proceeds.

This plan follows the requirements in `.agent/PLANS.md` (repo root: `.agent/PLANS.md`). It must be maintained in accordance with that file.

## Purpose / Big Picture

After this change, the Fortify static analysis scan for rpx-xui-webapp completes without HIGH severity findings and the resulting Fortify report artifacts are archived reliably by Jenkins. A user can verify this by running the nightly pipeline and confirming it passes the Fortify gate and exposes `Fortify Scan/FortifyScanReport.html` as a build artifact.

## Progress

- [x] (2026-01-14 15:27Z) Create Secure-by-Design plan in `rpx-xui-webapp/securebydesign-fortify-high-findings.md`.
- [x] (2026-01-14 15:29Z) Copy Fortify report outputs into workspace root in `rpx-xui-webapp/Jenkinsfile_nightly` and archive them reliably.
- [x] (2026-01-14 19:38Z) Configure CNP PR Fortify scans to use the `rpx-aat` Key Vault in `rpx-xui-webapp/Jenkinsfile_CNP`.
- [x] (2026-01-15 09:04Z) Archive Fortify reports in `rpx-xui-webapp/Jenkinsfile_CNP` and copy `test_codecept/java/config/fortify-client.properties` into workspace `config/` for Fortify releaseId lookup.
- [ ] (2026-01-14 15:27Z) Obtain the Fortify HIGH findings report and map each finding to source files and line numbers in this repo.
- [ ] (2026-01-14 15:27Z) Implement code fixes for each HIGH finding and add or update tests where behavior changes.
- [ ] (2026-01-14 15:27Z) Re-run the Fortify scan in CI and confirm the build passes the HIGH severity gate and the report artifact is present.

## Surprises & Discoveries

- Observation: Jenkins attempts to archive `Fortify Scan/FortifyScanReport.html` from the workspace root, but the Fortify client writes the report under `test_codecept/java/Fortify Scan`.
  Evidence: Build log line: `Fortify Scan/FortifyScanReport.html` does not match, but `test_codecept/java/Fortify Scan/FortifyScanReport.html` does.
- Observation: CNP PR builds do not archive Fortify reports and Fortify post-processing expects `config/fortify-client.properties` at the workspace root.
  Evidence: PR log line: `Fortify: unable to determine releaseId (expected config/fortify-client.properties); skipping vulnerability details`.
- Observation: Running `yarn fortifyScan` from the workspace root fails because the script is defined in `rpx-xui-webapp/package.json`.
  Evidence: `Usage Error: Couldn't find a script named "fortifyScan".`
- Observation: The local environment requires a Java tool version to be set before the Gradle Fortify task can run.
  Evidence: `No version is set for command java` from the asdf toolchain prompt.
- Observation: Local Fortify upload can fail with `SSLHandshakeException` due to missing trusted CA certificates in the Java truststore.
  Evidence: `PKIX path building failed: unable to find valid certification path to requested target` from the Fortify client.

## Decision Log

- Decision: Copy Fortify report outputs into the workspace root rather than changing the Fortify scan working directory.
  Rationale: Avoids changing the Fortify scan scope while satisfying Jenkins artifact collection patterns.
  Date/Author: 2026-01-14 / Codex.
- Decision: Pin local Fortify runs to Java Corretto 17.0.15.6.1 via `.tool-versions`.
  Rationale: Aligns with the requested toolchain and avoids `asdf` runtime errors for `yarn fortifyScan`.
  Date/Author: 2026-01-14 / Codex.
- Decision: Set `enableFortifyScan('rpx-aat')` in `rpx-xui-webapp/Jenkinsfile_CNP`.
  Rationale: CNP PR Fortify scans default to `xui-aat` vault and fail to resolve; `rpx-aat` matches nightly and resolves secrets.
  Date/Author: 2026-01-14 / Codex.
- Decision: Add an `afterAlways('fortify-scan')` hook in `rpx-xui-webapp/Jenkinsfile_CNP` to copy Fortify reports and stage `test_codecept/java/config/fortify-client.properties` at `config/fortify-client.properties`.
  Rationale: Ensures PR builds archive Fortify reports and the Fortify post-step can resolve the releaseId.
  Date/Author: 2026-01-15 / Codex.

## Outcomes & Retrospective

Pending. This section will be updated after Fortify findings are remediated and the nightly pipeline is verified.

## Context and Orientation

Fortify is a static analysis tool that scans source code and fails the build when findings meet or exceed a configured severity threshold. In this repo, the Fortify scan is executed via the `fortifyScan` Gradle task defined in `rpx-xui-webapp/test_codecept/java/build.gradle` and invoked by the `yarn fortifyScan` script in `rpx-xui-webapp/package.json`. The Fortify client configuration lives in `rpx-xui-webapp/test_codecept/java/config/fortify-client.properties`, which sets `fortify.client.unacceptableSeverity=HIGH` and excludes large directories from scanning. The nightly Jenkins pipeline is defined in `rpx-xui-webapp/Jenkinsfile_nightly`, which enables Fortify via `enableFortifyScan('rpx-aat')` and archives artifacts after the `fortify-scan` stage. The PR pipeline is defined in `rpx-xui-webapp/Jenkinsfile_CNP` and also archives Fortify reports while staging `config/fortify-client.properties` for Fortify metadata lookups.

When the Fortify client runs, it writes its report under `test_codecept/java/Fortify Scan/`. The Jenkins job currently attempts to archive `Fortify Scan/FortifyScanReport.html` at the repository root, which leads to artifact warnings even when the report exists in the subdirectory.

## Secure-by-Design Considerations

This work follows `.agent/SECURE.md`. No secrets should be introduced, Fortify credentials must remain in Azure Key Vault, and no report contents should be printed to logs. Code fixes should prioritize input validation, safe defaults, and least-privilege access patterns, and any behavior changes must be covered by tests without exposing sensitive data.

## Plan of Work

First, update `rpx-xui-webapp/Jenkinsfile_nightly` to copy the Fortify report output directory from `test_codecept/java/Fortify Scan` into `Fortify Scan` at the workspace root after the Fortify scan finishes, then archive both the root-level and nested report directories. Update `rpx-xui-webapp/Jenkinsfile_CNP` to apply the same report copying for PR builds and copy `test_codecept/java/config/fortify-client.properties` into `config/fortify-client.properties` for Fortify metadata lookup. This keeps the scan scope unchanged while satisfying Jenkins artifact collection patterns and the Fortify post-step.

Next, obtain the Fortify HIGH findings report (either `test_codecept/java/Fortify Scan/FortifyScanReport.html` from a successful run or the issue list exported from Fortify). For each HIGH finding, record the file path, line number, category, and recommended fix. Update this ExecPlan with concrete remediation steps and any required tests once the findings are known.

Then, implement the code changes in the reported files, keeping behavior secure by default and validating inputs. If a finding affects user-visible behavior or security-critical logic, add or update tests in the same area to demonstrate the fix. Avoid introducing new dependencies unless the finding explicitly requires it.

Finally, re-run the Fortify scan in CI (or in an approved environment) and confirm that the scan completes without HIGH findings and that `Fortify Scan/FortifyScanReport.html` is present in the Jenkins artifacts.

## Concrete Steps

From the repo root:

1) Update `rpx-xui-webapp/Jenkinsfile_nightly` and `rpx-xui-webapp/Jenkinsfile_CNP` to copy Fortify reports into the workspace root and archive them. In `rpx-xui-webapp/Jenkinsfile_CNP`, also copy `test_codecept/java/config/fortify-client.properties` into `config/fortify-client.properties`.

2) When you have access to Fortify outputs, open the report at `rpx-xui-webapp/test_codecept/java/Fortify Scan/FortifyScanReport.html` in a browser and filter to HIGH severity. Capture the file paths and line numbers for each finding and update this plan with those specifics.

3) Implement code fixes in the reported files and update or add tests. If a fix touches API input handling, ensure validation and error responses remain explicit and secure.

4) Run the Fortify scan in an approved environment from `rpx-xui-webapp` (the script lives in `rpx-xui-webapp/package.json`, so running it from the workspace root will fail). The repo includes `.tool-versions` to pin Java Corretto 17.0.15.6.1 for `asdf`:

    yarn fortifyScan

   Expect the Fortify client to upload the scan and produce `test_codecept/java/Fortify Scan/FortifyScanReport.html`.

## Validation and Acceptance

The nightly pipeline passes the Fortify stage without HIGH findings, and Jenkins archives `Fortify Scan/FortifyScanReport.html` from the workspace root. PR builds archive the Fortify report artifacts and no longer emit the `Fortify: unable to determine releaseId (expected config/fortify-client.properties)` warning. Locally, a Fortify scan (when run with valid credentials) produces the report in `test_codecept/java/Fortify Scan/` and the repository has no remaining HIGH findings in the Fortify report.

## Idempotence and Recovery

The Jenkinsfile copy step is safe to run repeatedly and does not alter scan inputs. If a remediation causes regressions, revert the specific code change and update the ExecPlan with the new approach, then re-run the scan.

## Artifacts and Notes

Reference log excerpt from the failing pipeline:

    Fortify Scan/FortifyScanReport.html doesn’t match anything, but test_codecept/java/Fortify Scan/FortifyScanReport.html does.

## Interfaces and Dependencies

The Fortify client is provided by `com.github.hmcts:fortify-client:1.4.10:all` (configured in `rpx-xui-webapp/test_codecept/java/build.gradle`). The Fortify scan is invoked by `yarn fortifyScan` in `rpx-xui-webapp/package.json` and the scan policy is configured in `rpx-xui-webapp/test_codecept/java/config/fortify-client.properties`.

## Plan Change Notes

2026-01-14: Initial ExecPlan created to cover Fortify HIGH remediation and artifact archiving.
2026-01-14: Marked the Jenkinsfile_nightly Fortify artifact copy step as complete after updating the pipeline.
2026-01-14: Clarified the Fortify scan working directory and noted the Java toolchain requirement.
2026-01-14: Added `.tool-versions` to pin Java Corretto 17.0.15.6.1 for local Fortify runs.
2026-01-14: Noted that local Fortify uploads may require adding the HMCTS CA chain to the Java truststore.
2026-01-14: Configured CNP Fortify scans to use the `rpx-aat` Key Vault for PR builds.
2026-01-15: Added CNP Fortify report archiving and staged `config/fortify-client.properties` for Fortify metadata lookups.
