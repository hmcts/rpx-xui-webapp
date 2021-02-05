import { NextFunction, Response } from 'express'
import { handleGet, sendDelete, sendPost } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SERVICES_CCD_CASE_ASSIGNMENT_API_PATH, SERVICES_PRD_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { ccdToUserDetails, prdToUserDetails } from './dtos/user-dto'
import { CaseAssigneeMappingModel } from './models/case-assignee-mapping.model'
import { SharedCase } from './models/case-share.model'
import { CCDRawCaseUserModel } from './models/ccd-raw-case-user.model'
import { UnassignedCaseModel } from './models/unassigned-case.model'
import { UserDetails } from './models/user-details.model'

const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL)
const ccdUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH)

export async function getUsers(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const path = `${prdUrl}/refdata/external/v1/organisations/users?returnRoles=true&status=active`
    const {status, data}: {status: number, data: any} = await handleGet(path, req, next)
    const permissions = CASE_SHARE_PERMISSIONS.split(',')
    const users = [...data.users]
                  .filter(user => user.roles.some(role => permissions.includes(role)))
                  .map(user => prdToUserDetails(user))
    return res.status(status).send(users)
  } catch (error) {
      next(error)
  }
}

export async function getCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const caseIds = req.query.case_ids
    const path = `${ccdUrl}/case-assignments?case_ids=${caseIds}`
    const {status, data}: {status: number, data: any} = await handleGet(path, req, next)
    const caseUsers: CCDRawCaseUserModel[] = [...data.case_assignments]
    const sharedCases: SharedCase[] = []
    for (const caseUser of caseUsers) {
      const sharedCase: SharedCase = {
        caseId: caseUser.case_id,
        caseTitle: caseUser.case_title,
        sharedWith: caseUser.shared_with.map(rawSharedWith => ccdToUserDetails(rawSharedWith)),
      }
      sharedCases.push(sharedCase)
    }
    return res.status(status).send(sharedCases)
  } catch (error) {
      next(error)
  }
}

export async function assignCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const shareCases: SharedCase[] = req.body.sharedCases.slice()

  let updatedSharedCases: SharedCase[]

  // call share case api(the n call)
  const shareCasePromise = doShareCase(req, shareCases)
  // call unShare case api(the 1 batch call)
  const unShareCasePromise = doUnshareCase(req, shareCases)

  const allPromises = [...shareCasePromise, unShareCasePromise]
  // @ts-ignore
  const allResults = await Promise.allSettled(allPromises)

  const updatedErrorMessages: string[] = []
  const rejectedShareCasePayloads: CaseAssigneeMappingModel[] = []
  let rejectedUnShareCaseReason: any = null
  let rejectedCount: number = 0

  allResults.forEach(result => {
    const {status, reason, value}: {status: string, reason: any, value: any } = result
    if (status === 'rejected') {
      if (reason.config.method === 'post') {
        rejectedShareCasePayloads.push(JSON.parse(reason.config.data))
        updatedErrorMessages.push(`{request: ${reason.config.data}, response: {${reason.data.status} ${reason.data.message}}}`)
      } else if (reason.config.method === 'delete') {
        rejectedUnShareCaseReason = reason
      }
      rejectedCount ++
    }
  })
  updatedSharedCases = handleRejectedSharedCasePayloads(shareCases, rejectedShareCasePayloads)
  updatedSharedCases = handleRejectedUnSharedCasePayloads(updatedSharedCases, rejectedUnShareCaseReason)
  // when none of the apis successfully
  if (allPromises.length === rejectedCount) {
    return res.status(500).send(updatedErrorMessages)
  } else {
    return res.status(201).send(updatedSharedCases)
  }
}

function doShareCase(req: EnhancedRequest, shareCases: SharedCase[]): any[] {
  const path = `${ccdUrl}/case-assignments`
  return promiseCaseShareBatchCall(shareCases, path, req)
}

function promiseCaseShareBatchCall(shareCases: SharedCase[], path: string, req: EnhancedRequest) {
  const promises = []
  // @ts-ignore
  shareCases.flatMap(sharedCase => {
    if (sharedCase && sharedCase.pendingShares && sharedCase.pendingShares.length > 0) {
      sharedCase.pendingShares.flatMap( pendingShare => {
        const caseAssigneeMappingModel: CaseAssigneeMappingModel = {
          'assignee_id': pendingShare.idamId,
          'case_id': sharedCase.caseId,
          'case_type_id': sharedCase.caseTypeId,
        }
        const promise = sendPost(path, caseAssigneeMappingModel, req)
        promises.push(promise)
      })
    }
  })
  return promises
}

function handleRejectedSharedCasePayloads(shareCases: SharedCase[], rejectedPayloads: CaseAssigneeMappingModel[]): SharedCase[] {
  const updatedSharedCases: SharedCase[] = []
  for (const aCase of shareCases) {
    const newPendingShares = aCase.pendingShares ? aCase.pendingShares.slice() : []
    const newSharedWith = aCase.sharedWith ? aCase.sharedWith.slice() : []
    for (let i = 0; i < newPendingShares.length; i++) {
      const foundFailed = rejectedPayloads.filter(rejectedPayload => rejectedPayload.case_id === aCase.caseId)
        .some(foundPayload => foundPayload.assignee_id === newPendingShares[i].idamId)
      // can't find on rejected payload that mean it's successfully shared
      if (!foundFailed) {
        // add to shared with
        newSharedWith.push(newPendingShares[i])
        // remove from pending shares
        newPendingShares.splice(i, 1)
        i--
      }
    }
    const newSharedCase = {
      ...aCase,
      pendingShares: newPendingShares,
      sharedWith: newSharedWith,
    }
    updatedSharedCases.push(newSharedCase)
  }
  return updatedSharedCases
}

function handleRejectedUnSharedCasePayloads(shareCases: SharedCase[], rejectedUnShareCaseReason: any): SharedCase[] {
  const updatedSharedCases: SharedCase[] = shareCases.slice()
  const returnSharedCases: SharedCase[] = []
  if (!rejectedUnShareCaseReason) {
    for (const aCase of updatedSharedCases) {
      const filteredArray = aCase.sharedWith.filter(user => !aCase.pendingUnshares.some(pUser => pUser.idamId === user.idamId))
      const newCase: SharedCase = {
        ...aCase,
        pendingUnshares: [],
        sharedWith: filteredArray,
      }
      returnSharedCases.push(newCase)
    }
    return returnSharedCases
  } else {
    return updatedSharedCases
  }
}

// @ts-ignore
function doUnshareCase(req: EnhancedRequest, shareCases: SharedCase[]) {
  // TODO: call unshare case api
  const path = `${ccdUrl}/case-assignments`
  const unassignedCaseModels = []
  let promise = null
  for (const aCase of shareCases) {
    const userDetails: UserDetails[] = aCase.pendingUnshares
    for (const aUser of userDetails) {
      const unassignedCaseModel: UnassignedCaseModel = {
        assignee_id: aUser.idamId,
        case_id: aCase.caseId,
        case_roles: aUser.caseRoles,
      }
      unassignedCaseModels.push(unassignedCaseModel)
    }
  }
  const payload = {
    unassignments: unassignedCaseModels,
  }
  if (unassignedCaseModels.length > 0) {
    promise = sendDelete(path, payload, req)
  }
  return promise
}
