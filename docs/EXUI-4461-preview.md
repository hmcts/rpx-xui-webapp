# EXUI-4461 preview candidate

This branch combines the webapp legacy document authorization repair (#5611),
regression coverage (#5612), and the library repairs below. It is a validation
candidate; production acceptance requires the complete live test evidence and
human review.

## Authorization boundary follow-up

Legacy GET and HEAD requests reject ambiguous path encodings before proxying.
Versioned binaries require current CCD case/document access and a DM metadata
check of the version's actual parent. The URL's parent ID alone is not proof of
that relationship. The same binary classification applies the HTML CSP to main
and versioned downloads. Canonical metadata and upload routes remain supported.
Enabled regressions cover wrong-case HEAD, encoded aliases, wrong-parent version
substitution and a version request by a user without case access.

## Review hold: pending upload previews

A real browser regression confirms that the current persisted-case guard rejects
a replacement document before the event is submitted, although the original
download and replacement upload succeed. Existing capability fixtures save their
documents first and do not cover this workflow. Legacy create-form previews also
need a verified supported fixture before acceptance; no browser claim is made for
that separate path.
The candidate must remain draft until pending-upload authorization is established
without weakening wrong-case or revoked-access denial. A session-owned upload ID
or creator-only fallback is insufficient once the document becomes attached.

Separate synthetic API probes verified the existing CDAM pending/attachment
lifecycle for `ET_EnglandWales` and `PRLAPPS`; PRL sharing and revocation also
behaved correctly. This identifies a concrete implementation direction, not a
global migration approval or proof that the current UI uses it. The remaining
change must retain upload hash tokens, use the pending-document authorization
path before submission, and preserve historical legacy reads after submission.

## Slow viewer startup repair

Live testing also exposed a handoff race: the toolkit sender stops after roughly
10 seconds, while a successful popup script download can take longer. A
nonce-protected receiver in the initial HTML now validates and stores the payload
before Angular loads. The component takes ownership synchronously, preserves the
consumed state and removes the early hook. Origin, opener, token, metadata and
replay checks apply; failed storage is never acknowledged. Existing sender retries
are unchanged. The regression uses the real toolkit menu action and delays popup
bootstrap for 12 seconds, then checks the selected document rendering and its
case-bound binary request. Existing live E2E tests separately require exact
download filenames and bytes.

This addresses delayed application bootstrap. If the initial HTML itself arrives
after the sender deadline, a future toolkit readiness protocol is still needed.

## Temporary library patches

The fixed npm releases were unavailable on 6 November 2026. The existing Yarn
patch mechanism makes the preview reproducible without publishing libraries or
changing the supported package baseline. Versions alone do not identify this
candidate: record the webapp commit, lockfile and patch hashes as well.

| Installed baseline                  | Upstream repair                                                 | Frozen source                              |
| ----------------------------------- | --------------------------------------------------------------- | ------------------------------------------ |
| `@hmcts/ccd-case-ui-toolkit@7.4.25` | [#2352](https://github.com/hmcts/ccd-case-ui-toolkit/pull/2352) | `c84bb66b57bb52fc67d81ff9793b843bd80b5cd0` |
| `@hmcts/media-viewer@4.2.47`        | [#133](https://github.com/hmcts/rpx-xui-media-viewer/pull/133)  | `adf5b3f490c2d49b0cbf8a934e7bba8cc29840b5` |

The toolkit patch combines the frozen upstream repair with the additional
[source repair and regression tests](EXUI-4461-toolkit-follow-up.patch). Live CI
found that callers could transform a CDAM URL twice, producing
`/documentsv2v2/...`. The shared transformation now preserves an already resolved
URL for the current case’s configured document store, with exact path boundaries
and origin checks. HRS rewriting and legacy case context remain intact.
The shared helper also retains case context and fragments on versioned binary
URLs. The webapp checks their actual parent using authoritative DM version
metadata; the caller-supplied parent alone is insufficient. Version-specific
annotation/conversion semantics in the viewer are not added by this repair.

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
legacy/CDAM neighbours. Include actual Firefox and WebKit journeys. The nightly WebKit project now
selects `Desktop Safari`; its former project name alone selected the default
Chromium engine. Mocked browser
checks cannot establish real CCD authorization or case-revocation behavior.

## Replace with official releases

After reviewed packages containing these fixes are published (currently planned
as toolkit 7.4.26 and viewer 4.2.48), verify their contents and update the two root
dependencies. The toolkit release must also include the additional idempotence
and version-context repairs: the frozen #2352 head alone is insufficient. Remove the exact viewer patch resolution and both EXUI-4461 patch
files. Keep the unrelated existing Odhín patch. Regenerate `yarn.lock`, assess the
audit delta, perform a fresh immutable install/build and rerun the same regression
matrix on the official package candidate. Passing this preview does not remove
that final verification step.

## Reproduce and verify the package patches

Use disposable source directories and existing installed dependency trees. The
verified toolkit toolchain was Node **24.22.1**, ng-packagr **20.3.2**, TypeScript
**5.9.3**, Angular core/compiler/compiler-cli **20.3.31**, Angular
Material/CDK/material-moment-adapter **20.2.14**, and govuk-frontend **5.13.0**.
The dependency overlay takes toolkit packages first, fills missing packages from
the webapp, then selects the webapp's three Material/CDK packages explicitly.
Those compiler versions differ from some webapp dependencies: using only the
webapp's `node_modules` is not the verified recipe.

Set `TOOLKIT_REPO` to a toolkit clone containing both pinned commits, and
`WEBAPP_ROOT` to this PR checkout; both need their installed dependency trees.
These variables are absolute paths. Run the following with Node 24.22.1 on
`PATH`. It does not install packages or alter either checkout.

```bash
set -euo pipefail
export TOOLKIT_REPO=/path/to/ccd-case-ui-toolkit
export WEBAPP_ROOT=/path/to/rpx-xui-webapp
export REBUILD_ROOT="$(mktemp -d)"
mkdir "$REBUILD_ROOT/base" "$REBUILD_ROOT/fixed"
git -C "$TOOLKIT_REPO" archive a34ae7b4aaa6f4429dd7e78aa73615e38fd0d84e | tar -x -C "$REBUILD_ROOT/base"
git -C "$TOOLKIT_REPO" archive c84bb66b57bb52fc67d81ff9793b843bd80b5cd0 | tar -x -C "$REBUILD_ROOT/fixed"
git -C "$REBUILD_ROOT/fixed" apply --check "$WEBAPP_ROOT/docs/EXUI-4461-toolkit-follow-up.patch"
git -C "$REBUILD_ROOT/fixed" apply "$WEBAPP_ROOT/docs/EXUI-4461-toolkit-follow-up.patch"
python3 - <<'PY'
import os
from pathlib import Path

for name in ('base', 'fixed'):
    modules = Path(os.environ['REBUILD_ROOT']) / name / 'node_modules'
    modules.mkdir()
    for variable in ('TOOLKIT_REPO', 'WEBAPP_ROOT'):
        source = Path(os.environ[variable]) / 'node_modules'
        for entry in source.iterdir():
            if entry.name.startswith('.'):
                continue
            if entry.name.startswith('@'):
                (modules / entry.name).mkdir(exist_ok=True)
                children = entry.iterdir()
            else:
                children = [entry]
            for child in children:
                destination = modules / child.relative_to(source)
                if not destination.exists():
                    destination.symlink_to(child, target_is_directory=True)
    for package in ('material', 'cdk', 'material-moment-adapter'):
        destination = modules / '@angular' / package
        destination.unlink()
        destination.symlink_to(Path(os.environ['WEBAPP_ROOT']) / 'node_modules/@angular' / package,
                               target_is_directory=True)
PY
for variant in base fixed; do
  (
    cd "$REBUILD_ROOT/$variant" || exit 1
    node node_modules/ng-packagr/src/cli/main.js \
      -p projects/ccd-case-ui-toolkit/ng-package.json \
      -c projects/ccd-case-ui-toolkit/tsconfig.lib.json || exit 1
    cd dist/ccd-case-ui-toolkit || exit 1
    shasum -a 256 fesm2022/hmcts-ccd-case-ui-toolkit.mjs \
      fesm2022/hmcts-ccd-case-ui-toolkit.mjs.map index.d.ts index.d.ts.map
  ) || exit 1
done
```

All eight SHA-256 values must match this table. A mismatch fails reproduction;
check source and dependency drift before accepting any replacement patch.
Matching the listed compiler versions alone does not prove every dependency is
identical, and an arbitrary fresh `yarn install` is not promised to reproduce
these bytes. The final hashes are the acceptance check for the entire overlay.

| Toolkit artifact                             | Published-source baseline (`base`)                                 | Upstream plus source repair (`fixed`)                              |
| -------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `fesm2022/hmcts-ccd-case-ui-toolkit.mjs`     | `67ec58d229ac5cb9496a5922fcfdb29dee6f80597b6844ad32e787345f49725b` | `d79baf18bfa0b1b6add86b8414286a5cfa285ab831d892494544d4c66c799a3c` |
| `fesm2022/hmcts-ccd-case-ui-toolkit.mjs.map` | `d87859d7dbc57a7e2fbcb8922404a38cdef341104db72517f6a894b1af445a57` | `fa5b5a8543eb65b26f004789208b95cade642a4de36ce79029801182b142954f` |
| `index.d.ts`                                 | `ca4322472acea9c394adb89c064df87426754e05f14ad297320487a5c9866faf` | `81b5b3a0eb0fb3f74b75aa314d1ae9bb1ee49d1854dce13551d1893a652a342a` |
| `index.d.ts.map`                             | `12b79991aa56f63cd0a88535442f63c3185601e354a31b8422ccb03514b3d1d3` | `d38b7c15ad5a3139a91e8278b8af197b13cf03ab31f5708ec618f21d3bcbb9e5` |

To verify patch application independently, copy a clean published toolkit
7.4.25 package into another disposable directory, confirm its four baseline
hashes, then run `git apply --check` and `git apply` there against this checkout's
toolkit `.yarn/patches/` file. Its four resulting hashes must equal `fixed` above.
The installed patched toolkit must have the same four hashes. No other package
files should change when applying the patch.

The viewer patch was **not rebuilt**: it inserts
`url = url.split(/[?#]/)[0];` at the start of `extractDMStoreDocId` in both
`ConvertibleContentViewerComponent` and `MediaViewerComponent`, preserving all
other runtime bytes and Angular partial declarations. For a source comparison,
use `git show` at frozen viewer commit
`adf5b3f490c2d49b0cbf8a934e7bba8cc29840b5` and its first parent for these files:

- `projects/media-viewer/src/lib/viewers/convertible-content-viewer/convertible-content-viewer.component.ts`
- `projects/media-viewer/src/lib/media-viewer.component.ts`

The baseline map's corresponding `sourcesContent` entries must equal the parent's
files; the patched entries must equal the frozen commit's files. Comparing the
JavaScript files must show exactly the two inserted statements. The map retains
63,062 original mapping segments with line shifts for those insertions and adds
54 character mappings; it changes neither unrelated source content nor source
ordering. Apply the committed viewer patch to a clean published 4.2.47 package
as above and verify both SHA-256 pairs:

| Viewer artifact                       | Published baseline                                                 | Patched                                                            |
| ------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `fesm2022/hmcts-media-viewer.mjs`     | `b6520997629386a027059f256d9312df9209ec677d9fadd9e4da86c2bd831dd5` | `44b115e9f0d58cfe7ba91d8bc1a89d54dcf5c3d66f3e8a98b316b8aee2ae6fc0` |
| `fesm2022/hmcts-media-viewer.mjs.map` | `e1b657678d4fcd3153da102bc24399a423e66dbede45819bf1688dfd51574049` | `139e6c7f5f203ce9cdd1c0276e5c0a9b3506d72182c6358f099d4bde444f1371` |

These checks establish source/package identity. They do not replace the preview
browser, backend authorization, cross-browser or human acceptance checks above.
