import { asylumCase } from './asylumCaseBase.mock';

type CaseTabField = {
  id: string;
  label?: string;
  value?: any;
  formatted_value?: any;
  field_type?: any;
  [key: string]: any;
};

type CaseTab = {
  id: string;
  label: string;
  order?: number;
  fields: CaseTabField[];
  [key: string]: any;
};

export type CaseMockOverrides = {
  caseId?: string;
  caseTypeId?: string;
  jurisdictionId?: string;
  stateId?: string;
  stateName?: string;
  stateDescription?: string;
  appealReferenceNumber?: string;
  journeyType?: 'rep' | 'aip';
  submissionOutOfTime?: 'Yes' | 'No';
  caseManagementLocation?: { region: string; baseLocation: string };
  tabIds?: string[];
  tabs?: CaseTab[];
  tabOverrides?: Record<string, Partial<CaseTab>>;
  fieldOverrides?: Record<string, Partial<CaseTabField> & { tabId?: string }>;
  addFields?: Array<CaseTabField & { tabId?: string }>;
  triggers?: Array<{ id: string; name: string; description?: string | null; order?: number }>;
};

const applyTabAndFieldOverrides = (
  tabs: CaseTab[],
  tabOverrides?: Record<string, Partial<CaseTab>>,
  fieldOverrides?: Record<string, Partial<CaseTabField> & { tabId?: string }>,
  addFields?: Array<CaseTabField & { tabId?: string }>
): CaseTab[] => {
  const fieldAdds = addFields ?? [];
  return tabs.map((tab) => {
    const tabOverride = tabOverrides?.[tab.id];
    const fields = tab.fields.map((field) => {
      const override = fieldOverrides?.[field.id];
      if (!override) {
        return field;
      }
      if (override.tabId && override.tabId !== tab.id) {
        return field;
      }
      const { tabId, ...fieldOverride } = override;
      return { ...field, ...fieldOverride };
    });

    const extraFields = fieldAdds.filter((item) => (item.tabId ?? 'overview') === tab.id).map(({ tabId, ...field }) => field);

    return {
      ...tab,
      ...tabOverride,
      fields: [...fields, ...extraFields],
    };
  });
};

export function buildAsylumCaseMock(overrides: CaseMockOverrides = {}) {
  const base = asylumCase();
  const caseId = overrides.caseId ?? base.case_id;
  const caseTypeId = overrides.caseTypeId ?? base.case_type?.id ?? 'Asylum';
  const jurisdictionId = overrides.jurisdictionId ?? base.case_type?.jurisdiction?.id ?? 'IA';
  const stateId = overrides.stateId ?? base.state?.id;
  const stateName = overrides.stateName ?? base.state?.name;
  const stateDescription = overrides.stateDescription ?? base.state?.description;

  let tabs = overrides.tabs ?? base.tabs ?? [];
  if (overrides.tabIds && overrides.tabIds.length) {
    tabs = tabs.filter((tab) => overrides.tabIds?.includes(tab.id));
  }

  const derivedFieldOverrides: Record<string, Partial<CaseTabField> & { tabId?: string }> = {
    ...(overrides.fieldOverrides ?? {}),
  };

  if (overrides.appealReferenceNumber) {
    derivedFieldOverrides.appealReferenceNumber = {
      ...derivedFieldOverrides.appealReferenceNumber,
      value: overrides.appealReferenceNumber,
      formatted_value: overrides.appealReferenceNumber,
    };
  }

  if (overrides.journeyType) {
    derivedFieldOverrides.journeyType = {
      ...derivedFieldOverrides.journeyType,
      value: overrides.journeyType,
      formatted_value: overrides.journeyType,
    };
  }

  if (overrides.submissionOutOfTime) {
    derivedFieldOverrides.submissionOutOfTime = {
      ...derivedFieldOverrides.submissionOutOfTime,
      value: overrides.submissionOutOfTime,
      formatted_value: overrides.submissionOutOfTime,
    };
  }

  if (overrides.caseManagementLocation) {
    derivedFieldOverrides.caseManagementLocation = {
      ...derivedFieldOverrides.caseManagementLocation,
      value: overrides.caseManagementLocation,
      formatted_value: overrides.caseManagementLocation,
    };
  }

  const tabsWithOverrides = applyTabAndFieldOverrides(tabs, overrides.tabOverrides, derivedFieldOverrides, overrides.addFields);

  return {
    ...base,
    _links: { ...base._links, self: { href: `http://gateway-ccd.aat.platform.hmcts.net/internal/cases/${caseId}` } },
    case_id: caseId,
    case_type: {
      ...base.case_type,
      id: caseTypeId,
      jurisdiction: { ...base.case_type?.jurisdiction, id: jurisdictionId },
    },
    tabs: tabsWithOverrides,
    state: {
      ...base.state,
      id: stateId,
      name: stateName,
      description: stateDescription,
    },
    triggers: overrides.triggers ?? base.triggers ?? [],
  };
}
