import { getUserSessionTimeout, RoleGroupSessionTimeout } from '@hmcts/rpx-xui-node-lib'
import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SESSION_TIMEOUTS } from '../configuration/references'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const permissions = CASE_SHARE_PERMISSIONS.split(',')
  const canShareCases = roles.some(role => permissions.includes(role))
  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS) as RoleGroupSessionTimeout[]
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)

  try {
    res.send({
      canShareCases,
      sessionTimeout,
    })
  } catch (error) {
    next(error)
  }
}
