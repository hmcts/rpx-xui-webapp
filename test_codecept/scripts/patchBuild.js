// scripts/patchBuild.js
const fs     = require('fs');
const path   = require('path');
const crypto = require('crypto');

const distRoot  = path.resolve(__dirname, '../../dist/rpx-exui');
const indexPath = path.join(distRoot, 'index.html');
let   html      = fs.readFileSync(indexPath, 'utf8');

/* 2. Replace other placeholders */
const cfg = {
  launchDarklyClientId: 'local-test',
  analyticsKey:         '',
  appInsightsKey:       '',
  buildVersion:         'test-run'
};
for (const [k, v] of Object.entries(cfg)) {
  html = html.replace(new RegExp(`\\{\\{\\s*${k}\\s*\\}\\}`, 'g'), v);
}

/* 3. Widen connect-src */
html = html.replace(
  /<meta http-equiv="Content-Security-Policy"[^>]+?>/i,
  tag => tag.replace(/connect-src[^;]*/, "connect-src 'self' http://localhost:8080")
);

fs.writeFileSync(indexPath, html, 'utf8');

/* 4. ─── create dist/rpx-exui/external/configuration-ui/index.json ─── */
const cfgDir  = path.join(distRoot, 'external', 'configuration-ui');
fs.mkdirSync(cfgDir, { recursive: true });
const cfgText = JSON.stringify(cfg, null, 2);

fs.writeFileSync(path.join(cfgDir, 'index.json'), cfgText, 'utf8');
fs.writeFileSync(path.join(cfgDir, 'index.html'), cfgText, 'utf8');

console.log('[patchBuild] configuration-ui/index.(json|html) written');
