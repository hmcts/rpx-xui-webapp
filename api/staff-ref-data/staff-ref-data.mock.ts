import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import { STAFF_REF_USERS_LIST } from './mock-data/staff-ref-users-list.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getFilteredUsers = /refdata\/case-worker\/profile/;
  const getUsersByPartialName = /refdata\/case-worker\/profile\/search/;
  const getStaffRefUserDetails = /refdata\/case-worker\/user-details\/[0-9]/;

  const getServices = /refdata\/case-worker\/service/;
  const getUserTypes = /refdata\/case-worker\/user-type/;
  const getJobTitles = /refdata\/case-worker\/job-title/;
  const getSkills = /refdata\/case-worker\/skill/;
  const getServices = /refdata\/case-worker\/services/;

  mock.onPost(getFilteredUsers).reply(() => {
    return [
      200,
      STAFF_REF_USERS_LIST,
    ];
  });

  mock.onGet(getUsersByPartialName).reply(config => {
    const searchParam = config.params.search.toLowerCase();
    const filteredUsers = STAFF_REF_USERS_LIST
      .filter(item => item.firstName.toLowerCase().includes(searchParam) || item.lastName.toLowerCase().includes(searchParam));

    return [
      200,
      {
        totalItems: STAFF_REF_USERS_LIST.length,
        results: filteredUsers,
      },
    ];
  });

  mock.onGet(getServices).reply(() => {
    return [
      200,
      [
        {label: 'Service 01', key: '01'},
        {label: 'Service 02', key: '02'},
        {label: 'Service 03', key: '03'},
      ],
    ];
  });

  mock.onGet(getUserTypes).reply(() => {
    return [
      200,
      [
        { key: 'userType', label: 'User Types'},
        { key: 'ctsc', label: 'CTSC' },
      ],
    ];
  });

  mock.onGet(getJobTitles).reply(() => {
    return [
      200,
      [
        { key: 'senior-legal-caseworker', label: 'Senior Legal Caseworker' },
        { key: 'legal-caseworker', label: 'Legal Caseworker' },
        { key: 'hearing-centre-team-leader', label: 'Hearing Centre Team Leader' },
        { key: 'hearing-centre-administrator', label: 'Hearing Centre Administrator' },
        { key: 'court-clerk', label: 'Court Clerk' },

      ],
    ];
  });

  mock.onGet(getSkills).reply(() => {
    return [
      200,
      [
        { key: 'scss-interloc-work', label: 'SCSS - Interloc work' },
        { key: 'reasonable-adjustment-process', label: 'SCSS - Reasonable Adjustment process' },
        { key: 'scss-using-optic', label: 'SCSS - Using Optic' },
      ],
    ];
  });

  mock.onGet(getServices).reply(() => {
    return [
      200,
      [
        { key: 'family-public-law', label: 'Family Public Law' },
        { key: 'family-private-law', label: 'Family Private Law' },
        { key: 'adoption', label: 'Adoption' },
        { key: 'employment-tribunals', label: 'Employment Tribunals' },
        { key: 'financial-remedy', label: 'Financial Remedy' },
      ],
    ];
  });

  mock.onGet(getStaffRefUserDetails).reply(config => {
    const url = config.url;
    const strId = url.match(/[0-9]/g);
    const id = parseInt(strId[0], 10);
    const filteredUser = STAFF_REF_USERS_LIST
      .filter(item => item.id === id);

    return [
      200,
      {
        results: filteredUser,
      },
    ];
  });
};
