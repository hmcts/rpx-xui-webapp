import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SESSION_TIMEOUTS, SHARE_CASE_TYPES } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)
  const permissions = CASE_SHARE_PERMISSIONS.split(',')
  const shareCaseTypes = getConfigValue(SHARE_CASE_TYPES)
  const canShareCases = roles.some(role => permissions.includes(role))

  try {
    res.send({
      canShareCases,
      sessionTimeout,
      shareCaseTypes,
    })
  } catch (error) {
    next(error)
  }
}
