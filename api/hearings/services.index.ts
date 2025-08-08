import { NextFunction, Response } from 'express';
import { sendGet, sendPost } from '../common/crudService';
import { getConfigValue, showFeature } from '../configuration';
import { FORCE_NEW_DEFAULT_SCREEN_FLOW, HEARINGS_SUPPORTED_JURISDICTIONS } from '../configuration/references';
import * as log4jui from '../lib/log4jui';
import { EnhancedRequest, JUILogger } from '../lib/models';
import {
  DEFAULT_SCREEN_FLOW,
  DEFAULT_SCREEN_FLOW_NEW, HEARING_JUDGE, HEARING_PANEL_REQUIRED, HEARING_PANEL_SELECTOR,
  HEARING_VENUE, HEARING_WELSH,
  replaceResultValue
} from './data/defaultScreenFlow.data';
import { hmcHearingsUrl } from './hmc.index';
import { HearingListMainModel } from './models/hearingListMain.model';
import { hearingStatusMappings } from './models/hearingStatusMappings';
import { EXUIDisplayStatusEnum } from './models/hearings.enum';
import {
  ServiceLinkedCasesModel
} from './models/linkHearings.model';
import { ServiceHearingValuesModel } from './models/serviceHearingValues.model';
import { trackTrace } from '../lib/appInsights';
import { ScreenNavigationModel } from './models/screenNavigation.model';

const logger: JUILogger = log4jui.getLogger('hearing-service-api');

/**
 * loadServiceHearingValues - get details required to populate the hearing request/amend journey
 */
export async function loadServiceHearingValues(req: EnhancedRequest, res: Response, next: NextFunction) {
  const jurisdictionId = req.query.jurisdictionId;
  const reqBody = req.body;
  const servicePath: string = getServicePath(jurisdictionId);
  const markupPath: string = `${servicePath}/serviceHearingValues`;
  try {
    const serviceResponse = await sendPost(markupPath, reqBody, req, next);
    if (serviceResponse) {
      const { status, data }: { status: number, data: ServiceHearingValuesModel } = await sendPost(markupPath, reqBody, req, next);
      let dataByDefault = mapDataByDefault(data);
      const forceNewDefaultScreenFlow = retrieveForceNewDefaultScreenFlow();
      trackTrace(`services.index - forceNewDefaultScreenFlow: ${forceNewDefaultScreenFlow}`);
      console.log(`services.index - forceNewDefaultScreenFlow: ${forceNewDefaultScreenFlow}`);
      if (forceNewDefaultScreenFlow) {
        trackTrace('services.index - In forceDefaultScreenFlow...');
        console.log('services.index - In forceDefaultScreenFlow...');
        dataByDefault = forceDefaultScreenFlow(data);
      } else {
        trackTrace('services.index - Not in forceDefaultScreenFlow...');
        console.log('services.index - Not in forceDefaultScreenFlow...');
        if (!data.screenFlow) {
          dataByDefault = {
            ...data,
            screenFlow:
              (data.panelRequiredDefault !== undefined) ? DEFAULT_SCREEN_FLOW_NEW : DEFAULT_SCREEN_FLOW
          };
        }
      }
      trackTrace('services.index - dataByDefault.screenFlow:' + JSON.stringify(data.screenFlow));
      console.log('services.index - dataByDefault.screenFlow:' + JSON.stringify(data.screenFlow));

      res.status(status).send(dataByDefault);
    }
  } catch (error) {
    trackTrace('Error calling serviceHearingValues', error);
    next(error);
  }
}

export function retrieveForceNewDefaultScreenFlow():boolean {
  try {
    const result = showFeature(FORCE_NEW_DEFAULT_SCREEN_FLOW);
    trackTrace('services.index - retrieveForceNewDefaultScreenFlow' + result);
    console.log('services.index - retrieveForceNewDefaultScreenFlow' + result);
    return toBoolean(result);
  } catch {
    return false;
  }
}

