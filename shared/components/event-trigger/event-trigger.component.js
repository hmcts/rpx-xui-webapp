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
var services_1 = require("../../services");
var EventTriggerComponent = /** @class */ (function () {
    function EventTriggerComponent(fb, orderService) {
        this.fb = fb;
        this.orderService = orderService;
        this.onTriggerSubmit = new core_1.EventEmitter();
        this.onTriggerChange = new core_1.EventEmitter();
    }
    EventTriggerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.triggers && changes.triggers.currentValue) {
            this.triggers = this.orderService.sort(this.triggers);
            this.triggerForm = this.fb.group({
                'trigger': [this.getDefault(), forms_1.Validators.required]
            });
        }
    };
    EventTriggerComponent.prototype.isButtonDisabled = function () {
        return !this.triggerForm.valid || this.isDisabled;
    };
    EventTriggerComponent.prototype.getDefault = function () {
        return this.triggers.length === 1 ? this.triggers[0] : '';
    };
    EventTriggerComponent.prototype.triggerSubmit = function () {
        this.onTriggerSubmit.emit(this.triggerForm.value['trigger']);
    };
    EventTriggerComponent.prototype.triggerChange = function () {
        this.onTriggerChange.emit(null);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EventTriggerComponent.prototype, "triggers", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], EventTriggerComponent.prototype, "triggerText", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], EventTriggerComponent.prototype, "isDisabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EventTriggerComponent.prototype, "onTriggerSubmit", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], EventTriggerComponent.prototype, "onTriggerChange", void 0);
    EventTriggerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-event-trigger',
            template: "\n    <form *ngIf=\"triggers && triggers.length\" class=\"event-trigger\" (ngSubmit)=\"triggerSubmit()\" [formGroup]=\"triggerForm\">\n      <div class=\"form-group\">\n        <label class=\"form-label\" for=\"next-step\">Next step</label>\n        <select class=\"form-control ccd-dropdown\" id=\"next-step\" (change)=\"triggerChange()\" formControlName=\"trigger\" [ngClass]=\"{\n              'EventTrigger-empty': !triggerForm.value['trigger']\n            }\">\n          <option *ngIf=\"1 !== triggers.length\" value=\"\" data-default>Select action</option>\n          <option *ngFor=\"let trigger of triggers\" [ngValue]=\"trigger\" [title]=\"trigger.description\">{{trigger.name}}</option>\n        </select>\n      </div>\n      <button [disabled]=\"isButtonDisabled()\" type=\"submit\" class=\"button\">{{triggerText}}</button>\n    </form>\n  ",
            styles: ["\n    .event-trigger{width:auto;margin-top:40px;margin-bottom:20px}.event-trigger .form-group{margin-top:3px;margin-right:10px;margin-bottom:0;float:left;text-align:right;width:325px}.event-trigger .form-group .form-label{float:left;margin-top:5px}.event-trigger select{width:250px}.event-trigger select.EventTrigger-empty,.event-trigger select [data-default]{color:#6f777b}\n  "]
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, services_1.OrderService])
    ], EventTriggerComponent);
    return EventTriggerComponent;
}());
exports.EventTriggerComponent = EventTriggerComponent;
//# sourceMappingURL=event-trigger.component.js.map