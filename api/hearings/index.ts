import {NextFunction, Response} from 'express';
import { throwError } from 'rxjs';
import {handleDelete, handleGet, handlePost, handlePut} from '../common/mockService';
import {getConfigValue} from '../configuration';
import {SERVICES_HEARINGS_COMPONENT_API} from '../configuration/references';
import * as mock from '../hearings/hearing.mock';
import {EnhancedRequest} from '../lib/models';
import {HearingActualsMainModel, HearingActualsModel} from './models/hearingActualsMainModel';
import {HearingListModel} from './models/hearingList.model';
import {HearingListMainModel} from './models/hearingListMain.model';
import {HearingRequestMainModel} from './models/hearingRequestMain.model';
import {hearingStatusMappings} from './models/hearingStatusMappings';
import {
  LinkedHearingGroupMainModel,
  LinkedHearingGroupResponseModel,
  ServiceLinkedCasesModel
} from './models/linkHearings.model';
import {ServiceHearingValuesModel} from './models/serviceHearingValues.model';

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
 * getHearing from hearing ID
 */
export async function getHearing(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const hearingId: string = req.query.hearingId;
  const markupPath: string = `${hearingsUrl}/hearing/${hearingId}`;

  try {
    const { status, data }: { status: number, data: HearingRequestMainModel } = await handleGet(markupPath, req);
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
    const { status, data }: { status: number, data: ServiceHearingValuesModel } = await handlePost(markupPath, reqBody, req);
    // res.status(status).send(data);
		// throwError('custom error');
		res.status(500).send(data);
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

/**
 * updateHearingRequest - update hearing request
 */
export async function updateHearingRequest(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/hearing`;
  try {
    const { status, data }: { status: number, data: HearingListModel } = await handlePut(markupPath, reqBody, req);
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
      await handleGet(`${hearingsUrl}/hearingActuals/${hearingId}`, req);
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
  const markupPath = `${hearingsUrl}/hearingActuals/${hearingId}`;
  try {
    const { status, data }: { status: number, data: HearingActualsModel } = await handlePut(markupPath, reqBody, req);
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
  const markupPath = `${hearingsUrl}/hearingActualsCompletion/${hearingId}`;
  try {
    const { status }: { status: number } = await handlePost(markupPath, null, req);
    res.status(status).send(null);
  } catch (error) {
    next(error);
  }
}

/**
 * loadServiceLinkedCases - get linked cases from service
 */
export async function loadServiceLinkedCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/serviceLinkedCases`;
  try {
    const { status, data }: { status: number, data: ServiceLinkedCasesModel[] } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * getLinkedHearingGroup - get linked hearing group
 */
export async function getLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const caseReference: string = req.query.caseReference;
  const hearingId: string = req.query.hearingId;
  const markupPath: string = `${hearingsUrl}/linkedHearingGroup?caseReference=${caseReference}&hearingId=${hearingId}`;
  try {
    const { status, data }: { status: number, data: LinkedHearingGroupMainModel } = await handleGet(markupPath, req);
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
  const markupPath: string = `${hearingsUrl}/linkedHearingGroup`;
  try {
    const {status, data}: { status: number, data: LinkedHearingGroupResponseModel } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * putLinkedHearingGroup - put linked hearing group
 */
export async function putLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/linkedHearingGroup`;
  try {
    const {status, data}: { status: number, data: LinkedHearingGroupResponseModel } = await handlePut(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

/**
 * deleteLinkedHearingGroup - delete linked hearing group
 */
export async function deleteLinkedHearingGroup(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${hearingsUrl}/linkedHearingGroup`;
  try {
    const {status, data}: {status: number, data: LinkedHearingGroupResponseModel} = await handleDelete(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
