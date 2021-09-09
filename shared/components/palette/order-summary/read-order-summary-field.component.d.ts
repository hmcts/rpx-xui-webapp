import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { FeeValue } from './fee-value.model';
export declare class ReadOrderSummaryFieldComponent extends AbstractFieldReadComponent {
    getFees(): FeeValue[];
    getPaymentTotal(): string;
}
