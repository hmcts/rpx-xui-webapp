import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { plainToClass } from 'class-transformer'
import { Response } from 'express'
import { EnhancedRequest } from '../lib/models'
import { DataBaseModel } from './models/data-base.model'
import { OrganisationModel } from './models/organisation.model'
// @ts-ignore
import * as dbJson from './stubs/db.json'

const dbModule = plainToClass(DataBaseModel, dbJson)
// @ts-ignore
const orgs: OrganisationModel[] = dbModule.organisations
// @ts-ignore
const cases: SharedCase[] = dbModule.sharedCases

export function getUsers(req: EnhancedRequest, res: Response) {
    const searchText = req.query.q.toString()
    const org = getOrgById('o111111')
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"')
    }
    if (searchText === undefined) {
      return res.send(org.users)
    } else {
      const users = org.users
      const filterUser = users.filter(aUser => aUser.idamId.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        aUser.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        aUser.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        aUser.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1)
      if (!filterUser || filterUser.length === 0) {
        return res.status(404).send('{"errorMessage": "User is not found}"')
      }
      return res.send(filterUser)
    }
}

export function getCases(req: EnhancedRequest, res: Response) {
    if (!cases) {
      return res.status(404).send('{"errorMessage": "Cases are not found}"')
    }
    return res.send(cases)
}

export function assignCases(req: EnhancedRequest, res: Response) {
  const shareCases: SharedCase[] = req.body.sharedCases.slice()
  const updatedSharedCases: SharedCase[] = []
  for (const aCase of shareCases) {
    let newPendingShares = aCase.pendingShares.slice()
    const newSharedWith = aCase.sharedWith.slice()
    for (const user of aCase.pendingShares) {
      const assignmentId = user.idamId
      if (assignmentId === 'u222222') {
        newSharedWith.push(user)
        newPendingShares = []
        // tslint:disable-next-line:no-empty
      } else  if (assignmentId === 'u333333') {
      } else  {
        return res.sendStatus(500)
      }
    }
    const newSharedCase = {
      ...aCase,
      pendingShares: newPendingShares,
      sharedWith: newSharedWith,
    }
    updatedSharedCases.push(newSharedCase)
  }
  return res.send(updatedSharedCases)
}

function getOrgById(orgId: string) {
  return orgs.find(c => c.orgId === orgId)
}
