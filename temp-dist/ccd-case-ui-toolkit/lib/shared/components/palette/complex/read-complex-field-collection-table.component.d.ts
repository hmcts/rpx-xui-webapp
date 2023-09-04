import { OnInit } from '@angular/core';
import { CaseField } from '../../../domain/definition';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
export declare class ReadComplexFieldCollectionTableComponent extends AbstractFieldReadComponent implements OnInit {
    columns: string[];
    columnsVerticalLabel: any;
    columnsHorizontalLabel: any;
    columnsAllLabels: any;
    rows: any[];
    isHidden: boolean[];
    private static isSortAscending;
    ngOnInit(): void;
    getImage(row: any): string;
    /**
     * Needs to be called before 'ccdFieldsFilter' pipe is used, as it needs a caseField value.
     */
    addCaseFieldValue(field: any, value: any): boolean;
    isNotBlank(value: string): boolean;
    addCaseReferenceValue(field: any, value: any): any;
    toCaseField(id: string, label: string, fieldType: any, value: any): CaseField;
    keepOriginalOrder: (a: any, b: any) => any;
    sortRowsByColumns(column: any): void;
    sortWidget(column: any): string;
    private populateHorizontalLabels;
    private populateLabels;
    private populateCaseFieldValuesIntoRows;
    private isVerticleDataNotEmpty;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReadComplexFieldCollectionTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ReadComplexFieldCollectionTableComponent, "ccd-read-complex-field-collection-table", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=read-complex-field-collection-table.component.d.ts.map