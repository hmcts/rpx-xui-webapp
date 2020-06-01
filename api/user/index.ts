import { NextFunction, Request, Response } from 'express'
import { getConfigValue } from '../configuration'
import { SESSION_TIMEOUTS } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout';

interface SessionRequest extends Request {
  session: {
    user: {
      roles: ['']
    }
  },
}

export async function getUserDetails(req: SessionRequest, res: Response, next: NextFunction) {

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
