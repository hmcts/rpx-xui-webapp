# EXUI-4461 preview candidate

This branch combines the webapp legacy document authorization repair (#5611),
regression coverage (#5612), and the library repairs below. It is a validation
candidate; production acceptance requires the complete live test evidence and
human review.

## Temporary library patches

The fixed npm releases were unavailable on 6 November 2026. The existing Yarn
patch mechanism makes the preview reproducible without publishing libraries or
changing the supported package baseline. Versions alone do not identify this
candidate: record the webapp commit, lockfile and patch hashes as well.

| Installed baseline                  | Upstream repair                                                 | Frozen source                              |
| ----------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| `@hmcts/ccd-case-ui-toolkit@7.4.25` | [#2352](https://github.com/hmcts/ccd-case-ui-toolkit/pull/2352) | `c84bb66b57bb52fc67d81ff9793b843bd80b5cd0` |
| `@hmcts/media-viewer@4.2.47`        | [#133](https://github.com/hmcts/rpx-xui-media-viewer/pull/133)  | `adf5b3f490c2d49b0cbf8a934e7bba8cc29840b5` |

The toolkit patch includes its rebuilt full Angular output, input/template
metadata, declarations and source maps. Rebuilding the source baseline produced
byte-identical output to the published package before the repair was applied.
The viewer patch adds the two upstream document-ID parsing statements and updates
the existing source map without changing its partial Angular compilation format.
Package versions, dependency declarations, assets and licences are preserved.

The root viewer dependency and the exact transitive viewer resolution both use
the patch. This is necessary because the toolkit also depends on the viewer.
The patches are required during installation; neither uses Yarn's `optional!`
patch flag. The `~` in Yarn's generated patch path denotes the project root.

The large patch sizes principally reflect the single-line source maps. Do not
remove those maps or hand-edit compiled Angular metadata to reduce the diff.
The existing Dockerfile copies `.yarn/` before dependency installation; no new
Docker or pipeline mechanism is required.

## Preview and acceptance

Retain the draft PR deployment using the existing `enable_keep_helm` label. Record
the actual deployment URL, image/commit identity and patch identity, and assign an
environment owner and review/end date. The preview uses shared AAT services; use
synthetic cases and approved test users. The label is not a guarantee against
other platform cleanup policies.

Set `TEST_URL` to that preview when running the repository API, integration and
E2E runners. Execute the document required-scenario receipts in
`playwright_tests_new/common/document-download-required-scenarios.json`; listing
those scenarios is not execution evidence. Record failures, skips and retries.

Acceptance requires authorised owner/shared-user access with exact original
filename/bytes and denial for wrong-case, inaccessible-case, anonymous and revoked
access. Also verify direct HTML, Case File View open/download/print, fresh viewer
handoff/reload, annotations/bookmarks, conversion/original download, uploads and
legacy/CDAM neighbours. Include actual Firefox and WebKit journeys. Mocked browser
checks cannot establish real CCD authorization or case-revocation behavior.

## Replace with official releases

After reviewed packages containing these fixes are published (currently planned
as toolkit 7.4.26 and viewer 4.2.48), verify their contents and update the two root
dependencies. Remove the exact viewer patch resolution and both EXUI-4461 patch
files. Keep the unrelated existing Odhín patch. Regenerate `yarn.lock`, assess the
audit delta, perform a fresh immutable install/build and rerun the same regression
matrix on the official package candidate. Passing this preview does not remove
that final verification step.
