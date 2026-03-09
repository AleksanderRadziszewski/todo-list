data "azurerm_client_config" "current" {}

data "azurerm_key_vault" "todo_kv" {
  name                = "my-todo-app-kv"
  resource_group_name = "rg-todo-app-dev"
}