import * as express from 'express';
import { getUserSessionTimeout } from './userTimeout';
import { getConfigValue } from '../configuration'
import { SESSION_TIMEOUTS } from '../configuration/references'

// TODO: Is it correct to do this?
interface SessionRequest extends express.Request {
  session: {
    user: {
      roles: ['']
    }
  },
}

export async function getUserDetails(req: SessionRequest, res: express.Response) {

  const { roles } = req.session.user
  console.log('roles')
  console.log(roles)

  const sessionTimeouts = getConfigValue(SESSION_TIMEOUTS)
  const sessionTimeout = getUserSessionTimeout(roles, sessionTimeouts)

  try {
    res.send({
      sessionTimeout,
    })
  } catch (error) {

    const errReport = {
      apiError: error.data.message,
      apiStatusCode: error.status,
      message: 'User details route error',
    }

    res.status(error.status).send(errReport)
  }
}
