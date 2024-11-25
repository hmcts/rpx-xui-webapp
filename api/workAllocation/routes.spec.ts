import { expect } from 'chai';
import * as router from './routes';

describe('workAllocation.routes', () => {
  it('is instantiated', () => {
    expect(router).to.be.an('object');
  });

  it('only allows post to /caseworker/getUsersByServiceName', () => {
    expect(router.stack;
    expect(router.post).to.have.been.calledWith('/caseworker/getUsersByServiceName');
  }
});
