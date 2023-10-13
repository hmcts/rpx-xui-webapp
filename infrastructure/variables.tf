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
  default     = "P"
}

variable "redis_capacity" {
  default     = "2"
}
