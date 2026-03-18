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
    [string]$appinsightsappid,
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

# Import required modules
Import-Module Az.Communication -ErrorAction SilentlyContinue
Import-Module PSWritePDF -ErrorAction SilentlyContinue

# Main Welsh translation query
$query = @"
let startTime = startofmonth(datetime_add('month', 0, startofmonth(now())));
let endTime = startofmonth(now());
requests
| where timestamp >= startTime and timestamp < endTime
| where url has "/api/translation/cy"
| extend day = startofday(timestamp)
| where isnotnull(day)
| summarize UniqueCount = dcountif(session_Id, isnotempty(session_Id)),
            NoSessionCount = countif(isempty(session_Id))
            by day
| extend Sessions = UniqueCount + iff(NoSessionCount > 0, 1, 0)
| project Date = format_datetime(day, 'yyyy-MM-dd'), Sessions
| order by Date asc
"@

try {
    Write-Output "Querying Application Insights for Welsh translation usage..."
    # Query Application Insights directly using REST API
    $token = (Get-AzAccessToken -ResourceUrl "https://api.applicationinsights.io").Token
    $headers = @{
        "Authorization" = "Bearer $token"
        "Content-Type" = "application/json"
    }

    $apiUrl = "https://api.applicationinsights.io/v1/apps/$appinsightsappid/query"
    $body = @{ query = $query } | ConvertTo-Json

    Write-Output "App ID: $appinsightsappid"
    $response = Invoke-RestMethod -Uri $apiUrl -Method Post -Headers $headers -Body $body

    # Convert response to same format as Log Analytics for compatibility
    $result = @{
        Results = $response.tables[0].rows | ForEach-Object {
            $row = $_
            $obj = New-Object PSObject
            for ($i = 0; $i -lt $response.tables[0].columns.Count; $i++) {
                $obj | Add-Member -MemberType NoteProperty -Name $response.tables[0].columns[$i].name -Value $row[$i]
            }
            $obj
        }
    }

    Write-Output "Query executed successfully. Found $($result.Results.Count) rows."
}
catch {
    Write-Error "Failed to execute query: $($_.Exception.Message)"
    Write-Output "App Insights App ID: $appinsightsappid"
    Write-Output "Note: Ensure the Automation Account Managed Identity has 'Reader' role on Application Insights."
    throw $_
}

# Convert results to array
$dataRows = @()
if ($null -ne $result -and $null -ne $result.Results) {
    $dataRows = @($result.Results | ForEach-Object { $_ })
}

Write-Output "Found $($dataRows.Count) days with Welsh translation usage."

# Generate HTML table or no-data message
if (-not $dataRows -or $dataRows.Count -eq 0) {
    $htmlTable = "<p><strong>No Welsh language translation usage was recorded in the reporting period.</strong></p>"
    $htmlChart = ""
}
else {
    # Build HTML table
    $htmlTable = "<table>"
    $htmlTable += "<thead><tr><th>Date</th><th>Unique Sessions</th></tr></thead>"
    $htmlTable += "<tbody>"

    $totalSessions = 0
    $maxSessions = 0
    foreach ($row in $dataRows) {
        if ($null -ne $row) {
            $dateValue = if ($null -ne $row.Date) { $row.Date } else { "N/A" }
            $sessionValue = if ($null -ne $row.Sessions) { $row.Sessions } else { "0" }
            $htmlTable += "<tr><td>$dateValue</td><td>$sessionValue</td></tr>"
            $totalSessions += [int]$sessionValue
            if ([int]$sessionValue -gt $maxSessions) { $maxSessions = [int]$sessionValue }
        }
    }

    $htmlTable += "</tbody>"
    $htmlTable += "<tfoot><tr><th>Total</th><th>$totalSessions</th></tr></tfoot>"
    $htmlTable += "</table>"

    # Build bar chart (vertical)
    $htmlChart = "<div class='chart-container'>"
    $htmlChart += "<h3>Visual Trend:</h3>"
    $htmlChart += "<div class='chart-wrapper'>"
    $chartMaxHeight = 250
    foreach ($row in $dataRows) {
        if ($null -ne $row) {
            $dateValue = if ($null -ne $row.Date) { $row.Date } else { "N/A" }
            $sessionValue = if ($null -ne $row.Sessions) { [int]$row.Sessions } else { 0 }
            # Scale bar height proportionally to the max value so chart always fits
            $barHeight = if ($maxSessions -gt 0) { [Math]::Round(($sessionValue / $maxSessions) * $chartMaxHeight) } else { 0 }
            # Show at least 5px for zero/trace values so they're visible
            if ($barHeight -lt 5) { $barHeight = 5 }

            $htmlChart += "<div class='bar-column'>"
            $htmlChart += "<div class='bar-value-top'>$sessionValue</div>"
            $htmlChart += "<div class='bar-wrapper'>"
            $htmlChart += "<div class='bar-vertical' style='height: " + $barHeight + "px !important;'></div>"
            $htmlChart += "</div>"
            $htmlChart += "<div class='bar-label-bottom'>$dateValue</div>"
            $htmlChart += "</div>"
        }
    }
    $htmlChart += "</div>"
    $htmlChart += "</div>"

    Write-Output "Report contains $($dataRows.Count) days with $totalSessions total sessions."
}

