export const aatDifferences = {
  '(judge)|(judiciary)|(panelmember)': [
    {
      roles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember', 'caseworker-divorce-financialremedy-judiciary'],
      text: 'My work',
    },
    {
      roles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember', 'caseworker-divorce-financialremedy-judiciary'],
      text: 'Search',
    },
  ],
  '(pui-case-manager)': [
    {
      roles: ['caseworker-civil', 'caseworker-civil-solictor', 'caseworker-befta_master-solicitor'],
      text: 'Notice of change',
    },
  ],
  '.+': [
    {
      roles: ['caseworker-sscs-clerk', 'caseworker-sscs-registrar', 'caseworker-divorce-financialremedy'],
      text: 'My work',
    },
    {
      roles: ['caseworker-sscs-clerk', 'caseworker-sscs-registrar', 'caseworker-probate', 'caseworker-divorce-financialremedy'],
      text: 'Search',
    },
  ],
};
