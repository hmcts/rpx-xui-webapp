export const CCD_COLLECTION_PERMISSION_SCENARIOS = [
  {
    displayContextParameter: null,
    addEnabled: false,
    removeEnabled: false,
  },
  {
    displayContextParameter: '#COLLECTION(allowInsert,allowDelete)',
    addEnabled: true,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#COLLECTION(allowInsert)',
    addEnabled: true,
    removeEnabled: false,
  },
  {
    displayContextParameter: '#COLLECTION(allowDelete)',
    addEnabled: false,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#TABLE(AddressLine1,AddressLine2),#COLLECTION(allowInsert,allowDelete)',
    addEnabled: true,
    removeEnabled: true,
  },
  {
    displayContextParameter: '#COLLECTION()',
    addEnabled: false,
    removeEnabled: false,
  },
] as const;

export const CCD_COLLECTION_FIELD_PERMISSIONS_PEOPLE_VALUE = [
  {
    id: 'ccd-collection-field-permissions-person',
    value: {
      Title: 'Ms',
      FirstName: 'Ada',
      LastName: 'Lovelace',
      PersonGender: 'female',
      PersonJob: {
        Title: 'Engineer',
        Description: 'Builds reliable tests',
      },
    },
  },
];
