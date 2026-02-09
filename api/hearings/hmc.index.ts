import { NextFunction, Response } from 'express';
import { handleDelete, handleGet, handlePost, handlePut, sendPut } from '../common/crudService';
import { getConfigValue } from '../configuration';
import {
  SERVICES_CCD_DATA_STORE_API_PATH,
  SERVICES_HEARINGS_ENABLE_DATA_SOURCE_HEADERS,
  SERVICES_HMC_HEARINGS_COMPONENT_API,
  SERVICES_ROLE_ASSIGNMENT_API_PATH,
} from '../configuration/references';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { HearingActualsMainModel, HearingActualsModel } from './models/hearingActualsMainModel';
import { HearingListMainModel } from './models/hearingListMain.model';
import { HearingRequestMainModel } from './models/hearingRequestMain.model';
import { hearingStatusMappings } from './models/hearingStatusMappings';
import { LinkedHearingGroupMainModel, LinkedHearingGroupResponseModel } from './models/linkHearings.model';
import { trackTrace } from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';

export const hmcHearingsUrl: string = getConfigValue(SERVICES_HMC_HEARINGS_COMPONENT_API);
const logger: JUILogger = log4jui.getLogger('hmc-index');

/**
 * handleHearingError - reusable error handler for hearing requests
 */
function handleHearingError(
  error: any,
  caseId: string,
  operationName: string,
  req: EnhancedRequest,
  markupPath: string,
  next: NextFunction
): void {
  const hearingId = req.query.hearingId;
  const deepLink: string | undefined = req.body?.caseDetails?.caseDeepLink;
  let inferredCaseId: string | undefined;
  if (typeof deepLink === 'string') {
    const specific = deepLink.match(/\/case-details\/(\d+)/);
    inferredCaseId = specific?.[1] ?? deepLink.match(/\d{10,}/)?.[0];
  }
  const errorData = error?.data ?? error?.errors ?? null;
  const caseRef = typeof caseId === 'string' && caseId.trim() ? caseId.trim() : inferredCaseId;
  const caseInfo = caseRef ? ` caseID: ${caseRef}` : '';
  const hearingInfo = hearingId ? ` hearingID: ${hearingId}` : '';
  const idInfo = `${caseInfo}${hearingInfo}`;
  logger.error(
    `HMC-Index | ${operationName} error:${idInfo} : ${error.status} ${markupPath}`,
    error.statusText,
    JSON.stringify(errorData)
  );
  if (error.status >= 400 && error.status < 600) {
    trackTrace(`HMC-Index | ${operationName} error${idInfo} : (${error.status}) : ${JSON.stringify(errorData)}`);
  }
  next(error);
}

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseId = req.query.caseId;
  const markupPath: string = `${hmcHearingsUrl}/hearings/${caseId}`;

  try {
    const { status, data }: { status: number; data: HearingListMainModel } = await handleGet(markupPath, req);
    data.caseHearings.forEach((hearing) =>
      hearingStatusMappings
        .filter((mapping) => mapping.hmcStatus === hearing.hmcStatus)
        .map((hearingStatusMapping) => {
          hearing.exuiSectionStatus = hearingStatusMapping.exuiSectionStatus;
          hearing.exuiDisplayStatus = hearingStatusMapping.exuiDisplayStatus;
        })
    );
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, null, 'getHearings', req, markupPath, next);
  }
}

/**
 * getHearing from hearing ID
 */
export async function getHearing(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const hearingId: string = req.query.hearingId as string;
  const caseRef = req.query.caseRef as string;
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;
  // const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}123`; // TESTING PURPOSES ONLY - to be removed when backend is fixed
  console.log(req.query);
  try {
    const { status, data }: { status: number; data: HearingRequestMainModel } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseRef, 'getHearing', req, markupPath, next);
  }
}

/**
 * submitHearingRequest - submit hearing request
 */
