import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffSearchComponent } from './staff-search.component';

describe('StaffSearchComponent', () => {
  let component: StaffSearchComponent;
  let fixture: ComponentFixture<StaffSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
