variable "product" {
  type = "string"
}

variable "component" {
  type = "string"
}

variable "team_name" {
  default = "expert_ui"
}

variable "app_language" {
    default = "node"
}

variable "location" {
  type = "string"
  default = "UK South"
}

variable "env" {
  type = "string"
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

variable "node_tls_reject_unauthorized" {
    default = "1"
}

variable "secure_cookie" {
  default = "false"
}

variable "node_config_dir" {
  // for Windows
  default = "D:\\home\\site\\wwwroot\\config"
}
