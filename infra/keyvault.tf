resource "azurerm_key_vault_secret" "app_secrets" {
  name         = "db-password"
  key_vault_id = azurerm_key_vault.my_todo_app_kv.id
  value        = random_password.db_password.result
}

resource "azurerm_key_vault_secret" "swa_token" {
  name         = "swa-deployment-token"
  value        = azurerm_static_web_app.todo_app_frontend.api_key
  key_vault_id = azurerm_key_vault.my_todo_app_kv.id

  depends_on = [
    azurerm_static_web_app.todo_app_frontend
  ]
}