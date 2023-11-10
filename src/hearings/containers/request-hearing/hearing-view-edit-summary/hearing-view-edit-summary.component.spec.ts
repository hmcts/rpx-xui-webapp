import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import * as _ from 'lodash';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION, CategoryType, PartyType, UnavailabilityType } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import * as fromHearingStore from '../../../store';
import { HearingViewEditSummaryComponent } from './hearing-view-edit-summary.component';

describe('HearingViewEditSummaryComponent', () => {
  let component: HearingViewEditSummaryComponent;
  let fixture: ComponentFixture<HearingViewEditSummaryComponent>;
  let store: any;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  describe('getHearingRequestToCompare and getHearingRequest are holding different state, and other tests', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HearingViewEditSummaryComponent],
        providers: [
          LoadingService,
          provideMockStore({ initialState }),
          { provide: HearingsService, useValue: hearingsService }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(HearingViewEditSummaryComponent);
      store = TestBed.inject(Store);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call navigateAction when executeAction is called with a valid form', () => {
      component.executeAction(ACTION.VIEW_EDIT_REASON);
      expect(component.validationErrors.length).toEqual(0);
    });

    it('should set case id from hearing request and call setPropertiesUpdatedOnPageVisit method', () => {
      const storeDispatchSpy = spyOn(store, 'dispatch');
      spyOn(component, 'setPropertiesUpdatedOnPageVisit');
      component.ngOnInit();
      expect(component.caseId).toEqual('1234123412341234');
      expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.LoadHearingValues(component.caseId));
      expect(component.setPropertiesUpdatedOnPageVisit).toHaveBeenCalled();
    });

    it('should set propertiesUpdatedOnPageVisit', () => {
      spyOn(store, 'select').and.returnValue(of(initialState.hearings.hearingValues));
      component.setPropertiesUpdatedOnPageVisit();
      const expectedResult = {
        caseFlags: initialState.hearings.hearingValues.serviceHearingValuesModel.caseFlags,
        parties: initialState.hearings.hearingValues.serviceHearingValuesModel.parties
      };
      expect(hearingsService.propertiesUpdatedOnPageVisit).toEqual(expectedResult);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });

  describe('getHearingRequestToCompare and getHearingRequest state are same', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HearingViewEditSummaryComponent],
        providers: [
          provideMockStore({ initialState: { hearings: {} } }),
          { provide: HearingsService, useValue: hearingsService }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();

      fixture = TestBed.createComponent(HearingViewEditSummaryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should have a validation errors mapped when nothing has changed summary page', () => {
      component.ngOnInit();
      component.executeAction(ACTION.VIEW_EDIT_REASON);
      expect(component.validationErrors.length).toEqual(1);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });

  describe('setPropertiesUpdatedAutomatically', () => {
    let hearingValues: any;
    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [HearingViewEditSummaryComponent],
        providers: [
          LoadingService,
          provideMockStore({ initialState }),
          { provide: HearingsService, useValue: hearingsService }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
      fixture = TestBed.createComponent(HearingViewEditSummaryComponent);
      store = TestBed.inject(Store);
      component = fixture.componentInstance;
      fixture.detectChanges();
      hearingValues = _.cloneDeep(initialState.hearings.hearingValues);
    });

    it('should set case id from hearing request and call setPropertiesUpdatedAutomatically method', () => {
      const storeDispatchSpy = spyOn(store, 'dispatch');
      spyOn(component, 'setPropertiesUpdatedAutomatically');
      component.ngOnInit();
      expect(component.caseId).toEqual('1234123412341234');
      expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.LoadHearingValues(component.caseId));
      expect(component.setPropertiesUpdatedAutomatically).toHaveBeenCalled();
    });

    it('should update the case details properties automatically setPropertiesUpdatedAutomatically', () => {
      hearingValues.serviceHearingValuesModel.hmctsInternalCaseName = 'New hmcts case name from service hearings';
      hearingValues.serviceHearingValuesModel.publicCaseName = 'New public case name from service hearings';
      hearingValues.serviceHearingValuesModel.caseManagementLocationCode = 'New location code';
      hearingValues.serviceHearingValuesModel.caserestrictedFlag = true;
      const categories = [
        {
          categoryType: CategoryType.CaseType,
          categoryValue: 'BBA3-003'
        }, {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'BBA3-002CC',
          categoryParent: 'BBA3-003'
        }, {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'BBA3-002GC',
          categoryParent: 'BBA3-003'
        }, {
          categoryType: CategoryType.CaseSubType,
          categoryValue: 'BBA3-002RC',
          categoryParent: 'BBA3-003'
        }];
      hearingValues.serviceHearingValuesModel.caseCategories = [...categories];
      const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
      const storeDispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.setPropertiesUpdatedAutomatically();
      const expectedResult = { ...component.hearingRequestMainModel.caseDetails };
      expectedResult.hmctsInternalCaseName = 'New hmcts case name from service hearings';
      expectedResult.publicCaseName = 'New public case name from service hearings';
      expectedResult.caseManagementLocationCode = 'New location code';
      expectedResult.caserestrictedFlag = true;
      expectedResult.caseCategories = [...categories];
      expect(component.hearingRequestMainModel.caseDetails).toEqual(expectedResult);
      expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

      selectSpy.calls.reset();
      storeDispatchSpy.calls.reset();
    });

    it('should update the hearing details properties automatically setPropertiesUpdatedAutomatically', () => {
      hearingValues.serviceHearingValuesModel.privateHearingRequiredFlag = true;
      hearingValues.serviceHearingValuesModel.hearingInWelshFlag = true;
      const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
      const storeDispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.setPropertiesUpdatedAutomatically();
      const expectedResult = { ...component.hearingRequestMainModel.hearingDetails };
      expectedResult.privateHearingRequiredFlag = true;
      expectedResult.hearingInWelshFlag = true;
      expect(component.hearingRequestMainModel.hearingDetails).toEqual(expectedResult);
      expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

      selectSpy.calls.reset();
      storeDispatchSpy.calls.reset();
    });

    it('should update the party details properties automatically setPropertiesUpdatedAutomatically', () => {
      hearingValues.serviceHearingValuesModel.parties = [
        {
          partyID: 'P1',
          partyName: 'Jane and Smith',
          partyType: PartyType.IND,
          partyRole: 'New appellant',
          individualDetails: {
            title: 'Miss',
            firstName: 'Jane',
            lastName: 'Smith',
            reasonableAdjustments: [
              'RA0042',
              'RA0053',
              'RA0013',
              'RA0016',
              'RA0042',
              'RA0009'
            ],
            interpreterLanguage: 'PF0015',
            preferredHearingChannel: 'byVideo',
            relatedParties: [{
              relatedPartyID: 'New party Id',
              relationshipType: 'new releationship type'
            }],
            custodyStatus: 'New custody status',
            vulnerableFlag: true,
            vulnerabilityDetails: 'New vulnerability details',
            hearingChannelEmail: ['New email'],
            hearingChannelPhone: ['New Phone']
          },
          organisationDetails: {
            name: 'New organisation name',
            organisationType: 'New organisation type',
            cftOrganisationID: 'New organisation Id'
          },
          unavailabilityDOW: null,
          unavailabilityRanges: [
            {
              unavailableFromDate: '2021-12-10T09:00:00.000Z',
              unavailableToDate: '2021-12-31T09:00:00.000Z',
              unavailabilityType: UnavailabilityType.ALL_DAY
            }
          ]
        }
      ];
      hearingValues.serviceHearingValuesModel.hearingInWelshFlag = true;
      const selectSpy = spyOn(store, 'select').and.returnValue(of(hearingValues));
      const storeDispatchSpy = spyOn(store, 'dispatch');
      fixture.detectChanges();
      component.setPropertiesUpdatedAutomatically();
      const expectedResult = [
        {
          partyID: 'P1',
          partyName: 'Jane and Smith',
          partyType: PartyType.IND,
          partyRole: 'New appellant',
          individualDetails: {
            title: 'Miss',
            firstName: 'Jane',
            lastName: 'Smith',
            reasonableAdjustments: [
              'RA0042',
              'RA0053',
              'RA0013',
              'RA0016',
              'RA0042'
            ],
            interpreterLanguage: 'PF0015',
            preferredHearingChannel: 'inPerson',
            relatedParties: [{
              relatedPartyID: 'New party Id',
              relationshipType: 'new releationship type'
            }],
            custodyStatus: 'New custody status',
            vulnerableFlag: true,
            vulnerabilityDetails: 'New vulnerability details',
            hearingChannelEmail: ['New email'],
            hearingChannelPhone: ['New Phone']
          },
          organisationDetails: {
            name: 'New organisation name',
            organisationType: 'New organisation type',
            cftOrganisationID: 'New organisation Id'
          },
          unavailabilityDOW: null,
          unavailabilityRanges: [
            {
              unavailableFromDate: '2021-12-10T09:00:00.000Z',
              unavailableToDate: '2021-12-31T09:00:00.000Z',
              unavailabilityType: UnavailabilityType.ALL_DAY
            }
          ]
        },
        {
          partyID: "P2",
          partyName: "DWP",
          partyType: PartyType.ORG,
          partyRole: "claimant",
          individualDetails: {
            preferredHearingChannel: "byVideo",
            reasonableAdjustments: [
              "RA0005"
            ],
            interpreterLanguage: null
          },
          organisationDetails: {
            name: "DWP",
            organisationType: "GOV",
            cftOrganisationID: "O100000"
          },
          unavailabilityDOW: null,
          unavailabilityRanges: [
            {
              unavailableFromDate: "2021-12-20T09:00:00.000Z",
              unavailableToDate: "2021-12-31T09:00:00.000Z",
              unavailabilityType: UnavailabilityType.ALL_DAY
            }
          ]
        },
        {
          partyID: "P2",
          partyName: "DWP",
          partyType: PartyType.ORG,
          partyRole: "claimant",
          individualDetails: {
            preferredHearingChannel: "byVideo",
            reasonableAdjustments: [
              "RA0005"
            ],
            interpreterLanguage: null
          },
          organisationDetails: {
            name: "DWP",
            organisationType: "GOV",
            cftOrganisationID: "O100000"
          },
          unavailabilityDOW: null,
          unavailabilityRanges: [
            {
              unavailableFromDate: "2021-12-20T09:00:00.000Z",
              unavailableToDate: "2021-12-31T09:00:00.000Z",
              unavailabilityType: UnavailabilityType.ALL_DAY
            }
          ]
        }
      ];
      expect(component.hearingRequestMainModel.partyDetails).toEqual(expectedResult);
      expect(storeDispatchSpy).toHaveBeenCalledWith(new fromHearingStore.UpdateHearingRequest(component.hearingRequestMainModel, component.hearingCondition));

      selectSpy.calls.reset();
      storeDispatchSpy.calls.reset();
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
