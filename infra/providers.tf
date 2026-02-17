terraform {
  backend "azurerm" {}
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
