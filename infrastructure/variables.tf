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

variable "welsh_reporting_enabled" {
  default     = false
  description = "Enable Welsh language usage reporting"
  type        = bool
}

variable "welsh_email_address_key" {
  default     = "welsh-report-email"
  description = "Email address key in azure Key Vault for Welsh reporting."
  type        = string
}

# Logic App Configuration for KQL Reports (gated by welsh_reporting_enabled)

variable "logic_app_schedule_interval" {
  default     = 1
  description = "Interval for Logic App recurrence (in months)"
  type        = number
}

variable "logic_app_schedule_frequency" {
  default     = "Month"
  description = "Frequency for Logic App recurrence"
  type        = string
}



variable "logic_app_acs_connection_string_key" {
  default     = "acs-email-connection-string"
  description = "Key vault key for Azure Communication Services connection string"
  type        = string
}

variable "logic_app_log_analytics_workspace_name" {
  default     = "hmcts-prod"
  description = "Log Analytics workspace name for KQL queries"
  type        = string
}

variable "logic_app_log_analytics_resource_group" {
  default     = "oms-automation"
  description = "Resource group for Log Analytics workspace"
  type        = string
}

variable "logic_app_kql_query" {
  default     = "requests | where timestamp > ago(30d) | summarize count() by bin(timestamp, 1d) | render columnchart"
  description = "KQL query to execute and email results"
  type        = string
}

# Environment-specific Log Analytics workspace mappings
variable "env_log_analytics_workspace_map" {
  type        = map(string)
  description = "Mapping of environment to Log Analytics workspace names"
  default = {
    prod     = "hmcts-prod"
    aat      = "hmcts-aat"
    perftest = "hmcts-perftest"
  }
}

variable "env_log_analytics_rg_map" {
  type        = map(string)
  description = "Mapping of environment to Log Analytics resource groups"
  default = {
    prod     = "oms-automation"
    aat      = "oms-automation-aat"
    perftest = "oms-automation-perftest"
  }
}
