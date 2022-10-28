import { NextFunction, Response } from 'express';
import { sendGet } from '../../common/crudService';
import { getConfigValue } from '../../configuration';
import { SERVICES_PRD_COMMONDATA_API } from '../../configuration/references';
import { EnhancedRequest } from '../../lib/models';
import { LovRefDataByServiceModel } from './models/lovRefData.model';

const prdUrl: string = getConfigValue(SERVICES_PRD_COMMONDATA_API);

/**
 * getRefData from category and service ID
 */
export async function getLovRefData(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const { serviceId, categoryId, isChildRequired } = req.query;
  const params = new URLSearchParams({ serviceId, isChildRequired });
  const markupPath: string = `${prdUrl}/refdata/commondata/lov/categories/${categoryId}?${params}`;

  try {
    const {status, data}: { status: number, data: LovRefDataByServiceModel } = await sendGet(markupPath, req);
    res.status(status).send(data.list_of_values);
  } catch (error) {
    next(error);
  }
}
