locals {
    app_full_name = "xui-${var.component}"
    ase_name = "core-compute-${var.env}"
    local_env = "${(var.env == "preview" || var.env == "spreview") ? (var.env == "preview" ) ? "aat" : "saat" : var.env}"
    shared_vault_name = "${var.shared_product_name}-${local.local_env}"
}

module "app" {
    source = "git@github.com:hmcts/cnp-module-webapp?ref=master"
    product = "${local.app_full_name}"
    location = "${var.location}"
    env = "${var.env}"
    ilbIp = "${var.ilbIp}"
    subscription = "${var.subscription}"
    capacity     = "${var.capacity}"
    is_frontend = "${!(var.env == "preview" || var.env == "spreview") ? 1 : 0}"
    additional_host_name = "${var.additional_host_name}"
    https_only="true"
    common_tags  = "${var.common_tags}"
    asp_rg = "${local.app_full_name}-${var.env}"
    asp_name = "${var.shared_product_name}-${var.env}"
    #asp_name = "${var.env == "prod" ? "TBD" : "${var.shared_product_name}-${var.env}"}"

    app_settings = {
        # logging vars & healthcheck
        REFORM_SERVICE_NAME = "${local.app_full_name}"
        REFORM_TEAM = "${var.team_name}"
        REFORM_SERVICE_TYPE = "${var.app_language}"
        REFORM_ENVIRONMENT = "${var.env}"

        PACKAGES_NAME = "${local.app_full_name}"
        PACKAGES_PROJECT = "${var.team_name}"
        PACKAGES_ENVIRONMENT = "${var.env}"
        XUI_ENV = "${var.env}"

        # Need to check these vault values - dont seem right here.
        S2S_SECRET = "${data.azurerm_key_vault_secret.s2s_secret.value}"
        IDAM_SECRET = "${data.azurerm_key_vault_secret.oauth2_secret.value}"
    

    }
}


data "azurerm_key_vault" "key_vault" {
    name = "${local.shared_vault_name}"
    resource_group_name = "${local.shared_vault_name}"
}

data "azurerm_key_vault_secret" "s2s_secret" {
    name = "xui-s2s-token"
    vault_uri = "${data.azurerm_key_vault.key_vault.vault_uri}"
}

data "azurerm_key_vault_secret" "oauth2_secret" {
    name = "xui-oauth2-token"
    vault_uri = "${data.azurerm_key_vault.key_vault.vault_uri}"
}

provider "azurerm" {
    version = "1.22.1"
}
