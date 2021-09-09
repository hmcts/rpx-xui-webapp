import { EventEmitter } from '@angular/core';
import { BrowserService } from '../../services';
export declare class DateTimeFormatUtils {
    static formatDateAtTime(date: Date, is24Hour: boolean): string;
    static formatTime(date: Date, is24Hour: boolean): string;
}
export declare class CaseListComponent {
    private browserService;
    classes: string;
    caption: string;
    firstCellIsHeader: boolean;
    cases: Object[];
    tableConfig: TableConfig;
    selectionEnabled: boolean;
    selection: EventEmitter<any[]>;
    selectedCases: any[];
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
