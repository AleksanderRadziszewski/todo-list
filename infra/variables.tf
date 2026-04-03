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

variable "keyvault_db_secret_uri" {
  description = "Full URI of the Key Vault db secret for Postgres password"
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