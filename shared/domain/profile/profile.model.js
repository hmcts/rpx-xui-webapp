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
var class_transformer_1 = require("class-transformer");
var jurisdiction_model_1 = require("../definition/jurisdiction.model");
function hasRoles(profile) {
    if (profile.user && profile.user.idam && Array.isArray(profile.user.idam.roles)) {
        return profile.user.idam.roles.length > 0;
    }
    return false;
}
var ɵ0 = function () { return jurisdiction_model_1.Jurisdiction; };
exports.ɵ0 = ɵ0;
// @dynamic
var Profile = /** @class */ (function () {
    function Profile() {
    }
    Profile.prototype.isSolicitor = function () {
        if (hasRoles(this)) {
            return this.user.idam.roles.find(function (r) { return r.endsWith('-solicitor'); }) !== undefined;
        }
        return false;
    };
    Profile.prototype.isCourtAdmin = function () {
        if (hasRoles(this)) {
            return this.user.idam.roles.find(function (r) { return r.endsWith('-courtadmin'); }) !== undefined;
        }
        return false;
    };
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", Array)
    ], Profile.prototype, "jurisdictions", void 0);
    return Profile;
}());
exports.Profile = Profile;
//# sourceMappingURL=profile.model.js.map