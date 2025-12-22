locals {
  app_full_name       = "xui-${var.component}"
  ase_name            = "core-compute-${var.env}"
  local_env           = (var.env == "preview" || var.env == "spreview") ? (var.env == "preview") ? "aat" : "saat" : var.env
  shared_vault_name   = "${var.shared_product_name}-${local.local_env}"
  managed_api_base_id = "/subscriptions/${data.azurerm_client_config.current.subscription_id}/providers/Microsoft.Web/locations/${var.location}/managedApis"
}

data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "key_vault" {
  name                = local.shared_vault_name
  resource_group_name = local.shared_vault_name
}

data "azurerm_key_vault_secret" "s2s_secret" {
  name         = "mc-s2s-client-secret"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

data "azurerm_key_vault_secret" "oauth2_secret" {
  name         = "mc-idam-client-secret"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name  = "core-infra-${var.env}"
}

resource "azurerm_key_vault_secret" "redis6_connection_string" {
  name         = "${var.component}-redis6-connection-string"
  value        = "redis://${urlencode(module.redis6-cache.access_key)}@${module.redis6-cache.host_name}:${module.redis6-cache.redis_port}?tls=true"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

module "redis6-cache" {
  source                        = "git@github.com:hmcts/cnp-module-redis?ref=4.x"
  product                       = "${var.shared_product_name}-mc-redis6"
  name                          = "${var.product}-${var.component}-${var.env}"
  location                      = var.location
  env                           = var.env
  subnetid                      = data.azurerm_subnet.core_infra_redis_subnet.id
  common_tags                   = var.common_tags
  redis_version                 = "6"
  business_area                 = "cft"
  private_endpoint_enabled      = true
  public_network_access_enabled = false
  family                        = var.redis_family
  capacity                      = var.redis_capacity
  sku_name                      = var.redis_sku_name
}

module "application_insights" {
  source = "git@github.com:hmcts/terraform-module-application-insights?ref=4.x"

  env                 = var.env
  product             = var.product
  name                = "${local.app_full_name}-appinsights"
  location            = var.location
  application_type    = var.application_type
  resource_group_name = azurerm_resource_group.rg.name

  common_tags = var.common_tags
}

moved {
  from = azurerm_application_insights.appinsights
  to   = module.application_insights.azurerm_application_insights.this
}


resource "azurerm_application_insights" "appinsight" {
  name                = "${local.app_full_name}-appinsights-${var.env}-classic"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = var.application_type

  tags = var.common_tags

  lifecycle {
    ignore_changes = [
      # Ignore changes to appinsights as otherwise upgrading to the Azure provider 2.x
      # destroys and re-creates this appinsights instance
      application_type,
    ]
  }
}

resource "azurerm_resource_group" "rg" {
  name     = "${local.app_full_name}-${var.env}"
  location = var.location

  tags = var.common_tags
}

# Logic App for Monthly KQL Reports
data "azurerm_key_vault_secret" "logic_app_email_recipients" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = var.welsh_email_address_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

// Removed Azure Communication Services (ACS) resources; standardized on Office 365 Outlook connector for email.


resource "azurerm_log_analytics_workspace" "logic_app_workspace" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-law-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = var.common_tags
}


# API Connections for Logic App
resource "azurerm_api_connection" "azure_monitor" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-azuremonitor-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  managed_api_id      = "${local.managed_api_base_id}/azuremonitorlogs"
  display_name        = "Azure Monitor Logs Connection"

  lifecycle {
    ignore_changes = [parameter_values]
  }
}



resource "azurerm_key_vault_secret" "app_insights_key" {
  name         = "appinsights-instrumentationkey-mc"
  value        = azurerm_application_insights.appinsight.instrumentation_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

resource "azurerm_key_vault_secret" "app_insights_connection_string" {
  name         = "appinsights-connection-string-mc"
  value        = module.application_insights.connection_string
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

# Welsh Language Usage Reporting - Logic App Implementation
data "azurerm_key_vault_secret" "welsh_report_email" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = var.welsh_email_address_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

locals {
  welsh_emails = var.welsh_reporting_enabled ? split(",", trimspace(data.azurerm_key_vault_secret.welsh_report_email.0.value)) : []
}

# Welsh Language Usage Logic App Workflow
resource "azurerm_logic_app_workflow" "welsh_report_workflow" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-welsh-report-${var.env}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  identity {
    type = "SystemAssigned"
  }

  workflow_parameters = {
    "$connections" = jsonencode({
      defaultValue = {
        azuremonitorlogs = {
          connectionId   = var.welsh_reporting_enabled ? azurerm_api_connection.azure_monitor.0.id : ""
          connectionName = var.welsh_reporting_enabled ? azurerm_api_connection.azure_monitor.0.name : ""
          id             = "${local.managed_api_base_id}/azuremonitorlogs"
          connectionProperties = {
            authentication = {
              type = "ManagedServiceIdentity"
            }
          }
        }
        office365 = {
          connectionId   = var.welsh_reporting_enabled ? azurerm_api_connection.office365_outlook.0.id : ""
          connectionName = var.welsh_reporting_enabled ? azurerm_api_connection.office365_outlook.0.name : ""
          id             = "${local.managed_api_base_id}/office365"
        }
      }
      type = "Object"
    })
  }

  tags = var.common_tags
}

# Monthly recurrence trigger for Welsh reporting
resource "azurerm_logic_app_trigger_recurrence" "welsh_monthly_trigger" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "monthly-welsh-trigger"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  frequency = "Month"
  interval  = 1
  # Run on the 1st of every month at 09:00 UTC
  start_time = formatdate("YYYY-MM-18'T'13:00:00Z", timestamp())
  schedule {
    at_these_hours   = [9]
    at_these_minutes = [0]
  }
}

