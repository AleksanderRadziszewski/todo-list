resource "azurerm_postgresql_flexible_server" "todo_app_server_db" {
  name                   = "todo-app-server-db"
  resource_group_name    = azurerm_resource_group.rg_todo_app.name
  location               = var.location
  version                = "15"
  zone                   = "3"
  administrator_login    = var.administrator_login
  administrator_password = random_password.db_password.result

  sku_name   = var.postgres_sku
  storage_mb = 32768

  authentication {
    password_auth_enabled = true
  }
}

resource "azurerm_postgresql_flexible_server_database" "todo_app_db" {
  name      = "todo-app-db"
  server_id = azurerm_postgresql_flexible_server.todo_app_server_db.id
  collation = "en_US.utf8"
  charset   = "UTF8"
  depends_on = [
    azurerm_postgresql_flexible_server.todo_app_server_db
  ]
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.todo_app_server_db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}
