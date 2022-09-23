import MockAdapter from 'axios-mock-adapter';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import { STAFF_REF_USERS_LIST } from './mock-data/staff-ref-users-list.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getFilteredUsers = /refdata\/case-worker\/profile/;
  const getUsersByPartialName = /refdata\/case-worker\/profile\/search/;

  const getUserTypes = /refdata\/case-worker\/user-type/;
  const getJobTitles = /refdata\/case-worker\/job-title/;
  const getSkills = /refdata\/case-worker\/skill/;

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

  mock.onGet(getUserTypes).reply(() => {
    return [
      200,
      [{label: 'User Types', key: 'userType'}],
    ];
  });

  mock.onGet(getJobTitles).reply(() => {
    return [
      200,
      [{label: 'Job Titles', key: 'jobTitle'}],
    ];
  });

  mock.onGet(getSkills).reply(() => {
    return [
      200,
      [{label: 'Skills', key: 'skill'}],
    ];
  });
};
