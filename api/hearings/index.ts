import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_HEARINGS_COMPONENT_API } from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import { EnhancedRequest } from '../lib/models';
import { CaseHearingsMainModel } from './models/caseHearingsMain.model';
import {HearingStagesModel} from "./models/hearingStages.model";
import { hearingStatusMappings } from './models/hearingStatusMappings';

mock.init();

const url: string = getConfigValue(SERVICES_HEARINGS_COMPONENT_API);

/**
 * getHearings from case ID
 */
export async function getHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const caseId = req.query.caseId;
  const markupPath: string = `${url}/hearings/${caseId}`;

  try {
    const {status, data}: { status: number, data: CaseHearingsMainModel } = await handleGet(markupPath, req);
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
 * getStages from jurisdiction ID
 */
export async function getStages(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const jurisdictionID = req.query.jurisdictionID;
  const markupPath: string = `${url}/stages/${jurisdictionID}`;
  try {
    const {status, data}: { status: number, data: HearingStagesModel[] } = await handleGet(markupPath, req);
    const stages = data.find(hearingStage => hearingStage.jurisdictionId === jurisdictionID);
    if (stages) {
      res.status(status).send(stages.stages);
    } else {
      const defaultStages  = data.find(hearingStage => hearingStage.jurisdictionId === 'DEFAULT');
      res.status(status).send(defaultStages.stages);
    }
  } catch (error) {
    next(error);
  }
}
