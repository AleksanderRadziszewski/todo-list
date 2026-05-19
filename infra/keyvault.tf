resource "azurerm_key_vault_secret" "postgres_password" {
  name         = "POSTGRES-PASSWORD"
  key_vault_id = azurerm_key_vault.my_todo_app_kv.id
  value        = random_password.db_password.result
}