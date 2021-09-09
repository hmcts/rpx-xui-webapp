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
var forms_1 = require("@angular/forms");
var rxjs_1 = require("rxjs");
var form_value_service_1 = require("../../../services/form/form-value.service");
var operators_1 = require("rxjs/operators");
var CaseEditFormComponent = /** @class */ (function () {
    function CaseEditFormComponent(formValueService) {
        this.formValueService = formValueService;
        this.fields = [];
        this.caseFields = [];
        this.pageChangeSubject = new rxjs_1.Subject();
        this.valuesChanged = new core_1.EventEmitter();
    }
    CaseEditFormComponent.prototype.ngOnDestroy = function () {
        this.pageChangeSubscription.unsubscribe();
        this.formGroupChangeSubscription.unsubscribe();
    };
    // We need the below un/subscribe complexity as we do not have proper page component per page with its AfterViewInit hook
    // being called on each page load. This is done for "Cancel and return" modal from RDM-2302.
    CaseEditFormComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.retrieveInitialFormValues();
        this.pageChangeSubscription = this.pageChangeSubject.subscribe(function () {
            _this.formGroupChangeSubscription.unsubscribe();
            // Timeout is required for the form to be rendered before subscription to form changes and initial form values retrieval.
            setTimeout(function () {
                _this.subscribeToFormChanges();
                _this.retrieveInitialFormValues();
            });
        });
        this.subscribeToFormChanges();
    };
    CaseEditFormComponent.prototype.subscribeToFormChanges = function () {
        var _this = this;
        this.formGroupChangeSubscription = this.formGroup.valueChanges
            .pipe(operators_1.debounceTime(200))
            .subscribe(function (_) { return _this.detectChangesAndEmit(_); });
    };
    CaseEditFormComponent.prototype.retrieveInitialFormValues = function () {
        this.initial = JSON.stringify(this.formValueService.sanitise(this.formGroup.value));
    };
    CaseEditFormComponent.prototype.detectChangesAndEmit = function (changes) {
        var current = JSON.stringify(this.formValueService.sanitise(changes));
        this.initial !== current ? this.valuesChanged.emit(true) : this.valuesChanged.emit(false);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CaseEditFormComponent.prototype, "fields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", forms_1.FormGroup)
    ], CaseEditFormComponent.prototype, "formGroup", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CaseEditFormComponent.prototype, "caseFields", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", rxjs_1.Subject)
    ], CaseEditFormComponent.prototype, "pageChangeSubject", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], CaseEditFormComponent.prototype, "valuesChanged", void 0);
    CaseEditFormComponent = __decorate([
        core_1.Component({
            selector: 'ccd-case-edit-form',
            template: "\n    <ng-container ccdConditionalShowForm [formGroup]=\"formGroup\" [caseFields]=\"fields\" [contextFields]=\"caseFields\"\n                  *ngFor=\"let field of fields\">\n      <div ccdLabelSubstitutor\n           [caseField]=\"field\" [formGroup]=\"formGroup\" [contextFields]=\"caseFields\">\n        <ng-container [ngSwitch]=\"field | ccdIsReadOnlyAndNotCollection \">\n          <ccd-field-read *ngSwitchCase=\"true\" [caseField]=\"field\" [caseFields]=\"caseFields\" [withLabel]=\"true\"\n                          [formGroup]=\"formGroup\"></ccd-field-read>\n          <ng-container *ngSwitchCase=\"false\">\n            <ng-container *ngIf=\"!(field | ccdIsCompound); else CompoundRow\">\n              <ccd-field-write [caseField]=\"field\"\n                               [caseFields]=\"caseFields\"\n                               [formGroup]=\"formGroup\"\n                               [idPrefix]=\"\"\n                               [hidden]=\"field.hidden\">\n              </ccd-field-write>\n            </ng-container>\n            <ng-template #CompoundRow>\n              <ccd-field-write [caseField]=\"field\"\n                               [caseFields]=\"caseFields\"\n                               [formGroup]=\"formGroup\"\n                               [idPrefix]=\"field.id + '_'\"\n                               [hidden]=\"field.hidden\"></ccd-field-write>\n            </ng-template>\n          </ng-container>\n        </ng-container>\n      </div>\n    </ng-container>\n  "
        }),
        __metadata("design:paramtypes", [form_value_service_1.FormValueService])
    ], CaseEditFormComponent);
    return CaseEditFormComponent;
}());
exports.CaseEditFormComponent = CaseEditFormComponent;
//# sourceMappingURL=case-edit-form.component.js.map