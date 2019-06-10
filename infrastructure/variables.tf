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

variable "shared_product_name" {
    default = "rpx"
}

variable "subscription" {
  type = "string"
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
