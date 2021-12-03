import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingProcess } from '../../models';
import { BookingCheckComponent } from './booking-check.component';

describe('BookingCheckComponent', () => {
  let component: BookingCheckComponent;
  let fixture: ComponentFixture<BookingCheckComponent>;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookingCheckComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(BookingCheckComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {} as BookingProcess;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the correct page caption and heading', () => {
    const caption = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    const heading = fixture.debugElement.nativeElement.querySelector('h1');

    expect(caption.textContent).toContain('Work access');
    expect(heading.textContent).toContain('Check your new booking');
  });

  it('should display the correct location', () => {
    const location = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').childNodes[1];
    component.bookingProcess = { locationName: 'London' } as BookingProcess;

    fixture.detectChanges();
    expect(location.textContent).toContain('London');
  });

  it('should show the correct values on row for today only case', () => {
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    component.bookingProcess = {
      startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
      endDate: new Date('Sun Dec 02 2021 23:59:59 GMT+0000'),
    } as BookingProcess;

    fixture.detectChanges();
    expect(dateInterval.textContent).toContain(
      '02 December 2021 to 02 December 2021'
    );
  });

  it('should show the correct values on row for this week case', () => {
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    component.bookingProcess = {
      startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
      endDate: new Date('Sun Dec 05 2021 23:59:59 GMT+0000'),
    } as BookingProcess;

    fixture.detectChanges();
    expect(dateInterval.textContent).toContain(
      '02 December 2021 to 05 December 2021'
    );
  });

  it('should show the correct values on row for date range case', () => {
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    component.bookingProcess = {
      startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000'),
      endDate: new Date('Sun Dec 12 2021 23:59:59 GMT+0000'),
    } as BookingProcess;

    fixture.detectChanges();
    expect(dateInterval.textContent).toContain(
      '02 December 2021 to 12 December 2021'
    );
  });
});
