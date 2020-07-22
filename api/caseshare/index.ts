import {SharedCase} from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import * as express from 'express'
import { Response } from 'express'
import * as fromCasesFeature from '../../src/cases/store';
import {CaseAssignmentResponse} from '../caseshare/responses/assignCaseResponse'
import { getConfigValue } from '../configuration'
import {SERVICES_CASE_SHARE_API_URL, STUB} from '../configuration/references'
import {http} from '../lib/http'
import { EnhancedRequest } from '../lib/models'
import {setHeaders} from '../lib/proxy'
import {postCaseAssignment} from './caseShareUtil'
import * as stubAPI from './stub-api'

const stub: string = getConfigValue(STUB)
// TODO: use below url for actual API
// @ts-ignore
const url: string = getConfigValue(SERVICES_CASE_SHARE_API_URL)

/**
 * getRoot
 * example: /api/caseshare/
 */
export async function getRoot(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getRoot(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * getDB
 * example: /api/caseshare/db
 */
export async function getDB(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getDB(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * getOrgs
 * example: /api/caseshare/orgs
 */
export async function getOrgs(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getOrgs(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * getUsersByOrgId
 * example: /api/caseshare/orgs/o111111/users
 */
export async function getUsersByOrgId(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getUsersByOrgId(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * getUserByOrgAndUserId
 * example: /api/caseshare/orgs/o111111/users/u111111
 */
export async function getUserByOrgAndUserId(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getUserByOrgAndUserId(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * searchUsers
 * example 1: /api/caseshare/orgs/o111111?q=
 * example 2: /api/caseshare/orgs/o111111?q=j
 */
export async function searchUsers(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.searchUsers(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * searchUsers
 * example: /api/caseshare/cases
 */
export async function getCases(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getCases(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

/**
 * searchUsers
 * example: /api/caseshare/cases/c111111
 */
export async function getCaseById(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.getCaseById(req, res)
  } else {
    // TODO: call actual API if not for stub
    return res.status(500).send('{"errorMessage": "Yet to implement}"')
  }
}

export async function postShareCasesToUsers(req: EnhancedRequest, res: Response) {
  if (stub) {
    return stubAPI.assignUsersToCase(req, res)
  } else {
    // TODO: call actual API if not for stub
    return this.postShareCasesToUsersReal(req, res)
  }
}

export async function postShareCasesToUsersReal(req: express.Request, res: express.Response) {
  let errReport: any
  if (!req.body.assignee_id) {
    errReport = {
      apiError: 'Assignee id is missing',
      apiStatusCode: '400',
      message: 'Case Assignment error',
    }
    res.status(400).send(errReport)
  } else if (!req.body.case_id) {
      errReport = {
        apiError: 'Case id is missing',
        apiStatusCode: '400',
        message: 'Case Assignment error',
      }
      res.status(400).send(errReport)
    }

  try {
    const assignUrl =  postCaseAssignment(getConfigValue(SERVICES_CASE_SHARE_API_URL))
    const headers = setHeaders(req)
    const shareCases: SharedCase[] = req.body.sharedCases.slice()
    const updatedSharedCases: SharedCase[] = []
    for (const aCase of shareCases) {
      const newPendingShares = aCase.pendingShares.slice()
      const newSharedWith = aCase.sharedWith.slice()
      let index = 0
      for (const user of aCase.pendingShares) {
        index++
        const assignmentId = user.idamId
        const payload = {
          "assignee_id"	: assignmentId,
          "case_id"	: aCase.caseId,
          "case_type_id" : 	aCase.caseTitle,
        }
        const response = await http.post(assignUrl, payload, { headers })
        if ( response.status === 200) {
          newSharedWith.push(user)
          newPendingShares.splice(index, 1)
        }
      }
      const newSharedCase = {
        ...aCase,
        pendingShares: newPendingShares,
        sharedWith: newSharedWith,
      }
      updatedSharedCases.push(newSharedCase)
    }
    res.send(updatedSharedCases)

  } catch (error) {
    errReport = {
      apiError: error.data.message,
      apiStatusCode: error.status,
      message: 'Case Assign UTl',
    }
    res.status(error.status).send(errReport)
  }
}
