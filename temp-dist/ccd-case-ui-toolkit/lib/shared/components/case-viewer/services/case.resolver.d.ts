import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { CaseView } from '../../../domain';
import { DraftService, SessionStorageService } from '../../../services';
import { NavigationNotifierService } from '../../../services/navigation/navigation-notifier.service';
import { CaseNotifier } from '../../case-editor';
import * as i0 from "@angular/core";
export declare class CaseResolver implements Resolve<CaseView> {
    private caseNotifier;
    private draftService;
    private navigationNotifierService;
    private router;
    private sessionStorage;
    static readonly EVENT_REGEX: RegExp;
    static readonly PARAM_CASE_ID = "cid";
    static readonly CASE_CREATED_MSG = "The case has been created successfully";
    static defaultWAPage: string;
    static defaultPage: string;
    previousUrl: string;
    constructor(caseNotifier: CaseNotifier, draftService: DraftService, navigationNotifierService: NavigationNotifierService, router: Router, sessionStorage: SessionStorageService);
    resolve(route: ActivatedRouteSnapshot): Promise<CaseView>;
    private navigateToCaseList;
    private isRootCaseViewRoute;
    private isTabViewRoute;
    private getAndCacheCaseView;
    private getAndCacheDraft;
    private processErrorInCaseFetch;
    private goToDefaultPage;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseResolver>;
}
//# sourceMappingURL=case.resolver.d.ts.map