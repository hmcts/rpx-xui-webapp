variable "product" {}

variable "component" {}

variable "location" {
  default = "UK South"
}

variable "env" {}

variable "shared_product_name" {
  default = "rpx"
}

variable "subscription" {}

variable "common_tags" {
  type = map(string)
}

variable "enable_ase" {
  default = false
}

variable "application_type" {
  default     = "web"
  description = "Type of Application Insights (Web/Other)"
}

variable "sampling_percentage" {
  default     = 1
  description = "Specifies the sampling percentage for Application Insights"
}

variable "redis_family" {
  default     = "C"
  description = "The SKU family/pricing group to use. Valid values are `C` (for Basic/Standard SKU family) and `P` (for Premium). Use P for higher availability, but beware it costs a lot more."
}

variable "redis_sku_name" {
  default     = "Basic"
  description = "The SKU of Redis to use. Possible values are `Basic`, `Standard` and `Premium`."
}

variable "redis_capacity" {
  default     = "1"
  description = "The size of the Redis cache to deploy. Valid values are 1, 2, 3, 4, 5"
}

variable "managed_redis_sku_name" {
  default     = "Balanced_B1"
  description = "The SKU to use for Azure Managed Redis. Balanced_B1 matches the legacy Basic C1 cache used by environments without a tfvars override."
  type        = string
}

variable "private_dns_subscription_id" {
  default     = "1baf5470-1c3e-40d3-a6f7-74bfbce4b348"
  description = "Subscription ID containing the shared Azure Managed Redis private DNS zone."
  type        = string
}

variable "welsh_reporting_enabled" {
  default     = false
  description = "Enable Welsh language usage reporting"
  type        = bool
}

variable "exui_weekly_stats_enabled" {
  default     = false
  description = "Enable ExUI weekly stats reporting"
  type        = bool
}

variable "welsh_email_address_key" {
  default     = "welsh-report-email"
  description = "Email address key in azure Key Vault for Welsh reporting."
  type        = string
}

variable "exui_weekly_stats_email_address_key" {
  default     = "exui-weekly-stats-email"
  description = "Email address key in azure Key Vault for ExUI weekly stats reporting."
  type        = string
}

variable "exui_throughput_stats_email_address_key" {
  default     = "exui-throughput-stats-email"
  description = "Email address key in azure Key Vault for ExUI throughput stats reporting."
  type        = string
}

variable "exui_throughput_stats_enabled" {
  default     = false
  description = "Enable ExUI request throughput stats reporting"
  type        = bool
}

variable "exui_pui_activations_enabled" {
  default     = false
  description = "Enable ExUI PUI activations weekly reporting (daily unique IDAM activations via pui- clients)"
  type        = bool
}

variable "exui_pui_activations_email_address_key" {
  default     = "exui-pui-activations-email"
  description = "Email address key in Azure Key Vault for ExUI PUI activations reporting."
  type        = string
}
