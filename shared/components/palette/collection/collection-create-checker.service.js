"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CollectionCreateCheckerService = /** @class */ (function () {
    function CollectionCreateCheckerService() {
    }
    CollectionCreateCheckerService.prototype.setDisplayContextForChildren = function (caseField, profile) {
        var _this = this;
        var children = this.getCaseFieldChildren(caseField);
        if (children && children.length > 0) {
            children.forEach(function (child) {
                if (!!profile.user.idam.roles.find(function (role) { return _this.hasCreateAccess(child, role); })) {
                    child.display_context = caseField.display_context;
                }
                if (_this.isCollection(child) || _this.isComplex(child)) {
                    _this.setDisplayContextForChildren(child, profile);
                }
            });
        }
    };
    CollectionCreateCheckerService.prototype.getCaseFieldChildren = function (caseField) {
        var childrenCaseFields = [];
        if (this.isCollection(caseField)) {
            childrenCaseFields = caseField.field_type.collection_field_type.complex_fields || [];
        }
        else if (this.isComplex(caseField)) {
            childrenCaseFields = caseField.field_type.complex_fields || [];
        }
        return childrenCaseFields;
    };
    CollectionCreateCheckerService.prototype.isComplex = function (case_field) {
        return case_field.field_type.type === 'Complex';
    };
    CollectionCreateCheckerService.prototype.isCollection = function (case_field) {
        return case_field.field_type.type === 'Collection';
    };
    CollectionCreateCheckerService.prototype.hasCreateAccess = function (caseField, role) {
        return !!caseField.acls.find(function (acl) { return acl.role === role && acl.create === true; });
    };
    CollectionCreateCheckerService = __decorate([
        core_1.Injectable()
    ], CollectionCreateCheckerService);
    return CollectionCreateCheckerService;
}());
exports.CollectionCreateCheckerService = CollectionCreateCheckerService;
//# sourceMappingURL=collection-create-checker.service.js.map