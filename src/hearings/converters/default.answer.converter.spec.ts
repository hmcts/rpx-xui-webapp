import {DefaultAnswerConverter} from './default.answer.converter';

describe('DefaultAnswerConverter', () => {

  let defaultAnswerConverter: DefaultAnswerConverter;

  beforeEach(() => {
    defaultAnswerConverter = new DefaultAnswerConverter();
  });

  it('should return default converter', () => {
    const result$ = defaultAnswerConverter.transformAnswer();
    const msg = 'Not implement yet';
    result$.subscribe(result => expect(result).toBe(msg));
  });

});
