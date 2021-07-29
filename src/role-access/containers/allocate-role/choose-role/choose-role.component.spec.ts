import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseRoleComponent } from './choose-role.component';

describe('ChooseRoleComponent', () => {
  let component: ChooseRoleComponent;
  let fixture: ComponentFixture<ChooseRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
