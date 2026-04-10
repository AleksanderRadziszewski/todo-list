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

variable "frontend_url" {
  type = string
} 