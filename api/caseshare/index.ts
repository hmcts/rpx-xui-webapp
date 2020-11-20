import { NextFunction, Response } from 'express'
import { getConfigValue } from '../configuration'
import { STUB } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import * as realAPI from './real-api'
import * as stubAPI from './stub-api'

const stub: boolean = getConfigValue(STUB)

/**
 * searchUsers
 * example 1: /api/caseshare/users
 */
export async function getUsers(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (stub) {
    return stubAPI.getUsers(req, res)
   } else {
    // TODO: call actual API if not for stub
    return realAPI.getUsers(req, res, next)
  }
}

/**
 * searchUsers
 * example: /api/caseshare/cases
 */
export async function getCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (stub) {
    return stubAPI.getCases(req, res)
  } else {
    return realAPI.getCases(req, res, next)
  }
}

export async function assignCasesToUsers(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (stub) {
    return stubAPI.assignCases(req, res)
  } else {
    return realAPI.assignCases(req, res, next)
  }
}