export function toBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true';
  }
  return false;
}

export function forceDefaultScreenFlow(data: ServiceHearingValuesModel) {
  trackTrace('services.index - in forceDefaultScreenFlow '+ JSON.stringify(data.screenFlow));
  console.log('services.index - in forceDefaultScreenFlow '+ JSON.stringify(data.screenFlow));
  if (!data.screenFlow) {
    trackTrace('services.index - data.screenFlow is undefined, using DEFAULT_SCREEN_FLOW_NEW');
    console.log('services.index - data.screenFlow is undefined, using DEFAULT_SCREEN_FLOW_NEW');
    return {
      ...data,
      screenFlow: DEFAULT_SCREEN_FLOW_NEW
    };
  }
  const panelSelectorScreen = data.screenFlow.find((screen) => screen.screenName === 'hearing-panel');
  const followingScreen = panelSelectorScreen?.navigation?.[0]?.resultValue;

  return {
    ...data,
    screenFlow: replaceScreenFlow(data.screenFlow, followingScreen)
  };
}

export function replaceScreenFlow(screenFlow: ScreenNavigationModel[], followingScreen: string): ScreenNavigationModel[] {
  trackTrace('services.index - replaceScreenFlow called with followingScreen:');
  console.log('services.index - replaceScreenFlow called with followingScreen:');
  // Define the sequence to be replaced
  const toReplaceSequence = ['hearing-venue', 'hearing-welsh', 'hearing-judge', 'hearing-panel'];

  // Find the index of the sequence
  let startIndex = -1;

  for (let i = 0; i <= screenFlow.length - toReplaceSequence.length; i++) {
    const segment = screenFlow.slice(i, i + toReplaceSequence.length).map((s) => s.screenName);
    if (JSON.stringify(segment) === JSON.stringify(toReplaceSequence)) {
      startIndex = i;
      break;
    }
  }

  if (startIndex === -1) {
    return screenFlow; // Sequence not found
  }

  // Remove old sequence
  screenFlow.splice(startIndex, toReplaceSequence.length);

  // Define the replacement sequence
  const newSequence: ScreenNavigationModel[] = [
    replaceResultValue(HEARING_VENUE, 'hearing-judge', 'hearing-panel-required'),
    replaceResultValue(HEARING_WELSH, 'hearing-judge', 'hearing-panel-required'),
    HEARING_PANEL_REQUIRED,
    replaceResultValue(HEARING_JUDGE, 'hearing-panel', followingScreen),
    replaceResultValue(HEARING_PANEL_SELECTOR, 'hearing-timing', followingScreen)
  ];

  // Insert the new sequence at the same location
  screenFlow.splice(startIndex, 0, ...newSequence);
  trackTrace('services.index - replaceScreenFlow screen flow replaced with new sequence: ' + JSON.stringify(screenFlow));
  console.log('services.index - replaceScreenFlow screen flow replaced with new sequence: ' + JSON.stringify(screenFlow));
  return screenFlow;
}

export function mapDataByDefault(data: ServiceHearingValuesModel): ServiceHearingValuesModel {
  // There is an inconsistency with the PartyFlagsModel data provided by the services
  // i.e., PrL provides partyId and CIVIL provides partyID
  // Resolving this to copy over partyID into partyId
  if (data?.caseFlags?.flags?.length > 0) {
    return {
      ...data,
      caseFlags: {
        ...data.caseFlags,
        flags: data.caseFlags.flags.map((flag) => (
          {
            ...flag,
            partyId: flag.partyID ? flag.partyID : flag.partyId
          }
        ))
      }
    };
  }
  return data;
}

/**
 * loadServiceLinkedCases - get linked cases from service
 */
