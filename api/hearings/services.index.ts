import {NextFunction, Response} from 'express';
import {handlePost} from '../common/mockService';
import {getConfigValue} from '../configuration';
import {SERVICES_HEARINGS_COMPONENT_API} from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import {EnhancedRequest} from '../lib/models';
import {
  ServiceLinkedCasesModel
} from './models/linkHearings.model';
import {ServiceHearingValuesModel} from './models/serviceHearingValues.model';

mock.init();

const serviceHearingsUrl: string = getConfigValue(SERVICES_HEARINGS_COMPONENT_API);

/**
 * loadServiceHearingValues - get details required to populate the hearing request/amend journey
 */
export async function loadServiceHearingValues(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${serviceHearingsUrl}/serviceHearingValues`;
  try {
    const {status, data}: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * loadServiceLinkedCases - get linked cases from service
 */
export async function loadServiceLinkedCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${serviceHearingsUrl}/serviceLinkedCases`;
  try {
    const {status, data}: { status: number, data: ServiceLinkedCasesModel[] } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
