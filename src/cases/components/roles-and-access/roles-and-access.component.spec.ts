import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CaseNotifier, CaseView } from '@hmcts/ccd-case-ui-toolkit';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';

import { RolesAndAccessComponent } from './roles-and-access.component';
import { CaseRole, RoleExclusion } from '../../../role-access/models';
import { Caseworker } from '../../../work-allocation/models/dtos';

describe('RolesAndAccessComponent', () => {
  let component: RolesAndAccessComponent;
  let fixture: ComponentFixture<RolesAndAccessComponent>;
  let mockCaseNotifier: jasmine.SpyObj<CaseNotifier>;

  const mockCaseView: CaseView = {
    case_id: 'CASE123',
    metadataFields: [
      { id: '[JURISDICTION]', value: 'DIVORCE' }
    ]
  } as CaseView;

  const mockCaseworkers: Caseworker[] = [
    {
      idamId: 'user1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@test.com',
      location: null,
      roleCategory: RoleCategory.LEGAL_OPERATIONS
    },
    {
      idamId: 'user2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@test.com',
      location: null,
      roleCategory: RoleCategory.ADMIN
    },
    {
      idamId: 'user3',
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob.johnson@test.com',
      location: null,
      roleCategory: RoleCategory.CTSC
    }
  ];

  const mockRoles: CaseRole[] = [
    {
      actorId: 'user1',
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      roleName: 'legal-ops-role',
      created: '2023-01-01',
      id: 'role1',
      name: 'John Doe',
      location: 'Location 1',
      start: '2023-01-01',
      end: '2023-12-31',
      email: 'john.doe@test.com'
    },
    {
      actorId: 'user2',
      roleCategory: RoleCategory.ADMIN,
      roleName: 'admin-role',
      created: '2023-01-02',
      id: 'role2',
      name: 'Jane Smith',
      location: 'Location 2',
      start: '2023-01-01',
      end: '2023-12-31',
      email: 'jane.smith@test.com'
    },
    {
      actorId: 'user3',
      roleCategory: RoleCategory.CTSC,
      roleName: 'ctsc-role',
      created: '2023-01-03',
      id: 'role3',
      name: 'Bob Johnson',
      location: 'Location 3',
      start: '2023-01-01',
      end: '2023-12-31',
      email: 'bob.johnson@test.com'
    },
    {
      actorId: 'user4',
      roleCategory: RoleCategory.JUDICIAL,
      roleName: 'judicial-role',
      created: '2023-01-04',
      id: 'role4',
      name: 'Judge User',
      location: 'Location 4',
      start: '2023-01-01',
      end: '2023-12-31',
      email: 'judge@test.com'
    }
  ];

  const mockExclusions: RoleExclusion[] = [
    {
      actorId: 'user1',
      userType: RoleCategory.LEGAL_OPERATIONS,
      id: 'exclusion1',
      notes: 'Test exclusion',
      added: new Date('2023-01-01'),
      type: 'EXCLUDE',
      name: 'John Doe'
    },
    {
      actorId: 'user2',
      userType: RoleCategory.ADMIN,
      id: 'exclusion2',
      notes: 'Test exclusion 2',
      added: new Date('2023-01-02'),
      type: 'EXCLUDE',
      name: 'Jane Smith'
    }
  ];

  beforeEach(() => {
    mockCaseNotifier = jasmine.createSpyObj('CaseNotifier', ['removeCachedCase']);

    TestBed.configureTestingModule({
      declarations: [RolesAndAccessComponent],
      providers: [
        { provide: CaseNotifier, useValue: mockCaseNotifier }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(RolesAndAccessComponent);
    component = fixture.componentInstance;
    component.caseDetails = mockCaseView;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeInstanceOf(RolesAndAccessComponent);
      expect(component.caseDetails).toBeDefined();
    });

    it('should initialize with default values', () => {
      expect(component.exclusionsNotNamed).toBe(false);
      expect(component.legalRolesNotNamed).toBe(false);
      expect(component.ctscRolesNotNamed).toBe(false);
      expect(component.adminRolesNotNamed).toBe(false);
      expect(component.legalOpsRoles).toEqual([]);
      expect(component.ctscRoles).toEqual([]);
      expect(component.adminRoles).toEqual([]);
      expect(component.judicialRoles).toEqual([]);
      expect(component.exclusions).toEqual([]);
      expect(component.showAllocateRoleLink).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should set caseId from caseDetails', () => {
      component.ngOnInit();
      expect(component.caseId).toBe('CASE123');
    });

    it('should set jurisdiction from metadataFields', () => {
      component.ngOnInit();
      expect(component.jurisdiction).toBe('DIVORCE');
    });

    it('should handle missing jurisdiction field', () => {
      component.caseDetails = {
        case_id: 'CASE456',
        metadataFields: []
      } as CaseView;

      component.ngOnInit();
      expect(component.caseId).toBe('CASE456');
      expect(component.jurisdiction).toBeUndefined();
    });

    it('should handle null metadataFields', () => {
      component.caseDetails = {
        case_id: 'CASE789',
        metadataFields: null
      } as CaseView;

      expect(() => component.ngOnInit()).toThrow();
    });
  });

  describe('roles setter', () => {
    it('should filter roles by category when roles are set', () => {
      component.roles = mockRoles;

      expect(component.legalOpsRoles.length).toBe(1);
      expect(component.legalOpsRoles[0].roleCategory).toBe(RoleCategory.LEGAL_OPERATIONS);
      
      expect(component.adminRoles.length).toBe(1);
      expect(component.adminRoles[0].roleCategory).toBe(RoleCategory.ADMIN);
      
      expect(component.ctscRoles.length).toBe(1);
      expect(component.ctscRoles[0].roleCategory).toBe(RoleCategory.CTSC);
      
      expect(component.judicialRoles.length).toBe(1);
      expect(component.judicialRoles[0].roleCategory).toBe(RoleCategory.JUDICIAL);
    });

    it('should extract unique admin user IDs', () => {
      const rolesWithDuplicates = [
        ...mockRoles,
        {
          actorId: 'user2',
          roleCategory: RoleCategory.ADMIN,
          roleName: 'admin-role-2',
          created: '2023-01-05',
          id: 'role5',
          name: 'Jane Smith',
          location: 'Location 2',
          start: '2023-01-01',
          end: '2023-12-31',
          email: 'jane.smith@test.com'
        }
      ];

      component.roles = rolesWithDuplicates;
      expect(component.existingAdminUsers).toEqual(['user2']);
    });

    it('should extract unique CTSC user IDs', () => {
      const rolesWithDuplicates = [
        ...mockRoles,
        {
          actorId: 'user3',
          roleCategory: RoleCategory.CTSC,
          roleName: 'ctsc-role-2',
          created: '2023-01-05',
          id: 'role5',
          name: 'Bob Johnson',
          location: 'Location 3',
          start: '2023-01-01',
          end: '2023-12-31',
          email: 'bob.johnson@test.com'
        }
      ];

      component.roles = rolesWithDuplicates;
      expect(component.existingCTSCUsers).toEqual(['user3']);
    });

    it('should set showLegalOpsAllocate when showAllocateRoleLink is true and no legal ops roles', () => {
      component.showAllocateRoleLink = true;
      component.roles = [mockRoles[1], mockRoles[2], mockRoles[3]]; // No legal ops role

      expect(component.showLegalOpsAllocate).toBe(true);
    });

    it('should not set showLegalOpsAllocate when legal ops roles exist', () => {
      component.showAllocateRoleLink = true;
      component.roles = mockRoles;

      expect(component.showLegalOpsAllocate).toBe(false);
    });

    it('should handle null roles', () => {
      component.roles = null;

      expect(component.legalOpsRoles).toEqual([]);
      expect(component.adminRoles).toEqual([]);
      expect(component.ctscRoles).toEqual([]);
      expect(component.judicialRoles).toEqual([]);
    });

    it('should handle empty roles array', () => {
      component.roles = [];

      expect(component.legalOpsRoles).toEqual([]);
      expect(component.adminRoles).toEqual([]);
      expect(component.ctscRoles).toEqual([]);
      expect(component.judicialRoles).toEqual([]);
      expect(component.existingAdminUsers).toEqual([]);
      expect(component.existingCTSCUsers).toEqual([]);
    });
  });

  describe('removeCashedCase', () => {
    it('should call caseNotifier.removeCachedCase', () => {
      component.removeCashedCase();
      expect(mockCaseNotifier.removeCachedCase).toHaveBeenCalled();
    });
  });

  describe('ngOnChanges', () => {
    beforeEach(() => {
      component.caseworkers = mockCaseworkers;
    });

    it('should set legalRolesNotNamed when legal ops roles have no name', () => {
      component.legalOpsRoles = [{
        actorId: 'user1',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        roleName: 'role1',
        created: '2023-01-01',
        id: 'id1',
        name: '',
        location: 'Location 1',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user1@test.com'
      }];

      component.ngOnChanges();
      expect(component.legalRolesNotNamed).toBe(true);
    });

    it('should not set legalRolesNotNamed when legal ops roles have names', () => {
      component.legalOpsRoles = [{
        actorId: 'user1',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        roleName: 'role1',
        created: '2023-01-01',
        id: 'id1',
        name: 'John Doe',
        location: 'Location 1',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user1@test.com'
      }];

      component.ngOnChanges();
      expect(component.legalRolesNotNamed).toBe(false);
    });

    it('should set ctscRolesNotNamed when CTSC roles have no name', () => {
      component.ctscRoles = [{
        actorId: 'user3',
        roleCategory: RoleCategory.CTSC,
        roleName: 'role3',
        created: '2023-01-01',
        id: 'id3',
        name: '',
        location: 'Location 3',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user3@test.com'
      }];

      component.ngOnChanges();
      expect(component.ctscRolesNotNamed).toBe(true);
    });

    it('should set adminRolesNotNamed when admin roles have no name', () => {
      component.adminRoles = [{
        actorId: 'user2',
        roleCategory: RoleCategory.ADMIN,
        roleName: 'role2',
        created: '2023-01-01',
        id: 'id2',
        name: '',
        location: 'Location 2',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user2@test.com'
      }];

      component.ngOnChanges();
      expect(component.adminRolesNotNamed).toBe(true);
    });

    it('should set exclusionsNotNamed for non-judicial exclusions without names', () => {
      component.exclusions = [
        {
          actorId: 'user1',
          userType: RoleCategory.LEGAL_OPERATIONS,
          id: 'exclusion1',
          notes: 'Test',
          added: new Date('2023-01-01'),
          type: 'EXCLUDE',
          name: ''
        }
      ];

      component.ngOnChanges();
      expect(component.exclusionsNotNamed).toBe(true);
    });

    it('should not set exclusionsNotNamed for judicial exclusions', () => {
      component.exclusions = [
        {
          actorId: 'user4',
          userType: RoleCategory.JUDICIAL,
          id: 'exclusion2',
          notes: 'Test',
          added: new Date('2023-01-01'),
          type: 'EXCLUDE',
          name: ''
        }
      ];

      component.ngOnChanges();
      expect(component.exclusionsNotNamed).toBe(false);
    });

    it('should not set exclusionsNotNamed when exclusions have names', () => {
      component.exclusions = [
        {
          actorId: 'user1',
          userType: RoleCategory.LEGAL_OPERATIONS,
          id: 'exclusion1',
          notes: 'Test',
          added: new Date('2023-01-01'),
          type: 'EXCLUDE',
          name: 'John Doe'
        }
      ];

      component.ngOnChanges();
      expect(component.exclusionsNotNamed).toBe(false);
    });

    it('should call checkSetNamedRoles for legal ops roles when needed', () => {
      component.legalOpsRoles = [{
        actorId: 'user1',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        roleName: 'role1',
        created: '2023-01-01',
        id: 'id1',
        name: '',
        location: 'Location 1',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user1@test.com'
      }];
      component.legalRolesNotNamed = true;

      component.ngOnChanges();

      expect(component.namedLegalRoles).toBeDefined();
      expect(component.namedLegalRoles[0].name).toBe('John Doe');
    });

    it('should call checkSetNamedRoles for CTSC roles when needed', () => {
      component.ctscRoles = [{
        actorId: 'user3',
        roleCategory: RoleCategory.CTSC,
        roleName: 'role3',
        created: '2023-01-01',
        id: 'id3',
        name: '',
        location: 'Location 3',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user3@test.com'
      }];
      component.ctscRolesNotNamed = true;

      component.ngOnChanges();

      expect(component.namedCTSCRoles).toBeDefined();
      expect(component.namedCTSCRoles[0].name).toBe('Bob Johnson');
    });

    it('should call checkSetNamedRoles for admin roles when needed', () => {
      component.adminRoles = [{
        actorId: 'user2',
        roleCategory: RoleCategory.ADMIN,
        roleName: 'role2',
        created: '2023-01-01',
        id: 'id2',
        name: '',
        location: 'Location 2',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user2@test.com'
      }];
      component.adminRolesNotNamed = true;

      component.ngOnChanges();

      expect(component.namedAdminRoles).toBeDefined();
      expect(component.namedAdminRoles[0].name).toBe('Jane Smith');
    });

    it('should call checkSetNamedRoles for exclusions when needed', () => {
      component.exclusions = [{
        actorId: 'user1',
        userType: RoleCategory.LEGAL_OPERATIONS,
        id: 'exclusion1',
        notes: 'Test',
        added: new Date('2023-01-01'),
        type: 'EXCLUDE',
        name: ''
      }];
      component.exclusionsNotNamed = true;

      component.ngOnChanges();

      expect(component.namedExclusions).toBeDefined();
      expect(component.namedExclusions[0].name).toBe('John Doe');
    });

    it('should handle empty arrays in ngOnChanges', () => {
      component.legalOpsRoles = [];
      component.ctscRoles = [];
      component.adminRoles = [];
      component.exclusions = [];

      expect(() => component.ngOnChanges()).not.toThrow();
    });

    it('should handle null caseworkers in ngOnChanges', () => {
      component.caseworkers = null;
      component.legalOpsRoles = [{
        actorId: 'user1',
        roleCategory: RoleCategory.LEGAL_OPERATIONS,
        roleName: 'role1',
        created: '2023-01-01',
        id: 'id1',
        name: '',
        location: 'Location 1',
        start: '2023-01-01',
        end: '2023-12-31',
        email: 'user1@test.com'
      }];

      component.ngOnChanges();
      expect(component.namedLegalRoles).toBeUndefined();
    });
  });

  describe('checkSetNamedRoles', () => {
    beforeEach(() => {
      component.caseworkers = mockCaseworkers;
    });

    it('should add names to roles when notNamed is true', () => {
      const roles = [
        { actorId: 'user1' },
        { actorId: 'user2' }
      ];

      const result = component['checkSetNamedRoles'](roles, true);

      expect(result[0].name).toBe('John Doe');
      expect(result[1].name).toBe('Jane Smith');
    });

    it('should not modify roles when notNamed is false', () => {
      const roles = [
        { actorId: 'user1', name: 'Existing Name' }
      ];

      const result = component['checkSetNamedRoles'](roles, false);

      expect(result[0].name).toBe('Existing Name');
    });

    it('should handle roles with unknown actor IDs', () => {
      const roles = [
        { actorId: 'unknown-user' }
      ];

      const result = component['checkSetNamedRoles'](roles, true);

      expect(result[0].name).toBeUndefined();
    });

    it('should handle empty roles array', () => {
      const result = component['checkSetNamedRoles']([], true);
      expect(result).toEqual([]);
    });

    it('should handle null caseworker names', () => {
      component.caseworkers = [{
        idamId: 'user1',
        firstName: null,
        lastName: null,
        email: 'test@test.com',
        location: null,
        roleCategory: RoleCategory.LEGAL_OPERATIONS
      }];

      const roles = [{ actorId: 'user1' }];
      const result = component['checkSetNamedRoles'](roles, true);

      expect(result[0].name).toBe('');
    });

    it('should handle caseworker with missing names', () => {
      component.caseworkers = [{
        idamId: 'user1',
        firstName: undefined,
        lastName: undefined,
        email: 'test@test.com',
        location: null,
        roleCategory: RoleCategory.LEGAL_OPERATIONS
      }];

      const roles = [{ actorId: 'user1' }];
      const result = component['checkSetNamedRoles'](roles, true);

      expect(result[0].name).toBe('');
    });
  });

  describe('Input property bindings', () => {
    it('should accept exclusions input', () => {
      component.exclusions = mockExclusions;
      expect(component.exclusions).toEqual(mockExclusions);
    });

    it('should accept showAllocateRoleLink input', () => {
      component.showAllocateRoleLink = true;
      expect(component.showAllocateRoleLink).toBe(true);
    });

    it('should accept caseDetails input', () => {
      const newCaseDetails = { case_id: 'NEW123' } as CaseView;
      component.caseDetails = newCaseDetails;
      expect(component.caseDetails).toEqual(newCaseDetails);
    });

    it('should accept caseworkers input', () => {
      component.caseworkers = mockCaseworkers;
      expect(component.caseworkers).toEqual(mockCaseworkers);
    });
  });

  describe('Edge cases and error scenarios', () => {
    it('should handle roles with missing properties', () => {
      const incompleteRoles = [
        { actorId: 'user1' },
        { roleCategory: RoleCategory.ADMIN },
        {}
      ] as CaseRole[];

      component.roles = incompleteRoles;
      
      expect(component.legalOpsRoles.length).toBe(0);
      expect(component.adminRoles.length).toBe(1);
    });

    it('should handle very large arrays of roles', () => {
      const largeRolesArray = Array.from({ length: 1000 }, (_, i) => ({
        actorId: `user${i}`,
        roleCategory: i % 2 === 0 ? RoleCategory.ADMIN : RoleCategory.LEGAL_OPERATIONS,
        roleName: `role${i}`,
        created: '2023-01-01',
        id: `id${i}`,
        name: `User ${i}`,
        location: `Location ${i}`,
        start: '2023-01-01',
        end: '2023-12-31',
        email: `user${i}@test.com`
      }));

      component.roles = largeRolesArray;

      expect(component.adminRoles.length).toBe(500);
      expect(component.legalOpsRoles.length).toBe(500);
    });

    it('should preserve exclusionsNotNamed state when first exclusion has name', () => {
      component.exclusions = [
        {
          actorId: 'user1',
          userType: RoleCategory.LEGAL_OPERATIONS,
          id: 'exclusion1',
          notes: 'Test',
          added: new Date('2023-01-01'),
          type: 'EXCLUDE',
          name: 'Has Name'
        },
        {
          actorId: 'user2',
          userType: RoleCategory.ADMIN,
          id: 'exclusion2',
          notes: 'Test',
          added: new Date('2023-01-01'),
          type: 'EXCLUDE',
          name: ''
        }
      ];

      component.ngOnChanges();
      expect(component.exclusionsNotNamed).toBe(false);
    });
  });
});