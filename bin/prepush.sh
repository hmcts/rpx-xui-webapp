#!/bin/bash

yarn npm audit --recursive --environment production --json > yarn-audit-known-issues
cve_suppress_status=$?

if [ $cve_suppress_status -ne 0 ] && [ ! -s yarn-audit-known-issues ]; then
  printf "=============================================================\n" >&2
  printf "Unable to refresh yarn-audit-known-issues\n" >&2
  printf "=============================================================\n" >&2
  exit $cve_suppress_status
fi

if ! git diff --quiet -- yarn-audit-known-issues; then
  printf "=============================================================\n" >&2
  printf "yarn-audit-known-issues was refreshed with the latest CVE audit output.\n" >&2
  printf "Commit yarn-audit-known-issues and push again.\n" >&2
  printf "=============================================================\n" >&2
  exit 1
fi

yarn lint & pid2=$!
yarn test:coverage:ng:prepush & pid3=$!

wait $pid2; status2=$?
wait $pid3; status3=$?

failed=""
if [ $status2 -ne 0 ]; then 
  failed="$failed lint"
fi
if [ $status3 -ne 0 ]; then 
  failed="$failed test:coverage:ng:prepush"
fi

if [ -n "$failed" ]; then
  printf "=============================================================\n" >&2
  printf "The following commands failed:$failed\n" >&2
  printf "=============================================================\n" >&2
  exit 1
fi
