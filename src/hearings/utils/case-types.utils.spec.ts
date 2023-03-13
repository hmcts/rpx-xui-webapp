import {caseTypeRefData} from '../hearing.test.data';
import {CaseCategoryDisplayModel} from '../models/caseCategory.model';
import {CategoryType} from '../models/hearings.enum';
import {CaseTypesUtils} from './case-types.utils';

describe('CaseTypesUtils', () => {
  const caseCatgories = [
    {
      categoryType: CategoryType.CaseType,
      categoryValue: 'BBA3-002',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'BBA3-002CC',
      categoryParent: 'BBA3-002',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'BBA3-002GC',
      categoryParent: 'BBA3-002',
    }, {
      categoryType: CategoryType.CaseSubType,
      categoryValue: 'BBA3-002RC',
      categoryParent: 'BBA3-002',
    },
  ];
  it('should generateCaseTypesRefDataMap', () => {
    const caseTypesRefDataMap = CaseTypesUtils.generateCaseTypesRefDataMap(caseTypeRefData);
    expect(caseTypesRefDataMap['BBA3-002']).toBe('PERSONAL INDEPENDENT PAYMENT (NEW CLAIM)');
    expect(caseTypesRefDataMap['BBA3-002CP']).toBe('CIVIL PENALTIES');
  });

  it('should getCaseCategoryDisplayModels', () => {
    const caseCategoryDisplayModels: CaseCategoryDisplayModel[] = CaseTypesUtils.getCaseCategoryDisplayModels(caseTypeRefData, caseCatgories);
    expect(caseCategoryDisplayModels.length).toBe(1);
    expect(caseCategoryDisplayModels[0].categoryDisplayValue).toBe('PERSONAL INDEPENDENT PAYMENT (NEW CLAIM)');
    expect(caseCategoryDisplayModels[0].childNodes.length).toBe(3);
    expect(caseCategoryDisplayModels[0].childNodes[0].categoryDisplayValue).toBe('CONDITIONS OF ENTITLEMENT - COMPLEX');
    expect(caseCategoryDisplayModels[0].childNodes[1].categoryDisplayValue).toBe('GOOD CAUSE');
    expect(caseCategoryDisplayModels[0].childNodes[2].categoryDisplayValue).toBe('RATE OF ASSESSMENT/PAYABILITY ISSUES - COMPLEX');
  });
});
