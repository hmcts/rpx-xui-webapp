import { getConfigValue } from '../configuration';
import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { AxiosResponse } from 'axios';
import { Role } from './models/roleType';

export async function getPossibleRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const roles = await getSubstantiveRoles(req);
    return res.send(roles).status(200);
  } catch (error) {
      next(error);
  }
}
export async function getSubstantiveRoles(req: EnhancedRequest) {
  if (req.session.subStantiveRoles) {
    return req.session.subStantiveRoles as []
  }

  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/roles`;
  const headers = setHeaders(req);
  const response: AxiosResponse = await http.get(fullPath, { headers });
  const results = (response.data as Role[]);
  const filteredResults = results.filter(filterRoleAssignments());
  const substantiveRoles = filteredResults.map(roleApi => ({
    roleCategory: roleApi.category,
    roleId: roleApi.name,
    roleName: roleApi.label,
  }));
  req.session.subStantiveRoles = substantiveRoles;
  return substantiveRoles;
}

function filterRoleAssignments(): (value: Role, index: number, array: Role[]) => unknown {
  return role => role.substantive && role.patterns.filter(pattern => pattern.roleType.values.includes('CASE')).length > 0;
}
