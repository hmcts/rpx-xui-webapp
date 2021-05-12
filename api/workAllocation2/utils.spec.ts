import { expect } from 'chai';

import { ActionViews, TaskPermission, TASK_ACTIONS } from './constants/actions';
import { CaseworkerApi, LocationApi, Location, Caseworker } from './interfaces/task';
import { assignActionsToTasks, assignActionsToTasksWithPermissions, getWATaskActions, getWATaskActionsForCancel, getWATaskActionsForExecute, getWATaskActionsForManage, mapCaseworkerData, mapCaseworkerPrimaryLocation, prepareGetTaskUrl, preparePostTaskUrlAction, prepareSearchTaskUrl } from './util';

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


  describe('assignActionsToTasks', () => {

    const TASKS = {
      TASK_1: {
        id: '1',
        caseReference: '1',
        caseName: 'Task One',
        caseCategory: 'Grant of representation',
        location: 'Taylor House',
        taskName: 'Apply for probate',
        dueDate: new Date(1604938789000),
        assignee: 'Bob',
        actions: undefined
      },
      TASK_2: {
        id: '2',
        caseReference: '2',
        caseName: 'Task Two',
        caseCategory: 'Grant of representation',
        location: 'Taylor House',
        taskName: 'Apply for probate',
        dueDate: new Date(1604938789000),
        actions: undefined
      }
    };

    it('should set up actions appropriately for My tasks view', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasks(tasks, ActionViews.MY)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.MY);
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.MY);
    });

    it('should set up actions appropriately for Available task view', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasks(tasks, ActionViews.AVAILABLE)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.AVAILABLE);
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.AVAILABLE);
    });

    it('should set up actions appropriately for Task manager view', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasks(tasks, ActionViews.MANAGER)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.MANAGER.ASSIGNED); // Has an assignee
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.MANAGER.UNASSIGNED); // Is unassigned
    });

    it('should set up actions appropriately for unknown view', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasks(tasks, 'Bob')
      expect(tasks[0].actions).to.be.an('array').that.is.empty;
      expect(tasks[1].actions).to.be.an('array').that.is.empty;
    });

    it('should set up actions appropriately for My tasks view with permissions', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasksWithPermissions(tasks, [TaskPermission.MANAGE], ActionViews.MY)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.MY);
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.MY);
    });

    it('should set up actions appropriately for Available task view with permissions', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasksWithPermissions(tasks, [TaskPermission.MANAGE], ActionViews.AVAILABLE)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.AVAILABLE);
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.AVAILABLE);
    });

    // Note: Test will be need to be changed when additional logic done for this
    it('should set up actions appropriately for Active tasks view with permissions', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasksWithPermissions(tasks, [TaskPermission.MANAGE], ActionViews.ACTIVE)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.ACTIVE);
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.ACTIVE);
    });

    it('should set up actions appropriately for All Work tasks view with permissions and unassigned', () => {
      const tasks = [ { ...TASKS.TASK_1 }, { ...TASKS.TASK_2 } ];
      expect(tasks[0].actions).to.be.undefined;
      expect(tasks[1].actions).to.be.undefined;
      assignActionsToTasksWithPermissions(tasks, [TaskPermission.MANAGE], ActionViews.ALL_WORK)
      expect(tasks[0].actions).to.deep.equal(TASK_ACTIONS.ALL_WORK.ASSIGNED); // Has an assignee
      expect(tasks[1].actions).to.deep.equal(TASK_ACTIONS.ALL_WORK.UNASSIGNED); // Is unassigned
    });

    it('should get cancel action for the correct view', () => {
      // should get no actions for certain views
      expect(getWATaskActionsForCancel(ActionViews.MY)).to.deep.equal([]);
      expect(getWATaskActionsForCancel(ActionViews.AVAILABLE)).to.deep.equal([]);

      // should get cancel action for All Work view
      expect(getWATaskActionsForCancel(ActionViews.ALL_WORK)).to.deep.equal(TASK_ACTIONS.CANCEL);
    });

    it('should get complete action for the correct view', () => {
      // should get no actions for certain views
      expect(getWATaskActionsForExecute(ActionViews.MY)).to.deep.equal([]);
      expect(getWATaskActionsForExecute(ActionViews.AVAILABLE)).to.deep.equal([]);

      // should get complete action for All Work view
      expect(getWATaskActionsForExecute(ActionViews.ALL_WORK)).to.deep.equal(TASK_ACTIONS.EXECUTE);
    });

    it('should get the correct manage actions for the correct view', () => {
      // should get the correct actions for my tasks
      expect(getWATaskActionsForManage(ActionViews.MY, false)).to.deep.equal(TASK_ACTIONS.MY);
      expect(getWATaskActionsForManage(ActionViews.MY, true)).to.deep.equal(TASK_ACTIONS.MY);
      expect(getWATaskActionsForManage(ActionViews.AVAILABLE, false)).to.deep.equal(TASK_ACTIONS.AVAILABLE);
      expect(getWATaskActionsForManage(ActionViews.ACTIVE, false)).to.deep.equal(TASK_ACTIONS.ACTIVE);

      // should get manage actions for All Work view based on whether it is assigned
      expect(getWATaskActionsForManage(ActionViews.ALL_WORK, false)).to.deep.equal(TASK_ACTIONS.ALL_WORK.UNASSIGNED);
      expect(getWATaskActionsForManage(ActionViews.ALL_WORK, true)).to.deep.equal(TASK_ACTIONS.ALL_WORK.ASSIGNED);
    });

    it('should get the correct actions for all relevant permissions', () => {
      // should allow passing with empty permission list
      expect(getWATaskActions([], ActionViews.MY, true)).to.deep.equal([]);

      // should get manage actions for my tasks depending on permission
      expect(getWATaskActions([TaskPermission.MANAGE], ActionViews.MY, false)).to.deep.equal(TASK_ACTIONS.MY);
      expect(getWATaskActions([TaskPermission.CANCEL], ActionViews.MY, true)).to.deep.equal([]);

      // should get manage actions for available tasks depending on permission
      expect(getWATaskActions([TaskPermission.MANAGE], ActionViews.AVAILABLE, false)).to.deep.equal(TASK_ACTIONS.AVAILABLE);
      expect(getWATaskActions([TaskPermission.OWN, TaskPermission.READ, TaskPermission.REFER], ActionViews.AVAILABLE, false)).to.deep.equal([]);

      // should get manage actions for active tasks depending on permission
      // Note - temporary test for this as separate logic will be needed for other scenarios
      expect(getWATaskActions([TaskPermission.MANAGE], ActionViews.ACTIVE, false)).to.deep.equal(TASK_ACTIONS.ACTIVE);
      expect(getWATaskActions([TaskPermission.EXECUTE], ActionViews.ACTIVE, false)).to.deep.equal([]);

      // should get manage actions for All Work tasks depending on permission
      const allWorkPermissions = [TaskPermission.MANAGE, TaskPermission.EXECUTE, TaskPermission.CANCEL];
      // verify that the correct full list returned for all work
      expect(getWATaskActions(allWorkPermissions, ActionViews.ALL_WORK, false)).to.deep.equal([
        TASK_ACTIONS.ALL_WORK.UNASSIGNED[0], TASK_ACTIONS.ALL_WORK.UNASSIGNED[1], TASK_ACTIONS.EXECUTE[0], TASK_ACTIONS.CANCEL[0]]);
      // verify that correct list returned for when task is assigned
      expect(getWATaskActions([TaskPermission.MANAGE], ActionViews.ALL_WORK, true)).to.deep.equal(TASK_ACTIONS.ALL_WORK.ASSIGNED);
    });
  });

  describe('mapCaseworkerData', () => {

    const LOCATIONAPI_1: LocationApi = {
      location_id: '1',
      location: 'Test One',
      services: ['a','b'],
      is_primary: true
    }
    const LOCATIONAPI_2: LocationApi = {
      location_id: '2',
      location: 'Test Two',
      services: ['a','c'],
      is_primary: false
    }
    const LOCATIONAPI_3: LocationApi = {
      location_id: '3',
      location: 'Test Three',
      services: ['b','c'],
      is_primary: true
    }

    const LOCATION_1: Location = {
      id: '1',
      locationName: 'Test One',
      services: ['a','b']
    }
    const LOCATION_2: Location = {
      id: '3',
      locationName: 'Test Three',
      services: ['b','c']
    }

    const CASEWORKERAPI_1: CaseworkerApi = {
      id: '1',
      first_name: 'Name',
      last_name: 'Test',
      email_id: 'nametest@test.com',
      base_location: [LOCATIONAPI_1, LOCATIONAPI_2]
    }
    const CASEWORKERAPI_2: CaseworkerApi = {
      id: '2',
      first_name: 'First',
      last_name: 'Last',
      email_id: 'firstlast@test.com',
      base_location: [LOCATIONAPI_2, LOCATIONAPI_3]
    }
    const CASEWORKERAPI_3: CaseworkerApi = {
      id: '3',
      first_name: 'One',
      last_name: 'Two',
      email_id: 'onetwo@test.com',
      base_location: [LOCATIONAPI_1, LOCATIONAPI_3]
    }
    const CASEWORKERAPI_4: CaseworkerApi = {
      id: '4',
      first_name: 'Fourth',
      last_name: 'Test',
      email_id: 'fourthtest@test.com',
      base_location: []
    }

    const CASEWORKER_1: Caseworker = {
      idamId: '1',
      firstName: 'Name',
      lastName: 'Test',
      email: 'nametest@test.com',
      location: LOCATION_1
    }
    const CASEWORKER_2: Caseworker = {
      idamId: '2',
      firstName: 'First',
      lastName: 'Last',
      email: 'firstlast@test.com',
      location: LOCATION_2
    }
    const CASEWORKER_3: Caseworker = {
      idamId: '3',
      firstName: 'One',
      lastName: 'Two',
      email: 'onetwo@test.com',
      location: LOCATION_2
    }
    const CASEWORKER_4: Caseworker = {
      idamId: '4',
      firstName: 'Fourth',
      lastName: 'Test',
      email: 'fourthtest@test.com',
      location: null
    }
    
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
      expect(mapCaseworkerData([CASEWORKERAPI_1, CASEWORKERAPI_2, CASEWORKERAPI_3, CASEWORKERAPI_4])).to.deep.equal([CASEWORKER_1, CASEWORKER_2, CASEWORKER_3, CASEWORKER_4])
    })
  });

});
