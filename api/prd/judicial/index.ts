import { NextFunction, Response } from 'express';
import { handlePost } from '../../common/crudService';
import { getConfigValue } from '../../configuration';
import { SERVICES_PRD_JUDICIAL_API } from '../../configuration/references';
import { EnhancedRequest } from '../../lib/models';
import {
  JudicialUserModel,
  RawJudicialUserModel,
  transformToJudicialUserModel
} from './models/judicialUser.model';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';

const prdUrl: string = getConfigValue(SERVICES_PRD_JUDICIAL_API);
const ENABLE_JRD_E_LINKS_API_V2 = 'enable-jrd-e-links-api-v2';

/**
 * @overview searchJudicialUserByPersonalCodes from personalCodes, i.e. ['p1000000','p1000001']
 * @description API sample: POST /api/prd/judicial/searchJudicialUserByPersonalCodes
 * @example with body {personal_code: ['p1000000','p1000001']}
 */
export async function searchJudicialUserByPersonalCodes(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${prdUrl}/refdata/judicial/users`;
  try {
    const featureToggleService = new FeatureToggleService();
    const isV2FeatureEnabled = await featureToggleService.getValue(ENABLE_JRD_E_LINKS_API_V2, false);
    const response = await handlePost(markupPath, reqBody, req, next);
    const data = isV2FeatureEnabled
      ? response.data as JudicialUserModel[]
      : (response.data as RawJudicialUserModel[]).map(transformToJudicialUserModel);
    res.status(response.status).send(data);
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
    const { status, data }: { status: number, data: JudicialUserModel[] } = await handlePost(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
