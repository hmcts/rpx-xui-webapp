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
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var app_config_1 = require("../../../app.config");
var OrganisationService = /** @class */ (function () {
    function OrganisationService(http, appconfig) {
        this.http = http;
        this.appconfig = appconfig;
    }
    OrganisationService_1 = OrganisationService;
    OrganisationService.mapOrganisation = function (organisations) {
        var organisationsVm = new Array();
        organisations.forEach(function (org) {
            var contactInformation = null;
            if (org.contactInformation && org.contactInformation[0]) {
                contactInformation = org.contactInformation[0];
            }
            organisationsVm.push({
                organisationIdentifier: org.organisationIdentifier,
                name: org.name,
                addressLine1: contactInformation !== null ? contactInformation.addressLine1 : null,
                addressLine2: contactInformation !== null ? contactInformation.addressLine2 : null,
                addressLine3: contactInformation !== null ? contactInformation.addressLine3 : null,
                townCity: contactInformation !== null ? contactInformation.townCity : null,
                county: contactInformation !== null ? contactInformation.county : null,
                country: contactInformation !== null ? contactInformation.country : null,
                postCode: contactInformation !== null ? contactInformation.postCode : null,
            });
        });
        return organisationsVm;
    };
    OrganisationService.prototype.getActiveOrganisations = function () {
        var _this = this;
        if (!this.organisations$) {
            var url = this.appconfig.getPrdUrl();
            var cacheTimeOut = this.appconfig.getCacheTimeOut();
            this.organisations$ = this.http.get(url)
                .pipe(operators_1.map(function (orgs) { return OrganisationService_1.mapOrganisation(orgs); }), operators_1.publishReplay(1), operators_1.refCount(), operators_1.take(1)).catch(function (e) {
                console.log(e);
                // Handle error and return blank Observable array
                return rxjs_1.of([]);
            });
            rxjs_1.timer(cacheTimeOut).subscribe(function () {
                _this.organisations$ = null;
            });
        }
        return this.organisations$;
    };
    var OrganisationService_1;
    OrganisationService = OrganisationService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            app_config_1.AbstractAppConfig])
    ], OrganisationService);
    return OrganisationService;
}());
exports.OrganisationService = OrganisationService;
//# sourceMappingURL=organisation.service.js.map