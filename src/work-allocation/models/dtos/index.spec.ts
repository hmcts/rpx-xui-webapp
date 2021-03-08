import { Task, TaskSearchParameters } from '.';
import JsonConfig from '../json-config';

describe('WorkAllocation', () => {
  describe('JsonConfig', () => {

    it('should correctly coerce a partial JSON object to a Task', () => {
      const JSON: object = {
        assignee: { userId: 'id1', userName: 'userName' },
        caseData: {
          category: 'category',
          location: { location_id: 'location_id', location: 'location' },
          name: 'caseDataName',
          reference: 'referenceName',
        },
        dueDate: new Date(2020, 11, 11),
        name: 'taskName',
        state: undefined
      };
      const TASK: Task = JsonConfig.fromJson(JSON);
      expect(TASK).toBeDefined();
      expect(TASK.name).toEqual('taskName');
      expect(TASK.assignee.userId).toEqual('id1');
      expect(TASK.assignee.userName).toEqual('userName');
      expect(TASK.caseData.category).toEqual('category');
      expect(TASK.caseData.location.location_id).toEqual('location_id');
      expect(TASK.caseData.location.location).toEqual('location');
      expect(TASK.caseData.name).toEqual('caseDataName');
      expect(TASK.caseData.reference).toEqual('referenceName');
      expect(TASK.state).toBeUndefined();
    });

    it('should correctly coerce a partial JSON object to a TaskSearchParameters', () => {
      const JSON: object = {parameters: [{
        ccdId: '123456',
        eventId: 'eventId',
        jurisdiction: ['DIVORCE', 'FPLA'],
        location: ['loc1'],
        postEventState: 'postevent',
        preEventState: 'preevent',
        state: ['active'],
        user: ['user1']
      }]};

      const PARAMETERS: TaskSearchParameters = JsonConfig.fromJson(JSON);
      expect(PARAMETERS).toBeDefined();
      expect(PARAMETERS.parameters.length).toEqual(1);
      expect(PARAMETERS.parameters[0].ccdId).toEqual('123456');
      expect(PARAMETERS.parameters[0].eventId).toEqual('eventId');
      expect(PARAMETERS.parameters[0].jurisdiction).toEqual(['DIVORCE', 'FPLA']);
      expect(PARAMETERS.parameters[0].location).toEqual(['loc1']);
      expect(PARAMETERS.parameters[0].postEventState).toEqual('postevent');
      expect(PARAMETERS.parameters[0].preEventState).toEqual('preevent');
      expect(PARAMETERS.parameters[0].state).toEqual(['active']);
      expect(PARAMETERS.parameters[0].user).toEqual(['user1']);
    });

  });
});
