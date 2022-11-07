import { DaysFromTodayPipe } from './days-from-today.pipe';

describe('DaysFromTodayPipe', () => {
  beforeEach(() => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date('2020-01-03'));
  });
  const pipe = new DaysFromTodayPipe();
  it('returns undefined if no date present', () => {
    expect(pipe.transform(null)).toBe(undefined);
  });
  it('returns the correct message for one day in the future', () => {
    const firstMockDate = new Date('2020-01-04');
    const firstExpectedDiff = '-1 day';
    expect(pipe.transform(firstMockDate)).toBe(firstExpectedDiff);
  });
  it('returns the correct message for 365 days in the past', () => {
    const secondMockDate = new Date('2019-01-03');
    const secondExpectedDiff = '+365 days';
    expect(pipe.transform(secondMockDate)).toBe(secondExpectedDiff);
  });
  it('returns 0 days if date is the current date', () => {
    const thirdMockDate = new Date('2020-01-03');
    const thirdExpectedDiff = '0 days';
    expect(pipe.transform(thirdMockDate)).toBe(thirdExpectedDiff);
  });
  afterEach(() => {
    jasmine.clock().uninstall();
  });
});
