locals {
    app_full_name = "xui-${var.component}"
    ase_name = "core-compute-${var.env}"
    local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"
    shared_vault_name = "${var.shared_product_name}-${local.local_env}"
}

// (DO NOT REMOVE)
module "app" {
    source = "git@github.com:hmcts/cnp-module-webapp?ref=master"
    product = local.app_full_name
    location = var.location
    env = var.env
    subscription = var.subscription
    common_tags  = var.common_tags
    asp_rg = "${local.app_full_name}-${var.env}"
    enable_ase = var.enable_ase
    app_settings = {}
}

data "azurerm_key_vault" "key_vault" {
    name = local.shared_vault_name
    resource_group_name = local.shared_vault_name
}

provider "azurerm" {
    features {}
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
