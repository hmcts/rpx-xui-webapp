import { AxiosInstance, AxiosResponse } from 'axios';
import { HttpMock } from '../common/httpMock';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { CaseRole } from './interfaces/caseRole';
import { hasCaseAllocatorRole } from './util';

const logger: JUILogger = log4jui.getLogger('role-service');
const httpMock: AxiosInstance = HttpMock.getInstance();

export async function handleGetRolesByCaseId(path: string, req: EnhancedRequest): Promise<AxiosResponse<CaseRole>> {
  logger.info('handle get method', path);
  const headers = setHeaders(req);
  return await httpMock.get<CaseRole>(path, {headers});
}

export function handleShowAllocatorLinkByCaseId(caseId: string, req: EnhancedRequest): boolean {
  logger.info('handle show allocator link', caseId);
  const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
  if (roleAssignments && Array.isArray(roleAssignments)) {
    const canShowAllocateRoleLink = roleAssignments.find(roleAssignment => {
      return roleAssignment.attributes.caseId === caseId && hasCaseAllocatorRole(roleAssignment.authorisations);
    });
    return !!canShowAllocateRoleLink;
  }
  return false;
}