export async function loadServiceLinkedCases(req: EnhancedRequest, res: Response, next: NextFunction) {
  const jurisdictionId = req.query.jurisdictionId;
  const reqBody = req.body;
  const servicePath: string = getServicePath(jurisdictionId);
  const markupPath: string = `${servicePath}/serviceLinkedCases`;
  try {
    const { status, data }: { status: number, data: ServiceLinkedCasesModel[] } = await sendPost(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

export async function getHearings(caseId: string, req: EnhancedRequest) {
  const markupPath: string = `${hmcHearingsUrl}/hearings/${caseId}`;
  try {
    const { data }: {data: HearingListMainModel } = await sendGet(markupPath, req);
    data.caseHearings.forEach((hearing) =>
      hearingStatusMappings.filter((mapping) => mapping.hmcStatus === hearing.hmcStatus).map((hearingStatusMapping) => {
        hearing.exuiSectionStatus = hearingStatusMapping.exuiSectionStatus;
        hearing.exuiDisplayStatus = hearingStatusMapping.exuiDisplayStatus;
      }));
    return data;
  } catch (error) {
    logger.error(error.status, error.statusText, JSON.stringify(error.data));
    throw error;
  }
}

/**
 * loadLinkedCasesWithHearings - get linked cases from service then get hearings from case
 * step 1 - get linked case from service
 * step 2 - after step 1 asynchronously call and get hearings from get /hearings api
 * step 3 - aggregate and return the linkedCasesWithHearings
 */
export async function loadLinkedCasesWithHearings(req: EnhancedRequest, res: Response, next: NextFunction) {
  const jurisdictionId = req.query.jurisdictionId;
  const reqBody = req.body;
  const servicePath: string = getServicePath(jurisdictionId);
  const markupPath: string = `${servicePath}/serviceLinkedCases`;
  try {
    const { status, data }: { status: number, data: ServiceLinkedCasesModel[] } = await sendPost(markupPath, reqBody, req, next);
    const currentCase: ServiceLinkedCasesModel = {
      caseReference: reqBody.caseReference,
      caseName: reqBody.caseName,
      reasonsForLink: []
    };
    const linkedCaseIds = data.map((linkedCase) => linkedCase.caseReference);

    if (linkedCaseIds && linkedCaseIds.length) {
      const promises = [];
      const allCaseId = [currentCase.caseReference, ...linkedCaseIds];
      const allData = [currentCase, ...data];
      allCaseId.forEach((caseId) => {
        const promise = getHearings(caseId, req);
        promises.push(promise);
      });
      // @ts-ignore
      const allResults = await Promise.allSettled(promises);
      const result = aggregateAllResults(allData, allResults);
      res.status(status).send(result);
    } else {
      res.status(status).send([]);
    }
  } catch (error) {
    next(error);
  }
}

export function aggregateAllResults(data: ServiceLinkedCasesModel[], allResults: any): any {
  const aggregateResult = [];
  allResults.forEach((result) => {
    const { status, value }: {status: string, value: any} = result;
    if (status === 'fulfilled') {
      const caseDetails = data.find((d) => d.caseReference === value.caseRef);
      const caseHearings = value.caseHearings.filter((hearing) =>
        hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.AWAITING_LISTING
        || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.UPDATE_REQUESTED
        || hearing.exuiDisplayStatus === EXUIDisplayStatusEnum.LISTED);
      const caseWithHearing = {
        ...value,
        caseHearings,
        caseName: caseDetails.caseName,
        reasonsForLink: caseDetails.reasonsForLink
      };
      aggregateResult.push(caseWithHearing);
    }
  });
  return aggregateResult;
}

export function getServicePath(jurisdictionId): string {
  if (isJurisdictionSupported(jurisdictionId)) {
    const configPath = `services.hearings.${jurisdictionId.toLowerCase()}.serviceApi`;
    return getConfigValue(configPath);
  }
  logger.error(`Hearings not configured for this jurisdiction: ${jurisdictionId}`);
  return '';
}

export function isJurisdictionSupported(jurisdictionId): boolean {
  const supportedJurisdictions = getConfigValue(HEARINGS_SUPPORTED_JURISDICTIONS);
  return supportedJurisdictions.includes(jurisdictionId);
}
