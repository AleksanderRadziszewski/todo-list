az group create --name rg-todo-app --location westeurope

az storage account create \
  --resource-group rg-todo-app \
  --name tfstatetodoapp \
  --sku Standard_LRS \
  --encryption-services blob

az storage container create \
  --name todo-app-tfstate \
  --account-name tfstatetodoapp
