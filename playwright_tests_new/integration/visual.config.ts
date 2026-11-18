import { execFileSync } from 'node:child_process';
import { defineConfig, devices } from '@playwright/test';

// Explicit local visual run only; the normal integration configuration does not discover *.visual.ts.
const candidateSha = process.env.VISUAL_CANDIDATE_SHA?.trim();
if (!candidateSha) {
  throw new Error('Visual comparison requires VISUAL_CANDIDATE_SHA for the identified candidate build');
}
const currentSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (candidateSha !== currentSha) {
  throw new Error('Visual comparison candidate SHA does not match the checked-out build');
}
if (process.platform !== 'darwin') {
  throw new Error('Visual comparison is macOS-only until an approved Linux baseline exists');
}

export default defineConfig({
  metadata: {
    visualCandidateSha: candidateSha,
    visualCandidateUrl: 'http://127.0.0.1:4201',
  },
  testDir: './test/visual',
  testMatch: '**/*.visual.ts',
  retries: 0,
  workers: 1,
  reporter: 'list',
  expect: { toHaveScreenshot: { animations: 'disabled', maxDiffPixels: 0 } },
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4201',
    browserName: 'chromium',
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    locale: 'en-GB',
    timezoneId: 'Europe/London',
    colorScheme: 'light',
    reducedMotion: 'reduce',
    trace: 'retain-on-failure',
  },
  webServer: {
    command: 'yarn ng run rpx-exui:serveTest --host 127.0.0.1 --port 4201',
    cwd: '../..',
    url: 'http://127.0.0.1:4201',
    reuseExistingServer: false,
    timeout: 180_000,
  },
});
