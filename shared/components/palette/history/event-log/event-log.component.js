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
var EventLogComponent = /** @class */ (function () {
    function EventLogComponent() {
        this.onCaseHistory = new core_1.EventEmitter();
        this.isPartOfCaseTimeline = false;
    }
    EventLogComponent.prototype.ngOnInit = function () {
        this.selected = this.events[0];
        this.isPartOfCaseTimeline = this.onCaseHistory.observers.length > 0;
    };
    EventLogComponent.prototype.select = function (event) {
        this.selected = event;
    };
    EventLogComponent.prototype.caseHistoryClicked = function (eventId) {
        this.onCaseHistory.emit(eventId);
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], EventLogComponent.prototype, "events", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], EventLogComponent.prototype, "onCaseHistory", void 0);
    EventLogComponent = __decorate([
        core_1.Component({
            selector: 'ccd-event-log',
            template: "\n    <div class=\"grid-row\">\n      <div class=\"column-one-half\">\n        <ng-container [ngSwitch]=\"isPartOfCaseTimeline\">\n          <ccd-event-log-table *ngSwitchCase=\"true\" [events]=\"events\" [selected]=\"selected\" (onSelect)=\"select($event)\" (onCaseHistory)=\"caseHistoryClicked($event)\"></ccd-event-log-table>\n          <ccd-event-log-table *ngSwitchCase=\"false\" [events]=\"events\" [selected]=\"selected\" (onSelect)=\"select($event)\"></ccd-event-log-table>\n        </ng-container>\n      </div>\n      <div class=\"column-one-half\">\n        <div class=\"EventLog-DetailsPanel\">\n          <ccd-event-log-details *ngIf=\"selected\" [event]=\"selected\"></ccd-event-log-details>\n        </div>\n      </div>\n    </div>\n  ",
            styles: ["\n    @media (max-width: 991px){[class*=\"col-md\"]{margin-bottom:30px}}.EventLog-DetailsPanel{border:1px solid #bfc1c3;padding:0px 10px 10px 10px;margin-top:20px}\n  "]
        })
    ], EventLogComponent);
    return EventLogComponent;
}());
exports.EventLogComponent = EventLogComponent;
//# sourceMappingURL=event-log.component.js.map