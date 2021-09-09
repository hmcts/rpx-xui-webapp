"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var DateInputComponent = /** @class */ (function () {
    function DateInputComponent() {
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
        this.DATE_FORMAT = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?|Z)?$/;
        this.rawValue = '';
    }
    DateInputComponent_1 = DateInputComponent;
    DateInputComponent.prototype.ngOnInit = function () {
        if (this.mandatory && this.isDateTime) {
            this.displayHour = '00';
            this.displayMinute = '00';
            this.displaySecond = '00';
            this.hour = '00';
            this.minute = '00';
            this.second = '00';
        }
    };
    DateInputComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.rawValue = this.removeMilliseconds(obj);
            // needs to handle also partial dates, e.g. -05-2016 (missing day)
            var _a = this.rawValue.split('T'), datePart = _a[0], timePart = _a[1];
            var dateValues = datePart.split('-');
            this.year = this.displayYear = dateValues[0] || '';
            this.month = this.displayMonth = dateValues[1] || '';
            this.day = this.displayDay = dateValues[2] || '';
            if (timePart) {
                var timeParts = timePart.split(':');
                this.hour = this.displayHour = timeParts[0] || '';
                this.minute = this.displayMinute = timeParts[1] || '';
                this.second = this.displaySecond = timeParts[2] || '';
            }
        }
    };
    DateInputComponent.prototype.validate = function (control) {
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
    };
    DateInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    DateInputComponent.prototype.registerOnTouched = function (fn) {
        // Do nothing.
    };
    DateInputComponent.prototype.ngOnDestroy = function () {
        this.validate = function (control) {
            return undefined;
        };
    };
    DateInputComponent.prototype.dayChange = function (value) {
        // get value from input
        this.day = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.monthChange = function (value) {
        // get value from input
        this.month = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.yearChange = function (value) {
        // get value from input
        this.year = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.hourChange = function (value) {
        // get value from input
        this.hour = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.minuteChange = function (value) {
        // get value from input
        this.minute = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.secondChange = function (value) {
        // get value from input
        this.second = value;
        this.rawValue = this.viewValue();
        // update the form
        this.propagateChange(this.rawValue);
    };
    DateInputComponent.prototype.inputFocus = function () {
        this.isTouched = false;
        this.touch();
    };
    DateInputComponent.prototype.touch = function () {
        if (this.isTouched) {
            this.formControl.markAsTouched();
            this.propagateChange(this.rawValue);
        }
        else {
            this.formControl.markAsUntouched();
        }
    };
    DateInputComponent.prototype.dayId = function () {
        return this.id + '-day';
    };
    DateInputComponent.prototype.monthId = function () {
        return this.id + '-month';
    };
    DateInputComponent.prototype.yearId = function () {
        return this.id + '-year';
    };
    DateInputComponent.prototype.hourId = function () {
        return this.id + '-hour';
    };
    DateInputComponent.prototype.minuteId = function () {
        return this.id + '-minute';
    };
    DateInputComponent.prototype.secondId = function () {
        return this.id + '-second';
    };
    DateInputComponent.prototype.viewValue = function () {
        if (this.day || this.month || this.year || this.hour || this.minute || this.second) {
            var date = [
                this.year ? this.year : '',
                this.month ? this.pad(this.month) : '',
                this.day ? this.pad(this.day) : ''
            ].join('-');
            if (this.isDateTime) {
                var time = [
                    this.hour ? this.pad(this.hour) : '',
                    this.minute ? this.pad(this.minute) : '',
                    this.second ? this.pad(this.second) : ''
                ].join(':');
                return date + 'T' + time + '.000';
            }
            else {
                return date;
            }
        }
        return null;
    };
    DateInputComponent.prototype.isDateFormat = function (val) {
        return this.DATE_FORMAT.test(val);
    };
    DateInputComponent.prototype.pad = function (num, padNum) {
        if (padNum === void 0) { padNum = 2; }
        var val = num !== undefined ? num.toString() : '';
        return val.length >= padNum ? val : new Array(padNum - val.length + 1).join('0') + val;
    };
    DateInputComponent.prototype.getValueForValidation = function (control) {
        if (this.isDateTime) {
            return control.value;
        }
        else {
            return control.value.replace(/Z.*/, 'T00:00:00Z');
        }
    };
    DateInputComponent.prototype.removeMilliseconds = function (dateTime) {
        return dateTime.replace(/\..*/, '');
    };
    var DateInputComponent_1;
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], DateInputComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "mandatory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "isDateTime", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], DateInputComponent.prototype, "formControl", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], DateInputComponent.prototype, "isInvalid", void 0);
    DateInputComponent = DateInputComponent_1 = __decorate([
        core_1.Component({
            selector: 'cut-date-input',
            template: "\n    <div class=\"form-date\">\n\n      <div class=\"form-group form-group-day\">\n        <label class=\"form-label\" [for]=\"dayId()\">Day</label>\n        <input #dayInput\n               class=\"form-control\"\n               [id]=\"dayId()\"\n               [name]=\"dayId()\"\n               type=\"text\"\n               pattern=\"[0-9]*\"\n               inputmode=\"numeric\"\n               [value]=\"displayDay\"\n               (change)=\"dayChange(dayInput.value)\"\n               (keyup)=\"dayChange(dayInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n      <div class=\"form-group form-group-month\">\n        <label class=\"form-label\" [for]=\"monthId()\">Month</label>\n        <input #monthInput\n               class=\"form-control\"\n               [id]=\"monthId()\"\n               [name]=\"monthId()\"\n               type=\"text\"\n               pattern=\"[0-9]*\"\n               inputmode=\"numeric\"\n               [value]=\"displayMonth\"\n               (change)=\"monthChange(monthInput.value)\"\n               (keyup)=\"monthChange(monthInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n      <div class=\"form-group form-group-year\">\n        <label class=\"form-label\" [for]=\"yearId()\">Year</label>\n        <input #yearInput\n               class=\"form-control\"\n               [id]=\"yearId()\"\n               [name]=\"yearId()\"\n               type=\"text\"\n               pattern=\"[0-9]*\"\n               inputmode=\"numeric\"\n               [value]=\"displayYear\"\n               (change)=\"yearChange(yearInput.value)\"\n               (keyup)=\"yearChange(yearInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n      <div class=\"form-group form-group-hour\" *ngIf=\"isDateTime\">\n        <label class=\"form-label\" [for]=\"hourId()\">Hour</label>\n        <input #hourInput\n               class=\"form-control\"\n               [id]=\"hourId()\"\n               [name]=\"hourId()\"\n               type=\"number\"\n               [value]=\"displayHour\"\n               (change)=\"hourChange(hourInput.value)\"\n               (keyup)=\"hourChange(hourInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n      <div class=\"form-group form-group-minute\" *ngIf=\"isDateTime\">\n        <label class=\"form-label\" [for]=\"minuteId()\">Minute</label>\n        <input #minuteInput\n               class=\"form-control\"\n               [id]=\"minuteId()\"\n               [name]=\"minuteId()\"\n               type=\"number\"\n               [value]=\"displayMinute\"\n               (change)=\"minuteChange(minuteInput.value)\"\n               (keyup)=\"minuteChange(minuteInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n      <div class=\"form-group form-group-second\" *ngIf=\"isDateTime\">\n        <label class=\"form-label\" [for]=\"secondId()\">Second</label>\n        <input #secondInput\n               class=\"form-control\"\n               [id]=\"secondId()\"\n               [name]=\"secondId()\"\n               type=\"number\"\n               [value]=\"displaySecond\"\n               (change)=\"secondChange(secondInput.value)\"\n               (keyup)=\"secondChange(secondInput.value)\"\n               (focus)=\"inputFocus()\"\n               [ngClass]=\"{'govuk-input--error': isInvalid}\">\n      </div>\n\n    </div>\n  ",
            providers: [
                {
                    provide: forms_2.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return DateInputComponent_1; }),
                    multi: true
                },
                {
                    provide: forms_2.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return DateInputComponent_1; }),
                    multi: true
                }
            ],
        })
    ], DateInputComponent);
    return DateInputComponent;
}());
exports.DateInputComponent = DateInputComponent;
//# sourceMappingURL=date-input.component.js.map