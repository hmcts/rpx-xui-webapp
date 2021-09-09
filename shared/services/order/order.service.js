"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// @dynamic
var OrderService = /** @class */ (function () {
    function OrderService() {
        /**
         * @deprecated Use `sort` function instead or `compareAsc`
         * @type {(a:Orderable, b:Orderable)=>number}
         */
        this.sortAsc = OrderService_1.DEFAULT_COMPARE_FUNCTION;
    }
    OrderService_1 = OrderService;
    /**
     * Clone and sort array. Ascending order used by default.
     *
     * @param array Array to sort
     * @returns {Orderable[]} Sorted clone array.
     */
    OrderService.prototype.sort = function (array, sortingFunction) {
        if (sortingFunction === void 0) { sortingFunction = this.sortAsc; }
        return array
            .slice()
            .sort(sortingFunction);
    };
    var OrderService_1;
    OrderService.DEFAULT_COMPARE_FUNCTION = function (a, b) {
        var aOrdered = a.order === 0 || a.order;
        var bOrdered = b.order === 0 || b.order;
        if (!aOrdered) {
            return !bOrdered ? 0 : 1;
        }
        if (!bOrdered) {
            return -1;
        }
        return a.order - b.order;
    };
    OrderService = OrderService_1 = __decorate([
        core_1.Injectable()
    ], OrderService);
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map