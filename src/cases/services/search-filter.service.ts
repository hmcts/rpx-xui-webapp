import { Injectable } from '@angular/core';
import { SearchService } from '@hmcts/ccd-case-ui-toolkit';
import { Observable } from 'rxjs';

@Injectable()
export class SearchFilterService {

    constructor(
        private ccdSearchService: SearchService
    ) {}

    search(payload): Observable<any> {
        const jurisdictionId = payload.jurisdiction.id;
        const caseTypeId = payload.caseType.id;
        const metaCriteria = payload.metadataFields;
        const caseCriteria = payload.formGroup.value;

        return this.ccdSearchService.search(jurisdictionId, caseTypeId, metaCriteria, caseCriteria) as any;
    }
}
