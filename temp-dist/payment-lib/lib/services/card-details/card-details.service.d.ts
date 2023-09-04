import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ICardDetails } from '../../interfaces/ICardDetails';
import { PaymentLibService } from '../../payment-lib.service';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { LoggerService } from '../shared/logger/logger.service';
import * as i0 from "@angular/core";
export declare class CardDetailsService {
    private http;
    private logger;
    private errorHandlerService;
    private paymentLibService;
    constructor(http: HttpClient, logger: LoggerService, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getCardDetails(paymentReference: string): Observable<ICardDetails>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardDetailsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CardDetailsService>;
}
//# sourceMappingURL=card-details.service.d.ts.map