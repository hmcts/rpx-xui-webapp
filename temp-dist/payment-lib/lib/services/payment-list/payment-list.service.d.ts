import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { PaymentLibService } from '../../payment-lib.service';
import { IPayments } from '../../interfaces/IPayments';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';
import * as i0 from "@angular/core";
export declare class PaymentListService {
    private http;
    private logger;
    private errorHandlerService;
    private paymentLibService;
    payments: IPayments;
    constructor(http: HttpClient, logger: LoggerService, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getPaymentByCcdCaseNumber(ccdCaseNumber: string, paymentMethod: string): Observable<IPayments>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaymentListService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaymentListService>;
}
//# sourceMappingURL=payment-list.service.d.ts.map