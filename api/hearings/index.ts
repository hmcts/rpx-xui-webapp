import { NextFunction, Response } from 'express';
import { handleGet } from '../common/mockService';
import { getConfigValue } from '../configuration';
import { SERVICES_HEARINGS_COMPONENT_API } from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import { EnhancedRequest } from '../lib/models';
import { CaseHearingsMainModel } from './models/caseHearingsMain.model';
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
      hearingStatusMappings.filter(mapping => mapping.hmcStatus === hearing.hmcStatus).map(m => {
        hearing.hearingListingStatus = m.hearingListingStatus
        hearing.hearingsSectionStatus = m.hearingsSectionStatus
    }));

    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
