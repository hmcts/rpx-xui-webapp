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
  type = "map"
}

variable "enable_ase" {
    default = false
}
