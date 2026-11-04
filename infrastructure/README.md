# Manage Organisation login redirect reporting

The MO report counts HTTP 302 responses to `POST /login` for the
`xuimowebapp` client over the preceding 31 days. These are successful login
redirects, not a count of completed authenticated sessions or unique users.
The average per active day includes only days with at least one matching
redirect; it is not an average over 31 calendar days.

Production reporting stays disabled until recipients are configured:

1. Create `exui-mo-logins-stats-email` in the shared vault (`rpx-prod` for
   production). Set its value to one email address or a comma-separated list.
   Keep recipient addresses out of source control. The secret name can be
   overridden with `exui_mo_logins_stats_email_address_key`.
2. Set `exui_mo_logins_stats_enabled = true` for the target environment.
3. Review the Terraform plan before applying. The job's `recipientaddress`
   must resolve from the secret to a non-empty value. A missing secret or an
   empty recipient list must prevent deployment of the enabled job.

The schedule runs weekly on Thursday using `Etc/UTC`, matching Azure's stored
timezone identifier. This is UTC throughout the year, without daylight saving
changes. The runbook trims comma-separated recipients and fails before Azure
authentication or the Application Insights query if no recipients remain.
