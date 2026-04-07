data "azurerm_client_config" "current" {}
data "azuread_service_principal" "ado" {
  display_name = "todo-app-sp-pipeline"
}

data "azurerm_app_service" "todo_app_as" {
  name                = "todo-app-as"
  resource_group_name = "todo-rg"
}