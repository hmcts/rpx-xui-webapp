import { Response } from 'express';
import { sendGet } from '../../common/crudService';
import { getConfigValue } from '../../configuration';
import { SERVICES_PRD_COMMONDATA_API } from '../../configuration/references';
import { EnhancedRequest } from '../../lib/models';
import { ALL_REF_DATA } from "./data/lov.mock.data";
import { LovRefDataByServiceModel, LovRefDataModel } from './models/lovRefData.model';

const prdUrl: string = getConfigValue(SERVICES_PRD_COMMONDATA_API);

/**
 * getRefData from category and service ID
 */
export async function getLovRefData(req: EnhancedRequest, res: Response) {
  // @ts-ignore
  const { service, category, isChildRequired } = req.query;
  const params = new URLSearchParams({ service, isChildRequired });
  const markupPath: string = `${prdUrl}/refdata/commondata/lov/categories/${category}?${params}`;
  try {
    const {status, data}: { status: number, data: LovRefDataByServiceModel } = await sendGet(markupPath, req);
    res.status(status).send(data.list_of_values);
  } catch (error) {
    // in order to not break the hearing journey, if the LoV is not defined from RD we will use the ExUI default value set.
    const exuiDefaultData = getLovFromExUI(category);
    res.status(200).send(exuiDefaultData);
  }
}

function getLovFromExUI(category): LovRefDataModel[] {
  const foundDataWithCategory = ALL_REF_DATA.find(lovRefDataByCategoryModel =>
    lovRefDataByCategoryModel.categoryKey === category);
  let exuiDefaultData: LovRefDataModel[];
  if (foundDataWithCategory && foundDataWithCategory.lovDataModel) {
    exuiDefaultData = foundDataWithCategory.lovDataModel.list_of_values;
  }
  return exuiDefaultData;
}
