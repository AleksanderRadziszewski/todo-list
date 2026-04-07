resource "azurerm_static_web_app" "todo_app_frontend" {
  name                = "todo-app-frontend-static"
  resource_group_name = azurerm_resource_group.rg_todo_app_dev.name
  location            = azurerm_resource_group.rg_todo_app_dev.location
  sku_tier            = "Free"
  sku_size            = "Free"

  app_settings = {
    "API_BASE_URL" = "https://${azurerm_linux_web_app.todo_app_as.default_site_hostname}"
  }
}