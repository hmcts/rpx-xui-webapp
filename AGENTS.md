## Code Review Rules

### Access and navigation

- Flag changes that remove access from an existing supported user group or
  grant access to an unintended group. Compare IDAM roles and AM assignments
  before and after the change. Check menu visibility and direct navigation.
  Account for access changes explicitly required by the feature.

### Feature flags

- Flag regressions in supported flag combinations. When features can be enabled
  independently, trace each combination through frontend and backend configuration.

### Dependency changes

- When a dependency version changes, check the exact resolutions in the lockfile.
  Use any supplied upstream diff to trace changed APIs, defaults, or behaviour
  through the ExUI callers that rely on them. Flag concrete compatibility issues
  or cases where a user journey still resolves to a version without the intended
  fix. When upstream context is unavailable, ground findings in evidence from
  ExUI and the lockfile.
- For major upgrades, check the migration requirements that apply to ExUI,
  including changed APIs and defaults, peer dependencies, and supported runtime
  or build-tool versions. Flag required changes the PR missed.
