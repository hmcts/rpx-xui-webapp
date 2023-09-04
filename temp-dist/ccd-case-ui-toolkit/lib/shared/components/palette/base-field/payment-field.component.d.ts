import { AbstractAppConfig } from '../../../../app.config';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
export declare abstract class PaymentField extends AbstractFieldReadComponent {
    protected readonly appConfig: AbstractAppConfig;
    protected readonly sessionStorage: SessionStorageService;
    constructor(appConfig: AbstractAppConfig, sessionStorage: SessionStorageService);
    getBaseURL(): string;
    getPayBulkScanBaseURL(): string;
    getRefundsUrl(): string;
    getNotificationUrl(): string;
    getUserRoles(): any;
    getUserEmail(): any;
}
//# sourceMappingURL=payment-field.component.d.ts.map