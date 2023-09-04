import * as i0 from "@angular/core";
export declare class PaymentLibService {
    API_ROOT: string;
    BULKSCAN_API_ROOT: string;
    REFUNDS_API_ROOT: string;
    NOTIFICATION_API_ROOT: string;
    CARDPAYMENTRETURNURL: string;
    constructor();
    setApiRootUrl(apiRoot: string): void;
    getApiRootUrl(): string;
    setBulkScanApiRootUrl(bulkscanapiRoot: string): void;
    getBulkScanApiRootUrl(): string;
    setRefundndsApiRootUrl(refundsapiRoot: string): void;
    getRefundsApiRootUrl(): string;
    setNoticationApiRootUrl(notificationapiRoot: string): void;
    getNoticationApiRootUrl(): string;
    setCardPaymentReturnUrl(cardPaymentReturnUrl: string): void;
    getCardPaymentReturnUrl(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<PaymentLibService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<PaymentLibService>;
}
//# sourceMappingURL=payment-lib.service.d.ts.map