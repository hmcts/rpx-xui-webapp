#!/usr/bin/env bash
set -euo pipefail

# Backward-compatible wrapper retained for existing docs and muscle memory.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
exec bash "${SCRIPT_DIR}/populate-env-from-keyvault.sh" "${1:-aat}" "${2:-.env}" "${3:-.env.example}"
