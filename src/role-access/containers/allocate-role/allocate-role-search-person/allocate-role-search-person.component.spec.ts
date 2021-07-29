import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocateRoleSearchPersonComponent } from './allocate-role-search-person.component';

describe('AllocateRoleSearchPersonComponent', () => {
  let component: AllocateRoleSearchPersonComponent;
  let fixture: ComponentFixture<AllocateRoleSearchPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocateRoleSearchPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocateRoleSearchPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
