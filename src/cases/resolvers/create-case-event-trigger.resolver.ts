import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CaseEventTrigger, Draft, DRAFT_QUERY_PARAM, CasesService } from '@hmcts/ccd-case-ui-toolkit';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class CreateCaseEventTriggerResolver implements Resolve<CaseEventTrigger> {

  public static readonly PARAM_JURISDICTION_ID = 'jid';
  public static readonly PARAM_CASE_TYPE_ID = 'ctid';
  public static readonly PARAM_EVENT_ID = 'eid';
  public static readonly QUERY_PARAM_IGNORE_WARNING = 'ignoreWarning';
  private static readonly IGNORE_WARNING_VALUES = [ 'true', 'false' ];

  private cachedEventTrigger: CaseEventTrigger;

  constructor(
    private casesService: CasesService,
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<CaseEventTrigger> {
    return this.isRootCreateRoute(route) ? this.getAndCacheEventTrigger(route)
    : this.cachedEventTrigger ? Observable.of(this.cachedEventTrigger)
    : this.getAndCacheEventTrigger(route);
  }

  getAndCacheEventTrigger(route: ActivatedRouteSnapshot): Observable<CaseEventTrigger> {
    const caseTypeId = route.paramMap.get(CreateCaseEventTriggerResolver.PARAM_CASE_TYPE_ID);
    const eventTriggerId = route.paramMap.get(CreateCaseEventTriggerResolver.PARAM_EVENT_ID);
    let ignoreWarning = route.queryParamMap.get(CreateCaseEventTriggerResolver.QUERY_PARAM_IGNORE_WARNING);
    const draftId = route.queryParamMap.get(DRAFT_QUERY_PARAM);
    let caseId;

    if (-1 === CreateCaseEventTriggerResolver.IGNORE_WARNING_VALUES.indexOf(ignoreWarning)) {
      ignoreWarning = 'false';
    }
    if (draftId && Draft.isDraft(draftId)) {
      caseId = draftId;
    }
    return this.casesService
      .getEventTrigger(caseTypeId, eventTriggerId, caseId, ignoreWarning) as any;
  }

  private isRootCreateRoute(route: ActivatedRouteSnapshot) {
    // if route is ':jid/:ctid/:eid'
    return !route.firstChild || !route.firstChild.url.length;
  }
}
