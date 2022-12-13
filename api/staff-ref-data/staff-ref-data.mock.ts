import MockAdapter from 'axios-mock-adapter';
import * as _ from 'lodash';
import { HttpMockAdapter } from '../common/httpMockAdapter';
import { STAFF_REF_USERS_LIST } from './mock-data/staff-ref-users-list.mock.data';

export const init = () => {
  const mock: MockAdapter = HttpMockAdapter.getInstance();

  const getStaffRefUserDetails = /refdata\/case-worker\/user-details\/[0-9]/;
  const getUserTypes = /refdata\/case-worker\/user-type/;
  const getJobTitles = /refdata\/case-worker\/job-title/;
  const getSkills = /refdata\/case-worker\/skill/;
  const getServices = /refdata\/case-worker\/services/;

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
    const skills = [
      { key: 'adoption-underwriter', label: 'Underwriter', service: 'adoption', id: '1'},
      { key: 'adoption-caseworker', label: 'Caseworker', service: 'adoption', id: '2'},
      { key: 'family-private-law-caseworker', label: 'Caseworker', service: 'family-private-law', id: '3'},
      { key: 'family-private-law-casemanager', label: 'Casemanager', service: 'family-private-law', id: '4'},
      { key: 'family-public-law-underwriter', label: 'Underwriter', service: 'family-public-law', id: '5'},
    ];
    const services = _.uniq(_.map(skills, 'service'));
    const response = [];
    try {
      services.forEach(ser => {
        const filteredSkills = skills.filter(s => s.service === ser);
        if (filteredSkills) {
          const res = {
            group : ser,
            options : filteredSkills,
          }
          response.push(res);
        }
      })
    } catch (error) {
      console.log('error', error);
    }
    return [
      200,
      response,
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
