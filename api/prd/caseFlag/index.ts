import {NextFunction, Response} from 'express';
import {handleGet} from '../../common/crudService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_COMMONDATA_API} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import {CaseFlagReferenceModel} from './models/caseFlagReference.model';

const prdUrl: string = getConfigValue(SERVICES_PRD_COMMONDATA_API);

/**
 * getCaseFlagRefData
 */
export async function getCaseFlagRefData(req: EnhancedRequest, res: Response, next: NextFunction) {
  const serviceId = req.query.serviceId;
  const markupPath: string = `${prdUrl}/refdata/commondata/caseflags/service-id=${serviceId}`;
  try {
    const {status, data}: { status: number, data: CaseFlagReferenceModel[] } = await handleGet(markupPath, req, next);
    res.status(status).send(data);
  } catch (error) {
    next(error);
  }
}
