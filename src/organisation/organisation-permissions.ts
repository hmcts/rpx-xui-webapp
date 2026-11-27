// GET /refdata/external/v1/organisations: documented IDAM roles permitted by PRD.
// https://hmcts.github.io/cnp-api-docs/api/rd-professional-api/#/organisation-external-controller/retrieveOrganisationUsingOrgIdentifier_1
const ORGANISATION_LOOKUP_ROLES = [
  'pui-organisation-manager',
  'pui-finance-manager',
  'pui-case-manager',
  'pui-caa',
  'pui-user-manager',
];

export function canLoadOrganisation(roles?: string[]): boolean {
  return roles?.some((role) => ORGANISATION_LOOKUP_ROLES.includes(role)) ?? false;
}
