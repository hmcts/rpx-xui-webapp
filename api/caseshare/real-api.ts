import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { Response } from 'express'
import { handleGet, handlePost } from '../common/crudService'
import { getConfigValue } from '../configuration'
import { SERVICES_CCD_CASE_ASSIGNMENT_API_PATH, SERVICES_PRD_API_URL } from '../configuration/references'
import { EnhancedRequest } from '../lib/models'
import { ccdToUserDetails, prdToUserDetails } from './dtos/user-dto'
import { CCDRawCaseUserModel } from './models/ccd-raw-case-user.model'

const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL)
const ccdUrl: string = getConfigValue(SERVICES_CCD_CASE_ASSIGNMENT_API_PATH)

export async function getUsers(req: EnhancedRequest, res: Response) {
  try {
    const path = `${prdUrl}/refdata/external/v1/organisations/users?returnRoles=false`
    const {status, data}: {status: number, data: any} = await handleGet(path, req)
    const users = [...data.users].map(user => prdToUserDetails(user))
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
  try {
    const path = `${ccdUrl}/case-assignments`
    const shareCases: SharedCase[] = req.body.sharedCases.slice()
    const updatedSharedCases: SharedCase[] = []
    for (const aCase of shareCases) {
      const newPendingShares = aCase.pendingShares.slice()
      const newSharedWith = aCase.sharedWith.slice()
      let index = 0
      for (const user of aCase.pendingShares) {
        index++
        const payload = {
          "assignee_id"	: user.idamId,
          "case_id"	: aCase.caseId,
          "case_type_id" : 	aCase.caseTypeId,
        }
        const {status}: {status: number} = await handlePost(path, payload, req)
        if ( status === 201) {
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
    return res.status(error.status).send({
      errorMessage: error.data,
      errorStatusText: error.statusText,
    })
  }
}
