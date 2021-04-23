import { DateTimePipe } from './date-time.pipe';

describe('DateTimePipe', () => {

  let dateTimePipe: DateTimePipe;

  beforeEach(() => {
    dateTimePipe = new DateTimePipe();
  });

  it('should transform iso datetime to formatted datetime', () => {
    const formattedDateTime = dateTimePipe.transform('2021-01-01T12:12:12.000');
    expect(formattedDateTime).toBe('2021-01-01 12:12:12');
  });
});
