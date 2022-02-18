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
 * @overview searchJudicialUserByPersonalCodes from personalCodes, i.e. 'p1000000,p1000001'
 * @description API sample: /api/prd/judicial/searchJudicialUserByPersonalCodes?personalCodes=p1000000,p1000001
 * @example personalCodes=p1000000 | p1000000,p1000001 - pass single personalCode or multiple personalCodes split with ','
 */
export async function searchJudicialUserByPersonalCodes(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const strPersonalCodes = req.query.personalCodes;
  const personalCodes: string[] = strPersonalCodes.split(',');
  const markupPath: string = `${prdUrl}/refdata/judicial/users`;
  const body = {personal_code: personalCodes};
  try {
    const {status, data}: { status: number, data: JudicialUserModel[] } = await handlePost(markupPath, body, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
