resource "azurerm_key_vault_secret" "app_secrets" {
  name         = "db-password"
  key_vault_id = azurerm_key_vault.my_todo_app_kv.id
  value        = random_password.db_password.result
}