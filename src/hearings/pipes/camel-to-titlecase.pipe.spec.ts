import { TitleCasePipe } from '@angular/common';
import { CamelToTitleCasePipe } from './camel-to-titlecase.pipe';

describe('CamelToTitleCasePipe', () => {
  let camelToTitleCasePipe: CamelToTitleCasePipe;

  beforeEach(() => {
    camelToTitleCasePipe = new CamelToTitleCasePipe(new TitleCasePipe());
  });

  it('should convert lowercase word to titleCase', () => {
    const result = camelToTitleCasePipe.transform('word');

    expect(result).toBe('Word');
  });

  it('should convert multiple lowercase words to titleCase', () => {
    const result = camelToTitleCasePipe.transform('word word word');

    expect(result).toBe('Word Word Word');
  });
})