# Generate PDF attachment
$pdfPath = Join-Path ([System.IO.Path]::GetTempPath()) "WelshReport_$(Get-Date -Format 'yyyyMM').pdf"
$pdfBase64 = $null
try {
    Write-Output "Generating PDF report..."

    # Pre-build content lines outside the scriptblock to avoid PS 5.1 pipeline issues inside scriptblocks
    $pdfLines = [System.Collections.Generic.List[string]]::new()
    $pdfLines.Add("Monthly Welsh Language Usage Report")
    $pdfLines.Add("Environment: ${var.product} ${var.env}")
    $pdfLines.Add("Reporting Period: $([DateTime]::UtcNow.AddMonths(-1).ToString('MMMM yyyy'))")
    $pdfLines.Add("")
    $pdfLines.Add("Daily Welsh Translation Usage (unique sessions per /api/translation/cy):")
    $pdfLines.Add("Date                 | Unique Sessions")
    $pdfLines.Add("---------------------+----------------")
    if ($dataRows -and $dataRows.Count -gt 0) {
        foreach ($row in $dataRows) {
            if ($null -ne $row) {
                $pdfDate     = if ($null -ne $row.Date)     { $row.Date }                  else { 'N/A' }
                $pdfSessions = if ($null -ne $row.Sessions) { $row.Sessions.ToString() }   else { '0' }
                $pdfLines.Add(("{0,-21}| {1}" -f $pdfDate, $pdfSessions))
            }
        }
        $pdfLines.Add("---------------------+----------------")
        $pdfLines.Add(("Total                | {0}" -f $totalSessions))
    }
    else {
        $pdfLines.Add("No Welsh language translation usage was recorded in the reporting period.")
    }
    $pdfLines.Add("")
    $pdfLines.Add("Generated: $(Get-Date -Format 'dd MMM yyyy HH:mm:ss') UTC")

    # Capture list as plain array so it can be closed over cleanly in the scriptblock
    $pdfLinesArray = $pdfLines.ToArray()

    # Generate bar chart image for the PDF using System.Drawing
    $pdfChartImagePath = $null
    if ($dataRows -and $dataRows.Count -gt 0) {
        try {
            Add-Type -AssemblyName System.Drawing
            $chartWidth   = 700
            $chartHeight  = 380
            $marginLeft   = 65
            $marginRight  = 20
            $marginTop    = 45
            $marginBottom = 70
            $plotWidth    = $chartWidth  - $marginLeft - $marginRight
            $plotHeight   = $chartHeight - $marginTop  - $marginBottom

            $bitmap  = New-Object System.Drawing.Bitmap($chartWidth, $chartHeight)
            $graphic = [System.Drawing.Graphics]::FromImage($bitmap)
            $graphic.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
            $graphic.Clear([System.Drawing.Color]::White)

            $gridPen   = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(220, 220, 220), 1)
            $axesPen   = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(80, 90, 95),    2)
            $barBrush  = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(0, 94, 165))
            $fontSmall = New-Object System.Drawing.Font("Arial",  8)
            $fontTitle = New-Object System.Drawing.Font("Arial", 11, [System.Drawing.FontStyle]::Bold)
            $textBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(11, 12, 12))

            # Centred title
            $titleStr  = "Daily Welsh Translation Usage"
            $titleSize = $graphic.MeasureString($titleStr, $fontTitle)
            $graphic.DrawString($titleStr, $fontTitle, $textBrush, [int](($chartWidth - $titleSize.Width) / 2), 12)

            # Y-axis gridlines and labels — cap levels to maxSessions so labels are always unique integers
            $yLevels  = [Math]::Min(5, $maxSessions)
            if ($yLevels -lt 1) { $yLevels = 1 }
            $yStep    = [Math]::Ceiling($maxSessions / $yLevels)   # integer step >= 1, guarantees distinct labels
            for ($lvl = 0; $lvl -le $yLevels; $lvl++) {
                $yVal  = [int]($yStep * $lvl)
                if ($yVal -gt $maxSessions) { $yVal = $maxSessions }
                $yPos  = $marginTop + $plotHeight - [int]($plotHeight * $yVal / $maxSessions)
                $graphic.DrawLine($gridPen, $marginLeft, $yPos, ($marginLeft + $plotWidth), $yPos)
                $yLabel = $yVal.ToString()
                $ySz    = $graphic.MeasureString($yLabel, $fontSmall)
                $graphic.DrawString($yLabel, $fontSmall, $textBrush, ($marginLeft - $ySz.Width - 4), ($yPos - $ySz.Height / 2))
            }

            # Axes
            $graphic.DrawLine($axesPen, $marginLeft, $marginTop,                       $marginLeft,                ($marginTop + $plotHeight))
            $graphic.DrawLine($axesPen, $marginLeft, ($marginTop + $plotHeight), ($marginLeft + $plotWidth), ($marginTop + $plotHeight))

            # Bars
            $barCount     = $dataRows.Count
            $barSlotWidth = if ($barCount -gt 0) { [int]($plotWidth / $barCount) } else { 1 }
            $barWidth     = [Math]::Max(4, $barSlotWidth - 6)

            for ($bi = 0; $bi -lt $dataRows.Count; $bi++) {
                $rowItem  = $dataRows[$bi]
                $sessVal  = if ($null -ne $rowItem.Sessions) { [int]$rowItem.Sessions } else { 0 }
                $barH     = if ($maxSessions -gt 0) { [int]($plotHeight * $sessVal / $maxSessions) } else { 0 }
                if ($barH -lt 2 -and $sessVal -gt 0) { $barH = 2 }

                $xBar = $marginLeft + $bi * $barSlotWidth + [int](($barSlotWidth - $barWidth) / 2)
                $yBar = $marginTop + $plotHeight - $barH
                if ($barH -gt 0) {
                    $graphic.FillRectangle($barBrush, [int]$xBar, [int]$yBar, $barWidth, $barH)
                }

                # Value label above bar
                $valLabel = $sessVal.ToString()
                $valSz    = $graphic.MeasureString($valLabel, $fontSmall)
                $graphic.DrawString($valLabel, $fontSmall, $textBrush, ([int]$xBar + ($barWidth - $valSz.Width) / 2), [Math]::Max($marginTop, $yBar - 14))

                # X-axis date label (MM-dd)
                $dateLabel = if ($null -ne $rowItem.Date -and $rowItem.Date.Length -ge 10) { $rowItem.Date.Substring(5) } else { "" }
                $dateSz    = $graphic.MeasureString($dateLabel, $fontSmall)
                $graphic.DrawString($dateLabel, $fontSmall, $textBrush, ([int]$xBar + ($barWidth - $dateSz.Width) / 2), ($marginTop + $plotHeight + 6))
            }

            $pdfChartImagePath = Join-Path ([System.IO.Path]::GetTempPath()) "WelshChart_$(Get-Date -Format 'yyyyMM').png"
            $bitmap.Save($pdfChartImagePath, [System.Drawing.Imaging.ImageFormat]::Png)
            $graphic.Dispose()
            $bitmap.Dispose()
            Write-Output "Chart image generated: $pdfChartImagePath"
        }
        catch {
            Write-Warning "Failed to generate chart image for PDF: $_"
            $pdfChartImagePath = $null
        }
    }

    New-PDF -FilePath $pdfPath {
        New-PDFPage {
            foreach ($line in $pdfLinesArray) {
                New-PDFText -Text $line
            }
            if ($pdfChartImagePath) {
                New-PDFText -Text ""
                New-PDFImage -Image $pdfChartImagePath -Width 500
            }
        }
    }

    if (Test-Path $pdfPath) {
        $pdfBase64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($pdfPath))
        Write-Output "PDF generated successfully ($([Math]::Round((Get-Item $pdfPath).Length / 1KB, 1)) KB)."
        if ($pdfChartImagePath -and (Test-Path $pdfChartImagePath)) { Remove-Item $pdfChartImagePath -Force -ErrorAction SilentlyContinue }
    }
    else {
        Write-Warning "PDF was not created at $pdfPath — attachment will be omitted."
    }
}
catch {
    Write-Warning "Failed to generate PDF: $_. Email will be sent without PDF attachment."
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

.chart-container { margin: 30px 0; }
.chart-wrapper { display: flex; align-items: flex-end; justify-content: flex-start; gap: 20px; padding: 20px; background-color: #fafafa; border-radius: 8px; overflow-x: auto; }
.bar-column { display: flex; flex-direction: column; align-items: center; min-width: 70px; }
.bar-value-top { font-size: 12px; font-weight: bold; color: #0b0c0c; margin-bottom: 5px; min-height: 20px; text-align: center; }
.bar-wrapper { display: flex; align-items: flex-end; justify-content: center; height: 250px; border-bottom: 2px solid #505a5f; width: 50px; }
.bar-vertical { width: 40px; background-color: #005ea5; border-radius: 4px 4px 0 0; }
.bar-label-bottom { font-size: 10px; color: #505a5f; margin-top: 8px; white-space: nowrap; }
</style>
</head>
<body>
<h2>Monthly Welsh Language Usage Report</h2>
<p>Environment: <strong>${var.product} ${var.env}</strong></p>
<p>Reporting Period: <strong>$reportMonth</strong></p>
<p>This report shows the daily unique sessions using Welsh language translation services (URL: /api/translation/cy).</p>
<h3>Daily Welsh Translation Usage:</h3>
$htmlTable
$htmlChart
<hr/>
<p><small><em>Generated on: $(Get-Date -Format 'dd MMM yyyy HH:mm:ss') UTC</em></small></p>
</body>
</html>
"@

Write-Output "Email report generated successfully."

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

    # Split and ensure array format even with single recipient
    $recipientAddrList = @($recipientaddress -split "," | ForEach-Object {
        @{ address = $_.Trim() }
    })

    $emailPayload = @{
        senderAddress = $senderaddress
        recipients    = @{
            to = $recipientAddrList
        }
        content       = @{
            subject = "Monthly Welsh Language Usage Report - $reportMonth - ${var.env}"
            html    = $emailBody
        }
    }
    if ($pdfBase64) {
        $emailPayload.attachments = @(
            @{
                name            = "WelshLanguageReport_$([DateTime]::UtcNow.AddMonths(-1).ToString('yyyy-MM')).pdf"
                contentType     = "application/pdf"
                contentInBase64 = $pdfBase64
            }
        )
    }
    $emailPayload = $emailPayload | ConvertTo-Json -Depth 10

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
  scope                = module.application_insights.id
  role_definition_name = "Reader"
  principal_id         = azurerm_automation_account.welsh_reporting.0.identity[0].principal_id
}


resource "azurerm_automation_schedule" "welsh_monthly_schedule" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  name                    = "monthly-welsh-schedule"
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  frequency               = "Hour"
  interval                = 10
  start_time              = "2026-03-18T14:55:00Z"
  timezone                = "UTC"
}

resource "azurerm_automation_job_schedule" "welsh_report_job" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name
  schedule_name           = azurerm_automation_schedule.welsh_monthly_schedule.0.name
  runbook_name            = azurerm_automation_runbook.welsh_report_runbook.0.name

  parameters = {
    appinsightsappid  = module.application_insights.app_id
    resourcegroupname = azurerm_resource_group.rg.name
    acsresourcename   = azurerm_communication_service.comm_service.0.name
    senderaddress     = "DoNotReply@${azurerm_email_communication_service_domain.email_domain.0.from_sender_domain}"
    recipientaddress  = join(",", local.welsh_emails)
  }

  depends_on = [
    azurerm_automation_runbook.welsh_report_runbook,
    azurerm_automation_schedule.welsh_monthly_schedule,
    azurerm_automation_module.az_communication,
    azurerm_automation_module.ps_write_pdf
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

resource "azurerm_automation_module" "ps_write_pdf" {
  count                   = var.welsh_reporting_enabled ? 1 : 0
  name                    = "PSWritePDF"
  resource_group_name     = azurerm_resource_group.rg.name
  automation_account_name = azurerm_automation_account.welsh_reporting.0.name

  module_link {
    uri = "https://www.powershellgallery.com/api/v2/package/PSWritePDF"
  }
}
