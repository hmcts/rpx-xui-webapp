
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, Params } from '@angular/router';
import { CaseHearingsComponent } from './case-hearings.component';
import { RoleCategoryMappingServiceStub } from 'src/app/services/role-category-mapping/role-category-mapping.service.stub';
import { HearingListingStatusEnum, HearingsSectionStatusEnum, HMCStatus } from 'src/hearings/models/hearings.enum';
import { Observable, of } from 'rxjs';
import { RoleCategoryMappingService } from '../../../app/services/role-category-mapping/role-category-mapping.service';

export class ActivatedRouteMock {
  public paramMap = Observable.of(convertToParamMap({
    cid: '1234567890123456'
  }));
}

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let mockStore: any;
  let hearingStore: any;
  
  const initialState = {
    caseHearingsMainModel: {
      hmctsServiceID: undefined,
      caseRef: undefined,
      caseHearings: [{
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: HMCStatus.awaitingActuals,
      lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: HearingsSectionStatusEnum.UPCOMING,
      hearingDaySchedule: [],
      }, {
      hearingID: 'h555555',
      hearingType: 'Directions hearing',
      hmcStatus: HMCStatus.awaitingActuals,
      lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
      responseVersion: 'rv5',
      hearingListingStatus: HearingListingStatusEnum.CANCELLED,
      listAssistCaseStatus: HearingsSectionStatusEnum.PAST_AND_CANCELLED,
      hearingDaySchedule: [],
      }]
    },
    appConfig: {
      config: {},
      termsAndCondition: null,
      loaded: true,
      loading: true,
      termsAndConditions: null,
      isTermsAndConditionsFeatureEnabled: null,
      useIdleSessionTimeout: null,
      userDetails: {
        sessionTimeout: {
          idleModalDisplayTime: 0,
          totalIdleTime: 0
        },
        canShareCases: true,
        userInfo: {
          id: '',
          active: true,
          email: 'juser4@mailinator.com',
          forename: 'XUI test',
          roles: [
            'caseworker',
            'caseworker-ia-iacjudge',
            'caseworker-sscs',
            'caseworker-sscs-judge',
            'caseworker-test',
            'managePayment',
            'payments',
            'payments-refund',
            'payments-refund-approver',
            'pui-case-manager',
            'pui-finance-manager',
            'pui-organisation-manager',
            'pui-user-manager'
          ],
          uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
          surname: 'judge',
        },
      }
    }
  };

  beforeEach(() => {
    const mockActivatedRoute = new ActivatedRouteMock();
      mockStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
      hearingStore = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
      mockStore.pipe.and.returnValue(of(initialState));
      hearingStore.pipe.and.returnValue(of(initialState));
      const activate = mockActivatedRoute as ActivatedRoute;
      activate.snapshot = {
        params : {
          cid : '1234567890123456'
        } as Params
      } as ActivatedRouteSnapshot;

      const mockRoleCategoryMappingService = new RoleCategoryMappingServiceStub();
      component = new CaseHearingsComponent(mockStore, hearingStore, activate, mockRoleCategoryMappingService as RoleCategoryMappingService);
      component.ngOnInit();
  });

  it('should have a defined component', () => {
    expect(component).toBeDefined();
  });

  it('should list hearings with status off past and cancelled', async (done) => {
    component.pastAndCancelledHearings$.subscribe(result => {
      expect(result[0].listAssistCaseStatus).toEqual(HearingsSectionStatusEnum.PAST_AND_CANCELLED);
      done();
    });
  });

  it('should list hearings with status off upcoming', async (done) => {
    component.upcomingHearings$.subscribe(result => {
      expect(result[0].listAssistCaseStatus).toEqual(HearingsSectionStatusEnum.UPCOMING);
      done();
    });
  });
});
