resource "azurerm_postgresql_flexible_server" "todo-app-server-db" {
  name                   = "todo-app-server-db"
  resource_group_name    = azurerm_resource_group.rg-todo-app-dev.name
  location               = azurerm_resource_group.rg-todo-app-dev.location
  version                = "15"

  administrator_login    = var.administrator_login
  administrator_password = var.db_password

  sku_name   = "B_Standard_B1ms"
  storage_mb = 32768
  authentication {
    password_auth_enabled = true
  }
}
resource "azurerm_postgresql_flexible_server_database" "todo-app-db" {
  name      = "todo-app-db"
  server_id = azurerm_postgresql_flexible_server.todo-app-server-db.id
  collation = "en_US.utf8"
  charset   = "UTF8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.todo-app-server-db.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}