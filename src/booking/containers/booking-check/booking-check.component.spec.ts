import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingCheckComponent } from './booking-check.component';

describe('BookingCheckComponent', () => {
  let component: BookingCheckComponent;
  let fixture: ComponentFixture<BookingCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
