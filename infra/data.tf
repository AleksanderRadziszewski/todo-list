data "azurerm_client_config" "current" {}
data "azuread_service_principal" "ado" {
  display_name = "todo-app-sp-pipeline"
}

data "azurerm_linux_web_app" "todo_app_as" {
  name                = azurerm_linux_web_app.todo_app_as.name
  resource_group_name = azurerm_linux_web_app.todo_app_as.resource_group_name
}