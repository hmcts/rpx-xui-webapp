export const aatDifferences = {
  '(judge)|(judiciary)|(panelmember)': [],
  '(pui-case-manager)': [
    {
      roles: ['caseworker-civil', 'caseworker-civil-solictor', 'caseworker-befta_master-solicitor'],
      text: 'Notice of change',
    },
  ],
  '.+': [
    {
      roles: ['caseworker-befta_master'],
      text: 'Search',
    },
  ],
};
