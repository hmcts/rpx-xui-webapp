import { OnInit } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
export declare class ReadComplexFieldCollectionTableComponent extends AbstractFieldReadComponent implements OnInit {
    columns: String[];
    columnsVerticalLabel: any;
    columnsHorizontalLabel: any;
    columnsAllLabels: any;
    rows: any[];
    isHidden: boolean[];
    ngOnInit(): void;
    private populateHorizontalLabels;
    private populateLabels;
    private populateCaseFieldValuesIntoRows;
    getImage(row: any): "img/accordion-plus.png" | "img/accordion-minus.png";
    /**
     * Needs to be called before 'ccdFieldsFilter' pipe is used, as it needs a caseField value.
     */
    addCaseFieldValue(field: any, value: any): boolean;
    isNotBlank(value: string): boolean;
    addCaseReferenceValue(field: any, value: any): any;
    private isVerticleDataNotEmpty;
    keepOriginalOrder: (a: any, b: any) => any;
    sortRowsByColumns(column: any): void;
    private isSortAscending;
    sortWidget(column: any): "&#9660;" | "&#9650;";
    trackByIndex(index: number, obj: any): any;
}
