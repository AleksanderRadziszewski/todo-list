resource "azurerm_static_web_app" "todo-app-frontend" {
  name                = "todo-app-frontend-static"
  resource_group_name = azurerm_resource_group.rg-todo-app-dev.name
  location            = azurerm_resource_group.rg-todo-app-dev.location
  sku_tier            = "Free"
  sku_size            = "Free"
}