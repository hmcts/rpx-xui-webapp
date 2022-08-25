import { YesNoPipe } from './yes-no.pipe';

describe('YesNoPipe', () => {
  const pipe = new YesNoPipe();
  it('returns undefined if null given', () => {
    expect(pipe.transform(null)).toBe(undefined);
  });
  it('returns yes if true', () => {
    expect(pipe.transform(true)).toBe('Yes');
  });
  it('returns no if false', () => {
    expect(pipe.transform(false)).toBe('No');
  });
});
