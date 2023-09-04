import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "rpx-xui-translation";
const _c0 = function (a0) { return { "govuk-input--error": a0 }; };
function DateInputComponent_div_19_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 12)(1, "label", 2);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 13, 14);
    i0.ɵɵlistener("input", function DateInputComponent_div_19_Template_input_input_4_listener() { i0.ɵɵrestoreView(_r8); const _r6 = i0.ɵɵreference(5); const ctx_r7 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r7.hourChange(_r6.value)); })("keyup", function DateInputComponent_div_19_Template_input_keyup_4_listener() { i0.ɵɵrestoreView(_r8); const _r6 = i0.ɵɵreference(5); const ctx_r9 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r9.hourChange(_r6.value)); })("focus", function DateInputComponent_div_19_Template_input_focus_4_listener() { i0.ɵɵrestoreView(_r8); const ctx_r10 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r10.inputFocus()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r3.hourId());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 6, "Hour"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r3.hourId())("name", ctx_r3.hourId())("value", ctx_r3.displayHour)("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r3.isInvalid));
} }
function DateInputComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    const _r13 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 15)(1, "label", 2);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 13, 16);
    i0.ɵɵlistener("input", function DateInputComponent_div_20_Template_input_input_4_listener() { i0.ɵɵrestoreView(_r13); const _r11 = i0.ɵɵreference(5); const ctx_r12 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r12.minuteChange(_r11.value)); })("keyup", function DateInputComponent_div_20_Template_input_keyup_4_listener() { i0.ɵɵrestoreView(_r13); const _r11 = i0.ɵɵreference(5); const ctx_r14 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r14.minuteChange(_r11.value)); })("focus", function DateInputComponent_div_20_Template_input_focus_4_listener() { i0.ɵɵrestoreView(_r13); const ctx_r15 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r15.inputFocus()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r4 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r4.minuteId());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 6, "Minute"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r4.minuteId())("name", ctx_r4.minuteId())("value", ctx_r4.displayMinute)("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r4.isInvalid));
} }
function DateInputComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    const _r18 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 17)(1, "label", 2);
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "rpxTranslate");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "input", 13, 18);
    i0.ɵɵlistener("input", function DateInputComponent_div_21_Template_input_input_4_listener() { i0.ɵɵrestoreView(_r18); const _r16 = i0.ɵɵreference(5); const ctx_r17 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r17.secondChange(_r16.value)); })("keyup", function DateInputComponent_div_21_Template_input_keyup_4_listener() { i0.ɵɵrestoreView(_r18); const _r16 = i0.ɵɵreference(5); const ctx_r19 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r19.secondChange(_r16.value)); })("focus", function DateInputComponent_div_21_Template_input_focus_4_listener() { i0.ɵɵrestoreView(_r18); const ctx_r20 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r20.inputFocus()); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r5 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵproperty("for", ctx_r5.secondId());
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(3, 6, "Second"));
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("id", ctx_r5.secondId())("name", ctx_r5.secondId())("value", ctx_r5.displaySecond)("ngClass", i0.ɵɵpureFunction1(8, _c0, ctx_r5.isInvalid));
} }
export class DateInputComponent {
    constructor() {
        this.isTouched = false;
        this.displayDay = null;
        this.displayMonth = null;
        this.displayYear = null;
        this.displayHour = null;
        this.displayMinute = null;
        this.displaySecond = null;
        // Works with
        // 2018-04-09T08:02:27.542
        // 2018-04-09T08:02:27.542Z
        // 2018-04-09T08:02:27.542+01:00
        this.DATE_FORMAT = /^(19|20)\d{2}-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?|Z)?$/;
        this.rawValue = '';
    }
    ngOnInit() {
        if (this.mandatory && this.isDateTime) {
            this.displayHour = '00';
            this.displayMinute = '00';
            this.displaySecond = '00';
            this.hour = '00';
            this.minute = '00';
            this.second = '00';
        }
    }
    writeValue(obj) {
        if (obj) {
            this.rawValue = this.removeMilliseconds(obj);
            // needs to handle also partial dates, e.g. -05-2016 (missing day)
            const [datePart, timePart] = this.rawValue.split('T');
            const dateValues = datePart.split('-');
            this.year = this.displayYear = dateValues[0] || '';
            this.month = this.displayMonth = dateValues[1] || '';
            this.day = this.displayDay = dateValues[2] || '';
            if (timePart) {
                const timeParts = timePart.split(':');
                this.hour = this.displayHour = timeParts[0] || '';
                this.minute = this.displayMinute = timeParts[1] || '';
                this.second = this.displaySecond = timeParts[2] || '';
            }
        }
    }
    validate(control) {
        if (this.mandatory && !this.viewValue()) {
            return {
                required: 'This field is required'
            };
        }
        if (control.value && !this.isDateFormat(this.getValueForValidation(control))) {
            return {
                pattern: 'Date is not valid'
            };
        }
        return undefined;
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched(fn) {
        // Do nothing.
    }
    ngOnDestroy() {
        this.validate = (control) => {
            return undefined;
        };
    }
    dayChange(value) {
        // get value from input
        this.day = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    monthChange(value) {
        // get value from input
        this.month = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    yearChange(value) {
        // get value from input
        this.year = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    hourChange(value) {
        // get value from input
        this.hour = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    minuteChange(value) {
        // get value from input
        this.minute = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    secondChange(value) {
        // get value from input
        this.second = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    }
    inputFocus() {
        this.isTouched = false;
        this.touch();
    }
    touch() {
        if (this.isTouched) {
            this.formControl.markAsTouched();
            this.propagateChange(this.rawValue);
        }
        else {
            this.formControl.markAsUntouched();
        }
    }
    dayId() {
        return `${this.id}-day`;
    }
    monthId() {
        return `${this.id}-month`;
    }
    yearId() {
        return `${this.id}-year`;
    }
    hourId() {
        return `${this.id}-hour`;
    }
    minuteId() {
        return `${this.id}-minute`;
    }
    secondId() {
        return `${this.id}-second`;
    }
    viewValue() {
        if (this.day || this.month || this.year || this.hour || this.minute || this.second) {
            const date = [
                this.year ? this.year : '',
                this.month ? this.pad(this.month) : '',
                this.day ? this.pad(this.day) : ''
            ].join('-');
            if (this.isDateTime) {
                const time = [
                    this.hour ? this.pad(this.hour) : '',
                    this.minute ? this.pad(this.minute) : '',
                    this.second ? this.pad(this.second) : ''
                ].join(':');
                return `${date}T${time}.000`;
            }
            else {
                return date;
            }
        }
        return null;
    }
    isDateFormat(val) {
        return this.DATE_FORMAT.test(val);
    }
    pad(num, padNum = 2) {
        const val = num !== undefined ? num.toString() : '';
        return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
    }
    getValueForValidation(control) {
        if (this.isDateTime) {
            return control.value;
        }
        else {
            return control.value.replace(/Z.*/, 'T00:00:00Z');
        }
    }
    removeMilliseconds(dateTime) {
        return dateTime.replace(/\..*/, '');
    }
}
DateInputComponent.ɵfac = function DateInputComponent_Factory(t) { return new (t || DateInputComponent)(); };
DateInputComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: DateInputComponent, selectors: [["cut-date-input"]], inputs: { id: "id", mandatory: "mandatory", isDateTime: "isDateTime", formControl: "formControl", isInvalid: "isInvalid" }, features: [i0.ɵɵProvidersFeature([
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => DateInputComponent),
                multi: true
            },
            {
                provide: NG_VALIDATORS,
                useExisting: forwardRef(() => DateInputComponent),
                multi: true
            }
        ])], decls: 22, vars: 33, consts: [[1, "form-date"], [1, "form-group", "form-group-day"], [1, "form-label", 3, "for"], ["type", "text", "pattern", "[0-9]*", "inputmode", "numeric", 1, "form-control", 3, "id", "name", "value", "ngClass", "change", "keyup", "focus"], ["dayInput", ""], [1, "form-group", "form-group-month"], ["monthInput", ""], [1, "form-group", "form-group-year"], ["yearInput", ""], ["class", "form-group form-group-hour", 4, "ngIf"], ["class", "form-group form-group-minute", 4, "ngIf"], ["class", "form-group form-group-second", 4, "ngIf"], [1, "form-group", "form-group-hour"], ["type", "number", 1, "form-control", 3, "id", "name", "value", "ngClass", "input", "keyup", "focus"], ["hourInput", ""], [1, "form-group", "form-group-minute"], ["minuteInput", ""], [1, "form-group", "form-group-second"], ["secondInput", ""]], template: function DateInputComponent_Template(rf, ctx) { if (rf & 1) {
        const _r21 = i0.ɵɵgetCurrentView();
        i0.ɵɵelementStart(0, "div", 0)(1, "div", 1)(2, "label", 2);
        i0.ɵɵtext(3);
        i0.ɵɵpipe(4, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(5, "input", 3, 4);
        i0.ɵɵlistener("change", function DateInputComponent_Template_input_change_5_listener() { i0.ɵɵrestoreView(_r21); const _r0 = i0.ɵɵreference(6); return i0.ɵɵresetView(ctx.dayChange(_r0.value)); })("keyup", function DateInputComponent_Template_input_keyup_5_listener() { i0.ɵɵrestoreView(_r21); const _r0 = i0.ɵɵreference(6); return i0.ɵɵresetView(ctx.dayChange(_r0.value)); })("focus", function DateInputComponent_Template_input_focus_5_listener() { return ctx.inputFocus(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(7, "div", 5)(8, "label", 2);
        i0.ɵɵtext(9);
        i0.ɵɵpipe(10, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(11, "input", 3, 6);
        i0.ɵɵlistener("change", function DateInputComponent_Template_input_change_11_listener() { i0.ɵɵrestoreView(_r21); const _r1 = i0.ɵɵreference(12); return i0.ɵɵresetView(ctx.monthChange(_r1.value)); })("keyup", function DateInputComponent_Template_input_keyup_11_listener() { i0.ɵɵrestoreView(_r21); const _r1 = i0.ɵɵreference(12); return i0.ɵɵresetView(ctx.monthChange(_r1.value)); })("focus", function DateInputComponent_Template_input_focus_11_listener() { return ctx.inputFocus(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(13, "div", 7)(14, "label", 2);
        i0.ɵɵtext(15);
        i0.ɵɵpipe(16, "rpxTranslate");
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(17, "input", 3, 8);
        i0.ɵɵlistener("change", function DateInputComponent_Template_input_change_17_listener() { i0.ɵɵrestoreView(_r21); const _r2 = i0.ɵɵreference(18); return i0.ɵɵresetView(ctx.yearChange(_r2.value)); })("keyup", function DateInputComponent_Template_input_keyup_17_listener() { i0.ɵɵrestoreView(_r21); const _r2 = i0.ɵɵreference(18); return i0.ɵɵresetView(ctx.yearChange(_r2.value)); })("focus", function DateInputComponent_Template_input_focus_17_listener() { return ctx.inputFocus(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵtemplate(19, DateInputComponent_div_19_Template, 6, 10, "div", 9);
        i0.ɵɵtemplate(20, DateInputComponent_div_20_Template, 6, 10, "div", 10);
        i0.ɵɵtemplate(21, DateInputComponent_div_21_Template, 6, 10, "div", 11);
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("for", ctx.dayId());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(4, 21, "Day"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("id", ctx.dayId())("name", ctx.dayId())("value", ctx.displayDay)("ngClass", i0.ɵɵpureFunction1(27, _c0, ctx.isInvalid));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("for", ctx.monthId());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(10, 23, "Month"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("id", ctx.monthId())("name", ctx.monthId())("value", ctx.displayMonth)("ngClass", i0.ɵɵpureFunction1(29, _c0, ctx.isInvalid));
        i0.ɵɵadvance(3);
        i0.ɵɵproperty("for", ctx.yearId());
        i0.ɵɵadvance(1);
        i0.ɵɵtextInterpolate(i0.ɵɵpipeBind1(16, 25, "Year"));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("id", ctx.yearId())("name", ctx.yearId())("value", ctx.displayYear)("ngClass", i0.ɵɵpureFunction1(31, _c0, ctx.isInvalid));
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.isDateTime);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDateTime);
        i0.ɵɵadvance(1);
        i0.ɵɵproperty("ngIf", ctx.isDateTime);
    } }, dependencies: [i1.NgClass, i1.NgIf, i2.RpxTranslatePipe], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DateInputComponent, [{
        type: Component,
        args: [{ selector: 'cut-date-input', providers: [
                    {
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DateInputComponent),
                        multi: true
                    },
                    {
                        provide: NG_VALIDATORS,
                        useExisting: forwardRef(() => DateInputComponent),
                        multi: true
                    }
                ], template: "<div class=\"form-date\">\n  <div class=\"form-group form-group-day\">\n    <label class=\"form-label\" [for]=\"dayId()\">{{'Day' | rpxTranslate}}</label>\n    <input #dayInput\n           class=\"form-control\"\n           [id]=\"dayId()\"\n           [name]=\"dayId()\"\n           type=\"text\"\n           pattern=\"[0-9]*\"\n           inputmode=\"numeric\"\n           [value]=\"displayDay\"\n           (change)=\"dayChange(dayInput.value)\"\n           (keyup)=\"dayChange(dayInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n\n  <div class=\"form-group form-group-month\">\n    <label class=\"form-label\" [for]=\"monthId()\">{{'Month' | rpxTranslate}}</label>\n    <input #monthInput\n           class=\"form-control\"\n           [id]=\"monthId()\"\n           [name]=\"monthId()\"\n           type=\"text\"\n           pattern=\"[0-9]*\"\n           inputmode=\"numeric\"\n           [value]=\"displayMonth\"\n           (change)=\"monthChange(monthInput.value)\"\n           (keyup)=\"monthChange(monthInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n\n  <div class=\"form-group form-group-year\">\n    <label class=\"form-label\" [for]=\"yearId()\">{{'Year' | rpxTranslate}}</label>\n    <input #yearInput\n           class=\"form-control\"\n           [id]=\"yearId()\"\n           [name]=\"yearId()\"\n           type=\"text\"\n           pattern=\"[0-9]*\"\n           inputmode=\"numeric\"\n           [value]=\"displayYear\"\n           (change)=\"yearChange(yearInput.value)\"\n           (keyup)=\"yearChange(yearInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n\n  <div class=\"form-group form-group-hour\" *ngIf=\"isDateTime\">\n    <label class=\"form-label\" [for]=\"hourId()\">{{'Hour' | rpxTranslate}}</label>\n    <input #hourInput\n           class=\"form-control\"\n           [id]=\"hourId()\"\n           [name]=\"hourId()\"\n           type=\"number\"\n           [value]=\"displayHour\"\n           (input)=\"hourChange(hourInput.value)\"\n           (keyup)=\"hourChange(hourInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n\n  <div class=\"form-group form-group-minute\" *ngIf=\"isDateTime\">\n    <label class=\"form-label\" [for]=\"minuteId()\">{{'Minute' | rpxTranslate}}</label>\n    <input #minuteInput\n           class=\"form-control\"\n           [id]=\"minuteId()\"\n           [name]=\"minuteId()\"\n           type=\"number\"\n           [value]=\"displayMinute\"\n           (input)=\"minuteChange(minuteInput.value)\"\n           (keyup)=\"minuteChange(minuteInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n\n  <div class=\"form-group form-group-second\" *ngIf=\"isDateTime\">\n    <label class=\"form-label\" [for]=\"secondId()\">{{'Second' | rpxTranslate}}</label>\n    <input #secondInput\n           class=\"form-control\"\n           [id]=\"secondId()\"\n           [name]=\"secondId()\"\n           type=\"number\"\n           [value]=\"displaySecond\"\n           (input)=\"secondChange(secondInput.value)\"\n           (keyup)=\"secondChange(secondInput.value)\"\n           (focus)=\"inputFocus()\"\n           [ngClass]=\"{'govuk-input--error': isInvalid}\">\n  </div>\n</div>\n" }]
    }], null, { id: [{
            type: Input
        }], mandatory: [{
            type: Input
        }], isDateTime: [{
            type: Input
        }], formControl: [{
            type: Input
        }], isInvalid: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZS1pbnB1dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9mb3JtL2RhdGUtaW5wdXQvZGF0ZS1pbnB1dC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9mb3JtL2RhdGUtaW5wdXQvZGF0ZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDaEYsT0FBTyxFQUF5QyxXQUFXLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUErQixNQUFNLGdCQUFnQixDQUFDOzs7Ozs7O0lDZ0RqSiwrQkFBMkQsZUFBQTtJQUNkLFlBQXlCOztJQUFBLGlCQUFRO0lBQzVFLHFDQVNxRDtJQUg5Qyw4TEFBUyxlQUFBLDRCQUEyQixDQUFBLElBQUMsaUxBQzVCLGVBQUEsNEJBQTJCLENBQUEsSUFEQyxtSkFFNUIsZUFBQSxvQkFBWSxDQUFBLElBRmdCO0lBTjVDLGlCQVNxRCxFQUFBOzs7SUFWM0IsZUFBZ0I7SUFBaEIscUNBQWdCO0lBQUMsZUFBeUI7SUFBekIsa0RBQXlCO0lBRzdELGVBQWU7SUFBZixvQ0FBZSx5QkFBQSw2QkFBQSx5REFBQTs7OztJQVV4QiwrQkFBNkQsZUFBQTtJQUNkLFlBQTJCOztJQUFBLGlCQUFRO0lBQ2hGLHFDQVNxRDtJQUg5QyxpTUFBUyxlQUFBLGdDQUErQixDQUFBLElBQUMsb0xBQ2hDLGVBQUEsZ0NBQStCLENBQUEsSUFEQyxvSkFFaEMsZUFBQSxvQkFBWSxDQUFBLElBRm9CO0lBTmhELGlCQVNxRCxFQUFBOzs7SUFWM0IsZUFBa0I7SUFBbEIsdUNBQWtCO0lBQUMs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RXRDLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBYTtRQUM3Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxVQUFVLENBQUMsS0FBYTtRQUM3Qix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFbEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxZQUFZLENBQUMsS0FBYTtRQUMvQix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXRDLENBQUM7SUFFTSxZQUFZLENBQUMsS0FBYTtRQUMvQix1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7UUFFcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFFakMsa0JBQWtCO1FBQ2xCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQztJQUVNLEtBQUs7UUFDVixJQUFJLElBQUks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WUFJQyxXQUFXO2tCQURqQixLQUFLO1lBSUMsU0FBUztrQkFEZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBmb3J3YXJkUmVmLCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIEZvcm1Db250cm9sLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjdXQtZGF0ZS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9kYXRlLWlucHV0Lmh0bWwnLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVJbnB1dENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcbiAgICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IERhdGVJbnB1dENvbXBvbmVudCksXG4gICAgICBtdWx0aTogdHJ1ZVxuICAgIH1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgRGF0ZUlucHV0Q29tcG9uZW50IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIFZhbGlkYXRvciwgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKVxuICBwdWJsaWMgaWQ6IHN0cmluZztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgbWFuZGF0b3J5OiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBpc0RhdGVUaW1lOiBib29sZWFuO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBmb3JtQ29udHJvbDogRm9ybUNvbnRyb2w7XG5cbiAgQElucHV0KClcbiAgcHVibGljIGlzSW52YWxpZDogYm9vbGVhbjtcblxuICBwdWJsaWMgaXNUb3VjaGVkID0gZmFsc2U7XG4gIHB1YmxpYyBkaXNwbGF5RGF5OiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgZGlzcGxheU1vbnRoOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgZGlzcGxheVllYXI6IHN0cmluZyA9IG51bGw7XG5cbiAgcHVibGljIGRpc3BsYXlIb3VyOiBzdHJpbmcgPSBudWxsO1xuICBwdWJsaWMgZGlzcGxheU1pbnV0ZTogc3RyaW5nID0gbnVsbDtcbiAgcHVibGljIGRpc3BsYXlTZWNvbmQ6IHN0cmluZyA9IG51bGw7XG4gIC8vIFdvcmtzIHdpdGhcbiAgLy8gMjAxOC0wNC0wOVQwODowMjoyNy41NDJcbiAgLy8gMjAxOC0wNC0wOVQwODowMjoyNy41NDJaXG4gIC8vIDIwMTgtMDQtMDlUMDg6MDI6MjcuNTQyKzAxOjAwXG4gIHByaXZhdGUgcmVhZG9ubHkgREFURV9GT1JNQVQgPVxuICAgIC9eKDE5fDIwKVxcZHsyfS0/KFxcZFxcZCktPyhcXGRcXGQpKD86VChcXGRcXGQpKD86Oj8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzpcXC4oXFxkKykpPyk/KT8oWnwoWystXSkoXFxkXFxkKTo/KFxcZFxcZCkpP3xaKT8kLztcbiAgLy8gICAgeWVhciAtIG1vbnRoIC0gIGRheSAgICAgVCAgIEhIICAgICA6ICAgTU0gICAgICA6ICBTUyAgICAgICAuMDAwICAgICAgICBaIG9yICsgICAgIDAxIDogICAwMFxuICBwcml2YXRlIHByb3BhZ2F0ZUNoYW5nZTogKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgcmF3VmFsdWUgPSAnJztcbiAgcHJpdmF0ZSBkYXk6IHN0cmluZztcbiAgcHJpdmF0ZSBtb250aDogc3RyaW5nO1xuICBwcml2YXRlIHllYXI6IHN0cmluZztcbiAgcHJpdmF0ZSBob3VyOiBzdHJpbmc7XG4gIHByaXZhdGUgbWludXRlOiBzdHJpbmc7XG4gIHByaXZhdGUgc2Vjb25kOiBzdHJpbmc7XG5cbiAgcHVibGljIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLm1hbmRhdG9yeSAmJiB0aGlzLmlzRGF0ZVRpbWUpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhvdXIgPSAnMDAnO1xuICAgICAgdGhpcy5kaXNwbGF5TWludXRlID0gJzAwJztcbiAgICAgIHRoaXMuZGlzcGxheVNlY29uZCA9ICcwMCc7XG4gICAgICB0aGlzLmhvdXIgPSAnMDAnO1xuICAgICAgdGhpcy5taW51dGUgPSAnMDAnO1xuICAgICAgdGhpcy5zZWNvbmQgPSAnMDAnO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB3cml0ZVZhbHVlKG9iajogc3RyaW5nKTogdm9pZCB7IC8vIDIwMTgtMDQtMDlUMDg6MDI6MjcuNTQyXG4gICAgaWYgKG9iaikge1xuICAgICAgdGhpcy5yYXdWYWx1ZSA9IHRoaXMucmVtb3ZlTWlsbGlzZWNvbmRzKG9iaik7XG4gICAgICAvLyBuZWVkcyB0byBoYW5kbGUgYWxzbyBwYXJ0aWFsIGRhdGVzLCBlLmcuIC0wNS0yMDE2IChtaXNzaW5nIGRheSlcbiAgICAgIGNvbnN0IFtkYXRlUGFydCwgdGltZVBhcnRdID0gdGhpcy5yYXdWYWx1ZS5zcGxpdCgnVCcpO1xuICAgICAgY29uc3QgZGF0ZVZhbHVlcyA9IGRhdGVQYXJ0LnNwbGl0KCctJyk7XG4gICAgICB0aGlzLnllYXIgPSB0aGlzLmRpc3BsYXlZZWFyID0gZGF0ZVZhbHVlc1swXSB8fCAnJztcbiAgICAgIHRoaXMubW9udGggPSB0aGlzLmRpc3BsYXlNb250aCA9IGRhdGVWYWx1ZXNbMV0gfHwgJyc7XG4gICAgICB0aGlzLmRheSA9IHRoaXMuZGlzcGxheURheSA9IGRhdGVWYWx1ZXNbMl0gfHwgJyc7XG4gICAgICBpZiAodGltZVBhcnQpIHtcbiAgICAgICAgY29uc3QgdGltZVBhcnRzID0gdGltZVBhcnQuc3BsaXQoJzonKTtcbiAgICAgICAgdGhpcy5ob3VyID0gdGhpcy5kaXNwbGF5SG91ciA9IHRpbWVQYXJ0c1swXSB8fCAnJztcbiAgICAgICAgdGhpcy5taW51dGUgPSB0aGlzLmRpc3BsYXlNaW51dGUgPSB0aW1lUGFydHNbMV0gfHwgJyc7XG4gICAgICAgIHRoaXMuc2Vjb25kID0gdGhpcy5kaXNwbGF5U2Vjb25kID0gdGltZVBhcnRzWzJdIHx8ICcnO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyB2YWxpZGF0ZShjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzIHtcbiAgICBpZiAodGhpcy5tYW5kYXRvcnkgJiYgIXRoaXMudmlld1ZhbHVlKCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJlcXVpcmVkOiAnVGhpcyBmaWVsZCBpcyByZXF1aXJlZCdcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb250cm9sLnZhbHVlICYmICF0aGlzLmlzRGF0ZUZvcm1hdCh0aGlzLmdldFZhbHVlRm9yVmFsaWRhdGlvbihjb250cm9sKSkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhdHRlcm46ICdEYXRlIGlzIG5vdCB2YWxpZCdcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcbiAgfVxuXG4gIHB1YmxpYyByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgLy8gRG8gbm90aGluZy5cbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnZhbGlkYXRlID0gKGNvbnRyb2w6IEFic3RyYWN0Q29udHJvbCk6IFZhbGlkYXRpb25FcnJvcnMgPT4ge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIGRheUNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZ2V0IHZhbHVlIGZyb20gaW5wdXRcbiAgICB0aGlzLmRheSA9IHZhbHVlO1xuXG4gICAgdGhpcy5yYXdWYWx1ZSA9IHRoaXMudmlld1ZhbHVlKCk7XG5cbiAgICAvLyB1cGRhdGUgdGhlIGZvcm1cbiAgICB0aGlzLnByb3BhZ2F0ZUNoYW5nZSh0aGlzLnJhd1ZhbHVlKTtcbiAgfVxuXG4gIHB1YmxpYyBtb250aENoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZ2V0IHZhbHVlIGZyb20gaW5wdXRcbiAgICB0aGlzLm1vbnRoID0gdmFsdWU7XG5cbiAgICB0aGlzLnJhd1ZhbHVlID0gdGhpcy52aWV3VmFsdWUoKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucmF3VmFsdWUpO1xuXG4gIH1cblxuICBwdWJsaWMgeWVhckNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZ2V0IHZhbHVlIGZyb20gaW5wdXRcbiAgICB0aGlzLnllYXIgPSB2YWx1ZTtcblxuICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLnZpZXdWYWx1ZSgpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5yYXdWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgaG91ckNoYW5nZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgLy8gZ2V0IHZhbHVlIGZyb20gaW5wdXRcbiAgICB0aGlzLmhvdXIgPSB2YWx1ZTtcblxuICAgIHRoaXMucmF3VmFsdWUgPSB0aGlzLnZpZXdWYWx1ZSgpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBmb3JtXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UodGhpcy5yYXdWYWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgbWludXRlQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBnZXQgdmFsdWUgZnJvbSBpbnB1dFxuICAgIHRoaXMubWludXRlID0gdmFsdWU7XG5cbiAgICB0aGlzLnJhd1ZhbHVlID0gdGhpcy52aWV3VmFsdWUoKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucmF3VmFsdWUpO1xuXG4gIH1cblxuICBwdWJsaWMgc2Vjb25kQ2hhbmdlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAvLyBnZXQgdmFsdWUgZnJvbSBpbnB1dFxuICAgIHRoaXMuc2Vjb25kID0gdmFsdWU7XG5cbiAgICB0aGlzLnJhd1ZhbHVlID0gdGhpcy52aWV3VmFsdWUoKTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgZm9ybVxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucmF3VmFsdWUpO1xuICB9XG5cbiAgcHVibGljIGlucHV0Rm9jdXMoKSB7XG4gICAgdGhpcy5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICB0aGlzLnRvdWNoKCk7XG4gIH1cblxuICBwdWJsaWMgdG91Y2goKSB7XG4gICAgaWYgKHRoaXMuaXNUb3VjaGVkKSB7XG4gICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc1RvdWNoZWQoKTtcbiAgICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHRoaXMucmF3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1Db250cm9sLm1hcmtBc1VudG91Y2hlZCgpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkYXlJZCgpIHtcbiAgICByZXR1cm4gYCR7dGhpcy5pZH0tZGF5YDtcbiAgfVxuXG4gIHB1YmxpYyBtb250aElkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmlkfS1tb250aGA7XG4gIH1cblxuICBwdWJsaWMgeWVhcklkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmlkfS15ZWFyYDtcbiAgfVxuXG4gIHB1YmxpYyBob3VySWQoKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuaWR9LWhvdXJgO1xuICB9XG5cbiAgcHVibGljIG1pbnV0ZUlkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmlkfS1taW51dGVgO1xuICB9XG5cbiAgcHVibGljIHNlY29uZElkKCkge1xuICAgIHJldHVybiBgJHt0aGlzLmlkfS1zZWNvbmRgO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWV3VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5kYXkgfHwgdGhpcy5tb250aCB8fCB0aGlzLnllYXIgfHwgdGhpcy5ob3VyIHx8IHRoaXMubWludXRlIHx8IHRoaXMuc2Vjb25kKSB7XG4gICAgICBjb25zdCBkYXRlID0gW1xuICAgICAgICB0aGlzLnllYXIgPyB0aGlzLnllYXIgOiAnJyxcbiAgICAgICAgdGhpcy5tb250aCA/IHRoaXMucGFkKHRoaXMubW9udGgpIDogJycsXG4gICAgICAgIHRoaXMuZGF5ID8gdGhpcy5wYWQodGhpcy5kYXkpIDogJydcbiAgICAgIF0uam9pbignLScpO1xuICAgICAgaWYgKHRoaXMuaXNEYXRlVGltZSkge1xuICAgICAgICBjb25zdCB0aW1lID0gW1xuICAgICAgICAgIHRoaXMuaG91ciA/IHRoaXMucGFkKHRoaXMuaG91cikgOiAnJyxcbiAgICAgICAgICB0aGlzLm1pbnV0ZSA/IHRoaXMucGFkKHRoaXMubWludXRlKSA6ICcnLFxuICAgICAgICAgIHRoaXMuc2Vjb25kID8gdGhpcy5wYWQodGhpcy5zZWNvbmQpIDogJydcbiAgICAgICAgXS5qb2luKCc6Jyk7XG4gICAgICAgIHJldHVybiBgJHtkYXRlfVQke3RpbWV9LjAwMGA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZGF0ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwcml2YXRlIGlzRGF0ZUZvcm1hdCh2YWw6IGFueSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLkRBVEVfRk9STUFULnRlc3QodmFsKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFkKG51bTogYW55LCBwYWROdW0gPSAyKTogc3RyaW5nIHtcbiAgICBjb25zdCB2YWwgPSBudW0gIT09IHVuZGVmaW5lZCA/IG51bS50b1N0cmluZygpIDogJyc7XG4gICAgcmV0dXJuIHZhbC5sZW5ndGggPj0gcGFkTnVtID8gdmFsIDogbmV3IEFycmF5KHBhZE51bSAtIHZhbC5sZW5ndGggKyAxKS5qb2luKCcwJykgKyB2YWw7XG4gIH1cblxuICBwcml2YXRlIGdldFZhbHVlRm9yVmFsaWRhdGlvbihjb250cm9sOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0RhdGVUaW1lKSB7XG4gICAgICByZXR1cm4gY29udHJvbC52YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWUucmVwbGFjZSgvWi4qLywgJ1QwMDowMDowMFonKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZU1pbGxpc2Vjb25kcyhkYXRlVGltZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZGF0ZVRpbWUucmVwbGFjZSgvXFwuLiovLCAnJyk7XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWRhdGVcIj5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1kYXlcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgW2Zvcl09XCJkYXlJZCgpXCI+e3snRGF5JyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8aW5wdXQgI2RheUlucHV0XG4gICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgW2lkXT1cImRheUlkKClcIlxuICAgICAgICAgICBbbmFtZV09XCJkYXlJZCgpXCJcbiAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICBwYXR0ZXJuPVwiWzAtOV0qXCJcbiAgICAgICAgICAgaW5wdXRtb2RlPVwibnVtZXJpY1wiXG4gICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5RGF5XCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJkYXlDaGFuZ2UoZGF5SW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgKGtleXVwKT1cImRheUNoYW5nZShkYXlJbnB1dC52YWx1ZSlcIlxuICAgICAgICAgICAoZm9jdXMpPVwiaW5wdXRGb2N1cygpXCJcbiAgICAgICAgICAgW25nQ2xhc3NdPVwieydnb3Z1ay1pbnB1dC0tZXJyb3InOiBpc0ludmFsaWR9XCI+XG4gIDwvZGl2PlxuXG4gIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwIGZvcm0tZ3JvdXAtbW9udGhcIj5cbiAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWxhYmVsXCIgW2Zvcl09XCJtb250aElkKClcIj57eydNb250aCcgfCBycHhUcmFuc2xhdGV9fTwvbGFiZWw+XG4gICAgPGlucHV0ICNtb250aElucHV0XG4gICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sXCJcbiAgICAgICAgICAgW2lkXT1cIm1vbnRoSWQoKVwiXG4gICAgICAgICAgIFtuYW1lXT1cIm1vbnRoSWQoKVwiXG4gICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgcGF0dGVybj1cIlswLTldKlwiXG4gICAgICAgICAgIGlucHV0bW9kZT1cIm51bWVyaWNcIlxuICAgICAgICAgICBbdmFsdWVdPVwiZGlzcGxheU1vbnRoXCJcbiAgICAgICAgICAgKGNoYW5nZSk9XCJtb250aENoYW5nZShtb250aElucHV0LnZhbHVlKVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJtb250aENoYW5nZShtb250aElucHV0LnZhbHVlKVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJpbnB1dEZvY3VzKClcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7J2dvdnVrLWlucHV0LS1lcnJvcic6IGlzSW52YWxpZH1cIj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC15ZWFyXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIFtmb3JdPVwieWVhcklkKClcIj57eydZZWFyJyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8aW5wdXQgI3llYXJJbnB1dFxuICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgIFtpZF09XCJ5ZWFySWQoKVwiXG4gICAgICAgICAgIFtuYW1lXT1cInllYXJJZCgpXCJcbiAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICBwYXR0ZXJuPVwiWzAtOV0qXCJcbiAgICAgICAgICAgaW5wdXRtb2RlPVwibnVtZXJpY1wiXG4gICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5WWVhclwiXG4gICAgICAgICAgIChjaGFuZ2UpPVwieWVhckNoYW5nZSh5ZWFySW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgKGtleXVwKT1cInllYXJDaGFuZ2UoeWVhcklucHV0LnZhbHVlKVwiXG4gICAgICAgICAgIChmb2N1cyk9XCJpbnB1dEZvY3VzKClcIlxuICAgICAgICAgICBbbmdDbGFzc109XCJ7J2dvdnVrLWlucHV0LS1lcnJvcic6IGlzSW52YWxpZH1cIj5cbiAgPC9kaXY+XG5cbiAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXAgZm9ybS1ncm91cC1ob3VyXCIgKm5nSWY9XCJpc0RhdGVUaW1lXCI+XG4gICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1sYWJlbFwiIFtmb3JdPVwiaG91cklkKClcIj57eydIb3VyJyB8IHJweFRyYW5zbGF0ZX19PC9sYWJlbD5cbiAgICA8aW5wdXQgI2hvdXJJbnB1dFxuICAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXG4gICAgICAgICAgIFtpZF09XCJob3VySWQoKVwiXG4gICAgICAgICAgIFtuYW1lXT1cImhvdXJJZCgpXCJcbiAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgIFt2YWx1ZV09XCJkaXNwbGF5SG91clwiXG4gICAgICAgICAgIChpbnB1dCk9XCJob3VyQ2hhbmdlKGhvdXJJbnB1dC52YWx1ZSlcIlxuICAgICAgICAgICAoa2V5dXApPVwiaG91ckNoYW5nZShob3VySW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cImlucHV0Rm9jdXMoKVwiXG4gICAgICAgICAgIFtuZ0NsYXNzXT1cInsnZ292dWstaW5wdXQtLWVycm9yJzogaXNJbnZhbGlkfVwiPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLW1pbnV0ZVwiICpuZ0lmPVwiaXNEYXRlVGltZVwiPlxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBbZm9yXT1cIm1pbnV0ZUlkKClcIj57eydNaW51dGUnIHwgcnB4VHJhbnNsYXRlfX08L2xhYmVsPlxuICAgIDxpbnB1dCAjbWludXRlSW5wdXRcbiAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICBbaWRdPVwibWludXRlSWQoKVwiXG4gICAgICAgICAgIFtuYW1lXT1cIm1pbnV0ZUlkKClcIlxuICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgW3ZhbHVlXT1cImRpc3BsYXlNaW51dGVcIlxuICAgICAgICAgICAoaW5wdXQpPVwibWludXRlQ2hhbmdlKG1pbnV0ZUlucHV0LnZhbHVlKVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJtaW51dGVDaGFuZ2UobWludXRlSW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cImlucHV0Rm9jdXMoKVwiXG4gICAgICAgICAgIFtuZ0NsYXNzXT1cInsnZ292dWstaW5wdXQtLWVycm9yJzogaXNJbnZhbGlkfVwiPlxuICA8L2Rpdj5cblxuICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cCBmb3JtLWdyb3VwLXNlY29uZFwiICpuZ0lmPVwiaXNEYXRlVGltZVwiPlxuICAgIDxsYWJlbCBjbGFzcz1cImZvcm0tbGFiZWxcIiBbZm9yXT1cInNlY29uZElkKClcIj57eydTZWNvbmQnIHwgcnB4VHJhbnNsYXRlfX08L2xhYmVsPlxuICAgIDxpbnB1dCAjc2Vjb25kSW5wdXRcbiAgICAgICAgICAgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIlxuICAgICAgICAgICBbaWRdPVwic2Vjb25kSWQoKVwiXG4gICAgICAgICAgIFtuYW1lXT1cInNlY29uZElkKClcIlxuICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgW3ZhbHVlXT1cImRpc3BsYXlTZWNvbmRcIlxuICAgICAgICAgICAoaW5wdXQpPVwic2Vjb25kQ2hhbmdlKHNlY29uZElucHV0LnZhbHVlKVwiXG4gICAgICAgICAgIChrZXl1cCk9XCJzZWNvbmRDaGFuZ2Uoc2Vjb25kSW5wdXQudmFsdWUpXCJcbiAgICAgICAgICAgKGZvY3VzKT1cImlucHV0Rm9jdXMoKVwiXG4gICAgICAgICAgIFtuZ0NsYXNzXT1cInsnZ292dWstaW5wdXQtLWVycm9yJzogaXNJbnZhbGlkfVwiPlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19