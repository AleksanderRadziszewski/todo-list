variable "subscription_id" {
    description = "logical container id"
    type = string
}

variable "administrator_login" {
    description = "administration login"
    type = string
}

variable "administrator_password" {
    description = "administration password"
    type = string
}

variable "db_password" {
    description = "password to postgres db"
    type = string
    sensitive = true
}