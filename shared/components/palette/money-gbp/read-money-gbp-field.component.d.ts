import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
export declare class ReadMoneyGbpFieldComponent extends AbstractFieldReadComponent implements OnInit {
    amount: any;
    value: any;
    ngOnInit(): void;
    isNumber(): boolean;
}
