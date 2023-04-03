export const staffFilterOptionsTestData = {
  userTypes: [
    {
      key: 'userType',
      label: 'User Types'
    },
    {
      key: 'ctsc',
      label: 'CTSC'
    }
  ],
  jobTitles: [
    {
      key: 'senior-legal-caseworker',
      label: 'Senior Legal Caseworker'
    },
    {
      key: 'legal-caseworker',
      label: 'Legal Caseworker'
    },
    {
      key: 'hearing-centre-team-leader',
      label: 'Hearing Centre Team Leader'
    },
    {
      key: 'hearing-centre-administrator',
      label: 'Hearing Centre Administrator'
    },
    {
      key: 'court-clerk',
      label: 'Court Clerk'
    }
  ],
  skills: [
    {
      group: 'adoption',
      options: [
        {
          key: 'adoption-underwriter',
          label: 'Underwriter',
          service: 'adoption',
          id: '1'
        },
        {
          key: 'adoption-caseworker',
          label: 'Caseworker',
          service: 'adoption',
          id: '2'
        }
      ]
    },
    {
      group: 'family-private-law',
      options: [
        {
          key: 'family-private-law-caseworker',
          label: 'Caseworker',
          service: 'family-private-law',
          id: '3'
        },
        {
          key: 'family-private-law-casemanager',
          label: 'Casemanager',
          service: 'family-private-law',
          id: '4'
        }
      ]
    },
    {
      group: 'family-public-law',
      options: [
        {
          key: 'family-public-law-underwriter',
          label: 'Underwriter',
          service: 'family-public-law',
          id: '5'
        }
      ]
    }
  ],
  services: [
    {
      key: 'family-public-law',
      label: 'Family Public Law'
    },
    {
      key: 'family-private-law',
      label: 'Family Private Law'
    },
    {
      key: 'adoption',
      label: 'Adoption'
    },
    {
      key: 'employment-tribunals',
      label: 'Employment Tribunals'
    },
    {
      key: 'financial-remedy',
      label: 'Financial Remedy'
    }
  ],
  regions: [
    {
      region_id: '1',
      description: 'Region 1'
    },
    {
      region_id: '2',
      description: 'Region 2',
    }
  ]
};