export async function submitHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/hearing`;
  // req.body.caseDetails.caseRef = null; // TESTING PURPOSES ONLY - to be removed when front end is sending case ref
  try {
    trackTrace('submitting hearing request');
    const { status, data }: { status: number; data: any } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, null, 'SubmitHearingRequest', req, markupPath, next);
  }
}

/**
 * cancelHearingRequest - cancel hearing request
 */
export async function cancelHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.query.hearingId;
  const caseId = req.query.caseId as string;
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;
  // req.body.cancellationReasonCodes = null; // TESTING PURPOSES ONLY - to be removed when front end is sending reason codes
  try {
    const reqBody = req.body;
    const { status, data }: { status: number; data: any } = await handleDelete(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'cancelHearingRequest', req, markupPath, next);
  }
}

/**
 * updateHearingRequest - update hearing request
 */
export async function updateHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.query.hearingId;
  const reqBody = req.body;
  // reqBody.caseDetails.caseRef = null; // TESTING PURPOSES ONLY - to be removed when front end is sending case ref
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;
  try {
    const { status, data }: { status: number; data: any } = await handlePut(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, null, 'updateHearingRequest', req, markupPath, next);
  }
}

/**
 * getHearingActuals - get hearing actuals from hearing ID
 */
export async function getHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction): Promise<void> {
  const hearingId = req.params.hearingId;
  const caseId = req.query.caseRef as string;
  const markupPath = `${hmcHearingsUrl}/hearingActuals/${hearingId}`;
  try {
    const { status, data }: { status: number; data: HearingActualsMainModel } = await handleGet(
      `${hmcHearingsUrl}/hearingActuals/${hearingId}`,
      req
    );
    // await handleGet(`${hmcHearingsUrl}/hearingActuals/${hearingId}1234`, req, next); // TESTING PURPOSES ONLY - to be removed when backend is fixed
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'getHearingActuals', req, markupPath, next);
  }
}

/**
 * updateHearingActuals - update hearing actuals
 */
export async function updateHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const hearingId = req.query.hearingId;
  const caseId = req.query.caseId as string;
  const markupPath = `${hmcHearingsUrl}/hearingActuals/${hearingId}`;
  // reqBody.actualHearingDays[0].hearingDate = null; // Testing purposes only - to be removed when front end is sending hearing date
  try {
    const { status, data }: { status: number; data: HearingActualsModel } = await sendPut(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'updateHearingActuals', req, markupPath, next);
  }
}

/**
 * submitHearingActuals - submit hearing actuals
 */
export async function submitHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.params.hearingId;
  const caseId = req.query.caseRef as string;
  const markupPath = `${hmcHearingsUrl}/hearingActualsCompletion/${hearingId}`;
  // const markupPath = `${hmcHearingsUrl}/hearingActualsCompletion/${hearingId}123`; // TESTING PURPOSES ONLY - to be removed when backend is fixed
  try {
    const { status }: { status: number } = await handlePost(markupPath, null, req);
    res.status(status).send(null);
  } catch (error) {
    handleHearingError(error, caseId, 'submitHearingActuals', req, markupPath, next);
  }
}

/**
 * getLinkedHearingGroup - get linked hearing group
 */
export async function getLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const groupId: string = req.query.groupId as string;
  const caseId = req.query.caseId as string;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${groupId}`;
  // const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${groupId}123`; // TESTING PURPOSES ONLY - to be removed when backend is fixed
  try {
    const { status, data }: { status: number; data: LinkedHearingGroupMainModel } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'getLinkedHearingGroup', req, markupPath, next);
  }
}

/**
 * postLinkedHearingGroup - post linked hearing group
 */
export async function postLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const caseId = req.query.caseId as string;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup`;
  try {
    const { status, data }: { status: number; data: LinkedHearingGroupResponseModel } = await handlePost(
      markupPath,
      reqBody,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'postLinkedHearingGroup', req, markupPath, next);
  }
}

/**
 * putLinkedHearingGroup - put linked hearing group
 */
export async function putLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const groupId: string = req.query.groupId as string;
  const caseId = req.query.caseId as string;
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup?id=${groupId}`;
  try {
    const { status, data }: { status: number; data: LinkedHearingGroupResponseModel } = await handlePut(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'putLinkedHearingGroup', req, markupPath, next);
  }
}

/**
 * deleteLinkedHearingGroup - delete linked hearing group
 */
export async function deleteLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingGroupId: string = req.query.hearingGroupId as string;
  const caseId = req.query.caseId as string;
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${hearingGroupId}`;
  // const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${hearingGroupId}1234`; // TESTING PURPOSES ONLY - to be removed when backend is fixed
  try {
    const { status, data }: { status: number; data: LinkedHearingGroupResponseModel } = await handleDelete(
      markupPath,
      reqBody,
      req
    );
    res.status(status).send(data);
  } catch (error) {
    handleHearingError(error, caseId, 'deleteLinkedHearingGroup', req, markupPath, next);
  }
}

export function injectHearingsHeaders(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (getConfigValue(SERVICES_HEARINGS_ENABLE_DATA_SOURCE_HEADERS) === 'true') {
    req.headers['Role-Assignment-Url'] = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    req.headers['Data-Store-Url'] = getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH);
  }

  next();
}
