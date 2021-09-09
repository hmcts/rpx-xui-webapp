import { OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
export declare class WriteMoneyGbpFieldComponent extends AbstractFieldWriteComponent implements OnInit {
    moneyGbpControl: FormControl;
    ngOnInit(): void;
}
