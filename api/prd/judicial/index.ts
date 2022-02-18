import {NextFunction, Response} from 'express';
import {handlePost} from '../../common/mockService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_API_URL} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import * as mock from './judicial.mock';
import {JudicialUserModel} from './models/judicialUser.model';

mock.init();

const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * @overview searchJudicialUserByPersonalCodes from personalCodes, i.e. ['p1000000','p1000001']
 * @description API sample: POST /api/prd/judicial/searchJudicialUserByPersonalCodes
 * @example with body {personal_code: ['p1000000','p1000001']}
 */
export async function searchJudicialUserByPersonalCodes(req: EnhancedRequest, res: Response, next: NextFunction) {
  const reqBody = req.body;
  const markupPath: string = `${prdUrl}/refdata/judicial/users`;
  try {
    const {status, data}: { status: number, data: JudicialUserModel[] } = await handlePost(markupPath, reqBody, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
