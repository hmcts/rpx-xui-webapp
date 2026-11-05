import { expect } from 'chai';
import * as sinon from 'sinon';
import { mockReq, mockRes } from 'sinon-express-mock';
import { http } from '../lib/http';
import { fetchOrgServices, getOrgServices } from './orgServices';
import { OrgServicesCache } from './orgServicesCache';

describe('orgServices cache', () => {
  let sandbox: sinon.SinonSandbox;
  let upstream: sinon.SinonStub;
  const data = [
    { service_code: 'ABA5', ccd_service_name: 'PRIVATELAW', ccd_case_types: ['PRLAPPS'] },
    { service_code: 'AAA6', ccd_service_name: 'CIVIL', ccd_case_types: ['MoneyClaimCase'] },
    { service_code: 'AAA7', ccd_service_name: 'CIVIL', ccd_case_types: ['CivilDamages'] },
  ];
  const request = () => mockReq({ headers: { Authorization: 'Bearer user-one' } });

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    OrgServicesCache.clear();
    upstream = sandbox.stub(http, 'get').resolves({ status: 200, data: structuredClone(data) });
  });

  afterEach(() => {
    OrgServicesCache.clear();
    sandbox.restore();
  });

  it('reuses an unfiltered response without Redis', async () => {
    await fetchOrgServices(request());
    expect(await fetchOrgServices(request())).to.deep.equal({ status: 200, data });
    expect(upstream.callCount).to.equal(1);
  });

  it('shares the full-list cache across unfiltered and toolkit requests', async () => {
    await fetchOrgServices(request());
    const filtered = await fetchOrgServices(request(), 'ccdCaseType=PRLAPPS');
    expect(filtered.data).to.deep.equal([data[0]]);
    expect((await fetchOrgServices(request())).data).to.deep.equal(data);
    expect(upstream.callCount).to.equal(1);
    expect(upstream.firstCall.args[0]).to.match(/\/orgServices$/);
  });

  it('fetches the full list even when a toolkit request comes first', async () => {
    expect((await fetchOrgServices(request(), 'ccdCaseType=PRLAPPS')).data).to.deep.equal([data[0]]);
    expect((await fetchOrgServices(request())).data).to.deep.equal(data);
    expect(upstream.callCount).to.equal(1);
    expect(upstream.firstCall.args[0]).to.match(/\/orgServices$/);
  });

  it('filters by case type, comma-separated service names, and service code ignoring case and surrounding whitespace', async () => {
    expect((await fetchOrgServices(request(), 'ccdCaseType=%20prlapps%20')).data).to.deep.equal([data[0]]);
    expect((await fetchOrgServices(request(), 'ccdServiceNames=%20civil%20')).data).to.deep.equal(data.slice(1));
    expect((await fetchOrgServices(request(), 'ccdServiceNames=civil,%20privatelaw')).data).to.deep.equal(data);
    expect((await fetchOrgServices(request(), 'serviceCode=%20aaa7%20')).data).to.deep.equal([data[2]]);
    expect((await fetchOrgServices(request(), 'ccdServiceNames=All,CIVIL')).data).to.deep.equal(data);
    expect(upstream.callCount).to.equal(1);
  });

  it('matches all supplied filters using the cached full list', async () => {
    await fetchOrgServices(request());
    const result = await fetchOrgServices(request(), 'serviceCode=ABA5&ccdCaseType=PRLAPPS&ccdServiceNames=CIVIL,PRIVATELAW');
    expect(result.data).to.deep.equal([data[0]]);
    expect((await fetchOrgServices(request(), 'ccdCaseType=MoneyClaimCase&ccdServiceNames=ALL')).data).to.deep.equal([data[1]]);
    expect((await fetchOrgServices(request())).data).to.deep.equal(data);
    expect(upstream.callCount).to.equal(1);
  });

  it('returns 404 locally when combined filters conflict', async () => {
    const next = sandbox.spy();
    const res = mockRes();
    await getOrgServices(
      mockReq({ headers: request().headers, originalUrl: '/refdata/location/orgServices?serviceCode=AAA6&ccdCaseType=PRLAPPS' }),
      res,
      next
    );
    expect(next.firstCall.args[0].status).to.equal(404);
    expect(res.send.called).to.equal(false);
    expect(upstream.callCount).to.equal(1);
  });

  it('shares the common list when user and service authorization tokens change', async () => {
    await fetchOrgServices(request());
    const filtered = await fetchOrgServices(
      mockReq({ headers: { Authorization: 'Bearer user-two', ServiceAuthorization: 'Bearer renewed-service-token' } }),
      'ccdCaseType=PRLAPPS'
    );
    expect(filtered.data).to.deep.equal([data[0]]);
    expect(upstream.callCount).to.equal(1);
  });

  it('preserves upstream validation for unsupported and ambiguous filters', async () => {
    const queries = ['other=value', 'ccdServiceNames=CIVIL,,PRIVATELAW', 'ccdCaseType=PRLAPPS&ccdCaseType=OTHER'];
    await fetchOrgServices(request());
    upstream.rejects({ status: 400 });
    for (const query of queries) {
      const res = mockRes();
      const next = sandbox.spy();
      await getOrgServices(
        mockReq({ headers: request().headers, originalUrl: `/refdata/location/orgServices?${query}` }),
        res,
        next
      );
      expect(next.firstCall.args[0].status).to.equal(400);
    }
  });

  it('forwards an unmatched lookup to preserve the upstream 404 and lets the service-name fallback reuse the full list', async () => {
    upstream.onSecondCall().rejects({ status: 404 });
    const next = sandbox.spy();
    await getOrgServices(
      mockReq({ headers: request().headers, originalUrl: '/refdata/location/orgServices?ccdCaseType=UNKNOWN' }),
      mockRes(),
      next
    );
    expect(next.firstCall.args[0].status).to.equal(404);
    expect(upstream.secondCall.args[0]).to.contain('?ccdCaseType=UNKNOWN');
    expect((await fetchOrgServices(request(), 'ccdServiceNames=PRIVATELAW')).data).to.deep.equal([data[0]]);
    expect(upstream.callCount).to.equal(2);
  });

  it('keeps cached responses without a TTL', async () => {
    const clock = sandbox.useFakeTimers();
    await fetchOrgServices(request());
    clock.tick(30 * 24 * 60 * 60 * 1000);
    await fetchOrgServices(request());
    expect(upstream.callCount).to.equal(1);
  });

  it('does not share mutable data with the cache', async () => {
    const first = await fetchOrgServices(request());
    first.data[0].service_code = 'changed';
    const second = await fetchOrgServices(request());
    second.data[0].service_code = 'changed again';
    expect((await fetchOrgServices(request())).data[0].service_code).to.equal('ABA5');
    expect(upstream.callCount).to.equal(1);
  });

  it('does not cache errors and allows retry', async () => {
    upstream.onFirstCall().rejects(new Error('upstream failed'));
    try {
      await fetchOrgServices(request());
    } catch (error) {
      expect(error.message).to.equal('upstream failed');
    }
    await fetchOrgServices(request());
    expect(upstream.callCount).to.equal(2);
  });

  it('does not cache unsuccessful responses', async () => {
    upstream.resolves({ status: 403, data: [] });
    await fetchOrgServices(request());
    await fetchOrgServices(request());
    expect(upstream.callCount).to.equal(2);
  });

  it('handles toolkit query parameters and forwards errors', async () => {
    const req = mockReq({ headers: request().headers, originalUrl: '/refdata/location/orgServices?ccdCaseType=PRLAPPS' });
    const res = mockRes();
    const next = sandbox.spy();
    await getOrgServices(req, res, next);
    expect(upstream.firstCall.args[0]).to.match(/\/orgServices$/);
    expect(res.send.firstCall.args[0]).to.deep.equal([data[0]]);
    await getOrgServices(req, res, next);
    expect(upstream.callCount).to.equal(1);
    expect(res.send.secondCall.args[0]).to.deep.equal([data[0]]);
    OrgServicesCache.clear();
    upstream.rejects(new Error('failed'));
    await getOrgServices(req, res, next);
    expect(next.calledOnce).to.equal(true);
  });
});
