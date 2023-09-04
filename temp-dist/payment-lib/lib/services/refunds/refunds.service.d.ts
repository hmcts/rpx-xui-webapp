import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { ErrorHandlerService } from '../shared/error-handler.service';
import { WebComponentHttpClient } from '../shared/httpclient/webcomponent.http.client';
import { PaymentLibService } from '../../payment-lib.service';
import { Observable } from 'rxjs';
import { IRefundReasons } from '../../interfaces/IRefundReasons';
import { IPatchRefundAction } from '../../interfaces/IPatchRefundAction';
import { IRefundList } from '../../interfaces/IRefundList';
import { IssueRefundRequest } from '../../interfaces/IssueRefundRequest';
import { IResubmitRefundRequest } from '../../interfaces/IResubmitRefundRequest';
import { IPutNotificationRequest } from '../../interfaces/IPutNotificationRequest';
import * as i0 from "@angular/core";
export declare class RefundsService {
    private http;
    private https;
    private errorHandlerService;
    private paymentLibService;
    private meta;
    constructor(http: HttpClient, https: WebComponentHttpClient, errorHandlerService: ErrorHandlerService, paymentLibService: PaymentLibService, meta: Meta);
    getRefundReasons(): Observable<IRefundReasons[]>;
    getRefundRejectReasons(): Observable<any>;
    getRefundActions(refundReference: string): Observable<any>;
    patchRefundActions(body: IPatchRefundAction, refundReference: string, reviewerAction: string): Observable<any>;
    getRefundList(refundstatus?: string, selfexclusive?: boolean): Observable<IRefundList[]>;
    getRefundStatusHistory(reference?: string): Observable<any>;
    getRefundStatusList(ccdCaseNumber: string): Observable<IRefundList[]>;
    getUserDetails(): Observable<any>;
    postIssueRefund(body: IssueRefundRequest): Observable<any>;
    putResendOrEdit(body: IPutNotificationRequest, refundRef: string, notificationType: string): Observable<any>;
    patchResubmitRefund(body: IResubmitRefundRequest, refund_reference: string): Observable<any>;
    addHeaders(options: any): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<RefundsService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RefundsService>;
}
//# sourceMappingURL=refunds.service.d.ts.map