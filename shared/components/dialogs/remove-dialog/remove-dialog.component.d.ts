import { MatDialogRef } from '@angular/material';
export declare class RemoveDialogComponent {
    private matDialogRef;
    result: string;
    constructor(matDialogRef: MatDialogRef<RemoveDialogComponent>);
    remove(): void;
    cancel(): void;
}
