import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingCheckComponent } from './booking-check.component';

import { BookingProcess } from 'src/booking/models';

describe('BookingCheckComponent', () => {
  let component: BookingCheckComponent;
  let fixture: ComponentFixture<BookingCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCheckComponent ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(BookingCheckComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {locationName: 'London'} as BookingProcess;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should create component and show the correct info message and values on row for today only case', () => {
    component.bookingProcess = {locationName: 'London', startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000') , endDate: new Date('Sun Dec 02 2021 23:59:59 GMT+0000')} as BookingProcess;
    fixture.detectChanges();
    const caption = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(caption.textContent).toContain('Work access');
    const infoMassage = fixture.debugElement.nativeElement.querySelector('h1');
    expect(infoMassage.textContent).toContain('Check your new booking');
    const location = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').childNodes[1];
    expect(location.textContent).toContain('London');
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    expect(dateInterval.textContent).toContain('02 December 2021 to 02 December 2021');
  });
  it('should create component and show the correct info message and values on row for this week case', () => {
    component.bookingProcess = {locationName: 'London', startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000') , endDate: new Date('Sun Dec 05 2021 23:59:59 GMT+0000')} as BookingProcess;
    fixture.detectChanges();
    const caption = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(caption.textContent).toContain('Work access');
    const infoMassage = fixture.debugElement.nativeElement.querySelector('h1');
    expect(infoMassage.textContent).toContain('Check your new booking');
    const location = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').childNodes[1];
    expect(location.textContent).toContain('London');
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    expect(dateInterval.textContent).toContain('02 December 2021 to 05 December 2021');
  });
  it('should create component and show the correct info message and values on row for date range case', () => {
    component.bookingProcess = {locationName: 'London', startDate: new Date('Thu Dec 02 2021 09:00:00 GMT+0000') , endDate: new Date('Sun Dec 12 2021 23:59:59 GMT+0000')} as BookingProcess;
    fixture.detectChanges();
    const caption = fixture.debugElement.nativeElement.querySelector('.govuk-caption-l');
    expect(caption.textContent).toContain('Work access');
    const infoMassage = fixture.debugElement.nativeElement.querySelector('h1');
    expect(infoMassage.textContent).toContain('Check your new booking');
    const location = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').childNodes[1];
    expect(location.textContent).toContain('London');
    const dateInterval = fixture.debugElement.nativeElement.querySelector('.govuk-summary-list__row').nextElementSibling.childNodes[1];
    expect(dateInterval.textContent).toContain('02 December 2021 to 12 December 2021');
  });
});
