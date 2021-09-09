"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AbstractAppConfig = /** @class */ (function () {
    function AbstractAppConfig() {
    }
    AbstractAppConfig.prototype.getDocumentManagementUrlV2 = function () {
        return undefined;
    };
    AbstractAppConfig.prototype.getDocumentSecureMode = function () {
        return undefined;
    };
    /**
     * Dummy version replacing deprecated `getRemotePrintServiceUrl()`, to be removed in next major release
     * @deprecated
     * @returns `undefined`
     */
    AbstractAppConfig.prototype.getRemotePrintServiceUrl = function () {
        return undefined;
    };
    AbstractAppConfig.prototype.getUserInfoApiUrl = function () {
        return undefined;
    };
    return AbstractAppConfig;
}());
exports.AbstractAppConfig = AbstractAppConfig;
var CaseEditorConfig = /** @class */ (function () {
    function CaseEditorConfig() {
    }
    return CaseEditorConfig;
}());
exports.CaseEditorConfig = CaseEditorConfig;
//# sourceMappingURL=app.config.js.map