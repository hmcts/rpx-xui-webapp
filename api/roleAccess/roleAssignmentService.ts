import { getConfigValue } from '../configuration';
import { NextFunction, Response } from 'express';
import { EnhancedRequest } from '../lib/models';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { AxiosResponse } from 'axios';
import { Role, RolesByService } from './models/roleType';

export async function getPossibleRoles(req: EnhancedRequest, res: Response, next: NextFunction): Promise<any> {
  try {
    const serviceIds = req.body && req.body.serviceIds ? req.body.serviceIds : null;
    const roles = await getSubstantiveRoles(req);
    const rolesByService: RolesByService[] = [];
    if (serviceIds) {
      serviceIds.forEach(serviceId => {
        // note: if service obtained, check role either includes service or does not specify service
        const serviceRoles = roles.filter(role =>
          role.roleJurisdiction && (!role.roleJurisdiction.values
             || (role.roleJurisdiction.values && role.roleJurisdiction.values.includes(serviceId))))
        rolesByService.push({service: serviceId, roles: serviceRoles});
      })
    }
    return res.send(rolesByService).status(200);
  } catch (error) {
      next(error);
  }
}
export async function getSubstantiveRoles(req: EnhancedRequest) {
  if (req.session.subStantiveRoles) {
    return req.session.subStantiveRoles as []
  }
  const response = await getAllRoles(req);
  const results = (response.data as Role[]);
  const filteredResults = results.filter(filterRoleAssignments());
  const substantiveRoles = filteredResults.map(roleApi => ({
    roleCategory: roleApi.category,
    roleId: roleApi.name,
    roleName: roleApi.label,
    roleJurisdiction: roleApi.patterns && roleApi.patterns[0].attributes
     ? roleApi.patterns[0].attributes.jurisdiction : null,
  }));
  req.session.subStantiveRoles = substantiveRoles;
  return substantiveRoles;
}

export async function getAllRoles(req: EnhancedRequest): Promise<AxiosResponse<Role[]>> {

  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments/roles`;
  const headers = setHeaders(req);
  const response: AxiosResponse<Role[]> = await http.get(fullPath, { headers });
  return response;
}

function filterRoleAssignments(): (value: Role, index: number, array: Role[]) => unknown {
  return role => role.substantive && role.patterns.filter(pattern => pattern.roleType.values.includes('CASE')).length > 0;
}
