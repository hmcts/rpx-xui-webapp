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

output "logicAppWorkflowId" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_workflow.kql_report_workflow.0.id : null
}

output "logicAppWorkflowName" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_workflow.kql_report_workflow.0.name : null
}

output "logicAppTriggerName" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_trigger_recurrence.monthly_trigger.0.name : null
}

output "welshLogicAppWorkflowId" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_workflow.welsh_report_workflow.0.id : null
}

output "welshLogicAppWorkflowName" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_workflow.welsh_report_workflow.0.name : null
}

output "welshLogicAppTriggerName" {
  value = var.welsh_reporting_enabled ? azurerm_logic_app_trigger_recurrence.welsh_monthly_trigger.0.name : null
}