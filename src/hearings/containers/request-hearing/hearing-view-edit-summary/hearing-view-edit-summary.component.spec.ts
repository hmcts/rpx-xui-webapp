import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { LoadingService } from '@hmcts/ccd-case-ui-toolkit';
import { initialState } from '../../../hearing.test.data';
import { ACTION } from '../../../models/hearings.enum';
import { HearingsService } from '../../../services/hearings.service';
import { HearingViewEditSummaryComponent } from './hearing-view-edit-summary.component';
import { Section } from '../../../../hearings/models/section';
import { ScreenNavigationModel } from '../../../../hearings/models/screenNavigation.model';

describe('HearingViewEditSummaryComponent', () => {
  let component: HearingViewEditSummaryComponent;
  let fixture: ComponentFixture<HearingViewEditSummaryComponent>;
  const mockedHttpClient = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const hearingsService = new HearingsService(mockedHttpClient);
  hearingsService.navigateAction$ = of(ACTION.CONTINUE);

  describe('getHearingRequestToCompare and getHearingRequest are holding different state', () => {
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

    it('should call removeUnnecessarySummaryTemplateItems in ngOnInit', () => {
      const rmvSummaryTemp = spyOn(component, 'removeUnnecessarySummaryTemplateItems');
      component.ngOnInit();
      expect(rmvSummaryTemp).toHaveBeenCalled();
    });

    it('should call getScreenFlowFromStore ', () => {
      const store = [{ screenName: 'hearing-link', navigation: [] }];
      const screenFlow = spyOn(component, 'getScreenFlowFromStore').and.returnValue(of(store));
      component.removeUnnecessarySummaryTemplateItems();
      expect(screenFlow).toHaveBeenCalled();
    });

    it('should display fewer items when screenFlow is less', () => {
      component.removeUnnecessarySummaryTemplateItems();
      fixture.detectChanges();
      component.getScreenFlowFromStore().subscribe((scr) => {
        const originalViewEditsFlow = scr?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow;
        expect(component.screenFlow.length).toEqual(originalViewEditsFlow.length);
        expect(component.template.length).toEqual(originalViewEditsFlow.length + 2);

        const reducedSreeenFlowFlow = [scr?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow[1]];
        component.template = component.template.filter((tl: Section) => {
          return reducedSreeenFlowFlow.some((sr: ScreenNavigationModel) => {
            return tl.screenName.includes(sr.screenName) || tl.screenName.includes('edit-hearing') || tl.screenName.includes('hearing-listing-info');
          });
        });
        fixture.detectChanges();
        expect(component.template.length).toEqual(3);
      });
    });

    it('should display zero item if screen flow is empty', () => {
      component.removeUnnecessarySummaryTemplateItems();
      fixture.detectChanges();
      component.getScreenFlowFromStore().subscribe((scr) => {
        const originalsFlow = scr?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow;
        expect(component.screenFlow.length).toEqual(originalsFlow.length);
        expect(component.template.length).toEqual(originalsFlow.length + 2);

        const reducedSreeenFlowFlow = [scr?.hearings?.hearingValues?.serviceHearingValuesModel?.screenFlow[1]];
        component.template = component.template.filter((tl: Section) => {
          return reducedSreeenFlowFlow.some((sr: ScreenNavigationModel) => {
            return tl.screenName.includes(sr.screenName + 'fake-name');
          });
        });
        fixture.detectChanges();
        expect(component.template.length).toEqual(0);
      });
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
      component.executeAction(ACTION.VIEW_EDIT_REASON);
      expect(component.validationErrors.length).toEqual(1);
    });

    afterEach(() => {
      fixture.destroy();
    });
  });
});
