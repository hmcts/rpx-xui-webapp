import { OnInit } from '@angular/core';
import { CardDetailsService } from '../../services/card-details/card-details.service';
import { ICardDetails } from '../../interfaces/ICardDetails';
import { PaymentLibComponent } from '../../payment-lib.component';
import * as i0 from "@angular/core";
export declare class CardDetailsComponent implements OnInit {
    private cardDetailsService;
    private paymentLibComponent;
    pageTitle: string;
    cardDetails: ICardDetails;
    paymentReference: string;
    errorMessage: string;
    constructor(cardDetailsService: CardDetailsService, paymentLibComponent: PaymentLibComponent);
    ngOnInit(): void;
    get getPaymentReference(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<CardDetailsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CardDetailsComponent, "ccpay-card-details", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=card-details.component.d.ts.map