import { Component } from '@angular/core';
import { FormArray, FormControl, UntypedFormGroup } from '@angular/forms';
import { AbstractFieldWriteComponent } from '../base-field/abstract-field-write.component';
import * as i0 from "@angular/core";
export class WriteOrderSummaryFieldComponent extends AbstractFieldWriteComponent {
    /*
      These are implemented manually rather than using WriteComplexFieldComponent. The reason
      is because the view is readonly the tree of form controls is not being built automatically
      and has to be built manually.
    */
    ngOnInit() {
        const orderSummaryGroup = this.registerControl(new UntypedFormGroup({}), true);
        const paymentReference = new FormControl(this.caseField.value.PaymentReference);
        orderSummaryGroup.addControl('PaymentReference', paymentReference);
        const paymentTotal = new FormControl(this.caseField.value.PaymentTotal);
        orderSummaryGroup.addControl('PaymentTotal', paymentTotal);
        const feesArray = new FormArray([]);
        this.caseField.value.Fees.forEach((fee) => {
            feesArray.push(this.getFeeValue(fee.value));
        });
        orderSummaryGroup.addControl('Fees', feesArray);
    }
    getFeeValue(feeValue) {
        const feeGroup = new UntypedFormGroup({});
        feeGroup.addControl('FeeCode', new FormControl(feeValue.FeeCode));
        feeGroup.addControl('FeeAmount', new FormControl(feeValue.FeeAmount));
        feeGroup.addControl('FeeDescription', new FormControl(feeValue.FeeDescription));
        feeGroup.addControl('FeeVersion', new FormControl(feeValue.FeeVersion));
        const feeValueGroup = new UntypedFormGroup({});
        feeValueGroup.addControl('value', feeGroup);
        return feeValueGroup;
    }
}
WriteOrderSummaryFieldComponent.ɵfac = /*@__PURE__*/ function () { let ɵWriteOrderSummaryFieldComponent_BaseFactory; return function WriteOrderSummaryFieldComponent_Factory(t) { return (ɵWriteOrderSummaryFieldComponent_BaseFactory || (ɵWriteOrderSummaryFieldComponent_BaseFactory = i0.ɵɵgetInheritedFactory(WriteOrderSummaryFieldComponent)))(t || WriteOrderSummaryFieldComponent); }; }();
WriteOrderSummaryFieldComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: WriteOrderSummaryFieldComponent, selectors: [["ccd-write-order-summary-field"]], features: [i0.ɵɵInheritDefinitionFeature], decls: 1, vars: 1, consts: [[3, "caseField"]], template: function WriteOrderSummaryFieldComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelement(0, "ccd-read-order-summary-field", 0);
    } if (rf & 2) {
        i0.ɵɵproperty("caseField", ctx.caseField);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WriteOrderSummaryFieldComponent, [{
        type: Component,
        args: [{ selector: 'ccd-write-order-summary-field', template: "<ccd-read-order-summary-field [caseField]=\"caseField\"></ccd-read-order-summary-field>\n" }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3JpdGUtb3JkZXItc3VtbWFyeS1maWVsZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9vcmRlci1zdW1tYXJ5L3dyaXRlLW9yZGVyLXN1bW1hcnktZmllbGQuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3BhbGV0dGUvb3JkZXItc3VtbWFyeS93cml0ZS1vcmRlci1zdW1tYXJ5LWZpZWxkLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzFFLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLDhDQUE4QyxDQUFDOztBQU0zRixNQUFNLE9BQU8sK0JBQWdDLFNBQVEsMkJBQTJCO0lBRTlFOzs7O01BSUU7SUFDSyxRQUFRO1FBQ2IsTUFBTSxpQkFBaUIsR0FBcUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBcUIsQ0FBQztRQUNySCxNQUFNLGdCQUFnQixHQUFnQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdGLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25FLE1BQU0sWUFBWSxHQUFnQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRixpQkFBaUIsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNELE1BQU0sU0FBUyxHQUFjLElBQUksU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN4QyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTyxXQUFXLENBQUMsUUFBUTtRQUMxQixNQUFNLFFBQVEsR0FBRyxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLFFBQVEsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLFFBQVEsQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7UUFDaEYsUUFBUSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxhQUFhLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvQyxhQUFhLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM1QyxPQUFPLGFBQWEsQ0FBQztJQUN2QixDQUFDOzttVEE3QlUsK0JBQStCLFNBQS9CLCtCQUErQjtrRkFBL0IsK0JBQStCO1FDUjVDLGtEQUFxRjs7UUFBdkQseUNBQXVCOzt1RkRReEMsK0JBQStCO2NBSjNDLFNBQVM7MkJBQ0UsK0JBQStCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1BcnJheSwgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXdyaXRlLmNvbXBvbmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2NjZC13cml0ZS1vcmRlci1zdW1tYXJ5LWZpZWxkJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3dyaXRlLW9yZGVyLXN1bW1hcnktZmllbGQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgV3JpdGVPcmRlclN1bW1hcnlGaWVsZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0RmllbGRXcml0ZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgLypcbiAgICBUaGVzZSBhcmUgaW1wbGVtZW50ZWQgbWFudWFsbHkgcmF0aGVyIHRoYW4gdXNpbmcgV3JpdGVDb21wbGV4RmllbGRDb21wb25lbnQuIFRoZSByZWFzb25cbiAgICBpcyBiZWNhdXNlIHRoZSB2aWV3IGlzIHJlYWRvbmx5IHRoZSB0cmVlIG9mIGZvcm0gY29udHJvbHMgaXMgbm90IGJlaW5nIGJ1aWx0IGF1dG9tYXRpY2FsbHlcbiAgICBhbmQgaGFzIHRvIGJlIGJ1aWx0IG1hbnVhbGx5LlxuICAqL1xuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgY29uc3Qgb3JkZXJTdW1tYXJ5R3JvdXA6IFVudHlwZWRGb3JtR3JvdXAgPSB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSksIHRydWUpIGFzIFVudHlwZWRGb3JtR3JvdXA7XG4gICAgY29uc3QgcGF5bWVudFJlZmVyZW5jZTogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUuUGF5bWVudFJlZmVyZW5jZSk7XG4gICAgb3JkZXJTdW1tYXJ5R3JvdXAuYWRkQ29udHJvbCgnUGF5bWVudFJlZmVyZW5jZScsIHBheW1lbnRSZWZlcmVuY2UpO1xuICAgIGNvbnN0IHBheW1lbnRUb3RhbDogRm9ybUNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUuUGF5bWVudFRvdGFsKTtcbiAgICBvcmRlclN1bW1hcnlHcm91cC5hZGRDb250cm9sKCdQYXltZW50VG90YWwnLCBwYXltZW50VG90YWwpO1xuICAgIGNvbnN0IGZlZXNBcnJheTogRm9ybUFycmF5ID0gbmV3IEZvcm1BcnJheShbXSk7XG4gICAgdGhpcy5jYXNlRmllbGQudmFsdWUuRmVlcy5mb3JFYWNoKChmZWUpID0+IHtcbiAgICAgIGZlZXNBcnJheS5wdXNoKHRoaXMuZ2V0RmVlVmFsdWUoZmVlLnZhbHVlKSk7XG4gICAgfSk7XG4gICAgb3JkZXJTdW1tYXJ5R3JvdXAuYWRkQ29udHJvbCgnRmVlcycsIGZlZXNBcnJheSk7XG4gIH1cblxuICBwcml2YXRlIGdldEZlZVZhbHVlKGZlZVZhbHVlKTogVW50eXBlZEZvcm1Hcm91cCB7XG4gICAgY29uc3QgZmVlR3JvdXAgPSBuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSk7XG4gICAgZmVlR3JvdXAuYWRkQ29udHJvbCgnRmVlQ29kZScsIG5ldyBGb3JtQ29udHJvbChmZWVWYWx1ZS5GZWVDb2RlKSk7XG4gICAgZmVlR3JvdXAuYWRkQ29udHJvbCgnRmVlQW1vdW50JywgbmV3IEZvcm1Db250cm9sKGZlZVZhbHVlLkZlZUFtb3VudCkpO1xuICAgIGZlZUdyb3VwLmFkZENvbnRyb2woJ0ZlZURlc2NyaXB0aW9uJywgbmV3IEZvcm1Db250cm9sKGZlZVZhbHVlLkZlZURlc2NyaXB0aW9uKSk7XG4gICAgZmVlR3JvdXAuYWRkQ29udHJvbCgnRmVlVmVyc2lvbicsIG5ldyBGb3JtQ29udHJvbChmZWVWYWx1ZS5GZWVWZXJzaW9uKSk7XG4gICAgY29uc3QgZmVlVmFsdWVHcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICBmZWVWYWx1ZUdyb3VwLmFkZENvbnRyb2woJ3ZhbHVlJywgZmVlR3JvdXApO1xuICAgIHJldHVybiBmZWVWYWx1ZUdyb3VwO1xuICB9XG5cbn1cbiIsIjxjY2QtcmVhZC1vcmRlci1zdW1tYXJ5LWZpZWxkIFtjYXNlRmllbGRdPVwiY2FzZUZpZWxkXCI+PC9jY2QtcmVhZC1vcmRlci1zdW1tYXJ5LWZpZWxkPlxuIl19