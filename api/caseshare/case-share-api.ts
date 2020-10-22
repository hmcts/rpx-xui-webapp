import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { Response } from 'express'
import { handleGet, handlePost } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { CASE_SHARE_PERMISSIONS, SERVICES_CCD_CASE_ASSIGNMENT_API_PATH, SERVICES_PRD_API_URL } from '../configuration/references'
import * as log4jui from '../lib/log4jui'
import { EnhancedRequest, JUILogger } from '../lib/models'
import { ccdToUserDetails, prdToUserDetails } from './dtos/user-dto'
import { CaseAssigneeMappingModel } from './models/case-assignee-mapping.model'
import { CCDRawCaseUserModel } from './models/ccd-raw-case-user.model'

const logger: JUILogger = log4jui.getLogger('case-share-api')
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
  const updatedErrorMessages: string[] = []
  // call share case api
  await doShareCase(req, shareCases, updatedSharedCases, updatedErrorMessages)
  // TODO: call unshare case api
  // await doUnshareCase(req, shareCases, updatedSharedCases)
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

async function doShareCase(req: EnhancedRequest, shareCases: SharedCase[],
                           updatedSharedCases: SharedCase[],
                           updatedErrorMessages: string[]) {
  return new Promise((resolve, reject) => {
    const path = `${ccdUrl}/case-assignments`
    const promises = promiseBatchCallCaseShare(shareCases, path, req)
    const rejectedPayloads: CaseAssigneeMappingModel[] = []
    // @ts-ignore
    Promise.allSettled(promises).then(results => {
      for (const result of results) {
        const {status, reason}: { status: string, reason: any } = result
        if (status === 'rejected') {
          // logger._logger.info(result)
          rejectedPayloads.push(JSON.parse(reason.config.data))
          updatedErrorMessages.push(`request: ${reason.config.data} response: ${reason.data.status} ${reason.data.message}`)
        }
      }
    }).then(() => {
      handleRejectedPayloads(shareCases, updatedSharedCases, rejectedPayloads)
      resolve(updatedSharedCases)
    })
  })
}

function promiseBatchCallCaseShare(shareCases: SharedCase[], path: string, req: EnhancedRequest) {
  const promises = []
  for (const aCase of shareCases) {
    const newPendingShares = aCase.pendingShares ? aCase.pendingShares.slice() : []
    const newSharedWith = aCase.sharedWith ? aCase.sharedWith.slice() : []
    if (aCase.pendingShares) {
      for (const pendingShare of aCase.pendingShares) {
        const caseAssigneeMappingModel: CaseAssigneeMappingModel = {
          'assignee_id': pendingShare.idamId,
          'case_id': aCase.caseId,
          'case_type_id': aCase.caseTypeId,
        }
        logger.info('Request payload:', JSON.stringify(caseAssigneeMappingModel))
        const promise = handlePost(path, caseAssigneeMappingModel, req)
        promises.push(promise)
      }
    }
  }
  return promises
}

function handleRejectedPayloads(shareCases: SharedCase[], updatedSharedCases: SharedCase[],
                                rejectedPayloads: CaseAssigneeMappingModel[]) {
  for (const aCase of shareCases) {
    const newPendingShares = aCase.pendingShares ? aCase.pendingShares.slice() : []
    const newSharedWith = aCase.sharedWith ? aCase.sharedWith.slice() : []
    for (let i = 0; i < newPendingShares.length; i++) {
      const foundFailed = rejectedPayloads.filter(rejectedPayload => rejectedPayload.case_id === aCase.caseId)
        .some(foundPayload => foundPayload.assignee_id === newPendingShares[i].idamId)
      // can't find on rejected payload that mean it's successfully shared
      if (!foundFailed) {
        // remove from pending shares
        newPendingShares.splice(i, 1)
        // add to shared with
        newSharedWith.push(newPendingShares[i])
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
}

// @ts-ignore
async function doUnshareCase(req: EnhancedRequest, shareCases: SharedCase[], updatedSharedCases: SharedCase[]) {
  // TODO: call unshare case api
}
