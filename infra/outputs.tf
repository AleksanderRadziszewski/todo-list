output "deployment_token" {
  value     = azurerm_static_web_app.todo-app-frontend.api_key
  sensitive = true
}