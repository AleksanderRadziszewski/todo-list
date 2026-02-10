resource "azurerm_storage_account" "my_first_app_sa" {
  name                     = "my_first_app_storage_account"
  resource_group_name      = azurerm_resource_group.my_first_app_rg.name
  location                 = azurerm_resource_group.my_first_app_rg.location
  account_tier             = "Standard"
  account_replication_type = "GRS"

  tags = {
    environment = "dev"
  }
}