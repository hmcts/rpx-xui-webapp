import { BookingModule } from './booking.module';

describe('BookingModule', () => {
  let bookingModule: BookingModule;

  beforeEach(() => {
    bookingModule = new BookingModule();
  });

  it('should create an instance', () => {
    expect(bookingModule).toBeTruthy();
  });
});
