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
    enable_ase = "${var.enable_ase}"

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
        DUMMY_VAR = "TRUE"
        NODE_CONFIG_DIR = "${var.node_config_dir}"

        # Allow secrets to be attached to the node-config object
        ALLOW_CONFIG_MUTATIONS = "${var.allow_config_mutations}"

        # Need to check these vault values - dont seem right here.
        S2S_SECRET = "${data.azurerm_key_vault_secret.s2s_secret.value}"
        IDAM_SECRET = "${data.azurerm_key_vault_secret.oauth2_secret.value}"
        NODE_TLS_REJECT_UNAUTHORIZED = "${var.node_tls_reject_unauthorized}"

        NODE_CONFIG_ENV = "${var.env}"
        MAX_LOG_LINE = "${var.max_log_line}"
        PROTOCOL = "${var.protocol}"
        MICROSERVICE = "${var.microservice}"
        SESSION_SECRET = "${var.session_secret}"
        ALLOW_CONFIG_MUTATIONS = "${var.allow_config_mutations}"
        MC_HTTP_PROXY = "${var.mc_http_proxy}"
        MC_NO_PROXY = "${var.mc_no_proxy}"
        NOW = "${var.api_now}"
        # Health Endpoints
        HEALTH_CCD_COMPONENT_API = "${var.health_ccd_component_api}"
        HEALTH_CCD_DATA_API = "${var.health_ccd_data_api}"
        HEALTH_DOCUMENTS_API = "${var.health_documents_api}"
        HEALTH_EM_ANNO_API = "${var.health_en_anno_api}"
        HEALTH_TERMS_AND_CONDITIONS_API = "${var.health_terms_and_conditions_api}"
        # Services CCD Endpoints
        SERVICES_CCD_COMPONENT_API = "${var.services_ccd_component_api}"
        SERVICES_CCD_DATA_STORE_API = "${var.services_ccd_data_store_api}"
        # Services Documents Endpoints
        SERVICES_DOCUMENTS_API = "${var.services_documents_api}"
        # Services Em Anno
        SERVICES_EM_ANNO_API = "${var.services_em_anno_api}"
        # Services Idam
        SERVICES_IDAM_API_URL = "${var.services_idam_api_url}"
        SERVICES_IDAM_LOGIN_URL = "${var.services_idam_login_url}"
        # Services payments
        SERVICES_S2S = "${var.services_payments_url}"
        # Services S2s
        SERVICES_S2S = "${var.services_s2s}"
        # Services T&Cs
        SERVICES_TERMS_AND_CONDITIONS = "${var.services_terms_and_conditions}"

        COOKIE_TOKEN = "${var.cookie_token}"
        COOKIE_USER_ID = "${var.cookie_user_id}"
        COOKIES_SESSION_ID = "${var.cookie_session_id}"


        # FEATURE TOGGLES
        FEATURE_APP_INSIGHTS_ENABLED = "${var.feature_app_insights_enabled}"
        FEATURE_SECURE_COOKIE_ENABLED = "${var.feature_secure_cookie_enabled}"
        FEATURE_PROXY_ENABLED = "${var.feature_proxy_enabled}"
        FEATURE_TERMS_AND_CONDITIONS_ENABLED = "${var.feature_terms_and_conditions_enabled}"
        FEATURE_HELMET_ENABLED = "${var.feature_helmet_enabled}"
        FEATURE_REDIS_ENABLED = "${var.feature_redis_enabled}"

        WEBSITE_NODE_DEFAULT_VERSION  = "12.13.0"

        // Redis Cloud
        REDISCLOUD_URL = "redis://ignore:${urlencode(module.redis-cache.access_key)}@${module.redis-cache.host_name}:${module.redis-cache.redis_port}?tls=true"
    }
}


data "azurerm_key_vault" "key_vault" {
    name = "${local.shared_vault_name}"
    resource_group_name = "${local.shared_vault_name}"
}

provider "azurerm" {
    version = "1.44.0"
}

data "azurerm_subnet" "core_infra_redis_subnet" {
  name                 = "core-infra-subnet-1-${var.env}"
  virtual_network_name = "core-infra-vnet-${var.env}"
  resource_group_name  = "core-infra-${var.env}"
}

resource "azurerm_key_vault_secret" "redis_connection_string" {
  name = "${var.component}-redis-connection-string"
  value = "redis://ignore:${urlencode(module.redis-cache.access_key)}@${module.redis-cache.host_name}:${module.redis-cache.redis_port}?tls=true"
  key_vault_id = "${data.azurerm_key_vault.key_vault.id}"
}

module "redis-cache" {
  source      = "git@github.com:hmcts/cnp-module-redis?ref=master"
  product     = "${var.shared_product_name}-mc-redis"
  location    = "${var.location}"
  env         = "${var.env}"
  subnetid    = "${data.azurerm_subnet.core_infra_redis_subnet.id}"
  common_tags = "${var.common_tags}"
}
