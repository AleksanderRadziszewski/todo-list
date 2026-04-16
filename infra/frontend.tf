resource "azurerm_static_web_app" "todo_app_frontend" {
  name                = "todo-app-${var.environment}-frontend-static"
  resource_group_name = azurerm_resource_group.rg_todo_app.name
  location            = var.location
  sku_tier            = "Free"
  sku_size            = "Free"

  app_settings = {
    VITE_API_BASE_URL = "https://${azurerm_linux_web_app.todo_app_as.default_hostname}"
  }
}