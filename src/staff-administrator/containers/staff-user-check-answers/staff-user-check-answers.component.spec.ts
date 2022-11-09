import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffUserCheckAnswersContainerComponent } from './staff-user-check-answers.component';

describe('StaffUserCheckAnswersComponent', () => {
  let component: StaffUserCheckAnswersContainerComponent;
  let fixture: ComponentFixture<StaffUserCheckAnswersContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffUserCheckAnswersContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffUserCheckAnswersContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
