import {NextFunction, Response} from 'express';
import {handleGet} from '../../common/mockService';
import {getConfigValue} from '../../configuration';
import {SERVICES_PRD_API_URL} from '../../configuration/references';
import {EnhancedRequest} from '../../lib/models';
import * as mock from './lov.mock';
import {LovRefDataByCategoryModel, LovRefDataByServiceModel} from './models/lovRefData.model';

mock.init();

const prdUrl: string = getConfigValue(SERVICES_PRD_API_URL);

/**
 * getRefData from category and service ID
 */
export async function getLovRefData(req: EnhancedRequest, res: Response, next: NextFunction) {
  // @ts-ignore
  const { service, category, isChildRequired }  = req.query;
  const params = new URLSearchParams({service, isChildRequired});
  const markupPath: string = `${prdUrl}/refdata/commondata/lov/categories/${category}?${params}`;
  try {
    const {status, data}: { status: number, data: LovRefDataByCategoryModel[] } = await handleGet(markupPath, req);
    const refDataByCategory: LovRefDataByCategoryModel = data.find(refDataByCategoryModel =>
      refDataByCategoryModel.categoryKey === category);
    if (refDataByCategory && refDataByCategory.services) {
      const refDataByService: LovRefDataByServiceModel = refDataByCategory.services.find(aService =>
        aService.serviceID === service);
      if (refDataByService && refDataByService.values) {
        res.status(status).send(refDataByService.values);
      } else {
        res.status(status).send([]);
      }
    } else {
      res.status(status).send([]);
    }
  } catch (error) {
    next(error);
  }
}
