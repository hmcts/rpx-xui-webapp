import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/case-file-view-overlay-menu/case-file-view-overlay-menu.component";
export class CaseFileViewFolderDocumentActionsComponent {
    constructor() {
        this.isOpen = false;
        this.changeFolderAction = new EventEmitter();
        this.openInANewTabAction = new EventEmitter();
        this.downloadAction = new EventEmitter();
        this.printAction = new EventEmitter();
        this.overlayMenuItems = [
            { actionText: 'Open in a new tab', iconSrc: '/assets/img/case-file-view/document-menu/open_in_new.svg', actionFn: () => this.openInANewTabAction.emit() },
            { actionText: 'Download', iconSrc: '/assets/img/case-file-view/document-menu/download.svg', actionFn: () => this.downloadAction.emit() },
            { actionText: 'Print', iconSrc: '/assets/img/case-file-view/document-menu/print.svg', actionFn: () => this.printAction.emit() },
        ];
    }
    ngOnInit() {
        if (this.allowMoving) {
            this.overlayMenuItems.unshift({ actionText: 'Change folder', iconSrc: '/assets/img/case-file-view/document-menu/open_with.svg', actionFn: () => this.changeFolderAction.emit() });
        }
    }
}
CaseFileViewFolderDocumentActionsComponent.ɵfac = function CaseFileViewFolderDocumentActionsComponent_Factory(t) { return new (t || CaseFileViewFolderDocumentActionsComponent)(); };
CaseFileViewFolderDocumentActionsComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewFolderDocumentActionsComponent, selectors: [["ccd-case-file-view-folder-document-actions"]], inputs: { allowMoving: "allowMoving" }, outputs: { changeFolderAction: "changeFolderAction", openInANewTabAction: "openInANewTabAction", downloadAction: "downloadAction", printAction: "printAction" }, decls: 3, vars: 2, consts: [[3, "menuItems", "isOpen", "isOpenChange"], ["trigger", ""], ["src", "/assets/img/case-file-view/document-menu/more_vert.svg", "alt", "More document options", 1, "actions-trigger-icon"]], template: function CaseFileViewFolderDocumentActionsComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ccd-case-file-view-overlay-menu", 0);
        i0.ɵɵlistener("isOpenChange", function CaseFileViewFolderDocumentActionsComponent_Template_ccd_case_file_view_overlay_menu_isOpenChange_0_listener($event) { return ctx.isOpen = $event; });
        i0.ɵɵelementContainerStart(1, 1);
        i0.ɵɵelement(2, "img", 2);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("menuItems", ctx.overlayMenuItems)("isOpen", ctx.isOpen);
    } }, dependencies: [i1.CaseFileViewOverlayMenuComponent], styles: [".actions-trigger-icon[_ngcontent-%COMP%]{display:block;height:24px;margin-right:-4px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewFolderDocumentActionsComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-file-view-folder-document-actions', template: "<ccd-case-file-view-overlay-menu\n  [menuItems]=\"overlayMenuItems\"\n  [(isOpen)]=\"isOpen\"\n>\n  <ng-container trigger>\n    <img class=\"actions-trigger-icon\" src=\"/assets/img/case-file-view/document-menu/more_vert.svg\"\n      alt=\"More document options\">\n  </ng-container>\n</ccd-case-file-view-overlay-menu>\n", styles: [".actions-trigger-icon{display:block;height:24px;margin-right:-4px}\n"] }]
    }], function () { return []; }, { allowMoving: [{
            type: Input
        }], changeFolderAction: [{
            type: Output
        }], openInANewTabAction: [{
            type: Output
        }], downloadAction: [{
            type: Output
        }], printAction: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY29tcG9uZW50cy9jYXNlLWZpbGUtdmlldy1mb2xkZXIvY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMvY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY29tcG9uZW50cy9jYXNlLWZpbGUtdmlldy1mb2xkZXIvY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMvY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBUS9FLE1BQU0sT0FBTywwQ0FBMEM7SUFnQnJEO1FBZk8sV0FBTSxHQUFHLEtBQUssQ0FBQztRQUlMLHVCQUFrQixHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDOUMsd0JBQW1CLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMvQyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDMUMsZ0JBQVcsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRWpELHFCQUFnQixHQUFrQztZQUN2RCxFQUFFLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsMERBQTBELEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN6SixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLHVEQUF1RCxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hJLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsb0RBQW9ELEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUU7U0FDaEksQ0FBQztJQUVhLENBQUM7SUFFVCxRQUFRO1FBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsZUFBZSxFQUFFLE9BQU8sRUFBRSx3REFBd0QsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNuTDtJQUNILENBQUM7O29JQXRCVSwwQ0FBMEM7NkZBQTFDLDBDQUEwQztRQ1J2RCwwREFHQztRQURDLDJMQUFtQjtRQUVuQixnQ0FBc0I7UUFDcEIseUJBQzhCO1FBQ2hDLDBCQUFlO1FBQ2pCLGlCQUFrQzs7UUFQaEMsZ0RBQThCLHNCQUFBOzt1RkRPbkIsMENBQTBDO2NBTHRELFNBQVM7MkJBQ0UsNENBQTRDO3NDQU90QyxXQUFXO2tCQUExQixLQUFLO1lBRVcsa0JBQWtCO2tCQUFsQyxNQUFNO1lBQ1UsbUJBQW1CO2tCQUFuQyxNQUFNO1lBQ1UsY0FBYztrQkFBOUIsTUFBTTtZQUNVLFdBQVc7a0JBQTNCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDYXNlRmlsZVZpZXdPdmVybGF5TWVudUl0ZW0gfSBmcm9tICcuLi8uLi9zaGFyZWQvY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51L2Nhc2UtZmlsZS12aWV3LW92ZXJsYXktbWVudS1pdGVtLm1vZGVsJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2NkLWNhc2UtZmlsZS12aWV3LWZvbGRlci1kb2N1bWVudC1hY3Rpb25zJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhc2UtZmlsZS12aWV3LWZvbGRlci1kb2N1bWVudC1hY3Rpb25zLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FzZS1maWxlLXZpZXctZm9sZGVyLWRvY3VtZW50LWFjdGlvbnMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlRmlsZVZpZXdGb2xkZXJEb2N1bWVudEFjdGlvbnNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG5cbiAgQElucHV0KCkgcHVibGljIGFsbG93TW92aW5nOiBib29sZWFuO1xuXG4gIEBPdXRwdXQoKSBwdWJsaWMgY2hhbmdlRm9sZGVyQWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcHVibGljIG9wZW5JbkFOZXdUYWJBY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgZG93bmxvYWRBY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSBwdWJsaWMgcHJpbnRBY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgcHVibGljIG92ZXJsYXlNZW51SXRlbXM6IENhc2VGaWxlVmlld092ZXJsYXlNZW51SXRlbVtdID0gW1xuICAgIHsgYWN0aW9uVGV4dDogJ09wZW4gaW4gYSBuZXcgdGFiJywgaWNvblNyYzogJy9hc3NldHMvaW1nL2Nhc2UtZmlsZS12aWV3L2RvY3VtZW50LW1lbnUvb3Blbl9pbl9uZXcuc3ZnJywgYWN0aW9uRm46ICgpID0+IHRoaXMub3BlbkluQU5ld1RhYkFjdGlvbi5lbWl0KCkgfSxcbiAgICB7IGFjdGlvblRleHQ6ICdEb3dubG9hZCcsIGljb25TcmM6ICcvYXNzZXRzL2ltZy9jYXNlLWZpbGUtdmlldy9kb2N1bWVudC1tZW51L2Rvd25sb2FkLnN2ZycsIGFjdGlvbkZuOiAoKSA9PiB0aGlzLmRvd25sb2FkQWN0aW9uLmVtaXQoKSB9LFxuICAgIHsgYWN0aW9uVGV4dDogJ1ByaW50JywgaWNvblNyYzogJy9hc3NldHMvaW1nL2Nhc2UtZmlsZS12aWV3L2RvY3VtZW50LW1lbnUvcHJpbnQuc3ZnJywgYWN0aW9uRm46ICgpID0+IHRoaXMucHJpbnRBY3Rpb24uZW1pdCgpIH0sXG4gIF07XG5cbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5hbGxvd01vdmluZykge1xuICAgICAgdGhpcy5vdmVybGF5TWVudUl0ZW1zLnVuc2hpZnQoeyBhY3Rpb25UZXh0OiAnQ2hhbmdlIGZvbGRlcicsIGljb25TcmM6ICcvYXNzZXRzL2ltZy9jYXNlLWZpbGUtdmlldy9kb2N1bWVudC1tZW51L29wZW5fd2l0aC5zdmcnLCBhY3Rpb25GbjogKCkgPT4gdGhpcy5jaGFuZ2VGb2xkZXJBY3Rpb24uZW1pdCgpIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGNjZC1jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnVcbiAgW21lbnVJdGVtc109XCJvdmVybGF5TWVudUl0ZW1zXCJcbiAgWyhpc09wZW4pXT1cImlzT3BlblwiXG4+XG4gIDxuZy1jb250YWluZXIgdHJpZ2dlcj5cbiAgICA8aW1nIGNsYXNzPVwiYWN0aW9ucy10cmlnZ2VyLWljb25cIiBzcmM9XCIvYXNzZXRzL2ltZy9jYXNlLWZpbGUtdmlldy9kb2N1bWVudC1tZW51L21vcmVfdmVydC5zdmdcIlxuICAgICAgYWx0PVwiTW9yZSBkb2N1bWVudCBvcHRpb25zXCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9jY2QtY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51PlxuIl19