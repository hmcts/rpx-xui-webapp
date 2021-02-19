import { expect } from 'chai';

import { ActionViews, TASK_ACTIONS } from './constants/actions';
import { assignActionsToTasks, prepareGetTaskUrl, preparePostTaskUrlAction, prepareSearchTaskUrl } from './util';

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

  });

});
