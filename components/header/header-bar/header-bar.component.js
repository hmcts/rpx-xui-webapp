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
var core_2 = require("@angular/core");
var HeaderBarComponent = /** @class */ (function () {
    function HeaderBarComponent() {
        this.signOutRequest = new core_2.EventEmitter();
    }
    HeaderBarComponent.prototype.signOut = function () {
        this.signOutRequest.emit();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], HeaderBarComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], HeaderBarComponent.prototype, "isSolicitor", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], HeaderBarComponent.prototype, "username", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_2.EventEmitter)
    ], HeaderBarComponent.prototype, "signOutRequest", void 0);
    HeaderBarComponent = __decorate([
        core_1.Component({
            selector: 'cut-header-bar',
            template: "\n      <header role=\"banner\" id=\"global-header\" class=\"with-proposition\">\n        <div [class.full-screen]=\"!isSolicitor\" class=\"header-wrapper\">\n\n          <div class=\"header-global\" [class.header-logo]=\"isSolicitor\">\n            <div *ngIf=\"isSolicitor\">\n              <a href=\"https://www.gov.uk\" title=\"Go to the GOV.UK homepage\" id=\"logo\" class=\"content\" style=\"margin-left: 0px;\">\n                <img src=\"/img/gov.uk_logotype_crown_invert_trans.png?0.23.0\" width=\"36\" height=\"32\" alt=\"\"> GOV.UK\n              </a>\n            </div>\n            <div class=\"global-header\" *ngIf=\"!isSolicitor\">\n              <div class=\"title\">\n                <span>{{title}}</span>\n              </div>\n            </div>\n          </div>\n\n          <div class=\"header-proposition\">\n            <div class=\"content\">\n              <a href=\"#proposition-links\" class=\"js-header-toggle menu\">Menu</a>\n              <div *ngIf=\"isSolicitor\" id=\"proposition-menu\">\n                <div class=\"title-solicitor\">\n                  <span id=\"proposition-name\">{{title}}</span>\n                  <ng-content select=\"[headerNavigation]\"></ng-content>\n                </div>\n              </div>\n\n              <div class=\"proposition-right\">\n                <span id=\"user-name\">{{username}}</span>\n                <a (click)=\"signOut()\" id=\"sign-out\" href=\"javascript:void(0)\">Sign Out</a>\n              </div>\n            </div>\n          </div>\n\n        </div>\n      </header>\n    ",
            styles: ["\n      .global-header:after,.global-header .header-title:after,.global-header .header-username:after,.title:after{content:\"\";display:block;clear:both}.global-header{background-color:#000;width:100%}.global-header .header-title{font-family:\"nta\",Arial,sans-serif;font-weight:700;text-transform:none;font-size:16pt;line-height:1.25;float:left;font-weight:bold;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}@media (min-width: 641px){.global-header .header-title{font-size:20pt;line-height:1.3}}@media (min-width: 769px){.global-header .header-title{width:50%}}@media screen and (max-width: 379px){.global-header .header-title{width:auto;float:none}}.global-header .header-title .header-title-span{padding-left:22px}.global-header .header-username{font-family:\"nta\",Arial,sans-serif;font-weight:400;text-transform:none;font-size:12pt;line-height:1.25;float:right;text-align:right;color:#fff;position:relative;top:50%;-webkit-transform:translateY(-50%);-ms-transform:translateY(-50%);transform:translateY(-50%)}@media (min-width: 641px){.global-header .header-username{font-size:14pt;line-height:1.42857}}@media (min-width: 769px){.global-header .header-username{width:50%}}.global-header .header-username .header-username-span{padding-right:15px}#global-header .full-screen{max-width:100%}.title{font-weight:bold;color:#fff;font-size:24px}.title-solicitor{float:left}.proposition-right{float:right;padding-top:5px}#global-header.with-proposition .header-wrapper .header-logo{width:27%}#global-header.with-proposition .header-wrapper .header-proposition{width:100%;float:none}#global-header.with-proposition .header-wrapper .header-proposition .content{margin:0}#user-name,#sign-out{font-size:16px;font-weight:bold;border:none;color:white;margin:0 0 0 9px;text-decoration:none;background-color:#000}#user-name:focus,#sign-out:focus{color:#fff}#sign-out:hover{text-decoration:underline}\n    "]
        })
    ], HeaderBarComponent);
    return HeaderBarComponent;
}());
exports.HeaderBarComponent = HeaderBarComponent;
//# sourceMappingURL=header-bar.component.js.map