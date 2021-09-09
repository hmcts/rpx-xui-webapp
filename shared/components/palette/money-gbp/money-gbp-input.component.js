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
var MoneyGbpInputComponent = /** @class */ (function () {
    function MoneyGbpInputComponent() {
        this.displayValue = null;
        this.propagateChange = function (_) { };
    }
    MoneyGbpInputComponent_1 = MoneyGbpInputComponent;
    // change events from the textarea
    MoneyGbpInputComponent.prototype.onChange = function (event) {
        // get value from input
        var newValue = event.target.value;
        if (newValue && MoneyGbpInputComponent_1.PATTERN_REGEXP.test(newValue)) {
            var parts = newValue.split('.');
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
    };
    MoneyGbpInputComponent.prototype.writeValue = function (obj) {
        if (obj) {
            this.rawValue = obj;
            var integerPart = obj.slice(0, -2) || '0';
            var decimalPart = obj.slice(-2);
            while (2 > decimalPart.length) {
                decimalPart += '0';
            }
            this.displayValue = [integerPart, decimalPart].join('.');
        }
    };
    MoneyGbpInputComponent.prototype.registerOnChange = function (fn) {
        this.propagateChange = fn;
    };
    MoneyGbpInputComponent.prototype.registerOnTouched = function (_) {
        // Not used.
    };
    MoneyGbpInputComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    MoneyGbpInputComponent.prototype.validate = function (control) {
        if (this.mandatory && !control.value) {
            return {
                pattern: 'This field is required'
            };
        }
        if (control.value && !MoneyGbpInputComponent_1.PATTERN_REGEXP.test(control.value)) {
            return {
                pattern: 'Should only contain numbers with up to 2 decimal places'
            };
        }
        return undefined;
    };
    MoneyGbpInputComponent.prototype.registerOnValidatorChange = function (_) {
        // Not used.
    };
    var MoneyGbpInputComponent_1;
    MoneyGbpInputComponent.PATTERN_REGEXP = new RegExp('^\\d*(\\.\\d{0,2})?$');
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MoneyGbpInputComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], MoneyGbpInputComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], MoneyGbpInputComponent.prototype, "mandatory", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormControl)
    ], MoneyGbpInputComponent.prototype, "formControl", void 0);
    MoneyGbpInputComponent = MoneyGbpInputComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-money-gbp-input',
            template: "<input class=\"form-control form-control-1-8\"\n                    type=\"text\"\n                    [id]=\"id\"\n                    [name]=\"name\"\n                    [value]=\"displayValue\"\n                    (change)=\"onChange($event)\"\n                    (keyup)=\"onChange($event)\"\n                    [disabled]=\"disabled\"/>",
            providers: [
                {
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return MoneyGbpInputComponent_1; }),
                    multi: true,
                },
                {
                    provide: forms_1.NG_VALIDATORS,
                    useExisting: core_1.forwardRef(function () { return MoneyGbpInputComponent_1; }),
                    multi: true,
                }
            ]
        })
    ], MoneyGbpInputComponent);
    return MoneyGbpInputComponent;
}());
exports.MoneyGbpInputComponent = MoneyGbpInputComponent;
//# sourceMappingURL=money-gbp-input.component.js.map