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
  workspace_id        = azurerm_log_analytics_workspace.app_insights_workspace.id

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



resource "azurerm_communication_service" "comm_service" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-acs-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  data_location       = "UK"
  tags                = var.common_tags
}

resource "azurerm_email_communication_service" "email_service" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-email-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  data_location       = "UK"
  tags                = var.common_tags
}

resource "azurerm_email_communication_service_domain" "email_domain" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "AzureManagedDomain"
  email_service_id    = azurerm_email_communication_service.email_service.0.id
  domain_management   = "AzureManaged"
}

resource "azurerm_communication_service_email_domain_association" "email_association" {
  count                  = var.welsh_reporting_enabled ? 1 : 0
  communication_service_id = azurerm_communication_service.comm_service.0.id
  email_service_domain_id  = azurerm_email_communication_service_domain.email_domain.0.id
}

resource "azurerm_role_assignment" "automation_acs_contributor" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_communication_service.comm_service.0.id
  role_definition_name = "Contributor"
  principal_id         = azurerm_automation_account.welsh_reporting.0.identity[0].principal_id
}

resource "azurerm_log_analytics_workspace" "app_insights_workspace" {
  name                = "${local.app_full_name}-law-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  location            = var.location
  sku                 = "PerGB2018"
  retention_in_days   = 30
  tags                = var.common_tags
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

resource "azurerm_api_connection" "azure_monitor" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-azuremonitor-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  managed_api_id      = "${local.managed_api_base_id}/azuremonitorlogs"
  display_name        = "Azure Monitor Logs Connection"
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

