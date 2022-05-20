import { getConfigValue } from '../configuration';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH, SERVICES_WA_WORKFLOW_API_URL } from '../configuration/references';
import { EnhancedRequest } from '../lib/models';
import { v4 as uuidv4 } from 'uuid';
import { sendDelete } from '../common/crudService';
import { AxiosResponse } from 'axios';
import { NextFunction } from 'express';
import logger from '@pact-foundation/pact-node/src/logger';

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
      const taskResponse = await postCreateTask(req, next, { caseId, jurisdiction, caseType, taskType, dueDate, name: taskName });
      if (!taskResponse || taskResponse.status !== 204) {
        debugger;
        const assignmentId = data.roleAssignmentResponse.roleRequest.id;
        const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
        const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
        const deleteBody = { assigmentId: assignmentId };
        const deleteResponse =   await sendDelete(`${basePath}/${assignmentId}`, deleteBody, req);
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
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  const fullPath = `${basePath}/am/role-assignments`;
  const headers = setHeaders(req);
  /* tslint:disable:no-string-literal */
  delete headers['accept'];
  const response = await http.post(fullPath, req.body, { headers });
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
    return error;
  }
}
export async function orchestrationRequestMoreInformation(req: EnhancedRequest, res): Promise<any> {
  const requestId = req.body.requestId;
  const basePath = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  //http://am-role-assignment-service-aat.service.core-compute-aat.internal/am/role-assignments?process=staff-organisational-role-mapping&reference=cbb51593-aaca-4da3-ab67-7200d8d31af6
  const queryString = `?process=staff-organisational-role-mapping&reference=${requestId}`
  const fullPath = `${basePath}/am/role-assignments${queryString}`;
  const headers = setHeaders(req);
  delete headers['accept'];
  logger.info('send delete request to:', fullPath);
  try {
    const body = {
      pathVariables: {
        process : 'staff-organisational-role-mapping',
        reference : requestId
      },
      queryParams : null,
      body:{
        userIds : [ requestId ]
      },
      multipart: false
    };
    logger.info('send delete request Body:', {body, headers});

    const respDeleteRoleByRequestId = await http.delete(fullPath, {
      data: body,
      headers,
    });
    logger.info('send delete response:', respDeleteRoleByRequestId);
    debugger;
    //return res.status(201).send({message:'succesfully denied with additional comments'});
    return res.status(respDeleteRoleByRequestId.status).send({data:respDeleteRoleByRequestId.config.data});
  } catch (e) {
    debugger;
    logger.error(e.status, e.statusText, JSON.stringify(e.data));
    throw e;
  }

}

  // let createAmRoleResponse: AxiosResponse;
  // let status;
  // let data;
  // try {
  //   createAmRoleResponse = await specificAccessRequestCreateAmRole(req, res);
  //   status = createAmRoleResponse.status;
  //   data = createAmRoleResponse.data;
  //   if (!createAmRoleResponse || createAmRoleResponse.status !== 201) {
  //     return res.status(createAmRoleResponse.status).send(createAmRoleResponse);
  //   }
  //   if (createAmRoleResponse && data.roleAssignmentResponse
  //     && data.roleAssignmentResponse.requestedRoles
  //     && data.roleAssignmentResponse.requestedRoles[0].attributes) {
  //     const attributes = data.roleAssignmentResponse.requestedRoles[0].attributes;
  //     const caseId = attributes.caseId;
  //     const jurisdiction = attributes.jurisdiction;
  //     const caseType = attributes.caseType;
  //     const taskType = 'followUpOverdueRespondentEvidence';
  //     const dueDate = '2022-04-23T16:21:41.320086';
  //     const taskName = 'Process Application';
  //     //const taskResponse = await postCreateTask(req, next, { caseId, jurisdiction, caseType, taskType, dueDate, name: taskName });
  //     // if (!taskResponse || taskResponse.status !== 204) {
  //     //   const assignmentId = data.roleAssignmentResponse.roleRequest.id;
  //     //   const baseRoleAccessUrl = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
  //     //   const basePath = `${baseRoleAccessUrl}/am/role-assignments`;
  //     //   const deleteBody = { assigmentId: assignmentId };
  //     //   const deleteResponse =   await sendDelete(`${basePath}/${assignmentId}`, deleteBody, req);
  //     //   if (!deleteResponse || deleteResponse.status !== 204) {
  //     //     return res.status(deleteResponse.status).send(deleteResponse);
  //     //   }
  //     //   return res.status(taskResponse.status).send(taskResponse);
  //     // }
  //     return res.status(status).send(data);
  //   }
  // } catch (error) {
  //   next(error);
  //   return res.status(error.status).send(error);
  // }
