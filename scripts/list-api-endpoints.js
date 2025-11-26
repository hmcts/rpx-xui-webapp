#!/usr/bin/env node
/**
 * Extracts API endpoints used in Playwright node-api tests.
 * Optionally compares against an inventory file (JSON array or newline-separated list).
 *
 * Usage:
 *   node scripts/list-api-endpoints.js [--inventory path]
 */
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const inventoryFlagIndex = args.indexOf('--inventory');
const inventoryPath = inventoryFlagIndex >= 0 ? args[inventoryFlagIndex + 1] : undefined;

const testRoot = path.resolve(__dirname, '..', 'playwright_tests_new', 'api');

function readFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(readFiles(full));
    } else if (entry.isFile() && full.endsWith('.ts')) {
      files.push(full);
    }
  }
  return files;
}

function extractEndpoints(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /\b(apiClient|anonymousClient|client)\.(get|post|put|delete)\s*\(\s*['"`]([^'"`]+)['"`]/g;
  const matches = new Set();
  let match;
  while ((match = regex.exec(content)) !== null) {
    matches.add(match[3]);
  }
  return Array.from(matches);
}

function loadInventory(filePath) {
  if (!filePath) return undefined;
  const raw = fs.readFileSync(filePath, 'utf8');
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // not JSON, try newline-separated
  }
  return raw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

const files = readFiles(testRoot);
const endpoints = new Set();
files.forEach((file) => {
  extractEndpoints(file).forEach((ep) => endpoints.add(ep));
});

const inventory = inventoryPath ? loadInventory(inventoryPath) : undefined;
const testedList = Array.from(endpoints).sort();

console.log('Tested endpoints:', testedList.length);
console.log(testedList.join('\n'));

if (inventory) {
  const inventorySet = new Set(inventory);
  const missing = inventory.filter((ep) => !endpoints.has(ep));
  const covered = inventory.filter((ep) => endpoints.has(ep));
  console.log('\nInventory coverage:');
  console.log(`Total inventory: ${inventory.length}`);
  console.log(`Covered: ${covered.length}`);
  console.log(`Missing: ${missing.length}`);
  if (missing.length) {
    console.log('\nMissing endpoints:');
    console.log(missing.join('\n'));
  }
}