# Welsh KQL Query Action
resource "azurerm_logic_app_action_custom" "welsh_kql_query" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "run-welsh-kql-query"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "QueryData"
      }
    }
    type = "ApiConnection"
    inputs = {
      body = {
        queries = [{
          query     = "let startTime = startofmonth(datetime_add('month', -1, startofmonth(now())));
let endTime = startofmonth(now());
let FilteredRequests = requests
| where timestamp between (startTime .. endTime)
| where url has \"/api/translation/cy\"
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
"
          workspace = azurerm_log_analytics_workspace.logic_app_workspace.0.id
        }]
      }
      host = {
        connection = {
          name = "@parameters('$connections')['azuremonitorlogs']['connectionId']"
        }
      }
      method = "post"
      path   = "/queryData"
    }
    runAfter = {}
  })

  depends_on = [azurerm_logic_app_trigger_recurrence.welsh_monthly_trigger]
}

# Action to create HTML table from query results
resource "azurerm_logic_app_action_custom" "welsh_create_html_table" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "create-html-table"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    type = "Table"
    inputs = {
      from   = "@body('run-welsh-kql-query')?['tables']?[0]?['rows']"
      format = "HTML"
      columns = [
        {
          header = "Date"
          value  = "@item()[0]"
        },
        {
          header = "Sessions"
          value  = "@item()[1]"
        }
      ]
    }
    runAfter = {
      "run-welsh-kql-query" = ["Succeeded"]
    }
  })

  depends_on = [azurerm_logic_app_action_custom.welsh_kql_query]
}

# Welsh Email Action
resource "azurerm_logic_app_action_custom" "welsh_send_email" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "send-welsh-email"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "SendEmailV2"
      }
    }
    type = "ApiConnection"
    inputs = {
      host = {
        connection = {
          name = "@parameters('$connections')['office365']['connectionId']"
        }
      }
      method = "post"
      path   = "/SendEmailV2"
      parameters = {
        To      = "@{join(${jsonencode(local.welsh_emails)}, ';')}"
        Subject = "Monthly Welsh Language Usage Report - ${var.product} ${var.env}"
        Body    = "@concat('<html><head><style>table { border-collapse: collapse; width: 100%; margin: 20px 0; } th, td { border: 1px solid #ddd; padding: 12px; text-align: left; } th { background-color: #0b0c0c; color: white; font-weight: bold; } tr:nth-child(even) { background-color: #f2f2f2; } tr:hover { background-color: #e0e0e0; }</style></head><body><h2>Monthly Welsh Language Usage Report</h2><p>Environment: <strong>${var.product} ${var.env}</strong></p><p>Reporting Period: <strong>Previous Month</strong></p><p>This report shows the daily unique sessions using Welsh language translation services.</p><h3>Daily Welsh Translation Usage:</h3>', body('create-html-table'), '<hr/><p><small><em>Generated on: ', utcNow(), '</em></small></p></body></html>')"
      }
    }
    runAfter = {
      "create-html-table" = ["Succeeded"]
    }
  })

  depends_on = [
    azurerm_logic_app_action_custom.welsh_create_html_table,
    azurerm_api_connection.office365_outlook
  ]
}

# Office 365 Outlook API Connection for sending emails (Consumption requires manual auth)
resource "azurerm_api_connection" "office365_outlook" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-office365-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  managed_api_id      = "${local.managed_api_base_id}/office365"
  display_name        = "Office 365 Outlook Connection"

  lifecycle {
    ignore_changes = [parameter_values]
  }
}

# Role Assignment for Welsh Logic App to access Log Analytics
resource "azurerm_role_assignment" "welsh_logic_app_log_analytics_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_log_analytics_workspace.logic_app_workspace.0.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azurerm_logic_app_workflow.welsh_report_workflow.0.identity[0].principal_id
}
