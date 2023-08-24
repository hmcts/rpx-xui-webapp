import { FeatureUser, LaunchDarklyService } from '@hmcts/rpx-xui-common-lib';
import { NextFunction, Response } from 'express';
import { getConfigValue } from '../../configuration';
import { LAUNCH_DARKLY_CLIENT_ID, SERVICES_PRD_JUDICIAL_API } from '../../configuration/references';
import { http } from '../../lib/http';
import { EnhancedRequest } from '../../lib/models';
import {
  JudicialUserModel,
  RawJudicialUserModel,
  transformToJudicialUserModel
} from './models/judicialUser.model';
import { setHeaders } from '../../lib/proxy';
import * as LaunchDarkly from '@launchdarkly/node-server-sdk';

const ENABLE_JRD_E_LINKS_API_V2 = 'enable-jrd-e-links-api-v2';
const CONTENT_TYPE_V1 = 'application/json';
const CONTENT_TYPE_V2 = 'application/vnd.jrd.api+json;Version=2.0';
const prdUrl: string = getConfigValue(SERVICES_PRD_JUDICIAL_API);
const launchDarklyKey = getConfigValue(LAUNCH_DARKLY_CLIENT_ID);
let ldClient: LaunchDarkly.LDClient;

/**
 * @overview searchJudicialUserByPersonalCodes from personalCodes, i.e. ['p1000000','p1000001']
 * @description API sample: POST /api/prd/judicial/searchJudicialUserByPersonalCodes
 * @example with body {personal_code: ['p1000000','p1000001']}
 */
export async function searchJudicialUserByPersonalCodes(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${prdUrl}/refdata/judicial/users`;
  try {
    //const headers = getPrdJudicialUsersAPIHeader();
    const headers = setHeaders(req);
    const { status, data }: { status: number, data: RawJudicialUserModel[] } = await http.post(markupPath, reqBody, { headers });
    const result = data.map(transformToJudicialUserModel);
    res.status(status).send(result);
  } catch (error) {
    next(error);
  }
}

/**
 * @overview getJudicialUsersSearch from searchString, i.e. jam
 * @description API sample: POST /api/prd/judicial/users/search
 * @example with body {searchString: jam}
 */
export async function getJudicialUsersSearch(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${prdUrl}/refdata/judicial/users/search`;
  try {
    // const headers = getPrdJudicialUsersAPIHeader();
    // req.session.passport.user.userinfo
    const userInfo = req.session.passport.user.userinfo;
    console.log('USER INFO FROM SESSION', userInfo);
    // console.log(req.session.passport.user);
    // console.log(req.session.passport);
    // console.log(req.session);
    console.log('LAUNCH DARKLY KEY', launchDarklyKey);

    const featureUser: FeatureUser = {
      key: userInfo.id || userInfo.uid,
      custom: {
        roles: userInfo.roles,
        orgId: '-1'
      }
    };

    const flagValue = getFlagValue(ENABLE_JRD_E_LINKS_API_V2, null);

    console.log('FLAG VALUE', flagValue);

    // const featureToggleService = new LaunchDarklyService();
    // featureToggleService.initialize(featureUser, launchDarklyKey);
    // const isV2FeatureEnabled = await featureToggleService.isEnabled(ENABLE_JRD_E_LINKS_API_V2);
    // console.log('IS V2 FEATURE ENABLED', isV2FeatureEnabled);
    // const headers = isV2FeatureEnabled
    //   ? CONTENT_TYPE_V2
    //   : CONTENT_TYPE_V1;
    // console.log('HEADERS', headers);
    const headers = setHeaders(req, CONTENT_TYPE_V1);
    console.log('HEADERS', headers);
    const { status, data }: { status: number, data: JudicialUserModel[] } = await http.post(markupPath, reqBody, { headers });
    console.log('DATA', data);
    res.status(status).send(data);
  } catch (error) {
    console.log('ERROR', error);
    next(error);
  }
}

async function getClient(): Promise<LaunchDarkly.LDClient> {
  const client = LaunchDarkly.init(launchDarklyKey);
  await client.waitForInitialization();
  return client;
}

async function getFlagValue(key: string, user: LaunchDarkly.LDUser | null, defaultValue: any = false): Promise<LaunchDarkly.LDFlagValue> {
  if (!ldClient) {
    ldClient = await getClient();
  }
  if (!user) {
    user = {
      key: 'anonymous'
    };
  }
  const flagValue = await ldClient.variation(key, user, defaultValue);
  return flagValue;
}

// export async function getPrdJudicialUsersAPIHeader(): Promise<string> {
//   const featureToggleService = new FeatureToggleService();
//   const isV2FeatureEnabled = await featureToggleService.getValue(ENABLE_JRD_E_LINKS_API_V2, false);
//   console.log('IS V2 FEATURE ENABLED', isV2FeatureEnabled);
//   const headers = isV2FeatureEnabled
//     ? CONTENT_TYPE_V2
//     : CONTENT_TYPE_V1;
//   console.log('HEADERS', headers);
//   return headers;
// }
