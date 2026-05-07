#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
GRADLEW="${FORTIFY_SCAN_GRADLEW:-${ROOT_DIR}/test_codecept/java/gradlew}"
PROJECT_DIR="${FORTIFY_SCAN_PROJECT_DIR:-${ROOT_DIR}/test_codecept/java}"
MAX_ATTEMPTS="${FORTIFY_SCAN_MAX_ATTEMPTS:-3}"
BACKOFF_SECONDS="${FORTIFY_SCAN_RETRY_BACKOFF_SECONDS:-30}"

is_retryable_dependency_failure() {
  local output_file="$1"

  grep -Eiq 'status code 429|Too Many Requests' "${output_file}"
}

run_fortify_gradle() {
  local output_file
  local status

  output_file="$(mktemp "${TMPDIR:-/tmp}/fortify-scan.XXXXXX.log")"

  set +e
  "${GRADLEW}" -p "${PROJECT_DIR}" resolveFortifyDependencies fortifyScan 2>&1 | tee "${output_file}"
  status=${PIPESTATUS[0]}
  set -e

  if [[ "${status}" -eq 0 ]]; then
    rm -f "${output_file}"
    return 0
  fi

  if is_retryable_dependency_failure "${output_file}"; then
    rm -f "${output_file}"
    return 75
  fi

  rm -f "${output_file}"
  return "${status}"
}

attempt=1

while [[ "${attempt}" -le "${MAX_ATTEMPTS}" ]]; do
  echo "Running Fortify scan attempt ${attempt}/${MAX_ATTEMPTS}"

  set +e
  run_fortify_gradle
  status=$?
  set -e

  if [[ "${status}" -eq 0 ]]; then
    exit 0
  fi

  if [[ "${status}" -ne 75 || "${attempt}" -eq "${MAX_ATTEMPTS}" ]]; then
    exit "${status}"
  fi

  echo "Fortify dependency resolution was throttled; retrying in ${BACKOFF_SECONDS}s"
  sleep "${BACKOFF_SECONDS}"
  attempt=$((attempt + 1))
done

exit 1
