import { CamelToSentenceCasePipe } from './camel-to-titlecase.pipe';

describe('CamelToSentenceCasePipe', () => {
  let camelToTitleCasePipe: CamelToSentenceCasePipe;

  beforeEach(() => {
    camelToTitleCasePipe = new CamelToSentenceCasePipe();
  });

  it('should convert lowercase word to sentence case', () => {
    const result = camelToTitleCasePipe.transform('word');

    expect(result).toBe('Word');
  });

  it('should convert multiple lowercase words to sentence case', () => {
    const result = camelToTitleCasePipe.transform('word word word');

    expect(result).toBe('Word word word');
  });
})