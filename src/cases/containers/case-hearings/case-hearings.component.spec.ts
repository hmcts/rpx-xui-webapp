import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CaseHearingsComponent } from './case-hearings.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HearingListingStatusEnum, HearingsSectionStatusEnum } from 'src/hearings/models/hearings.enum';
import { State } from 'src/app/store';
import { CaseHearingsListComponent } from 'src/cases/components';
import { CaseHearingsListComponentStub } from 'src/cases/components/case-hearings-list/case-hearings-list.component.stub';

fdescribe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;

  function getProducts(): Array<DebugElement> {
    return fixture.debugElement.queryAll(By.directive(CaseHearingsListComponentStub));
  }

  const initialState: State = {
    routerReducer: null,
    hearings: {
      hearingsList: {
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
      }    
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseHearingsComponent, CaseHearingsListComponentStub],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],      
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                cid: '1234'
              },
            }
          }
        },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
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

