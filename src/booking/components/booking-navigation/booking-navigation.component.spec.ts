import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingNavigationComponent } from './booking-navigation.component';

describe('BookingNavigationComponent', () => {
  let component: BookingNavigationComponent;
  let fixture: ComponentFixture<BookingNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
