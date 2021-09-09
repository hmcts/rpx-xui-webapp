"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AddressOption = /** @class */ (function () {
    function AddressOption(addressModel, description) {
        if (description == null) {
            this.value = addressModel;
            this.description = this.getDescription();
        }
        else {
            this.description = description;
        }
    }
    AddressOption.prototype.getDescription = function () {
        return this.removeInitialCommaIfPresent((this.value.AddressLine1 === undefined ? '' : this.value.AddressLine1)
            + this.prefixWithCommaIfPresent(this.value.AddressLine2)
            + this.prefixWithCommaIfPresent(this.value.AddressLine3)
            + ', ' + this.value.PostTown);
    };
    AddressOption.prototype.prefixWithCommaIfPresent = function (value) {
        return value ? ', ' + value : value;
    };
    AddressOption.prototype.removeInitialCommaIfPresent = function (value) {
        return value.replace(new RegExp('^,', 'gi'), '');
    };
    return AddressOption;
}());
exports.AddressOption = AddressOption;
//# sourceMappingURL=address-option.model.js.map