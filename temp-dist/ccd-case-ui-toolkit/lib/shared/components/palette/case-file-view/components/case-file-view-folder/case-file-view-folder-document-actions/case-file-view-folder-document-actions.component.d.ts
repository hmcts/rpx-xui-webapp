import { EventEmitter, OnInit } from '@angular/core';
import { CaseFileViewOverlayMenuItem } from '../../shared/case-file-view-overlay-menu/case-file-view-overlay-menu-item.model';
import * as i0 from "@angular/core";
export declare class CaseFileViewFolderDocumentActionsComponent implements OnInit {
    isOpen: boolean;
    allowMoving: boolean;
    changeFolderAction: EventEmitter<void>;
    openInANewTabAction: EventEmitter<void>;
    downloadAction: EventEmitter<void>;
    printAction: EventEmitter<void>;
    overlayMenuItems: CaseFileViewOverlayMenuItem[];
    constructor();
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFileViewFolderDocumentActionsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFileViewFolderDocumentActionsComponent, "ccd-case-file-view-folder-document-actions", never, { "allowMoving": "allowMoving"; }, { "changeFolderAction": "changeFolderAction"; "openInANewTabAction": "openInANewTabAction"; "downloadAction": "downloadAction"; "printAction": "printAction"; }, never, never, false, never>;
}
//# sourceMappingURL=case-file-view-folder-document-actions.component.d.ts.map