import type { TestInfo } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';

export type LighthouseAuditEvidence = {
  message: string;
  evidenceFiles: string[];
};

type LighthouseEvidenceEntry = {
  testTitle: string;
  feature: string;
  pageState: string;
  url: string;
  summaryFileName: string;
  reportFileName: string;
};

const LIGHTHOUSE_ENTRY_PREFIX = 'lighthouse-entry-';
const LIGHTHOUSE_REPORT_DIR = 'test-results';

export async function runLighthouseAuditWithEvidence(
  testInfo: TestInfo,
  audit: () => Promise<void>,
  context: {
    feature: string;
    pageState: string;
    url: string;
  }
): Promise<LighthouseAuditEvidence> {
  const beforeReports = new Set(await listLighthouseReports());
  await audit();

  const lighthouseReportPath = await findGeneratedLighthouseReport(beforeReports);
  if (!lighthouseReportPath) {
    const message = 'Lighthouse audit passed, but no generated Lighthouse HTML report was found under test-results.';
    await testInfo.attach('lighthouse-accessibility-summary.html', {
      body: buildMissingReportHtml(context, message),
      contentType: 'text/html',
    });
    return { message, evidenceFiles: [] };
  }

  const rawReport = await fs.readFile(lighthouseReportPath);
  const evidenceDir = getEvidenceDir();
  const safeTitle = sanitiseFileName(testInfo.title);
  const reportFileName = `${safeTitle}-lighthouse-report.html`;
  const summaryFileName = `${safeTitle}-lighthouse-summary.html`;
  const summaryHtml = buildSummaryHtml(context, reportFileName);
  const entry: LighthouseEvidenceEntry = {
    testTitle: testInfo.title,
    feature: context.feature,
    pageState: context.pageState,
    url: context.url,
    summaryFileName,
    reportFileName,
  };

  await fs.mkdir(evidenceDir, { recursive: true });
  await fs.writeFile(path.join(evidenceDir, reportFileName), rawReport);
  await fs.writeFile(path.join(evidenceDir, summaryFileName), summaryHtml);
  await fs.writeFile(path.join(evidenceDir, `${LIGHTHOUSE_ENTRY_PREFIX}${safeTitle}.json`), JSON.stringify(entry, null, 2));
  await writeLighthouseIndex(evidenceDir);

  await testInfo.attach('lighthouse-accessibility-summary.html', {
    body: summaryHtml,
    contentType: 'text/html',
  });
  await testInfo.attach('lighthouse-accessibility-report.html', {
    body: rawReport,
    contentType: 'text/html',
  });

  return {
    message: `Lighthouse report published: accessibility-evidence/${summaryFileName}`,
    evidenceFiles: [summaryFileName, reportFileName],
  };
}

async function listLighthouseReports(): Promise<string[]> {
  try {
    const entries = await fs.readdir(LIGHTHOUSE_REPORT_DIR);
    return entries
      .filter((entry) => /^lighthouse-report-\d+\.html$/.test(entry))
      .map((entry) => path.resolve(LIGHTHOUSE_REPORT_DIR, entry));
  } catch {
    return [];
  }
}

async function findGeneratedLighthouseReport(beforeReports: Set<string>): Promise<string | undefined> {
  const reports = await listLighthouseReports();
  const newReports = reports.filter((report) => !beforeReports.has(report));
  const candidates = newReports.length > 0 ? newReports : reports;
  const stats = await Promise.all(
    candidates.map(async (report) => ({
      report,
      mtimeMs: (await fs.stat(report)).mtimeMs,
    }))
  );

  return stats.sort((a, b) => b.mtimeMs - a.mtimeMs)[0]?.report;
}

function getEvidenceDir(): string {
  return path.resolve(
    process.env.PW_A11Y_EVIDENCE_DIR ||
      path.join(
        process.env.PLAYWRIGHT_REPORT_FOLDER || 'functional-output/tests/playwright-accessibility/odhin-report',
        'accessibility-evidence'
      )
  );
}

