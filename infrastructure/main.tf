locals {
  app_full_name     = "xui-${var.component}"
  ase_name          = "core-compute-${var.env}"
  local_env         = (var.env == "preview" || var.env == "spreview") ? (var.env == "preview") ? "aat" : "saat" : var.env
  shared_vault_name = "${var.shared_product_name}-${local.local_env}"
}

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
  name         = var.logic_app_email_recipients_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

data "azurerm_key_vault_secret" "logic_app_acs_connection_string" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = var.logic_app_acs_connection_string_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}


resource "azurerm_log_analytics_workspace" "logic_app_workspace" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-law-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = var.common_tags
}

resource "azurerm_logic_app_workflow" "kql_report_workflow" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-kql-report-${var.env}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  identity {
    type = "SystemAssigned"
  }

  tags = var.common_tags
}

resource "azurerm_logic_app_trigger_recurrence" "monthly_trigger" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "monthly-recurrence"
  logic_app_id = azurerm_logic_app_workflow.kql_report_workflow.0.id

  frequency = var.logic_app_schedule_frequency
  interval  = var.logic_app_schedule_interval
  # 1st of every month at 09:00 UTC
  start_time = formatdate("YYYY-MM-01'T'09:00:00Z", timestamp())
}

resource "azurerm_logic_app_action_custom" "run_kql_query" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "run-kql-query"
  logic_app_id = azurerm_logic_app_workflow.kql_report_workflow.0.id

  body = jsonencode({
    inputs = {
      host = {
        connection = {
          name = "@parameters('$connections')['azuremonitorlogs']['connectionId']"
        }
      }
      method = "post"
      path   = "/queryData"
      queries = {
        resourcegroups = "[parameters('resourceGroups')]"
        resourcename   = "[parameters('workspaceName')]"
        resourcetype   = "Log Analytics Workspace"
        subscriptions  = "[parameters('subscriptionId')]"
        timerange      = "Last 30 days"
      }
      body = jsonencode({
        query = var.logic_app_kql_query
      })
    }
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "QueryData"
      }
    }
    type = "ApiConnection"
  })

  depends_on = [azurerm_logic_app_trigger_recurrence.monthly_trigger]
}

resource "azurerm_logic_app_action_custom" "send_email" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "send-email"
  logic_app_id = azurerm_logic_app_workflow.kql_report_workflow.0.id

  body = jsonencode({
    inputs = {
      host = {
        connection = {
          name = "@parameters('$connections')['azurecommunicationservices']['connectionId']"
        }
      }
      method = "post"
      path   = "/emails:send"
      body = {
        to      = "[split(body('run-kql-query')?['emailRecipients'], ',')]"
        subject = "Monthly KQL Report - ${var.product} ${var.env}"
        body = {
          contentType = "HTML"
          content     = "<p>Please find attached the monthly KQL report for ${var.product} in ${var.env} environment.</p><p>Query executed: ${var.logic_app_kql_query}</p>"
        }
        attachments = [
          {
            name         = "@body('run-kql-query')?['AttachmentName']"
            contentType  = "image/png"
            contentBytes = "@body('run-kql-query')?['AttachmentContent']"
          }
        ]
      }
    }
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "SendEmail"
      }
    }
    type = "ApiConnection"
  })

  depends_on = [azurerm_logic_app_action_custom.run_kql_query]
}

# API Connections for Logic App
resource "azurerm_logic_app_action_custom" "azure_monitor_connection" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "azure-monitor-connection"
  logic_app_id = azurerm_logic_app_workflow.kql_report_workflow.0.id

  body = jsonencode({
    inputs = {
      api = {
        id = "[concat(subscription().id, '/providers/Microsoft.Web/locations/', parameters('location'), '/managedApis/', 'azuremonitorlogs')]"
      }
      name = "azuremonitorlogs"
      parameterValues = {
        token = {
          value = "Bearer @{listCallbackUrl()}"
        }
      }
    }
    type = "ApiConnection"
  })
}

resource "azurerm_logic_app_action_custom" "acs_email_connection" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "acs-email-connection"
  logic_app_id = azurerm_logic_app_workflow.kql_report_workflow.0.id

  body = jsonencode({
    inputs = {
      api = {
        id = "[concat(subscription().id, '/providers/Microsoft.Web/locations/', parameters('location'), '/managedApis/', 'azurecommunicationservices')]"
      }
      name = "azurecommunicationservices"
      parameterValues = {
        connectionString = data.azurerm_key_vault_secret.logic_app_acs_connection_string.0.value
      }
    }
    type = "ApiConnection"
  })

  depends_on = [data.azurerm_key_vault_secret.logic_app_acs_connection_string]
}

