terraform {
  backend "azurerm" {
    resource_group_name  = "my_first_app"
    storage_account_name = azurerm_storage_account.my_first_app_sa.name
    container_name       = "my-terraform-state-container"
    key                  = "terraform.tfstate"
  }
}