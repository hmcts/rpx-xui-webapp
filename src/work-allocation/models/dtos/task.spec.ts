import { JsonConfig } from '../tasks';
import {Task} from './task';

describe('WorkAllocation Task', () => {
    describe('JsonConfig', () => {
      it('should correctly coerce a partial JSON object to a Task', () => {
        const JSON: object = {
            assignee: {
                id: 'id1',
                userName: 'userName'
            },
            caseData: {
                category: 'category',
                location: {
                    id: 'locationId',
                    locationName: 'locationName'
                },
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
        expect(TASK.assignee.id).toEqual('id1');
        expect(TASK.assignee.userName).toEqual('userName');
        expect(TASK.caseData.category).toEqual('category');
        expect(TASK.caseData.location.id).toEqual('locationId');
        expect(TASK.caseData.location.locationName).toEqual('locationName');
        expect(TASK.caseData.name).toEqual('caseDataName');
        expect(TASK.caseData.reference).toEqual('referenceName');
        expect(TASK.state).toBeUndefined();
      });
  });
});
