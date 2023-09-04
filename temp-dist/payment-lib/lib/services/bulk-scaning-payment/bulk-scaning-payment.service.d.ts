import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import { PaymentLibService } from '../../payment-lib.service';
import { Observable } from 'rxjs';
import { IBSPayments } from '../../interfaces/IBSPayments';
import { AllocatePaymentRequest } from '../../interfaces/AllocatePaymentRequest';
import { IPaymentGroup } from '../../interfaces/IPaymentGroup';
import * as i0 from "@angular/core";
export declare class BulkScaningPaymentService {
    private http;
    private https;
    private errorHandlerService;
    private paymentLibService;
    constructor(http: HttpClient, https: WebComponentHttpClient, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService);
    getBSPaymentsByCCD(ccdCaseNumber: string): Observable<IBSPayments>;
    getBSPaymentsByDCN(dcn: string): Observable<IBSPayments>;
    postBSAllocatePayment(body: AllocatePaymentRequest, paymentRef: string): Observable<any>;
    postBSPaymentStrategic(body: AllocatePaymentRequest, paymentGroupRef: string): Observable<any>;
    postBSWoPGStrategic(body: AllocatePaymentRequest): Observable<any>;
    patchBSChangeStatus(dcnNumber: string, status: string): Observable<any>;
    calculateOutStandingAmount(paymentGroup: IPaymentGroup): number;
    removeUnwantedString(input: string, replaceText: string): string;
    downloadSelectedReport(reportName: string, startDate: string, endDate: string): Observable<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BulkScaningPaymentService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BulkScaningPaymentService>;
}
//# sourceMappingURL=bulk-scaning-payment.service.d.ts.map