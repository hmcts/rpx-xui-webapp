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
var activity_polling_service_1 = require("../../services/activity/activity.polling.service");
var activity_model_1 = require("../../domain/activity/activity.model");
var activity_model_2 = require("../../domain/activity/activity.model");
var ActivityComponent = /** @class */ (function () {
    function ActivityComponent(activityPollingService) {
        this.activityPollingService = activityPollingService;
        this.VIEWERS_PREFIX = '';
        this.VIEWERS_SUFFIX = 'viewing this case';
        this.EDITORS_PREFIX = 'This case is being updated by ';
        this.EDITORS_SUFFIX = '';
        this.dspMode = activity_model_2.DisplayMode;
    }
    ActivityComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activity = new activity_model_1.Activity();
        this.activity.caseId = this.caseId;
        this.activity.editors = [];
        this.activity.unknownEditors = 0;
        this.activity.viewers = [];
        this.activity.unknownViewers = 0;
        this.viewersText = '';
        this.editorsText = '';
        this.subscription = this.activityPollingService.subscribeToActivity(this.caseId, function (newActivity) { return _this.onActivityChange(newActivity); });
    };
    ActivityComponent.prototype.onActivityChange = function (newActivity) {
        this.activity = newActivity;
        this.viewersText = this.generateDescription(this.VIEWERS_PREFIX, this.VIEWERS_SUFFIX, this.activity.viewers, this.activity.unknownViewers);
        this.editorsText = this.generateDescription(this.EDITORS_PREFIX, this.EDITORS_SUFFIX, this.activity.editors, this.activity.unknownEditors);
    };
    ActivityComponent.prototype.isActivityEnabled = function () {
        return this.activityPollingService.isEnabled;
    };
    ActivityComponent.prototype.isActiveCase = function () {
        return this.activity.editors.length || this.activity.viewers.length || this.activity.unknownEditors || this.activity.unknownViewers;
    };
    ActivityComponent.prototype.viewersPresent = function () {
        return (this.activity.viewers.length > 0 || this.activity.unknownViewers > 0);
    };
    ActivityComponent.prototype.editorsPresent = function () {
        return (this.activity.editors.length > 0 || this.activity.unknownEditors > 0);
    };
    ActivityComponent.prototype.ngOnDestroy = function () {
        this.subscription.complete();
        this.subscription.unsubscribe();
        this.activityPollingService.stopPolling();
    };
    ActivityComponent.prototype.generateDescription = function (prefix, suffix, namesArray, unknownCount) {
        var resultText = prefix;
        resultText += namesArray.map(function (activityInfo) { return activityInfo.forename + ' ' + activityInfo.surname; }).join(', ');
        if (unknownCount > 0) {
            resultText += (namesArray.length > 0 ? ' and ' + unknownCount + ' other' : unknownCount + ' user');
            resultText += (unknownCount > 1 ? 's' : '');
        }
        else {
            resultText = this.replaceLastCommaWithAnd(resultText);
        }
        if (suffix.length > 0) {
            if (namesArray.length + unknownCount > 1) {
                resultText += ' are ' + suffix;
            }
            else {
                resultText += ' is ' + suffix;
            }
        }
        return resultText;
    };
    ActivityComponent.prototype.replaceLastCommaWithAnd = function (str) {
        return str.replace(/(.*)\,(.*?)$/, '$1 and$2');
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ActivityComponent.prototype, "caseId", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ActivityComponent.prototype, "displayMode", void 0);
    ActivityComponent = __decorate([
        core_1.Component({
            selector: 'ccd-activity',
            template: "\n    <div class=\"activityComponent\" *ngIf=\"isActivityEnabled()\">\n      <div *ngIf=\"displayMode === dspMode.ICON && editorsPresent()\" [class.activityEditorsAndViewersIcons]=\"viewersPresent()\" [class.activityEditorsIcon]=\"!viewersPresent()\">\n        <ccd-activity-icon imageLink=\"/img/editor.png\" [description]=\"editorsText\"></ccd-activity-icon>\n      </div>\n      <div *ngIf=\"displayMode === dspMode.ICON && viewersPresent()\" class=\"activityViewersIcon\">\n        <ccd-activity-icon imageLink=\"/img/viewer.png\" [description]=\"viewersText\"></ccd-activity-icon>\n      </div>\n      <div *ngIf=\"displayMode === dspMode.BANNER && editorsPresent()\">\n        <ccd-activity-banner imageLink=\"/img/editorBanner.png\" [description]=\"editorsText\" bannerType=\"editor\">\n        </ccd-activity-banner>\n      </div>\n      <div *ngIf=\"displayMode === dspMode.BANNER && viewersPresent()\">\n        <ccd-activity-banner imageLink=\"/img/viewerBanner.png\" [description]=\"viewersText\" bannerType=\"viewer\">\n        </ccd-activity-banner>\n      </div>\n    </div>\n  ",
            styles: ["\n    .activityEditorsIcon{margin-left:14px}.activityEditorsAndViewersIcons{float:left;margin-left:14px}.activityViewersIcon{float:left;margin-left:14px}\n  "]
        }),
        __metadata("design:paramtypes", [activity_polling_service_1.ActivityPollingService])
    ], ActivityComponent);
    return ActivityComponent;
}());
exports.ActivityComponent = ActivityComponent;
//# sourceMappingURL=activity.component.js.map