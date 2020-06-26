import { plainToClass } from 'class-transformer';
import { Response } from 'express';
import { SharedCase } from '../../src/cases/models/case-share/case-share.module';
import { OrganisationModule } from '../../src/cases/models/organisation/organisation.module';
import { UserDetails } from '../../src/cases/models/user-details/user-details.module';
import { EnhancedRequest } from '../lib/models';
import { DataBaseModule } from './models/data-base.module';
import * as dbJson from './stubs/db.json';

const dbModule = plainToClass(DataBaseModule, dbJson);
const orgs: OrganisationModule[] = dbModule.organisations;
const cases: SharedCase[] = dbModule.sharedCases;

export function getRoot(req: EnhancedRequest, res: Response) {
  return res.status(400).send('{"errorMessage": "Bad request}"');
}

export function getDB(req: EnhancedRequest, res: Response) {
  return res.send(dbJson);
}

export function getOrgs(req: EnhancedRequest, res: Response) {
  if (!orgs) {
    return res.status(404).send('{"errorMessage": "Organisations are not found}"');
  }
  return res.send(orgs);
}

export function getUsersByOrgId(req: EnhancedRequest, res: Response) {
    const org = getOrgById(req.params.orgId);
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"');
    }
    const users: UserDetails[] = org.users;
    if (!users) {
      return res.status(404).send('{"errorMessage": "Users is not found}"');
    }
    return res.send(users);
}

export function getUserByOrgAndUserId(req: EnhancedRequest, res: Response) {
    const org = getOrgById(req.params.orgId);
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"');
    }
    const users: UserDetails[] = org.users;
    const user = users.find(u => u.idamId === req.params.uid);
    if (!user) {
      return res.status(404).send('{"errorMessage": "User is not found}"');
    }
    return res.send(user);
}

export function searchUsers(req: EnhancedRequest, res: Response) {
    const searchText = req.query.q;
    const org = getOrgById(req.params.orgId);
    if (!org) {
      return res.status(404).send('{"errorMessage": "Organisation is not found}"');
    }
    if (searchText === undefined) {
      return res.send(org.users);
    } else {
      const users = org.users;
      const user = users.filter(u => u.idamId.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        u.firstName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        u.lastName.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
        u.email.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
      if (!user || user.length === 0) {
        return res.status(404).send('{"errorMessage": "User is not found}"');
      }
      return res.send(user);
    }
}

export function getCases(req: EnhancedRequest, res: Response) {
    if (!cases) {
      return res.status(404).send('{"errorMessage": "Cases are not found}"');
    }
    return res.send(cases);
}

export function getCaseById(req: EnhancedRequest, res: Response) {
    if (!cases) {
      return res.status(404).send('{"errorMessage": "Cases are not found}"');
    }
    const foundCase = cases.find(c => c.caseId === req.params.caseId);
    if (!foundCase) {
      return res.status(404).send('{"errorMessage": "Case is not found}"');
    }
    return res.send(foundCase);
}

function getOrgById(orgId: string) {
  return orgs.find(c => c.orgId === orgId);
}
