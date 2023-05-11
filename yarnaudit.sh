yarn npm audit --environment production --json | jq -cr '.advisories| to_entries[] | {"type": "auditAdvisory", "data": { "advisory": .value }}' > yarn-audit-known-issues
