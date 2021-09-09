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
var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FooterComponent.prototype, "email", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], FooterComponent.prototype, "isSolicitor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FooterComponent.prototype, "phone", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], FooterComponent.prototype, "workhours", void 0);
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'cut-footer-bar',
            template: "\n      <footer class=\"group js-footer\" id=\"footer\" role=\"footer\">\n        <div [class.full-screen]=\"!isSolicitor\" class=\"footer-wrapper\">\n\n          <!-- Condition: Solicitor -->\n          <div *ngIf=\"isSolicitor\" class=\"footer-meta\">\n            <div class=\"footer-meta-inner\">\n              <ng-content select=\"[footerSolsNavLinks]\"></ng-content>\n              <div class=\"open-government-licence\">\n                <p class=\"logo\"><a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">Open Government Licence</a></p>\n                <p>All content is available under the <a href=\"https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/\" rel=\"license\">Open Government Licence v3.0</a>, except where otherwise stated</p>\n              </div>\n            </div>\n\n            <div class=\"copyright\">\n              <a href=\"https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/copyright-and-re-use/crown-copyright/\">\u00A9 Crown copyright</a>\n            </div>\n          </div>\n\n          <!-- Condition: Case Worker -->\n          <div *ngIf=\"!isSolicitor\" class=\"footer-meta\">\n            <div class=\"title\">\n              <span class=\"footer-text\">Help</span>\n            </div>\n            <div class=\"email\">\n              <span class=\"footer-text\">Email: <a href=\"mailto:{{email}}\">{{email}}</a></span>\n            </div>\n            <div class=\"phone\">\n              <span class=\"footer-text\">Phone: {{phone}}</span>\n            </div>\n            <div class=\"work-hours\">\n              <span class=\"footer-text\">{{workhours}}</span>\n            </div>\n            <ng-content select=\"[footerCaseWorkerNavLinks]\"></ng-content>\n          </div>\n\n        </div>\n      </footer>\n    ",
            styles: ["\n      .footer-text{color:#231F20;margin-top:5px;font-size:16px;font-weight:normal;font-style:normal;font-stretch:normal;letter-spacing:normal}#footer .full-screen{max-width:100%;padding-left:20px}\n    "]
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map