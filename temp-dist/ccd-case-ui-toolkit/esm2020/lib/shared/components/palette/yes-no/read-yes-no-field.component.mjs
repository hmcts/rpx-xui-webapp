import { Component } from '@angular/core';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import { YesNoService } from './yes-no.service';
import * as i0 from "@angular/core";
import * as i1 from "./yes-no.service";
export class ReadYesNoFieldComponent extends AbstractFieldReadComponent {
    constructor(yesNoService) {
        super();
        this.yesNoService = yesNoService;
    }
    ngOnInit() {
        super.ngOnInit();
        this.formattedValue = this.yesNoService.format(this.caseField.value);
    }
}
ReadYesNoFieldComponent.ɵfac = function ReadYesNoFieldComponent_Factory(t) { return new (t || ReadYesNoFieldComponent)(i0.ɵɵdirectiveInject(i1.YesNoService)); };
ReadYesNoFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadYesNoFieldComponent, selectors: [["ccd-read-yes-no-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 2, vars: 1, consts: [[1, "text-16"]], template: function ReadYesNoFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "span", 0);
        i0.ɵɵtext(1);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(ctx.formattedValue);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadYesNoFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-yes-no-field',
                template: `<span class="text-16">{{formattedValue}}</span>`
            }]
    }], function () { return [{ type: i1.YesNoService }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC15ZXMtbm8tZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUveWVzLW5vL3JlYWQteWVzLW5vLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDZDQUE2QyxDQUFDO0FBQ3pGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7O0FBTWhELE1BQU0sT0FBTyx1QkFBd0IsU0FBUSwwQkFBMEI7SUFHckUsWUFBNkIsWUFBMEI7UUFDckQsS0FBSyxFQUFFLENBQUM7UUFEbUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFFdkQsQ0FBQztJQUVNLFFBQVE7UUFDYixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDakIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7OzhGQVZVLHVCQUF1QjswRUFBdkIsdUJBQXVCO1FBRnZCLCtCQUFzQjtRQUFBLFlBQWtCO1FBQUEsaUJBQU87O1FBQXpCLGVBQWtCO1FBQWxCLHdDQUFrQjs7dUZBRXhDLHVCQUF1QjtjQUpuQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsUUFBUSxFQUFFLGlEQUFpRDthQUM1RCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UtZmllbGQvYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQnO1xuaW1wb3J0IHsgWWVzTm9TZXJ2aWNlIH0gZnJvbSAnLi95ZXMtbm8uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLXllcy1uby1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPHNwYW4gY2xhc3M9XCJ0ZXh0LTE2XCI+e3tmb3JtYXR0ZWRWYWx1ZX19PC9zcGFuPmBcbn0pXG5leHBvcnQgY2xhc3MgUmVhZFllc05vRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHB1YmxpYyBmb3JtYXR0ZWRWYWx1ZTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgeWVzTm9TZXJ2aWNlOiBZZXNOb1NlcnZpY2UpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIHN1cGVyLm5nT25Jbml0KCk7XG4gICAgdGhpcy5mb3JtYXR0ZWRWYWx1ZSA9IHRoaXMueWVzTm9TZXJ2aWNlLmZvcm1hdCh0aGlzLmNhc2VGaWVsZC52YWx1ZSk7XG4gIH1cbn1cbiJdfQ==