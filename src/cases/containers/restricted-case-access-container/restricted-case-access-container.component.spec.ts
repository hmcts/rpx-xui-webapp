import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CASEWORKERS } from '../../../../api/test/pact/constants/work-allocation/caseworkers.spec';
import { CASEROLES } from '../../../../api/workAllocation/constants/roles.mock.data';
import { CaseReferencePipe } from '../../../hearings/pipes/case-reference.pipe';
import { AllocateRoleService } from '../../../role-access/services';
import { CaseworkerDataService, WASupportedJurisdictionsService } from '../../../work-allocation/services';
import { RestrictedCaseAccessContainerComponent } from './restricted-case-access-container.component';

describe('RestrictedCaseAccessContainerComponent', () => {
  let component: RestrictedCaseAccessContainerComponent;
  let fixture: ComponentFixture<RestrictedCaseAccessContainerComponent>;
  const mockAllocateService = jasmine.createSpyObj('AllocateRoleService', ['getCaseAccessRolesByCaseId']);
  const mockWASupportedJurisdictionsService = jasmine.createSpyObj('WASupportedJurisdictionsService', ['getWASupportedJurisdictions']);
  const mockCaseworkerDataService = jasmine.createSpyObj('CaseworkerDataService', ['getCaseworkersForServices']);
  const mockActivatedRoute = {
    snapshot: {
      params: {
        cid: '1234123412341234'
      }
    }
  };
  const mockRouter = {
    navigate: jasmine.createSpy()
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        RestrictedCaseAccessContainerComponent,
        CaseReferencePipe
      ],
      providers: [
        { provide: AllocateRoleService, useValue: mockAllocateService },
        { provide: WASupportedJurisdictionsService, useValue: mockWASupportedJurisdictionsService },
        { provide: CaseworkerDataService, useValue: mockCaseworkerDataService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    })
    .compileComponents();
    mockAllocateService.getCaseAccessRolesByCaseId.and.returnValue(of(CASEROLES));
    mockWASupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(of(['IA']));
    mockCaseworkerDataService.getCaseworkersForServices.and.returnValue(of([CASEWORKERS.JANE_DOE, CASEWORKERS.JOHN_SMITH]));
    fixture = TestBed.createComponent(RestrictedCaseAccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(mockAllocateService.getCaseAccessRolesByCaseId).toHaveBeenCalled();
    expect(mockWASupportedJurisdictionsService.getWASupportedJurisdictions).toHaveBeenCalled();
    expect(mockCaseworkerDataService.getCaseworkersForServices).toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should navigate to service down page if error', () => {
    mockWASupportedJurisdictionsService.getWASupportedJurisdictions.and.returnValue(throwError({status: 500}));
    component.ngOnInit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/', 'service-down']);
  });
});
