import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CaseHearingsComponent } from './case-hearings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingListingStatusEnum, HearingsSectionStatusEnum } from 'src/hearings/models/hearings.enum';
// import { State } from 'src/app/store';
import { CaseHearingsListComponent } from 'src/cases/components';
import { CaseHearingsListComponentStub } from 'src/cases/components/case-hearings-list/case-hearings-list.component.stub';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { GetHelpComponent } from 'src/app/components';
import { MockRouter } from 'src/work-allocation/tests/utils.spec';
import { spy } from 'sinon';

export class ActivatedRouteMock extends ActivatedRoute {
  public paramMap = Observable.of(convertToParamMap({ 
      cid: '1234567890123456'
  }));
}

fdescribe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;
  let mockStore: any;
  let mockRouter: any;
  
  function getProducts(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(CaseHearingsListComponentStub));
  }

  const initialState =   {
        caseHearingsMainModel: {
          hmctsServiceID: undefined,
          caseRef: undefined,
          caseHearings: [{
          hearingID: 'h555555',
          hearingType: 'Directions hearing',
          hmcStatus: HearingsSectionStatusEnum.PAST_AND_CANCELLED,
          lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
          responseVersion: 'rv5',
          hearingListingStatus: HearingListingStatusEnum.CANCELLED,
          listAssistCaseStatus: '',
          hearingDaySchedule: [],
          }, {
            hearingID: 'h555555',
            hearingType: 'Directions hearing',
            hmcStatus: HearingsSectionStatusEnum.UPCOMING,
            lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
            responseVersion: 'rv5',
            hearingListingStatus: HearingListingStatusEnum.CANCELLED,
            listAssistCaseStatus: '',
            hearingDaySchedule: [],
            }]
        }   
    };


    // appConfig: {
    //   config: {},
    //   termsAndCondition: null,
    //   loaded: true,
    //   loading: true,
    //   termsAndConditions: null,
    //   isTermsAndConditionsFeatureEnabled: null,
    //   useIdleSessionTimeout: null,
    //   userDetails: {
    //     sessionTimeout: {
    //       idleModalDisplayTime: 0,
    //       totalIdleTime: 0
    //     },
    //     canShareCases: true,
    //     userInfo: {
    //       id: '',
    //       active: true,
    //       email: 'juser4@mailinator.com',
    //       forename: 'XUI test',
    //       roles: [
    //         'caseworker',
    //         'caseworker-ia-iacjudge',
    //         'caseworker-sscs',
    //         'caseworker-sscs-judge',
    //         'caseworker-test',
    //         'managePayment',
    //         'payments',
    //         'payments-refund',
    //         'payments-refund-approver',
    //         'pui-case-manager',
    //         'pui-finance-manager',
    //         'pui-organisation-manager',
    //         'pui-user-manager'
    //       ],
    //       uid: 'd90ae606-98e8-47f8-b53c-a7ab77fde22b',
    //       surname: 'judge',
    //     },
    //   }
    // }
  // };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaseHearingsComponent, CaseHearingsListComponentStub],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
      providers: [
        // provideMockStore({initialState}),
        {
          provide: Store,
          useValue: mockStore
        },
        {
          provide: ActivatedRoute,
          useValue: mockRouter
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
     // const mockService = jasmine.createSpyObj('ActivatedRoute', ['getTask']);
   // mockStore.pipe.and.returnValue(of(initialState));
  
    // spyOn(mockRouter2, 'snapshot').and.returnValue(
    //    { param: {
    //     cid: '1234567812345678'
    //   }});
    const mockActivatedRoute = new ActivatedRouteMock();

    // mockRouter = jasmine.createSpyObj('activatedRoute', ['snapshot']);
    // mockRouter.snapshot = {
    //   get: () => {
    //       return { param: {
    //         cid: '1234567812345678'
    //       }};
    //   }
  //};
   // mockRouter.snapshot.param.cid = '1234567812345678';
   
    fixture = TestBed.createComponent(CaseHearingsComponent);
    component = new CaseHearingsComponent(mockStore, mockActivatedRoute);
    de = fixture.debugElement;
    mockStore.pipe.and.returnValue(of(initialState));
    fixture.detectChanges();
  });

    it('Should product two listing components', () => {
      let header = getProducts();
      expect(header.length).toBeGreaterThan(1);
    });

    it('should list hearings with status off past and cancelled', async (done) => {
      component.pastAndCancelledHearings$.subscribe(result => {        
        console.log(result);      
          expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.PAST_AND_CANCELLED);
        done();
      });
    });

    it('should list hearings with status off upcoming', async (done) => {
      component.upcomingHearings$.subscribe(result => {        
        console.log(result);      
          expect(result[0].hmcStatus).toEqual(HearingsSectionStatusEnum.UPCOMING);
        done();
      });
    });
});
