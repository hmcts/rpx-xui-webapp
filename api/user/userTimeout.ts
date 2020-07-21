import { arrayPatternMatch, sortArray } from '@hmcts/rpx-xui-node-lib'

/**
 * Default Session Idle Time
 *
 * If the timeout configuration has not been set, or the User has no roles ( although the
 * User shouldn't reach this point if they have no roles associated with them ) the
 * default session idle time will be used.
 */

export const DEFAULT_SESSION_TIMEOUT = {
  idleModalDisplayTime: 10,
  pattern: 'ERROR: NO-SESSION_TIMEOUT_SET. You need to set a DEFAULT Session Timeout for this application through' +
  'the configuration file. ie. use the pattern ".", @see unit tests. The totalIdleTime will be set to a low value.',
  totalIdleTime: 480,
}

/**
 * Get User Session Timeout
 *
 * We calculate the timeout for this user.
 *
 * Firstly sort the User's Roles alphabetically. Why? So that a priority order can be given to the Session Timeout +
 * configuration list.
 *
 * A user is given a specified timeout based on their User Roles, and a given set of
 * statically configured Session Timeouts, defined by the XUI team for a User Role Group.
 *
 * Example:
 *
 * A Department of Work & Pensions User on Manage Cases should have a Total Idle Time of 12 minutes, and
 * and should show the Session Timeout Modal 3 minutes before the end of their session.
 *
 * Whereas a Manage Organisation application user should have an Total Idle Time of 50 minutes,
 * and should show the Session Timeout Modal 10 minutes before the end of their session.
 *
 * Note that the Session Timeout needs to be easily configurable and will change for each XUI
 * application, and each User role group.
 *
 * Important: the Session Timeout configuration should be in PRIORITY ORDER, with the DEFAULT for
 * this application being the last item in the array.
 *
 * Jargon:
 *
 * Session Timeout Modal - The modal popup that appears BEFORE the users Total Idle Time is over.
 * Total Idle Time - The Users total idle time, this includes time in which we show the Session Timeout Modal to the User.
 * Session Timeout Configuration - An array that contains the Applications and User Groups session timeout times.
 * Session Timeout - The idle timeout time for that User.
 *
 * @param userRoles - [
 * 'pui-organisation-manager',
 * ]
 * @param sessionTimeouts - @see unit tests
 * @returns
 */
export const getUserSessionTimeout = (userRoles, sessionTimeouts) => {

  const sortedUserRoles = sortArray(userRoles)

  for (const sessionTimeout of sessionTimeouts) {
    if (arrayPatternMatch(sortedUserRoles, sessionTimeout.pattern)) {
      return sessionTimeout
    }
  }

  return DEFAULT_SESSION_TIMEOUT
}
