variable "subscription_id" {
  description = "logical container id"
  type        = string
}

variable "administrator_login" {
  description = "administration login"
  type        = string
}

variable "dockerhub_username" {
  description = "dockerhub username"
  type        = string
}

variable "postgres_user" {
  description = "todo-app database server username"
  type        = string
}
variable "postgres_db" {
  description = "todo-app database name"
  type        = string
}

variable "postgres_port" {
  description = "todo-app database server port"
  type        = string
}

variable "environment" {
  type = string
}

variable "location" {
  type    = string
  default = "West Europe"
}
variable "app_service_sku" {
  type    = string
  default = "F1"
}
variable "postgres_sku" {
  type    = string
  default = "B_Standard_B1ms"
}
