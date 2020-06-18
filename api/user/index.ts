import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SESSION_TIMEOUTS, SHARE_JURISDICTIONS } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)
  const permissions = CASE_SHARE_PERMISSIONS.split(',')
  const shareJurisdictions = getConfigValue(SHARE_JURISDICTIONS)
  const canShareCases = roles.some(role => permissions.includes(role))

  try {
    res.send({
      canShareCases,
      sessionTimeout,
      shareJurisdictions,
    })
  } catch (error) {
    next(error)
  }
}
