export const CASEWORKER_INDENTIFIER = 'caseworker'

/**
 * User Has Application Access
 *
 * We check that a User has access to the Manage Case application; they need to have a
 * 'caseworker' role.
 *
 * A caseworker role is always prefixed with 'caseworker', therefore we can use .includes() to check if one
 * of their roles contains 'caseworker'.
 *
 * @see EUI-1073
 * @param roles - @see unit
 */
export const userHasAppAccess = roles => roles.filter(role => role.includes(CASEWORKER_INDENTIFIER)).length > 0
