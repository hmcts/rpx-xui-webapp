import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { FeeValue } from './fee-value.model';
export declare class ReadOrderSummaryRowComponent extends AbstractFieldReadComponent implements OnInit {
    feeValue: FeeValue;
    ngOnInit(): void;
    getFeeAmount(): string;
}
