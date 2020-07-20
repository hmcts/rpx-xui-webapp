import { getUserSessionTimeout, RoleGroupSessionTimeout } from '@hmcts/rpx-xui-node-lib'
import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { SESSION_TIMEOUTS } from '../configuration/references'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.passport.user.userinfo

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS) as RoleGroupSessionTimeout[]
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)

  try {
    res.send({
      sessionTimeout,
    })
  } catch (error) {
    next(error)
  }
}
