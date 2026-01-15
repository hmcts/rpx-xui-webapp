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

# Test connectivity with a simple query first
Write-Output "Testing App Insights connectivity..."
$testQuery = @"
AppRequests
| where TimeGenerated > ago(7d)
| summarize Count = count() by bin(TimeGenerated, 1d)
| order by TimeGenerated desc
| limit 5
"@

try {
    $testResult = Invoke-AzOperationalInsightsQuery -WorkspaceId $workspaceid -Query $testQuery
    Write-Output "Test query successful. Found $($testResult.Results.Count) rows."
    if ($testResult.Results.Count -gt 0) {
        Write-Output "Sample data from last 7 days:"
        $testResult.Results | ForEach-Object {
            Write-Output "  Date: $($_.TimeGenerated), Count: $($_.Count)"
        }
    }
}
catch {
    Write-Error "Test query failed: $_"
    throw $_
}

# Check for Welsh translation data first
Write-Output "`nChecking for Welsh translation usage data..."
$checkQuery = @"
AppRequests
| where TimeGenerated > ago(90d)
| where Url has "/api/translation/cy"
| summarize Count = count() by bin(TimeGenerated, 1d)
| order by TimeGenerated desc
| limit 5
"@

try {
    $checkResult = Invoke-AzOperationalInsightsQuery -WorkspaceId $workspaceid -Query $checkQuery
    $checkRows = @($checkResult.Results)
    Write-Output "Welsh translation requests in last 90 days: $($checkRows.Count) days with activity"
    if ($checkRows.Count -gt 0) {
        Write-Output "Recent Welsh translation activity:"
        $checkRows | ForEach-Object {
            Write-Output "  Date: $($_.TimeGenerated), Count: $($_.Count)"
        }
    } else {
        Write-Output "WARNING: No Welsh translation requests found in the last 90 days."
    }
}
catch {
    Write-Warning "Check query failed: $_"
}

# Main Welsh translation query
Write-Output "`nRunning Welsh translation usage query..."
$query = @"
let FilteredRequests = requests
| where timestamp > ago(31d)
| where url has "/api/translation/cy"
| extend day = bin(timestamp, 1d);
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
| extend SessionCount = coalesce(SessionCount, 0), NoSessionAddition = coalesce(NoSessionAddition, 0)
| extend TotalSessions = SessionCount + NoSessionAddition
| project day, TotalSessions
| order by day asc


"@

try {
    $result = Invoke-AzOperationalInsightsQuery -WorkspaceId $workspaceid -Query $query
}
catch {
    Write-Error "Failed to query Log Analytics workspace."
    throw $_
}

# Debug output
Write-Output "Query executed successfully."
Write-Output "Result object type: $($result.GetType().FullName)"
Write-Output "Results property type: $($result.Results.GetType().FullName)"
Write-Output "Results count: $($result.Results.Count)"

# Convert to array and check again
$dataRows = @($result.Results)
Write-Output "Converted to array. Count: $($dataRows.Count)"

if ($dataRows.Count -gt 0) {
    Write-Output "First row type: $($dataRows[0].GetType().FullName)"
    Write-Output "First row as string: $($dataRows[0].ToString())"
    $firstRowProps = $dataRows[0].PSObject.Properties | Select-Object -ExpandProperty Name
    Write-Output "First row properties: $($firstRowProps -join ', ')"
    Write-Output "First row data: $($dataRows[0] | ConvertTo-Json -Depth 3)"
}

# Generate HTML table or no-data message
if (-not $dataRows -or $dataRows.Count -eq 0) {
    Write-Output "No data found for the previous month."
    $htmlTable = "<p><strong>No Welsh language translation usage was recorded for the previous month.</strong></p>"
}
else {
    Write-Output "Generating HTML table with $($dataRows.Count) rows."
    # Convert results to HTML Table with proper headers
    $htmlTable = "<table>"
    $htmlTable += "<thead><tr><th>Date</th><th>Sessions</th></tr></thead>"
    $htmlTable += "<tbody>"
    
    $rowCount = 0
    for ($i = 0; $i -lt $dataRows.Count; $i++) {
        $row = $dataRows[$i]
        Write-Output "Processing row $($i + 1): $($row | ConvertTo-Json -Compress)"
        
        # Get all properties
        $props = $row.PSObject.Properties
        $dateValue = "N/A"
        $sessionValue = "0"
        
        foreach ($prop in $props) {
            Write-Output "  Property: $($prop.Name) = $($prop.Value)"
            if ($prop.Name -eq "Date" -or $prop.Name -eq "day") {
                $dateValue = $prop.Value
            }
            if ($prop.Name -eq "Sessions" -or $prop.Name -eq "TotalSessions") {
                $sessionValue = $prop.Value
            }
        }
        
        $htmlTable += "<tr><td>$dateValue</td><td>$sessionValue</td></tr>"
        $rowCount++
    }
    
    $htmlTable += "</tbody></table>"
    Write-Output "Generated table with $rowCount data rows."
}

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
  start_time              = formatdate("YYYY-MM-15'T'13:53:00Z", timestamp())
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
