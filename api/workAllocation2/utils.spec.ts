import { expect } from 'chai';

import { mockReq } from 'sinon-express-mock';
import { ASSIGN, CLAIM, CLAIM_AND_GO, COMPLETE, GO, REASSIGN, RELEASE, TaskPermission } from './constants/actions';
import { JUDICIAL_AVAILABLE_TASKS, JUDICIAL_MY_TASKS } from './constants/mock.data';
import { Caseworker, CaseworkerApi, Location, LocationApi } from './interfaces/common';
import { PersonDomain } from './interfaces/person';
import { applySearchFilter,
  assignActionsToTasks,
  getActionsByPermissions,
  mapCaseworkerData,
  mapCaseworkerPrimaryLocation,
  prepareGetTaskUrl,
  preparePaginationUrl,
  preparePostTaskUrlAction,
  prepareSearchTaskUrl } from './util';

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

    const TASKS = {
      TASK_1: {
        actions: undefined,
        assignee: 'Bob',
        caseCategory: 'Grant of representation',
        caseName: 'Task One',
        caseReference: '1',
        dueDate: new Date(1604938789000),
        id: '1',
        location: 'Taylor House',
        taskName: 'Apply for probate',
      },
      TASK_2: {
        actions: undefined,
        caseCategory: 'Grant of representation',
        caseName: 'Task Two',
        caseReference: '2',
        dueDate: new Date(1604938789000),
        id: '2',
        location: 'Taylor House',
        taskName: 'Apply for probate',
      },
    };

    it('should assign actions to task', () => {
      const tasksWithActions = assignActionsToTasks(JUDICIAL_MY_TASKS.tasks, 'MyTasks');
      expect(tasksWithActions[0].actions[0]).to.be.equal(REASSIGN);
      expect(tasksWithActions[0].actions[1]).to.be.equal(RELEASE);
      expect(tasksWithActions[0].actions[2]).to.be.equal(GO);

      const tasksWithActionsAllWorkAssigned = assignActionsToTasks(JUDICIAL_MY_TASKS.tasks, 'AllWork');
      expect(tasksWithActionsAllWorkAssigned[0].actions[0]).to.be.equal(REASSIGN);
      expect(tasksWithActionsAllWorkAssigned[0].actions[1]).to.be.equal(RELEASE);
      expect(tasksWithActionsAllWorkAssigned[0].actions[2]).to.be.equal(GO);

      const tasksWithActionsAllWorkUnassigned = assignActionsToTasks(JUDICIAL_AVAILABLE_TASKS.tasks, 'AllWork');
      expect(tasksWithActionsAllWorkUnassigned[0].actions[0]).to.be.equal(ASSIGN);
      expect(tasksWithActionsAllWorkUnassigned[0].actions[1]).to.be.equal(GO);
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
        .to.deep.equal([REASSIGN, RELEASE, GO]);
      expect(getActionsByPermissions('MyTasks', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('MyTasks', [TaskPermission.MANAGE, TaskPermission.CANCEL]))
        .to.deep.equal([REASSIGN, RELEASE, GO]);
    });

    it('should get correct actions for available tasks for certain permissions', () => {
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.CANCEL, TaskPermission.MANAGE]))
        .to.deep.equal([CLAIM, CLAIM_AND_GO]);
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.EXECUTE])).to.deep.equal([]);
      expect(getActionsByPermissions('AvailableTasks', [TaskPermission.MANAGE, TaskPermission.CANCEL]))
        .to.deep.equal([CLAIM, CLAIM_AND_GO]);
    });

    it('should get correct actions for all work tasks for certain permissions', () => {
      expect(getActionsByPermissions('AllWorkAssigned', [TaskPermission.MANAGE])).to.deep.equal([REASSIGN, RELEASE, GO]);
      expect(getActionsByPermissions('AllWorkAssigned', [TaskPermission.EXECUTE])).to.deep.equal([COMPLETE]);
      expect(getActionsByPermissions('AllWorkUnassigned', [TaskPermission.MANAGE, TaskPermission.EXECUTE]))
        .to.deep.equal([ASSIGN, GO, COMPLETE]);
    });

  });

  describe('applySearchFilter', () => {
    it('PersonDomain BOTH', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonDomain.CASEWORKER };
      const result = applySearchFilter(person, PersonDomain.ALL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonDomain CASEWORKER', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonDomain.CASEWORKER };
      const result = applySearchFilter(person, PersonDomain.CASEWORKER, 'name');
      expect(result).to.equal(true);
    });
    it('PersonDomain JUDICIAL', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonDomain.JUDICIAL };
      const result = applySearchFilter(person, PersonDomain.JUDICIAL, 'name');
      expect(result).to.equal(true);
    });
    it('PersonDomain CASEWORKER no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonDomain.JUDICIAL };
      const result = applySearchFilter(person, PersonDomain.CASEWORKER, 'name');
      expect(result).to.equal(false);
    });
    it('PersonDomain JUDICIAL no match', () => {
      const person = {id: '123', name: 'some name', email: 'name@email.com', domain: PersonDomain.CASEWORKER };
      const result = applySearchFilter(person, PersonDomain.JUDICIAL, 'name');
      expect(result).to.equal(false);
    });
  });

});
