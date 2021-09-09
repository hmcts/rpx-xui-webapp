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
var app_config_1 = require("../../../../app.config");
var DocumentUrlPipe = /** @class */ (function () {
    function DocumentUrlPipe(appConfig) {
        this.appConfig = appConfig;
    }
    DocumentUrlPipe.prototype.transform = function (value) {
        var remoteHrsPattern = new RegExp(this.appConfig.getRemoteHrsUrl());
        value = value.replace(remoteHrsPattern, this.appConfig.getHrsUrl());
        var remoteDocumentManagementPattern = new RegExp(this.appConfig.getRemoteDocumentManagementUrl());
        return value.replace(remoteDocumentManagementPattern, this.appConfig.getDocumentManagementUrl());
    };
    DocumentUrlPipe = __decorate([
        core_1.Pipe({
            name: 'ccdDocumentUrl'
        }),
        __metadata("design:paramtypes", [app_config_1.AbstractAppConfig])
    ], DocumentUrlPipe);
    return DocumentUrlPipe;
}());
exports.DocumentUrlPipe = DocumentUrlPipe;
//# sourceMappingURL=document-url.pipe.js.map