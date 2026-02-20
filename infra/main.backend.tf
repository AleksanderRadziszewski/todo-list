resource "azurerm_service_plan" "todo-app-service-plan-dev" {
  name                = "todo-app-service-plan"
  location            = azurerm_resource_group.rg-todo-app-dev.location
  resource_group_name = azurerm_resource_group.rg-todo-app-dev.name
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "todo-app-as" {
  name                = "todo-app-service"
  location            = azurerm_resource_group.rg-todo-app-dev.location
  resource_group_name = azurerm_resource_group.rg-todo-app-dev.name
  service_plan_id     = azurerm_service_plan.todo-app-service-plan-dev.id

  site_config {
    always_on = false
    application_stack {
      docker_image_name        = "todo-app-backend:latest"
      docker_registry_url      = "https://index.docker.io/"
    }
  }
  identity {
    type = "SystemAssigned"
  }
}

resource "azurerm_postgresql_flexible_server" "postgres" {
  name                   = "todo-app-db"
  resource_group_name    = azurerm_resource_group.rg-todo-app-dev.name
  location               = azurerm_resource_group.rg-todo-app-dev.location
  version                = "15"

  administrator_login    = var.administrator_login
  administrator_password = var.administrator_password

  sku_name   = "B_Standard_B1ms"
  storage_mb = 32768

  backup_retention_days = 7
  geo_redundant_backup_enabled = false

  zone = "1"
}

resource "azurerm_postgresql_flexible_server_database" "todo-app-db" {
  name      = "todo-app-db"
  server_id = azurerm_postgresql_flexible_server.postgres.id
  collation = "en_US.utf8"
  charset   = "UTF8"
}

resource "azurerm_postgresql_flexible_server_firewall_rule" "allow_azure" {
  name             = "allow-azure-services"
  server_id        = azurerm_postgresql_flexible_server.postgres.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}