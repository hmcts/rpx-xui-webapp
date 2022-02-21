import {NextFunction, Response} from 'express';
import {handleGet} from '../../common/mockService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_API_URL} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import * as mock from './caseFlag.mock';
import {CaseFlagReferenceModel} from './models/caseFlagReference.model';

mock.init();

const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * getCaseFlagRefData
 */
export async function getCaseFlagRefData(req: EnhancedRequest, res: Response, next: NextFunction) {
  const markupPath: string = `${prdUrl}/caseflagrefdata`;
  try {
    const {status, data}: { status: number, data: CaseFlagReferenceModel[] } = await handleGet(markupPath, req);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
