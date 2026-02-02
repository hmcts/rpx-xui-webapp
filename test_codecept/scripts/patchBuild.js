// scripts/patchBuild.js
const fs   = require('fs');
const path = require('path');

const distRoot  = path.resolve(__dirname, '../../dist/rpx-exui');
const candidateIndexPaths = [
  // Older Angular builds
  path.join(distRoot, 'index.html'),
  // Angular application builder output (browser bundle)
  path.join(distRoot, 'browser', 'index.html')
];

const indexPath = candidateIndexPaths.find((p) => fs.existsSync(p));

if (!indexPath) {
  const existing = fs.existsSync(distRoot) ? fs.readdirSync(distRoot).join(', ') : '(dist root missing)';
  throw new Error(
    '[patchBuild] Could not find index.html. Tried:\n' +
    candidateIndexPaths.map((p) => ` - ${p}`).join('\n') +
    `\n\nContents of dist root (${distRoot}): ${existing}\n` +
    'Did the Angular build run (yarn build:prod) before patch:static?'
  );
}

let html = fs.readFileSync(indexPath, 'utf8');

/* 1) Replace other app placeholders (keep as-is) */
const cfg = {
  launchDarklyClientId: 'local-test',
  analyticsKey:         '',
  appInsightsKey:       '',
  buildVersion:         'test-run'
};
for (const [k, v] of Object.entries(cfg)) {
  html = html.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g'), v);
}

/* 2) DO NOT touch {{cspNonce}}.  The server injects it per-request. */
// (intentionally no replacement of {{cspNonce}})

/* 3) Optional: meta CSP tweak (header still wins; ok to keep or remove) */
html = html.replace(
  /<meta\s+http-equiv=["']Content-Security-Policy["'][^>]*>/i,
  (tag) => {
    const extraConnect = [
      "'self'","blob:","data:",
      "http://localhost:3000","http://localhost:8080","ws:","wss:",
      "*.launchdarkly.com","dc.services.visualstudio.com"
    ];
    return /connect-src/i.test(tag)
      ? tag.replace(/connect-src[^;]*/i, `connect-src ${extraConnect.join(' ')}`)
      : tag.replace(/content=["']([^"']*)["']/i, (m, policy) =>
          m.replace(policy, `connect-src ${extraConnect.join(' ')}; ${policy}`));
  }
);

fs.writeFileSync(indexPath, html, 'utf8');

/* 4) fixtures (unchanged) */
const cfgDir  = path.join(distRoot, 'external', 'configuration-ui');
fs.mkdirSync(cfgDir, { recursive: true });
const cfgText = JSON.stringify(cfg, null, 2);
fs.writeFileSync(path.join(cfgDir, 'index.json'), cfgText, 'utf8');
fs.writeFileSync(path.join(cfgDir, 'index.html'), cfgText, 'utf8');

console.log('[patchBuild] index.html patched and configuration-ui/index.(json|html) written');
