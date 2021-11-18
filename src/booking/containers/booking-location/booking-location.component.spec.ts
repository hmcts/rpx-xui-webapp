import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
