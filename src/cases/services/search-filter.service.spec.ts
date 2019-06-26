import { TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { SearchFilterService } from './';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';

describe('SearchFilterService', () => {
    let searchFilterService: SearchFilterService;
    const ccdSearchServiceMock = createSpyObj<SearchService>('SearchService', ['search']);

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                SearchFilterService,
                { provide: SearchService, useValue: ccdSearchServiceMock },
            ]
        });

        searchFilterService = TestBed.get(SearchFilterService);
    });

    it('should search', () => {
        const payload = {
            selected: {
                jurisdiction: {
                    id: 'Athos'
                },
                caseType: {
                    id: 'Porthos'
                },
                metadataFields: {
                    id: 'Aramis'
                },
                formGroup: {
                    value: 'dArtagnan'
                }
            }
        };

        searchFilterService.search(payload);
        expect(ccdSearchServiceMock.search).toHaveBeenCalledWith('Athos', 'Porthos', { id: 'Aramis' }, 'dArtagnan');

    });

});