//}


// "headers" : {
//   "Authorization" : "Bearer eyJ0eXAiOiJKV1QiLCJraWQiOiIxZXIwV1J3Z0lPVEFGb2pFNHJDL2ZiZUt1M0k9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJURVNUX0FNX09STV9CRUZUQUB0ZXN0LmxvY2FsIiwiY3RzIjoiT0FVVEgyX1NUQVRFTEVTU19HUkFOVCIsImF1dGhfbGV2ZWwiOjAsImF1ZGl0VHJhY2tpbmdJZCI6IjkxOWY5N2Q5LTNkODItNDM4Yy04YjVhLWE3ZWI2NzBiMWJhZC05NzE4Njk2IiwiaXNzIjoiaHR0cHM6Ly9mb3JnZXJvY2stYW0uc2VydmljZS5jb3JlLWNvbXB1dGUtaWRhbS1hYXQyLmludGVybmFsOjg0NDMvb3BlbmFtL29hdXRoMi9yZWFsbXMvcm9vdC9yZWFsbXMvaG1jdHMiLCJ0b2tlbk5hbWUiOiJhY2Nlc3NfdG9rZW4iLCJ0b2tlbl90eXBlIjoiQmVhcmVyIiwiYXV0aEdyYW50SWQiOiJhTTFxQ094YW5tRm5xTmpvTXhKVDFCVHNQRzgiLCJhdWQiOiJhbV9yb2xlX2Fzc2lnbm1lbnQiLCJuYmYiOjE2NTIxMDgxNTYsImdyYW50X3R5cGUiOiJwYXNzd29yZCIsInNjb3BlIjpbIm9wZW5pZCIsInByb2ZpbGUiLCJyb2xlcyIsImF1dGhvcml0aWVzIl0sImF1dGhfdGltZSI6MTY1MjEwODE1NiwicmVhbG0iOiIvaG1jdHMiLCJleHAiOjE2NTIxMzY5NTYsImlhdCI6MTY1MjEwODE1NiwiZXhwaXJlc19pbiI6Mjg4MDAsImp0aSI6IlF3bzQ2UTZpUlBqYjIyTkJ0anNJUFFkYm5oRSJ9.LPYtQE54ZI8RFnLMw1YUbvCRIrRc_0OQTENNmIELjjkyh7z7S2SN_htbwP1GCX4anxzJf_tgUVvlt6JVbhpvmHYslWeJ8KI_AAdv2MBkGc3Xb8BMY4SaVZn83iIvZV8YQdDbCHraqQ-IjBOzqHEZws4Sm-dFEEm9Zf90BgEa7MbjCTlhd87q275SwatA90gyIE7OnBsfJb3WYuXSnaWQTrg-p2prgXXMU3XZN5N36z5gwe_aY1Jjt5Y9mESmcsL2paRQqOlovs-6W4IJbOVnGtj8UbWY_wn2t_610tt3Tl0DzThamPD8-qeDzyFsoPI1v-4VFp2xG5juT6f0P7I9qw",
//   "ServiceAuthorization" : "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbV9vcmdfcm9sZV9tYXBwaW5nX3NlcnZpY2UiLCJleHAiOjE2NTIxMjI1NzJ9.d2xPyHSHVq0fd9ykRwKQ1GUk9UscWFUdWQTIDdnxtmRk2oDJvaMDd1fgn1UxfG20VUcuVNB71PW0hqIEXX5D6A",
//   "X-Correlation-ID" : "003352d0-e699-48bc-b6f5-5810411e60af"
// },
// "pathVariables" : {
//   "process" : "staff-organisational-role-mapping",
//   "reference" : "cbb51593-aaca-4da3-ab67-7200d8d31af6"
// },
// "queryParams" : null,
// "body" : {
//   "userIds" : [ "cbb51593-aaca-4da3-ab67-7200d8d31af6" ]
// },
// "multipart" : false
// }
