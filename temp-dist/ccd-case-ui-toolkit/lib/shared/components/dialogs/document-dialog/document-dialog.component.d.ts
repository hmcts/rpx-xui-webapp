import { OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as i0 from "@angular/core";
export declare class DocumentDialogComponent implements OnInit {
    private readonly matDialogRef;
    result: string;
    constructor(matDialogRef: MatDialogRef<DocumentDialogComponent>);
    ngOnInit(): void;
    replace(): void;
    cancel(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DocumentDialogComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DocumentDialogComponent, "ccd-document-dialog", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=document-dialog.component.d.ts.map