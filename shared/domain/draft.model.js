"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DRAFT_PREFIX = 'DRAFT';
exports.DRAFT_QUERY_PARAM = 'draft';
var Draft = /** @class */ (function () {
    function Draft() {
    }
    Draft.stripDraftId = function (draftId) {
        return draftId.slice(exports.DRAFT_PREFIX.length);
    };
    Draft.isDraft = function (id) {
        return String(id).startsWith(exports.DRAFT_PREFIX);
    };
    return Draft;
}());
exports.Draft = Draft;
//# sourceMappingURL=draft.model.js.map