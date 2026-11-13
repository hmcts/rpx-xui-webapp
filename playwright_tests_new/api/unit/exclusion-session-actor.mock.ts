import { createRequire } from 'node:module';
import type { AxiosInstance } from 'axios';
import type { NextFunction } from 'express';
import sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';

const require = createRequire(import.meta.url);
const configuration = require('../../../api/configuration') as {
  getConfigValue(reference: string): unknown;
  showFeature(feature: string): boolean;
};

export const roleAssignmentUrl = 'https://role-assignment.example.test/am/role-assignments';

// Keep module initialization local: the real handler and HTTP client must not start a telemetry exporter.
const initialization = sinon.createSandbox();
const config = require('config') as { get(reference: string): unknown };
initialization
  .stub(configuration, 'getConfigValue')
  .callsFake((reference) =>
    reference === 'services.role_assignment.roleApi' ? 'https://role-assignment.example.test' : config.get(reference)
  );
initialization.stub(configuration, 'showFeature').callThrough().withArgs('appInsightsEnabled').returns(false);
let confirmUserExclusion: (
  req: ReturnType<typeof mockReq>,
  res: ReturnType<typeof mockRes>,
  next: NextFunction
) => Promise<unknown>;
let http: AxiosInstance;
try {
  ({ confirmUserExclusion } = require('../../../api/roleAccess/exclusionService'));
  ({ http } = require('../../../api/lib/http'));
} finally {
  initialization.restore();
}

export const selfIdentityCases = [
  { name: 'id only', userinfo: { id: 'session-id' }, expectedActor: 'session-id' },
  { name: 'id wins over uid', userinfo: { id: 'session-id', uid: 'session-uid' }, expectedActor: 'session-id' },
  { name: 'uid when id is absent', userinfo: { uid: 'session-uid' }, expectedActor: 'session-uid' },
  { name: 'uid when id is empty', userinfo: { id: '', uid: 'session-uid' }, expectedActor: 'session-uid' },
];

export const missingIdentityCases = [
  { name: 'absent id and uid', userinfo: {} },
  { name: 'empty id and uid', userinfo: { id: '', uid: '' } },
];

export function createExclusionSessionActorHarness(userinfo: { id?: string; uid?: string }) {
  const sandbox = sinon.createSandbox();
  const downstream = { status: 201, data: { id: 'synthetic-exclusion' } };
  const post = sandbox.stub(http, 'post').resolves(downstream);
  const next = sandbox.spy();
  const response = mockRes();
  const req = mockReq({
    headers: { 'content-type': 'application/json' },
    session: { passport: { user: { userinfo: { ...userinfo, roleCategories: ['ADMIN', 'CTSC'] } } } },
    body: {
      caseId: '1234567890123456',
      jurisdiction: 'IA',
      exclusionOption: 'Exclude me',
      exclusionDescription: 'Synthetic conflict of interest',
    },
  });

  return {
    req,
    response,
    next,
    post,
    downstream,
    confirm: () => confirmUserExclusion(req, response, next),
    restore: () => sandbox.restore(),
  };
}
