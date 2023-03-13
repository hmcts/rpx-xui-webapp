import {NextFunction, Response} from 'express';
import {handlePost} from '../../common/crudService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_JUDICIAL_API} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import {
  JudicialUserModel,
  RawJudicialUserModel,
  transformToJudicialUserModel
} from './models/judicialUser.model';

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
    const {status, data}: { status: number, data: RawJudicialUserModel[] } = await handlePost(markupPath, reqBody, req, next);
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
    const {status, data}: { status: number, data: JudicialUserModel[] } = await handlePost(markupPath, reqBody, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
