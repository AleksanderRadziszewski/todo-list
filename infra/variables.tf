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

variable "postgres_user" {}
variable "postgres_password" {}
variable "postgres_db" {}
variable "postgres_port" {}