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

Notes:
- `launchdarkly-js-client-sdk`, `ngx-pagination`, `ngx-markdown`, `pegjs`, `marked`, `lz-string`, `moment-timezone`, `ngx-chips`, `exceljs`, and `file-saver` are retained for toolkit/common-lib compatibility.

