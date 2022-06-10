import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { EnhancedRequest } from 'lib/models';
import { refreshRoleAssignmentForUser } from '../user';
import { createLabellingRole } from '../labellingRole';

export async function challengedAccessRouter(req: EnhancedRequest, resp, next) {
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    const headers = setHeaders(req);
    /* tslint:disable:no-string-literal */
    delete headers['accept'];
    try {
        const response = await http.post(fullPath, req.body, { headers });
        await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
        const caseId = req.body.requestedRoles[0].attributes['caseId'];
        const userId = req.body.requestedRoles[0].actorId;
        const roleCategory = req.body.requestedRoles[0].roleCategory;
        await createLabellingRole(req, 'specific-access-granted', caseId, userId, userId, 'IA', roleCategory);
        return resp.status(response.status).send(response.data);
    } catch (error) {
        next(error)
    }
}
