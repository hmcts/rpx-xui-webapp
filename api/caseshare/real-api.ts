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

  // call share case api
  const updatedSharedCases: SharedCase[] = []
  const updatedErrorMessages: string[] = []
  // const {updatedSharedCases, updatedErrorMessages}:
  //   { updatedSharedCases: SharedCase[], updatedErrorMessages: string[] } = await doShareCase(req, shareCases)

  // TODO: call unshare case api
  await doUnshareCase(req, shareCases, updatedSharedCases)

  const originalSharedNumber = shareCases.reduce((acc, aCase) => acc
    + (aCase.pendingShares ? aCase.pendingShares.length : 0), 0)
  const afterSharedNumber = updatedSharedCases.reduce((acc, aCase) => acc
    + (aCase.pendingShares ? aCase.pendingShares.length : 0), 0)

  // when none of the users are assigned successfully
  if (originalSharedNumber > 0 && originalSharedNumber === afterSharedNumber) {
    return res.status(500).send(updatedErrorMessages)
  }

  // when all/partial are assigned successfully
  return res.status(201).send(updatedSharedCases)
}

async function doShareCase(req: EnhancedRequest, shareCases: SharedCase[]):
  Promise<{updatedSharedCases: SharedCase[], updatedErrorMessages: string[]}> {
  const path = `${ccdUrl}/case-assignments`
  const promises = promiseCaseShareBatchCall(shareCases, path, req)
  // @ts-ignore
  const results = await Promise.allSettled(promises)
  const updatedErrorMessages: string[] = []
  const rejectedPayloads: CaseAssigneeMappingModel[] = []
  results.forEach(result => {
    const {status, reason}: { status: string, reason: any } = result
    if (status === 'rejected') {
      rejectedPayloads.push(JSON.parse(reason.config.data))
      updatedErrorMessages.push(`{request: ${reason.config.data}, response: {${reason.data.status} ${reason.data.message}}}`)
    }
  })
  const updatedSharedCases: SharedCase[] = handleRejectedPayloads(shareCases, rejectedPayloads)
  return {
    updatedErrorMessages,
    updatedSharedCases,
  }
}

function promiseCaseShareBatchCall(shareCases: SharedCase[], path: string, req: EnhancedRequest) {
  // @ts-ignore
  return shareCases.flatMap(sharedCase => {
    if (sharedCase && sharedCase.pendingShares && sharedCase.pendingShares.length > 0) {
      sharedCase.pendingShares.flatMap( pendingShare => {
        const caseAssigneeMappingModel: CaseAssigneeMappingModel = {
          'assignee_id': pendingShare.idamId,
          'case_id': sharedCase.caseId,
          'case_type_id': sharedCase.caseTypeId,
        }
        return sendPost(path, caseAssigneeMappingModel, req)
      })
    }
  })
}

function handleRejectedPayloads(shareCases: SharedCase[], rejectedPayloads: CaseAssigneeMappingModel[]): SharedCase[] {
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

// @ts-ignore
async function doUnshareCase(req: EnhancedRequest, shareCases: SharedCase[], updatedSharedCases: SharedCase[]) {
  // TODO: call unshare case api
  const path = `${ccdUrl}/case-assignments`
  const unassignedCaseModels = []
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
  return sendDelete(path, payload, req)
}
