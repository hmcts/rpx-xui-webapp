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
var ActivityIconComponent = /** @class */ (function () {
    function ActivityIconComponent() {
    }
    ActivityIconComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityIconComponent.prototype, "description", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityIconComponent.prototype, "imageLink", void 0);
    ActivityIconComponent = __decorate([
        core_1.Component({
            selector: 'ccd-activity-icon',
            template: "\n    <div class=\"tooltip\">\n      <img alt=\"{{description}}\" class=\"img-responsive\" src=\"{{imageLink}}\" />\n      <span class=\"tooltiptext\">{{description}}</span>\n    </div>\n  ",
            styles: ["\n    .tooltip{position:relative;display:inline-block}.tooltip .tooltiptext{visibility:hidden;width:140px;background-color:#1175B2;color:#fff;text-align:center;border-radius:6px;padding:5px 0px;position:absolute;z-index:1;margin-left:-50px;opacity:0;transition:opacity 1s}.tooltip:hover .tooltiptext{visibility:visible;opacity:1}\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], ActivityIconComponent);
    return ActivityIconComponent;
}());
exports.ActivityIconComponent = ActivityIconComponent;
//# sourceMappingURL=activity-icon.component.js.map