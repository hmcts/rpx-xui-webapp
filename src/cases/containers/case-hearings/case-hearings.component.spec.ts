import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store';
import { CaseHearingsComponent } from './case-hearings.component';
import { HearingListingStatusEnum } from '../../../hearings/models/hearings.enum';

describe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;

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
            hmcStatus: 'Past and cancelled',
            lastResponseReceivedDateTime: '2021-08-05T16:00:00.000+0000',
            responseVersion: 'rv5',
            hearingListingStatus: HearingListingStatusEnum.CANCELLED,
            listAssistCaseStatus: '',
            hearingDaySchedule: [],
          }]
        },
        lastError: null
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
      declarations: [CaseHearingsComponent],
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
    fixture.debugElement.queryAll(By.css('.govuk-table__cell'))[1];
  });

  it('should create hearing component', () => {
    expect(component).toBeTruthy();
  });

});
