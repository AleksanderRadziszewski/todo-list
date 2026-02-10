terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=4.1.0"
    }
  }
  required_version = "=1.14.4"
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "my_first_app_rg" {
    name = "my_first_app"
    location = "West Europe"
}
