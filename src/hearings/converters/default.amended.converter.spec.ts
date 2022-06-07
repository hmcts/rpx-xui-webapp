import { DefaultAmendedConverter } from './default.amended.converter';

describe('DefaultAmendedConverter', () => {

  let defaultAmendedConverter: DefaultAmendedConverter;

  beforeEach(() => {
    defaultAmendedConverter = new DefaultAmendedConverter();
  });

  it('should return default hidden converter', () => {
    const result$ = defaultAmendedConverter.transformIsAmended();
    const isAmended = false;
    result$.subscribe(result => expect(result).toBe(isAmended));
  });

});
