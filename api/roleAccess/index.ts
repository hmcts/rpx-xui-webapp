import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { refreshRoleAssignmentForUser } from '../user';
import { sendDelete, sendPost } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { toRoleAssignmentBody } from './dtos/to-role-assignment-dto';

const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);

export async function confirmAllocateRole(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const body = req.body;
    // @ts-ignore
    const roleAssignmentsBody = toRoleAssignmentBody(req.session.passport.user.userinfo, body);
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
    const {status, data} = response;
    return res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function reallocateRole(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const body = req.body;
    const assigmentId = req.body.assignmentId;
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const deletePath = `${basePath}/${assigmentId}`;
    const deleteResponse: AxiosResponse = await sendDelete(deletePath, body, req);
    const {status, data} = deleteResponse;
    if (status >= 200 && status <= 204) {
      // @ts-ignore
      const roleAssignmentsBody = toRoleAssignmentBody(req.user.userinfo, body);
      const postResponse: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
      await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
      return res.status(postResponse.status).send(postResponse.data);
    } else {
      return res.status(status).send(data);
    }
  } catch (error) {
    next(error);
  }
}

export async function deleteRoleByCaseAndRoleId(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
  const body = req.body;
  const assigmentId = req.body.assigmentId;
  try {
    const {status} = await sendDelete(`${basePath}/${assigmentId}`, body, req);
    await refreshRoleAssignmentForUser(req.session.passport.user.userinfo, req);
    return res.send().status(status);
  } catch (e) {
    next(e);
  }
}
