import { expect } from 'chai';

import { mockReq } from 'sinon-express-mock';
import { ASSIGN, CLAIM, CLAIM_AND_GO, COMPLETE, GO, REASSIGN, RELEASE, TaskPermission } from './constants/actions';
import { JUDICIAL_AVAILABLE_TASKS, JUDICIAL_MY_TASKS } from './constants/mock.data';
import { Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/common';
import { PersonRole } from './interfaces/person';
import { Task } from './interfaces/task';
import { applySearchFilter,
  assignActionsToTasks,
  getActionsByPermissions,
  mapCaseworkerData,
  mapCaseworkerPrimaryLocation,
  prepareGetTaskUrl,
  preparePaginationUrl,
  preparePostTaskUrlAction,
  prepareSearchTaskUrl } from './util';

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
          searchRequest: { pagination_parameters: null},
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

      const tasksWithActionsActiveTasksAssignedCurrentUser = assignActionsToTasks(myTasks, 'ActiveTasks', '49db7670-09b3-49e3-b945-b98f4e5e9a99');
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
    };
    const CASEWORKER_2: Caseworker = {
      email: 'firstlast@test.com',
      firstName: 'First',
      idamId: '2',
      lastName: 'Last',
      location: LOCATION_2,
    };
    const CASEWORKER_3: Caseworker = {
      email: 'onetwo@test.com',
      firstName: 'One',
      idamId: '3',
      lastName: 'Two',
      location: LOCATION_2,
    };
    const CASEWORKER_4: Caseworker = {
      email: 'fourthtest@test.com',
      firstName: 'Fourth',
      idamId: '4',
      lastName: 'Test',
      location: null,
    };

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
      expect(mapCaseworkerData(null)).to.deep.equal([]);

      // this will ensure that the mapping of caseworker data is correct
      expect(mapCaseworkerData([CASEWORKERAPI_1, CASEWORKERAPI_2, CASEWORKERAPI_3, CASEWORKERAPI_4]))
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
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [TaskPermission.MANAGE, TaskPermission.EXECUTE])).to.deep.equal([CLAIM, REASSIGN, RELEASE]);
      expect(getActionsByPermissions('ActiveTasksAssignedCurrentUser', [TaskPermission.MANAGE, TaskPermission.EXECUTE, TaskPermission.OWN])).to.deep.equal([CLAIM, REASSIGN, RELEASE]);

      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [TaskPermission.MANAGE])).to.deep.equal([REASSIGN, RELEASE]);
      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksAssignedOtherUser', [TaskPermission.MANAGE, TaskPermission.EXECUTE])).to.deep.equal([CLAIM, REASSIGN, RELEASE]);

      expect(getActionsByPermissions('ActiveTasksUnassigned', [TaskPermission.MANAGE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksUnassigned', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('ActiveTasksUnassigned', [TaskPermission.MANAGE, TaskPermission.EXECUTE])).to.deep.equal([CLAIM]);
    });

  });

  describe('applySearchFilter', () => {
    it('PersonRole BOTH', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER };
      const result = applySearchFilter(person, PersonRole.ALL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole CASEWORKER', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER };
      const result = applySearchFilter(person, PersonRole.CASEWORKER, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole JUDICIAL', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.JUDICIAL };
      const result = applySearchFilter(person, PersonRole.JUDICIAL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonRole CASEWORKER no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.JUDICIAL };
      const result = applySearchFilter(person, PersonRole.CASEWORKER, 'name');
      expect(result).to.equal(false);
    });
    it('PersonRole JUDICIAL no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonRole.CASEWORKER };
      const result = applySearchFilter(person, PersonRole.JUDICIAL, 'name');
      expect(result).to.equal(false);
    });
  });

});
