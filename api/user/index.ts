import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS } from '../configuration/references'
import { getUserSessionTimeout } from './userTimeout'

export async function getUserDetails(req, res: Response, next: NextFunction) {

  const { roles } = req.session.user

  const permissions = CASE_SHARE_PERMISSIONS.split(',')
  const canShareCases = roles.some(role => permissions.includes(role))

  try {
    res.send({
      canShareCases,
    })
  } catch (error) {
    next(error)
  }
}
