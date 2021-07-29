import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRoleCheckAnswersComponent } from './allocate-role-check-answers.component';

describe('AllocateRoleCheckAnswersComponent', () => {
  let component: AllocateRoleCheckAnswersComponent;
  let fixture: ComponentFixture<AllocateRoleCheckAnswersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoleCheckAnswersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleCheckAnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
