import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
export declare class DocumentDialogComponent implements OnInit {
    private matDialogRef;
    result: string;
    constructor(matDialogRef: MatDialogRef<DocumentDialogComponent>);
    ngOnInit(): void;
    replace(): void;
    cancel(): void;
}
