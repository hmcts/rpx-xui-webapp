"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_service_1 = require("../../../services/order/order.service");
var Wizard = /** @class */ (function () {
    function Wizard(wizardPages) {
        this.orderService = new order_service_1.OrderService();
        this.pages = this.orderService.sort(wizardPages);
    }
    Wizard.prototype.firstPage = function (canShow) {
        return this.pages.find(function (page) { return canShow(page); });
    };
    Wizard.prototype.getPage = function (pageId, canShow) {
        var foundPage = this.findPage(pageId);
        if (!foundPage) {
            throw new Error("No page for ID: " + pageId);
        }
        return canShow(foundPage) ? foundPage : undefined;
    };
    Wizard.prototype.findWizardPage = function (caseFieldId) {
        return this.pages.find(function (wizardPage) { return wizardPage.case_fields &&
            wizardPage.case_fields.filter(function (caseField) { return caseField.id === caseFieldId; }).length > 0; });
    };
    Wizard.prototype.nextPage = function (pageId, canShow) {
        var currentIndex = this.findExistingIndex(pageId);
        return this.pages
            .slice(currentIndex + 1)
            .find(function (page) { return canShow(page); });
    };
    Wizard.prototype.previousPage = function (pageId, canShow) {
        var currentIndex = this.findExistingIndex(pageId);
        return this.pages
            .slice(0, currentIndex)
            .reverse()
            .find(function (page) { return canShow(page); });
    };
    Wizard.prototype.hasPage = function (pageId) {
        return !!this.findPage(pageId);
    };
    Wizard.prototype.hasPreviousPage = function (pageId, canShow) {
        return !!this.previousPage(pageId, canShow);
    };
    Wizard.prototype.reverse = function () {
        return this.pages.slice().reverse();
    };
    Wizard.prototype.findPage = function (pageId) {
        return this.pages.find(function (page) { return pageId === page.id; });
    };
    Wizard.prototype.findExistingIndex = function (pageId) {
        var index = this.pages.findIndex(function (page) { return pageId === page.id; });
        if (-1 === index) {
            throw new Error("No page for ID: " + pageId);
        }
        return index;
    };
    return Wizard;
}());
exports.Wizard = Wizard;
//# sourceMappingURL=wizard.model.js.map