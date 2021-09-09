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
var domain_1 = require("../../../domain");
var case_editor_1 = require("../../case-editor");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var services_1 = require("../../../services");
var CasePrinterComponent = /** @class */ (function () {
    function CasePrinterComponent(caseNotifier, casesService, alertService) {
        this.caseNotifier = caseNotifier;
        this.casesService = casesService;
        this.alertService = alertService;
    }
    CasePrinterComponent_1 = CasePrinterComponent;
    CasePrinterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.caseSubscription = this.caseNotifier.caseView.subscribe(function (caseDetails) {
            _this.caseDetails = caseDetails;
            _this.casesService
                .getPrintDocuments(_this.caseDetails.case_id)
                .pipe(operators_1.map(function (documents) {
                if (!documents || !documents.length) {
                    var error = new domain_1.HttpError();
                    error.message = CasePrinterComponent_1.ERROR_MESSAGE;
                    throw error;
                }
                _this.documents = documents;
            }), operators_1.catchError(function (error) {
                _this.alertService.error(error.message);
                return rxjs_1.throwError(error);
            })).toPromise();
        });
    };
    CasePrinterComponent.prototype.ngOnDestroy = function () {
        this.caseSubscription.unsubscribe();
    };
    CasePrinterComponent.prototype.isDataLoaded = function () {
        return this.caseDetails && this.documents ? true : false;
    };
    var CasePrinterComponent_1;
    CasePrinterComponent.ERROR_MESSAGE = 'No documents to print';
    CasePrinterComponent = CasePrinterComponent_1 = __decorate([
        core_1.Component({
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n      <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n      <h2 class=\"heading-h2\">Print</h2>\n      <table>\n        <thead>\n          <tr>\n            <th>Name</th>\n            <th>Type</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr *ngFor=\"let document of documents\">\n            <td class=\"document-name\"><a [href]=\"document.url | ccdPrintUrl\" target=\"_blank\" rel=\"external\">{{document.name}}</a></td>\n            <td class=\"document-type\">{{document.type}}</td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n  "
        }),
        __metadata("design:paramtypes", [case_editor_1.CaseNotifier,
            case_editor_1.CasesService,
            services_1.AlertService])
    ], CasePrinterComponent);
    return CasePrinterComponent;
}());
exports.CasePrinterComponent = CasePrinterComponent;
//# sourceMappingURL=case-printer.component.js.map