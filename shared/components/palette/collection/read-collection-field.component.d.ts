import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
export declare class ReadCollectionFieldComponent extends AbstractFieldReadComponent implements OnInit {
    isDisplayContextParameterAvailable: boolean;
    ngOnInit(): void;
    buildIdPrefix(index: number): string;
}
