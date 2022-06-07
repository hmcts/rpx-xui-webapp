import { DefaultHiddenConverter } from './default.hidden.converter';

describe('DefaultHiddenConverter', () => {

  let defaultHiddenConverter: DefaultHiddenConverter;

  beforeEach(() => {
    defaultHiddenConverter = new DefaultHiddenConverter();
  });

  it('should return default hidden converter', () => {
    const result$ = defaultHiddenConverter.transformHidden();
    const isHidden = false;
    result$.subscribe(result => expect(result).toBe(isHidden));
  });

});
