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
var domain_1 = require("../../../../domain");
var EventLogDetailsComponent = /** @class */ (function () {
    function EventLogDetailsComponent() {
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", domain_1.CaseViewEvent)
    ], EventLogDetailsComponent.prototype, "event", void 0);
    EventLogDetailsComponent = __decorate([
        core_1.Component({
            selector: 'ccd-event-log-details',
            template: "\n    <table tabindex=\"0\" class=\"EventLogDetails\">\n      <caption><h2 class=\"heading-h2\">Details</h2></caption>\n      <tbody tabindex=\"0\" aria-live=\"polite\">\n        <tr>\n          <th><span class=\"text-16\">Date</span></th>\n          <td>\n            <div class=\"tooltip text-16\">{{event.timestamp | ccdDate : 'local'}}\n              <span class=\"tooltiptext text-16\">Local: {{event.timestamp | ccdDate : 'local'}}</span>\n            </div>\n          </td>\n        </tr>\n        <tr>\n          <th><span class=\"text-16\">Author</span></th>\n          <td><span class=\"text-16\">{{event.user_first_name | titlecase}} {{event.user_last_name | uppercase}}</span></td>\n        </tr>\n        <tr>\n          <th><span class=\"text-16\">End state</span></th>\n          <td><span class=\"text-16\">{{event.state_name}}</span></td>\n        </tr>\n        <tr>\n          <th><span class=\"text-16\">Event</span></th>\n          <td><span class=\"text-16\">{{event.event_name}}</span></td>\n        </tr>\n        <tr>\n          <th><span class=\"text-16\">Summary</span></th>\n          <td><span class=\"text-16\">{{event.summary | ccdDash}}</span></td>\n        </tr>\n        <tr>\n          <th><span class=\"text-16\">Comment</span></th>\n          <td><span class=\"text-16\">{{event.comment | ccdDash}}</span></td>\n        </tr>\n      </tbody>\n    </table>\n  ",
            styles: ["\n    .EventLogDetails th,.EventLogDetails td{border-bottom:none}\n  "]
        })
    ], EventLogDetailsComponent);
    return EventLogDetailsComponent;
}());
exports.EventLogDetailsComponent = EventLogDetailsComponent;
//# sourceMappingURL=event-log-details.component.js.map