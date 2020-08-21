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

variable "common_tags" {
  type = "map"
}

variable "enable_ase" {
    default = false
}

variable "enable_ase" {
    default = false
}
