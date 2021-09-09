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
var router_1 = require("@angular/router");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var domain_1 = require("../../domain");
var services_1 = require("../../services");
var case_history_service_1 = require("./services/case-history.service");
var case_editor_1 = require("../case-editor");
var directives_1 = require("../../directives");
var CaseHistoryComponent = /** @class */ (function () {
    function CaseHistoryComponent(route, alertService, orderService, caseNotifier, caseHistoryService) {
        this.route = route;
        this.alertService = alertService;
        this.orderService = orderService;
        this.caseNotifier = caseNotifier;
        this.caseHistoryService = caseHistoryService;
    }
    CaseHistoryComponent_1 = CaseHistoryComponent;
    CaseHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.caseSubscription = this.caseNotifier.caseView.subscribe(function (caseDetails) {
            _this.caseDetails = caseDetails;
            var eventId = _this.route.snapshot.paramMap.get(CaseHistoryComponent_1.PARAM_EVENT_ID) || _this.event;
            _this.caseHistoryService
                .get(_this.caseDetails.case_id, eventId)
                .pipe(operators_1.map(function (caseHistory) {
                if (!caseHistory) {
                    var error = new domain_1.HttpError();
                    error.message = CaseHistoryComponent_1.ERROR_MESSAGE;
                    throw error;
                }
                _this.caseHistory = caseHistory;
                _this.tabs = _this.orderService.sort(_this.caseHistory.tabs);
                _this.tabs = _this.sortTabFieldsAndFilterTabs(_this.tabs);
            }), operators_1.catchError(function (error) {
                console.error(error);
                if (error.status !== 401 && error.status !== 403) {
                    _this.alertService.error(error.message);
                }
                return rxjs_1.throwError(error);
            })).toPromise();
        });
    };
    CaseHistoryComponent.prototype.ngOnDestroy = function () {
        this.caseSubscription.unsubscribe();
    };
    CaseHistoryComponent.prototype.isDataLoaded = function () {
        return !!(this.caseDetails && this.caseHistory);
    };
    CaseHistoryComponent.prototype.sortTabFieldsAndFilterTabs = function (tabs) {
        var _this = this;
        return tabs
            .map(function (tab) { return Object.assign({}, tab, { fields: _this.orderService.sort(tab.fields) }); })
            .filter(function (tab) { return directives_1.ShowCondition.getInstance(tab.show_condition).matchByContextFields(tab.fields); });
    };
    var CaseHistoryComponent_1;
    CaseHistoryComponent.ERROR_MESSAGE = 'No case history to show';
    CaseHistoryComponent.PARAM_EVENT_ID = 'eid';
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], CaseHistoryComponent.prototype, "event", void 0);
    CaseHistoryComponent = CaseHistoryComponent_1 = __decorate([
        core_1.Component({
            selector: 'ccd-case-history',
            template: "\n    <div *ngIf=\"isDataLoaded()\">\n      <div class=\"grid-row\">\n        <div class=\"column-full\">\n          <ccd-case-header [caseDetails]=\"caseDetails\"></ccd-case-header>\n        </div>\n      </div>\n      <div class=\"grid-row\">\n        <div class=\"column-full\">\n          <div>\n            <h2 class=\"heading-h2\">Event Details</h2>\n            <table class=\"EventDetails\">\n              <tbody>\n              <tr>\n                <th>Date</th>\n                <td>{{caseHistory.event.timestamp | ccdDate}}</td>\n              </tr>\n              <tr>\n                <th>Author</th>\n                <td>{{caseHistory.event.user_first_name | titlecase}} {{caseHistory.event.user_last_name | uppercase}}</td>\n              </tr>\n              <tr>\n                <th>End state</th>\n                <td>{{caseHistory.event.state_name}}</td>\n              </tr>\n              <tr>\n                <th>Event</th>\n                <td>{{caseHistory.event.event_name}}</td>\n              </tr>\n              <tr>\n                <th>Summary</th>\n                <td>{{caseHistory.event.summary | ccdDash}}</td>\n              </tr>\n              <tr>\n                <th>Comment</th>\n                <td>{{caseHistory.event.comment | ccdDash}}</td>\n              </tr>\n              </tbody>\n            </table>\n          </div>\n          <div>\n            <h2 class=\"heading-h2\">Case Details</h2>\n            <ng-container *ngFor=\"let tab of tabs\">\n              <div class=\"caseHistorySection\">\n                <h3 class=\"heading-h3\">{{tab.label}}</h3>\n                <table class=\"CaseHistory\" id=\"{{tab.id}}\">\n                  <ng-container *ngFor=\"let field of tab | ccdTabFields | ccdReadFieldsFilter:false :undefined :true\">\n                    <div ccdLabelSubstitutor [caseField]=\"field\" [contextFields]=\"tab.fields\" [hidden]=\"field.hidden\">\n                      <ng-container [ngSwitch]=\"!(field | ccdIsCompound)\">\n                        <tr *ngSwitchCase=\"true\">\n                          <th>\n                            <div class=\"case-viewer-label\">{{field.label}}</div>\n                          </th>\n                          <td>\n                            <ccd-field-read [caseField]=\"field\" [caseReference]=\"caseHistory.case_id\"></ccd-field-read>\n                          </td>\n                        </tr>\n                        <tr *ngSwitchCase=\"false\" class=\"compound-field\">\n                          <td colspan=\"2\">\n                            <ccd-field-read [caseField]=\"field\" [caseReference]=\"caseHistory.case_id\"></ccd-field-read>\n                          </td>\n                        </tr>\n                      </ng-container>\n                    </div>\n                  </ng-container>\n                </table>\n              </div>\n            </ng-container>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    .CaseHistory th,.CaseHistory td{border-bottom:none}.caseHistorySection{margin-top:40px}.EventDetails th,.EventDetails td{border-bottom:none}th{width:1%;white-space:nowrap;vertical-align:top}.compound-field td{padding:0}.case-viewer-controls{margin-top:47px;margin-bottom:20px}ccd-case-header{float:left;margin-right:10px}ccd-event-trigger{float:right}.case-viewer-label{min-width:300px;white-space:normal}\n  "]
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            services_1.AlertService,
            services_1.OrderService,
            case_editor_1.CaseNotifier,
            case_history_service_1.CaseHistoryService])
    ], CaseHistoryComponent);
    return CaseHistoryComponent;
}());
exports.CaseHistoryComponent = CaseHistoryComponent;
//# sourceMappingURL=case-history.component.js.map