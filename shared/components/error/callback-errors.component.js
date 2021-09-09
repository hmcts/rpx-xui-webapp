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
var rxjs_1 = require("rxjs");
var error_context_1 = require("./domain/error-context");
var CallbackErrorsComponent = /** @class */ (function () {
    function CallbackErrorsComponent() {
        this.triggerTextIgnore = CallbackErrorsComponent_1.TRIGGER_TEXT_IGNORE;
        this.triggerTextContinue = CallbackErrorsComponent_1.TRIGGER_TEXT_SUBMIT;
        this.callbackErrorsSubject = new rxjs_1.Subject();
        this.callbackErrorsContext = new core_1.EventEmitter();
    }
    CallbackErrorsComponent_1 = CallbackErrorsComponent;
    CallbackErrorsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.callbackErrorsSubject.subscribe(function (errorEvent) {
            _this.error = errorEvent;
            if (_this.hasWarnings() || _this.hasErrors() || _this.hasInvalidData()) {
                var callbackErrorsContext = _this.buildCallbackErrorsContext();
                _this.callbackErrorsContext.emit(callbackErrorsContext);
            }
        });
    };
    CallbackErrorsComponent.prototype.ngOnDestroy = function () {
        this.callbackErrorsSubject.unsubscribe();
    };
    CallbackErrorsComponent.prototype.buildCallbackErrorsContext = function () {
        var errorContext = new error_context_1.CallbackErrorsContext();
        if (this.hasWarnings() && !this.hasErrors() && !this.hasInvalidData()) {
            errorContext.ignore_warning = true;
            errorContext.trigger_text = this.triggerTextIgnore;
        }
        else {
            errorContext.ignore_warning = false;
            errorContext.trigger_text = this.triggerTextContinue;
        }
        return errorContext;
    };
    CallbackErrorsComponent.prototype.hasErrors = function () {
        return this.error
            && this.error.callbackErrors
            && this.error.callbackErrors.length;
    };
    CallbackErrorsComponent.prototype.hasWarnings = function () {
        return this.error
            && this.error.callbackWarnings
            && this.error.callbackWarnings.length;
    };
    CallbackErrorsComponent.prototype.hasInvalidData = function () {
        return this.error
            && this.error.details
            && this.error.details.field_errors
            && this.error.details.field_errors.length;
    };
    var CallbackErrorsComponent_1;
    CallbackErrorsComponent.TRIGGER_TEXT_SUBMIT = 'Submit';
    CallbackErrorsComponent.TRIGGER_TEXT_START = 'Start';
    CallbackErrorsComponent.TRIGGER_TEXT_GO = 'Go';
    CallbackErrorsComponent.TRIGGER_TEXT_IGNORE = 'Ignore Warning and Go';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CallbackErrorsComponent.prototype, "triggerTextIgnore", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CallbackErrorsComponent.prototype, "triggerTextContinue", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", rxjs_1.Subject)
    ], CallbackErrorsComponent.prototype, "callbackErrorsSubject", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CallbackErrorsComponent.prototype, "callbackErrorsContext", void 0);
    CallbackErrorsComponent = CallbackErrorsComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-callback-errors',
            template: "\n    <div *ngIf=\"hasErrors() || hasWarnings()\" class=\"error-summary\" role=\"group\"\n         aria-label=\"Cannot continue because the service reported one or more errors or warnings\" tabindex=\"-1\">\n      <ng-container *ngIf=\"hasErrors()\">\n        <h3 class=\"heading-h3 error-summary-heading\">\n          Errors\n        </h3>\n        <ul id=\"errors\" class=\"error-summary-list\">\n          <li *ngFor=\"let errorMsg of error.callbackErrors\">\n            {{errorMsg}}\n          </li>\n        </ul>\n      </ng-container>\n      <!-- Add a break for spacing if there are both errors and warnings -->\n      <br *ngIf=\"hasErrors() && hasWarnings()\">\n      <ng-container *ngIf=\"hasWarnings()\">\n        <h3 class=\"heading-h3 error-summary-heading\">\n          Warnings\n        </h3>\n        <ul id=\"warnings\" class=\"error-summary-list\">\n          <li *ngFor=\"let warningMsg of error.callbackWarnings\">\n            {{warningMsg}}\n          </li>\n        </ul>\n      </ng-container>\n    </div>\n  "
        })
    ], CallbackErrorsComponent);
    return CallbackErrorsComponent;
}());
exports.CallbackErrorsComponent = CallbackErrorsComponent;
//# sourceMappingURL=callback-errors.component.js.map