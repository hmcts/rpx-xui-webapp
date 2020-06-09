import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSION, SESSION_TIMEOUTS } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)
  const canShareCases = roles.includes(CASE_SHARE_PERMISSION)

  try {
    res.send({
      canShareCases,
      sessionTimeout,
    })
  } catch (error) {
    next(error)
  }
}
