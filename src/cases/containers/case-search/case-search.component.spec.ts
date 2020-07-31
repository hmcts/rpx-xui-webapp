import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CaseSearchComponent } from './case-search.component';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as fromCaseSearchStore from '../../store';
import { RouterTestingModule } from '@angular/router/testing';
import * as fromRoot from '../../../app/store/reducers';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { of } from 'rxjs';
import { Jurisdiction, CaseType, CaseState, SearchResultView, PaginationMetadata } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { ApplySearchFilterForES, SearchFilterToggle } from '../../store';

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;
  let storeDispatchMock: any;
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled']);

  const appConfigMock = {
    getPaginationPageSize: () => 10
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromCaseSearchStore.reducers),
        }),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        CaseSearchComponent
      ],
      providers: [
        { provide: AppConfig, useValue: appConfigMock },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        }
      ]
    }).compileComponents();

    store = TestBed.get(Store);

    storePipeMock = spyOn(store, 'pipe');
    storeDispatchMock = spyOn(store, 'dispatch');
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));

    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
    component.jurisdiction$ = storePipeMock.and.returnValue(of(new Jurisdiction()));
    component.caseType$ = storePipeMock.and.returnValue(of(new CaseType()));
    component.caseState$ = storePipeMock.and.returnValue(of(new CaseState()));
    component.resultView$ = storePipeMock.and.returnValue(of(new SearchResultView()));
    component.paginationMetadata$ = storePipeMock.and.returnValue(of(new PaginationMetadata()));
    component.metadataFields$ = storePipeMock.and.returnValue(of([]));
    fixture.detectChanges();
  });
  
  describe('applyChangePage()', () => {

    /**
     * We initially check that page is undefined, so that we know that calling the
     * findCaseListPaginationMetadata() function is definitely changing the components page property.
     */
    it('should update the components page property on page change.', () => {

      const event = {
        selected: {
          page: 2,
        }
      };

      component.applyChangePage(event);
      expect(component.page).toEqual(event.selected.page);
    });

    /**
     * Note that the findCaseListPaginationMetadata() dispatches an Action to get the
     * pagination metadata.
     */
    it('should call findCaseListPaginationMetadata() on page change.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      const event = {
        selected: {
          page: 1,
        }
      };

      component.applyChangePage(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });
  });

  describe('applyFilter()', () => {

    let event;

    beforeEach(() => {

      const jurisdiction = { id: 'PROBATE' };
      const caseType = { id: 'GrantOfRepresentation' };
      const caseState = { id: 'CaseCreated' };
      const metadataFields = ['[CASE_REFERENCE]'];
      const formGroupValues = {};
      const page = 1;

      event = component.getEvent();
    });

    it('should call findCaseListPaginationMetadata() on apply of filter.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();
      const spyOnGetEvent = spyOn(component, 'getEvent');

      event = {
        selected: {
          page: 2,
        }
      };

      component.applyFilter(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });

    it('should update the components page property on apply of a filter change.', () => {

      event = {
        selected: {
          page: 2,
        }
      };
      component.applyFilter(event);

      expect(component.page).toEqual(event.selected.page);
    });
  });

  describe('getElasticSearchResults', () => {

    it('should dispatch an action to get results from elastic search endpoint.', () => {
      const spyOnGetEvent = spyOn(component, 'getEvent').and.returnValue({});
      component.getElasticSearchResults();
      expect(storeDispatchMock).toHaveBeenCalledWith(new ApplySearchFilterForES({}));
    });
  });

  describe('toggleFilter()', () => {

    /**
     * TODO: We should always give the payload a proper name, not just payload.
     */
    it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
      component.showFilter = false;
      component.toggleFilter();
      expect(storeDispatchMock).toHaveBeenCalledWith(new SearchFilterToggle(true));
    });
  });

  describe('onPaginationSubscribeHandler()', () => {

    it('should update the components paginationMetadata property, on return of subscription.', () => {

      const paginationMetadata = new PaginationMetadata();
      paginationMetadata.total_pages_count = 33;
      paginationMetadata.total_results_count = 811;

      component.onPaginationSubscribeHandler(paginationMetadata);

      expect(component.paginationMetadata.total_pages_count).toEqual(paginationMetadata.total_pages_count);
      expect(component.paginationMetadata.total_results_count).toEqual(paginationMetadata.total_results_count);
    });
  });

});
