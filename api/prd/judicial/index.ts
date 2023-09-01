import { NextFunction, Response } from 'express';
import { getConfigValue, showFeature } from '../../configuration';
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
    // Judicial User search API version to be used depends upon the config entry FEATURE_JRD_E_LINKS_V2_ENABLED's value
    const headers = getHeadersBasedOnJudicialUserApiVersion(req);
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
    // Judicial User search API version to be used depends upon the config entry FEATURE_JRD_E_LINKS_V2_ENABLED's value
    const headers = getHeadersBasedOnJudicialUserApiVersion(req);
    const { status, data }: { status: number, data: JudicialUserModel[] } = await http.post(markupPath, reqBody, { headers });
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}

function getHeadersBasedOnJudicialUserApiVersion(req: EnhancedRequest): any {
  // Set the request headers accept property based on the API version enabled
  req.headers.accept = showFeature(FEATURE_JRD_E_LINKS_V2_ENABLED)
    ? CONTENT_TYPE_V2
    : CONTENT_TYPE_V1;
  // Set the request headers content type property based on the API version enabled
  const headers = showFeature(FEATURE_JRD_E_LINKS_V2_ENABLED)
    ? setHeaders(req, CONTENT_TYPE_V2)
    : setHeaders(req, CONTENT_TYPE_V1);
  // Return the updated request headers
  return headers;
}
