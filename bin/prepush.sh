#!/bin/bash
yarn cve:check & pid1=$!
yarn lint & pid2=$!
yarn test:coverage:ng:prepush & pid3=$!

wait $pid1; status1=$?
wait $pid2; status2=$?
wait $pid3; status3=$?

failed=""
if [ $status1 -ne 0 ]; then 
  failed="$failed cve:check"
fi
if [ $status2 -ne 0 ]; then 
  failed="$failed lint"
fi
if [ $status3 -ne 0 ]; then 
  failed="$failed test:coverage:ng:prepush"
fi

if [ -n "$failed" ]; then
  printf "=============================================================\n" >&2
  printf "The following commands failed:$failed\n" >&2
  if [ $status1 -ne 0 ]; then
    printf "\n" >&2
    printf "There are unsupressed vulnerabilities, you can run ( yarn cve:fix ) to auto fix this\n" >&2
    printf "\n" >&2
  fi
  printf "=============================================================\n" >&2
  exit 1
fi