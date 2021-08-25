import { AxiosInstance, AxiosResponse } from 'axios';
import { HttpMock } from '../common/httpMock';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { setHeaders } from '../lib/proxy';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { isCurrentUserCaseAllocator } from '../user/utils';
import { CaseRole } from './interfaces/caseRole';

const logger: JUILogger = log4jui.getLogger('role-service');
const httpMock: AxiosInstance = HttpMock.getInstance();

export async function handleGetRolesByCaseId(path: string, req: EnhancedRequest): Promise<AxiosResponse<CaseRole>> {
    logger.info('handle get method', path);
    const headers = setHeaders(req);
    return await httpMock.get<CaseRole>(path, { headers });
}

export function handleShowAllocatorLinkByCaseId(jurisdiction: string, caseLocationId: string, req: EnhancedRequest): boolean {
    const roleAssignments = req.session.roleAssignmentResponse as RoleAssignment[];
    let isCaseAllocator = false;
    if (roleAssignments) {
        const roleAssignment = roleAssignments.find(role => isCurrentUserCaseAllocator(role, jurisdiction, caseLocationId));
        isCaseAllocator = !!roleAssignment;
    }
    return isCaseAllocator;
}
