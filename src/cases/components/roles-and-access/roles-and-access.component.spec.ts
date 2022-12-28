import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AbstractAppConfig, AlertService, AuthService, CaseNotifier, CasesService, HttpErrorService } from '@hmcts/ccd-case-ui-toolkit';
import { ExuiCommonLibModule } from '@hmcts/rpx-xui-common-lib';
import { AllocateARoleLinkComponent, RoleAccessSectionComponent } from '..';
import { CASEROLES } from '../../../../api/workAllocation/constants/roles.mock.data';
import { CaseRolesTableComponent } from '../../../role-access/components/case-roles-table/case-roles-table.component';
import { ExclusionsTableComponent } from '../../../role-access/components/exclusions-table/exclusions-table.component';
import { CaseRole, RoleCategory, RoleExclusion } from '../../../role-access/models';
import { Caseworker } from '../../../work-allocation/models/dtos';
import { ShowAllocateLinkDirective } from '../../directives/show-allocate-link.directive';
import { RolesAndAccessComponent } from './roles-and-access.component';
import 'mocha';

describe('RolesAndAccessComponent', () => {
  let component: RolesAndAccessComponent;
  let fixture: ComponentFixture<RolesAndAccessComponent>;
  const mockNotifierService = jasmine.createSpyObj('caseNotifier', ['cachedCaseView']);
  mockNotifierService.cachedCaseView = {};
  component = new RolesAndAccessComponent(mockNotifierService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([]), ExuiCommonLibModule, HttpClientTestingModule, HttpClientModule],
      declarations: [
        RolesAndAccessComponent,
        CaseRolesTableComponent,
        ShowAllocateLinkDirective,
        ExclusionsTableComponent,
        RoleAccessSectionComponent,
        AllocateARoleLinkComponent
      ],
      providers: [
        { provide: CaseNotifier, useValue: mockNotifierService }, CasesService, HttpErrorService, AuthService, AbstractAppConfig, AlertService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesAndAccessComponent);
    component = fixture.componentInstance;
    component.roles = CASEROLES as CaseRole[];
    component.caseDetails = {
      case_id: '1',
      case_type: {
        id: 'TestAddressBookCase',
        name: 'Test Address Book Case',
        jurisdiction: {
          id: 'TEST',
          name: 'Test',
        }
      },
      channels: [],
      state: {
        id: 'CaseCreated',
        name: 'Case created'
      },
      tabs: [],
      triggers: [],
      events: [],
      metadataFields: []
    };
    component.showAllocateRoleLink = false;
    fixture.detectChanges();
  });

  it('should display case-roles-table', () => {
    const container: HTMLElement = fixture.debugElement.nativeElement as HTMLElement;
    expect(container.querySelector('exui-case-roles-table')).not.toBeNull();
  });

  it('should have return case Id', () => {
    expect(component.caseId).toBe('1');
  });

  const mockCaseworkers: Caseworker[] = [
    {
      idamId: '12341',
      firstName: 'A',
      lastName: 'Test',
      email: 'a@test.com',
      location: null,
      roleCategory: RoleCategory.LEGAL_OPERATIONS
    },
    {
      idamId: '12342',
      firstName: 'B',
      lastName: 'Test',
      email: 'b@test.com',
      location: null,
      roleCategory: RoleCategory.LEGAL_OPERATIONS
    },
    {
      idamId: '12343',
      firstName: 'C',
      lastName: 'Test',
      email: 'c@test.com',
      location: null,
      roleCategory: RoleCategory.ADMIN
    },
    {
      idamId: '12344',
      firstName: 'D',
      lastName: 'Test',
      email: 'd@test.com',
      location: null,
      roleCategory: RoleCategory.LEGAL_OPERATIONS
    }
  ];

  it('should set names for unnamed legal ops roles', () => {
    const mockLegalOpsRoles: CaseRole[] = [{
      id: '1',
      name: undefined,
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      location: null,
      start: null,
      end: null,
      actorId: '12341',
      actions: [],
      email: null
    },
    {
      id: '2',
      name: undefined,
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      location: null,
      start: null,
      end: null,
      actorId: '12342',
      actions: [],
      email: null
    },
    {
      id: '3',
      name: undefined,
      roleCategory: RoleCategory.ADMIN,
      location: null,
      start: null,
      end: null,
      actorId: '12343',
      actions: [],
      email: null
    },
    {
      id: '4',
      name: undefined,
      roleCategory: RoleCategory.LEGAL_OPERATIONS,
      location: null,
      start: null,
      end: null,
      actorId: '12344',
      actions: [],
      email: null
    }];
    component.caseworkers = mockCaseworkers;
    component.legalOpsRoles = mockLegalOpsRoles;
    component.ngOnChanges();
    expect(component.namedLegalRoles).toBeDefined();
    expect(component.namedLegalRoles[0].name).toBe('A Test');
    expect(component.namedLegalRoles[1].name).toBe('B Test');
    expect(component.namedLegalRoles[2].name).toBe('C Test');
    expect(component.namedLegalRoles[3].name).toBe('D Test');
  });

  it('should set names for unnamed exclusions', () => {
    const mockExclusions: RoleExclusion[] = [{
      id: '1',
      name: undefined,
      actorId: '12341',
      email: null,
      type: 'test',
      userType: RoleCategory.LEGAL_OPERATIONS,
      notes: null,
      added: null
    },
    {
      id: '2',
      name: undefined,
      actorId: '12342',
      email: null,
      type: 'test',
      userType: RoleCategory.LEGAL_OPERATIONS,
      notes: null,
      added: null
    },
    {
      id: '3',
      name: undefined,
      actorId: '12343',
      email: null,
      type: 'test',
      userType: RoleCategory.ADMIN,
      notes: null,
      added: null
    },
    {
      id: '4',
      name: undefined,
      actorId: '12344',
      email: null,
      type: 'test',
      userType: RoleCategory.LEGAL_OPERATIONS,
      notes: null,
      added: null
    }];
    component.caseworkers = mockCaseworkers;
    component.exclusions = mockExclusions;
    component.ngOnChanges();
    expect(component.namedExclusions).toBeDefined();
    expect(component.namedExclusions[0].name).toBe('A Test');
    expect(component.namedExclusions[1].name).toBe('B Test');
    expect(component.namedExclusions[2].name).toBe('C Test');
    expect(component.namedExclusions[3].name).toBe('D Test');
  });
});
