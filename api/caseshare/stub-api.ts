import { SharedCase } from '@hmcts/rpx-xui-common-lib/lib/models/case-share.model'
import { UserDetails } from '@hmcts/rpx-xui-common-lib/lib/models/user-details.model'
import { plainToClass } from 'class-transformer'
import { Response } from 'express'
import { EnhancedRequest } from '../lib/models'
import { DataBaseModel } from './models/data-base.model'
import { OrganisationModel } from './models/organisation.model'
// @ts-ignore
import * as dbJson from './stubs/db.json'

const dbModule = plainToClass(DataBaseModel, dbJson)
const orgs: OrganisationModel[] = dbModule.organisations
const cases: SharedCase[] = dbModule.sharedCases

export function getRoot(req: EnhancedRequest, res: Response) {
  return res.status(400).send('{"errorMessage": "Bad request}"')
}

export function getDB(req: EnhancedRequest, res: Response) {
  return res.send(dbJson)
}

export function getOrgs(req: EnhancedRequest, res: Response) {
  if (!orgs) {
    return res.status(404).send('{"errorMessage": "Organisations are not found}"')
  }
  return res.send(orgs)
}

export function getUsersByOrgId(req: EnhancedRequest, res: Response) {
    const org = getOrgById(req.params.orgId)
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"')
    }
    const users: UserDetails[] = org.users
    if (!users) {
      return res.status(404).send('{"errorMessage": "Users is not found}"')
    }
    return res.send(users)
}

export function getUserByOrgAndUserId(req: EnhancedRequest, res: Response) {
    const org = getOrgById(req.params.orgId)
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"')
    }
    const users: UserDetails[] = org.users
    const user = users.find(u => u.idamId === req.params.uid)
    if (!user) {
      return res.status(404).send('{"errorMessage": "User is not found}"')
    }
    return res.send(user)
}

export function getUsers(req: EnhancedRequest, res: Response) {
    const searchText = req.query.q
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

export function getCaseById(req: EnhancedRequest, res: Response) {
    if (!cases) {
      return res.status(404).send('{"errorMessage": "Cases are not found}"')
    }
    const foundCase = cases.find(aCase => aCase.caseId === req.params.caseId)
    if (!foundCase) {
      return res.status(404).send('{"errorMessage": "Case is not found}"')
    }
    return res.send(foundCase)
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
