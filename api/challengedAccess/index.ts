import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { EnhancedRequest } from 'lib/models';
import { refreshRoleAssignmentForUser } from '../user';

export async function challengedAccessRouter(req: EnhancedRequest, resp, next) {
    try {
        const response = await postChallengedAccess(req);
        return resp.status(response.status).send(response.data);
    } catch (error) {
        next(error)
    }
}
export async function postChallengedAccess(req: EnhancedRequest) {
    const headers = setHeaders(req);
    /* tslint:disable:no-string-literal */
    delete headers['accept'];
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    const response = await http.post(fullPath, req.body, { headers });
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
    return response;
}
