import { MatDialogRef } from '@angular/material';
export declare class DeleteOrCancelDialogComponent {
    private matDialogRef;
    result: string;
    constructor(matDialogRef: MatDialogRef<DeleteOrCancelDialogComponent>);
    delete(): void;
    cancel(): void;
}
