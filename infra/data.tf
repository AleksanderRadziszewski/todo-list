data "azurerm_client_config" "current" {}
data "azuread_service_principal" "ado" {
  display_name = "todo-app-sp-pipeline"
}