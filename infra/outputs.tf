output "deployment_token" {
  value     = azurerm_static_web_app.todo_app_frontend.api_key
  sensitive = true
}