import { NextFunction, Response } from 'express';
import { handleDelete, handleGet, handlePost } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_HEARINGS_COMPONENT_API} from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import { EnhancedRequest } from '../lib/models';
import { HearingListModel } from './models/hearingList.model';
import { HearingListMainModel } from './models/hearingListMain.model';
import { HearingResponseMainModel } from './models/hearingResponseMain.model';
import { hearingStatusMappings } from './models/hearingStatusMappings';
import { ServiceHearingValuesModel } from './models/serviceHearingValues.model';

mock.init();

const hearingsUrl: string = getConfigValue(SERVICES_HEARINGS_COMPONENT_API);

/**
 * loadServiceHearingValues - get details required to populate the hearing request/amend journey
 */
export async function loadServiceHearingValues(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/serviceHearingValues`;
  try {
    const { status, data }: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const caseId = req.query.caseId;
  const markupPath: string = `${hearingsUrl}/hearings/${caseId}`;

  try {
    const { status, data }: { status: number, data: HearingListMainModel } = await handleGet(markupPath, req);
    data.caseHearings.forEach(hearing =>
      hearingStatusMappings.filter(mapping => mapping.hmcStatus === hearing.hmcStatus).map(hearingStatusMapping => {
        hearing.exuiSectionStatus = hearingStatusMapping.exuiSectionStatus;
        hearing.exuiDisplayStatus = hearingStatusMapping.exuiDisplayStatus;
      }));

    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * getHearing from case ID
 */
export async function getHearing(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const hearingId: string = req.query.hearingId;
  const markupPath: string = `${hearingsUrl}/hearing/${hearingId}`;

  try {
    const { status, data }: { status: number, data: HearingResponseMainModel[] } = await handleGet(markupPath, req);
    const response = data.filter(dataRecord => dataRecord.caseDetails && dataRecord.caseDetails.hearingID.toLowerCase());
    res.status(status).send(response);
  } catch (error) {
    next(error);
  }
}

/**
 * submitHearingRequest - submit hearing request
 */
export async function submitHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/hearing`;
  try {
    const { status, data }: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * cancelHearingRequest - cancel hearing request
 */
export async function cancelHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const hearingId = req.query.hearingId;
  const markupPath: string = `${hearingsUrl}/hearing/${hearingId}`;

  try {
    const { status, data }: { status: number, data: HearingListModel } = await handleDelete(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
