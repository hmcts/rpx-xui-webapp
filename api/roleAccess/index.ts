import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { sendPost } from '../common/crudService';
import { handleDelete, handlePost } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { toRoleAssignmentBody } from './dtos/to-role-assignment-dto';
import * as roleAccessMock from './roleAccessService.mock';

roleAccessMock.init();

const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);

export async function confirmAllocateRole(req: EnhancedRequest, res: Response, next: NextFunction): Promise<Response> {
  try {
    const body = req.body;
    // @ts-ignore
    const roleAssignmentsBody = toRoleAssignmentBody(req.user.userinfo, body);
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const response: AxiosResponse = await sendPost(basePath, roleAssignmentsBody, req);
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
    const basePath = `${baseRoleAccessUrl}/am/role-assignments/${assigmentId}`;
    const deleteResponse: AxiosResponse = await handleDelete(basePath, body, req);
    const {status, data} = deleteResponse;
    if (status === 200) {
      const postResponse: AxiosResponse = await handlePost(basePath, body, req);
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
    if (assigmentId === '910088b0-9268-491b-8ddd-addc03ff67e7') {
      return res.send().status(500);
    }
    const {status} = await handleDelete(`${basePath}/${assigmentId}`, body, req);
    return res.send().status(status);
  } catch (e) {
    next(e);
  }
}
