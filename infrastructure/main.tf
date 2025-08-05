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

resource "azurerm_application_insights_analytics_item" "welsh_translation_usage_query" {
  name                    = "Welsh Translation Usage - Monthly Sessions"
  application_insights_id = module.application_insights.id
  type                    = "query"
  scope                   = "shared"
  
  content = <<-EOT
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
  EOT

  tags = var.common_tags
}
