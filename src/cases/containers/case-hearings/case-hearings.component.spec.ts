import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from 'src/app/store';
import * as fromFeature from '../../store';
import { CaseHearingsComponent } from './case-hearings.component';

fdescribe('CaseHearingsComponent', () => {
  let component: CaseHearingsComponent;
  let fixture: ComponentFixture<CaseHearingsComponent>;
  let de: DebugElement;
  let mockStore: MockStore<State>;
  let dispatchSpy: jasmine.Spy;
  let store: Store<fromFeature.State>;

  const initialState: State = {
    routerReducer: null,
    hearings: {
      hearingsList: {
        caseHearingsMainModel: {
          hmctsServiceID: undefined,
          caseRef: undefined,
          caseHearings:  [{
            hearingID: '1',
            hearingType: 'Final hearing',
            hmcStatus: 'LISTED',
            lastResponseReceivedDateTime: '12TH October 2021',
            responseVersion: 'string',
            hearingListingStatus: 'COMPLETED',
            listAssistCaseStatus: 'COMPLETED',
            hearingDaySchedule: []
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
      declarations: [ CaseHearingsComponent ],
      providers: [
        provideMockStore({initialState}),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: {
                cid: '1234'
              }  
            }
          }
        },
      ]
    })
    .compileComponents();
    // mockStore = TestBed.get(Store);   
    // dispatchSpy = spyOn(mockStore, 'dispatch');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaseHearingsComponent);
    component = fixture.componentInstance;
    // const mockHearing = [];
    // mockHearing.push({ 
    //   hmctsServiceID: '1',
    //   caseRef : 'Upcoming',
    //   caseHearings: [{
    //     hearingID: '1',
    //     hearingType: 'Final hearing',
    //     hmcStatus: 'LISTED',
    //     lastResponseReceivedDateTime: '12TH October 2021',
    //     responseVersion: 'string',
    //     hearingListingStatus: 'COMPLETED',
    //     listAssistCaseStatus: 'COMPLETED',
    //     hearingDaySchedule: []
    //     }]
    // });
   //  component.caseHearing = mockHearing;
    de = fixture.debugElement;
    fixture.detectChanges();
    fixture.debugElement.queryAll(By.css('.govuk-table__cell'))[1];
  });

  it('should create hearing component', () => {
    
    expect(component).toBeTruthy();
  });

  it('Should have the correct value for status in the markup', () => {
    var secondColumn = fixture.debugElement.queryAll(By.css('.govuk-table__cell'));
    expect(secondColumn.length).toEqual(3);
    // const secondColumn = fixture.debugElement.queryAll(By.css('.govuk-table__cell strong'))[0];
    // expect(secondColumn.nativeElement.innerHTML).toEqual('COMPLETED');
   // expect(secondColumn.nativeElement.className).toEqual('TORQUISE');
  });

  it('Should have the requested hearing when request button is clicked', () => {
    spyOn(component.requestHearing, 'emit');

    const requestHearingButton = fixture.debugElement.queryAll(By.css('.govuk-button--start'))[0];
    requestHearingButton.triggerEventHandler('click', null);
    expect(requestHearingButton).toBeTruthy();
    expect(component.requestHearing.emit).toHaveBeenCalled();;
  });

  // it('Should have the requested to view hearing when view link is clicked', () => {
  //   spyOn(component.viewHearing, 'emit');

  //   const viewHearingButton = fixture.debugElement.queryAll(By.css('.govuk-table__cell a'))[0];
  //   viewHearingButton.triggerEventHandler('click', null);
  //   expect(viewHearingButton).toBeTruthy();
  //   expect(component.viewHearing.emit).toHaveBeenCalled();
  // });

  // it('Should have the requested to cancel hearing when cancel link is clicked', () => {
  //   spyOn(component.cancelHearing, 'emit');

  //   const cancelHearingButton = fixture.debugElement.queryAll(By.css('.govuk-table__cell a'))[1];
  //   cancelHearingButton.triggerEventHandler('click', null);
  //   expect(cancelHearingButton).toBeTruthy();
  //   expect(component.cancelHearing.emit).toHaveBeenCalled();
  // });
});
