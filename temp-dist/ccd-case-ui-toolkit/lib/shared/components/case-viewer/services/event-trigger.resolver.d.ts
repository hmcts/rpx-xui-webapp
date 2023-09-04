import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { CaseEventTrigger } from '../../../domain/case-view/case-event-trigger.model';
import { AlertService } from '../../../services/alert/alert.service';
import { ProfileNotifier } from '../../../services/profile/profile.notifier';
import { ProfileService } from '../../../services/profile/profile.service';
import { CasesService } from '../../case-editor/services/cases.service';
import * as i0 from "@angular/core";
export declare class EventTriggerResolver implements Resolve<CaseEventTrigger> {
    private readonly casesService;
    private readonly alertService;
    private readonly profileService;
    private readonly profileNotifier;
    static readonly PARAM_CASE_ID = "cid";
    static readonly PARAM_EVENT_ID = "eid";
    static readonly IGNORE_WARNING = "ignoreWarning";
    private static readonly IGNORE_WARNING_VALUES;
    private cachedEventTrigger;
    private cachedProfile;
    constructor(casesService: CasesService, alertService: AlertService, profileService: ProfileService, profileNotifier: ProfileNotifier);
    resolve(route: ActivatedRouteSnapshot): Promise<CaseEventTrigger>;
    private isRootTriggerEventRoute;
    private getAndCacheEventTrigger;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventTriggerResolver, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventTriggerResolver>;
}
//# sourceMappingURL=event-trigger.resolver.d.ts.map