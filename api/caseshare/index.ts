import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { Response } from 'express'
import { handleGet } from '../common/crudService'
import { getConfigValue } from '../configuration'
import {
  SERVICES_CCD_CASE_ASSIGNMENT_API_PATH,
  SERVICES_PRD_API_URL,
  STUB
} from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { toUserDetails } from './converters/user-converter'
import { RawCaseUserModel } from './models/raw-case-user.model'
import * as stubAPI from './stub-api'

const cachedUsers = {}
const stub: boolean = getConfigValue(STUB)
// TODO: use below url for actual API
const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL)
const ccdUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH)

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
export async function getUsers(req: EnhancedRequest, res: Response) {
  // if (stub) {
  //  return stubAPI.searchUsers(req, res)
  // } else {
    // TODO: call actual API if not for stub
    try {
      const path = `${prdUrl}/refdata/external/v1/organisations/users?returnRoles=false`
      const {status, data}: {status: number, data: any} = await handleGet(path, req)
      const users = [...data.users].map(user => toUserDetails(user))
      for (const user of users) {
        if (!cachedUsers.hasOwnProperty(user.idamId)) {
          cachedUsers[user.idamId] = user
        }
      }
      res.status(status).send(users)
    } catch (error) {
      res.status(error.status).send({
        errorMessage: error.data,
        errorStatusText: error.statusText,
      })
    }
  // }
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
    // return res.status(500).send('{"errorMessage": "Yet to implement}"')
    try {
      // const url = `${ccdUrl}/cases`
      // console.log('url=' + url)
      // const headers: any = setHeaders(req)
      // console.log('headers=' + JSON.stringify(headers))
      const caseIds = req.query.case_ids
      // console.log('caseIds=' + JSON.stringify(caseIds))
      console.log('caseIds=' + caseIds)
      // const response = await req.http.get(url)
      const path = `${ccdUrl}/case-assignments`
      const {status, data}: {status: number, data: any} = await handleGet(path, req)
      // const response = await http.get(`${url}?case_ids=${caseIds}`, { headers })
      console.log('response:', data)
      const caseUsers: RawCaseUserModel[] = [...data.case_users]
      for (const caseUser of caseUsers) {
        // search user from cache
        if (!cachedUsers[caseUser.user_id]) {
          // if not found call api to get users
          await getUsers(req, res)
        }
      }
      // return sharedCase[]
      const sharedCases: SharedCase[] = []
      for (const caseUser of caseUsers) {
        if (!sharedCases.some(aCase => aCase.caseId === caseUser.case_id)) {
          const sharedCase: SharedCase = {
            caseId: caseUser.case_id,
            caseTitle: caseUser.case_id,
            sharedWith: [...cachedUsers[caseUser.user_id]],
          }
          sharedCases.push(sharedCase)
        } else {
          let existingSharedCase = sharedCases.find(aCase => aCase.caseId === caseUser.case_id)
          // existingSharedCase = {
          //  ...existingSharedCase,
          //  sharedWith: [...existingSharedCase.sharedWith, [...cachedUsers[caseUser.user_id]]]
          // }
          const newSharedWith = existingSharedCase.sharedWith.slice()
          newSharedWith.push(cachedUsers[caseUser.user_id])
          existingSharedCase = {
            ...existingSharedCase,
            sharedWith: newSharedWith,
          }
          // const newSharedWith = [...existingSharedCase.sharedWith, [...cachedUsers[caseUser.user_id]]]
        }
      }
      console.log('sharedCases=' + sharedCases)
      // res.send(sharedCases)
      res.status(status).send(sharedCases)
      // res.send(response.data)
      // return res.status(500).send('{"errorMessage": "Yet to implement}"')
    } catch (error) {
      res.status(error.status).send({
        errorMessage: error.data,
        errorStatusText: error.statusText,
      })
    }
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
