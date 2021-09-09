"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var browser_service_1 = require("../../../services/browser/browser.service");
var abstract_field_write_component_1 = require("../base-field/abstract-field-write.component");
var WriteTextAreaFieldComponent = /** @class */ (function (_super) {
    __extends(WriteTextAreaFieldComponent, _super);
    function WriteTextAreaFieldComponent(browserService) {
        var _this = _super.call(this) || this;
        _this.browserService = browserService;
        return _this;
    }
    WriteTextAreaFieldComponent.prototype.ngOnInit = function () {
        this.textareaControl = this.registerControl(new forms_1.FormControl(this.caseField.value));
    };
    WriteTextAreaFieldComponent.prototype.autoGrow = function (event) {
        if (this.browserService.isIEOrEdge()) {
            event.target.style.height = 'auto';
            event.target.style.height = event.target.scrollHeight + 'px';
            event.target.scrollTop = event.target.scrollHeight;
        }
    };
    WriteTextAreaFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-write-text-area-field',
            template: "\n    <div class=\"form-group\" [ngClass]=\"{'form-group-error': !textareaControl.valid && textareaControl.dirty}\">\n\n      <label [for]=\"id()\">\n        <span class=\"form-label\" *ngIf=\"caseField.label\">{{caseField | ccdFieldLabel}}</span>\n      </label>\n      <span class=\"form-hint\" *ngIf=\"caseField.hint_text\">{{caseField.hint_text}}</span>\n      <span class=\"error-message\" *ngIf=\"textareaControl.errors && textareaControl.dirty\">{{textareaControl.errors | ccdFirstError:caseField.label}}</span>\n\n      <textarea (input)=\"autoGrow($event)\" class=\"form-control bottom-30\" [ngClass]=\"{'govuk-textarea--error': textareaControl.errors && textareaControl.dirty}\" \n       [id]=\"id()\" rows=\"3\" [formControl]=\"textareaControl\"></textarea>\n\n    </div>\n  ",
            providers: [browser_service_1.BrowserService]
        }),
        __metadata("design:paramtypes", [browser_service_1.BrowserService])
    ], WriteTextAreaFieldComponent);
    return WriteTextAreaFieldComponent;
}(abstract_field_write_component_1.AbstractFieldWriteComponent));
exports.WriteTextAreaFieldComponent = WriteTextAreaFieldComponent;
//# sourceMappingURL=write-text-area-field.component.js.map