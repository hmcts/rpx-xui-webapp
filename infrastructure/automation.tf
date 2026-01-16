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
    [string]$appinsightsid,
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

# Main Welsh translation query - using last 30 days for testing
Write-Output "`nRunning Welsh translation usage query..."
$query = @"
let startTime = ago(30d);
let endTime = now();
AppRequests
| where TimeGenerated >= startTime and TimeGenerated < endTime
| where Url has "/api/translation/cy"
| extend day = startofday(TimeGenerated)
| where isnotnull(day)
| summarize UniqueCount = dcountif(SessionId, isnotempty(SessionId)), 
            NoSessionCount = countif(isempty(SessionId))
            by day
| extend Sessions = UniqueCount + iff(NoSessionCount > 0, 1, 0)
| project Date = format_datetime(day, 'yyyy-MM-dd'), Sessions
| order by Date asc
"@

try {
    Write-Output "Executing query against Application Insights: $appinsightsid"
    $result = Invoke-AzOperationalInsightsQuery -WorkspaceId $appinsightsid -Query $query -ErrorAction Stop -Timespan (New-TimeSpan -Days 60)
    Write-Output "=== QUERY EXECUTED SUCCESSFULLY ==="
    Write-Output "Result is null: $($null -eq $result)"
    if ($null -ne $result) {
        Write-Output "Result.Results is null: $($null -eq $result.Results)"
        Write-Output "Result has Tables: $($null -ne $result.Tables)"
        if ($null -ne $result.Tables) {
            Write-Output "Tables count: $($result.Tables.Count)"
            if ($result.Tables.Count -gt 0) {
                Write-Output "First table has Rows: $($null -ne $result.Tables[0].Rows)"
                Write-Output "First table Rows count: $($result.Tables[0].Rows.Count)"
            }
        }
        Write-Output "Result.Error: $($result.Error)"
    }
}
catch {
    Write-Error "=== QUERY FAILED ==="
    Write-Error "Error Message: $($_.Exception.Message)"
    Write-Error "Error Details: $($_)"
    if ($_.Exception.Response) {
        Write-Error "Response Status: $($_.Exception.Response.StatusCode)"
        try {
            $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
            $reader.BaseStream.Position = 0
            $responseBody = $reader.ReadToEnd()
            Write-Error "Response Body: $responseBody"
        }
        catch {
            Write-Error "Could not read response body"
        }
    }
    throw $_
}

# Safely convert to array and force enumeration
Write-Output "=== STARTING DATA CONVERSION ==="
$dataRows = @()

# Try Results first
if ($null -ne $result -and $null -ne $result.Results) {
    Write-Output "Result.Results exists"
    Write-Output "Result.Results type: $($result.Results.GetType().FullName)"
    Write-Output "Result.Results.Count: $($result.Results.Count)"
    
    # Try to peek at the results
    try {
        $resultsList = [System.Linq.Enumerable]::ToList($result.Results)
        Write-Output "Converted to List, count: $($resultsList.Count)"
        if ($resultsList.Count -gt 0) {
            Write-Output "First item in list: $($resultsList[0] | ConvertTo-Json -Compress)"
        }
        $dataRows = $resultsList.ToArray()
    }
    catch {
        Write-Output "LINQ ToList failed: $_"
        # Fallback to manual enumeration
        try {
            $tempList = New-Object System.Collections.ArrayList
            $counter = 0
            foreach ($item in $result.Results) {
                Write-Output "Processing item $counter"
                [void]$tempList.Add($item)
                $counter++
            }
            Write-Output "Foreach enumerated $counter items"
            $dataRows = $tempList.ToArray()
        }
        catch {
            Write-Warning "Manual enumeration also failed: $_"
        }
    }
    
    Write-Output "Got $($dataRows.Count) rows from Results"
}

