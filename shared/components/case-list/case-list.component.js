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
var common_1 = require("@angular/common");
var core_1 = require("@angular/core");
var services_1 = require("../../services");
var DateTimeFormatUtils = /** @class */ (function () {
    function DateTimeFormatUtils() {
    }
    DateTimeFormatUtils.formatDateAtTime = function (date, is24Hour) {
        return common_1.formatDate(date, 'dd MMM yyyy', 'en-GB') + " at " + DateTimeFormatUtils.formatTime(date, is24Hour);
    };
    DateTimeFormatUtils.formatTime = function (date, is24Hour) {
        return is24Hour ? common_1.formatDate(date, 'HH:mm', 'en-GB') : common_1.formatDate(date, 'h:mm a', 'en-GB').toLowerCase();
    };
    return DateTimeFormatUtils;
}());
exports.DateTimeFormatUtils = DateTimeFormatUtils;
var CaseListComponent = /** @class */ (function () {
    function CaseListComponent(browserService) {
        this.browserService = browserService;
        this.classes = '';
        this.firstCellIsHeader = false;
        this.tableConfig = {
            idField: 'id',
            columnConfigs: [
                { header: 'Date', key: 'date', type: 'text' },
                { header: 'Amount', key: 'amount' }
            ]
        };
        this.selectionEnabled = false;
        this.selection = new core_1.EventEmitter();
        this.selectedCases = [];
    }
    CaseListComponent.prototype.formatDate = function (date) {
        return date ? common_1.formatDate(date, 'dd MMM yyyy', 'en-GB') : '-';
    };
    CaseListComponent.prototype.formatDateAtTime = function (date) {
        return date ? DateTimeFormatUtils.formatDateAtTime(date, false) : '-';
    };
    CaseListComponent.prototype.canBeShared = function (c) {
        return true;
    };
    CaseListComponent.prototype.canAnyBeShared = function () {
        var _this = this;
        return this.cases.some(function (c) { return _this.canBeShared(c); });
    };
    CaseListComponent.prototype.selectAll = function () {
        var _this = this;
        if (this.allOnPageSelected()) {
            // All cases already selected, so unselect all on this page
            this.selectedCases = [];
        }
        else {
            this.cases.forEach(function (aCase) {
                if (!_this.isSelected(aCase) && _this.canBeShared(aCase)) {
                    _this.selectedCases = _this.selectedCases.concat([aCase]);
                }
            });
        }
        this.selection.emit(this.selectedCases);
    };
    CaseListComponent.prototype.changeSelection = function (aCase) {
        var _this = this;
        if (this.isSelected(aCase)) {
            this.selectedCases.forEach(function (aSelectedCase, i) {
                if (aCase.case_id === aSelectedCase.case_id) {
                    _this.selectedCases = _this.selectedCases.slice(0, i).concat(_this.selectedCases.slice(i + 1));
                }
            });
        }
        else {
            if (this.canBeShared(aCase)) {
                this.selectedCases = this.selectedCases.concat([aCase]);
            }
        }
        this.selection.emit(this.selectedCases);
    };
    CaseListComponent.prototype.isSelected = function (aCase) {
        if (this.selectedCases) {
            for (var index = 0, length_1 = this.selectedCases.length; index < length_1; index++) {
                if (aCase.case_id === this.selectedCases[index].case_id) {
                    return true;
                }
            }
        }
        return false;
    };
    CaseListComponent.prototype.allOnPageSelected = function () {
        var _this = this;
        return !this.cases.some(function (aCase) { return !_this.isSelected(aCase); });
    };
    CaseListComponent.prototype.onKeyUp = function ($event, aCase) {
        if ($event.key === 'Space') {
            if (this.browserService.isFirefox || this.browserService.isSafari || this.browserService.isIEOrEdge) {
                this.changeSelection(aCase);
            }
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseListComponent.prototype, "classes", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseListComponent.prototype, "caption", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseListComponent.prototype, "firstCellIsHeader", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CaseListComponent.prototype, "cases", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", TableConfig)
    ], CaseListComponent.prototype, "tableConfig", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Object)
    ], CaseListComponent.prototype, "selectionEnabled", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], CaseListComponent.prototype, "selection", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CaseListComponent.prototype, "selectedCases", void 0);
    CaseListComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-list',
            template: "\n    <table class=\"{{'govuk-table ' + classes}}\">\n      <caption class=\"govuk-table__caption\">{{caption}}</caption>\n      <thead class=\"govuk-table__head\">\n        <tr class=\"govuk-table__row\">\n          <th class=\"govuk-table__header\" scope=\"col\" *ngIf=\"selectionEnabled\">\n            <div class=\"govuk-checkboxes__item\">\n              <input class=\"govuk-checkboxes__input\" id=\"select-all\" name=\"select-all\" type=\"checkbox\" (change)=\"selectAll()\"\n                     [checked]=\"allOnPageSelected()\" [disabled]=\"!canAnyBeShared()\" />\n              <!-- This label element is used to hide the standard checkbox with a govuk-styled one -->\n              <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-all\">\n              </label>\n            </div>\n          </th>\n          <th class=\"govuk-table__header\" scope=\"col\" *ngFor=\"let h of tableConfig.columnConfigs\">{{h.header}}</th>\n        </tr>\n      </thead>\n      <tbody class=\"govuk-table__body\">\n        <tr data-selector=\"table-row\" class=\"govuk-table__row\" *ngFor=\"let c of cases\">\n          <th data-selector=\"table-header\" class=\"govuk-table__header\" scope=\"row\" *ngIf=\"selectionEnabled\">\n            <div class=\"govuk-checkboxes__item\">\n              <input class=\"govuk-checkboxes__input\" id=\"select-{{ c[tableConfig.idField] }}\" name=\"select-{{ c[tableConfig.idField] }}\"\n                     type=\"checkbox\" (change)=\"changeSelection(c)\" [checked]=\"isSelected(c)\" [disabled]=\"!canBeShared(c)\" (keyup)=\"onKeyUp($event, c)\" />\n              <!-- This label element is used to hide the standard checkbox with a govuk-styled one -->\n              <label class=\"govuk-label govuk-checkboxes__label\" for=\"select-{{ c[tableConfig.idField] }}\">\n              </label>\n            </div>\n          </th>\n          <ng-container *ngFor=\"let col of tableConfig.columnConfigs; first as isFirst\">\n            <th data-selector=\"table-header\" class=\"govuk-table__header\" scope=\"row\" *ngIf=\"isFirst && firstCellIsHeader\">\n              <ng-container *ngIf=\"!col.type || col.type === 'text'\">{{c[col.key]}}</ng-container>\n              <ng-container *ngIf=\"col.type === 'link' && c.routerLink\">\n                <a class=\"govuk-link\" [routerLink]=\"c.routerLink\">{{c[col.key]}}</a>\n              </ng-container>\n            </th>\n            <td data-selector=\"table-cell\" class=\"govuk-table__cell\" *ngIf=\"!(isFirst && firstCellIsHeader)\" [ngSwitch]=\"col?.type\">\n              <ng-container *ngIf=\"col.type === 'link' && c.routerLink\">\n                <a class=\"govuk-link\" [routerLink]=\"c.routerLink\">{{c[col.key]}}</a>\n              </ng-container>\n              <ng-container *ngSwitchCase=\"'money'\">-{{ c[col.key] | currency:'GBP' }}</ng-container>\n              <ng-container *ngSwitchCase=\"'date'\">{{formatDate(c[col.key])}}</ng-container>\n              <ng-container *ngSwitchCase=\"'dateAtTime'\">{{formatDateAtTime(c[col.key])}}</ng-container>\n              <ng-container *ngSwitchDefault>{{c[col.key]}}</ng-container>\n            </td>\n          </ng-container>\n        </tr>\n      </tbody>\n    </table>\n  ",
            styles: ["\n\n  "]
        }),
        __metadata("design:paramtypes", [services_1.BrowserService])
    ], CaseListComponent);
    return CaseListComponent;
}());
exports.CaseListComponent = CaseListComponent;
var TableColumnConfig = /** @class */ (function () {
    function TableColumnConfig() {
        this.header = '';
        this.key = '';
        this.type = 'text';
    }
    return TableColumnConfig;
}());
exports.TableColumnConfig = TableColumnConfig;
var TableConfig = /** @class */ (function () {
    function TableConfig() {
        this.idField = '';
        this.columnConfigs = [];
    }
    return TableConfig;
}());
exports.TableConfig = TableConfig;
//# sourceMappingURL=case-list.component.js.map