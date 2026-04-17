resource "azurerm_service_plan" "todo_app_service_plan" {
  name                = "todo-app-${var.environment}-service-plan"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg_todo_app.name
  os_type             = "Linux"
  sku_name            = var.app_service_sku
}

resource "azurerm_linux_web_app" "todo_app_as" {
  name                = "todo-app-${var.environment}-service"
  location            = var.location
  resource_group_name = azurerm_resource_group.rg_todo_app.name
  service_plan_id     = azurerm_service_plan.todo_app_service_plan.id

  site_config {
    always_on = false
    cors {
      allowed_origins = [data.azurerm_static_web_app.frontend.default_host_name]
    }
    application_stack {
      docker_image_name   = "${var.dockerhub_username}/todo-app-backend:latest"
      docker_registry_url = "https://index.docker.io"
    }
  }
  app_settings = {
    POSTGRES_HOST     = azurerm_postgresql_flexible_server.todo_app_server_db.fqdn
    POSTGRES_USER     = var.postgres_user
    POSTGRES_PASSWORD = azurerm_key_vault_secret.app_secrets.value
    POSTGRES_DB       = var.postgres_db
    POSTGRES_PORT     = var.postgres_port
  }
  identity {
    type = "SystemAssigned"
  }
}

resource "random_password" "db_password" {
  length  = 20
  special = true
}

resource "azurerm_key_vault" "my_todo_app_kv" {
  enable_rbac_authorization = true
  name                      = "my-todo-app-${var.environment}-kv"
  location                  = var.location
  resource_group_name       = azurerm_resource_group.rg_todo_app.name
  tenant_id                 = data.azurerm_client_config.current.tenant_id
  sku_name                  = "standard"
}

resource "azurerm_role_assignment" "todo_app_kv_secrets_rbac" {
  scope                = azurerm_key_vault.my_todo_app_kv.id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azuread_service_principal.ado.object_id
  principal_type       = "ServicePrincipal"

}
