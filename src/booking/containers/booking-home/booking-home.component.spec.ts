import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingHomeComponent } from './booking-home.component';

describe('BookingHomeComponent', () => {
  let component: BookingHomeComponent;
  let fixture: ComponentFixture<BookingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
