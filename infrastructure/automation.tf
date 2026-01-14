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
    [string]$resourcegroupname,
    [string]$acsresourcename,
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

# Import required module
Import-Module Az.Communication -ErrorAction SilentlyContinue

$query = @"
let startTime = startofmonth(datetime_add('month', -1, startofmonth(now())));
let endTime = startofmonth(now());
let FilteredRequests = AppRequests
| where TimeGenerated between (startTime .. endTime)
| where Url has "/api/translation/cy"
| extend day = startofday(TimeGenerated);
let UniqueSessionsPerDay = FilteredRequests
| where isnotempty(SessionId)
| summarize by day, SessionId
| summarize SessionCount = count() by day;
let HasNoSession = FilteredRequests
| where isempty(SessionId)
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

    # Get ACS access token using Managed Identity
    try {
        $acsResourceId = "/subscriptions/$((Get-AzContext).Subscription.Id)/resourceGroups/$resourcegroupname/providers/Microsoft.Communication/communicationServices/$acsresourcename"
        $token = (Get-AzAccessToken -ResourceUrl "https://communication.azure.com").Token
        Write-Output "Successfully retrieved access token."
    }
    catch {
        Write-Error "Failed to retrieve access token: $_"
        throw $_
    }

    # Send Email via Azure Communication Services REST API
    try {
        $endpoint = "https://$acsresourcename.communication.azure.com"
        $apiVersion = "2023-03-31"
        $emailUrl = "$endpoint/emails:send?api-version=$apiVersion"
        $recipientAddrList = $recipientaddress -split "," | ForEach-Object {
            @{ address = $_.Trim() }
        }

        $emailPayload = @{
            senderAddress = $senderaddress
            recipients = @{
                to = $recipientAddrList
            }
            content = @{
                subject = "Monthly Welsh Language Usage Report - $($env:MODULE_ENV)"
                html = $emailBody
            }
        } | ConvertTo-Json -Depth 10

        $headers = @{
            "Content-Type" = "application/json"
            "Authorization" = "Bearer $token"
        }

        Write-Output "Sending email to: $recipientaddress"
        Write-Output "From: $senderaddress"
        
        $response = Invoke-RestMethod -Uri $emailUrl -Method Post -Headers $headers -Body $emailPayload
        Write-Output "Email sent successfully. Message ID: $($response.id)"
    }
    catch {
        Write-Error "Failed to send email via Azure Communication Services: $_"
        Write-Error "Status Code: $($_.Exception.Response.StatusCode.value__)"
        Write-Error "Response: $($_.Exception.Response)"
        throw $_
    }
}
EOT

  tags = var.common_tags
}

resource "azurerm_role_assignment" "automation_appinsights_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_application_insights.appinsight.id
  role_definition_name = "Reader"
  principal_id         = azurerm_automation_account.welsh_reporting.0.identity[0].principal_id
}

resource "azurerm_role_assignment" "automation_log_analytics_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_log_analytics_workspace.app_insights_workspace.id
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
  start_time              = formatdate("YYYY-MM-14'T'13:12:00Z", timestamp())
  timezone                = "Etc/UTC"
}

resource "azurerm_automation_job_schedule" "welsh_report_job" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  schedule_name           = azurerm_automation_schedule.welsh_monthly_schedule.0.name
  runbook_name            = azurerm_automation_runbook.welsh_report_runbook.0.name

  parameters = {
    workspaceid      = azurerm_log_analytics_workspace.app_insights_workspace.workspace_id
    resourcegroupname = azurerm_resource_group.rg.name
    acsresourcename  = azurerm_communication_service.comm_service.0.name
    senderaddress    = "DoNotReply@${azurerm_email_communication_service_domain.email_domain.0.from_sender_domain}"
    recipientaddress = join(",", local.welsh_emails)
  }

  depends_on = [
    azurerm_automation_runbook.welsh_report_runbook,
    azurerm_automation_schedule.welsh_monthly_schedule,
    azurerm_automation_module.az_communication
  ]
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