function buildSummaryHtml(
  context: {
    feature: string;
    pageState: string;
    url: string;
  },
  reportFileName: string
): string {
  return `
    <html>
      <head>
        <title>Lighthouse Accessibility Evidence</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; color: #0b0c0c; background: #f3f2f1; }
          .layout { display: grid; grid-template-columns: minmax(280px, 360px) 1fr; min-height: 100vh; }
          .panel { background: #e6f0f7; border-right: 1px solid #b1b4b6; padding: 16px; }
          .panel h1 { margin-top: 0; font-size: 24px; }
          .metric { background: #fff; border-left: 6px solid #00703c; padding: 12px; margin-bottom: 12px; }
          .metric strong { display: block; font-size: 28px; }
          .content { background: #fff; padding: 24px; }
          .banner { background: #1d70b8; color: #fff; padding: 16px; margin-bottom: 24px; }
          .card { border: 1px solid #b1b4b6; padding: 16px; margin-bottom: 16px; }
          .cta { display: inline-block; background: #00703c; color: #fff; padding: 10px 16px; font-weight: bold; text-decoration: none; }
          code { background: #f3f2f1; padding: 2px 4px; }
        </style>
      </head>
      <body>
        <div class="layout">
          <aside class="panel">
            <h1>Lighthouse</h1>
            <div class="metric"><strong>90</strong>Accessibility threshold</div>
            <div class="metric"><strong>Report-only</strong>Default mode</div>
            <div class="metric"><strong>Scoped</strong>Representative states</div>
          </aside>
          <main class="content">
            <div class="banner">
              <h1>Lighthouse accessibility evidence</h1>
              <p>${escapeHtml(context.feature)} / ${escapeHtml(context.pageState)}</p>
            </div>
            <div class="card">
              <p><strong>URL:</strong> <code>${escapeHtml(context.url)}</code></p>
              <p>Lighthouse is intentionally scoped to stable representative pages in this pack. Axe and WAVE-like checks provide the broader page-state sweep.</p>
              <p><a class="cta" href="./${escapeAttribute(reportFileName)}">Open full Lighthouse HTML report</a></p>
            </div>
          </main>
        </div>
      </body>
    </html>
  `;
}

function buildMissingReportHtml(
  context: {
    feature: string;
    pageState: string;
    url: string;
  },
  message: string
): string {
  return `
    <html>
      <body>
        <h1>Lighthouse accessibility evidence</h1>
        <p><strong>${escapeHtml(context.feature)} / ${escapeHtml(context.pageState)}</strong></p>
        <p>${escapeHtml(message)}</p>
        <p><code>${escapeHtml(context.url)}</code></p>
      </body>
    </html>
  `;
}

async function writeLighthouseIndex(evidenceDir: string): Promise<void> {
  const entries = await readLighthouseEntries(evidenceDir);
  const rows = entries
    .sort((a, b) => a.testTitle.localeCompare(b.testTitle))
    .map(
      (entry) => `
        <li>
          <a class="issue-link" href="./${escapeAttribute(entry.summaryFileName)}">${escapeHtml(entry.testTitle)}</a>
          <p>${escapeHtml(entry.feature)} / ${escapeHtml(entry.pageState)}</p>
          <p><code>${escapeHtml(entry.url)}</code></p>
          <a href="./${escapeAttribute(entry.reportFileName)}">full Lighthouse report</a>
        </li>
      `
    )
    .join('');

  await fs.writeFile(
    path.join(evidenceDir, 'lighthouse-index.html'),
    `
      <html>
        <head>
          <title>Lighthouse Accessibility Evidence</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 24px; color: #0b0c0c; }
            .banner { background: #1d70b8; color: #fff; padding: 16px; margin-bottom: 24px; }
            .issue-link { font-weight: bold; font-size: 18px; }
            li { margin-bottom: 16px; }
            code { background: #f3f2f1; padding: 2px 4px; }
          </style>
        </head>
        <body>
          <div class="banner">
            <h1>LIGHTHOUSE ACCESSIBILITY EVIDENCE</h1>
            <p>Open each item for the scoped Lighthouse accessibility card and direct link to the native Lighthouse HTML report.</p>
          </div>
          <ol>${rows}</ol>
        </body>
      </html>
    `
  );
}

async function readLighthouseEntries(evidenceDir: string): Promise<LighthouseEvidenceEntry[]> {
  try {
    const fileNames = await fs.readdir(evidenceDir);
    const entries = await Promise.all(
      fileNames
        .filter((fileName) => fileName.startsWith(LIGHTHOUSE_ENTRY_PREFIX) && fileName.endsWith('.json'))
        .map(async (fileName) => {
          try {
            return JSON.parse(await fs.readFile(path.join(evidenceDir, fileName), 'utf8'));
          } catch {
            return undefined;
          }
        })
    );

    return entries.filter(isLighthouseEvidenceEntry);
  } catch {
    return [];
  }
}

function isLighthouseEvidenceEntry(value: unknown): value is LighthouseEvidenceEntry {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Partial<LighthouseEvidenceEntry>;
  return (
    typeof candidate.testTitle === 'string' &&
    typeof candidate.feature === 'string' &&
    typeof candidate.pageState === 'string' &&
    typeof candidate.url === 'string' &&
    typeof candidate.summaryFileName === 'string' &&
    typeof candidate.reportFileName === 'string'
  );
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replaceAll('`', '&#96;');
}

function sanitiseFileName(value: string): string {
  return (
    value
      .replace(/[^a-z0-9._-]+/gi, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 120) || 'lighthouse-accessibility'
  );
}
