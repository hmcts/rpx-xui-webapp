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
        {label: 'User Types', value: 'userType'},
        {label: 'CTSC', value: 'ctsc'},
      ],
    ];
  });

  mock.onGet(getJobTitles).reply(() => {
    return [
      200,
      [{label: 'Job Titles', value: 'jobTitle'}],
    ];
  });

  mock.onGet(getSkills).reply(() => {
    return [
      200,
      [{label: 'Skills', value: 'skill'}],
    ];
  });

  mock.onGet(getServices).reply(() => {
    return [
      200,
      [
        { id: 'family-public-law', label: 'Family Public Law', value: 'family-public-law' },
        { id: 'family-private-law', label: 'Family Private Law', value: 'family-private-law' },
        { id: 'adoption', label: 'Adoption', value: 'adoption' },
        { id: 'employment-tribunals', label: 'Employment Tribunals', value: 'employment-tribunals' },
        { id: 'financial-remedy', label: 'Financial Remedy', value: 'financial-remedy' },
        { id: 'immigration-and-asylum', label: 'Immigration and Asylum', value: 'immigration-and-asylum' },
        { id: 'civil', label: 'Civil', value: 'civil' },
        { id: 'special-tribunals', label: 'Special Tribunals', value: 'special-tribunals' },
        { id: 'divorce', label: 'Divorce', value: 'divorce' },
        { id: 'social-security-and-child-support', label: 'Social security and child support',
          value: 'social-security-and-child-support' },
        { id: 'housing-possessions', label: 'Housing Possessions', value: 'housing-possessions' },
        { id: 'probate', label: 'Probate', value: 'probate' },
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
