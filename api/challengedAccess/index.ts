import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { EnhancedRequest } from 'lib/models';
import { refreshRoleAssignmentForUser } from '../user';

export async function challengedAccessRouter(req: EnhancedRequest, resp, next) {
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    const headers = setHeaders(req);
    /* tslint:disable:no-string-literal */
    delete headers['accept'];
    try {
        const response = await http.post(fullPath, req.body, { headers });
        await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
        return resp.status(response.status).send(response.data);
    } catch (error) {
        next(error)
    }
}
