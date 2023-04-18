import { ConvertArrayToStringPipe } from './convert-array-to-string.pipe';

describe('ConvertArrayToStringPipe', () => {
  let convertArrayToString: ConvertArrayToStringPipe;

  beforeEach(() => {
    convertArrayToString = new ConvertArrayToStringPipe();
  });

  it('should format array to comma separated string', () => {
    const reasons = ['Bail', 'Case consolidated', 'Familial'];
    expect(convertArrayToString.transform(reasons)).toBe('Bail, Case consolidated, Familial');
  });
});
