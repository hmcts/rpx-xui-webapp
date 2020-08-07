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

variable "shared_product_name" {
    default = "rpx"
}

variable "subscription" {
  type = "string"
}

variable "ilbIp"{}

variable "common_tags" {
  type = "map"
}

variable "enable_ase" {
    default = false
}
