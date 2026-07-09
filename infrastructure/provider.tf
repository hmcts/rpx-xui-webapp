terraform {
  backend "azurerm" {}

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  required_version = "~> 1.11.0"
}

provider "azurerm" {
  features {}
  resource_provider_registrations = "none"
}
