import { AbstractAppConfig } from '../../../../app.config';
import { SessionStorageService } from '../../../services/session/session-storage.service';
import { PaymentField } from '../base-field/payment-field.component';
import * as i0 from "@angular/core";
export declare class WaysToPayFieldComponent extends PaymentField {
    constructor(appConfig: AbstractAppConfig, sessionStorage: SessionStorageService);
    getCardPaymentReturnUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<WaysToPayFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WaysToPayFieldComponent, "ccd-ways-to-pay-field", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=waystopay-field.component.d.ts.map