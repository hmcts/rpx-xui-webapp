variable "product" {
  type = "string"
}

variable "component" {
  type = "string"
}

variable "location" {
  type = "string"
  default = "UK South"
}

variable "env" {
  type = "string"
}

variable "common_tags" {
  type = "map"
}

// health service urls
variable "health_ccd_component_api" {}
variable "health_ccd_data_api" {}
variable "health_documents_api" {}
variable "health_en_anno_api" {}
variable "health_terms_and_conditions_api" {}

// service urls
variable "services_ccd_component_api" {}
variable "services_ccd_data_store_api" {}
variable "services_documents_api" {}
variable "services_em_anno_api" {}
variable "services_idam_api_url" {}
variable "services_idam_login_url" {}
variable "services_payments_url" {}
variable "services_s2s" {}
variable "services_terms_and_conditions" {}

variable "mc_http_proxy" {
  default = "http://172.16.0.7:8080"
}
variable "mc_no_proxy" {
  default = "localhost"
}
variable "session_secret" {
  default = "secretSauce"
}
variable "node_tls_reject_unauthorized" {
  default = "1"
}
variable "api_now" {
  default = "false"
}
variable "idam_client" {
  default = "xuiaowebapp"
}
variable "oauth_callback_url" {
  default = "/oauth2/callback"
}
variable "max_log_line" {
  default = "80"
}
variable "exception_options_max_lines" {
  default = "1"
}
variable "index_url" {
  default = "/"
}
variable "logging" {
  default = "debug"
}
variable "protocol" {
  default = "https"
}
variable "cookie_token" {
  default = "__auth__"
}
variable "cookie_user_id" {
  default = "__userid__"
}
variable "cookie_session_id" {
  default = "__sessionId__"
}
variable "microservice" {
  default = "xui_webapp"
}

variable "feature_secure_cookie_enabled" {
  default = "true"
}

variable "feature_app_insights_enabled" {
  default = "true"
}

variable "feature_proxy_enabled" {
  default = "false"
}

variable "feature_terms_and_conditions_enabled" {
  default = "false"
}

variable "feature_helmet_enabled" {
  default = "false"
}

variable "feature_redis_enabled" {
  default = "true"
}

variable "shared_product_name" {
    default = "rpx"
}

variable "subscription" {
  type = "string"
}

variable "allow_config_mutations" {
  default = "1"
}

variable "ilbIp"{}

variable "tenant_id" {}

variable "jenkins_AAD_objectId" {
  type                        = "string"
  description                 = "(Required) The Azure AD object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault. The object ID must be unique for the list of access policies."
}

variable "common_tags" {
  type = "map"
}

////////////////////////////////////////////////
//Addtional Vars ///////////////////////////////
////////////////////////////////////////////////
variable "capacity" {
  default = "1"
}

variable "additional_host_name" {
    default = "null"
}

variable "node_config_dir" {
  // for Windows
  default = "D:\\home\\site\\wwwroot\\config"
}

variable "enable_ase" {
    default = false
}
