import { Injectable } from '@angular/core';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class SearchFilterService {

    constructor(
        private ccdSearchService: SearchService
    ) {}

    search(payload): Observable<any> {
        const jurisdictionId = payload.selected.jurisdiction.id;
        const caseTypeId = payload.selected.caseType.id;
        const metaCriteria = payload.selected.metadataFields;
        const caseCriteria = payload.selected.formGroup.value;

        return this.ccdSearchService.search(jurisdictionId, caseTypeId, metaCriteria, caseCriteria) as any;
    }
}
