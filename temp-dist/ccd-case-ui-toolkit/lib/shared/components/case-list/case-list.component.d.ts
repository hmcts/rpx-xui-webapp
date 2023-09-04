import { EventEmitter } from '@angular/core';
import { BrowserService } from '../../services/browser/browser.service';
import * as i0 from "@angular/core";
export declare class DateTimeFormatUtils {
    static formatDateAtTime(date: Date, is24Hour: boolean): string;
    static formatTime(date: Date, is24Hour: boolean): string;
}
export declare class CaseListComponent {
    private readonly browserService;
    classes: string;
    caption: string;
    firstCellIsHeader: boolean;
    cases: object[];
    tableConfig: TableConfig;
    selectionEnabled: boolean;
    selection: EventEmitter<any[]>;
    selectedCases: any[];
    currentPageNo: number;
    totalResultsCount?: number;
    pageSize?: number;
    pageChange: EventEmitter<any>;
    constructor(browserService: BrowserService);
    formatDate(date: Date): string;
    formatDateAtTime(date: Date): string;
    canBeShared(c: any): boolean;
    canAnyBeShared(): boolean;
    selectAll(): void;
    changeSelection(aCase: any): void;
    isSelected(aCase: any): boolean;
    allOnPageSelected(): boolean;
    onKeyUp($event: KeyboardEvent, aCase: any): void;
    goToPage(pageNumber: number): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseListComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseListComponent, "ccd-case-list", never, { "classes": "classes"; "caption": "caption"; "firstCellIsHeader": "firstCellIsHeader"; "cases": "cases"; "tableConfig": "tableConfig"; "selectionEnabled": "selectionEnabled"; "selectedCases": "selectedCases"; "currentPageNo": "currentPageNo"; "totalResultsCount": "totalResultsCount"; "pageSize": "pageSize"; }, { "selection": "selection"; "pageChange": "pageChange"; }, never, never, false, never>;
}
export declare class TableColumnConfig {
    header: string;
    key: string;
    type?: string;
    constructor();
}
export declare class TableConfig {
    idField: string;
    columnConfigs: TableColumnConfig[];
    constructor();
}
//# sourceMappingURL=case-list.component.d.ts.map