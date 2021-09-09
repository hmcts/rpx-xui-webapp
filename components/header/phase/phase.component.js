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
var PhaseComponent = /** @class */ (function () {
    function PhaseComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhaseComponent.prototype, "phaseLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PhaseComponent.prototype, "phaseLink", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], PhaseComponent.prototype, "isSolicitor", void 0);
    PhaseComponent = __decorate([
        core_1.Component({
            selector: 'cut-phase-bar',
            template: "\n      <div [class.full-screen]=\"!isSolicitor\" class=\"phase-banner\">\n        <p>\n          <strong class=\"phase-tag\">{{phaseLabel}}</strong>\n          <span class=\"text-16\">This is a new service \u2013 your <a href=\"{{phaseLink}}\" target=\"_blank\">feedback</a> will help us to improve it.</span>\n        </p>\n      </div>\n    ",
            styles: ["\n      .phase-banner{padding-top:10px;padding-left:15px;border-bottom:1px solid #bfc1c3;max-width:1005px;margin:0 auto}@media (min-width: 641px){.phase-banner{padding-bottom:10px}}.phase-banner p{display:table;margin:0;color:#000;font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:11pt;line-height:1.27273}@media (min-width: 641px){.phase-banner p{font-size:12pt;line-height:1.33333}}.phase-banner .phase-tag{display:-moz-inline-stack;display:inline-block;margin:0 8px 0 0;padding:2px 5px 0;font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:11pt;line-height:1.27273;text-transform:uppercase;letter-spacing:1px;text-decoration:none;color:#fff;background-color:#005ea5}@media (min-width: 641px){.phase-banner .phase-tag{font-size:12pt;line-height:1.25}}.phase-banner span{display:table-cell;vertical-align:baseline}.full-screen{max-width:100%}\n    "]
        })
    ], PhaseComponent);
    return PhaseComponent;
}());
exports.PhaseComponent = PhaseComponent;
//# sourceMappingURL=phase.component.js.map