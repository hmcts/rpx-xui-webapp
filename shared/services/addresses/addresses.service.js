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
var app_config_1 = require("../../../app.config");
var addresses_1 = require("../../domain/addresses");
var http_1 = require("../http");
var operators_1 = require("rxjs/operators");
var AddressesService = /** @class */ (function () {
    function AddressesService(http, appConfig) {
        this.http = http;
        this.appConfig = appConfig;
    }
    AddressesService_1 = AddressesService;
    AddressesService.prototype.getAddressesForPostcode = function (postcode) {
        var _this = this;
        return this.http
            .get(this.appConfig.getPostcodeLookupUrl()
            .replace('${postcode}', postcode), undefined, false)
            .pipe(operators_1.map(function (res) { return res.results; }))
            .pipe(operators_1.map(function (output) { return output.map(function (addresses) {
            return _this.format(new AddressParser().parse(addresses[AddressesService_1.DPA]));
        }); }));
    };
    AddressesService.prototype.format = function (addressModel) {
        return this.formatAddressLines(this.shiftAddressLinesUp(addressModel));
    };
    AddressesService.prototype.formatAddressLines = function (addressModel) {
        var _this = this;
        ['AddressLine1', 'AddressLine2', 'AddressLine3', 'PostTown'].forEach(function (value) {
            addressModel[value] = _this.toCapitalCase(addressModel[value]);
        });
        return addressModel;
    };
    AddressesService.prototype.shiftAddressLinesUp = function (addressModel) {
        if (addressModel.AddressLine2 === '') {
            addressModel.AddressLine2 = addressModel.AddressLine3;
            addressModel.AddressLine3 = '';
        }
        if (addressModel.AddressLine1 === '') {
            addressModel.AddressLine1 = addressModel.AddressLine2;
            addressModel.AddressLine2 = '';
        }
        return addressModel;
    };
    AddressesService.prototype.toCapitalCase = function (sentence) {
        sentence = sentence.toLowerCase();
        sentence.split(' ').forEach(function (value, index) {
            sentence = sentence.replace(value, value.charAt(0).toUpperCase() + value.substr(1));
        });
        return sentence;
    };
    var AddressesService_1;
    AddressesService.DPA = 'DPA';
    AddressesService.UK = 'United Kingdom';
    AddressesService.RD06 = 'RD06';
    AddressesService = AddressesService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpService, app_config_1.AbstractAppConfig])
    ], AddressesService);
    return AddressesService;
}());
exports.AddressesService = AddressesService;
/**
 * Moving all this logic here into Address Parser class, so that it
 * will be easier for us when we move this parsing logic to into
 * `Shim` java service.
 */
var AddressParser = /** @class */ (function () {
    function AddressParser() {
    }
    AddressParser.prototype.parse = function (address) {
        var classification = "" + address.CLASSIFICATION_CODE;
        var addressModel = new addresses_1.AddressModel();
        addressModel.AddressLine1 = this.parseAddressLine1(classification, address);
        addressModel.AddressLine2 = this.parseAddressLine2(classification, address);
        addressModel.AddressLine3 = this.parseAddressLine3(classification, address);
        addressModel.PostCode = address.POSTCODE;
        addressModel.PostTown = address.POST_TOWN;
        addressModel.Country = AddressesService.UK;
        return addressModel;
    };
    AddressParser.prototype.parseAddressLine1 = function (classification, address) {
        var addressLine = '';
        if (classification === AddressesService.RD06) {
            addressLine =
                address.SUB_BUILDING_NAME + " " + address.ORGANISATION_NAME + " " + address.DEPARTMENT_NAME + " " + address.PO_BOX_NUMBER;
        }
        else {
            addressLine =
                "" + address.ORGANISATION_NAME + this.prefixWithCommaIfPresent(address.BUILDING_NAME) +
                    (address.DEPARTMENT_NAME + " " + address.PO_BOX_NUMBER);
        }
        return this.removeNonAddressValues(addressLine);
    };
    AddressParser.prototype.parseAddressLine2 = function (classification, address) {
        var addressLine = '';
        if (classification === AddressesService.RD06) {
            addressLine = address.BUILDING_NAME + " ";
        }
        else {
            addressLine =
                address.SUB_BUILDING_NAME + " " + address.BUILDING_NUMBER + " " + address.THOROUGHFARE_NAME;
        }
        return this.removeNonAddressValues(addressLine);
    };
    AddressParser.prototype.parseAddressLine3 = function (classification, address) {
        var addressLine = '';
        if (classification === AddressesService.RD06) {
            addressLine =
                address.BUILDING_NUMBER + " " + address.THOROUGHFARE_NAME;
        }
        else {
            addressLine =
                address.DEPENDENT_LOCALITY + " " + address.DOUBLE_DEPENDENT_LOCALITY + " " + address.DEPENDENT_THOROUGHFARE_NAME;
        }
        return this.removeNonAddressValues(addressLine);
    };
    AddressParser.prototype.removeNonAddressValues = function (line) {
        line = line.replace(' null', ' ').replace('null ', ' ');
        line = this.removeUndefinedString(line);
        line = this.removeInitialComma(line);
        line = this.removeEmptySpaces(line);
        return line;
    };
    ;
    AddressParser.prototype.removeUndefinedString = function (value) {
        return value.replace(new RegExp('undefined', 'gi'), '');
    };
    AddressParser.prototype.removeEmptySpaces = function (value) {
        return value.replace(new RegExp(' +', 'gi'), ' ').trim();
    };
    AddressParser.prototype.removeInitialComma = function (value) {
        return value.replace(new RegExp('^,', 'gi'), '');
    };
    AddressParser.prototype.prefixWithCommaIfPresent = function (value) {
        return value ? ', ' + value : value;
    };
    return AddressParser;
}());
//# sourceMappingURL=addresses.service.js.map