import { DecimalPipe } from '@angular/common';
import { TwoDPPipe } from './two-dp.pipe';

describe('TwoDPPipe', () => {
  const pipe = new TwoDPPipe();
  const decimalPipe = new DecimalPipe('en-US');

  it('returns undefined if non-number given', () => {
    expect(pipe.transform('random string')).toBe(undefined);
  });

  it('does not return undefined if number supplied', () => {
    expect(pipe.transform(4)).toBe(decimalPipe.transform(4, '1.2-2'));
  });

  it('does not return undefined if number supplied and locale supplied', () => {
    expect(pipe.transform(4, 'en-GB')).toBe(decimalPipe.transform(4, '1.2-2', 'en-GB'));
  });
});
