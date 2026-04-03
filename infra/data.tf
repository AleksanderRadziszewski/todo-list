data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "my_todo_app_kv" {
  name                = "my-todo-app-kv"
  resource_group_name = "rg-todo-app-dev"
}

data "azuread_service_principal" "ado" {
  display_name = "todo-app-sp-pipeline"
}

data "azurerm_key_vault_secret" "app_secrets" {
  name         = "POSTGRES-PASSWORD"
  key_vault_id = azurerm_key_vault.my_todo_app_kv.id
}

data "azurerm_postgresql_flexible_server" "todo_app_server_db" {
  name                = "todo-app-server-db"
  resource_group_name = azurerm_resource_group.rg_todo_app_dev.name
}