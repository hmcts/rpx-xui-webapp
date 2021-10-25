import * as chai from 'chai';
import { expect } from 'chai';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import {mockReq, mockRes} from 'sinon-express-mock';
import { http } from '../lib/http';
import { RoleCategory } from '../roleAccess/models/allocate-role.enum';

import { RoleCategory } from '../roleAccess/models/allocate-role.enum';
import { RoleAssignment } from '../user/interfaces/roleAssignment';
import { ASSIGN, CLAIM, CLAIM_AND_GO, COMPLETE, GO, REASSIGN, RELEASE, TaskPermission } from './constants/actions';
import { Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/common';
import { PersonRole } from './interfaces/person';
import { RoleCaseData } from './interfaces/roleCaseData';
import {
  applySearchFilter,
  assignActionsToTasks,
  constructElasticSearchQuery,
  constructRoleAssignmentCaseAllocatorQuery, constructRoleAssignmentQuery,
  getActionsByPermissions, getCaseAllocatorLocations,
  getCaseIdListFromRoles,
  getRoleAssignmentsByQuery,
  getSubstantiveRoles,
  mapCasesFromData,
  mapCaseworkerData,
  mapCaseworkerPrimaryLocation,
  mapRoleType,
  prepareGetTaskUrl,
  preparePaginationUrl,
  preparePostTaskUrlAction,
  prepareSearchTaskUrl
} from './util';

chai.use(sinonChai);

const firstRoleAssignment: RoleAssignment[] = [{
  id: '1',
  attributes: {
    caseId: '4',
  },
},
  {
    id: '2',
    attributes: {
      region: 'Birm',
    },
  },
  {
    id: '3',
    attributes: {
      caseId: '2',
    },
  },
  {
    id: '4',
    attributes: {
      caseId: '5',
    },
  }];
const secondRoleAssignment: RoleAssignment[] = [{
  id: '1',
  attributes: {
    caseId: '4',
  },
},
  {
    id: '2',
    attributes: {
      region: '2',
    },
  },
  {
    id: '3',
    attributes: {
      caseId: '2',
    },
  },
  {
    id: '4',
    attributes: {
      caseId: '5',
    },
  }];

const myTasks = [
  {
    id: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba1',
    assignee: '49db7670-09b3-49e3-b945-b98f4e5e9a99',
    task_title: 'Review FTPA application',
    dueDate: '2021-05-05T16:00:00.000+0000',
    location_name: 'Birmingham',
    location_id: '231596',
    case_id: '1620409659381330',
    case_category: 'EEA',
    case_name: 'James Priest',
    permissions: ['Read', 'Manage'],
  },
  {
    id: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba2',
    assignee: '49db7670-09b3-49e3-b945-b98f4e5e9a99',
    task_title: 'Review application decision',
    dueDate: '2021-05-12T16:00:00.000+0000',
    location_name: 'Glasgow',
    location_id: '366559',
    case_id: '1620409659381330',
    case_category: 'Protection',
    case_name: 'Ella Ryan',
    permissions: ['Execute', 'Manage'],
  },
  {
    id: '0d22d836-b25a-11eb-a18c-f2d58a9b7ba3',
    assignee: '49db7670-09b3-49e3-b945-b98f4e5e9a99',
    task_title: 'Generate decision and reason',
    dueDate: '2021-05-18T16:00:00.000+0000',
    location_name: 'Manchester',
    location_id: '512401',
    case_id: '1620409659381330',
    case_category: 'refusalOfHumanRights',
    case_name: 'Jo Jackson',
    permissions: ['Read'],
  },
];

const availableTasks = [
  {
    assignee: null,
    assigneeName: null,
    id: '0d22d838-b25a-11eb-a18c-f2d58a9b7bc1',
    task_title: 'Review FTPA application',
    dueDate: '2021-05-05T16:00:00.000+0000',
    location_name: 'Birmingham',
    location_id: '231596',
    case_id: '1620409659381330',
    case_category: 'EEA',
    case_name: 'William Priest',
    warnings: true,
    permissions: ['Read', 'Manage'],
  },
  {
    assignee: null,
    assigneeName: null,
    id: '0d22d838-b25a-11eb-a18c-f2d58a9b7bc2',
    task_title: 'Review application decision',
    dueDate: '2021-05-12T16:00:00.000+0000',
    location_name: 'Glasgow',
    location_id: '366559',
    case_id: '1620409659381330',
    case_category: 'Protection',
    case_name: 'Jo Fly',
    permissions: ['Read', 'Manage', 'Execute'],
  },
  {
    assignee: null,
    assigneeName: null,
    id: '0d22d838-b25a-11eb-a18c-f2d58a9b7bc3',
    task_title: 'Generate decision and reason',
    dueDate: '2021-05-18T16:00:00.000+0000',
    location_name: 'Manchester',
    location_id: '512401',
    case_id: '1620409659381330',
    case_category: 'refusalOfHumanRights',
    case_name: 'Francis Gigs',
    permissions: ['Execute'],
  },
];

describe('workAllocation.utils', () => {

  describe('prepareGetTaskUrl', () => {

    it('should correctly format with a baseUrl and taskId', () => {
      const BASE_URL: string = 'base';
      const TASK_ID: string = '123456';
      const url = prepareGetTaskUrl(BASE_URL, TASK_ID);
      expect(url).to.equal('base/task/123456');
    });

  });

  describe('preparePostTaskUrlAction', () => {

    it('should correctly format with a baseUrl, taskId, and action', () => {
      const BASE_URL: string = 'base';
      const TASK_ID: string = '123456';
      const ACTION: string = 'fixit';
      const url = preparePostTaskUrlAction(BASE_URL, TASK_ID, ACTION);
      expect(url).to.equal('base/task/123456/fixit');
    });

  });

  describe('prepareSearchTaskUrl', () => {

    it('should correctly format with a baseUrl', () => {
      const BASE_URL: string = 'base';
      const url = prepareSearchTaskUrl(BASE_URL);
      expect(url).to.equal('base/task');
    });

  });

  describe('preparePaginationUrl', () => {

    it('should correctly format without a request body, searchRequest or pagination parameters', () => {
      const BASE_URL: string = 'base';
      const url = prepareSearchTaskUrl(BASE_URL);
      let req = mockReq({
        body: null,
      });
      expect(preparePaginationUrl(req, url)).to.equal(url);
      req = req = mockReq({
        body: {
          searchRequest: null,
          view: 'view',
        },
        session: {
          caseworkers: null,
        },
      });
      expect(preparePaginationUrl(req, url)).to.equal(url);
      req = req = mockReq({
        body: {
          searchRequest: {pagination_parameters: null},
          view: 'view',
        },
        session: {
          caseworkers: null,
        },
      });
      expect(preparePaginationUrl(req, url)).to.equal(url);
      req = req = mockReq({
        body: {
          searchRequest: {
            pagination_parameters: {
              page_number: 3,
              page_size: 25,
            },
          },
          view: 'view',
        },
        session: {
          caseworkers: null,
        },
      });
      let expectedReturnedUrl = url.concat('?first_result=50&max_results=25');
      expect(preparePaginationUrl(req, url)).to.equal(expectedReturnedUrl);
      req = req = mockReq({
        body: {
          searchRequest: {
            pagination_parameters: {
              page_number: 11,
              page_size: 3,
            },
          },
          view: 'view',
        },
        session: {
          caseworkers: null,
        },
      });
      expectedReturnedUrl = url.concat('?first_result=30&max_results=3');
      expect(preparePaginationUrl(req, url)).to.equal(expectedReturnedUrl);
    });

  });

  describe('assignActionsToTasks', () => {

    it('should assign actions to tasks', () => {
      const tasksWithActions = assignActionsToTasks(myTasks, 'MyTasks', '');
      expect(tasksWithActions[0].actions[0]).to.be.equal(GO);
      expect(tasksWithActions[0].actions[1]).to.be.equal(REASSIGN);
      expect(tasksWithActions[0].actions[2]).to.be.equal(RELEASE);

      const tasksWithActionsAllWorkAssigned = assignActionsToTasks(myTasks, 'AllWork', '');
      expect(tasksWithActionsAllWorkAssigned[0].actions[0]).to.be.equal(GO);
      expect(tasksWithActionsAllWorkAssigned[0].actions[1]).to.be.equal(REASSIGN);
      expect(tasksWithActionsAllWorkAssigned[0].actions[2]).to.be.equal(RELEASE);

      const tasksWithActionsAllWorkUnassigned = assignActionsToTasks(availableTasks, 'AllWork', '');
      expect(tasksWithActionsAllWorkUnassigned[0].actions[0]).to.be.equal(ASSIGN);
      expect(tasksWithActionsAllWorkUnassigned[0].actions[1]).to.be.equal(GO);

      const tasksWithActionsActiveTasksAssignedCurrentUser = assignActionsToTasks(
        myTasks, 'ActiveTasks', '49db7670-09b3-49e3-b945-b98f4e5e9a99');
      expect(tasksWithActionsActiveTasksAssignedCurrentUser[1].actions[0]).to.be.equal(CLAIM);
      expect(tasksWithActionsActiveTasksAssignedCurrentUser[1].actions[1]).to.be.equal(REASSIGN);
      expect(tasksWithActionsActiveTasksAssignedCurrentUser[1].actions[2]).to.be.equal(RELEASE);

      const tasksWithActionsActiveTasksUnassigned = assignActionsToTasks(availableTasks, 'ActiveTasks', 'Not the current user');
      expect(tasksWithActionsActiveTasksUnassigned[1].actions[0]).to.be.equal(CLAIM);
    });
  });

  describe('mapCaseworkerData', () => {

    const LOCATIONAPI_1: LocationApi = {
      is_primary: true,
      location: 'Test One',
      location_id: '1',
      services: ['a', 'b'],
    };
    const LOCATIONAPI_2: LocationApi = {
      is_primary: false,
      location: 'Test Two',
      location_id: '2',
      services: ['a', 'c'],
    };
    const LOCATIONAPI_3: LocationApi = {
      is_primary: true,
      location: 'Test Three',
      location_id: '3',
      services: ['b', 'c'],
    };

    const LOCATION_1: Location = {
      id: '1',
      locationName: 'Test One',
      services: ['a', 'b'],
    };
    const LOCATION_2: Location = {
      id: '3',
      locationName: 'Test Three',
      services: ['b', 'c'],
    };
    const CASEWORKERAPI_1: CaseworkerApi = {
      base_location: [LOCATIONAPI_1, LOCATIONAPI_2],
      email_id: 'nametest@test.com',
      first_name: 'Name',
      id: '1',
      last_name: 'Test',
    };
    const CASEWORKERAPI_2: CaseworkerApi = {
      base_location: [LOCATIONAPI_2, LOCATIONAPI_3],
      email_id: 'firstlast@test.com',
      first_name: 'First',
      id: '2',
      last_name: 'Last',
    };
    const CASEWORKERAPI_3: CaseworkerApi = {
      base_location: [LOCATIONAPI_1, LOCATIONAPI_3],
      email_id: 'onetwo@test.com',
      first_name: 'One',
      id: '3',
      last_name: 'Two',
    };
    const CASEWORKERAPI_4: CaseworkerApi = {
      base_location: [],
      email_id: 'fourthtest@test.com',
      first_name: 'Fourth',
      id: '4',
      last_name: 'Test',
    };
    const CASEWORKER_1: Caseworker = {
      email: 'nametest@test.com',
      firstName: 'Name',
      idamId: '1',
      lastName: 'Test',
      location: LOCATION_1,
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
    };
    const CASEWORKER_2: Caseworker = {
      email: 'firstlast@test.com',
      firstName: 'First',
      idamId: '2',
      lastName: 'Last',
      location: LOCATION_2,
      roleCategory: RoleCategory.ADMIN,
    };
    const CASEWORKER_3: Caseworker = {
      email: 'onetwo@test.com',
      firstName: 'One',
      idamId: '3',
      lastName: 'Two',
      location: LOCATION_2,
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
    };
    const CASEWORKER_4: Caseworker = {
      email: 'fourthtest@test.com',
      firstName: 'Fourth',
      idamId: '4',
      lastName: 'Test',
      location: null,
      roleCategory: null,
    };

    const mockRoleAssignments: RoleAssignment[] = [
      {
        id: '123',
        attributes: null,
        actorId: '1',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
      },
      {
        id: '123',
        attributes: null,
        actorId: '2',
        roleCategory: RoleCategory.ADMIN,
      },
      {
        id: '123',
        attributes: null,
        actorId: '3',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
      },
      {
        id: '123',
        attributes: null,
        actorId: '5',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
      },
    ];

    it('should map the primary location correctly', () => {
      // check function seals with no locations
      expect(mapCaseworkerPrimaryLocation(undefined)).to.equal(null);

      // check function deals correctly with example locations
      expect(mapCaseworkerPrimaryLocation([LOCATIONAPI_1, LOCATIONAPI_2])).to.deep.equal(LOCATION_1);
      expect(mapCaseworkerPrimaryLocation([LOCATIONAPI_2, LOCATIONAPI_3])).to.deep.equal(LOCATION_2);

      // for two primary locations, should return last one
      expect(mapCaseworkerPrimaryLocation([LOCATIONAPI_1, LOCATIONAPI_3])).to.deep.equal(LOCATION_2);
      expect(mapCaseworkerPrimaryLocation([LOCATIONAPI_3, LOCATIONAPI_1])).to.deep.equal(LOCATION_1);

      // if no primary location, return null
      expect(mapCaseworkerPrimaryLocation([LOCATIONAPI_2])).to.deep.equal(null);

    });

    it('should map the caseworkers correctly', () => {
      // ensure null values are passed through with no issues
      expect(mapCaseworkerData(null, mockRoleAssignments)).to.deep.equal([]);

      // this will ensure that the mapping of caseworker data is correct
      expect(mapCaseworkerData([CASEWORKERAPI_1, CASEWORKERAPI_2, CASEWORKERAPI_3, CASEWORKERAPI_4], mockRoleAssignments))
        .to.deep.equal([CASEWORKER_1, CASEWORKER_2, CASEWORKER_3, CASEWORKER_4]);
    });
  });

  describe('getActionsByPermissions', () => {

    it('should get correct actions for my tasks for certain permissions', () => {
      expect(getActionsByPermissions('MyTasks', [TaskPermission.CANCEL, TaskPermission.MANAGE]))
        .to.deep.equal([GO, REASSIGN, RELEASE]);
      expect(getActionsByPermissions('MyTasks', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('MyTasks', [TaskPermission.MANAGE, TaskPermission.CANCEL]))
        .to.deep.equal([GO, REASSIGN, RELEASE]);
    });

    it('should get correct actions for available tasks for certain permissions', () => {
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.CANCEL, TaskPermission.MANAGE]))
        .to.deep.equal([CLAIM, CLAIM_AND_GO]);
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.MANAGE, TaskPermission.CANCEL]))
        .to.deep.equal([CLAIM, CLAIM_AND_GO]);
    });

    it('should get correct actions for all work tasks for certain permissions', () => {
      expect(getActionsByPermissions('AllWorkAssigned', [TaskPermission.MANAGE])).to.deep.equal([GO, REASSIGN, RELEASE]);
      expect(getActionsByPermissions('AllWorkAssigned', [TaskPermission.EXECUTE])).to.deep.equal([COMPLETE]);
      expect(getActionsByPermissions('AllWorkUnassigned', [TaskPermission.MANAGE, TaskPermission.EXECUTE]))
        .to.deep.equal([ASSIGN, COMPLETE, GO]);
    });

    it('should get correct actions for active tasks for certain permissions', () => {
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [TaskPermission.MANAGE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [
        TaskPermission.MANAGE, TaskPermission.EXECUTE])).to.deep.equal([CLAIM, REASSIGN, RELEASE]);
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [
        TaskPermission.MANAGE, TaskPermission.EXECUTE, TaskPermission.OWN,
      ])).to.deep.equal([CLAIM, REASSIGN, RELEASE]);

      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [TaskPermission.MANAGE])).to.deep.equal([REASSIGN, RELEASE]);
      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [
        TaskPermission.MANAGE, TaskPermission.EXECUTE])).to.deep.equal([CLAIM, REASSIGN, RELEASE,
      ]);

      expect(getActionsByPermissions('ActiveTasksUnassigned', [TaskPermission.MANAGE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksUnassigned', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksUnassigned', [
        TaskPermission.MANAGE, TaskPermission.EXECUTE,
      ])).to.deep.equal([CLAIM]);
    });

  });

  describe('applySearchFilter', () => {
    it('PersonRole BOTH', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER};
      const result = applySearchFilter(person, PersonRole.ALL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole CASEWORKER', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER};
      const result = applySearchFilter(person, PersonRole.CASEWORKER, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole JUDICIAL', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.JUDICIAL};
      const result = applySearchFilter(person, PersonRole.JUDICIAL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole CASEWORKER no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.JUDICIAL};
      const result = applySearchFilter(person, PersonRole.CASEWORKER, 'name');
      expect(result).to.equal(false);
    });
    it('PersonRole JUDICIAL no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER};
      const result = applySearchFilter(person, PersonRole.JUDICIAL, 'name');
      expect(result).to.equal(false);
    });
  });

  describe('getCaseIdListFromRoles', () => {
    const expectedCaseList = ['4', '2', '5'];
    it('should return empty list if there is nothing given', () => {
      expect(getCaseIdListFromRoles(null)).to.deep.equal([]);
    });
    it('should return correct list of case ids', () => {
      expect(getCaseIdListFromRoles(firstRoleAssignment)).to.deep.equal(expectedCaseList);
    });
    it('should avoid duplicating case ids', () => {
      expect(getCaseIdListFromRoles(secondRoleAssignment)).to.deep.equal(expectedCaseList);
    });
  });

  describe('constructElasticSearchQuery', () => {

    it('should create a query with at least three case ids', () => {
      const caseIds = [1589185982594513, 1589185060514243, 1589185060514243];
      const result = constructElasticSearchQuery(caseIds, 0, 1000);
      expect(result.native_es_query.query.terms).to.deep.equal({reference: caseIds});
    });

    it('should create a query with no case ids', () => {
      const caseIds = [];
      const result = constructElasticSearchQuery(caseIds, 0, 1000);
      expect(result.native_es_query.query.terms).to.deep.equal({reference: caseIds});
    });
  });

  describe('mapCasesFromData', () => {
    const paginationConfig = {
      page_number: 1,
      page_size: 2,
    };
    // note not making it a case as would have to fill in multiple unneccessary properties
    const mockCaseData: any[] = [
      {
        id: '123',
        type: 'example',
        case_type_id: 'Asylum',
        jurisdiction: 'IA',
      },
      {
        id: '456',
        type: 'example2',
        case_type_id: 'Test',
        jurisdiction: 'IA',
      },
    ];
    const mockRoleAssignment: RoleAssignment[] = [{
      id: '1',
      actorId: 'person1',
      roleName: 'example-role',
      endTime: new Date('01-01-2022'),
      beginTime: new Date('01-01-2021'),
      attributes: {
        caseId: '123',
        primaryLocation: '001',
      },
    },
      {
        id: '2',
        actorId: 'person1',
        roleName: 'example-role',
        endTime: new Date('01-01-2022'),
        beginTime: new Date('01-01-2021'),
        attributes: {
          primaryLocation: '001',
        },
      },
      {
        id: '3',
        actorId: 'person1',
        roleName: 'example-role-2',
        endTime: new Date('01-01-2022'),
        beginTime: new Date('01-01-2021'),
        attributes: {
          caseId: '456',
          primaryLocation: '001',
        },
      },
    ];
    const expectedRoleCaseData: RoleCaseData[] = [{
      id: '1',
      case_id: '123',
      case_name: '123',
      case_category: 'Asylum',
      case_role: 'example-role',
      jurisdiction: 'IA',
      location_id: '001',
      startDate: new Date('01-01-2021'),
      endDate: new Date('01-01-2022'),
      assignee: 'person1',
    },
    {
      id: '3',
      case_id: '456',
      case_name: '456',
      case_category: 'Test',
      case_role: 'example-role-2',
      jurisdiction: 'IA',
      location_id: '001',
      startDate: new Date('01-01-2021'),
      endDate: new Date('01-01-2022'),
      assignee: 'person1',
    }];
    it('should return empty list if there is nothing given', () => {
      expect(mapCasesFromData(null, null, null)).to.deep.equal([]);
      expect(mapCasesFromData(null, firstRoleAssignment, null)).to.deep.equal([]);
      expect(mapCasesFromData(null, firstRoleAssignment, paginationConfig)).to.deep.equal([]);
      expect(mapCasesFromData(null, null, paginationConfig)).to.deep.equal([]);
    });
    it('should return correct case data if role assignment data returned', () => {
      expect(mapCasesFromData(mockCaseData, mockRoleAssignment, null)).to.deep.equal(expectedRoleCaseData);
    });
  });

  describe('getSubstantiveRoles', () => {
    const mockRoleAssignment: RoleAssignment[] = [{
      id: '1',
      actorId: 'person1',
      roleName: 'example-role',
      endTime: new Date('01-01-2022'),
      beginTime: new Date('01-01-2021'),
      attributes: {
        caseId: '123',
        primaryLocation: '001',
        substantive: 'Y',
      },
    },
    {
      id: '2',
      actorId: 'person1',
      roleName: 'example-role',
      endTime: new Date('01-01-2022'),
      beginTime: new Date('01-01-2021'),
      attributes: {
        primaryLocation: '001',
        substantive: 'Y',
      },
    },
    {
      id: '3',
      actorId: 'person1',
      roleName: 'example-role-2',
      endTime: new Date('01-01-2022'),
      beginTime: new Date('01-01-2021'),
      attributes: {
        caseId: '456',
        primaryLocation: '001',
        substantive: 'N',
      },
    }, ];
    it('should return empty list if there is nothing given', () => {
      expect(getSubstantiveRoles([])).to.deep.equal([]);
    });
    it('should return correct sustantive roles if role assignment data returned', () => {
      expect(getSubstantiveRoles(mockRoleAssignment)).to.deep.equal(mockRoleAssignment.slice(0, 2));
    });
  });

  describe('constructRoleAssignmentCaseAllocatorQuery', () => {

    it(
      'should create a query with jurisdiction (IA), actorId and roleType ORG',
      () => {

        const searchParameters = [
          {
            key: 'jurisdiction',
            operator: 'EQUAL',
            values: 'IA',
          },
          {
            key: 'location_id',
            operator: 'EQUAL',
            values: '',
          },
          {
            key: 'actorId',
            operator: 'EQUAL',
            values: '',
          },
          {
            key: 'role',
            operator: 'EQUAL',
            values: 'Legal Ops',
          },
        ];
        const req = {
          user: {
            userinfo: {
              id: '0d8be1b2-a023-4125-9ab7-00f87b560d76',
            },
          },
        };

        const result = constructRoleAssignmentCaseAllocatorQuery(searchParameters, req);
        expect(result.queryRequests.length).to.equal(1);
        expect(result.queryRequests[0].attributes.jurisdiction[0]).to.equal('IA');
        expect(result.queryRequests[0].actorId[0]).to.equal('0d8be1b2-a023-4125-9ab7-00f87b560d76');
        expect(result.queryRequests[0].role[0]).to.equal('case-allocator');
        expect(result.queryRequests[0].roleType[0]).to.equal('ORGANISATION');
      });
  });

  describe('getRoleAssignmentsByQuery', () => {

    let sandbox: sinon.SinonSandbox;
    let spy: any;
    beforeEach(() => {
      sandbox = sinon.createSandbox();
    });

    afterEach(() => {
      sandbox.restore();
    });

    it(
      'should get role assignments by caseAllocatorQuery',
      async () => {

        const caseAllocatorQuery = {
          "queryRequests": [
            {
              "attributes": {
                "jurisdiction": [
                  "IA",
                ],
              },
              "actorId": [
                "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
              ],
              "role": [
                "case-allocator",
              ],
              "roleType": [
                "ORGANISATION",
              ],
            },
          ],
        };
        const req = mockReq();
        const mockRoleAssignments = [
          {
            "id": "508daf11-d968-4d65-bebb-863195b395c2",
            "actorIdType": "IDAM",
            "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
            "roleType": "CASE",
            "roleName": "case-manager",
            "classification": "PUBLIC",
            "grantType": "SPECIFIC",
            "roleCategory": "LEGAL_OPERATIONS",
            "readOnly": false,
            "beginTime": "2021-10-20T23:00:00Z",
            "endTime": "2021-10-27T23:00:00Z",
            "created": "2021-10-21T14:55:04.103639Z",
            "attributes": {
              "substantive": "Y",
              "caseId": "1634822871207303",
              "jurisdiction": "IA",
              "caseType": "Asylum",
            },
          },
          {
            "id": "90d23b9f-3458-4aeb-83c3-5fb25ecfa30a",
            "actorIdType": "IDAM",
            "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
            "roleType": "CASE",
            "roleName": "case-manager",
            "classification": "PUBLIC",
            "grantType": "SPECIFIC",
            "roleCategory": "LEGAL_OPERATIONS",
            "readOnly": false,
            "beginTime": "2021-10-13T23:00:00Z",
            "created": "2021-10-14T15:55:58.586597Z",
            "attributes": {
              "substantive": "Y",
              "caseId": "1547476018728634",
              "jurisdiction": "IA",
              "caseType": "Asylum",
            },
          },
        ];
        const res = mockRes({status: 200, data: mockRoleAssignments});
        spy = sandbox.stub(http, 'post').resolves(res);
        const data = await  getRoleAssignmentsByQuery(caseAllocatorQuery, req);
        expect(data).to.deep.equal(mockRoleAssignments);
      });
  });

  describe('getCaseAllocatorLocations', () => {

    it(
      'should get case allocator locations',
      () => {

        const mockRoleAssignments: any[] = [
          {
            "id": "508daf11-d968-4d65-bebb-863195b395c2",
            "actorIdType": "IDAM",
            "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
            "roleType": "CASE",
            "roleName": "case-manager",
            "classification": "PUBLIC",
            "grantType": "SPECIFIC",
            "roleCategory": "LEGAL_OPERATIONS",
            "readOnly": false,
            "beginTime": "2021-10-20T23:00:00Z",
            "endTime": "2021-10-27T23:00:00Z",
            "created": "2021-10-21T14:55:04.103639Z",
            "attributes": {
              "substantive": "Y",
              "caseId": "1634822871207303",
              "jurisdiction": "IA",
              "primaryLocation": "229786",
              "caseType": "Asylum",
            },
          },
          {
            "id": "90d23b9f-3458-4aeb-83c3-5fb25ecfa30a",
            "actorIdType": "IDAM",
            "actorId": "db17f6f7-1abf-4223-8b5e-1eece04ee5d8",
            "roleType": "CASE",
            "roleName": "case-manager",
            "classification": "PUBLIC",
            "grantType": "SPECIFIC",
            "roleCategory": "LEGAL_OPERATIONS",
            "readOnly": false,
            "beginTime": "2021-10-13T23:00:00Z",
            "created": "2021-10-14T15:55:58.586597Z",
            "attributes": {
              "substantive": "Y",
              "caseId": "1547476018728634",
              "primaryLocation": "229786",
              "jurisdiction": "IA",
              "caseType": "Asylum",
            },
          },
        ];

        const result = getCaseAllocatorLocations(mockRoleAssignments);
        expect(result.length).to.equal(1);
        expect(result[0]).to.equal('229786');
      });
  });

  describe('constructRoleAssignmentQuery', () => {

    it(
      'should create a query with jurisdiction (IA), primaryLocation and roleType CASE',
      () => {

        const searchParameters = [
          {
            key: 'jurisdiction',
            operator: 'EQUAL',
            values: 'IA',
          },
          {
            key: 'location_id',
            operator: 'EQUAL',
            values: '',
          },
          {
            key: 'actorId',
            operator: 'EQUAL',
            values: '',
          },
          {
            key: 'role',
            operator: 'EQUAL',
            values: 'Legal Ops',
          },
        ];

        const result = constructRoleAssignmentQuery(searchParameters, ['229786']);
        expect(result.queryRequests.length).to.equal(1);
        expect(result.queryRequests[0].attributes.primaryLocation[0]).to.equal('229786');
        expect(result.queryRequests[0].attributes.jurisdiction[0]).to.equal('IA');
        expect(result.queryRequests[0].roleType[0]).to.equal('CASE');
      });
  });

  describe('mapRoleType', () => {

    it(
      'should map the role type to the correct role category',
      () => {
        expect(mapRoleType(PersonRole.ALL)).to.deep.equal('');
        expect(mapRoleType(PersonRole.JUDICIAL)).to.deep.equal(RoleCategory.JUDICIAL);
        expect(mapRoleType(PersonRole.ADMIN)).to.deep.equal(RoleCategory.ADMIN);
        expect(mapRoleType(PersonRole.CASEWORKER)).to.deep.equal(RoleCategory.LEGAL_OPERATIONS);
      });
  });

});
