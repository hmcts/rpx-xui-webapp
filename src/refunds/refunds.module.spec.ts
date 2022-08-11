import { RefundsModule } from './refunds.module';

describe('RefundsModule', () => {
  let refundsModule: RefundsModule;

  beforeEach(() => {
    refundsModule = new RefundsModule();
  });

  it('should create an instance', () => {
    expect(refundsModule).toBeTruthy();
  });
});
