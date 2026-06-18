#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('node:fs');
const path = require('node:path');

const [eventsFile, label, type] = process.argv.slice(2);

if (!eventsFile || !label || !type) {
  console.error('Usage: node scripts/playwright-load-event.js <events-file> <label> <start|finish|mark>');
  process.exitCode = 1;
} else {
  fs.mkdirSync(path.dirname(eventsFile), { recursive: true });
  fs.appendFileSync(
    eventsFile,
    `${JSON.stringify({
      label,
      type,
      timestamp: new Date().toISOString(),
      epochMs: Date.now(),
      source: 'jenkins',
    })}\n`
  );
}
