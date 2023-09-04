import { EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export declare class PaginationComponent {
    visibilityLabel: string;
    id: string;
    maxSize: number;
    previousLabel: string;
    nextLabel: string;
    screenReaderPaginationLabel: string;
    screenReaderPageLabel: string;
    screenReaderCurrentLabel: string;
    pageChange: EventEmitter<number>;
    pageBoundsCorrection: EventEmitter<number>;
    private pDirectionLinks;
    private pAutoHide;
    private pResponsive;
    get directionLinks(): boolean;
    set directionLinks(value: boolean);
    get autoHide(): boolean;
    set autoHide(value: boolean);
    get responsive(): boolean;
    set responsive(value: boolean);
    static ɵfac: i0.ɵɵFactoryDeclaration<PaginationComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PaginationComponent, "ccd-pagination", never, { "visibilityLabel": "visibilityLabel"; "id": "id"; "maxSize": "maxSize"; "previousLabel": "previousLabel"; "nextLabel": "nextLabel"; "screenReaderPaginationLabel": "screenReaderPaginationLabel"; "screenReaderPageLabel": "screenReaderPageLabel"; "screenReaderCurrentLabel": "screenReaderCurrentLabel"; "directionLinks": "directionLinks"; "autoHide": "autoHide"; "responsive": "responsive"; }, { "pageChange": "pageChange"; "pageBoundsCorrection": "pageBoundsCorrection"; }, never, never, false, never>;
}
//# sourceMappingURL=pagination.component.d.ts.map