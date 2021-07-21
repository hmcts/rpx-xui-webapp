import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { ChooseRoleComponent } from '../../../components/choose-role/choose-role.component';
import { ExclusionNavigationEvent } from '../../../models';
import { RoleAllocationType } from '../../../models/enums';
import { RoleExclusionsService } from '../../../services';
import { ChoosePersonRoleComponent } from './choose-person-role.component';

const mockRoles = [{ roleId: '1', roleName: 'Role 1' },
      { roleId: '2', roleName: 'Role 2' },
      { roleId: '3', roleName: 'Role 3' }];

describe('ChoosePersonRoleComponent', () => {
  let component: ChoosePersonRoleComponent;
  let fixture: ComponentFixture<ChoosePersonRoleComponent>;
  const mockStore = jasmine.createSpyObj('store', ['dispatch', 'pipe']);
  const mockRoleExclusionsService = jasmine.createSpyObj('roleExclusionsService', ['getRolesCategory']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChooseRoleComponent, ChoosePersonRoleComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: RoleExclusionsService, useValue: mockRoleExclusionsService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoosePersonRoleComponent);
    component = fixture.componentInstance;
    mockRoleExclusionsService.getRolesCategory.and.returnValue(of(mockRoles));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly set the allocation', () => {
    expect(component.roleAllocation).toBe(RoleAllocationType.Exclusion);
  });

  it('should correctly navigate on click of continue', () => {
    const navEvent = ExclusionNavigationEvent.CONTINUE;
    component.navigationHandler(navEvent);
    expect(mockStore.dispatch).toHaveBeenCalled();
  });

  it('should have correctly defined the roles', () => {
    expect(component.roles).toBe(mockRoles);
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });
});
