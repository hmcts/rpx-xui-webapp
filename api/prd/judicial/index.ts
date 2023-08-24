import { NextFunction, Response } from 'express';
import { handlePost } from '../../common/crudService';
import { getConfigValue } from '../../configuration';
import { FEATURE_JRD_E_LINKS_V2_ENABLED, SERVICES_PRD_JUDICIAL_API } from '../../configuration/references';
import { http } from '../../lib/http';
import { EnhancedRequest } from '../../lib/models';
import { setHeaders } from '../../lib/proxy';
import {
  JudicialUserModel,
  RawJudicialUserModel,
  transformToJudicialUserModel
} from './models/judicialUser.model';

const CONTENT_TYPE_V1 = 'application/json';
const CONTENT_TYPE_V2 = 'application/vnd.jrd.api+json;Version=2.0';
const prdUrl: string = getConfigValue(SERVICES_PRD_JUDICIAL_API);

/**
 * @overview searchJudicialUserByPersonalCodes from personalCodes, i.e. ['p1000000','p1000001']
 * @description API sample: POST /api/prd/judicial/searchJudicialUserByPersonalCodes
 * @example with body {personal_code: ['p1000000','p1000001']}
 */
export async function searchJudicialUserByPersonalCodes(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${prdUrl}/refdata/judicial/users`;
  try {
    const { status, data }: { status: number, data: RawJudicialUserModel[] } = await handlePost(markupPath, reqBody, req, next);
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
    console.log('FEATURE_JRD_E_LINKS_V2_ENABLED', getConfigValue(FEATURE_JRD_E_LINKS_V2_ENABLED));

    const headers = getConfigValue(FEATURE_JRD_E_LINKS_V2_ENABLED)
      ? setHeaders(req, CONTENT_TYPE_V1)
      : setHeaders(req, CONTENT_TYPE_V2);

    console.log('HEADERS', headers);

    const { status, data }: { status: number, data: JudicialUserModel[] } = await http.post(markupPath, reqBody, { headers });
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
