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
var ActivityBannerComponent = /** @class */ (function () {
    function ActivityBannerComponent() {
    }
    ActivityBannerComponent.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityBannerComponent.prototype, "bannerType", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityBannerComponent.prototype, "description", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityBannerComponent.prototype, "imageLink", void 0);
    ActivityBannerComponent = __decorate([
        core_1.Component({
            selector: 'ccd-activity-banner',
            template: "\n    <div [ngClass]=\"{caseLocked: bannerType === 'editor', someoneViewing: bannerType === 'viewer'}\">\n      <div class=\"bannerIcon\"><img alt=\"{{description}}\" class=\"img-responsive\" src=\"{{imageLink}}\" /></div>\n      <div class=\"bannerText\">{{description}}</div>\n    </div>\n  ",
            styles: ["\n    .caseLocked{margin-top:4px;height:40px;-webkit-filter:blur(0);filter:blur(0);background-color:#e72626}.someoneViewing{margin-top:4px;height:40px;-webkit-filter:blur(0);filter:blur(0);background-color:#912b88}.bannerIcon{float:left;color:#FFFFFF;padding-left:9px;position:relative;top:50%;transform:translateY(-40%)}.bannerText{padding-left:40px;position:relative;top:50%;transform:translateY(-50%);height:20px;-webkit-filter:blur(0);filter:blur(0);font-family:\"nta\", Arial, sans-serif;font-size:16px;font-weight:bold;line-height:1.25;text-align:left;color:#ffffff}\n  "]
        }),
        __metadata("design:paramtypes", [])
    ], ActivityBannerComponent);
    return ActivityBannerComponent;
}());
exports.ActivityBannerComponent = ActivityBannerComponent;
//# sourceMappingURL=activity-banner.component.js.map