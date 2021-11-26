import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiesUnavailableDatesComponent } from './parties-unavailable-dates.component';

describe('PartiesUnavailableDatesComponent', () => {
  let component: PartiesUnavailableDatesComponent;
  let fixture: ComponentFixture<PartiesUnavailableDatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PartiesUnavailableDatesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiesUnavailableDatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
