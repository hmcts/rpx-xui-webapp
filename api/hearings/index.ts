import {NextFunction, Response} from 'express';
import {handleGet, handlePost} from '../common/mockService';
import {getConfigValue} from '../configuration';
import {SERVICES_HEARINGS_COMPONENT_API, SERVICES_PRD_API_URL} from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import {EnhancedRequest} from '../lib/models';
import {HearingListMainModel} from './models/hearingListMain.model';
import {hearingStatusMappings} from './models/hearingStatusMappings';
import {RefDataByCategoryModel, RefDataByServiceModel} from './models/refData.model';
import {ServiceHearingValuesModel} from './models/serviceHearingValues.model';

mock.init();

const hearingsUrl: string = getConfigValue(SERVICES_HEARINGS_COMPONENT_API);
const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const caseId = req.query.caseId;
  const markupPath: string = `${hearingsUrl}/hearings/${caseId}`;

  try {
    const {status, data}: { status: number, data: HearingListMainModel } = await handleGet(markupPath, req);
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
 * getRefData from category and service ID
 */
export async function getRefData(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const category = req.query.category;
  const service = req.query.service;
  const markupPath: string = `${prdUrl}/refdata/lov/${category}/${service}`;
  try {
    const {status, data}: { status: number, data: RefDataByCategoryModel[] } = await handleGet(markupPath, req);
    const refDataByCategory: RefDataByCategoryModel = data.find(refDataByCategoryModel =>
      refDataByCategoryModel.categoryKey === category);
    if (refDataByCategory && refDataByCategory.services) {
      const refDataByService: RefDataByServiceModel = refDataByCategory.services.find(aService =>
        aService.serviceID === service);
      if (refDataByService && refDataByService.values) {
        res.status(status).send(refDataByService.values);
      } else {
        res.status(status).send([]);
      }
    } else {
      res.status(status).send([]);
    }
  } catch (error) {
    next(error);
  }
}

/**
 * loadServiceHearingValues - get details required to populate the hearing request/amend journey
 */
export async function loadServiceHearingValues(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/serviceHearingValues`;
  try {
    const {status, data}: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
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
  const markupPath: string = `${hearingsUrl}/hearing`;
  try {
    const {status, data}: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
