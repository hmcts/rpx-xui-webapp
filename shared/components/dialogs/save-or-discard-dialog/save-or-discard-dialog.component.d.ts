import { MatDialogRef } from '@angular/material';
export declare class SaveOrDiscardDialogComponent {
    private matDialogRef;
    result: string;
    constructor(matDialogRef: MatDialogRef<SaveOrDiscardDialogComponent>);
    cancel(): void;
    save(): void;
    discard(): void;
}
