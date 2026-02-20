const { spawnSync } = require('node:child_process');
const path = require('node:path');

class OdhinPostprocessReporter {
  async onEnd() {
    if (process.env.PW_ODHIN_POSTPROCESS === 'false') {
      return;
    }

    const repoRoot = path.resolve(__dirname, '../../..');
    const scriptPath = path.resolve(__dirname, '../../../scripts/copy-odhin-report.js');
    const result = spawnSync(process.execPath, [scriptPath], {
      stdio: 'inherit',
      env: process.env,
      cwd: repoRoot,
    });

    if (result.error) {
      console.warn(`[odhin-postprocess] ${result.error.message}`);
      return;
    }

    if (typeof result.status === 'number' && result.status !== 0) {
      console.warn(`[odhin-postprocess] copy-odhin-report exited with status ${result.status}`);
    }
  }
}

module.exports = OdhinPostprocessReporter;
