locals {
    app_full_name = "xui-${var.component}"
    ase_name = "core-compute-${var.env}"
    local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"
    shared_vault_name = "${var.shared_product_name}-${local.local_env}"
}

data "azurerm_key_vault" "key_vault" {
    name = local.shared_vault_name
    resource_group_name = local.shared_vault_name
}

data "azurerm_key_vault_secret" "s2s_secret" {
    name = "mc-s2s-client-secret"
    key_vault_id = data.azurerm_key_vault.key_vault.id
}

data "azurerm_key_vault_secret" "oauth2_secret" {
    name = "mc-idam-client-secret"
    key_vault_id = data.azurerm_key_vault.key_vault.id
}

provider "azurerm" {
    features {}
}

// This web app is not in used
module "app" {
    source = "git@github.com:hmcts/cnp-module-webapp?ref=master"
    product = "${local.app_full_name}"
    location = "${var.location}"
    env = "${var.env}"
    subscription = "${var.subscription}"
    common_tags  = "${var.common_tags}"
    asp_rg = "${local.app_full_name}-${var.env}"
    enable_ase = "${var.enable_ase}"
    app_settings = {}
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name  = "core-infra-${var.env}"
}

resource "azurerm_key_vault_secret" "redis_connection_string" {
  name = "${var.component}-redis-connection-string"
  value = "redis://ignore:${urlencode(module.redis-cache.access_key)}@${module.redis-cache.host_name}:${module.redis-cache.redis_port}?tls=true"
  key_vault_id = data.azurerm_key_vault.key_vault.id
}

module "redis-cache" {
  source      = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product     = "${var.shared_product_name}-mc-redis"
  location    = var.location
  env         = var.env
  subnetid    = data.azurerm_subnet.core_infra_redis_subnet.id
  common_tags = var.common_tags
}

resource "azurerm_application_insights" "appinsights" {
  name                = "${local.app_full_name}-appinsights-${var.env}"
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
  value        = azurerm_application_insights.appinsights.instrumentation_key
  key_vault_id = data.azurerm_key_vault.key_vault.id
}