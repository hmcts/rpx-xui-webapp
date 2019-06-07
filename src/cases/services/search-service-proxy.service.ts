
import { Injectable } from '@angular/core';
import {SearchResultView, SearchService} from '@hmcts/ccd-case-ui-toolkit';
import {Observable, of, Subscription} from 'rxjs';


@Injectable()
export class SearchServiceProxyService {

  constructor(private serachService: SearchService) {}

  getSearch(payload): Observable<SearchResultView> {
    return this.serachService.search(payload.jurisdiction.id, payload.caseType.id, {}, {}, null);
  }

}
