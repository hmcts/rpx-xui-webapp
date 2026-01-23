resource "azurerm_email_communication_service" "email_service" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-email-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  data_location       = "UK"
  tags                = var.common_tags
}

resource "azurerm_email_communication_service_domain" "email_domain" {
  count            = var.welsh_reporting_enabled ? 1 : 0
  name             = "AzureManagedDomain"
  email_service_id = azurerm_email_communication_service.email_service.0.id
  domain_management = "AzureManaged"

  tags = var.common_tags
}

resource "azurerm_communication_service" "comm_service" {
  count               = var.welsh_reporting_enabled ? 1 : 0
  name                = "${local.app_full_name}-comm-${var.env}"
  resource_group_name = azurerm_resource_group.rg.name
  data_location       = "UK"
  tags                = var.common_tags
}

resource "azurerm_communication_service_email_domain_association" "domain_association" {
  count                    = var.welsh_reporting_enabled ? 1 : 0
  communication_service_id = azurerm_communication_service.comm_service.0.id
  email_service_domain_id  = azurerm_email_communication_service_domain.email_domain.0.id
}

# Role Assignment for Automation Account to send emails via ACS
resource "azurerm_role_assignment" "automation_acs_contributor" {
  count                = var.welsh_reporting_enabled ? 1 : 0
  scope                = azurerm_communication_service.comm_service.0.id
  role_definition_name = "Contributor" # Or a more specific role if available like "Communication Service Email Sender" (Preview)
  principal_id         = azurerm_automation_account.welsh_reporting.0.identity[0].principal_id
}
