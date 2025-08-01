import { CUSTOM_ELEMENTS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CaseState, CaseType, Jurisdiction, PaginationMetadata, SearchResultView } from '@hmcts/ccd-case-ui-toolkit';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { of } from 'rxjs';
import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import * as fromRoot from '../../../app/store/reducers';
import * as fromCaseSearchStore from '../../store';
import { CaseSearchComponent } from './case-search.component';

@Pipe({ name: 'rpxTranslate' })
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
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['isEnabled']);

  const appConfigMock = {
    getPaginationPageSize: () => 10
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromCaseSearchStore.reducers)
        })
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      declarations: [
        CaseSearchComponent,
        RpxTranslationMockPipe
      ],
      providers: [
        { provide: AppConfig, useValue: appConfigMock },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        }
      ]
    }).compileComponents();

    store = TestBed.inject(Store);

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
  }));

  describe('applyChangePage()', () => {
    /**
     * We initially check that page is undefined, so that we know that calling the
     * findCaseListPaginationMetadata() function is definitely changing the components page property.
     */
    it('should update the components page property on page change.', () => {
      const event = {
        selected: {
          page: 2
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
          page: 1
        }
      };

      component.applyChangePage(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });
  });

  describe('applyFilter()', () => {
    let event;

    beforeEach(() => {
      event = component.getEvent();
    });

    it('should call findCaseListPaginationMetadata() on apply of filter.', () => {
      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      event = {
        selected: {
          page: 2
        }
      };

      component.applyFilter(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });

    it('should update the components page property on apply of a filter change.', () => {
      event = {
        selected: {
          page: 2
        }
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
  });

  describe('toggleFilter()', () => {
    /**
     * TODO: We should always give the payload a proper name, not just payload.
     */
    it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
      component.showFilter = false;
      component.toggleFilter();
      expect(storeDispatchMock).toHaveBeenCalledWith(new fromCaseSearchStore.SearchFilterToggle(true));
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
  });

  describe('sort()', () => {
    it('should update sortParameters', () => {
      const sortParameters = {
        column: 'dummy',
        order: 0,
        type: 'Text'
      };

      component.sort(sortParameters);

      expect(component.sortParameters).toEqual(sortParameters);
    });
  });
});
