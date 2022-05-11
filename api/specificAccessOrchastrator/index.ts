import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH, SERVICES_WA_WORKFLOW_API_URL } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { v4 as uuidv4 } from 'uuid';
import { sendDelete } from '../common/crudService';
import { AxiosResponse } from 'axios';
import { NextFunction } from 'express';

export async function orchestrationSpecificAccessRequest(req: EnhancedRequest, res, next: NextFunction): Promise<any> {
  let createAmRoleResponse: AxiosResponse;
  let status, data;
  try {
    createAmRoleResponse = await specificAccessRequestCreateAmRole(req, res);
    status = createAmRoleResponse.status;
    data = createAmRoleResponse.data;
  } catch (error) {
    next(error);
    return
  }

  if (createAmRoleResponse && data.roleAssignmentResponse
    && data.roleAssignmentResponse.requestedRoles
    && data.roleAssignmentResponse.requestedRoles[0].attributes) {
    const attributes = data.roleAssignmentResponse.requestedRoles[0].attributes;
    const caseId = attributes.caseId;
    const jurisdiction = attributes.jurisdiction;
    const caseType = attributes.caseType;
    const taskType = 'followUpOverdueRespondentEvidence';
    const dueDate = '2022-04-23T16:21:41.320086';
    const taskName = 'Process Application';
    const taskResponse = await postCreateTask(req, next, { caseId, jurisdiction, caseType, taskType, dueDate, name: taskName });
    if (!taskResponse || taskResponse.status !== 204) {
      const assignmentId = data.roleAssignmentResponse.roleRequest.id;
      const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
      const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
      const deleteBody = {assigmentId: assignmentId};
      try {
        await sendDelete(`${basePath}/${assignmentId}`, deleteBody, req);
      } catch (e) {
        next(e)
      }
    }
    // only send status when its successful.
    // Otherwise you need to send an error status of taskResponse.status
    return res.status(status).send(data);
  }
}

async function specificAccessRequestCreateAmRole(req, res): Promise<AxiosResponse> {
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments`;
  const headers = setHeaders(req);
  // AM service reject header with 406 error if accept is sent
  /* tslint:disable:no-string-literal */
  delete headers['accept'];
  const response = await http.post(fullPath, req.body, { headers} );
  return response;
}

// tslint:disable-next-line:max-line-length
export async function postCreateTask(req: EnhancedRequest, next: NextFunction, createTask: { caseId, jurisdiction, caseType, taskType, dueDate, name }): Promise<any> {
  try {
    const waWorkFlowApi = getConfigValue(SERVICES_WA_WORKFLOW_API_URL);
    const id = uuidv4();
    const url = `${waWorkFlowApi}/workflow/message`;
    const body = {
      messageName: 'createTaskMessage',
      processVariables: {
        idempotencyKey: {
          value: id,
          type: 'String',
        },
        dueDate: {
          value: createTask.dueDate,
          type: 'String',
        },
        jurisdiction: {
          value: createTask.jurisdiction,
          type: 'String',
        },
        caseId: {
          value: createTask.caseId,
          type: 'String',
        },
        name: {
          value: createTask.name,
          type: 'String',
        },
        taskType: {
          value: createTask.taskType,
          type: 'String',
        },
        caseType: {
          value: createTask.caseType,
          type: 'String',
        },
      },
      correlationKeys: null,
      all: false,
    }
    const headers = setHeaders(req);
    const response = await http.post(url, body, { headers });
    return response;
  } catch (error) {
    next(error)
  }
}
