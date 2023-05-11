import { DecimalPipe } from '@angular/common';
import { IntegerPipe } from './integer.pipe';

describe('IntegerPipe', () => {
  const pipe = new IntegerPipe();
  const decimalPipe = new DecimalPipe('en-US');

  it('returns undefined if non-number given', () => {
    expect(pipe.transform('random string')).toBe(undefined);
  });

  it('does not return undefined if number supplied', () => {
    expect(pipe.transform(4)).toBe(decimalPipe.transform(4, '1.0-0'));
  });

  it('does not return undefined if number supplied and locale supplied', () => {
    expect(pipe.transform(4, 'en-GB')).toBe(decimalPipe.transform(4, '1.0-0', 'en-GB'));
  });
});