# Role Assignment for Logic App to access Log Analytics
resource "azurerm_role_assignment" "logic_app_log_analytics_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_log_analytics_workspace.logic_app_workspace.0.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azurerm_logic_app_workflow.kql_report_workflow.0.identity[0].principal_id
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

  # Empty map – we use managed identity, not API-connections
  workflow_parameters = {}

  tags = var.common_tags
}

# Monthly recurrence trigger for Welsh reporting
resource "azurerm_logic_app_trigger_recurrence" "welsh_monthly_trigger" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "monthly-welsh-trigger"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  frequency = "Month"
  interval  = 1
  schedule {
    # Run on the 1st day of each month at 9 AM UTC
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
    inputs = {
      host = {
        connection = {
          name = "@parameters('$connections')['azuremonitorlogs']['connectionId']"
        }
      }
      method = "post"
      path   = "/queryData"
      body = {
        queries = [{
          query     = <<-QUERY
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
            | project day, TotalSessions
            | order by day asc
            | render columnchart
          QUERY
          workspace = azurerm_log_analytics_workspace.logic_app_workspace.0.id
        }]
      }
    }
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "QueryData"
      }
    }
    type = "ApiConnection"
  })

  depends_on = [azurerm_logic_app_trigger_recurrence.welsh_monthly_trigger]
}

# Welsh Email Action
resource "azurerm_logic_app_action_custom" "welsh_send_email" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "send-welsh-email"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    inputs = {
      host = {
        connection = {
          name = "@parameters('$connections')['azurecommunicationservices']['connectionId']"
        }
      }
      method = "post"
      path   = "/emails:send"
      body = {
        to      = "[json('${jsonencode(local.welsh_emails)}')]"
        subject = "Monthly Welsh Language Usage Report - ${var.product} ${var.env}"
        body = {
          contentType = "HTML"
          content     = <<-HTML
            <h2>Monthly Welsh Language Usage Report</h2>
            <p>Environment: <strong>${var.product} ${var.env}</strong></p>
            <p>Reporting Period: <strong>Previous Month</strong></p>
            <p>This report shows the daily usage of Welsh language translation services.</p>
            <p>Query executed:</p>
            <pre>let startTime = startofmonth(datetime_add('month', -1, startofmonth(now())));
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
| project day, TotalSessions
| order by day asc
| render columnchart</pre>
          HTML
        }
      }
    }
    metadata = {
      flowSystemMetadata = {
        swaggerOperationId = "SendEmail"
      }
    }
    type = "ApiConnection"
  })

  depends_on = [azurerm_logic_app_action_custom.welsh_kql_query]
}

# API Connections for Welsh Logic App
resource "azurerm_logic_app_action_custom" "welsh_azure_monitor_connection" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "welsh-azure-monitor-connection"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    inputs = {
      api = {
        id = "[concat(subscription().id, '/providers/Microsoft.Web/locations/', parameters('location'), '/managedApis/', 'azuremonitorlogs')]"
      }
      name = "azuremonitorlogs"
      parameterValues = {
        token = {
          value = "Bearer @{listCallbackUrl()}"
        }
      }
    }
    type = "ApiConnection"
  })
}

resource "azurerm_logic_app_action_custom" "welsh_acs_email_connection" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = "welsh-acs-email-connection"
  logic_app_id = azurerm_logic_app_workflow.welsh_report_workflow.0.id

  body = jsonencode({
    inputs = {
      api = {
        id = "[concat(subscription().id, '/providers/Microsoft.Web/locations/', parameters('location'), '/managedApis/', 'azurecommunicationservices')]"
      }
      name = "azurecommunicationservices"
      parameterValues = {
        connectionString = data.azurerm_key_vault_secret.logic_app_acs_connection_string.0.value
      }
    }
    type = "ApiConnection"
  })

  depends_on = [data.azurerm_key_vault_secret.logic_app_acs_connection_string]
}

# Role Assignment for Welsh Logic App to access Log Analytics
resource "azurerm_role_assignment" "welsh_logic_app_log_analytics_reader" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_log_analytics_workspace.logic_app_workspace.0.id
  role_definition_name = "Log Analytics Reader"
  principal_id         = azurerm_logic_app_workflow.welsh_report_workflow.0.identity[0].principal_id
}
