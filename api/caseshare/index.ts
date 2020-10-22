import { Response } from 'express'
import { EnhancedRequest } from '../lib/models'
import * as caseShareAPI from './case-share-api'

export async function getUsers(req: EnhancedRequest, res: Response) {
  return caseShareAPI.getUsers(req, res)
}

export async function getCases(req: EnhancedRequest, res: Response) {
  return caseShareAPI.getCases(req, res)
}

export async function assignCasesToUsers(req: EnhancedRequest, res: Response) {
  return caseShareAPI.assignCases(req, res)
}
