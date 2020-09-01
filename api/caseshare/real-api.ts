import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { Response } from 'express'
import { handleGet, handlePost } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SERVICES_CCD_CASE_ASSIGNMENT_API_PATH, SERVICES_PRD_API_URL } from '../configuration/references'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { toCaseAssigneeMappingModel } from './dtos/case-user-dto'
import { ccdToUserDetails, prdToUserDetails } from './dtos/user-dto'
import { CaseAssigneeMappingModel } from './models/case-assignee-mapping.model'
import { CCDRawCaseUserModel } from './models/ccd-raw-case-user.model'

const logger: JUILogger = log4jui.getLogger('real-api')
const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL)
const ccdUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH)

export async function getUsers(req: EnhancedRequest, res: Response) {
  try {
    const path = `${prdUrl}/refdata/external/v1/organisations/users?returnRoles=true&status=active`
    const {status, data}: {status: number, data: any} = await handleGet(path, req)
    const permissions = CASE_SHARE_PERMISSIONS.split(',')
    const users = [...data.users]
                  .filter(user => user.roles.some(role => permissions.includes(role)))
                  .map(user => prdToUserDetails(user))
    return res.status(status).send(users)
  } catch (error) {
    return res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

export async function getCases(req: EnhancedRequest, res: Response) {
  try {
    const caseIds = req.query.case_ids
    const path = `${ccdUrl}/case-assignments?case_ids=${caseIds}`
    const {status, data}: {status: number, data: any} = await handleGet(path, req)
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
    return res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}

export async function assignCases(req: EnhancedRequest, res: Response) {
  const shareCases: SharedCase[] = req.body.sharedCases.slice()
  const updatedSharedCases: SharedCase[] = []
  const errorMessages: string[] = []
  // call share case api
  await doShareCase(req, shareCases, updatedSharedCases, errorMessages)
  // TODO: call unshare case api
  // await doUnshareCase(req, shareCases, updatedSharedCases)
  const originalSharedNumber = shareCases.reduce((acc, aCase) => acc
    + (aCase.pendingShares ? aCase.pendingShares.length : 0), 0)
  const afterSharedNumber = updatedSharedCases.reduce((acc, aCase) => acc
    + (aCase.pendingShares ? aCase.pendingShares.length : 0), 0)
  // when none of the users are assigned successfully
  if (originalSharedNumber > 0 && originalSharedNumber === afterSharedNumber) {
    return res.status(500).send(errorMessages)
  }
  return res.status(201).send(updatedSharedCases)
}

async function doShareCase(req: EnhancedRequest, shareCases: SharedCase[],
                           updatedSharedCases: SharedCase[],
                           errorMessage: string[]) {
  const path = `${ccdUrl}/case-assignments`
  for (const aCase of shareCases) {
    const newPendingShares = aCase.pendingShares ? aCase.pendingShares.slice() : []
    const newSharedWith = aCase.sharedWith ? aCase.sharedWith.slice() : []
    if (aCase.pendingShares) {
      for (const pendingShare of aCase.pendingShares) {
        const payload = {
          'assignee_id': pendingShare.idamId,
          'case_id': aCase.caseId,
          'case_type_id': aCase.caseTypeId,
        }
        logger.info('Request payload:', JSON.stringify(payload))
        try {
          const {status}: { status: number } = await handlePost(path, payload, req)
          if (status === 201) {
            newSharedWith.push(pendingShare)
            newPendingShares.splice(newPendingShares.findIndex(iShare => iShare.idamId === pendingShare.idamId), 1)
          }
        } catch (error) {
          logger.error('Error message:', JSON.stringify(error.data))
          errorMessage.push(`${error.status} ${error.statusText} ${JSON.stringify(error.data)}`)
        }
      }
    }
    const newSharedCase = {
      ...aCase,
      pendingShares: newPendingShares,
      sharedWith: newSharedWith,
    }
    updatedSharedCases.push(newSharedCase)
  }
}

// @ts-ignore
async function doUnshareCase(req: EnhancedRequest, shareCases: SharedCase[], updatedSharedCases: SharedCase[]) {
  const path = `${ccdUrl}/case-unassignments`
  const payload = {
    'case_roles': ['caseworker-caa'],
    'unassignments': aggregateUnassignments(shareCases),
  }
  try {
    const {status}: { status: number } = await handlePost(path, payload, req)
    if (status === 201) {
      for (let i = 0, l = updatedSharedCases.length; i < l; i++) {
        const newPendingUnshares = updatedSharedCases[i].pendingUnshares.slice()
        const unassignUsers: string[] = payload.unassignments
          .filter(unAssignment => unAssignment.case_id === updatedSharedCases[i].caseId)
          .map(user => user.assignee_id)
        // remove unassignUsers from pendingUnshares
        for (const unassignUserId of unassignUsers) {
          const removeIndex = newPendingUnshares.map(item => item.idamId).indexOf(unassignUserId.toString())
          if (removeIndex > 0) {
            newPendingUnshares.splice(removeIndex, 1)
          }
        }
        // add unassignUsers to sharedWith
        const newSharedWith = updatedSharedCases[i].sharedWith.concat(updatedSharedCases[i].pendingUnshares)
        const newSharedCase = {
          ...updatedSharedCases[i],
          pendingUnshares: newPendingUnshares,
          sharedWith: newSharedWith,
        }
        updatedSharedCases.splice(i, 1)
        updatedSharedCases.push(newSharedCase)
      }
    }
  } catch (error) {
    logger.error('Error message:', JSON.stringify(error.data))
  }
}

function aggregateUnassignments(shareCases: SharedCase[]): CaseAssigneeMappingModel[] {
  const unAssignments: CaseAssigneeMappingModel[] = []
  for (const aCase of shareCases) {
    if (aCase.pendingUnshares) {
      const aCaseUnassignments = aCase.pendingUnshares.map(user => toCaseAssigneeMappingModel(user, aCase))
      unAssignments.concat(aCaseUnassignments)
    }
  }
  return unAssignments
}
