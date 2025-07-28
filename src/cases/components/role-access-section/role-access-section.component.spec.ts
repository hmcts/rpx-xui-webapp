import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Params } from '@angular/router';
import { CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

import { Action, CaseRole } from '../../../role-access/models';
import { RoleAccessSectionComponent } from './role-access-section.component';

@Component({
  selector: 'exui-case-roles-table',
  template: ''
})
class MockCaseRolesTableComponent {
  @Input() public roles: CaseRole[];
  @Input() public roleCategory: RoleCategory;
  @Input() public caseDetails: CaseView;
  @Input() public showAllocateRoleLink: boolean;
}

@Component({
  selector: 'exui-allocate-a-role-link',
  template: ''
})
class MockAllocateRoleLinkComponent {
  @Input() public routerLink: string;
  @Input() public queryParams: Params;
  @Input() public showAllocateRoleLink: boolean;
  @Input() public roles: CaseRole[];
  @Input() public roleCategory: RoleCategory;
  @Input() public linkText: string;
  @Input() public existingUsers: string[];
}

describe('RoleAccessSectionComponent', () => {
  let component: RoleAccessSectionComponent;
  let fixture: ComponentFixture<RoleAccessSectionComponent>;
  let caseRolesTable: DebugElement;
  let allocateRoleLink: DebugElement;

  const mockCaseView: CaseView = {
    case_id: '1234567890123456',
    case_type: {
      id: 'TEST_CASE_TYPE',
      name: 'Test Case Type',
      jurisdiction: {
        id: 'TEST_JURISDICTION',
        name: 'Test Jurisdiction'
      }
    },
    state: {
      id: 'CREATED',
      name: 'Created'
    },
    channels: [],
    tabs: [],
    triggers: [],
    events: []
  };

  const mockRoles: CaseRole[] = [
    {
      id: 'role1',
      name: 'Judge',
      email: 'judge@example.com',
      location: 'London',
      actions: [{ id: 'action1', title: 'Action 1' }],
      actorId: 'actor1',
      roleCategory: RoleCategory.JUDICIAL,
      start: '2023-01-01',
      end: '2023-12-31'
    },
    {
      id: 'role2',
      name: 'Legal Representative',
      email: 'legal@example.com',
      location: 'Manchester',
      actions: [{ id: 'action2', title: 'Action 2' }],
      actorId: 'actor2',
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      start: '2023-02-01',
      end: '2023-11-30'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        RoleAccessSectionComponent,
        MockCaseRolesTableComponent,
        MockAllocateRoleLinkComponent
      ]
    });

    fixture = TestBed.createComponent(RoleAccessSectionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Component initialization', () => {
    it('should have default input values', () => {
      expect(component.title).toBeUndefined();
      expect(component.roles).toBeUndefined();
      expect(component.caseDetails).toBeUndefined();
      expect(component.showAllocateRoleLink).toBe(false);
      expect(component.roleRouterLink).toBeUndefined();
      expect(component.roleQueryParams).toBeUndefined();
      expect(component.roleCategory).toBeUndefined();
      expect(component.showAllocate).toBeUndefined();
      expect(component.linkText).toBe('Allocate a role');
      expect(component.existingUsers).toBeUndefined();
    });

    it('should accept input values', () => {
      component.title = 'Role Access';
      component.roles = mockRoles;
      component.caseDetails = mockCaseView;
      component.showAllocateRoleLink = true;
      component.roleRouterLink = '/allocate-role';
      component.roleQueryParams = { caseId: '1234567890123456' };
      component.roleCategory = RoleCategory.JUDICIAL;
      component.showAllocate = true;
      component.linkText = 'Add a new role';
      component.existingUsers = ['user1@example.com', 'user2@example.com'];

      fixture.detectChanges();

      expect(component.title).toBe('Role Access');
      expect(component.roles).toEqual(mockRoles);
      expect(component.caseDetails).toEqual(mockCaseView);
      expect(component.showAllocateRoleLink).toBe(true);
      expect(component.roleRouterLink).toBe('/allocate-role');
      expect(component.roleQueryParams).toEqual({ caseId: '1234567890123456' });
      expect(component.roleCategory).toBe(RoleCategory.JUDICIAL);
      expect(component.showAllocate).toBe(true);
      expect(component.linkText).toBe('Add a new role');
      expect(component.existingUsers).toEqual(['user1@example.com', 'user2@example.com']);
    });
  });

  describe('Template rendering', () => {
    beforeEach(() => {
      component.title = 'Judicial Roles';
      component.roles = mockRoles;
      component.caseDetails = mockCaseView;
      component.roleCategory = RoleCategory.JUDICIAL;
      component.roleRouterLink = '/allocate-role';
      component.roleQueryParams = { caseId: '1234567890123456' };
    });

    it('should display the title', () => {
      fixture.detectChanges();
      const titleElement = fixture.debugElement.query(By.css('h2.govuk-heading-m'));
      expect(titleElement).toBeTruthy();
      expect(titleElement.nativeElement.textContent).toBe('Judicial Roles');
    });

    it('should render case-roles-table component with correct inputs', () => {
      component.showAllocateRoleLink = true;
      fixture.detectChanges();

      caseRolesTable = fixture.debugElement.query(By.css('exui-case-roles-table'));
      expect(caseRolesTable).toBeTruthy();

      const tableComponent = caseRolesTable.componentInstance as MockCaseRolesTableComponent;
      expect(tableComponent.roles).toEqual(mockRoles);
      expect(tableComponent.roleCategory).toBe(RoleCategory.JUDICIAL);
      expect(tableComponent.caseDetails).toEqual(mockCaseView);
      expect(tableComponent.showAllocateRoleLink).toBe(true);
    });

    it('should show allocate-a-role-link when showAllocate is true', () => {
      component.showAllocate = true;
      component.showAllocateRoleLink = true;
      component.existingUsers = ['user1@example.com'];
      fixture.detectChanges();

      allocateRoleLink = fixture.debugElement.query(By.css('exui-allocate-a-role-link'));
      expect(allocateRoleLink).toBeTruthy();

      const linkComponent = allocateRoleLink.componentInstance as MockAllocateRoleLinkComponent;
      expect(linkComponent.routerLink).toBe('/allocate-role');
      expect(linkComponent.queryParams).toEqual({ caseId: '1234567890123456' });
      expect(linkComponent.showAllocateRoleLink).toBe(true);
      expect(linkComponent.roles).toEqual(mockRoles);
      expect(linkComponent.roleCategory).toBe(RoleCategory.JUDICIAL);
      expect(linkComponent.linkText).toBe('Allocate a role');
      expect(linkComponent.existingUsers).toEqual(['user1@example.com']);
    });

    it('should hide allocate-a-role-link when showAllocate is false', () => {
      component.showAllocate = false;
      fixture.detectChanges();

      allocateRoleLink = fixture.debugElement.query(By.css('exui-allocate-a-role-link'));
      expect(allocateRoleLink).toBeFalsy();
    });

    it('should use custom link text when provided', () => {
      component.showAllocate = true;
      component.linkText = 'Assign a new role';
      fixture.detectChanges();

      allocateRoleLink = fixture.debugElement.query(By.css('exui-allocate-a-role-link'));
      const linkComponent = allocateRoleLink.componentInstance as MockAllocateRoleLinkComponent;
      expect(linkComponent.linkText).toBe('Assign a new role');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty roles array', () => {
      component.title = 'No Roles';
      component.roles = [];
      component.caseDetails = mockCaseView;
      component.showAllocate = true;
      fixture.detectChanges();

      caseRolesTable = fixture.debugElement.query(By.css('exui-case-roles-table'));
      expect(caseRolesTable).toBeTruthy();
      expect(caseRolesTable.componentInstance.roles).toEqual([]);
    });

    it('should handle undefined roles', () => {
      component.title = 'Roles Section';
      component.roles = undefined;
      component.showAllocate = true;
      fixture.detectChanges();

      caseRolesTable = fixture.debugElement.query(By.css('exui-case-roles-table'));
      expect(caseRolesTable).toBeTruthy();
      expect(caseRolesTable.componentInstance.roles).toBeUndefined();
    });

    it('should handle undefined existingUsers', () => {
      component.showAllocate = true;
      component.existingUsers = undefined;
      fixture.detectChanges();

      allocateRoleLink = fixture.debugElement.query(By.css('exui-allocate-a-role-link'));
      expect(allocateRoleLink).toBeTruthy();
      expect(allocateRoleLink.componentInstance.existingUsers).toBeUndefined();
    });
  });
});