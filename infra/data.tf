data "azurerm_client_config" "current" {}
data "azuread_service_principal" "ado" {
  display_name = "todo-app-sp-pipeline"
}

data "azurerm_static_web_app" "frontend" {
  name = "deafult url"
  resource_group_name = "rg-todo-app-${var.environment}"
}