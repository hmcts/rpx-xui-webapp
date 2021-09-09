"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var abstract_field_read_component_1 = require("../base-field/abstract-field-read.component");
var router_1 = require("@angular/router");
var window_1 = require("../../../services/window");
var document_management_1 = require("../../../services/document-management");
var cases_service_1 = require("../../case-editor/services/cases.service");
var MEDIA_VIEWER_INFO = 'media-viewer-info';
var ReadDocumentFieldComponent = /** @class */ (function (_super) {
    __extends(ReadDocumentFieldComponent, _super);
    function ReadDocumentFieldComponent(windowService, documentManagement, router, route, casesService) {
        var _this = _super.call(this) || this;
        _this.windowService = windowService;
        _this.documentManagement = documentManagement;
        _this.router = router;
        _this.route = route;
        _this.casesService = casesService;
        return _this;
    }
    ReadDocumentFieldComponent.prototype.showMediaViewer = function () {
        var _this = this;
        var caseId = this.route.snapshot.params['cid'];
        this.windowService.removeLocalStorage(MEDIA_VIEWER_INFO);
        if (caseId) {
            this.caseViewSubscription = this.casesService.getCaseViewV2(caseId).subscribe(function (caseView) {
                if (_this.caseField && _this.caseField.value) {
                    var mergedInfo = __assign({}, _this.caseField.value, { id: caseView.case_id, jurisdiction: caseView.case_type.jurisdiction.id });
                    _this.openMediaViewer(mergedInfo);
                }
            });
        }
        else {
            if (this.caseField && this.caseField.value) {
                this.openMediaViewer(this.caseField.value);
            }
        }
    };
    ReadDocumentFieldComponent.prototype.openMediaViewer = function (documentFieldValue) {
        this.windowService.setLocalStorage(MEDIA_VIEWER_INFO, this.documentManagement.getMediaViewerInfo(documentFieldValue));
        this.windowService.openOnNewTab(this.getMediaViewerUrl());
    };
    ReadDocumentFieldComponent.prototype.getMediaViewerUrl = function () {
        var routerMediaViewer = this.router.createUrlTree(['/media-viewer']);
        if (routerMediaViewer) {
            return routerMediaViewer.toString();
        }
    };
    ReadDocumentFieldComponent.prototype.ngOnDestroy = function () {
        if (this.caseViewSubscription) {
            this.caseViewSubscription.unsubscribe();
        }
    };
    ReadDocumentFieldComponent = __decorate([
        core_1.Component({
            selector: 'ccd-read-document-field',
            template: "\n    <a *ngIf=\"caseField.value\" href=\"javascript:void(0)\"\n       (click)=\"showMediaViewer()\">\n      {{ caseField.value.document_filename }}\n    </a>\n  "
        }),
        __metadata("design:paramtypes", [window_1.WindowService,
            document_management_1.DocumentManagementService,
            router_1.Router,
            router_1.ActivatedRoute,
            cases_service_1.CasesService])
    ], ReadDocumentFieldComponent);
    return ReadDocumentFieldComponent;
}(abstract_field_read_component_1.AbstractFieldReadComponent));
exports.ReadDocumentFieldComponent = ReadDocumentFieldComponent;
//# sourceMappingURL=read-document-field.component.js.map