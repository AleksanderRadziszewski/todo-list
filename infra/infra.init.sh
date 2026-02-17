az group create --name rg-todo-app-dev --location westeurope

az storage account create \
  --resource-group rg-todo-app-dev \
  --name tfstatetodoappdev \
  --sku Standard_LRS \
  --encryption-services blob

az storage container create \
  --name todo-app-tfstate \
  --account-name tfstatetodoappdev
