import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { FeeValue } from './fee-value.model';
import * as i0 from "@angular/core";
export declare class ReadOrderSummaryRowComponent extends AbstractFieldReadComponent implements OnInit {
    feeValue: FeeValue;
    ngOnInit(): void;
    getFeeAmount(): string;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadOrderSummaryRowComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadOrderSummaryRowComponent, "[ccdReadOrderSummaryRow]", never, { "feeValue": "feeValue"; }, {}, never, never, false, never>;
}
//# sourceMappingURL=read-order-summary-row.component.d.ts.map