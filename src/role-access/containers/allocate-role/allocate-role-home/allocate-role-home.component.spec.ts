import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRoleHomeComponent } from './allocate-role-home.component';

describe('AllocateRoleHomeComponent', () => {
  let component: AllocateRoleHomeComponent;
  let fixture: ComponentFixture<AllocateRoleHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoleHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
