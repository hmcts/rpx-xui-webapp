import {config} from '../config'

/**
 * getLoginRoleMatcher
 *
 * The role who is able to access this application should have a prefix of 'caseworker'.
 *
 * The matcher is passed in through the config.
 *
 * @returns {string} - ie. 'caseworker'
 */
export const getLoginRoleMatcher = () => config.loginRoleMatcher

/**
 * User Has Application Access
 *
 * We check that a User has access to the Manage Case application; they need to have a
 * 'caseworker' role.
 *
 * A User maybe able to get past Idam ie. If they have an manage-organisation or approve-organisation role,
 * but we need to be able to stop that User from being able to use this application hence the need for this
 * function.
 *
 * A caseworker role is always prefixed with 'caseworker', therefore we can use .includes() to check if one
 * of their roles contains 'caseworker'.
 *
 * If the application cannot hit the configuration ROLE_IDENTIFIER property, then we allow all users who pass through
 * the Idam login into the application.
 *
 * @see EUI-1073
 * @param roles - @see unit
 */
export const userHasAppAccess = roles => {

  if (getLoginRoleMatcher()) {
    return roles.filter(role => role.includes(getLoginRoleMatcher())).length > 0
  } else {
    return true
  }
}
