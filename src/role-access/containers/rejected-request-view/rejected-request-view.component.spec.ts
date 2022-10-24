import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { PipesModule } from '@hmcts/ccd-case-ui-toolkit';
import { RoleCategory } from 'api/roleAccess/models/allocate-role.enum';
import { Observable, of } from 'rxjs';
import { CaseRoleDetails } from 'src/role-access/models';
import { AllocateRoleService } from 'src/role-access/services';
import { CaseworkerDataService, WASupportedJurisdictionsService } from 'src/work-allocation/services';
import { getMockCaseRoles } from 'src/work-allocation/tests/utils.spec';
import { RejectedRequestViewComponent } from '..';

describe('RejectedRequestViewComponent', () => {
  let component: RejectedRequestViewComponent;
  let fixture: ComponentFixture<RejectedRequestViewComponent>;

  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const mockSupportedJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockAllocateRoleService = jasmine.createSpyObj('allocateRoleService', ['getCaseRolesUserDetails']);
  const mockCaseworkerDataService = jasmine.createSpyObj('caseworkerDataService', ['getCaseworkersForServices']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [RejectedRequestViewComponent],
      imports: [PipesModule, HttpClientTestingModule],
      providers: [
        {provide: WASupportedJurisdictionsService, useValue: mockSupportedJurisdictionsService},
        {provide: AllocateRoleService, useValue: mockAllocateRoleService},
        {provide: CaseworkerDataService, useValue: mockCaseworkerDataService},
        {provide: Router, useValue: router},
        {
            provide: ActivatedRoute,
            useValue: {
              snapshot: {
                queryParams: {
                    caseName: 'case name',
                    caseReference: '123456789',
                    roleCategory: RoleCategory.JUDICIAL,
                    jurisdiction: 'IA',
                    // date of role created is actually date rejected, not originally requested
                    dateRejected: '01-01-2020',
                    infoRequired: false,
                    reviewer: null,
                    dateSubmitted: '01-01-2019',
                    specificAccessReason: 'I would like access'
                },
              },
            }
          },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedRequestViewComponent);
    component = fixture.componentInstance;
    const caseRoles: CaseRoleDetails[] = getMockCaseRoles();
    component.roleCategory = RoleCategory.JUDICIAL;
    mockCaseworkerDataService.getCaseworkersForServices.and.returnValue(of([]));
    mockAllocateRoleService.getCaseRolesUserDetails.and.returnValue(of(caseRoles));
    mockSupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA']))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should all the correct services for details', () => {
    expect(mockAllocateRoleService.getCaseRolesUserDetails).toHaveBeenCalled();
    component.roleCategory = RoleCategory.ADMIN;
    component.ngOnInit();
    expect(mockSupportedJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalled();
    expect(mockCaseworkerDataService.getCaseworkersForServices).toHaveBeenCalled();
  });

  it('should allow the user to go to request again', () => {
    component.goToRequest();
    expect(router.navigate).toHaveBeenCalledWith([`/cases/case-details/123456789/specific-access-request`]);
  });

  afterEach(() => {
    component = null;
    fixture.destroy();
  });

});
