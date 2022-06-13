import {NextFunction, Response} from 'express';
import {sendPost} from '../common/crudService';
import {getConfigValue} from '../configuration';
import {SERVICES_HEARINGS_COMPONENT_API} from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import {EnhancedRequest} from '../lib/models';
import {DEFAULT_SCREEN_FLOW} from "./data/defaultScreenFlow.data";
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
  const jurisdictionId = req.query.jurisdictionId;
  const reqBody = req.body;
  const servicePath: string = getServicePath(serviceHearingsUrl, jurisdictionId);
  const markupPath: string = `${servicePath}/serviceHearingValues`;
  try {
    const {status, data}: { status: number, data: ServiceHearingValuesModel } = await sendPost(markupPath, reqBody, req);
    let dataByDefault = data;
    // If service don't supply the screenFlow pre-set the default screen flow from ExUI
    if (!data.screenFlow) {
      dataByDefault = {
        ...data,
        screenFlow: DEFAULT_SCREEN_FLOW,
      };
    }
    res.status(status).send(dataByDefault);
  } catch (error) {
    next(error);
  }
}

/**
 * loadServiceLinkedCases - get linked cases from service
 */
export async function loadServiceLinkedCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const jurisdictionId = req.query.jurisdictionId;
  const reqBody = req.body;
  const servicePath: string = getServicePath(serviceHearingsUrl, jurisdictionId);
  const markupPath: string = `${servicePath}/serviceLinkedCases`;
  try {
    const {status, data}: { status: number, data: ServiceLinkedCasesModel[] } = await sendPost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

function getServicePath(pathTemplate: string, jurisdictionId): string {
  return pathTemplate.replace(/jurisdiction/g, jurisdictionId.toLowerCase());
}
