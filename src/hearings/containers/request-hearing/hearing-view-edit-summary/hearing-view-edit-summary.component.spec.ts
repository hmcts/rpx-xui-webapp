import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
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
        facilitiesRequired: initialState.hearings.hearingValues.serviceHearingValuesModel.facilitiesRequired,
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
});
