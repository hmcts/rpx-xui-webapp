"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestRouteSnapshotBuilder = /** @class */ (function () {
    function TestRouteSnapshotBuilder() {
        this.parent = null;
        this.params = {};
        this.data = {};
    }
    TestRouteSnapshotBuilder.prototype.withParent = function (parent) {
        this.parent = parent;
        return this;
    };
    TestRouteSnapshotBuilder.prototype.withParams = function (params) {
        this.params = params;
        return this;
    };
    TestRouteSnapshotBuilder.prototype.withData = function (data) {
        this.data = data;
        return this;
    };
    TestRouteSnapshotBuilder.prototype.build = function () {
        return {
            url: [],
            params: this.params,
            queryParams: [],
            fragment: '',
            data: this.data,
            outlet: null,
            component: null,
            routeConfig: null,
            root: null,
            parent: this.parent,
            firstChild: null,
            children: [],
            pathFromRoot: null,
            paramMap: null,
            queryParamMap: null,
        };
    };
    return TestRouteSnapshotBuilder;
}());
exports.TestRouteSnapshotBuilder = TestRouteSnapshotBuilder;
//# sourceMappingURL=test-route-snapshot-builder.js.map