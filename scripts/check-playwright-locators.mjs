import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIRS = ['playwright_tests_new/E2E/page-objects', 'playwright_tests_new/E2E/test'];
const STRICT = process.env.STRICT_PLAYWRIGHT_LOCATORS === 'true';

const RULES = [
  {
    id: 'no-xpath-engine',
    pattern: /locator\(\s*['"`]xpath=/g,
    message: 'Avoid XPath locators; prefer test id, role, label, or stable id.',
  },
  {
    id: 'no-text-engine',
    pattern: /locator\(\s*['"`]text=/g,
    message: 'Avoid text engine locators; prefer getByRole/getByLabel/getByTestId or stable id.',
  },
  {
    id: 'css-descendant-chain',
    pattern: /locator\(\s*['"`][^'"`]*(\.[\w-]+\s+){2,}[^'"`]*['"`]/g,
    message: 'Potentially brittle class-chain locator detected; use semantic locator if possible.',
  },
];

function walk(dir) {
  const absolute = join(ROOT, dir);
  const entries = readdirSync(absolute, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(absolute, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(join(dir, entry.name)));
      continue;
    }
    if (entry.isFile() && /\.tsx?$/.test(entry.name)) {
      files.push(join(dir, entry.name));
    }
  }
  return files;
}

function findLine(content, index) {
  return content.slice(0, index).split('\n').length;
}

const findings = [];
for (const dir of TARGET_DIRS) {
  if (!existsSync(join(ROOT, dir))) {
    continue;
  }
  const files = walk(dir);
  for (const file of files) {
    const content = readFileSync(join(ROOT, file), 'utf8');
    if (content.includes('locator-audit:ignore-file')) {
      continue;
    }

    for (const rule of RULES) {
      const matches = content.matchAll(rule.pattern);
      for (const match of matches) {
        const idx = match.index ?? 0;
        const line = findLine(content, idx);
        const lineText = content.split('\n')[line - 1] || '';
        if (lineText.includes('locator-audit:ignore-line')) {
          continue;
        }
        findings.push({ file, line, rule: rule.id, message: rule.message, snippet: lineText.trim().slice(0, 180) });
      }
    }
  }
}

if (findings.length === 0) {
  console.log('[locator-audit] no high-risk locator patterns found');
  process.exit(0);
}

console.log(`[locator-audit] findings=${findings.length}`);
for (const finding of findings.slice(0, 200)) {
  console.log(`[locator-audit] ${finding.file}:${finding.line} ${finding.rule} - ${finding.message}`);
  console.log(`  ${finding.snippet}`);
}

if (STRICT) {
  console.error('[locator-audit] strict mode enabled; failing due to locator findings');
  process.exit(1);
}

console.log('[locator-audit] non-strict mode; report only');
