import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CaseView } from '../../../domain';
import { CaseNotifier, CasesService } from '../../case-editor';
import { DraftService } from '../../../services';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
export declare class CaseResolver implements Resolve<CaseView> {
    private caseNotifier;
    private casesService;
    private draftService;
    private navigationNotifierService;
    private router;
    static readonly EVENT_REGEX: RegExp;
    static readonly PARAM_CASE_ID = "cid";
    static readonly CASE_CREATED_MSG = "The case has been created successfully";
    cachedCaseView: CaseView;
    previousUrl: string;
    constructor(caseNotifier: CaseNotifier, casesService: CasesService, draftService: DraftService, navigationNotifierService: NavigationNotifierService, router: Router);
    resolve(route: ActivatedRouteSnapshot): Promise<CaseView>;
    private navigateToCaseList;
    private isRootCaseViewRoute;
    private isTabViewRoute;
    private getAndCacheCaseView;
    private getAndCacheDraft;
    private checkAuthorizationError;
}
