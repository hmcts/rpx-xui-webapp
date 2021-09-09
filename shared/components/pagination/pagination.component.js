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
function coerceToBoolean(input) {
    return !!input && input !== 'false';
}
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent() {
        this.maxSize = 7;
        this.previousLabel = 'Previous';
        this.nextLabel = 'Next';
        this.screenReaderPaginationLabel = 'Pagination';
        this.screenReaderPageLabel = 'page';
        this.screenReaderCurrentLabel = "You're on page";
        this.pageChange = new core_1.EventEmitter();
        this.pageBoundsCorrection = new core_1.EventEmitter();
        this._directionLinks = true;
        this._autoHide = false;
        this._responsive = false;
    }
    Object.defineProperty(PaginationComponent.prototype, "directionLinks", {
        get: function () {
            return this._directionLinks;
        },
        set: function (value) {
            this._directionLinks = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "autoHide", {
        get: function () {
            return this._autoHide;
        },
        set: function (value) {
            this._autoHide = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "responsive", {
        get: function () {
            return this._responsive;
        },
        set: function (value) {
            this._responsive = coerceToBoolean(value);
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "visibilityLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], PaginationComponent.prototype, "id", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "maxSize", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "directionLinks", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "autoHide", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], PaginationComponent.prototype, "responsive", null);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "previousLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "nextLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "screenReaderPaginationLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "screenReaderPageLabel", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], PaginationComponent.prototype, "screenReaderCurrentLabel", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageChange", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], PaginationComponent.prototype, "pageBoundsCorrection", void 0);
    PaginationComponent = __decorate([
        core_1.Component({
            selector: 'ccd-pagination',
            template: "\n    <pagination-template #p=\"paginationApi\" [id]=\"id\" [maxSize]=\"maxSize\" (pageChange)=\"pageChange.emit($event)\"\n      (pageBoundsCorrection)=\"pageBoundsCorrection.emit($event)\">\n      <nav role=\"navigation\" aria-label=\"Pagination\">\n        <ul class=\"ngx-pagination\" role=\"navigation\" [attr.aria-label]=\"screenReaderPaginationLabel\"\n          [class.responsive]=\"responsive\" *ngIf=\"!(autoHide && p.pages.length <= 1)\">\n          <li class=\"pagination-previous\" [class.disabled]=\"p.isFirstPage()\" *ngIf=\"directionLinks\">\n            <a tabindex=\"0\" *ngIf=\"1 < p.getCurrent()\" (keyup.enter)=\"p.previous()\" (click)=\"p.previous()\"\n              [attr.aria-label]=\"previousLabel + ' ' + screenReaderPageLabel\">\n              {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isFirstPage()\">\n              {{ previousLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n          </li>\n          <li class=\"small-screen\">\n            {{ p.getCurrent() }} / {{ p.getLastPage() }}\n          </li>\n          <li [class.current]=\"p.getCurrent() === page.value\" [class.ellipsis]=\"page.label === '...'\"\n            *ngFor=\"let page of p.pages\">\n            <a tabindex=\"0\" (keyup.enter)=\"p.setCurrent(page.value)\" (click)=\"p.setCurrent(page.value)\"\n              *ngIf=\"p.getCurrent() !== page.value\">\n              <span class=\"show-for-sr\">{{ screenReaderPageLabel }} </span>\n              <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n            </a>\n            <ng-container *ngIf=\"p.getCurrent() === page.value\">\n              <span class=\"show-for-sr\">{{ screenReaderCurrentLabel }} </span>\n              <span>{{ (page.label === '...') ? page.label : (page.label | number:'') }}</span>\n            </ng-container>\n          </li>\n          <li class=\"pagination-next\" [class.disabled]=\"p.isLastPage()\" *ngIf=\"directionLinks\">\n            <a tabindex=\"0\" *ngIf=\"!p.isLastPage()\" (keyup.enter)=\"p.next()\" (click)=\"p.next()\"\n              [attr.aria-label]=\"nextLabel + ' ' + screenReaderPageLabel\">\n              {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </a>\n            <span *ngIf=\"p.isLastPage()\">\n              {{ nextLabel }} <span class=\"show-for-sr\">{{ screenReaderPageLabel }}</span>\n            </span>\n          </li>\n        </ul>\n      </nav>\n    </pagination-template>\n  ",
            styles: ["\n    .ngx-pagination{margin-left:0;margin-bottom:1rem;padding-top:25px;text-decoration:none;text-align:left;font-size:16px}.ngx-pagination::before,.ngx-pagination::after{content:\" \";display:table}.ngx-pagination::after{clear:both}.ngx-pagination li{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;margin-right:0.0625rem;border-radius:0}.ngx-pagination li{display:inline-block}.ngx-pagination a,.ngx-pagination button{color:#0a0a0a;display:block;padding:0.1875rem 0.625rem;border-radius:0;color:#005da6}.ngx-pagination a:hover,.ngx-pagination button:hover{background:#e6e6e6}.ngx-pagination .current{padding:0.1875rem 0.625rem;background:#fff;color:#4c2c92;cursor:default;font-weight:900}.ngx-pagination .disabled{display:none}.ngx-pagination .disabled:hover{background:transparent}.ngx-pagination a,.ngx-pagination button{cursor:pointer}.ngx-pagination .pagination-previous a::before,.ngx-pagination .pagination-previous.disabled::before{margin-right:0.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);content:\"\";border-width:3px 0 0 3px}.ngx-pagination .pagination-next a::after,.ngx-pagination .pagination-next.disabled::after{margin-left:0.5rem;display:inline-block;height:10px;width:10px;border-style:solid;color:#0a0a0a;background:transparent;-webkit-transform:rotate(-45deg);-ms-transform:rotate(-45deg);transform:rotate(-45deg);content:\"\";border-width:0 3px 3px 0}.ngx-pagination .show-for-sr{position:absolute !important;width:1px;height:1px;overflow:hidden;clip:rect(0, 0, 0, 0)}.ngx-pagination .small-screen{display:none}@media screen and (max-width: 601px){.ngx-pagination.responsive .small-screen{display:inline-block}.ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next){display:none}}\n  "]
        })
    ], PaginationComponent);
    return PaginationComponent;
}());
exports.PaginationComponent = PaginationComponent;
//# sourceMappingURL=pagination.component.js.map