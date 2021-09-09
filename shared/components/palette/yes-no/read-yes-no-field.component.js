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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var core_1 = require("@angular/core");
var yes_no_service_1 = require("./yes-no.service");
var ReadYesNoFieldComponent = /** @class */ (function (_super) {
    __extends(ReadYesNoFieldComponent, _super);
    function ReadYesNoFieldComponent(yesNoService) {
        var _this = _super.call(this) || this;
        _this.yesNoService = yesNoService;
        return _this;
    }
    ReadYesNoFieldComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.formattedValue = this.yesNoService.format(this.caseField.value);
    };
    ReadYesNoFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-yes-no-field',
            template: "<span class=\"text-16\">{{formattedValue}}</span>"
        }),
        __metadata("design:paramtypes", [yes_no_service_1.YesNoService])
    ], ReadYesNoFieldComponent);
    return ReadYesNoFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadYesNoFieldComponent = ReadYesNoFieldComponent;
//# sourceMappingURL=read-yes-no-field.component.js.map