import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { AlertService } from '../../../services/alert/alert.service';
import { RouterHelperService } from '../../../services/router/router-helper.service';
import { WizardFactoryService } from './wizard-factory.service';
import { EventTriggerService } from './event-trigger.service';
export declare class CaseEditWizardGuard implements Resolve<boolean> {
    private router;
    private routerHelper;
    private wizardFactory;
    private alertService;
    private eventTriggerService;
    constructor(router: Router, routerHelper: RouterHelperService, wizardFactory: WizardFactoryService, alertService: AlertService, eventTriggerService: EventTriggerService);
    resolve(route: ActivatedRouteSnapshot): Promise<boolean>;
    private processEventTrigger;
    private goToFirst;
    private goToSubmit;
    private buildState;
    private parentUrlSegments;
}
