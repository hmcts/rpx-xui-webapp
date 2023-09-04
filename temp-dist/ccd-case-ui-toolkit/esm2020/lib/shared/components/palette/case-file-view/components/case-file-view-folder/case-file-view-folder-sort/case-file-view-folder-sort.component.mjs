import { Component, EventEmitter, Output } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../shared/case-file-view-overlay-menu/case-file-view-overlay-menu.component";
export class CaseFileViewFolderSortComponent {
    constructor() {
        this.isOpen = false;
        this.sortAscending = new EventEmitter();
        this.sortDescending = new EventEmitter();
        this.overlayMenuItems = [
            { actionText: 'A to Z ascending', iconSrc: '/assets/img/sort/sort-down-arrow.svg', actionFn: () => this.sortAscending.emit() },
            { actionText: 'Z to A descending', iconSrc: '/assets/img/sort/sort-up-arrow.svg', actionFn: () => this.sortDescending.emit() },
        ];
    }
}
CaseFileViewFolderSortComponent.ɵfac = function CaseFileViewFolderSortComponent_Factory(t) { return new (t || CaseFileViewFolderSortComponent)(); };
CaseFileViewFolderSortComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewFolderSortComponent, selectors: [["ccd-case-file-view-folder-sort"]], outputs: { sortAscending: "sortAscending", sortDescending: "sortDescending" }, decls: 3, vars: 3, consts: [[3, "title", "menuItems", "isOpen", "isOpenChange"], ["trigger", ""], ["src", "/assets/img/sort/sort-arrows.svg", "alt", "Sort Arrows", 1, "sort-button-icon"]], template: function CaseFileViewFolderSortComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "ccd-case-file-view-overlay-menu", 0);
        i0.ɵɵlistener("isOpenChange", function CaseFileViewFolderSortComponent_Template_ccd_case_file_view_overlay_menu_isOpenChange_0_listener($event) { return ctx.isOpen = $event; });
        i0.ɵɵelementContainerStart(1, 1);
        i0.ɵɵelement(2, "img", 2);
        i0.ɵɵelementContainerEnd();
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("title", "Sort documents by name")("menuItems", ctx.overlayMenuItems)("isOpen", ctx.isOpen);
    } }, dependencies: [i1.CaseFileViewOverlayMenuComponent], styles: [".sort-button-icon[_ngcontent-%COMP%]{display:block;height:20px;margin-right:-2px}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewFolderSortComponent, [{
        type: Component,
        args: [{ selector: 'ccd-case-file-view-folder-sort', template: "<ccd-case-file-view-overlay-menu\n  [title]=\"'Sort documents by name'\"\n  [menuItems]=\"overlayMenuItems\"\n  [(isOpen)]=\"isOpen\"\n>\n  <ng-container trigger>\n    <img class=\"sort-button-icon\" src=\"/assets/img/sort/sort-arrows.svg\" alt=\"Sort Arrows\">\n  </ng-container>\n</ccd-case-file-view-overlay-menu>\n", styles: [".sort-button-icon{display:block;height:20px;margin-right:-2px}\n"] }]
    }], function () { return []; }, { sortAscending: [{
            type: Output
        }], sortDescending: [{
            type: Output
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY29tcG9uZW50cy9jYXNlLWZpbGUtdmlldy1mb2xkZXIvY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQvY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvY2FzZS1maWxlLXZpZXcvY29tcG9uZW50cy9jYXNlLWZpbGUtdmlldy1mb2xkZXIvY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQvY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFRaEUsTUFBTSxPQUFPLCtCQUErQjtJQVUxQztRQVRPLFdBQU0sR0FBRyxLQUFLLENBQUM7UUFFTCxrQkFBYSxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDekMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBRXBELHFCQUFnQixHQUFrQztZQUN2RCxFQUFFLFVBQVUsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsc0NBQXNDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDOUgsRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxFQUFFO1NBQy9ILENBQUM7SUFDYyxDQUFDOzs4R0FWTiwrQkFBK0I7a0ZBQS9CLCtCQUErQjtRQ1I1QywwREFJQztRQURDLGdMQUFtQjtRQUVuQixnQ0FBc0I7UUFDcEIseUJBQXVGO1FBQ3pGLDBCQUFlO1FBQ2pCLGlCQUFrQzs7UUFQaEMsZ0RBQWtDLG1DQUFBLHNCQUFBOzt1RkRPdkIsK0JBQStCO2NBTDNDLFNBQVM7MkJBQ0UsZ0NBQWdDO3NDQU96QixhQUFhO2tCQUE3QixNQUFNO1lBQ1UsY0FBYztrQkFBOUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENhc2VGaWxlVmlld092ZXJsYXlNZW51SXRlbSB9IGZyb20gJy4uLy4uL3NoYXJlZC9jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnUvY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51LWl0ZW0ubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FzZS1maWxlLXZpZXctZm9sZGVyLXNvcnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jYXNlLWZpbGUtdmlldy1mb2xkZXItc29ydC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIENhc2VGaWxlVmlld0ZvbGRlclNvcnRDb21wb25lbnQge1xuICBwdWJsaWMgaXNPcGVuID0gZmFsc2U7XG5cbiAgQE91dHB1dCgpIHB1YmxpYyBzb3J0QXNjZW5kaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcHVibGljIHNvcnREZXNjZW5kaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHB1YmxpYyBvdmVybGF5TWVudUl0ZW1zOiBDYXNlRmlsZVZpZXdPdmVybGF5TWVudUl0ZW1bXSA9IFtcbiAgICB7IGFjdGlvblRleHQ6ICdBIHRvIFogYXNjZW5kaW5nJywgaWNvblNyYzogJy9hc3NldHMvaW1nL3NvcnQvc29ydC1kb3duLWFycm93LnN2ZycsIGFjdGlvbkZuOiAoKSA9PiB0aGlzLnNvcnRBc2NlbmRpbmcuZW1pdCgpIH0sXG4gICAgeyBhY3Rpb25UZXh0OiAnWiB0byBBIGRlc2NlbmRpbmcnLCBpY29uU3JjOiAnL2Fzc2V0cy9pbWcvc29ydC9zb3J0LXVwLWFycm93LnN2ZycsIGFjdGlvbkZuOiAoKSA9PiB0aGlzLnNvcnREZXNjZW5kaW5nLmVtaXQoKSB9LFxuICBdO1xuICBjb25zdHJ1Y3RvcigpIHsgfVxufVxuIiwiPGNjZC1jYXNlLWZpbGUtdmlldy1vdmVybGF5LW1lbnVcbiAgW3RpdGxlXT1cIidTb3J0IGRvY3VtZW50cyBieSBuYW1lJ1wiXG4gIFttZW51SXRlbXNdPVwib3ZlcmxheU1lbnVJdGVtc1wiXG4gIFsoaXNPcGVuKV09XCJpc09wZW5cIlxuPlxuICA8bmctY29udGFpbmVyIHRyaWdnZXI+XG4gICAgPGltZyBjbGFzcz1cInNvcnQtYnV0dG9uLWljb25cIiBzcmM9XCIvYXNzZXRzL2ltZy9zb3J0L3NvcnQtYXJyb3dzLnN2Z1wiIGFsdD1cIlNvcnQgQXJyb3dzXCI+XG4gIDwvbmctY29udGFpbmVyPlxuPC9jY2QtY2FzZS1maWxlLXZpZXctb3ZlcmxheS1tZW51PlxuIl19