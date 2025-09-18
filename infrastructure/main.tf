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

# Welsh Language Usage Reporting
data "azurerm_key_vault_secret" "welsh_report_email" {
  count        = var.welsh_reporting_enabled ? 1 : 0
  name         = var.welsh_email_address_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

locals {
  welsh_emails = var.welsh_reporting_enabled ? split(",", trimspace(data.azurerm_key_vault_secret.welsh_report_email.0.value)) : []
}

resource "azurerm_monitor_action_group" "welsh_usage_alerts" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-${var.welsh_action_group_name}-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  short_name          = "welsh-rpt"

  dynamic "email_receiver" {
    for_each = local.welsh_emails
    content {
      name          = "welsh-team-${email_receiver.key + 1}"
      email_address = trimspace(email_receiver.value)
    }
  }

  tags = var.common_tags
}

resource "azurerm_monitor_scheduled_query_rules_alert_v2" "welsh_usage_report" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-welsh-usage-${var.env}"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg.name

  scopes                = [module.application_insights.id]
  description           = "Monthly Welsh language usage report"
  enabled               = var.welsh_reporting_enabled
  severity              = 3
  evaluation_frequency  = "PT5M"  # 5 minutes in ISO 8601 format
  window_duration       = "P2D"  

  action {
    action_groups = [azurerm_monitor_action_group.welsh_usage_alerts.0.id]
  }

  criteria {
    # Note: This query is configured to execute daily, but it will only produce results on the 15th day of each month.
    # This ensures that the alert is triggered and the email is sent out just once per month, regardless of Welsh usage.
    query = <<-QUERY
let isReportDay = dayofmonth(now()) == 16;
    let currentMonth = startofmonth(now());
    let previousMonth = startofmonth(datetime_add('month', -1, currentMonth));
    let FilteredRequests = requests
    | where isReportDay 
    | where timestamp >= previousMonth and timestamp < currentMonth
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
    let WelshUsageData = UniqueSessionsPerDay
    | join kind=fullouter HasNoSession on day
    | extend
        SessionCount = coalesce(SessionCount, 0),
        NoSessionAddition = coalesce(NoSessionAddition, 0)
    | extend TotalSessions = SessionCount + NoSessionAddition
    | project day, TotalSessions
    | order by day asc;
    union WelshUsageData, (print day = currentMonth, TotalSessions = 0, reportGenerated = "No Welsh usage in previous month")
    | where isReportDay
    | project day, TotalSessions
    | render columnchart
    QUERY

    time_aggregation_method = "Count"
    threshold               = 0
    operator                = "GreaterThan"

    failing_periods {
      minimum_failing_periods_to_trigger_alert = 1
      number_of_evaluation_periods             = 1
    }
  }

  tags = var.common_tags
}
