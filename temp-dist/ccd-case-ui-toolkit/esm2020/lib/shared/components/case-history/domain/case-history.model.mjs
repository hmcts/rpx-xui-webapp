import { __decorate, __metadata } from "tslib";
// tslint:disable:variable-name
import { Type } from 'class-transformer';
import { CaseTab } from '../../../domain/case-view/case-tab.model';
import { CaseViewEvent } from '../../../domain/case-view/case-view-event.model';
import { Jurisdiction } from '../../../domain/definition/jurisdiction.model';
// @dynamic
export class CaseHistoryCaseType {
}
__decorate([
    Type(() => Jurisdiction),
    __metadata("design:type", Jurisdiction)
], CaseHistoryCaseType.prototype, "jurisdiction", void 0);
// @dynamic
export class CaseHistory {
}
__decorate([
    Type(() => CaseHistoryCaseType),
    __metadata("design:type", CaseHistoryCaseType)
], CaseHistory.prototype, "caseType", void 0);
__decorate([
    Type(() => CaseTab),
    __metadata("design:type", Array)
], CaseHistory.prototype, "tabs", void 0);
__decorate([
    Type(() => CaseViewEvent),
    __metadata("design:type", CaseViewEvent)
], CaseHistory.prototype, "event", void 0);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oaXN0b3J5Lm1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtaGlzdG9yeS9kb21haW4vY2FzZS1oaXN0b3J5Lm1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQkFBK0I7QUFDL0IsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSwwQ0FBMEMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saURBQWlELENBQUM7QUFDaEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtDQUErQyxDQUFDO0FBRTdFLFdBQVc7QUFDWCxNQUFNLE9BQU8sbUJBQW1CO0NBTy9CO0FBRkM7SUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDOzhCQUNKLFlBQVk7eURBQUM7QUFHcEMsV0FBVztBQUNYLE1BQU0sT0FBTyxXQUFXO0NBV3ZCO0FBUkM7SUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsbUJBQW1CLENBQUM7OEJBQ2YsbUJBQW1COzZDQUFDO0FBRXJDO0lBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQzs7eUNBQ0c7QUFFdkI7SUFBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDOzhCQUNaLGFBQWE7MENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTp2YXJpYWJsZS1uYW1lXG5pbXBvcnQgeyBUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0IHsgQ2FzZVRhYiB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS10YWIubW9kZWwnO1xuaW1wb3J0IHsgQ2FzZVZpZXdFdmVudCB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9jYXNlLXZpZXcvY2FzZS12aWV3LWV2ZW50Lm1vZGVsJztcbmltcG9ydCB7IEp1cmlzZGljdGlvbiB9IGZyb20gJy4uLy4uLy4uL2RvbWFpbi9kZWZpbml0aW9uL2p1cmlzZGljdGlvbi5tb2RlbCc7XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgQ2FzZUhpc3RvcnlDYXNlVHlwZSB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgbmFtZTogc3RyaW5nO1xuICBwdWJsaWMgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG5cbiAgQFR5cGUoKCkgPT4gSnVyaXNkaWN0aW9uKVxuICBwdWJsaWMganVyaXNkaWN0aW9uOiBKdXJpc2RpY3Rpb247XG59XG5cbi8vIEBkeW5hbWljXG5leHBvcnQgY2xhc3MgQ2FzZUhpc3Rvcnkge1xuICBwdWJsaWMgY2FzZV9pZD86IHN0cmluZztcblxuICBAVHlwZSgoKSA9PiBDYXNlSGlzdG9yeUNhc2VUeXBlKVxuICBwdWJsaWMgY2FzZVR5cGU6IENhc2VIaXN0b3J5Q2FzZVR5cGU7XG5cbiAgQFR5cGUoKCkgPT4gQ2FzZVRhYilcbiAgcHVibGljIHRhYnM6IENhc2VUYWJbXTtcblxuICBAVHlwZSgoKSA9PiBDYXNlVmlld0V2ZW50KVxuICBwdWJsaWMgZXZlbnQ6IENhc2VWaWV3RXZlbnQ7XG59XG4iXX0=