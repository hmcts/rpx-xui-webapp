import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { sendPost } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { toRoleAssignmentBody } from './dtos/to-role-assignment-dto';
// import * as roleAccessMock from './roleAccessService.mock';

// roleAccessMock.init();

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
