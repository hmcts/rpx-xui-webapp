export const aatDifferences = {
  '(judge)|(judiciary)|(panelmember)': [
    {
      roles: ['caseworker-sscs-judge', 'caseworker-sscs-panelmember'],
      text: 'My work',
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
      roles: ['caseworker-befta_master', 'caseworker-probate'],
      text: 'Search',
    },
  ],
};
