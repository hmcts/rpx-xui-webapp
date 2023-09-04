import { AfterViewInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentTreeNode } from '../../../../../domain/case-file-view';
import { CaseFileViewCategory } from '../../../../../domain/case-file-view/case-file-view-category.model';
import * as i0 from "@angular/core";
export declare class CaseFileViewFolderSelectorComponent implements AfterViewInit {
    dialogRef: MatDialogRef<CaseFileViewFolderSelectorComponent>;
    data: {
        categories: CaseFileViewCategory[];
        document: DocumentTreeNode;
    };
    currentCategories: CaseFileViewCategory[];
    selected: string;
    constructor(dialogRef: MatDialogRef<CaseFileViewFolderSelectorComponent>, data: {
        categories: CaseFileViewCategory[];
        document: DocumentTreeNode;
    });
    ngAfterViewInit(): void;
    handleChange(evt: any): void;
    select(categoryId: string): void;
    cancel(): void;
    save(): void;
    private findPath;
    private containsDocument;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFileViewFolderSelectorComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFileViewFolderSelectorComponent, "xui-case-file-view-folder-selector", never, {}, {}, never, never, false, never>;
}
//# sourceMappingURL=case-file-view-folder-selector.component.d.ts.map