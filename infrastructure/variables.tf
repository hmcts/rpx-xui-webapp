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
