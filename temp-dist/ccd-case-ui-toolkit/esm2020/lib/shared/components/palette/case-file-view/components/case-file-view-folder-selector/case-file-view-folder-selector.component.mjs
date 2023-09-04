import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/dialog";
import * as i2 from "@angular/common";
function CaseFileViewFolderSelectorComponent_ng_container_6_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c0 = function (a0) { return { cat: a0, level: 1 }; };
function CaseFileViewFolderSelectorComponent_ng_container_6_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseFileViewFolderSelectorComponent_ng_container_6_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const cat_r3 = ctx.$implicit;
    i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(13);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction1(2, _c0, cat_r3));
} }
function CaseFileViewFolderSelectorComponent_ng_template_12_ng_container_5_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainer(0);
} }
const _c1 = function (a0, a1) { return { cat: a0, level: a1 }; };
function CaseFileViewFolderSelectorComponent_ng_template_12_ng_container_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵtemplate(1, CaseFileViewFolderSelectorComponent_ng_template_12_ng_container_5_ng_container_1_Template, 1, 0, "ng-container", 8);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const subcat_r8 = ctx.$implicit;
    const level_r6 = i0.ɵɵnextContext().level;
    i0.ɵɵnextContext();
    const _r1 = i0.ɵɵreference(13);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngTemplateOutlet", _r1)("ngTemplateOutletContext", i0.ɵɵpureFunction2(2, _c1, subcat_r8, level_r6 + 1));
} }
function CaseFileViewFolderSelectorComponent_ng_template_12_Template(rf, ctx) { if (rf & 1) {
    const _r12 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 9)(1, "input", 10);
    i0.ɵɵlistener("click", function CaseFileViewFolderSelectorComponent_ng_template_12_Template_input_click_1_listener($event) { i0.ɵɵrestoreView(_r12); const ctx_r11 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r11.handleChange($event)); });
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(2, "label", 11);
    i0.ɵɵelement(3, "img", 12);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(5, CaseFileViewFolderSelectorComponent_ng_template_12_ng_container_5_Template, 2, 5, "ng-container", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const cat_r5 = ctx.cat;
    const level_r6 = ctx.level;
    i0.ɵɵadvance(1);
    i0.ɵɵpropertyInterpolate1("name", "level-", level_r6, "");
    i0.ɵɵproperty("id", cat_r5.category_id);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", cat_r5.category_id);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1(" ", cat_r5.category_name, " ");
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", cat_r5.sub_categories);
} }
export class CaseFileViewFolderSelectorComponent {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.currentCategories = [];
        this.selected = '';
        this.currentCategories = [...this.data.categories];
    }
    ngAfterViewInit() {
        const path = this.findPath();
        path.forEach(p => document.getElementById(p).checked = true);
    }
    handleChange(evt) {
        if (evt.target.checked) {
            this.select(evt.target.id);
            // get level of this checkbox so we can clear all lower levels
            let level = parseInt(evt.target.name.split('-')[1], 10) + 1;
            let nodes = document.getElementsByName(`level-${level}`);
            while (nodes.length > 0) {
                nodes.forEach((node) => node.checked = false);
                level += 1;
                nodes = document.getElementsByName(`level-${level}`);
            }
        }
    }
    select(categoryId) {
        this.selected = categoryId;
    }
    cancel() {
        this.dialogRef.close();
    }
    save() {
        this.dialogRef.close(this.selected.length > 0 ? this.selected : null);
    }
    findPath() {
        for (const c of this.data.categories) {
            const r = this.containsDocument(c, this.data.document);
            if (r) {
                return r;
            }
        }
    }
    containsDocument(cat, document) {
        if (cat.documents.findIndex(doc => doc.document_binary_url === document.document_binary_url) > -1) {
            return [cat.category_id];
        }
        for (const c of cat.sub_categories) {
            const r = this.containsDocument(c, document);
            if (r) {
                return [cat.category_id, ...r];
            }
        }
        return null;
    }
}
CaseFileViewFolderSelectorComponent.ɵfac = function CaseFileViewFolderSelectorComponent_Factory(t) { return new (t || CaseFileViewFolderSelectorComponent)(i0.ɵɵdirectiveInject(i1.MatDialogRef), i0.ɵɵdirectiveInject(MAT_DIALOG_DATA)); };
CaseFileViewFolderSelectorComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: CaseFileViewFolderSelectorComponent, selectors: [["xui-case-file-view-folder-selector"]], decls: 14, vars: 2, consts: [[1, "close", 3, "click"], [1, "govuk-heading-l"], [1, "folders", "govuk-radios", "govuk-radios--conditional"], [4, "ngFor", "ngForOf"], [1, "govuk-button-group"], ["type", "button", 1, "button", "button-primary", 3, "click"], [1, "cancel", 3, "click"], ["folder", ""], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "folder", "govuk-radios__item"], ["type", "radio", 1, "govuk-radios__input", 3, "name", "id", "click"], [1, "govuk-label", "govuk-radios__label", 3, "for"], ["src", "/assets/images/folder.png", "alt", "Folder icon", 1, "iconImg"]], template: function CaseFileViewFolderSelectorComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "div", 0);
        i0.ɵɵlistener("click", function CaseFileViewFolderSelectorComponent_Template_div_click_0_listener() { return ctx.cancel(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(1, "h2", 1);
        i0.ɵɵtext(2, "Move File");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(3, "p");
        i0.ɵɵtext(4);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "div", 2);
        i0.ɵɵtemplate(6, CaseFileViewFolderSelectorComponent_ng_container_6_Template, 2, 4, "ng-container", 3);
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(7, "div", 4)(8, "button", 5);
        i0.ɵɵlistener("click", function CaseFileViewFolderSelectorComponent_Template_button_click_8_listener() { return ctx.save(); });
        i0.ɵɵtext(9, "Save");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "a", 6);
        i0.ɵɵlistener("click", function CaseFileViewFolderSelectorComponent_Template_a_click_10_listener() { return ctx.cancel(); });
        i0.ɵɵtext(11, "Cancel");
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(12, CaseFileViewFolderSelectorComponent_ng_template_12_Template, 6, 5, "ng-template", null, 7, i0.ɵɵtemplateRefExtractor);
    } if (rf & 2) {
        i0.ɵɵadvance(4);
        i0.ɵɵtextInterpolate1("Where do you want to move \"", ctx.data.document.document_filename, "\" file?");
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngForOf", ctx.currentCategories);
    } }, dependencies: [i2.NgForOf, i2.NgTemplateOutlet], styles: [":host{position:relative;display:block}.folders{margin-bottom:20px}.folder{display:none;border-top:1px solid #CCC;margin:0 0 -1px}.folder:last-child{border-bottom:1px solid #CCC}.folders>.folder{display:block}input:checked~.folder{display:block}.iconImg{position:relative;display:inline-block;height:28px}.folder>.folder{margin-left:20px}.folder label:before{top:3px}.folder label:after{top:13px}p{font-weight:700}button{margin-right:20px}.close{float:right;width:30px;height:30px;background:url(/assets/img/x.PNG) no-repeat center center;cursor:pointer}.cancel{cursor:pointer}.cdk-overlay-pane{overflow:auto}.cdk-overlay-pane::-webkit-scrollbar{width:7px}.cdk-overlay-pane::-webkit-scrollbar-thumb{border:4px solid rgba(0,0,0,0);background-clip:padding-box;border-radius:9999px;background-color:#aaa}.cdk-overlay-pane::-webkit-scrollbar-button{display:none}.cdk-overlay-pane::-webkit-scrollbar-track-piece{background:#EEE}.cdk-overlay-pane::-webkit-scrollbar-thumb{background:#CCC}\n"], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseFileViewFolderSelectorComponent, [{
        type: Component,
        args: [{ selector: 'xui-case-file-view-folder-selector', encapsulation: ViewEncapsulation.None, template: "<div class=\"close\" (click)=\"cancel()\"></div>\n<h2 class=\"govuk-heading-l\">Move File</h2>\n<p>Where do you want to move \"{{ data.document.document_filename }}\" file?</p>\n<div class=\"folders govuk-radios govuk-radios--conditional\">\n    <ng-container *ngFor=\"let cat of currentCategories\">\n        <ng-container *ngTemplateOutlet=\"folder;context:{cat:cat,level:1}\"></ng-container>\n    </ng-container>\n</div>\n<div class=\"govuk-button-group\">\n    <button class=\"button button-primary\" type=\"button\" (click)=\"save()\">Save</button>\n    <a (click)=\"cancel()\" class=\"cancel\">Cancel</a>\n</div>\n\n<ng-template #folder let-cat=\"cat\" let-level=\"level\">\n    <div class=\"folder govuk-radios__item\">\n        <input class=\"govuk-radios__input\" type=\"radio\" name=\"level-{{level}}\" [id]=\"cat.category_id\" (click)=\"handleChange($event)\" />\n        <label class=\"govuk-label govuk-radios__label\" [for]=\"cat.category_id\">\n            <img class=\"iconImg\" src=\"/assets/images/folder.png\" alt=\"Folder icon\" />\n            {{ cat.category_name }}\n        </label>\n        <ng-container *ngFor=\"let subcat of cat.sub_categories\">\n            <ng-container *ngTemplateOutlet=\"folder;context:{cat:subcat,level:level+1}\"></ng-container>\n        </ng-container>\n    </div>\n</ng-template>", styles: [":host{position:relative;display:block}.folders{margin-bottom:20px}.folder{display:none;border-top:1px solid #CCC;margin:0 0 -1px}.folder:last-child{border-bottom:1px solid #CCC}.folders>.folder{display:block}input:checked~.folder{display:block}.iconImg{position:relative;display:inline-block;height:28px}.folder>.folder{margin-left:20px}.folder label:before{top:3px}.folder label:after{top:13px}p{font-weight:700}button{margin-right:20px}.close{float:right;width:30px;height:30px;background:url(/assets/img/x.PNG) no-repeat center center;cursor:pointer}.cancel{cursor:pointer}.cdk-overlay-pane{overflow:auto}.cdk-overlay-pane::-webkit-scrollbar{width:7px}.cdk-overlay-pane::-webkit-scrollbar-thumb{border:4px solid rgba(0,0,0,0);background-clip:padding-box;border-radius:9999px;background-color:#aaa}.cdk-overlay-pane::-webkit-scrollbar-button{display:none}.cdk-overlay-pane::-webkit-scrollbar-track-piece{background:#EEE}.cdk-overlay-pane::-webkit-scrollbar-thumb{background:#CCC}\n"] }]
    }], function () { return [{ type: i1.MatDialogRef }, { type: undefined, decorators: [{
                type: Inject,
                args: [MAT_DIALOG_DATA]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWxlLXZpZXctZm9sZGVyLXNlbGVjdG9yLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2Nhc2UtZmlsZS12aWV3L2NvbXBvbmVudHMvY2FzZS1maWxlLXZpZXctZm9sZGVyLXNlbGVjdG9yL2Nhc2UtZmlsZS12aWV3LWZvbGRlci1zZWxlY3Rvci5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9jYXNlLWZpbGUtdmlldy9jb21wb25lbnRzL2Nhc2UtZmlsZS12aWV3LWZvbGRlci1zZWxlY3Rvci9jYXNlLWZpbGUtdmlldy1mb2xkZXItc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsTUFBTSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3BGLE9BQU8sRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7O0lDSWpFLHdCQUFrRjs7OztJQUR0Riw2QkFBb0Q7SUFDaEQscUhBQWtGO0lBQ3RGLDBCQUFlOzs7OztJQURJLGVBQXlCO0lBQXpCLHNDQUF5QiwrREFBQTs7O0lBZ0JwQyx3QkFBMkY7Ozs7SUFEL0YsNkJBQXdEO0lBQ3BELG9JQUEyRjtJQUMvRiwwQkFBZTs7Ozs7O0lBREksZUFBeUI7SUFBekIsc0NBQXlCLGdGQUFBOzs7O0lBUGhELDhCQUF1QyxnQkFBQTtJQUMyRCxnTUFBUyxlQUFBLDRCQUFvQixDQUFBLElBQUM7SUFBNUgsaUJBQStIO0lBQy9ILGlDQUF1RTtJQUNuRSww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LEVBQUU7WUFDL0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QjtRQUNELEtBQUssTUFBTSxDQUFDLElBQUksR0FBRyxDQUFDLGNBQWMsRUFBRTtZQUNoQyxNQUFNLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxFQUFFO2dCQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEM7U0FDSjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7O3NIQS9EUSxtQ0FBbUMsOERBT2hDLGVBQWU7c0ZBUGxCLG1DQUFtQztRQ1hoRCw4QkFBc0M7UUFBbkIsNkdBQVMsWUFBUSxJQUFDO1FBQUMsaUJBQU07UUFDNUMsNkJBQTRCO1FBQUEseUJBQVM7UUFBQSxpQkFBSztRQUMxQyx5QkFBRztRQUFBLFlBQXVFO1FBQUEsaUJBQUk7UUFDOUUsOEJBQTREO1FBQ3hELHNHQUVlO1FBQ25CLGlCQUFNO1FBQ04sOEJBQWdDLGdCQUFBO1FBQ3dCLGdIQUFTLFVBQU0sSUFBQztRQUFDLG9CQUFJO1FBQUEsaUJBQVM7UUFDbEYsNkJBQXFDO1FBQWxDLDRHQUFTLFlBQVEsSUFBQztRQUFnQix1QkFBTTtRQUFBLGlCQUFJLEVBQUE7UUFHbkQsdUlBV2M7O1FBdEJYLGVBQXVFO1FBQXZFLHNHQUF1RTtRQUV4QyxlQUFvQjtRQUFwQiwrQ0FBb0I7O3VGRE96QyxtQ0FBbUM7Y0FOL0MsU0FBUzsyQkFDSSxvQ0FBb0MsaUJBRy9CLGlCQUFpQixDQUFDLElBQUk7O3NCQVNoQyxNQUFNO3VCQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIEluamVjdCwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IERvY3VtZW50VHJlZU5vZGUgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4vY2FzZS1maWxlLXZpZXcnO1xuaW1wb3J0IHsgQ2FzZUZpbGVWaWV3Q2F0ZWdvcnkgfSBmcm9tICcuLi8uLi8uLi8uLi8uLi9kb21haW4vY2FzZS1maWxlLXZpZXcvY2FzZS1maWxlLXZpZXctY2F0ZWdvcnkubW9kZWwnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3h1aS1jYXNlLWZpbGUtdmlldy1mb2xkZXItc2VsZWN0b3InLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9jYXNlLWZpbGUtdmlldy1mb2xkZXItc2VsZWN0b3IuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2Nhc2UtZmlsZS12aWV3LWZvbGRlci1zZWxlY3Rvci5jb21wb25lbnQuc2NzcyddLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmVcbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUZpbGVWaWV3Rm9sZGVyU2VsZWN0b3JDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIHB1YmxpYyBjdXJyZW50Q2F0ZWdvcmllczogQ2FzZUZpbGVWaWV3Q2F0ZWdvcnlbXSA9IFtdO1xuICAgIHB1YmxpYyBzZWxlY3RlZDogc3RyaW5nID0gJyc7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPENhc2VGaWxlVmlld0ZvbGRlclNlbGVjdG9yQ29tcG9uZW50PixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiB7IGNhdGVnb3JpZXM6IENhc2VGaWxlVmlld0NhdGVnb3J5W10sIGRvY3VtZW50OiBEb2N1bWVudFRyZWVOb2RlIH1cbiAgICApIHtcbiAgICAgICAgdGhpcy5jdXJyZW50Q2F0ZWdvcmllcyA9IFsuLi50aGlzLmRhdGEuY2F0ZWdvcmllc107XG4gICAgfVxuXG4gICAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcGF0aCA9IHRoaXMuZmluZFBhdGgoKTtcbiAgICAgICAgcGF0aC5mb3JFYWNoKHAgPT4gKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHApIGFzIEhUTUxJbnB1dEVsZW1lbnQpLmNoZWNrZWQgPSB0cnVlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgaGFuZGxlQ2hhbmdlKGV2dCkge1xuICAgICAgICBpZiAoZXZ0LnRhcmdldC5jaGVja2VkKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdChldnQudGFyZ2V0LmlkKTtcbiAgICAgICAgICAgIC8vIGdldCBsZXZlbCBvZiB0aGlzIGNoZWNrYm94IHNvIHdlIGNhbiBjbGVhciBhbGwgbG93ZXIgbGV2ZWxzXG4gICAgICAgICAgICBsZXQgbGV2ZWwgPSBwYXJzZUludChldnQudGFyZ2V0Lm5hbWUuc3BsaXQoJy0nKVsxXSwgMTApICsgMTtcbiAgICAgICAgICAgIGxldCBub2RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGBsZXZlbC0ke2xldmVsfWApO1xuICAgICAgICAgICAgd2hpbGUgKG5vZGVzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlOiBIVE1MSW5wdXRFbGVtZW50KSA9PiBub2RlLmNoZWNrZWQgPSBmYWxzZSk7XG4gICAgICAgICAgICAgICAgbGV2ZWwgKz0gMTtcbiAgICAgICAgICAgICAgICBub2RlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlOYW1lKGBsZXZlbC0ke2xldmVsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHVibGljIHNlbGVjdChjYXRlZ29yeUlkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGNhdGVnb3J5SWQ7XG4gICAgfVxuXG4gICAgcHVibGljIGNhbmNlbCgpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc2F2ZSgpIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UodGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwID8gdGhpcy5zZWxlY3RlZCA6IG51bGwpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZmluZFBhdGgoKTogc3RyaW5nW10ge1xuICAgICAgICBmb3IgKGNvbnN0IGMgb2YgdGhpcy5kYXRhLmNhdGVnb3JpZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IHIgPSB0aGlzLmNvbnRhaW5zRG9jdW1lbnQoYywgdGhpcy5kYXRhLmRvY3VtZW50KTtcbiAgICAgICAgICAgIGlmIChyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRhaW5zRG9jdW1lbnQoY2F0OiBDYXNlRmlsZVZpZXdDYXRlZ29yeSwgZG9jdW1lbnQ6IERvY3VtZW50VHJlZU5vZGUpOiBzdHJpbmdbXSB8IG51bGwge1xuICAgICAgICBpZiAoY2F0LmRvY3VtZW50cy5maW5kSW5kZXgoZG9jID0+IGRvYy5kb2N1bWVudF9iaW5hcnlfdXJsID09PSBkb2N1bWVudC5kb2N1bWVudF9iaW5hcnlfdXJsKSA+IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gW2NhdC5jYXRlZ29yeV9pZF07XG4gICAgICAgIH1cbiAgICAgICAgZm9yIChjb25zdCBjIG9mIGNhdC5zdWJfY2F0ZWdvcmllcykge1xuICAgICAgICAgICAgY29uc3QgciA9IHRoaXMuY29udGFpbnNEb2N1bWVudChjLCBkb2N1bWVudCk7XG4gICAgICAgICAgICBpZiAocikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbY2F0LmNhdGVnb3J5X2lkLCAuLi5yXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY2xvc2VcIiAoY2xpY2spPVwiY2FuY2VsKClcIj48L2Rpdj5cbjxoMiBjbGFzcz1cImdvdnVrLWhlYWRpbmctbFwiPk1vdmUgRmlsZTwvaDI+XG48cD5XaGVyZSBkbyB5b3Ugd2FudCB0byBtb3ZlIFwie3sgZGF0YS5kb2N1bWVudC5kb2N1bWVudF9maWxlbmFtZSB9fVwiIGZpbGU/PC9wPlxuPGRpdiBjbGFzcz1cImZvbGRlcnMgZ292dWstcmFkaW9zIGdvdnVrLXJhZGlvcy0tY29uZGl0aW9uYWxcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBjYXQgb2YgY3VycmVudENhdGVnb3JpZXNcIj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImZvbGRlcjtjb250ZXh0OntjYXQ6Y2F0LGxldmVsOjF9XCI+PC9uZy1jb250YWluZXI+XG4gICAgPC9uZy1jb250YWluZXI+XG48L2Rpdj5cbjxkaXYgY2xhc3M9XCJnb3Z1ay1idXR0b24tZ3JvdXBcIj5cbiAgICA8YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGJ1dHRvbi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJzYXZlKClcIj5TYXZlPC9idXR0b24+XG4gICAgPGEgKGNsaWNrKT1cImNhbmNlbCgpXCIgY2xhc3M9XCJjYW5jZWxcIj5DYW5jZWw8L2E+XG48L2Rpdj5cblxuPG5nLXRlbXBsYXRlICNmb2xkZXIgbGV0LWNhdD1cImNhdFwiIGxldC1sZXZlbD1cImxldmVsXCI+XG4gICAgPGRpdiBjbGFzcz1cImZvbGRlciBnb3Z1ay1yYWRpb3NfX2l0ZW1cIj5cbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZ292dWstcmFkaW9zX19pbnB1dFwiIHR5cGU9XCJyYWRpb1wiIG5hbWU9XCJsZXZlbC17e2xldmVsfX1cIiBbaWRdPVwiY2F0LmNhdGVnb3J5X2lkXCIgKGNsaWNrKT1cImhhbmRsZUNoYW5nZSgkZXZlbnQpXCIgLz5cbiAgICAgICAgPGxhYmVsIGNsYXNzPVwiZ292dWstbGFiZWwgZ292dWstcmFkaW9zX19sYWJlbFwiIFtmb3JdPVwiY2F0LmNhdGVnb3J5X2lkXCI+XG4gICAgICAgICAgICA8aW1nIGNsYXNzPVwiaWNvbkltZ1wiIHNyYz1cIi9hc3NldHMvaW1hZ2VzL2ZvbGRlci5wbmdcIiBhbHQ9XCJGb2xkZXIgaWNvblwiIC8+XG4gICAgICAgICAgICB7eyBjYXQuY2F0ZWdvcnlfbmFtZSB9fVxuICAgICAgICA8L2xhYmVsPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCBzdWJjYXQgb2YgY2F0LnN1Yl9jYXRlZ29yaWVzXCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9sZGVyO2NvbnRleHQ6e2NhdDpzdWJjYXQsbGV2ZWw6bGV2ZWwrMX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgPC9kaXY+XG48L25nLXRlbXBsYXRlPiJdfQ==