output "postgres_host" {
  value = azurerm_postgresql_flexible_server.todo_app_server_db.fqdn
}