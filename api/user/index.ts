import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { SESSION_TIMEOUTS, CASE_SHARE_PERMISSION } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)
  const canShareCases = roles.includes(CASE_SHARE_PERMISSION)

  try {
    res.send({
      sessionTimeout,
      canShareCases
    })
  } catch (error) {
    next(error)
  }
}