# If Results failed or was empty, try Tables
if ($dataRows.Count -eq 0 -and $null -ne $result -and $null -ne $result.Tables -and $result.Tables.Count -gt 0) {
    Write-Output "Trying to use Result.Tables[0].Rows property"
    try {
        $table = $result.Tables[0]
        Write-Output "Table has $($table.Rows.Count) rows and $($table.Columns.Count) columns"
        Write-Output "Column names: $($table.Columns.Name -join ', ')"
        
        # Convert rows to objects with column names
        $tempList = New-Object System.Collections.ArrayList
        foreach ($row in $table.Rows) {
            $obj = New-Object PSObject
            for ($i = 0; $i -lt $table.Columns.Count; $i++) {
                $obj | Add-Member -MemberType NoteProperty -Name $table.Columns[$i].Name -Value $row[$i]
            }
            [void]$tempList.Add($obj)
        }
        $dataRows = $tempList.ToArray()
        Write-Output "Converted $($dataRows.Count) rows from Tables"
    }
    catch {
        Write-Error "Failed to enumerate Tables: $_"
        Write-Error $_.ScriptStackTrace
    }
}

Write-Output "=== CONVERSION COMPLETE ==="
Write-Output "Final data rows count: $($dataRows.Count)"

if ($dataRows.Count -gt 0) {
    Write-Output "=== FIRST ROW DATA ==="
    $firstRow = $dataRows[0]
    Write-Output "Row: $($firstRow | ConvertTo-Json -Compress)"
    Write-Output "Date: $($firstRow.Date)"
    Write-Output "Sessions: $($firstRow.Sessions)"
}

# Generate HTML table or no-data message
if (-not $dataRows -or $dataRows.Count -eq 0) {
    Write-Output "No Welsh translation data found for last 31 days."
    $htmlTable = "<p><strong>No Welsh language translation usage was recorded in the reporting period.</strong></p>"
}
else {
    Write-Output "Generating HTML table with $($dataRows.Count) rows."
    $htmlTable = "<table>"
    $htmlTable += "<thead><tr><th>Date</th><th>Unique Sessions</th></tr></thead>"
    $htmlTable += "<tbody>"
    
    $rowCount = 0
    $totalSessions = 0
    foreach ($row in $dataRows) {
        if ($null -ne $row) {
            $dateValue = if ($null -ne $row.Date) { $row.Date } else { "N/A" }
            $sessionValue = if ($null -ne $row.Sessions) { $row.Sessions } else { "0" }
            $htmlTable += "<tr><td>$dateValue</td><td>$sessionValue</td></tr>"
            $rowCount++
            $totalSessions += [int]$sessionValue
        }
    }
    
    $htmlTable += "</tbody>"
    $htmlTable += "<tfoot><tr><th>Total</th><th>$totalSessions</th></tr></tfoot>"
    $htmlTable += "</table>"
    Write-Output "Generated table with $rowCount data rows. Total sessions: $totalSessions"
}

$reportMonth = [DateTime]::UtcNow.AddMonths(-1).ToString("MMMM yyyy")
$emailBody = @"
<html>
<head>
<style>
table { border-collapse: collapse; width: 100%; margin: 20px 0; }
th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
th { background-color: #0b0c0c; color: white; font-weight: bold; }
tfoot th { background-color: #005ea5; }
tr:nth-child(even) { background-color: #f2f2f2; }
tr:hover { background-color: #e0e0e0; }
</style>
</head>
<body>
<h2>Monthly Welsh Language Usage Report</h2>
<p>Environment: <strong>$($env:MODULE_PROJECT) $($env:MODULE_ENV)</strong></p>
<p>Reporting Period: <strong>$reportMonth</strong></p>
<p>This report shows the daily unique sessions using Welsh language translation services (URL: /api/translation/cy).</p>
<h3>Daily Welsh Translation Usage:</h3>
$htmlTable
<hr/>
<p><small><em>Generated on: $(Get-Date -Format 'dd MMM yyyy HH:mm:ss') UTC</em></small></p>
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
  start_time              = formatdate("YYYY-MM-16'T'14:55:00Z", timestamp())
  timezone                = "Etc/UTC"
}

resource "azurerm_automation_job_schedule" "welsh_report_job" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  schedule_name           = azurerm_automation_schedule.welsh_monthly_schedule.0.name
  runbook_name            = azurerm_automation_runbook.welsh_report_runbook.0.name

  parameters = {
    appinsightsid    = azurerm_application_insights.appinsight.app_id
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
