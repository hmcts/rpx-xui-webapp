import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFieldReadComponent } from '../base-field/abstract-field-read.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
function ReadMoneyGbpFieldComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "span", 1);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "currency");
    i0.ɵɵelementEnd();
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind3(3, 1, ctx_r0.value / 100, "GBP", "symbol"));
} }
export class ReadMoneyGbpFieldComponent extends AbstractFieldReadComponent {
    ngOnInit() {
        if (this.amount) {
            this.value = this.amount;
        }
        else if (this.caseField) {
            this.registerControl(new FormControl(this.caseField.value));
            this.value = this.caseField.value;
        }
    }
    isNumber() {
        return null !== this.value && !isNaN(this.value);
    }
}
ReadMoneyGbpFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵReadMoneyGbpFieldComponent_BaseFactory; return function ReadMoneyGbpFieldComponent_Factory(t) { return (ɵReadMoneyGbpFieldComponent_BaseFactory || (ɵReadMoneyGbpFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(ReadMoneyGbpFieldComponent)))(t || ReadMoneyGbpFieldComponent); }; }();
ReadMoneyGbpFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: ReadMoneyGbpFieldComponent, selectors: [["ccd-read-money-gbp-field"]], inputs: { amount: "amount" }, features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[4, "ngIf"], [1, "text-16"]], template: function ReadMoneyGbpFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵtemplate(0, ReadMoneyGbpFieldComponent_ng_container_0_Template, 4, 5, "ng-container", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("ngIf", ctx.isNumber());
    } }, dependencies: [i1.NgIf, i1.CurrencyPipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ReadMoneyGbpFieldComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-read-money-gbp-field',
                template: `<ng-container *ngIf="isNumber()"><span class="text-16">{{value / 100 | currency:'GBP':'symbol'}}</span></ng-container>`
            }]
    }], null, { amount: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZC1tb25leS1nYnAtZmllbGQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvbW9uZXktZ2JwL3JlYWQtbW9uZXktZ2JwLWZpZWxkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sNkNBQTZDLENBQUM7Ozs7SUFJNUUsNkJBQWlDO0lBQUEsK0JBQXNCO0lBQUEsWUFBeUM7O0lBQUEsaUJBQU87SUFBQSwwQkFBZTs7O0lBQS9ELGVBQXlDO0lBQXpDLCtFQUF5Qzs7QUFFN0csTUFBTSxPQUFPLDBCQUEyQixTQUFRLDBCQUEwQjtJQU1qRSxRQUFRO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQzFCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ3pCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7U0FDbkM7SUFDSCxDQUFDO0lBRU0sUUFBUTtRQUNiLE9BQU8sSUFBSSxLQUFLLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELENBQUM7OzBSQWpCVSwwQkFBMEIsU0FBMUIsMEJBQTBCOzZFQUExQiwwQkFBMEI7UUFGMUIsNkZBQXNIOztRQUF2RyxxQ0FBZ0I7O3VGQUUvQiwwQkFBMEI7Y0FKdEMsU0FBUztlQUFDO2dCQUNULFFBQVEsRUFBRSwwQkFBMEI7Z0JBQ3BDLFFBQVEsRUFBRSx3SEFBd0g7YUFDbkk7Z0JBSVEsTUFBTTtrQkFEWixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3JtQ29udHJvbCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEFic3RyYWN0RmllbGRSZWFkQ29tcG9uZW50IH0gZnJvbSAnLi4vYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC1yZWFkLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC1yZWFkLW1vbmV5LWdicC1maWVsZCcsXG4gIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzTnVtYmVyKClcIj48c3BhbiBjbGFzcz1cInRleHQtMTZcIj57e3ZhbHVlIC8gMTAwIHwgY3VycmVuY3k6J0dCUCc6J3N5bWJvbCd9fTwvc3Bhbj48L25nLWNvbnRhaW5lcj5gXG59KVxuZXhwb3J0IGNsYXNzIFJlYWRNb25leUdicEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWJzdHJhY3RGaWVsZFJlYWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBhbW91bnQ6IGFueTtcbiAgcHVibGljIHZhbHVlOiBhbnk7XG5cbiAgcHVibGljIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmFtb3VudCkge1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuYW1vdW50O1xuICAgIH0gZWxzZSBpZiAodGhpcy5jYXNlRmllbGQpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJDb250cm9sKG5ldyBGb3JtQ29udHJvbCh0aGlzLmNhc2VGaWVsZC52YWx1ZSkpO1xuICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY2FzZUZpZWxkLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBpc051bWJlcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gbnVsbCAhPT0gdGhpcy52YWx1ZSAmJiAhaXNOYU4odGhpcy52YWx1ZSk7XG4gIH1cblxufVxuIl19