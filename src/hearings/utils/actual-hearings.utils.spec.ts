import { ActualHearingsUtils } from './actual-hearings.utils';

describe('ActualHearingsUtils', () => {

  it('should return ActualHearings Timing length', () => {
    const actualHearings = ActualHearingsUtils;
    expect(actualHearings.actualHearingDays.length).toBe(1);
  });
});
