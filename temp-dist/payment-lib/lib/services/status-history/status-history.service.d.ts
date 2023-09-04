import { PaymentLibService } from '../../payment-lib.service';
import { HttpClient } from '@angular/common/http';
import { IStatusHistories } from '../../interfaces/IStatusHistories';
import { Observable } from 'rxjs/internal/Observable';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';
import * as i0 from "@angular/core";
export declare class StatusHistoryService {
    private http;
    private logger;
    private errorHandlerService;
    private paymentLibService;
    constructor(http: HttpClient, logger: LoggerService, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getPaymentStatusesByReference(paymentReference: string, paymentMethod: string): Observable<IStatusHistories>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StatusHistoryService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StatusHistoryService>;
}
//# sourceMappingURL=status-history.service.d.ts.map