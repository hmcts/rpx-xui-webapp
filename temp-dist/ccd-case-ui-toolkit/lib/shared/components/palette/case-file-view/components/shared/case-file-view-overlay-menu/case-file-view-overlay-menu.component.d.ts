import { EventEmitter } from '@angular/core';
import { CaseFileViewOverlayMenuItem } from './case-file-view-overlay-menu-item.model';
import * as i0 from "@angular/core";
export declare class CaseFileViewOverlayMenuComponent {
    title: string;
    menuItems: CaseFileViewOverlayMenuItem[];
    isOpen: boolean;
    isOpenChange: EventEmitter<boolean>;
    closeOverlay(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CaseFileViewOverlayMenuComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CaseFileViewOverlayMenuComponent, "ccd-case-file-view-overlay-menu", never, { "title": "title"; "menuItems": "menuItems"; "isOpen": "isOpen"; }, { "isOpenChange": "isOpenChange"; }, never, ["[trigger]"], false, never>;
}
//# sourceMappingURL=case-file-view-overlay-menu.component.d.ts.map