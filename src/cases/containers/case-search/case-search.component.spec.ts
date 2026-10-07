import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseState, CaseType, Jurisdiction, PaginationMetadata, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import * as lzString from 'lz-string';
import { compressToUTF16 } from 'lz-string';
import { of } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import * as fromRoot from '../../../app/store/reducers';
import * as fromCaseSearchStore from '../../store';
import { CaseSearchComponent } from './case-search.component';

@Pipe({
  standalone: false,
  name: 'rpxTranslate',
})
class RpxTranslationMockPipe implements PipeTransform {
  public transform(value: string): string {
    return value;
  }
}

describe('CaseSearchComponent', () => {
  let fixture: ComponentFixture<CaseSearchComponent>;
  let component: CaseSearchComponent;
  let store: Store<fromCaseSearchStore.SearchState>;
  let storePipeMock: any;
  let storeDispatchMock: any;
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled', 'getValue']);

  const appConfigMock = {
    getPaginationPageSize: () => 10,
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromCaseSearchStore.reducers),
        }),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [CaseSearchComponent, RpxTranslationMockPipe],
      providers: [
        { provide: AppConfig, useValue: appConfigMock },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService,
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);

    storePipeMock = spyOn(store, 'pipe');
    storeDispatchMock = spyOn(store, 'dispatch');
    mockFeatureToggleService.isEnabled.and.returnValue(of(false));
    mockFeatureToggleService.getValue.and.returnValue(of(false));

    fixture = TestBed.createComponent(CaseSearchComponent);
    component = fixture.componentInstance;
    component.jurisdiction$ = storePipeMock.and.returnValue(of(new Jurisdiction()));
    component.caseType$ = storePipeMock.and.returnValue(of(new CaseType()));
    component.caseState$ = storePipeMock.and.returnValue(of(new CaseState()));
    component.resultView$ = storePipeMock.and.returnValue(of(new SearchResultView()));
    component.paginationMetadata$ = storePipeMock.and.returnValue(of(new PaginationMetadata()));
    component.metadataFields$ = storePipeMock.and.returnValue(of([]));
    fixture.detectChanges();
    storeDispatchMock.calls.reset();
    localStorage.clear();
  }));

  describe('applyChangePage()', () => {
    /**
     * We initially check that page is undefined, so that we know that calling the
     * findCaseListPaginationMetadata() function is definitely changing the components page property.
     */
    it('should update the components page property on page change.', () => {
      const event = {
        selected: {
          page: 2,
        },
      };

      component.applyChangePage(event);
      expect(component.page).toEqual(event.selected.page);
    });
  });

  describe('applyFilter()', () => {
    let event;

    beforeEach(() => {
      event = component.getEvent();
    });

    it('should update the components page property on apply of a filter change.', () => {
      event = {
        selected: {
          page: 2,
        },
      };
      component.applyFilter(event);

      expect(component.page).toEqual(event.selected.page);
    });
  });

  describe('getElasticSearchResults', () => {
    it('should dispatch an action to get results from elastic search endpoint.', () => {
      spyOn(component, 'getEvent').and.returnValue({});
      component.getElasticSearchResults();
      expect(storeDispatchMock).toHaveBeenCalledWith(new fromCaseSearchStore.ApplySearchFilterForES({}));
    });

    it('should not dispatch when no search event is available.', () => {
      spyOn(component, 'getEvent').and.returnValue(null);
      component.getElasticSearchResults();
      expect(storeDispatchMock).not.toHaveBeenCalled();
    });
  });

  describe('toggleFilter()', () => {
    it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
      component.showFilter = false;
      component.toggleFilter();
      expect(storeDispatchMock).toHaveBeenCalledWith(new fromCaseSearchStore.SearchFilterToggle(true));
    });
  });

  describe('getToggleButtonName()', () => {
    it('should return hide filter when the filter is shown.', () => {
      expect(component.getToggleButtonName(true)).toEqual('Hide Filter');
    });

    it('should return show filter when the filter is hidden.', () => {
      expect(component.getToggleButtonName(false)).toEqual('Show Filter');
    });
  });

  describe('onPaginationSubscribeHandler()', () => {
    it('should update the components paginationMetadata property, on return of subscription.', () => {
      const paginationMetadata = new PaginationMetadata();
      paginationMetadata.totalPagesCount = 33;
      paginationMetadata.totalResultsCount = 811;

      component.onPaginationSubscribeHandler(paginationMetadata);

      expect(component.paginationMetadata.totalPagesCount).toEqual(paginationMetadata.totalPagesCount);
      expect(component.paginationMetadata.totalResultsCount).toEqual(paginationMetadata.totalResultsCount);
    });

    it('should dispatch the search filter action when pagination metadata returns for non-elastic search.', () => {
      const event = { selected: { page: 1 } };
      const paginationMetadata = new PaginationMetadata();
      paginationMetadata.totalPagesCount = 33;
      paginationMetadata.totalResultsCount = 811;
      component.elasticSearchFlag = false;
      spyOn(component, 'getEvent').and.returnValue(event);

      component.onPaginationSubscribeHandler(paginationMetadata);

      expect(storeDispatchMock).toHaveBeenCalledWith(new fromCaseSearchStore.ApplySearchFilter(event));
    });

    it('should not dispatch when pagination metadata is undefined.', () => {
      component.elasticSearchFlag = false;
      spyOn(component, 'getEvent').and.returnValue({ selected: { page: 1 } });

      component.onPaginationSubscribeHandler(undefined);

      expect(storeDispatchMock).not.toHaveBeenCalled();
    });

    it('should not dispatch when pagination metadata has no page count.', () => {
      component.elasticSearchFlag = false;
      spyOn(component, 'getEvent').and.returnValue({ selected: { page: 1 } });

      component.onPaginationSubscribeHandler({ totalResultsCount: 811 });

      expect(storeDispatchMock).not.toHaveBeenCalled();
    });
  });

  describe('onResultsViewHandler()', () => {
    it('should initialise pagination metadata and hydrate results for elastic search.', () => {
      const resultView = {
        total: 21,
        columns: [
          {
            case_field_id: 'name',
            case_field_type: null,
            label: 'Case name',
            order: 1,
          },
        ],
        results: [{ case_id: '123', case_fields: { name: 'Test' } }],
        hasDrafts: () => true,
      };
      spyOn(component, 'onPaginationSubscribeHandler').and.callThrough();

      component.onResultsViewHandler(resultView);

      expect(component.onPaginationSubscribeHandler).toHaveBeenCalledWith({
        totalResultsCount: 21,
        totalPagesCount: 3,
      });
      expect(component.resultViewIsReady).toBe(true);
      expect(component.resultsArr).toEqual(resultView.results);
      expect(component.resultView.columns).toEqual(resultView.columns);
      expect(component.resultView.results).toEqual([
        {
          case_id: '123',
          case_fields: { name: 'Test' },
          hydrated_case_fields: null,
        },
      ]);
      expect(component.resultView.hasDrafts()).toBe(true);
    });

    it('should default result view fields when results, columns and hasDrafts are not provided.', () => {
      component.resultViewIsReady = false;

      component.onResultsViewHandler({ total: 0 });

      expect(component.resultViewIsReady).toBe(false);
      expect(component.resultsArr).toBeUndefined();
      expect(component.resultView.columns).toEqual([]);
      expect(component.resultView.results).toEqual([]);
      expect(component.resultView.hasDrafts()).toBe(false);
    });
  });

  describe('getEvent()', () => {
    it('should build a search event from local storage.', () => {
      const formGroupValue = { name: 'Smith' };
      const jurisdiction = { id: 'PROBATE' };
      const caseType = { id: 'GrantOfRepresentation' };
      const metadataFields = ['[STATE]'];
      component.page = 5;
      component.sortParameters = { column: 'name', order: 1, type: 'Text' };
      localStorage.setItem('search-form-group-value', JSON.stringify(formGroupValue));
      localStorage.setItem('search-jurisdiction', JSON.stringify(jurisdiction));
      localStorage.setItem('search-caseType', JSON.stringify(caseType));
      localStorage.setItem('search-metadata-fields', JSON.stringify(metadataFields));

      expect(component.getEvent()).toEqual({
        selected: {
          jurisdiction,
          caseType,
          metadataFields,
          formGroup: {
            value: formGroupValue,
          },
          page: 5,
          view: 'SEARCH',
        },
        sortParameters: component.sortParameters,
      });
    });

    it('should return null when local storage is incomplete.', () => {
      localStorage.setItem('search-form-group-value', JSON.stringify({ name: 'Smith' }));

      expect(component.getEvent()).toBeNull();
    });
  });

  describe('getCompressedLSItem()', () => {
    it('should read compressed JSON from local storage.', () => {
      localStorage.setItem('search-jurisdiction', compressToUTF16(JSON.stringify({ id: 'PROBATE' })));

      expect((component as any).getCompressedLSItem('search-jurisdiction')).toEqual({ id: 'PROBATE' });
    });

    it('should return null and log when compressed data cannot be read.', () => {
      const consoleLogSpy = jasmine.isSpy(console.log) ? (console.log as jasmine.Spy) : spyOn(console, 'log');
      spyOn(lzString, 'decompressFromUTF16').and.throwError('decompression failed');
      localStorage.setItem('search-jurisdiction', 'not compressed json');

      expect((component as any).getCompressedLSItem('search-jurisdiction')).toBeNull();
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('should return null when local storage item is empty.', () => {
      localStorage.setItem('search-jurisdiction', '');

      expect((component as any).getCompressedLSItem('search-jurisdiction')).toBeNull();
    });
  });

  describe('findCaseListPaginationMetadata()', () => {
    it('should dispatch an action when a search event is available.', () => {
      const event = { selected: { page: 1 } };
      spyOn(component, 'getEvent').and.returnValue(event);

      component.findCaseListPaginationMetadata();

      expect(storeDispatchMock).toHaveBeenCalledWith(new fromCaseSearchStore.FindSearchPaginationMetadata(event));
    });

    it('should not dispatch when no search event is available.', () => {
      spyOn(component, 'getEvent').and.returnValue(null);

      component.findCaseListPaginationMetadata();

      expect(storeDispatchMock).not.toHaveBeenCalled();
    });
  });

  describe('triggerQuery()', () => {
    it('should find pagination metadata when elastic search is disabled.', () => {
      component.elasticSearchFlag = false;
      spyOn(component, 'findCaseListPaginationMetadata');

      component.applyChangePage({ selected: { page: 2 } });

      expect(component.findCaseListPaginationMetadata).toHaveBeenCalled();
    });
  });

  describe('sort()', () => {
    it('should update sortParameters', () => {
      const sortParameters = {
        column: 'dummy',
        order: 0,
        type: 'Text',
      };

      component.sort(sortParameters);

      expect(component.sortParameters).toEqual(sortParameters);
    });
  });
});
