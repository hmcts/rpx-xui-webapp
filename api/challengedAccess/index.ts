import { EnhancedRequest } from 'lib/models';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { http } from '../lib/http';
import { setHeaders } from '../lib/proxy';
import { refreshRoleAssignmentForUser } from '../user';

export async function challengedAccessRouter(req: EnhancedRequest, resp, next) {
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    const headers = setHeaders(req);
    /* tslint:disable:no-string-literal */
    delete headers['accept'];
    try {
      if (req.body.requestedRoles && req.body.requestedRoles[0] && req.body.requestedRoles[0].attributes) {
            req.body.requestedRoles[0].attributes.isNew = true;
      }

      const response = await http.post(fullPath, req.body, { headers });
      await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);

      return resp.status(response.status).send(response.data);
    } catch (error) {
        next(error);
    }
}

export async function challengedAccessSetIsNewFalse(req: EnhancedRequest, resp, next) {
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const queryPath = `${basePath}/am/role-assignments/query`;
  const updatePath = `${basePath}/am/role-assignments`;

  const headers = setHeaders(req);
  /* tslint:disable:no-string-literal */
  delete headers['accept'];
  try {
    const uid = req.session.passport.user.userinfo.uid;
    const caseId = req.body.caseId;

    const roleAssignmentQueryResponse = await http.post(queryPath, {
      actorId: [uid],
      attributes: {
        caseId: [caseId],
      },
    }, { headers });

    const singleRoleAssignment = roleAssignmentQueryResponse.data.roleAssignmentResponse[0];
    singleRoleAssignment['attributes'].isNew = false;
    singleRoleAssignment['notes'] = [
      {
        userId: uid,
        time: '',
        comment: '',
      },
    ];
    delete singleRoleAssignment['id'];

    const roleAssignmentUpdate = {
      roleRequest: {
        assignerId: uid,
        process: "challenged-access",
        reference: `${caseId}/challenged-access-judiciary/${uid}`,
        replaceExisting: true,
      },
      requestedRoles: [singleRoleAssignment],
    };

    const response = await http.post(updatePath, { ...roleAssignmentUpdate }, { headers });
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);

    return resp.status(response.status).send(response.data);
  } catch (error) {
    next(error);
  }
}
