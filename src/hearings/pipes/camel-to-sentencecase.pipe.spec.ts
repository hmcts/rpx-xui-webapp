import { CamelToSentenceCasePipe } from './camel-to-sentencecase.pipe';

describe('CamelToSentenceCasePipe', () => {
  let camelToSentenceCasePipe: CamelToSentenceCasePipe;

  beforeEach(() => {
    camelToSentenceCasePipe = new CamelToSentenceCasePipe();
  });

  it('should convert lowercase word to sentence case', () => {
    const result = camelToSentenceCasePipe.transform('word');

    expect(result).toBe('Word');
  });

  it('should convert multiple lowercase words to sentence case', () => {
    const result = camelToSentenceCasePipe.transform('word word word');

    expect(result).toBe('Word word word');
  });
})