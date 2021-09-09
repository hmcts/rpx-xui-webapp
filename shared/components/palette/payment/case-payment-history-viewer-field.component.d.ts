import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { AbstractAppConfig } from '../../../../app.config';
export declare class CasePaymentHistoryViewerFieldComponent extends AbstractFieldReadComponent {
    private appConfig;
    constructor(appConfig: AbstractAppConfig);
    getBaseURL(): string;
    getPayBulkScanBaseURL(): string;
}
