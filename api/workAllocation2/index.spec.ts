import * as chai from 'chai';
import { expect } from 'chai';
import 'mocha';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
import { mockReq, mockRes } from 'sinon-express-mock';
import { baseWorkAllocationTaskUrl, getTask, handleCasesRewriteUrl, handleMyCasesRewriteUrl, postTaskAction, searchTask } from '.';
import { httpMock } from '../common/mockService';
import { http } from '../lib/http';
import { mockTasks } from './taskTestData.spec';

chai.use(sinonChai);

describe('workAllocation', () => {

  const SUCCESS_RESPONSE = {status: 200, data: 'ok'};
  let sandbox: sinon.SinonSandbox;
  let next: any;
  let spy: any;
  let res: any;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    next = sandbox.spy();
    res = mockRes(SUCCESS_RESPONSE);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getTask', () => {

    it('should make a get request and respond appropriately', async () => {

      spy = sandbox.stub(httpMock, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456',
        },
      });
      const response = mockRes();
      await getTask(req, response, next);

      // Should have the correct URL.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task/123456`);

      // Should have received the HTTP response. The get simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'get').resolves(res);
      const req = mockReq({
        params: {
          taskId: '123456',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await getTask(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

  describe('searchTask', () => {

    it('should make a post request and respond appropriately', async () => {
      spy = sandbox.stub(httpMock, 'post').resolves(res);
      const req = mockReq({
        body: {
          searchRequest: { search_parameters: [] },
          view: 'MyTasks',
        },
        session: {
          caseworkers: null,
        },
      });
      const response = mockRes({
        data: mockTasks,
      });
      await searchTask(req, response, next);
      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/myTasks?view=caseworker`);
      expect(args[1]).to.deep.equal({search_parameters: []});

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.data.length).to.equal(3);
      expect(response.data[0].jurisdiction).to.equal('IA');
    });

    it('should make a post request with pagination and respond appropriately', async () => {
      spy = sandbox.stub(httpMock, 'post').resolves(res);
      const req = mockReq({
        body: {
          searchRequest: { search_parameters: [], pagination_parameters: {page_size: 11, page_number: 3}},
          view: 'MyTasks',
        },
        session: {
          caseworkers: null,
        },
      });
      const response = mockRes({
        data: mockTasks,
      });
      await searchTask(req, response, next);
      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/myTasks?view=caseworker?first_result=22&max_results=11`);
      expect(args[1]).to.deep.equal({"pagination_parameters": {
        "page_number": 3,
        "page_size": 11,
      },
      search_parameters: []});

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.data.length).to.equal(3);
      expect(response.data[0].jurisdiction).to.equal('IA');
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const req = mockReq({
        body: {
          search: 'criteria',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await searchTask(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

  describe('postTaskAction', () => {

    it('should make a post request and respond appropriately', async () => {
      spy = sandbox.stub(httpMock, 'post').resolves(res);
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456',
        },
      });
      const response = mockRes();
      await postTaskAction(req, response, next);

      // Should have the correct URL and the appropriate payload.
      const args = spy.getCall(0).args;
      expect(args[0]).to.equal(`${baseWorkAllocationTaskUrl}/task/123456/assign`);
      expect(args[1]).to.deep.equal(body);

      // Should have received the HTTP response. The search simply returns the data.
      expect(response.send).to.have.been.calledWith(sinon.match(SUCCESS_RESPONSE.data));
    });

    it('should handle an exception being thrown', async () => {
      spy = sandbox.stub(http, 'post').resolves(res);
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        params: {
          action: 'assign',
          taskId: '123456',
        },
      });
      const response = mockRes();

      // Have the response throw an error.
      response.send.throws();

      await postTaskAction(req, response, next);

      expect(next).to.have.been.calledWith();
    });

  });

  describe('handleCasesRewriteUrl', () => {

    it('should be able to handle rewriting a given url for my cases', async () => {
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        session: {
          roleAssignmentResponse: [
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
          ],
        }
      });

      expect(handleMyCasesRewriteUrl('/workallocation2/my-cases', req)).to.deep.equal(`/searchCases?ctid=Asylum`);
    });

    it('should be able to handle rewriting a given url for my cases', async () => {
      spy = sandbox.stub(httpMock, 'post').resolves(res);
      const req = mockReq({
        body : {
          searchRequest: {
            search_parameters: [],
            pagination_parameters: {
              page_number: 1,
              page_size: 5
            }
          },
        },
        session: {
          roleAssignmentResponse: [
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
          ],
        }
      });

      expect(handleCasesRewriteUrl('/workallocation2/cases', req)).not.to.deep.equal('/workallocation2/cases');
    });

  });

  /* describe('handleGetCasesResponse', () => {

    it('should be able to handle rewriting a given url for my cases', async () => {
      const body = {assignee: {name: 'bob', id: 'bob01'}};
      const req = mockReq({
        body,
        session: {
          roleAssignmentResponse: [
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
          ],
        }
      });

      expect(handleMyCasesRewriteUrl('/workallocation2/my-cases', req)).to.deep.equal(`/searchCases?ctid=Asylum`);
    });

    it('should be able to handle rewriting a given url for my cases', async () => {
      spy = sandbox.stub(httpMock, 'post').resolves(res);
      const req = mockReq({
        body : {
          searchRequest: {
            search_parameters: [],
            pagination_parameters: {
              page_number: 1,
              page_size: 5
            }
          },
        },
        session: {
          roleAssignmentResponse: [
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
          ],
        }
      });

      expect(handleCasesRewriteUrl('/workallocation2/cases', req)).not.to.deep.equal('/workallocation2/cases');
    });

  }); */

});
