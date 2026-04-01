resource "azurerm_service_plan" "todo_app_service_plan_dev" {
  name                = "todo-app-service-plan"
  location            = azurerm_resource_group.rg_todo_app_dev.location
  resource_group_name = azurerm_resource_group.rg_todo_app_dev.name
  os_type             = "Linux"
  sku_name            = "F1"
}

resource "azurerm_linux_web_app" "todo_app_as" {
  name                = "todo-app-service"
  location            = azurerm_resource_group.rg_todo_app_dev.location
  resource_group_name = azurerm_resource_group.rg_todo_app_dev.name
  service_plan_id     = azurerm_service_plan.todo_app_service_plan_dev.id

  site_config {
    application_stack {
      docker_image_name  = "${var.dockerhub_username}/todo-app-backend:latest"
      docker_registry_url = "https://index.docker.io"
    }
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
  name                      = "my-todo-app-kv"
  location                  = azurerm_resource_group.rg_todo_app_dev.location
  resource_group_name       = azurerm_resource_group.rg_todo_app_dev.name
  tenant_id                 = data.azurerm_client_config.current.tenant_id
  sku_name                  = "standard"
}

resource "azurerm_role_assignment" "todo_app_kv_secrets_rbac" {
  scope                = data.azurerm_key_vault.my_todo_app_kv.id
  role_definition_name = "Key Vault Administrator"
  principal_id         = data.azuread_service_principal.ado.object_id
  principal_type       = "ServicePrincipal"

}
