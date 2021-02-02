import { expect } from 'chai';

import { prepareGetTaskUrl, preparePostTaskUrlAction, prepareSearchTaskUrl } from './util';

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

});
