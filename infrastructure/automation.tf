resource "azurerm_automation_account" "welsh_reporting" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-automation-${var.env}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  sku_name            = "Basic"

  identity {
    type = "SystemAssigned"
  }

  tags = var.common_tags
}

resource "azurerm_automation_runbook" "welsh_report_runbook" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  name                    = "Generate-Welsh-Report"
  location                = var.location
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  log_verbose             = true
  log_progress            = true
  description             = "Generates Monthly Welsh Language Usage Report"
  runbook_type            = "PowerShell"

  content = <<EOT
param(
    [string]$workspaceid,
    [string]$acsendpoint,
    [string]$senderaddress,
    [string]$recipientaddress
)

# Connect to Azure with Managed Identity
try {
    Connect-AzAccount -Identity
}
catch {
    Write-Error "Failed to login with Managed Identity. Ensure System Assigned Identity is enabled and has permissions."
    throw $_
}

$query = @"
let startTime = startofmonth(datetime_add('month', -1, startofmonth(now())));
let endTime = startofmonth(now());
let FilteredRequests = requests
| where timestamp between (startTime .. endTime)
| where url has "/api/translation/cy"
| extend day = startofday(timestamp);
let UniqueSessionsPerDay = FilteredRequests
| where isnotempty(session_Id)
| summarize by day, session_Id
| summarize SessionCount = count() by day;
let HasNoSession = FilteredRequests
| where isempty(session_Id)
| summarize HasMissingSessions = count() by day
| extend NoSessionAddition = iff(HasMissingSessions > 0, 1, 0);
UniqueSessionsPerDay
| join kind=fullouter HasNoSession on day
| extend
    SessionCount = coalesce(SessionCount, 0),
    NoSessionAddition = coalesce(NoSessionAddition, 0)
| extend TotalSessions = SessionCount + NoSessionAddition
| project Date = format_datetime(day, 'yyyy-MM-dd'), Sessions = TotalSessions
| order by Date asc
"@

try {
    $result = Invoke-AzOperationalInsightsQuery -WorkspaceId $workspaceid -Query $query
}
catch {
    Write-Error "Failed to query Log Analytics workspace."
    throw $_
}

if ($result.Results.Count -eq 0) {
    Write-Output "No data found for the previous month."
}
else {
    # Convert results to HTML Table
    $htmlTable = $result.Results | ConvertTo-Html -Fragment

    $emailBody = @"
<html>
<head>
<style>
table { border-collapse: collapse; width: 100%; margin: 20px 0; }
th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
th { background-color: #0b0c0c; color: white; font-weight: bold; }
tr:nth-child(even) { background-color: #f2f2f2; }
tr:hover { background-color: #e0e0e0; }
</style>
</head>
<body>
<h2>Monthly Welsh Language Usage Report</h2>
<p>Environment: <strong>$($env:MODULE_PROJECT) $($env:MODULE_ENV)</strong></p>
<p>Reporting Period: <strong>Previous Month</strong></p>
<p>This report shows the daily unique sessions using Welsh language translation services.</p>
<h3>Daily Welsh Translation Usage:</h3>
$htmlTable
<hr/>
<p><small><em>Generated on: $(Get-Date)</em></small></p>
</body>
</html>
"@

    Write-Output "Report generated successfully."
    Write-Output "HTML Body Preview:"
    Write-Output $emailBody

    # Send Email via Azure Communication Services
    try {
        $emailMessage = @{
            SenderAddress    = $senderaddress
            RecipientAddress = $recipientaddress
            Subject          = "Monthly Welsh Language Usage Report - $($env:MODULE_ENV)"
            Content          = $emailBody
        }

        Send-AzEmail -Endpoint $acsendpoint @emailMessage -BodyType Html
        Write-Output "Email sent successfully via Azure Communication Services."
    }
    catch {
        Write-Error "Failed to send email via Azure Communication Services."
        throw $_
    }
}
EOT

  tags = var.common_tags
}

resource "azurerm_role_assignment" "automation_log_analytics_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_log_analytics_workspace.logic_app_workspace.0.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azurerm_automation_account.welsh_reporting.0.identity[0].principal_id
}

resource "azurerm_automation_schedule" "welsh_monthly_schedule" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  name                    = "monthly-welsh-schedule"
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  frequency               = "Month"
  interval                = 1
  # Run 5 minutes from now for testing
  start_time              = formatdate("YYYY-MM-08'T'15:00:00Z", timestamp())
  timezone                = "Etc/UTC"
}

resource "azurerm_automation_job_schedule" "welsh_report_job" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  schedule_name           = azurerm_automation_schedule.welsh_monthly_schedule.0.name
  runbook_name            = azurerm_automation_runbook.welsh_report_runbook.0.name

  parameters = {
    workspaceid      = azurerm_log_analytics_workspace.logic_app_workspace.0.id
    acsendpoint      = "https://${azurerm_communication_service.comm_service.0.name}.uk.communication.azure.com"
    senderaddress    = "DoNotReply@${azurerm_email_communication_service_domain.email_domain.0.from_sender_domain}"
    recipientaddress = join(",", local.welsh_emails)
  }
}

resource "azurerm_automation_module" "az_communication" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  name                    = "Az.Communication"
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name

  module_link {
    uri = "https://www.powershellgallery.com/api/v2/package/Az.Communication/1.2.0"
  }
}
