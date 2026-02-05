# Package Review Notes - rpx-xui-webapp

Date: 2026-02-05

Summary:
- Reviewed package usage with `@hmcts/ccd-case-ui-toolkit` and `@hmcts/rpx-xui-common-lib` dependencies in mind.
- Kept toolkit/common-lib transitive dependencies even if not directly referenced in this repo.

Changes:
- Moved test-only packages to `devDependencies`:
  - `accessibility-checker`
  - `get-port`
  - `git-rev-sync`
  - `portfinder`
  - `prettier`
- Removed unused dependencies:
  - `@angular/ssr`
  - `crypto-js`
  - `form-data`
  - `local-storage`
  - `p-iteration`
  - `smoothscroll-polyfill`
- Removed unused devDependencies:
  - `@types/applicationinsights-js`
  - `@types/crypto-js`
  - `node-fetch`
- Added peer dependency providers (root):
  - `@typescript-eslint/types`
  - `@typescript-eslint/utils`
  - `axe-core`
  - `jasmine-core`
  - `moment`
  - `playwright-core`
  - `tslint`
- Added peer dependency providers (api workspace):
  - `launchdarkly-js-client-sdk`
  - `ngx-pagination`
  - `rpx-xui-translation`
- Aligned version ranges to reduce YN0060 warnings:
  - `@playwright/test` -> `^1.57.0`
  - `@stryker-mutator/mocha-runner` -> `^8.0.0`
  - `mocha` -> `^8.4.0`
  - `zone.js` -> `~0.14.0`
- Removed unused devDependency:
  - `webpack-source-map-support`

Notes:
- `launchdarkly-js-client-sdk`, `ngx-pagination`, `ngx-markdown`, `pegjs`, `marked`, `lz-string`, `moment-timezone`, `ngx-chips`, `exceljs`, and `file-saver` are retained for toolkit/common-lib compatibility.

