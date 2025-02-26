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
  echo "============================================================="
  echo "The following commands failed:$failed"
  if [ $status1 -ne 0 ]; then
    echo ""
    echo "There are unsupressed vulnerabilities, you can run ( yarn cve:fix ) to auto fix this"
    echo ""
  fi
  echo "============================================================="
  exit 1
fi
