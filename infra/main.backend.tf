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

resource "azurerm_key_vault" "todo-app-kv" {
  name                = "todo-app-kv"
  location            = azurerm_resource_group.rg-todo-app-dev.location
  resource_group_name = azurerm_resource_group.rg-todo-app-dev.name
  tenant_id           = data.azurerm_client_config.current.tenant_id
  sku_name            = "standard"
}

resource "azurerm_key_vault_secret" "db_password" {
  name         = "postgres-password"
  value        = var.db_password
  key_vault_id = azurerm_key_vault.todo-app-kv.id
}

resource "azurerm_key_vault_access_policy" "app_policy" {
  key_vault_id = azurerm_key_vault.todo-app-kv.id
  tenant_id    = azurerm_linux_web_app.todo-app-as.identity[0].tenant_id
  object_id    = azurerm_linux_web_app.todo-app-as.identity[0].principal_id

  secret_permissions = [
    "Get",
    "List",
    "Set",
    "Delete",
    "Backup",
    "Restore",
    "Recover",
    "Purge"
  ]
}