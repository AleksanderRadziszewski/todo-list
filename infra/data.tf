data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "my_todo_app_kv" {
  name                = "my-todo-app-kv"
  resource_group_name = "rg-todo-app-dev"
}