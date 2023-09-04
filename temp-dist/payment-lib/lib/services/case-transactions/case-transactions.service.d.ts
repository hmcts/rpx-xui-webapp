import { HttpClient } from '@angular/common/http';
import { LoggerService } from '../shared/logger/logger.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { PaymentLibService } from '../../payment-lib.service';
import { Observable } from 'rxjs';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import * as i0 from "@angular/core";
export declare class CaseTransactionsService {
    private http;
    private logger;
    private errorHandlerService;
    private paymentLibService;
    constructor(http: HttpClient, logger: LoggerService, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getPaymentGroups(ccdCaseNumber: string): Observable<IPaymentGroup[]>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseTransactionsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CaseTransactionsService>;
}
//# sourceMappingURL=case-transactions.service.d.ts.map