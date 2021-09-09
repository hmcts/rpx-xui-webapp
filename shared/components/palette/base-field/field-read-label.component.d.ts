import { OnChanges, SimpleChanges } from '@angular/core';
import { AbstractFieldReadComponent } from './abstract-field-read.component';
export declare class FieldReadLabelComponent extends AbstractFieldReadComponent implements OnChanges {
    canHaveGreyBar: boolean;
    withLabel: boolean;
    isLabel(): boolean;
    isComplex(): boolean;
    isCaseLink(): boolean;
    ngOnChanges(changes: SimpleChanges): void;
    private fixCaseField;
}
