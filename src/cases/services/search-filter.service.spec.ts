import { TestBed } from '@angular/core/testing';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import {
  AbstractAppConfig,
  CaseState,
  CaseType,
  HttpService,
  Jurisdiction,
  RequestOptionsBuilder,
  SearchService,
} from '@hmcts/ccd-case-ui-toolkit';
import { combineReducers, Store, StoreModule } from '@ngrx/store';
import * as fromRoot from '../../app/store/reducers';
import { CASE_STATE_1, CASE_TYPE_1, JURISDICTION_1 } from '../mock/search-filter.mock';
import * as fromCaseSearchStore from '../store';
import { SearchFilterService } from './';
import createSpyObj = jasmine.createSpyObj;

const JURISDICTION: Jurisdiction = JURISDICTION_1;

const CASE_TYPES: CaseType[] = [CASE_TYPE_1];

const CASE_TYPE = CASE_TYPES[0];

const CASE_STATE: CaseState = CASE_STATE_1;

describe('SearchFilterService', () => {
  let searchFilterService: SearchFilterService;
  const ccdSearchServiceMock = createSpyObj<SearchService>('SearchService', ['search', 'searchCases']);
  const abstractAppConfigMock = createSpyObj<AbstractAppConfig>('AbstractAppConfig', ['getCaseDataUrl']);
  const httpService = createSpyObj<HttpService>('HttpService', ['get']);
  const requestOptionsBuilder = createSpyObj<RequestOptionsBuilder>('RequestOptionsBuilder', ['buildOptions']);

  let storeDispatchMock: any;
  let store: Store<fromCaseSearchStore.SearchState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          feature: combineReducers(fromCaseSearchStore.reducers),
        }),
      ],
      providers: [
        SearchFilterService,
        { provide: SearchService, useValue: ccdSearchServiceMock },
        { provide: AbstractAppConfig, useValue: abstractAppConfigMock },
        { provide: HttpService, useValue: httpService },
        { provide: RequestOptionsBuilder, useValue: requestOptionsBuilder },
      ],
    });

    store = TestBed.inject(Store);
    searchFilterService = TestBed.inject(SearchFilterService);
    storeDispatchMock = spyOn(store, 'dispatch');
    ccdSearchServiceMock.search.calls.reset();
    ccdSearchServiceMock.searchCases.calls.reset();
    abstractAppConfigMock.getCaseDataUrl.calls.reset();
    httpService.get.calls.reset();
    requestOptionsBuilder.buildOptions.calls.reset();
  });

  it('should make inputs fields turn into query parameters', () => {
    const nameControl = new FormControl();
    const NAME_VALUE = 'something';

    nameControl.setValue(NAME_VALUE);

    const filterContents = {
      name: nameControl,
    };
    const formGroupDummy = new FormGroup(filterContents);
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1,
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      { page: 1, state: CASE_STATE.id },
      {
        name: NAME_VALUE,
      },
      'SEARCH'
    );
  });

  it('should make inputs fields turn into query parameters when calling searchCases', () => {
    const nameControl = new FormControl();
    const NAME_VALUE = 'something';

    nameControl.setValue(NAME_VALUE);

    const filterContents = {
      name: nameControl,
    };
    const formGroupDummy = new FormGroup(filterContents);
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1,
        view: 'SEARCH',
      },
      sortParameters: {
        column: 'dummy',
        order: 0,
      },
    };

    searchFilterService.search(filter, true);

    expect(ccdSearchServiceMock.searchCases).toHaveBeenCalledWith(
      CASE_TYPE.id,
      { page: 1, state: CASE_STATE.id },
      {
        name: NAME_VALUE,
      },
      'SEARCH',
      { column: 'dummy', order: 0 }
    );
  });

  it('should make collection field values turn into multiple query parameters when calling searchCases', () => {
    const handoffReasons = new FormArray([
      new FormGroup({
        id: new FormControl('1'),
        value: new FormGroup({
          caseHandoffReason: new FormControl('ColligendaBona'),
        }),
      }),
      new FormGroup({
        id: new FormControl('2'),
        value: new FormGroup({
          caseHandoffReason: new FormControl('Caveat'),
        }),
      }),
    ]);

    const formGroupDummy = new FormGroup({
      boHandoffReasonList: handoffReasons,
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        page: 1,
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter, true);

    expect(ccdSearchServiceMock.searchCases).toHaveBeenCalledWith(
      CASE_TYPE.id,
      { page: 1 },
      {
        'boHandoffReasonList.value.caseHandoffReason': ['ColligendaBona', 'Caveat'],
      },
      'SEARCH',
      undefined
    );
  });

  it('should make inputs fields turn into query parameters with structure', () => {
    const nameControl = new FormControl();
    const NAME_VALUE = 'something';

    nameControl.setValue(NAME_VALUE);
    const filterContents = {
      name: nameControl,
      child: new FormGroup({ childName: new FormControl('childValue') }),
    };
    const formGroupDummy = new FormGroup(filterContents);
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        caseState: CASE_STATE,
        page: 1,
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      { page: 1, state: CASE_STATE.id },
      {
        name: NAME_VALUE,
        'child.childName': 'childValue',
      },
      'SEARCH'
    );
  });

  it('should make metadata inputs fields turn into query parameters', () => {
    const nameControl1 = new FormControl();
    const NAME_VALUE1 = 'something';
    nameControl1.setValue(NAME_VALUE1);
    const nameControl2 = new FormControl();
    const NAME_VALUE2 = 100;
    nameControl2.setValue(NAME_VALUE2);

    const filterContents = {
      name: nameControl1,
      '[META]': nameControl2,
    };
    const formGroupDummy = new FormGroup(filterContents);
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        page: 1,
        metadataFields: ['[META]'],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      { page: 1, meta: NAME_VALUE2 },
      {
        name: NAME_VALUE1,
      },
      'SEARCH'
    );
  });

  it('should ignore empty, null and undefined form values', () => {
    const formGroupDummy = new FormGroup({
      emptyString: new FormControl(''),
      nullValue: new FormControl(null),
      undefinedValue: new FormControl(undefined),
      emptyArray: new FormControl([]),
      value: new FormControl('keep-me'),
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      {},
      {
        value: 'keep-me',
      },
      'SEARCH'
    );
  });

  it('should make primitive array fields turn into query parameters', () => {
    const formGroupDummy = new FormGroup({
      category: new FormControl(['A', 'B']),
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      {},
      {
        category: ['A', 'B'],
      },
      'SEARCH'
    );
  });

  it('should make collection field values without value wrapper turn into query parameters', () => {
    const formGroupDummy = new FormGroup({
      addresses: new FormArray([
        new FormGroup({
          postcode: new FormControl('AA1 1AA'),
        }),
        new FormGroup({
          postcode: new FormControl('BB2 2BB'),
        }),
      ]),
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      {},
      {
        'addresses.postcode': ['AA1 1AA', 'BB2 2BB'],
      },
      'SEARCH'
    );
  });

  it('should merge duplicate nested field values into arrays', () => {
    const formGroupDummy = new FormGroup({
      parties: new FormArray([
        new FormGroup({
          value: new FormGroup({
            role: new FormControl('Applicant'),
          }),
        }),
        new FormGroup({
          value: new FormGroup({
            role: new FormControl(['Respondent', 'Representative']),
          }),
        }),
      ]),
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      {},
      {
        'parties.value.role': ['Applicant', 'Respondent', 'Representative'],
      },
      'SEARCH'
    );
  });

  it('should append duplicate nested field values to existing arrays', () => {
    const formGroupDummy = new FormGroup({
      parties: new FormArray([
        new FormGroup({
          value: new FormGroup({
            role: new FormControl('Applicant'),
          }),
        }),
        new FormGroup({
          value: new FormGroup({
            role: new FormControl('Respondent'),
          }),
        }),
        new FormGroup({
          value: new FormGroup({
            role: new FormControl('Representative'),
          }),
        }),
      ]),
    });
    const filter = {
      selected: {
        formGroup: formGroupDummy,
        jurisdiction: JURISDICTION,
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(
      JURISDICTION.id,
      CASE_TYPE.id,
      {},
      {
        'parties.value.role': ['Applicant', 'Respondent', 'Representative'],
      },
      'SEARCH'
    );
  });

  it('should search with a null jurisdiction id when no jurisdiction is selected', () => {
    const filter = {
      selected: {
        caseType: CASE_TYPES[0],
        view: 'SEARCH',
      },
    };

    searchFilterService.search(filter);

    expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(null, CASE_TYPE.id, {}, {}, 'SEARCH');
  });

  describe('findPaginationMetadata', () => {
    it('should call pagination metadata endpoint with page removed from metadata filters', () => {
      const nameControl = new FormControl();
      const NAME_VALUE = 'something';

      nameControl.setValue(NAME_VALUE);
      abstractAppConfigMock.getCaseDataUrl.and.returnValue('http://case-data');
      requestOptionsBuilder.buildOptions.and.returnValue({ observe: 'body', params: { option: 'value' } });

      const filterContents = {
        name: nameControl,
        '[META]': new FormControl('meta-value'),
      };
      const formGroupDummy = new FormGroup(filterContents);
      const filter = {
        selected: {
          formGroup: formGroupDummy,
          jurisdiction: JURISDICTION,
          caseType: CASE_TYPES[0],
          caseState: CASE_STATE,
          page: 1,
          metadataFields: ['[META]'],
          view: 'SEARCH',
        },
      };

      searchFilterService.findPaginationMetadata(filter);

      expect(requestOptionsBuilder.buildOptions).toHaveBeenCalledWith(
        {
          state: CASE_STATE.id,
          meta: 'meta-value',
        },
        {
          name: NAME_VALUE,
        }
      );
      expect(httpService.get).toHaveBeenCalledWith(
        'http://case-data/caseworkers/:uid/jurisdictions/J1/case-types/CT0/cases/pagination_metadata',
        { observe: 'body', params: { option: 'value' } }
      );
    });
  });
});
