"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var util_1 = require("util");
var domain_1 = require("../../../domain");
var SortSearchResultPipe = /** @class */ (function () {
    function SortSearchResultPipe() {
    }
    SortSearchResultPipe.prototype.transform = function (searchResults, sortParameters) {
        if (util_1.isUndefined(searchResults) || util_1.isUndefined(sortParameters)) {
            return searchResults;
        }
        return searchResults.sort(function (a, b) {
            return sortParameters.comparator.compare(a, b)
                * (sortParameters.sortOrder === domain_1.SortOrder.DESCENDING ? 1 : -1);
        });
    };
    SortSearchResultPipe = __decorate([
        core_1.Pipe({
            name: 'ccdSortSearchResult'
        })
    ], SortSearchResultPipe);
    return SortSearchResultPipe;
}());
exports.SortSearchResultPipe = SortSearchResultPipe;
//# sourceMappingURL=sort-search-result.pipe.js.map