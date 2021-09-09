"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var OrganisationConverter = /** @class */ (function () {
    function OrganisationConverter() {
    }
    OrganisationConverter_1 = OrganisationConverter;
    OrganisationConverter.toSimpleAddress = function (organisationModel) {
        var simpleAddress = '';
        if (organisationModel.addressLine1) {
            simpleAddress += organisationModel.addressLine1 + '<br>';
        }
        if (organisationModel.addressLine2) {
            simpleAddress += organisationModel.addressLine2 + '<br>';
        }
        if (organisationModel.addressLine3) {
            simpleAddress += organisationModel.addressLine3 + '<br>';
        }
        if (organisationModel.townCity) {
            simpleAddress += organisationModel.townCity + '<br>';
        }
        if (organisationModel.county) {
            simpleAddress += organisationModel.county + '<br>';
        }
        if (organisationModel.country) {
            simpleAddress += organisationModel.country + '<br>';
        }
        if (organisationModel.postCode) {
            simpleAddress += organisationModel.postCode + '<br>';
        }
        return simpleAddress;
    };
    OrganisationConverter.prototype.toSimpleOrganisationModel = function (organisationModel) {
        return {
            organisationIdentifier: organisationModel.organisationIdentifier,
            name: organisationModel.name,
            address: OrganisationConverter_1.toSimpleAddress(organisationModel)
        };
    };
    var OrganisationConverter_1;
    OrganisationConverter = OrganisationConverter_1 = __decorate([
        core_1.Injectable()
    ], OrganisationConverter);
    return OrganisationConverter;
}());
exports.OrganisationConverter = OrganisationConverter;
//# sourceMappingURL=organisation-converter.js.map