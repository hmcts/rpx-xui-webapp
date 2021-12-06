import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookingNavigationEvent, BookingProcess } from '../../models';

import { BookingLocationComponent } from './booking-location.component';

describe('BookingLocationComponent', () => {
  let component: BookingLocationComponent;
  let fixture: ComponentFixture<BookingLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingLocationComponent);
    component = fixture.componentInstance;
    component.bookingProcess = {} as BookingProcess;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('page link events', () => {
    let eventTriggerSpy: jasmine.Spy;
    beforeEach(() => {
      eventTriggerSpy = spyOn(component.eventTrigger, 'emit');
    });

    it('should call the change location event trigger if the continue button is clicked', () => {
      const continueButton = fixture.debugElement.query(By.css('button'));
      continueButton.triggerEventHandler('click', null);
      expect(eventTriggerSpy).toHaveBeenCalledWith(BookingNavigationEvent.LOCATIONCONTINUE);
    });

  });
});
