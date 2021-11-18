import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingWrapperComponent } from './booking-wrapper.component';

describe('BookingWrapperComponent', () => {
  let component: BookingWrapperComponent;
  let fixture: ComponentFixture<BookingWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
