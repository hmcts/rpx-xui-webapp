import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import { handlePost } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import * as roleAccessMock from './roleAccessService.mock';

roleAccessMock.init();

const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);

export async function confirmAllocateRole(req: EnhancedRequest, res: Response, next: NextFunction) {
  try {
    const body = req.body;
    const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
    const response: AxiosResponse = await handlePost(basePath, body, req);
    const {status, data} = response;
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
