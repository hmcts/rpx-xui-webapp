# Redis Variables
# Production peaks around 3 GB; B5 provides 6 GB before the service reserve.
managed_redis_sku_name = "Balanced_B5"

# Application Insights
sampling_percentage = 100

# Welsh Reporting
welsh_reporting_enabled = true

# ExUI Weekly Stats Reporting
exui_weekly_stats_enabled = true

# ExUI Throughput Stats Reporting
exui_throughput_stats_enabled = true

# ExUI PUI Activations Reporting
exui_pui_activations_enabled = true

# ExUI Manage Organisation Login Stats Reporting
# Enable only after the exui-mo-logins-stats-email secret is configured in the shared vault.
exui_mo_logins_stats_enabled = false
