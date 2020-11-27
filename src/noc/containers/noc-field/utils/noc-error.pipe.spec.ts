import { NocErrorPipe } from './noc-error.pipe';

describe('NocErrorPipe', () => {

  const ERROR_MESSAGE = 'This is wrong';

  let nocError: NocErrorPipe;

  beforeEach(() => {
    nocError = new NocErrorPipe();
  });

  it('should return empty string when null errors', () => {
    const message = nocError.transform(null);
    expect(message).toBe('');
  });

  it('should return empty string when empty errors', () => {
    const message = nocError.transform({});
    expect(message).toBe('');
  });

  it('should return only error when 1 error', () => {
    const message = nocError.transform({
      errorkey: ERROR_MESSAGE
    });
    expect(message).toBe(ERROR_MESSAGE);
  });

  it('should return only first error when multiple errors', () => {
    const message = nocError.transform({
      errorkey: ERROR_MESSAGE,
      error2: 'some other error'
    });
    expect(message).toBe(ERROR_MESSAGE);
  });

  it('should return required error message', () => {
    const message = nocError.transform({
      required: true
    });
    expect(message).toBe('This field is required');
  });

  it('should return pattern error message', () => {
    const message = nocError.transform({
      pattern: true
    });
    expect(message).toBe('The data entered is not valid for this type of field');
  });

  it('should return min length error message', () => {
    const message = nocError.transform({
      minlength: true
    });
    expect(message).toBe('Required minimum length');
  });

  it('should return max length error message', () => {
    const message = nocError.transform({
      maxlength: true
    });
    expect(message).toBe('Exceeds maximum length');
  });

  it('should return email error message', () => {
    const message = nocError.transform({
      email: true
    });
    expect(message).toBe('The email is invalid');
  });

  it('should return number error message', () => {
    const message = nocError.transform({
      number: true
    });
    expect(message).toBe('The number is invalid');
  });

  it('should return postcode error message', () => {
    const message = nocError.transform({
      postcode: true
    });
    expect(message).toBe('The postcode is invalid');
  });

  it('should phoneUK postcode error message', () => {
    const message = nocError.transform({
      phoneUK: true
    });
    expect(message).toBe('The phone number is invalid');
  });

  it('should should possibleIncorrectAnswer error message', () => {
    const message = nocError.transform({
      possibleIncorrectAnswer: true
    });
    expect(message).toBe('');
  });

  it('should should allAnswerEmpty error message', () => {
    const message = nocError.transform({
      allAnswerEmpty: true
    });
    expect(message).toBe('');
  });
});
