#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-aat}"
OUT_FILE="${2:-.env}"
TEMPLATE_FILE="playwright_tests_new/.env.example"

case "${ENVIRONMENT}" in
  aat|AAT)
    VAULT="rpx-aat"
    ;;
  demo|DEMO)
    VAULT="rpx-demo"
    ;;
  *)
    echo "Usage: $0 [aat|demo] [output_file]"
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
echo "Done. Generated ${OUT_FILE}"
