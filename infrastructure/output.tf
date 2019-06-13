output "microserviceName" {
  value = "${local.app_full_name}"
}

output "vaultName" {
    value = "${local.shared_vault_name}"
}

output "vaultUri" {
  value = "${data.azurerm_key_vault.key_vault.vault_uri}"
}
