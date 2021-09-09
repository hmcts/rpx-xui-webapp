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
var search_result_view_column_model_1 = require("./search-result-view-column.model");
var search_result_view_item_model_1 = require("./search-result-view-item.model");
var draft_model_1 = require("../draft.model");
var ɵ0 = function () { return search_result_view_column_model_1.SearchResultViewColumn; }, ɵ1 = function () { return search_result_view_item_model_1.SearchResultViewItem; };
exports.ɵ0 = ɵ0;
exports.ɵ1 = ɵ1;
// @dynamic
var SearchResultView = /** @class */ (function () {
    function SearchResultView() {
    }
    SearchResultView.prototype.hasDrafts = function () {
        return this.results[0]
            && this.results[0].case_id
            && draft_model_1.Draft.isDraft(this.results[0].case_id);
    };
    __decorate([
        class_transformer_1.Type(ɵ0),
        __metadata("design:type", Array)
    ], SearchResultView.prototype, "columns", void 0);
    __decorate([
        class_transformer_1.Type(ɵ1),
        __metadata("design:type", Array)
    ], SearchResultView.prototype, "results", void 0);
    return SearchResultView;
}());
exports.SearchResultView = SearchResultView;
//# sourceMappingURL=search-result-view.model.js.map