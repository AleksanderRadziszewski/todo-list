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

# resource "azurerm_container_registry" "acr" {
#   name                = "docker registry"
#   resource_group_name = azurerm_resource_group.rg-todo-app-dev.name
#   location            = azurerm_resource_group.rg-todo-app-dev.location
#   sku                 = "Basic"
#   admin_enabled       = false
# }




# }
