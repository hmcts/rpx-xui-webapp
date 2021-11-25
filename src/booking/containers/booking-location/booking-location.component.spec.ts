import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BookingProcess } from '../../models';

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
});
