import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH, SERVICES_WA_WORKFLOW_API_URL } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { v4 as uuidv4 } from 'uuid';
import { sendDelete } from '../common/crudService';
import { AxiosResponse } from 'axios';
import { NextFunction, Response } from 'express';
import logger from '@pact-foundation/pact-node/src/logger';
import { postTaskCompletionForAccess } from '../workAllocation2';
import { createSpecificAccessDenyRole, deleteSpecificAccessRequestedRole } from '../roleAccess/index';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { deleteSpecificAccessRoles, restoreDeletedRole } from '../accessManagement';

export async function orchestrationSpecificAccessRequest(req: EnhancedRequest, res, next: NextFunction): Promise<any> {
  let createAmRoleResponse: AxiosResponse;
  let status;
  let data;
  try {
    createAmRoleResponse = await specificAccessRequestCreateAmRole(req, res);
    status = createAmRoleResponse.status;
    data = createAmRoleResponse.data;
    if (!createAmRoleResponse || createAmRoleResponse.status !== 201) {
      return res.status(createAmRoleResponse.status).send(createAmRoleResponse);
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
      const taskResponse = await postCreateTask(req, next, { caseId, jurisdiction, caseType, taskType, dueDate, name: taskName, roleAssignmentID:'10' });
      if (!taskResponse || taskResponse.status !== 204) {
        const assignmentId = data.roleAssignmentResponse.roleRequest.id;
        const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
        const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
        const deleteBody = { assigmentId: assignmentId };
        const deleteResponse = await sendDelete(`${basePath}/${assignmentId}`, deleteBody, req);
        if (!deleteResponse || deleteResponse.status !== 204) {
          return res.status(deleteResponse.status).send(deleteResponse);
        }
        return res.status(taskResponse.status).send(taskResponse);
      }
      return res.status(status).send(data);
    }
  } catch (error) {
    next(error);
    return res.status(error.status).send(error);
  }
}

export async function specificAccessRequestCreateAmRole(req, res): Promise<AxiosResponse> {
  try {
    const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    const fullPath = `${basePath}/am/role-assignments`;
    const headers = setHeaders(req);
    /* tslint:disable:no-string-literal */
    delete headers['accept'];
    const response = await http.post(fullPath, req.body, { headers });
    return response;
  } catch (error) {
    logger.info(error);
    return res.status(error.status).send(error);
  }
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
        jurisdiction: {
          value: 'roleAssif..',
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
    return error;
  }
}

export async function getOriginalRequestDetails(req: EnhancedRequest, res, next: NextFunction, originalrequestId): Promise<any> {
  const originalRequest = {
    originalRequestDate: "2022-05-22T16:34:18.763Z",
    originalRequestJustification: {
      roleRequest: {
        assignerId: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8',
        process: 'specific-access',
        reference: '1613568559071553/specific-access-legal-operations/db17f6f7-1abf-4223-8b5e-1eece04ee5d8',
        replaceExisting: true,
      },
      requestedRoles: [
        {
          actorIdType: 'IDAM',
          actorId: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8',
          roleType: 'CASE',
          roleName: 'specific-access-requested',
          classification: 'PRIVATE',
          roleCategory: 'LEGAL_OPERATIONS',
          grantType: 'BASIC',
          beginTime: null,
          endTime: '2022-06-21T12:34:09.101Z',
          attributes: [Object],
          notes: [Array],
          readOnly: true,
        },
      ],
    },
  };
  return new Promise((resolve, reject) => {
    resolve(
      { originalRequestDate: originalRequest.originalRequestDate,
        originalRequestJustification: originalRequest.originalRequestJustification,
      });
  });
}

export async function orchestrationRequestMoreInformation(req: EnhancedRequest, res, next: NextFunction): Promise<Response> {
  try {
    const originalRequestReponse = await getOriginalRequestDetails(req, res, next, req.body.originalSpecificAccessRequestId);
    if (!originalRequestReponse || originalRequestReponse.status !== 204) {
      // will be implimented when actual service integrated
    }
    req.body = {...req.body, ...originalRequestReponse }

    const creationOfDenyRoleResponse: AxiosResponse = await createSpecificAccessDenyRole(req, res, next);
    if (!creationOfDenyRoleResponse || creationOfDenyRoleResponse.status !== 201) {
      return creationOfDenyRoleResponse && creationOfDenyRoleResponse.status
        ? res.status(creationOfDenyRoleResponse.status).send(creationOfDenyRoleResponse) : res.status(400);
    }
    const deletionResponse = await deleteSpecificAccessRequestedRole(req, res, next);
    const rolesToDelete: RoleAssignment[] = creationOfDenyRoleResponse.data.roleAssignmentResponse.requestedRoles;
    if (!deletionResponse || deletionResponse.status !== 204) {
      return deleteSpecificAccessRoles(req, res, next, deletionResponse, rolesToDelete);
    }
    const taskResponse: AxiosResponse = await postTaskCompletionForAccess(req, res, next);
    if (!taskResponse || taskResponse.status !== 204) {
      return restoreDeletedRole(req, res, next, taskResponse, rolesToDelete);
    }
    return res.send(taskResponse.data).status(taskResponse.status);
  } catch (e) {
    logger.error(e.status, e.statusText, JSON.stringify(e.data));
    throw e;
  }
}
