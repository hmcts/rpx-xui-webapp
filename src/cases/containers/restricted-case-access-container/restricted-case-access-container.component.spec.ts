import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
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
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
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
  });
});
