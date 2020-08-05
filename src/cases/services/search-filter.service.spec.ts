import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { SearchFilterService } from './';
import {
    SearchService, Jurisdiction, CaseType, CaseState, AbstractAppConfig,
    HttpService, RequestOptionsBuilder
} from '@hmcts/ccd-case-ui-toolkit';
import { FormControl, FormGroup } from '@angular/forms';
import { JURISDICTION_1, CASE_TYPE_1, CASE_STATE_1 } from '../mock/search-filter.mock';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import * as fromRoot from '../../app/store/reducers';
import * as fromCaseSearchStore from '../store';

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
                { provide: RequestOptionsBuilder, useValue: requestOptionsBuilder }
            ]
        });

        store = TestBed.get(Store);
        searchFilterService = TestBed.get(SearchFilterService);
        storeDispatchMock = spyOn(store, 'dispatch');
    });

    it('should make inputs fields turn into query parameters', () => {
        const nameControl = new FormControl();
        const NAME_VALUE = 'something';

        nameControl.setValue(NAME_VALUE);

        const filterContents = {
            name: nameControl
        };
        const formGroupDummy = new FormGroup(filterContents);
        const filter = {
            selected: {
                formGroup: formGroupDummy,
                jurisdiction: JURISDICTION,
                caseType: CASE_TYPES[0],
                caseState: CASE_STATE,
                page: 1,
                view: 'SEARCH'
            }
        };

        searchFilterService.search(filter);


        expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1, state: CASE_STATE.id }, {
            name: NAME_VALUE
        }, 'SEARCH');

    });

    it('should make inputs fields turn into query parameters when calling searchCases', () => {
        const nameControl = new FormControl();
        const NAME_VALUE = 'something';

        nameControl.setValue(NAME_VALUE);

        const filterContents = {
            name: nameControl
        };
        const formGroupDummy = new FormGroup(filterContents);
        const filter = {
            selected: {
                formGroup: formGroupDummy,
                jurisdiction: JURISDICTION,
                caseType: CASE_TYPES[0],
                caseState: CASE_STATE,
                page: 1,
                view: 'SEARCH'
            },
            sortParameters: {
                column: 'dummy',
                order: 0
            }
        };

        searchFilterService.search(filter, true);


        expect(ccdSearchServiceMock.searchCases).toHaveBeenCalledWith(CASE_TYPE.id, { page: 1, state: CASE_STATE.id }, {
            name: NAME_VALUE
        }, 'SEARCH', { column: 'dummy', order: 0 });

    });

    it('should make inputs fields turn into query parameters with structure', () => {
        const nameControl = new FormControl();
        const NAME_VALUE = 'something';

        nameControl.setValue(NAME_VALUE);
        const filterContents = {
            name: nameControl,
            child: new FormGroup({ childName: new FormControl('childValue') })
        };
        const formGroupDummy = new FormGroup(filterContents);
        const filter = {
            selected: {
                formGroup: formGroupDummy,
                jurisdiction: JURISDICTION,
                caseType: CASE_TYPES[0],
                caseState: CASE_STATE,
                page: 1,
                view: 'SEARCH'
            }
        };

        searchFilterService.search(filter);

        expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1, state: CASE_STATE.id }, {
            name: NAME_VALUE,
            'child.childName': 'childValue'
        }, 'SEARCH');

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
            '[META]': nameControl2
        };
        const formGroupDummy = new FormGroup(filterContents);
        const filter = {
            selected: {
                formGroup: formGroupDummy,
                jurisdiction: JURISDICTION,
                caseType: CASE_TYPES[0],
                page: 1,
                metadataFields: ['[META]'],
                view: 'SEARCH'
            }
        };

        searchFilterService.search(filter);

        expect(ccdSearchServiceMock.search).toHaveBeenCalledWith(JURISDICTION.id, CASE_TYPE.id, { page: 1, meta: NAME_VALUE2 }, {
            name: NAME_VALUE1
        }, 'SEARCH');

    });

    describe('findPaginationMetadata', () => {
        it('should httpService get call', () => {

            const nameControl = new FormControl();
            const NAME_VALUE = 'something';

            nameControl.setValue(NAME_VALUE);

            const filterContents = {
                name: nameControl
            };
            const formGroupDummy = new FormGroup(filterContents);
            const filter = {
                selected: {
                    formGroup: formGroupDummy,
                    jurisdiction: JURISDICTION,
                    caseType: CASE_TYPES[0],
                    caseState: CASE_STATE,
                    page: 1,
                    view: 'SEARCH'
                }
            };

            searchFilterService.findPaginationMetadata(filter);



            expect(httpService.get).toHaveBeenCalled();

        });
    });


});
