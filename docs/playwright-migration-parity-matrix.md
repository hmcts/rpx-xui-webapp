# Playwright Migration Parity Matrix

This matrix is the source of truth for Codecept to Playwright migration closure in rpx-xui-webapp.

## Status definitions

- covered: Legacy journey is implemented in Playwright and passing in CI.
- partial: Legacy journey exists in Playwright but has known missing assertions or scenarios.
- port: Legacy journey is planned for implementation.
- obsolete: Legacy journey is intentionally retired.
- out-of-scope: Owned by another repo or test suite.

## Matrix

| Legacy source | Journey | Target Playwright layer | Target spec(s) | Status | Evidence |
| --- | --- | --- | --- | --- | --- |
| test_codecept/e2e/features/app/shareCase.feature | Share Case flow | integration | playwright_tests_new/integration/test/shareCase/shareCase.positive.spec.ts | port | pending |
| test_codecept/e2e/features/app/caseListSelection.feature | Case list multi-selection | integration | playwright_tests_new/integration/test/shareCase/caseListSelection.positive.spec.ts | port | pending |
| test_codecept/e2e/features/app/mediaViewer.feature | Media viewer tools | e2e | playwright_tests_new/E2E/test/mediaViewer/mediaViewerTools.positive.spec.ts | port | pending |
| test_codecept/ngIntegration/tests/hiddenFields.test.js | Hidden fields payload omission | integration | playwright_tests_new/integration/test/createCase/createCase.fields.positive.spec.ts | partial | EXUI-4317 open |
| test_codecept/ngIntegration/tests/caseFieldCollectionsPermissions.test.js | Collection display context matrix | integration | playwright_tests_new/integration/test/createCase/createCase.fields.negative.spec.ts | port | pending |

## Notes

This is the initial seed matrix for EXUI-4684 and will be expanded to include all legacy suites in scope before closure sign-off.
