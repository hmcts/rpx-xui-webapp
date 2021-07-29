import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRoleNavigationComponent } from './allocate-role-navigation.component';

describe('AllocateRoleNavigationComponent', () => {
  let component: AllocateRoleNavigationComponent;
  let fixture: ComponentFixture<AllocateRoleNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoleNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
