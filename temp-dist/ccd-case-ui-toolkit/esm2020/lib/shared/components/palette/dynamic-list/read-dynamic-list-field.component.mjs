import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "./dynamic-list.pipe";
export class ReadDynamicListFieldComponent extends AbstractFieldReadComponent {
    ngOnInit() {
        /**
         *
         * Reassigning list_items from formatted_list when list_items is empty
         */
        if (!this.caseField.list_items && this.caseField.formatted_value && this.caseField.formatted_value.list_items) {
            this.caseField.list_items = this.caseField.formatted_value.list_items;
        }
        super.ngOnInit();
    }
}
ReadDynamicListFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadDynamicListFieldComponent_BaseFactory; return function ReadDynamicListFieldComponent_Factory(t) { return (ɵReadDynamicListFieldComponent_BaseFactory || (ɵReadDynamicListFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadDynamicListFieldComponent)))(t || ReadDynamicListFieldComponent); }; }();
ReadDynamicListFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadDynamicListFieldComponent, selectors: [["ccd-read-dynamic-list-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 4, vars: 6, consts: [[1, "text-16"]], template: function ReadDynamicListFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵpipe(2, "rpxTranslate");
        i0.ɵɵpipe(3, "ccdDynamicList");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(2, 1, i0.ɵɵpipeBind2(3, 3, ctx.caseField.value, ctx.caseField.list_items)));
    } }, dependencies: [i1.RpxTranslatePipe, i2.DynamicListPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadDynamicListFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-dynamic-list-field',
                template: '<span class="text-16">{{caseField.value | ccdDynamicList:caseField.list_items | rpxTranslate}}</span>',
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1keW5hbWljLWxpc3QtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvZHluYW1pYy1saXN0L3JlYWQtZHluYW1pYy1saXN0LWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDOzs7O0FBTXpGLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSwwQkFBMEI7SUFFcEUsUUFBUTtRQUNiOzs7V0FHRztRQUNILElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUU7WUFDN0csSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDO1NBQ3ZFO1FBQ0QsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ25CLENBQUM7O3lTQVhVLDZCQUE2QixTQUE3Qiw2QkFBNkI7Z0ZBQTdCLDZCQUE2QjtRQUY3QiwrQkFBc0I7UUFBQSxZQUF3RTs7O1FBQUEsaUJBQU87O1FBQS9FLGVBQXdFO1FBQXhFLCtHQUF3RTs7dUZBRTlGLDZCQUE2QjtjQUp6QyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLDZCQUE2QjtnQkFDdkMsUUFBUSxFQUFFLHVHQUF1RzthQUNsSCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtcmVhZC1keW5hbWljLWxpc3QtZmllbGQnLFxuICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwidGV4dC0xNlwiPnt7Y2FzZUZpZWxkLnZhbHVlIHwgY2NkRHluYW1pY0xpc3Q6Y2FzZUZpZWxkLmxpc3RfaXRlbXMgfCBycHhUcmFuc2xhdGV9fTwvc3Bhbj4nLFxufSlcbmV4cG9ydCBjbGFzcyBSZWFkRHluYW1pY0xpc3RGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBSZWFzc2lnbmluZyBsaXN0X2l0ZW1zIGZyb20gZm9ybWF0dGVkX2xpc3Qgd2hlbiBsaXN0X2l0ZW1zIGlzIGVtcHR5XG4gICAgICovXG4gICAgaWYgKCF0aGlzLmNhc2VGaWVsZC5saXN0X2l0ZW1zICYmIHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZSAmJiB0aGlzLmNhc2VGaWVsZC5mb3JtYXR0ZWRfdmFsdWUubGlzdF9pdGVtcykge1xuICAgICAgdGhpcy5jYXNlRmllbGQubGlzdF9pdGVtcyA9IHRoaXMuY2FzZUZpZWxkLmZvcm1hdHRlZF92YWx1ZS5saXN0X2l0ZW1zO1xuICAgIH1cbiAgICBzdXBlci5uZ09uSW5pdCgpO1xuICB9XG59XG4iXX0=