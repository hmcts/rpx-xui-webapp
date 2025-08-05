output "microserviceName" {
  value = local.app_full_name
}

output "vaultName" {
  value = local.shared_vault_name
}

output "vaultUri" {
  value = data.azurerm_key_vault.key_vault.vault_uri
}

output "appInsightsInstrumentationKey" {
  value     = azurerm_application_insights.appinsight.instrumentation_key
  sensitive = true
}

output "appInsightsConnectionString" {
  value     = azurerm_application_insights.appinsight.connection_string
  sensitive = true
}

output "welshTranslationQueryId" {
  value       = azurerm_application_insights_analytics_item.welsh_translation_usage_query.id
  description = "ID of the Welsh Translation Usage saved query in Application Insights"
}