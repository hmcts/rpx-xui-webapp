import * as express from 'express';
import { getUserSessionTimeout } from './userTimeout';
import { getConfigValue } from '../configuration'
import { SESSION_TIMEOUTS } from '../configuration/references'

export async function getUserDetails(req: express.Request, res: express.Response, next: express.NextFunction) {

  const { roles } = req.session.user

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)

  try {
    res.send({
      sessionTimeout,
    })
  } catch (error) {
    next(error)
  }
}
