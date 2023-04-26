import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { EnhancedRequest } from '../lib/models';
import { setHeaders } from '../lib/proxy';

export async function createLabellingRole(req: EnhancedRequest,
  roleName: string,
  caseId: string,
  actorId: string,
  assignerId: string,
  jurisdiction: string,
  roleCategory: string): Promise<any> {
  const body = createBody(roleName, caseId, actorId, assignerId, jurisdiction, roleCategory);
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments`;
  const headers = setHeaders(req);
  delete headers.accept;
  return await http.post(fullPath, body, { headers });
}

export function createBody(roleName: string,
  caseId: string,
  actorId: string,
  assignerId: string,
  jurisdiction: string,
  roleCategory: string): any {
  return {
    roleRequest: {
      process: 'specific-access',
      assignerId,
      reference: `${caseId}/specific-access-legal-ops/${actorId}`,
      replaceExisting: true
    },
    requestedRoles: [{
      roleType: 'CASE',
      grantType: 'SPECIFIC',
      classification: 'PRIVATE',
      attributes: {
        caseId,
        jurisdiction,
        requestedRole: 'specific-access-legal-ops'
      },
      roleName,
      roleCategory,
      actorIdType: 'IDAM',
      actorId,
      beginTime: new Date(),
      endTime: null,
      readOnly: true
    }]
  };
}
