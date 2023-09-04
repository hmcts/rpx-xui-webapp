import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { RouterHelperService } from '../../../services/router/router-helper.service';
import { EventTriggerService } from './event-trigger.service';
import { WizardFactoryService } from './wizard-factory.service';
import * as i0 from "@angular/core";
export declare class CaseEditWizardGuard implements Resolve<boolean> {
    private readonly router;
    private readonly routerHelper;
    private readonly wizardFactory;
    private readonly alertService;
    private readonly eventTriggerService;
    constructor(router: Router, routerHelper: RouterHelperService, wizardFactory: WizardFactoryService, alertService: AlertService, eventTriggerService: EventTriggerService);
    resolve(route: ActivatedRouteSnapshot): Promise<boolean>;
    private processEventTrigger;
    private goToFirst;
    private goToSubmit;
    private buildState;
    private parentUrlSegments;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseEditWizardGuard, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseEditWizardGuard>;
}
//# sourceMappingURL=case-edit-wizard.guard.d.ts.map