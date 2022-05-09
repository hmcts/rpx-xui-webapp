import Logger from "@pact-foundation/pact-node/src/logger";
import { getConfigValue } from '../configuration';
import { NextFunction, Response } from 'express';
import { setHeaders } from '../lib/proxy';
import { http } from '../lib/http';
import { AxiosResponse } from 'axios';
import { SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';

export function handleSpecificAccessResponse(proxyRes, req, res, data): {} {
  const attributes = data.roleAssignmentResponse.requestedRoles[0].attributes;
  if (data && data.roleAssignmentResponse && data.roleAssignmentResponse.requestedRoles && data.roleAssignmentResponse.requestedRoles[0].attributes) {
    const caseId = attributes.caseId;
    const requestedRole = attributes.requestedRole;
    const jurisdiction = attributes.jurisdiction;
    const caseType = attributes.caseType;
    console.log('caseType');
    console.log(caseId, requestedRole, jurisdiction, caseType);
  }
  return data;
}

export async function specificAccessRequest(req, res, next): Promise<Response> {

  // console.log('here****************************');
  // return res.status(201).send({taskID:101});
    //
    //   //1: create role assignment {get role assinmentID}
    //       // role and access folder
    //   //2A:create task
    //         // will be on work allocation 2 folder
    //         // return 200 resp to client
    //   //2B: If task creation failed delete roleassignment by roleassignment id
    //         // work allocation 2 folder
    // }
    let amResponse ;
    let taskResponse ;
    try {
      // amResponse = await specificAccessRequestCreateAmRole(req, res, next);
      debugger;
      if(!amResponse || !amResponse.roleAssignmentId)
      {
        // Log
        // return roleAssignmentID
      }
      taskResponse = await specificAccessRequestCreateTask(req, res, next);

      if(!taskResponse || !taskResponse.taskId)
      {
        specificAccessRequestCreateAmRoleRoleback(req, res, next)
      }

      //return res.status(200).send({amResponse.roleAssignmentId,taskResponse.TaskId});
    } catch (error) {
      if(amResponse&&amResponse.roleAssignmentId)
      {
        // specificAccessRequestCreateAmRoleRoleback(req, res, next)
      }
      next(error);
    }
    debugger;
    return res.status(201).send({taskID:101});
}

async function specificAccessRequestCreateAmRoleRoleback(req, res, next): Promise<Response> {
  try {
    return res.status(201).send({roleAssignmentId:101, rolebackStatus:true});
  } catch (error) {
    next(error);
  }
}

async function specificAccessRequestCreateTask(req, res, next): Promise<Response> {
  try {
    //MAKE Service Call
    return res.status(201).send({taskID:101});
  } catch (error) {
    //log error
    return null;
  }
}

