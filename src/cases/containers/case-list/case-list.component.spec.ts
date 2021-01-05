import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PaginationMetadata, SearchResultViewItem, WindowService } from '@hmcts/ccd-case-ui-toolkit';
import { DefinitionsService } from '@hmcts/ccd-case-ui-toolkit/dist/shared/services/definitions/definitions.service';
import { FeatureToggleService } from '@hmcts/rpx-xui-common-lib';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';

import { AppConfig } from '../../../app/services/ccd-config/ccd-case.config';
import { State } from '../../../app/store/reducers';
import * as converts from '../../converters/case-converter';
import {
  AddShareCases,
  ApplyCaselistFilterForES,
  CaseFilterToggle,
  FindCaselistPaginationMetadata,
  SynchronizeStateToStore,
} from '../../store/actions';
import { CaseListComponent } from './case-list.component';

describe('CaseListComponent', () => {
  let component: CaseListComponent;
  let fixture: ComponentFixture<CaseListComponent>;
  let store: MockStore<State>;

  /**
   * Spies
   */
  let spyOnDispatchToStore = jasmine.createSpy();
  let spyOnPipeToStore = jasmine.createSpy();

  const mockDefinitionsService = jasmine.createSpyObj('DefinitionsService', ['getJurisdictions']);
  const mockAppConfig = jasmine.createSpyObj('AppConfig', ['getPaginationPageSize']);
  const mockWindowService = jasmine.createSpyObj('WindowService', ['removeLocalStorage']);
  const mockFeatureToggleService = jasmine.createSpyObj('FeatureToggleService', ['getValue', 'isEnabled']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CaseListComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: AppConfig,
          useValue: mockAppConfig
        },
        {
          provide: DefinitionsService,
          useValue: mockDefinitionsService
        },
        {
          provide: WindowService,
          useValue: mockWindowService
        },
        {
          provide: FeatureToggleService,
          useValue: mockFeatureToggleService
        },
        provideMockStore(),
      ]
    });
    store = TestBed.get(Store);
    spyOnDispatchToStore = spyOn(store, 'dispatch').and.callThrough();
    spyOnPipeToStore = spyOn(store, 'pipe').and.callThrough();
    mockFeatureToggleService.getValue.and.returnValue(of(['dummy']));
    mockFeatureToggleService.isEnabled.and.returnValue(of(true));

    fixture = TestBed.createComponent(CaseListComponent);
    component = fixture.componentInstance;
  }));

  describe('ngOnInit()', () => {
    it('should make internal function calls', () => {
      spyOnPipeToStore.and.returnValue(of({}));
      spyOn(component, 'setCaseListFilterDefaults').and.callThrough();
      spyOn(component, 'listenToPaginationMetadata').and.callThrough();
      spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      mockDefinitionsService.getJurisdictions.and.returnValue(of([{
        id: 'some id',
        caseTypes: [{
          id: 'some id',
          states: [{
            id: 'some id'
          }]
        }]
      }]));

      component.ngOnInit();

      expect(component.setCaseListFilterDefaults).toHaveBeenCalled();
      expect(component.listenToPaginationMetadata).toHaveBeenCalled();
      expect(component.findCaseListPaginationMetadata).toHaveBeenCalled();
    });
  });

  describe('getToggleButtonName()', () => {

    it('should return the toggle button name as \'Hide Filter\' if we have shown ' +
      'the filter', () => {
        expect(component.getToggleButtonName(true)).toEqual('Hide Filter');
      });

    it('should return the toggle button name as \'Show Filter\' if we do not show ' +
      'the filter', () => {
        expect(component.getToggleButtonName(false)).toEqual('Show Filter');
      });
  });

  describe('findCaseListPaginationMetadata()', () => {

    /**
     * TODO: event should show the shape of event object.
     */
    it('should dispatch an action to find the case list pagination metadata.', () => {
      const event = {
        test: 'test',
      };
      component.findCaseListPaginationMetadata(event);
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new FindCaselistPaginationMetadata(event));
    });
  });

  describe('getElasticSearchResults', () => {

    it('should dispatch an action to get results from elastic search endpoint.', () => {
      const event = {
        test: 'test',
      };
      component.getElasticSearchResults(event);
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new ApplyCaselistFilterForES(event));
    });
  });

  describe('toggleFilter()', () => {

    /**
     * TODO: We should always give the payload a proper name, not just payload.
     */
    it('should dispatch an action on toggle of the filter to show and hide the filter.', () => {
      component.toggleFilter();
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new CaseFilterToggle(true));
    });
  });

  describe('createEvent()', () => {

    /**
     * We should think about calling the createEvent function
     * makePaginationMetadataQuery as it's only used to find the Case List Pagination
     * Metadata.
     */
    it('should be able to create an event.', () => {

      const jurisdiction = { id: 'PROBATE' };
      const caseType = { id: 'GrantOfRepresentation' };
      const caseState = { id: 'CaseCreated' };
      const metadataFields = ['[CASE_REFERENCE]'];
      const formGroupValues = {};
      const page = 1;

      const event = component.createEvent(jurisdiction, caseType, caseState, metadataFields,
        formGroupValues, page, null);

      expect(event.selected.jurisdiction).toEqual(jurisdiction);
      expect(event.selected.caseType).toEqual(caseType);
      expect(event.selected.caseState).toEqual(caseState);
      expect(event.selected.metadataFields).toEqual(metadataFields);
      expect(event.selected.formGroup.value).toEqual(formGroupValues);
      expect(event.selected.page).toEqual(page);
    });
  });

  describe('applyChangePage()', () => {

    /**
     * We initially check that page is undefined, so that we know that calling the
     * findCaseListPaginationMetadata() function is definitely changing the components page property.
     */
    it('should update the components page property on page change.', () => {

      expect(component.page).toBeUndefined();

      const event = {
        selected: {
          page: 1,
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

    it('should call getElasticSearchResults() on page change and LD elastic search enabled.', () => {

      const spyOnGetElasticSearchResults = spyOn(component, 'getElasticSearchResults').and.callThrough();

      const event = {
        selected: {
          page: 1,
        }
      };
      component.elasticSearchFlag = true;
      component.applyChangePage(event);

      expect(spyOnGetElasticSearchResults).toHaveBeenCalled();
      component.elasticSearchFlag = false;
    });


    it('should call findCaseListPaginationMetadata() on page change with values from localStorage.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      const event = {
        selected: {
          page: 1,
        }
      };

      const localStorageGetItemSpy = spyOn(localStorage, 'getItem');
      component.savedQueryParams = { id: '' };
      localStorageGetItemSpy.and.returnValue('{' +
        '"jurisdiction": "Probate", ' +
        '"case-type": "GrantOfRepresentation", ' +
        '"case-state": "BOReadyToIssue"' +
        '}');

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

      event = component.createEvent(jurisdiction, caseType, caseState, metadataFields,
        formGroupValues, page, null);
    });

    it('should call findCaseListPaginationMetadata() on apply of filter.', () => {

      const spyOnFindCaseListPaginationMetadata = spyOn(component, 'findCaseListPaginationMetadata').and.callThrough();

      component.applyFilter(event);

      expect(spyOnFindCaseListPaginationMetadata).toHaveBeenCalled();
    });

    it('should call getElasticSearchResults() on apply of filter and LD elastic search enabled.', () => {

      const spyOnGetElasticSearchResults = spyOn(component, 'getElasticSearchResults').and.callThrough();

      component.elasticSearchFlag = true;
      component.applyFilter(event);

      expect(spyOnGetElasticSearchResults).toHaveBeenCalled();
      component.elasticSearchFlag = false;
    });

    it('should update the components page property on apply of a filter change.', () => {

      expect(component.page).toBeUndefined();

      component.applyFilter(event);

      expect(component.page).toEqual(event.selected.page);
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

  describe('onToogleHandler()', () => {

    it('should update the components showFilter property, on return of toogle subscription.', () => {

      const showFilter = true;
      component.onToogleHandler(showFilter);

      expect(component.showFilter).toEqual(showFilter);
    });
  });

  describe('onFilterSubscriptionHandler()', () => {

    it('should update the components jurisdiction property, on return of the filter subscription.', () => {

      const filterResult = [
        { id: 'PROBATE' },
        { id: 'GrantOfRepresentation' },
        { id: 'SolAppUpdated' },
        ['[CASE_REFERENCE]']
      ];

      component.onFilterSubscriptionHandler(filterResult);

      expect(component.jurisdiction.id).toEqual('PROBATE');
      expect(component.caseType.id).toEqual('GrantOfRepresentation');
      expect(component.caseState.id).toEqual('SolAppUpdated');
      expect(component.metadataFields[0]).toEqual('[CASE_REFERENCE]');
    });
  });

  describe('onResultsViewHandler()', () => {

    it('should set the components resultsArr property on return of subscription.', () => {

      const resultView = {
        columns: [],
        results: [
          {
            case_id: 'DRAFT274146',
          }
        ],
        result_error: null
      };

      component.onResultsViewHandler(resultView);

      expect(component.resultsArr).toEqual([{ case_id: 'DRAFT274146' }]);
    });
  });

  describe('caseShareIsVisible', () => {

    it('should return true when case share available and jurisdiction is shareable', () => {
      const result = [
        { canShareCases: true },
        [ 'dummy' ],
        { id: 'dummy' }
      ];
      expect(component.caseShareIsVisible(result)).toBeTruthy();
    });

    it('should return false when jurisdiction is not shareable.', () => {
      const result = [
        { canShareCases: true },
        [ 'dummy1' ],
        { id: 'dummy' }
      ];
      expect(component.caseShareIsVisible(result)).toBeFalsy();
    });

    it('should return false when there are no shareable jurisdictions.', () => {
      const result = [
        { canShareCases: true },
        [],
        { id: 'dummy' }
      ];
      expect(component.caseShareIsVisible(result)).toBeFalsy();
    });

    it('should return false when the jurisdiction is shareable but sharing is disabled.', () => {
      const result = [
        { canShareCases: false },
        [ 'dummy' ],
        { id: 'dummy' }
      ];
      expect(component.caseShareIsVisible(result)).toBeFalsy();
    });

    it('should return false when there are no shareable jurisdictions and sharing is disabled.', () => {
      const result = [
        { canShareCases: false },
        [],
        { id: 'dummy' }
      ];
      expect(component.caseShareIsVisible(result)).toBeFalsy();
    });
  });

  describe('getShareableJurisdictions()', () => {

    it('should return shareable jurisdictions.', () => {
      component.getShareableJurisdictions().subscribe(jurisdictions => {
        expect(jurisdictions).toEqual(['dummy']);
      });
    });

  });

  describe('setCaseListFilterDefaults()', () => {

    it('should set the defaults.', () => {
      component.jurisdictionsBehaviourSubject$.next([{
        id: 'some id',
        name: 'some name',
        description: 'some desc',
        caseTypes: [{
          id: 'some id',
          events: null,
          name: 'some name',
          description: 'some desc',
          states: [{
            id: 'some state id',
            name: 'some name',
            description: 'some desc'
          }]
        }]
      }]);
      component.setCaseListFilterDefaults();

      expect(component.defaults).toBeDefined();
      expect(component.defaults.state_id).toEqual('some state id');
    });

    it('should set the defaults from localStorage.', () => {
      const localStorageGetItemSpy = spyOn(localStorage, 'getItem');
      localStorageGetItemSpy.and.returnValue('{' +
        '"jurisdiction": "Probate", ' +
        '"case-type": "GrantOfRepresentation", ' +
        '"case-state": "BOReadyToIssue"' +
      '}');
      component.jurisdictionsBehaviourSubject$.next([{
        id: 'Probate',
        name: 'some name',
        description: 'some desc',
        caseTypes: [{
          id: 'GrantOfRepresentation',
          events: null,
          name: 'some name',
          description: 'some desc',
          states: [{
            id: 'BOReadyToIssue',
            name: 'some name',
            description: 'some desc'
          }]
        }]
      }]);
      component.setCaseListFilterDefaults();

      expect(component.defaults.state_id).toEqual('BOReadyToIssue');
    });
  });

  describe('Should show share case button', () => {
    let selectedCases: SearchResultViewItem[] = [];
    beforeEach(() => {
      selectedCases = [{
        case_id: '1',
        case_fields: {
          solsSolicitorAppReference: 'James123'
        }
      }, {
        case_id: '2',
        case_fields: {
          solsSolicitorAppReference: 'Steve321'
        }
      }];
    });
    it('Should receive selected cases', () => {
      component.retrieveSelections(selectedCases);
      expect(component.selectedCases.length).toEqual(2);
    });
    it('Should see the \'Share case\' button greyed out', () => {
      selectedCases = [];
      component.retrieveSelections(selectedCases);
      spyOnPipeToStore.and.returnValue(of({
        sessionTimeout: {
          idleModalDisplayTime: 1,
            totalIdleTime: 1,
        },
        canShareCases: true
      }));
      spyOnProperty(component, 'isCaseShareVisible$').and.returnValue(Observable.of(true));
      fixture.detectChanges();
      expect(fixture.debugElement.nativeElement.querySelector('#btn-share-button').textContent).toContain('Share Case');
      expect(component.checkIfButtonDisabled()).toBeTruthy();
    });
    it('Share a case button is selectable when any case is selected', () => {
      component.retrieveSelections(selectedCases);
      expect(component.checkIfButtonDisabled()).toBeFalsy();
    });
    it('Should save share cases to store when selection is changed', () => {
      component.retrieveSelections(selectedCases);
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new SynchronizeStateToStore(converts.toShareCaseConverter(component.selectedCases)));
    });
    it('Should save share cases to store', () => {
      component.retrieveSelections(selectedCases);
      const shareCases = {
        sharedCases: converts.toShareCaseConverter(component.selectedCases)
      };
      component.shareCaseSubmit();
      expect(spyOnDispatchToStore).toHaveBeenCalledWith(new AddShareCases(shareCases));
      expect(component.checkIfButtonDisabled()).toBeFalsy();
    });
    afterEach(() => {
      selectedCases = [];
    });
  });

  describe('Should see cases unselectable information', () => {
    beforeEach(() => {
      spyOnPipeToStore.and.returnValue(of({}));
      mockDefinitionsService.getJurisdictions.and.returnValue(of([{
        id: 'some id',
        caseTypes: [{
          id: 'some id',
          states: [{
            id: 'some id'
          }]
        }]
      }]));
    });
    it('should see why are some cases unselectable', () => {
      const resultView = {
        columns: [],
        results: [
          {
            case_id: 'case_123',
          }
        ],
        result_error: null
      };
      spyOnPipeToStore.and.returnValue(of({
        sessionTimeout: {
          idleModalDisplayTime: 1,
          totalIdleTime: 1,
        },
        canShareCases: true
      }));
      component.onResultsViewHandler(resultView);
      expect(component.hasResults()).toBeTruthy();
      spyOn(component, 'hasResults').and.returnValue(true);
      spyOnProperty(component, 'isCaseShareVisible$').and.returnValue(Observable.of(true));
      fixture.detectChanges();
      const infoHeader = fixture.debugElement.query(By.css('#sp-msg-unselected-case-header')).nativeElement;
      expect(infoHeader.innerHTML).toContain('Why are some cases unselectable?');
      const infoContent = fixture.debugElement.query(By.css('#sp-msg-unselected-case-content')).nativeElement;
      expect(infoContent.innerHTML).toContain('You might not be able to select and share some cases in your current case list. However, you\'ll be able to select any new cases you create and share them.');
    });

    it('should not see why are some cases unselectable', () => {
      const resultView = {
        columns: [],
        results: [],
        result_error: null
      };
      component.onResultsViewHandler(resultView);
      expect(component.hasResults()).toBeFalsy();
      spyOn(component, 'hasResults').and.returnValue(false);
      fixture.detectChanges();
      const infoHeader = fixture.debugElement.query(By.css('#sp-msg-unselected-case-header'));
      expect(infoHeader).toBeNull();
      const infoContent = fixture.debugElement.query(By.css('#sp-msg-unselected-case-content'));
      expect(infoContent).toBeNull();
    });
  });

  describe('onDestroy()', () => {
    it('should unsubscribe', () => {
      component.filterSubscription = new Observable().subscribe();
      component.resultSubscription = new Observable().subscribe();
      component.paginationSubscription = new Observable().subscribe();
      component.caseFilterToggleSubscription = new Observable().subscribe();
      spyOn(component.filterSubscription, 'unsubscribe').and.callThrough();
      spyOn(component.resultSubscription, 'unsubscribe').and.callThrough();
      spyOn(component.paginationSubscription, 'unsubscribe').and.callThrough();
      spyOn(component.caseFilterToggleSubscription, 'unsubscribe').and.callThrough();

      component.ngOnDestroy();
      expect(component.filterSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.resultSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.paginationSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.caseFilterToggleSubscription.unsubscribe).toHaveBeenCalled();
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
