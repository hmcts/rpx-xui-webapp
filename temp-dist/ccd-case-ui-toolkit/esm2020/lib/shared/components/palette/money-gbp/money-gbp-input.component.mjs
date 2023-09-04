import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
export class MoneyGbpInputComponent {
    constructor() {
        this.displayValue = null;
        this.propagateChange = (_) => { };
    }
    // change events from the textarea
    onChange(event) {
        // get value from input
        const newValue = event.target.value;
        if (newValue && MoneyGbpInputComponent.PATTERN_REGEXP.test(newValue)) {
            const parts = newValue.split('.');
            if (!parts[1]) {
                parts[1] = '00';
            }
            else {
                while (2 > parts[1].length) {
                    parts[1] += '0';
                }
            }
            this.rawValue = parts.join('');
        }
        else {
            // When pattern not matched, value is passed as is so that it fails validation.
            this.rawValue = newValue;
        }
        // update the form
        this.propagateChange(this.rawValue);
    }
    writeValue(obj) {
        if (obj) {
            this.rawValue = obj;
            const integerPart = obj.slice(0, -2) || '0';
            let decimalPart = obj.slice(-2);
            while (2 > decimalPart.length) {
                decimalPart += '0';
            }
            this.displayValue = [integerPart, decimalPart].join('.');
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(_) {
        // Not used.
    }
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    validate(control) {
        if (this.mandatory && !control.value) {
            return {
                pattern: 'This field is required'
            };
        }
        if (control.value && !MoneyGbpInputComponent.PATTERN_REGEXP.test(control.value)) {
            return {
                pattern: 'Should only contain numbers with up to 2 decimal places'
            };
        }
        return undefined;
    }
    registerOnValidatorChange(_) {
        // Not used.
    }
}
MoneyGbpInputComponent.PATTERN_REGEXP = new RegExp('^-?\\d*(\\.\\d{0,2})?$');
MoneyGbpInputComponent.ɵfac = function MoneyGbpInputComponent_Factory(t) { return new (t || MoneyGbpInputComponent)(); };
MoneyGbpInputComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: MoneyGbpInputComponent, selectors: [["ccd-money-gbp-input"]], inputs: { id: "id", name: "name", mandatory: "mandatory", formControl: "formControl" }, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MoneyGbpInputComponent),
                multi: true,
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => MoneyGbpInputComponent),
                multi: true,
            }
        ])], decls: 1, vars: 4, consts: [["type", "text", 1, "form-control", "form-control-1-8", 3, "id", "name", "value", "disabled", "change", "keyup"]], template: function MoneyGbpInputComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "input", 0);
        i0.ɵɵlistener("change", function MoneyGbpInputComponent_Template_input_change_0_listener($event) { return ctx.onChange($event); })("keyup", function MoneyGbpInputComponent_Template_input_keyup_0_listener($event) { return ctx.onChange($event); });
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵproperty("id", ctx.id)("name", ctx.name)("value", ctx.displayValue)("disabled", ctx.disabled);
    } }, encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(MoneyGbpInputComponent, [{
        type: Component,
        args: [{
                selector: 'ccd-money-gbp-input',
                template: `<input class="form-control form-control-1-8"
                    type="text"
                    [id]="id"
                    [name]="name"
                    [value]="displayValue"
                    (change)="onChange($event)"
                    (keyup)="onChange($event)"
                    [disabled]="disabled"/>`,
                providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => MoneyGbpInputComponent),
                        multi: true,
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => MoneyGbpInputComponent),
                        multi: true,
                    }
                ]
            }]
    }], null, { id: [{
            type: Input
        }], name: [{
            type: Input
        }], mandatory: [{
            type: Input
        }], formControl: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZXktZ2JwLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9wYWxldHRlL21vbmV5LWdicC9tb25leS1nYnAtaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQXdCLFdBQVcsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQStCLE1BQU0sZ0JBQWdCLENBQUM7O0FBeUJsSSxNQUFNLE9BQU8sc0JBQXNCO0lBdkJuQztRQXVDUyxpQkFBWSxHQUFXLElBQUksQ0FBQztRQTZFM0Isb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBRTNDO0lBMUVDLGtDQUFrQztJQUMzQixRQUFRLENBQUMsS0FBSztRQUVuQix1QkFBdUI7UUFDdkIsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFFcEMsSUFBSSxRQUFRLElBQUksc0JBQXNCLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUNwRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWxDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ2IsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzthQUNqQjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO29CQUMxQixLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDO2lCQUNqQjthQUNG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Q0FBQzt3QkFDckQsS0FBSyxFQUFFLElBQUk7cUJBQ1o7aUJBQ0Y7YUFDRjtnQkFNUSxFQUFFO2tCQURSLEtBQUs7WUFJQyxJQUFJO2tCQURWLEtBQUs7WUFJQyxTQUFTO2tCQURmLEtBQUs7WUFJQyxXQUFXO2tCQURqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjY2QtbW9uZXktZ2JwLWlucHV0JyxcbiAgdGVtcGxhdGU6IGA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLTEtOFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgW2lkXT1cImlkXCJcbiAgICAgICAgICAgICAgICAgICAgW25hbWVdPVwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5VmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAoY2hhbmdlKT1cIm9uQ2hhbmdlKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5dXApPVwib25DaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiLz5gLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IE1vbmV5R2JwSW5wdXRDb21wb25lbnQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTW9uZXlHYnBJbnB1dENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZSxcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTW9uZXlHYnBJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBWYWxpZGF0b3Ige1xuXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFBBVFRFUk5fUkVHRVhQID0gbmV3IFJlZ0V4cCgnXi0/XFxcXGQqKFxcXFwuXFxcXGR7MCwyfSk/JCcpO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBuYW1lOiBzdHJpbmc7XG5cbiAgQElucHV0KClcbiAgcHVibGljIG1hbmRhdG9yeTogYm9vbGVhbjtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgZm9ybUNvbnRyb2w6IEZvcm1Db250cm9sO1xuXG4gIHB1YmxpYyBkaXNwbGF5VmFsdWU6IHN0cmluZyA9IG51bGw7XG4gIHB1YmxpYyBkaXNhYmxlZDogYm9vbGVhbjtcblxuICBwcml2YXRlIHJhd1ZhbHVlOiBudW1iZXI7XG5cbiAgLy8gY2hhbmdlIGV2ZW50cyBmcm9tIHRoZSB0ZXh0YXJlYVxuICBwdWJsaWMgb25DaGFuZ2UoZXZlbnQpIHtcblxuICAgIC8vIGdldCB2YWx1ZSBmcm9tIGlucHV0XG4gICAgY29uc3QgbmV3VmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG5cbiAgICBpZiAobmV3VmFsdWUgJiYgTW9uZXlHYnBJbnB1dENvbXBvbmVudC5QQVRURVJOX1JFR0VYUC50ZXN0KG5ld1ZhbHVlKSkge1xuICAgICAgY29uc3QgcGFydHMgPSBuZXdWYWx1ZS5zcGxpdCgnLicpO1xuXG4gICAgICBpZiAoIXBhcnRzWzFdKSB7XG4gICAgICAgIHBhcnRzWzFdID0gJzAwJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICgyID4gcGFydHNbMV0ubGVuZ3RoKSB7XG4gICAgICAgICAgcGFydHNbMV0gKz0gJzAnO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmF3VmFsdWUgPSBwYXJ0cy5qb2luKCcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2hlbiBwYXR0ZXJuIG5vdCBtYXRjaGVkLCB2YWx1ZSBpcyBwYXNzZWQgYXMgaXMgc28gdGhhdCBpdCBmYWlscyB2YWxpZGF0aW9uLlxuICAgICAgdGhpcy5yYXdWYWx1ZSA9IG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucmF3VmFsdWUpO1xuICB9XG5cbiAgcHVibGljIHdyaXRlVmFsdWUob2JqOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAob2JqKSB7XG4gICAgICB0aGlzLnJhd1ZhbHVlID0gb2JqO1xuXG4gICAgICBjb25zdCBpbnRlZ2VyUGFydCA9IG9iai5zbGljZSgwLCAtMikgfHwgJzAnO1xuICAgICAgbGV0IGRlY2ltYWxQYXJ0ID0gb2JqLnNsaWNlKC0yKTtcblxuICAgICAgd2hpbGUgKDIgPiBkZWNpbWFsUGFydC5sZW5ndGgpIHtcbiAgICAgICAgZGVjaW1hbFBhcnQgKz0gJzAnO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRpc3BsYXlWYWx1ZSA9IFtpbnRlZ2VyUGFydCwgZGVjaW1hbFBhcnRdLmpvaW4oJy4nKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChfOiBhbnkpOiB2b2lkIHtcbiAgICAvLyBOb3QgdXNlZC5cbiAgfVxuXG4gIHB1YmxpYyBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBGb3JtQ29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMge1xuICAgIGlmICh0aGlzLm1hbmRhdG9yeSAmJiAhY29udHJvbC52YWx1ZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGF0dGVybjogJ1RoaXMgZmllbGQgaXMgcmVxdWlyZWQnXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAoY29udHJvbC52YWx1ZSAmJiAhTW9uZXlHYnBJbnB1dENvbXBvbmVudC5QQVRURVJOX1JFR0VYUC50ZXN0KGNvbnRyb2wudmFsdWUpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBwYXR0ZXJuOiAnU2hvdWxkIG9ubHkgY29udGFpbiBudW1iZXJzIHdpdGggdXAgdG8gMiBkZWNpbWFsIHBsYWNlcydcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPblZhbGlkYXRvckNoYW5nZShfOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgLy8gTm90IHVzZWQuXG4gIH1cblxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHsgfTtcblxufVxuIl19