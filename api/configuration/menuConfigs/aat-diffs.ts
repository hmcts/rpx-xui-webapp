export const aatDifferences = {
  '(judge)|(judiciary)|(panelmember)': [
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
      roles: ['caseworker-befta_master', 'caseworker-probate', 'caseworker-divorce-financialremedy'],
      text: 'Search',
    },
  ],
};
