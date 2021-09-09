import { EventEmitter } from '@angular/core';
export declare class PaginationComponent {
    visibilityLabel: string;
    id: string;
    maxSize: number;
    directionLinks: boolean;
    autoHide: boolean;
    responsive: boolean;
    previousLabel: string;
    nextLabel: string;
    screenReaderPaginationLabel: string;
    screenReaderPageLabel: string;
    screenReaderCurrentLabel: string;
    pageChange: EventEmitter<number>;
    pageBoundsCorrection: EventEmitter<number>;
    private _directionLinks;
    private _autoHide;
    private _responsive;
}
