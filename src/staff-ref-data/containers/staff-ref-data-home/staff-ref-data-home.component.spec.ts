import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRefDataHomeComponent } from './staff-ref-data-home.component';

describe('StaffRefDataHomeComponent', () => {
  let component: StaffRefDataHomeComponent;
  let fixture: ComponentFixture<StaffRefDataHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffRefDataHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffRefDataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
