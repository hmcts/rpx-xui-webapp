import { Task } from './tasks';
import JsonConfig from './json-config';

describe('WorkAllocation', () => {

  describe('JsonConfig', () => {

    it('should correctly coerce a partial JSON object to a Task', () => {
      const JSON: object = { id: 'Bob' };
      const TASK: Task = JsonConfig.fromJson(JSON);
      expect(TASK).toBeDefined();
      expect(TASK.id).toEqual('Bob');
      expect(TASK.caseName).toBeUndefined();
    });

    it('should correctly coerce a JSON object with actions', () => {
      const JSON: object = {
        id: 'Bob',
        actions: [
          { id: 'Action ID', title: 'Action title' }
        ]
      };
      const TASK: Task = JsonConfig.fromJson(JSON);
      expect(TASK).toBeDefined();
      expect(TASK.id).toEqual('Bob');
      expect(TASK.caseName).toBeUndefined();
      expect(TASK.actions).toBeDefined();
      expect(TASK.actions.length).toEqual(1);
      expect(TASK.actions[0].id).toEqual('Action ID');
      expect(TASK.actions[0].title).toEqual('Action title');
    });

    it('should handle coercion of a null JSON object', () => {
      const TASK: Task = JsonConfig.fromJson(null);
      expect(TASK).toBeNull();
    });

    it('should handle coercion of an undefined JSON object', () => {
      const TASK: Task = JsonConfig.fromJson(undefined);
      expect(TASK).toBeUndefined();
    });

    it('should handle coercion of an empty JSON object', () => {
      const JSON: object = {};
      const TASK: Task = JsonConfig.fromJson(JSON);
      expect(TASK).toBeDefined();
      expect(Object.keys.length).toEqual(1);
    });

    it('should handle coercion of a JSON object with an unexpected property', () => {
      const JSON: object = {
        id: 'Bob',
        'surprise-property': 'Surprise value'
      };
      const TASK: Task = JsonConfig.fromJson(JSON);
      expect(TASK).toBeDefined();
      expect(TASK.id).toEqual('Bob');
      expect(TASK.caseName).toBeUndefined();
      expect(TASK['surprise-property']).toEqual('Surprise value');
    });
  });

});
