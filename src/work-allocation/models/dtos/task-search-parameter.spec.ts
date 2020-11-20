import { JsonConfig } from '../tasks';
import {TaskSearchParameters} from './task-search-parameter';

describe('WorkAllocation TaskSearchParameters', () => {
    describe('JsonConfig', () => {
      it('should correctly coerce a partial JSON object to a Task', () => {
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
