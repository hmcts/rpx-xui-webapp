#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-aat}"
OUT_FILE="${2:-.env}"
TEMPLATE_FILE="playwright_tests_new/.env.example"

case "${ENVIRONMENT}" in
  aat|AAT)
    VAULT="rpx-aat"
    ENVIRONMENT_NAME="aat"
    ;;
  demo|DEMO)
    VAULT="rpx-demo"
    ENVIRONMENT_NAME="demo"
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

perl -0pi -e "s/^TEST_ENV=\$/TEST_ENV=${ENVIRONMENT_NAME}/m" "${OUT_FILE}"

populate_named_secret_if_empty() {
  local env_key="$1"
  local secret_name="$2"
  local secret_value

  if grep -Eq "^${env_key}=.+" "${OUT_FILE}"; then
    return
  fi

  secret_value="$(az keyvault secret show --vault-name "${VAULT}" --name "${secret_name}" --query value --output tsv 2>/dev/null || true)"
  if [ -z "${secret_value}" ]; then
    return
  fi

  ENV_FILE="${OUT_FILE}" ENV_KEY="${env_key}" ENV_VALUE="${secret_value}" node -e '
    const fs = require("node:fs");
    const file = process.env.ENV_FILE;
    const key = process.env.ENV_KEY;
    const value = process.env.ENV_VALUE;
    const source = fs.readFileSync(file, "utf8");
    fs.writeFileSync(file, source.replace(new RegExp(`^${key}=.*$`, "m"), `${key}=${value}`));
  '
  unset secret_value
  echo "Setting ${env_key} from named Key Vault secret ${secret_name}"
}

# Jenkins maps these long-lived platform secrets by name rather than by their e2e tag.
populate_named_secret_if_empty IDAM_API_URL idam-api-url
populate_named_secret_if_empty TEST_PASSWORD test-password

for REQUIRED_KEY in \
  IDAM_API_URL \
  S2S_SECRET \
  TEST_PASSWORD \
  WA_SOLICITOR_USERNAME \
  WA_SOLICITOR_PASSWORD \
  FPL_GLOBAL_SEARCH_USERNAME \
  FPL_GLOBAL_SEARCH_PASSWORD; do
  if ! grep -Eq "^${REQUIRED_KEY}=.+" "${OUT_FILE}"; then
    echo "Warning: ${REQUIRED_KEY} was not populated from ${VAULT}; add a tagged Key Vault secret with e2e=${REQUIRED_KEY}."
  fi
done

echo "Done. Generated ${OUT_FILE}"
