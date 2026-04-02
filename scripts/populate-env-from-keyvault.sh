#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-aat}"
OUT_FILE="${2:-.env}"
TEMPLATE_FILE="${3:-.env.example}"

case "${ENVIRONMENT}" in
  aat|AAT)
    VAULT="rpx-aat"
    ;;
  demo|DEMO)
    VAULT="rpx-demo"
    ;;
  *)
    echo "Usage: $0 [aat|demo] [output_file] [template_file]"
    exit 1
    ;;
esac

if ! command -v az >/dev/null 2>&1; then
  echo "Azure CLI is required. Install it and run 'az login' first."
  exit 1
fi

if [ ! -f "${TEMPLATE_FILE}" ]; then
  echo "Template file not found: ${TEMPLATE_FILE}"
  exit 1
fi

echo "Populating ${OUT_FILE} using ${VAULT} and template ${TEMPLATE_FILE}"
node ./node_modules/@hmcts/playwright-common/dist/scripts/get-secrets.js "${VAULT}" "${TEMPLATE_FILE}" "${OUT_FILE}"

node - "${OUT_FILE}" <<'NODE'
const fs = require('fs');

const outFile = process.argv[2];
const content = fs.readFileSync(outFile, 'utf-8');
const lines = content.split(/\r?\n/);

const env = {};
for (const line of lines) {
  if (!line || line.startsWith('#') || !line.includes('=')) continue;
  const index = line.indexOf('=');
  env[line.slice(0, index)] = line.slice(index + 1);
}

function firstNonEmpty(...values) {
  for (const value of values) {
    if (typeof value === 'string' && value.trim() !== '') {
      return value.trim();
    }
  }
  return '';
}

function normalizeIdamApiBaseUrl(value) {
  const trimmed = value.trim().replace(/\/+$/, '');
  try {
    const parsed = new URL(trimmed);
    parsed.hostname = parsed.hostname.replace(/^idam-testing-support-api\./i, 'idam-api.');
    const normalizedPath = parsed.pathname
      .replace(/\/+$/, '')
      .replace(/\/test\/idam\/burner\/users$/i, '')
      .replace(/\/test\/idam\/users$/i, '')
      .replace(/\/testing-support\/accounts$/i, '')
      .replace(/\/o\/token$/i, '')
      .replace(/\/o\/authorize$/i, '')
      .replace(/\/o$/i, '');
    parsed.pathname = normalizedPath || '';
    parsed.search = '';
    parsed.hash = '';
    return parsed.toString().replace(/\/+$/, '');
  } catch {
    return trimmed;
  }
}

function deriveIdamApiUrl() {
  const explicit = firstNonEmpty(env.IDAM_API_URL, env.SERVICES_IDAM_API_URL);
  if (explicit) {
    return normalizeIdamApiBaseUrl(explicit);
  }

  const testingSupportUrl = firstNonEmpty(env.IDAM_TESTING_SUPPORT_URL);
  if (testingSupportUrl) {
    return normalizeIdamApiBaseUrl(testingSupportUrl);
  }

  const idamWebUrl = firstNonEmpty(env.IDAM_WEB_URL, env.SERVICES_IDAM_WEB_URL);
  if (idamWebUrl) {
    try {
      const parsed = new URL(idamWebUrl.trim());
      parsed.hostname = parsed.hostname.replace(/^idam-web-public\./i, 'idam-api.');
      parsed.pathname = '';
      parsed.search = '';
      parsed.hash = '';
      return parsed.toString().replace(/\/+$/, '');
    } catch {
      return '';
    }
  }

  const testEnv = firstNonEmpty(env.TEST_ENV, 'aat');
  return `https://idam-api.${testEnv}.platform.hmcts.net`;
}

function setValue(key, value) {
  if (!value) return;
  env[key] = value;
}

setValue('CLIENT_ID', firstNonEmpty(env.CLIENT_ID, env.IDAM_CLIENT_ID));
setValue('CREATE_USER_CLIENT_ID', firstNonEmpty(env.CREATE_USER_CLIENT_ID, env.IDAM_CLIENT_ID));
setValue('CREATE_USER_CLIENT_SECRET', firstNonEmpty(env.CREATE_USER_CLIENT_SECRET, env.IDAM_SECRET));
setValue('IDAM_API_URL', deriveIdamApiUrl());
setValue(
  'MANAGE_CASE_REDIRECT_URI',
  firstNonEmpty(env.MANAGE_CASE_REDIRECT_URI, env.ORG_USER_ASSIGNMENT_REDIRECT_URI)
);
setValue('SOLICITOR_CASE_TYPE', firstNonEmpty(env.SOLICITOR_CASE_TYPE, env.CASE_TYPE));
setValue('SOLICITOR_JURISDICTION', firstNonEmpty(env.SOLICITOR_JURISDICTION, env.JURISDICTION));

const updatedLines = lines.map((line) => {
  if (!line || line.startsWith('#') || !line.includes('=')) {
    return line;
  }
  const index = line.indexOf('=');
  const key = line.slice(0, index);
  if (Object.prototype.hasOwnProperty.call(env, key)) {
    return `${key}=${env[key]}`;
  }
  return line;
});

fs.writeFileSync(outFile, updatedLines.join('\n'), 'utf-8');
NODE

echo "Done. Generated ${OUT_FILE}"
