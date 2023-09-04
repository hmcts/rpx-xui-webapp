import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
const _c0 = function (a0, a1, a2, a3, a4, a5) { return { id: a0, label: a1, field_type: a2, display_context_parameter: a3, value: a4, hidden: a5 }; };
function ReadCollectionFieldComponent_table_0_tbody_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody")(1, "tr");
    i0.ɵɵelement(2, "th", 4);
    i0.ɵɵelementStart(3, "td");
    i0.ɵɵelement(4, "ccd-field-read", 5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("caseField", i0.ɵɵpureFunction6(3, _c0, ctx_r1.caseField.label, ctx_r1.caseField.label, ctx_r1.caseField.field_type.collection_field_type, ctx_r1.caseField.display_context_parameter, ctx_r1.caseField.value, ctx_r1.caseField.hidden))("context", ctx_r1.context)("topLevelFormGroup", ctx_r1.topLevelFormGroup);
} }
const _c1 = function (a0, a1, a2, a3, a4) { return { id: a0, label: a1, field_type: a2, value: a3, hidden: a4 }; };
function ReadCollectionFieldComponent_table_0_tbody_3_tr_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵelement(2, "ccd-field-read", 7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    const ctx_r3 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("caseField", i0.ɵɵpureFunction5(4, _c1, i_r5, ctx_r3.caseField.label + " " + (i_r5 + 1), ctx_r3.caseField.field_type.collection_field_type, item_r4.value, ctx_r3.caseField.hidden))("context", ctx_r3.context)("topLevelFormGroup", ctx_r3.topLevelFormGroup)("idPrefix", ctx_r3.buildIdPrefix(i_r5));
} }
function ReadCollectionFieldComponent_table_0_tbody_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tbody");
    i0.ɵɵtemplate(1, ReadCollectionFieldComponent_table_0_tbody_3_tr_1_Template, 3, 10, "tr", 6);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngForOf", ctx_r2.caseField.value);
} }
function ReadCollectionFieldComponent_table_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table", 1);
    i0.ɵɵelementContainerStart(1, 2);
    i0.ɵɵtemplate(2, ReadCollectionFieldComponent_table_0_tbody_2_Template, 5, 10, "tbody", 3);
    i0.ɵɵtemplate(3, ReadCollectionFieldComponent_table_0_tbody_3_Template, 2, 1, "tbody", 3);
    i0.ɵɵelementContainerEnd();
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitch", ctx_r0.isDisplayContextParameterAvailable);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", true);
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("ngSwitchCase", false);
} }
export class ReadCollectionFieldComponent extends AbstractFieldReadComponent {
    constructor() {
        super(...arguments);
        this.isDisplayContextParameterAvailable = false;
    }
    ngOnInit() {
        if (this.caseField.display_context_parameter && this.caseField.display_context_parameter.trim().startsWith('#TABLE(')) {
            this.isDisplayContextParameterAvailable = true;
        }
    }
    buildIdPrefix(index) {
        const prefix = `${this.idPrefix}${this.caseField.id}_`;
        if (this.caseField.field_type.collection_field_type.type === 'Complex') {
            return `${prefix}${index}_`;
        }
        return prefix;
    }
}
ReadCollectionFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadCollectionFieldComponent_BaseFactory; return function ReadCollectionFieldComponent_Factory(t) { return (ɵReadCollectionFieldComponent_BaseFactory || (ɵReadCollectionFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadCollectionFieldComponent)))(t || ReadCollectionFieldComponent); }; }();
ReadCollectionFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadCollectionFieldComponent, selectors: [["ccd-read-collection-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [["class", "collection-field-table", "aria-describedby", "collection table", 4, "ngIf"], ["aria-describedby", "collection table", 1, "collection-field-table"], [3, "ngSwitch"], [4, "ngSwitchCase"], ["id", "hiddenHeader", 2, "display", "none"], [3, "caseField", "context", "topLevelFormGroup"], [4, "ngFor", "ngForOf"], [3, "caseField", "context", "topLevelFormGroup", "idPrefix"]], template: function ReadCollectionFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadCollectionFieldComponent_table_0_Template, 4, 3, "table", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.caseField.value && ctx.caseField.value.length);
    } }, styles: [".collection-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:first-child > td[_ngcontent-%COMP%]{padding-top:0}.collection-field-table[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.collection-field-table[_ngcontent-%COMP%]   td.collection-actions[_ngcontent-%COMP%]{width:1px;white-space:nowrap}.error-spacing[_ngcontent-%COMP%]{margin-top:10px}.collection-title[_ngcontent-%COMP%]{height:51px}.float-left[_ngcontent-%COMP%]{float:left;padding-top:8px}.float-right[_ngcontent-%COMP%]{float:right}.complex-panel[_ngcontent-%COMP%]{margin:13px 0;border:1px solid #bfc1c3}.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel[_ngcontent-%COMP%]   .complex-panel-title[_ngcontent-%COMP%]{font-size:19px;line-height:1.3157894737}}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%] > th[_ngcontent-%COMP%]{vertical-align:top}.complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > th[_ngcontent-%COMP%], .complex-panel[_ngcontent-%COMP%]   .complex-panel-table[_ngcontent-%COMP%] > tbody[_ngcontent-%COMP%] > tr[_ngcontent-%COMP%]:last-child > td[_ngcontent-%COMP%]{border-bottom:none}.complex-panel[_ngcontent-%COMP%]   .complex-panel-simple-field[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{padding-left:5px;width:295px}.complex-panel[_ngcontent-%COMP%]   .complex-panel-compound-field[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:5px}.collection-indicator[_ngcontent-%COMP%]{border-left:solid 5px #b1b4b6}"] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadCollectionFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-read-collection-field', template: "<table *ngIf=\"caseField.value && caseField.value.length \" class=\"collection-field-table\" aria-describedby=\"collection table\">\n  <ng-container [ngSwitch]=\"isDisplayContextParameterAvailable\">\n    <tbody *ngSwitchCase=\"true\">\n    <tr>\n      <th id=\"hiddenHeader\" style=\"display: none;\"></th>\n      <td>\n        <ccd-field-read\n          [caseField]=\"{\n            id: caseField.label,\n            label: caseField.label,\n            field_type: caseField.field_type.collection_field_type,\n            display_context_parameter: caseField.display_context_parameter,\n            value: caseField.value,\n            hidden: caseField.hidden\n          }\"\n          [context]=\"context\"\n          [topLevelFormGroup]=\"topLevelFormGroup\">\n        </ccd-field-read>\n      </td>\n    </tr>\n    </tbody>\n    <tbody *ngSwitchCase=\"false\">\n    <tr *ngFor=\"let item of caseField.value; let i = index\">\n      <td>\n        <ccd-field-read\n          [caseField]=\"{\n            id: i,\n            label: caseField.label + ' ' + (i + 1),\n            field_type: caseField.field_type.collection_field_type,\n            value: item.value,\n            hidden: caseField.hidden\n          }\"\n          [context]=\"context\"\n          [topLevelFormGroup]=\"topLevelFormGroup\"\n          [idPrefix]=\"buildIdPrefix(i)\">\n        </ccd-field-read>\n      </td>\n    </tr>\n    </tbody>\n  </ng-container>\n</table>\n", styles: [".collection-field-table tr:first-child>td{padding-top:0}.collection-field-table tr:last-child>td{border-bottom:none}.collection-field-table td.collection-actions{width:1px;white-space:nowrap}.error-spacing{margin-top:10px}.collection-title{height:51px}.float-left{float:left;padding-top:8px}.float-right{float:right}.complex-panel{margin:13px 0;border:1px solid #bfc1c3}.complex-panel .complex-panel-title{background-color:#dee0e2;padding:5px 5px 2px;border-bottom:1px solid #bfc1c3;display:block;color:#0b0c0c;font-family:nta,Arial,sans-serif;font-weight:700;text-transform:none;font-size:16px;line-height:1.25}@media (min-width: 641px){.complex-panel .complex-panel-title{font-size:19px;line-height:1.3157894737}}.complex-panel .complex-panel-table>tbody>tr>th{vertical-align:top}.complex-panel .complex-panel-table>tbody>tr:last-child>th,.complex-panel .complex-panel-table>tbody>tr:last-child>td{border-bottom:none}.complex-panel .complex-panel-simple-field th{padding-left:5px;width:295px}.complex-panel .complex-panel-compound-field td{padding:5px}.collection-indicator{border-left:solid 5px #b1b4b6}\n"] }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1jb2xsZWN0aW9uLWZpZWxkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbGxlY3Rpb24vcmVhZC1jb2xsZWN0aW9uLWZpZWxkLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL2NvbGxlY3Rpb24vcmVhZC1jb2xsZWN0aW9uLWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUVsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7OztJQ0FyRiw2QkFBNEIsU0FBQTtJQUUxQix3QkFBa0Q7SUFDbEQsMEJBQUk7SUFDRixvQ0FXaUI7SUFDbkIsaUJBQUssRUFBQSxFQUFBOzs7SUFYRCxlQU9FO0lBUEYsc1BBT0UsMkJBQUEsK0NBQUE7Ozs7SUFRUiwwQkFBd0QsU0FBQTtJQUVwRCxvQ0FXaUI7SUFDbkIsaUJBQUssRUFBQTs7Ozs7SUFYRCxlQU1FO0lBTkYsa01BTUUsMkJBQUEsK0NBQUEsd0NBQUE7OztJQVZSLDZCQUE2QjtJQUM3Qiw0RkFlSztJQUNMLGlCQUFROzs7SUFoQmEsZUFBb0I7SUFBcEIsZ0RBQW9COzs7SUF0QjdDLGdDQUE2SDtJQUMzSCxnQ0FBOEQ7SUFDNUQsMEZBa0JRO0lBQ1IseUZBaUJRO0lBQ1YsMEJBQWU7SUFDakIsaUJBQVE7OztJQXZDUSxlQUErQztJQUEvQyxvRUFBK0M7SUFDbkQsZUFBa0I7SUFBbEIsbUNBQWtCO0lBbUJsQixlQUFtQjtJQUFuQixvQ0FBbUI7O0FEWi9CLE1BQU0sT0FBTyw0QkFBNkIsU0FBUSwwQkFBMEI7SUFMNUU7O1FBT1MsdUNBQWtDLEdBQUcsS0FBSyxDQUFDO0tBZW5EO0lBYlEsUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNySCxJQUFJLENBQUMsa0NBQWtDLEdBQUcsSUFBSSxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVNLGFBQWEsQ0FBQyxLQUFhO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtZQUN0RSxPQUFPLEdBQUcsTUFBTSxHQUFHLEtBQUssR0FBRyxDQUFDO1NBQzdCO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQzs7b1NBaEJVLDRCQUE0QixTQUE1Qiw0QkFBNEI7K0VBQTVCLDRCQUE0QjtRQ1R6QyxpRkF3Q1E7O1FBeENBLHdFQUErQzs7dUZEUzFDLDRCQUE0QjtjQUx4QyxTQUFTOzJCQUNFLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLWNvbGxlY3Rpb24tZmllbGQnLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVhZC1jb2xsZWN0aW9uLWZpZWxkLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb2xsZWN0aW9uLWZpZWxkLnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZWFkQ29sbGVjdGlvbkZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIHB1YmxpYyBpc0Rpc3BsYXlDb250ZXh0UGFyYW1ldGVyQXZhaWxhYmxlID0gZmFsc2U7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNhc2VGaWVsZC5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyICYmIHRoaXMuY2FzZUZpZWxkLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIudHJpbSgpLnN0YXJ0c1dpdGgoJyNUQUJMRSgnKSkge1xuICAgICAgdGhpcy5pc0Rpc3BsYXlDb250ZXh0UGFyYW1ldGVyQXZhaWxhYmxlID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgYnVpbGRJZFByZWZpeChpbmRleDogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBwcmVmaXggPSBgJHt0aGlzLmlkUHJlZml4fSR7dGhpcy5jYXNlRmllbGQuaWR9X2A7XG4gICAgaWYgKHRoaXMuY2FzZUZpZWxkLmZpZWxkX3R5cGUuY29sbGVjdGlvbl9maWVsZF90eXBlLnR5cGUgPT09ICdDb21wbGV4Jykge1xuICAgICAgcmV0dXJuIGAke3ByZWZpeH0ke2luZGV4fV9gO1xuICAgIH1cbiAgICByZXR1cm4gcHJlZml4O1xuICB9XG59XG4iLCI8dGFibGUgKm5nSWY9XCJjYXNlRmllbGQudmFsdWUgJiYgY2FzZUZpZWxkLnZhbHVlLmxlbmd0aCBcIiBjbGFzcz1cImNvbGxlY3Rpb24tZmllbGQtdGFibGVcIiBhcmlhLWRlc2NyaWJlZGJ5PVwiY29sbGVjdGlvbiB0YWJsZVwiPlxuICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJpc0Rpc3BsYXlDb250ZXh0UGFyYW1ldGVyQXZhaWxhYmxlXCI+XG4gICAgPHRib2R5ICpuZ1N3aXRjaENhc2U9XCJ0cnVlXCI+XG4gICAgPHRyPlxuICAgICAgPHRoIGlkPVwiaGlkZGVuSGVhZGVyXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPjwvdGg+XG4gICAgICA8dGQ+XG4gICAgICAgIDxjY2QtZmllbGQtcmVhZFxuICAgICAgICAgIFtjYXNlRmllbGRdPVwie1xuICAgICAgICAgICAgaWQ6IGNhc2VGaWVsZC5sYWJlbCxcbiAgICAgICAgICAgIGxhYmVsOiBjYXNlRmllbGQubGFiZWwsXG4gICAgICAgICAgICBmaWVsZF90eXBlOiBjYXNlRmllbGQuZmllbGRfdHlwZS5jb2xsZWN0aW9uX2ZpZWxkX3R5cGUsXG4gICAgICAgICAgICBkaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyOiBjYXNlRmllbGQuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlcixcbiAgICAgICAgICAgIHZhbHVlOiBjYXNlRmllbGQudmFsdWUsXG4gICAgICAgICAgICBoaWRkZW46IGNhc2VGaWVsZC5oaWRkZW5cbiAgICAgICAgICB9XCJcbiAgICAgICAgICBbY29udGV4dF09XCJjb250ZXh0XCJcbiAgICAgICAgICBbdG9wTGV2ZWxGb3JtR3JvdXBdPVwidG9wTGV2ZWxGb3JtR3JvdXBcIj5cbiAgICAgICAgPC9jY2QtZmllbGQtcmVhZD5cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICAgIDx0Ym9keSAqbmdTd2l0Y2hDYXNlPVwiZmFsc2VcIj5cbiAgICA8dHIgKm5nRm9yPVwibGV0IGl0ZW0gb2YgY2FzZUZpZWxkLnZhbHVlOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICA8dGQ+XG4gICAgICAgIDxjY2QtZmllbGQtcmVhZFxuICAgICAgICAgIFtjYXNlRmllbGRdPVwie1xuICAgICAgICAgICAgaWQ6IGksXG4gICAgICAgICAgICBsYWJlbDogY2FzZUZpZWxkLmxhYmVsICsgJyAnICsgKGkgKyAxKSxcbiAgICAgICAgICAgIGZpZWxkX3R5cGU6IGNhc2VGaWVsZC5maWVsZF90eXBlLmNvbGxlY3Rpb25fZmllbGRfdHlwZSxcbiAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlLFxuICAgICAgICAgICAgaGlkZGVuOiBjYXNlRmllbGQuaGlkZGVuXG4gICAgICAgICAgfVwiXG4gICAgICAgICAgW2NvbnRleHRdPVwiY29udGV4dFwiXG4gICAgICAgICAgW3RvcExldmVsRm9ybUdyb3VwXT1cInRvcExldmVsRm9ybUdyb3VwXCJcbiAgICAgICAgICBbaWRQcmVmaXhdPVwiYnVpbGRJZFByZWZpeChpKVwiPlxuICAgICAgICA8L2NjZC1maWVsZC1yZWFkPlxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvbmctY29udGFpbmVyPlxuPC90YWJsZT5cbiJdfQ==