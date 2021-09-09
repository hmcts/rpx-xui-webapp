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
var rxjs_1 = require("rxjs");
var app_config_1 = require("../../../app.config");
var http_1 = require("../http");
var domain_1 = require("../../domain");
var http_2 = require("@angular/common/http");
var DraftService = /** @class */ (function () {
    function DraftService(http, appConfig, errorService) {
        this.http = http;
        this.appConfig = appConfig;
        this.errorService = errorService;
    }
    DraftService_1 = DraftService;
    DraftService.prototype.createDraft = function (ctid, eventData) {
        var _this = this;
        var saveDraftEndpoint = this.appConfig.getCreateOrUpdateDraftsUrl(ctid);
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', DraftService_1.V2_MEDIATYPE_DRAFT_CREATE)
            .set('Content-Type', 'application/json');
        return this.http
            .post(saveDraftEndpoint, eventData, { headers: headers, observe: 'body' })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        });
    };
    DraftService.prototype.updateDraft = function (ctid, draftId, eventData) {
        var _this = this;
        var saveDraftEndpoint = this.appConfig.getCreateOrUpdateDraftsUrl(ctid) + draftId;
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', DraftService_1.V2_MEDIATYPE_DRAFT_UPDATE)
            .set('Content-Type', 'application/json');
        return this.http
            .put(saveDraftEndpoint, eventData, { headers: headers, observe: 'body' })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        });
    };
    DraftService.prototype.getDraft = function (draftId) {
        var _this = this;
        var url = this.appConfig.getViewOrDeleteDraftsUrl(draftId.slice(domain_1.DRAFT_PREFIX.length));
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', DraftService_1.V2_MEDIATYPE_DRAFT_READ)
            .set('Content-Type', 'application/json');
        return this.http
            .get(url, { headers: headers, observe: 'body' })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        });
    };
    DraftService.prototype.deleteDraft = function (draftId) {
        var _this = this;
        var url = this.appConfig.getViewOrDeleteDraftsUrl(draftId.slice(domain_1.DRAFT_PREFIX.length));
        var headers = new http_2.HttpHeaders()
            .set('experimental', 'true')
            .set('Accept', DraftService_1.V2_MEDIATYPE_DRAFT_DELETE)
            .set('Content-Type', 'application/json');
        return this.http
            .delete(url, { headers: headers, observe: 'body' })
            .catch(function (error) {
            _this.errorService.setError(error);
            return rxjs_1.throwError(error);
        });
    };
    DraftService.prototype.createOrUpdateDraft = function (caseTypeId, draftId, caseEventData) {
        if (!draftId) {
            return this.createDraft(caseTypeId, caseEventData);
        }
        else {
            return this.updateDraft(caseTypeId, domain_1.Draft.stripDraftId(draftId), caseEventData);
        }
    };
    var DraftService_1;
    DraftService.V2_MEDIATYPE_DRAFT_CREATE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-create.v2+json;charset=UTF-8';
    DraftService.V2_MEDIATYPE_DRAFT_UPDATE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-update.v2+json;charset=UTF-8';
    DraftService.V2_MEDIATYPE_DRAFT_READ = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-read.v2+json;charset=UTF-8';
    DraftService.V2_MEDIATYPE_DRAFT_DELETE = 'application/vnd.uk.gov.hmcts.ccd-data-store-api.ui-draft-delete.v2+json;charset=UTF-8';
    DraftService = DraftService_1 = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpService,
            app_config_1.AbstractAppConfig,
            http_1.HttpErrorService])
    ], DraftService);
    return DraftService;
}());
exports.DraftService = DraftService;
//# sourceMappingURL=draft.service.js.map