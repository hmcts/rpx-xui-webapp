import { NextFunction, Response } from 'express';
import { handleDelete, handleGet, handlePost, handlePut, sendPut } from '../common/crudService';
import { getConfigValue } from '../configuration';
import { SERVICES_CCD_DATA_STORE_API_PATH, SERVICES_HEARINGS_ENABLE_DATA_SOURCE_HEADERS, SERVICES_HMC_HEARINGS_COMPONENT_API, SERVICES_ROLE_ASSIGNMENT_API_PATH } from '../configuration/references';
import { EnhancedRequest, JUILogger } from '../lib/models';
import { HearingActualsMainModel, HearingActualsModel } from './models/hearingActualsMainModel';
import { HearingListMainModel } from './models/hearingListMain.model';
import { HearingRequestMainModel } from './models/hearingRequestMain.model';
import { hearingStatusMappings } from './models/hearingStatusMappings';
import {
  LinkedHearingGroupMainModel,
  LinkedHearingGroupResponseModel
} from './models/linkHearings.model';
import { trackTrace } from '../lib/appInsights';
import * as log4jui from '../lib/log4jui';

export const hmcHearingsUrl: string = getConfigValue(SERVICES_HMC_HEARINGS_COMPONENT_API);
const logger: JUILogger = log4jui.getLogger('hmc-index');

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseId = req.query.caseId;
  const markupPath: string = `${hmcHearingsUrl}/hearings/${caseId}`;

  try {
    const { status, data }: { status: number, data: HearingListMainModel } = await handleGet(markupPath, req, next);
    data.caseHearings.forEach((hearing) =>
      hearingStatusMappings.filter((mapping) => mapping.hmcStatus === hearing.hmcStatus).map((hearingStatusMapping) => {
        hearing.exuiSectionStatus = hearingStatusMapping.exuiSectionStatus;
        hearing.exuiDisplayStatus = hearingStatusMapping.exuiDisplayStatus;
      }));
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * getHearing from hearing ID
 */
export async function getHearing(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const hearingId: string = req.query.hearingId;
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;

  try {
    const { status, data }: { status: number, data: HearingRequestMainModel } = await handleGet(markupPath, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * submitHearingRequest - submit hearing request
 */
export async function submitHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/hearing`;
  try {
    trackTrace('submitting hearing request');
    const { status, data }: { status: number, data: any } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    logger.error('SubmitHearingRequest error: ' + error.status + ' ' + markupPath, error.statusText, JSON.stringify(error.data));
    if (error.status >= 400 && error.status < 600) {
      trackTrace(`SubmitHearingRequest error: (${error.status}) : ${JSON.stringify(error.data)}`);
    }
    next(error);
  }
}

/**
 * cancelHearingRequest - cancel hearing request
 */
export async function cancelHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.query.hearingId;
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;

  try {
    const reqBody = req.body;
    const { status, data }: { status: number, data: any } = await handleDelete(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * updateHearingRequest - update hearing request
 */
export async function updateHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.query.hearingId;
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/hearing/${hearingId}`;
  try {
    const { status, data }: { status: number, data: any } = await handlePut(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * getHearingActuals - get hearing actuals from hearing ID
 */
export async function getHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction): Promise<void> {
  const hearingId = req.params.hearingId;
  try {
    const { status, data }: { status: number, data: HearingActualsMainModel } =
      await handleGet(`${hmcHearingsUrl}/hearingActuals/${hearingId}`, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * updateHearingActuals - update hearing actuals
 */
export async function updateHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const hearingId = req.query.hearingId;
  const markupPath = `${hmcHearingsUrl}/hearingActuals/${hearingId}`;
  try {
    const { status, data }: { status: number, data: HearingActualsModel } = await sendPut(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * submitHearingActuals - submit hearing actuals
 */
export async function submitHearingActuals(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingId = req.params.hearingId;
  const markupPath = `${hmcHearingsUrl}/hearingActualsCompletion/${hearingId}`;
  try {
    const { status }: { status: number } = await handlePost(markupPath, null, req);
    res.status(status).send(null);
  } catch (error) {
    logger.error('submitHearingActuals error: ' + error.status + ' ' + markupPath, error.statusText, JSON.stringify(error.data));
    next(error);
  }
}

/**
 * getLinkedHearingGroup - get linked hearing group
 */
export async function getLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const groupId: string = req.query.groupId as string;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${groupId}`;
  try {
    const { status, data }: { status: number, data: LinkedHearingGroupMainModel } = await handleGet(markupPath, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * postLinkedHearingGroup - post linked hearing group
 */
export async function postLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup`;
  try {
    const { status, data }: { status: number, data: LinkedHearingGroupResponseModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    logger.error('postLinkedHearingGroup error: ' + error.status + ' ' + markupPath, error.statusText, JSON.stringify(error.data));
    next(error);
  }
}

/**
 * putLinkedHearingGroup - put linked hearing group
 */
export async function putLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const groupId: string = req.query.groupId as string;
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup?id=${groupId}`;
  try {
    const { status, data }: { status: number, data: LinkedHearingGroupResponseModel } = await handlePut(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * deleteLinkedHearingGroup - delete linked hearing group
 */
export async function deleteLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const hearingGroupId: string = req.query.hearingGroupId as string;
  const reqBody = req.body;
  const markupPath: string = `${hmcHearingsUrl}/linkedHearingGroup/${hearingGroupId}`;
  try {
    const { status, data }: { status: number, data: LinkedHearingGroupResponseModel } = await handleDelete(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export function injectHearingsHeaders(req: EnhancedRequest, res: Response, next: NextFunction) {
  if (getConfigValue(SERVICES_HEARINGS_ENABLE_DATA_SOURCE_HEADERS) === 'true') {
    req.headers['Role-Assignment-Url'] = getConfigValue(SERVICES_ROLE_ASSIGNMENT_API_PATH);
    req.headers['Data-Store-Url'] = getConfigValue(SERVICES_CCD_DATA_STORE_API_PATH);
  }

  next();
}
