import type { TestInfo } from '@playwright/test';
import * as fs from 'fs/promises';
import * as path from 'path';
import { escapeAttribute, escapeHtml, publishAccessibilityEvidence, sanitiseFileName } from './accessibilityEvidencePublisher';

export type LighthouseAuditEvidence = {
  message: string;
  evidenceFiles: string[];
};

const LIGHTHOUSE_REPORT_DIR = 'test-results';

export async function runLighthouseAuditWithEvidence(
  testInfo: TestInfo,
  audit: () => Promise<void>,
  context: {
    feature: string;
    pageState: string;
    url: string;
  },
  screenshot?: Buffer
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
  const safeTitle = sanitiseFileName(testInfo.title);
  const attachmentPrefix = 'lighthouse-accessibility';
  const reportFileName = `${safeTitle}-lighthouse-report.html`;
  const summaryFileName = `${safeTitle}-${attachmentPrefix}.html`;
  const summaryHtml = buildSummaryHtml(context, reportFileName);
  await publishAccessibilityEvidence(testInfo, {
    attachmentPrefix,
    entry: {
      engine: 'lighthouse',
      feature: context.feature,
      pageState: context.pageState,
      url: context.url,
      violationCount: 0,
      rules: ['accessibility-threshold'],
      targets: [context.url],
      summaryFileName,
      reportFileName,
    },
    html: summaryHtml,
    json: {
      engine: 'lighthouse',
      feature: context.feature,
      pageState: context.pageState,
      url: context.url,
      violationCount: 0,
      rules: ['accessibility-threshold'],
      targets: [context.url],
      summaryFileName,
      reportFileName,
    },
    screenshot,
    extraFiles: [{ fileName: reportFileName, body: rawReport }],
  });

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
