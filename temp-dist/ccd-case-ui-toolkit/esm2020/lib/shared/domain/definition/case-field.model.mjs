import { __decorate, __metadata } from "tslib";
// tslint:disable:variable-name
import { Expose, Type } from 'class-transformer';
import * as _ from 'underscore';
import { WizardPageField } from '../../components/case-editor/domain/wizard-page-field.model';
import { FieldType } from './field-type.model';
// @dynamic
export class CaseField {
    constructor() {
        this._list_items = [];
    }
    get value() {
        if (this.field_type && (this.field_type.type === 'DynamicList' || this.field_type.type === 'DynamicRadioList')) {
            return this._value && this._value.value ? this._value.value.code : this._value;
        }
        else if (this.field_type && this.field_type.type === 'DynamicMultiSelectList') {
            return this._value && this._value.value ? this._value.value : this._value;
        }
        else {
            return this._value;
        }
    }
    set value(value) {
        if (this.isDynamic()) {
            if (value && value instanceof Object && value.list_items) {
                this._list_items = value.list_items;
            }
            else if (!this._list_items || this._list_items.length === 0) {
                // Extract the list items from the current value if that's the only place they exist.
                this._list_items = this.list_items;
                if (!value || !value.value) {
                    value = null;
                }
            }
        }
        this._value = value;
    }
    get list_items() {
        if (this.isDynamic()) {
            return this._value && this._value.list_items ? this._value.list_items : this._list_items;
        }
        else {
            return this.field_type.fixed_list_items;
        }
    }
    set list_items(items) {
        this._list_items = items;
    }
    get dateTimeEntryFormat() {
        if (this.isComplexDisplay()) {
            return null;
        }
        if (this.display_context_parameter) {
            return this.extractBracketValue(this.display_context_parameter, '#DATETIMEENTRY');
        }
        return null;
    }
    get dateTimeDisplayFormat() {
        if (this.isComplexEntry()) {
            return null;
        }
        if (this.display_context_parameter) {
            return this.extractBracketValue(this.display_context_parameter, '#DATETIMEDISPLAY');
        }
        return null;
    }
    isComplexDisplay() {
        return (this.isComplex() || this.isCollection()) && this.isReadonly();
    }
    isComplexEntry() {
        return (this.isComplex() || this.isCollection()) && (this.isOptional() || this.isMandatory());
    }
    isReadonly() {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'READONLY';
    }
    isOptional() {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'OPTIONAL';
    }
    isMandatory() {
        return !_.isEmpty(this.display_context)
            && this.display_context.toUpperCase() === 'MANDATORY';
    }
    isCollection() {
        return this.field_type && this.field_type.type === 'Collection';
    }
    isComplex() {
        return this.field_type && this.field_type.type === 'Complex';
    }
    isDynamic() {
        const dynamicFieldTypes = ['DynamicList', 'DynamicRadioList', 'DynamicMultiSelectList'];
        if (!this.field_type) {
            return false;
        }
        return dynamicFieldTypes.some(t => t === this.field_type.type);
    }
    isCaseLink() {
        return this.isComplex()
            && this.field_type.id === 'CaseLink'
            && this.field_type.complex_fields.some(cf => cf.id === 'CaseReference');
    }
    extractBracketValue(fmt, paramName, leftBracket = '(', rightBracket = ')') {
        fmt = fmt.split(',')
            .find(a => a.trim().startsWith(paramName));
        if (fmt) {
            const s = fmt.indexOf(leftBracket) + 1;
            const e = fmt.indexOf(rightBracket, s);
            if (e > s && s >= 0) {
                return fmt.substr(s, (e - s));
            }
        }
        return null;
    }
}
__decorate([
    Type(() => FieldType),
    __metadata("design:type", FieldType)
], CaseField.prototype, "field_type", void 0);
__decorate([
    Type(() => WizardPageField),
    __metadata("design:type", WizardPageField)
], CaseField.prototype, "wizardProps", void 0);
__decorate([
    Expose(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CaseField.prototype, "value", null);
__decorate([
    Expose(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], CaseField.prototype, "list_items", null);
__decorate([
    Expose(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], CaseField.prototype, "dateTimeEntryFormat", null);
__decorate([
    Expose(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], CaseField.prototype, "dateTimeDisplayFormat", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaseField.prototype, "isComplexDisplay", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaseField.prototype, "isComplexEntry", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaseField.prototype, "isReadonly", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaseField.prototype, "isOptional", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CaseField.prototype, "isMandatory", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], CaseField.prototype, "isCollection", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], CaseField.prototype, "isComplex", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], CaseField.prototype, "isDynamic", null);
__decorate([
    Expose(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Boolean)
], CaseField.prototype, "isCaseLink", null);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1maWVsZC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0JBQStCO0FBQy9CLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDakQsT0FBTyxLQUFLLENBQUMsTUFBTSxZQUFZLENBQUM7QUFDaEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZEQUE2RCxDQUFDO0FBSTlGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUUvQyxXQUFXO0FBQ1gsTUFBTSxPQUFPLFNBQVM7SUFBdEI7UUEyQlMsZ0JBQVcsR0FBUSxFQUFFLENBQUM7SUFrSS9CLENBQUM7SUFoSUMsSUFDVyxLQUFLO1FBQ2QsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssYUFBYSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLGtCQUFrQixDQUFDLEVBQUU7WUFDOUcsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7U0FDaEY7YUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEtBQUssd0JBQXdCLEVBQUU7WUFDL0UsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUMzRTthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO1NBQ3BCO0lBQ0gsQ0FBQztJQUVELElBQVcsS0FBSyxDQUFDLEtBQVU7UUFDekIsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxLQUFLLElBQUksS0FBSyxZQUFZLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxFQUFFO2dCQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7YUFDckM7aUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO2dCQUM3RCxxRkFBcUY7Z0JBQ3JGLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFDbkMsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7b0JBQzFCLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2Q7YUFDRjtTQUNGO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7SUFDdEIsQ0FBQztJQUVELElBQ1csVUFBVTtRQUNuQixJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQzFGO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLENBQUM7U0FDekM7SUFDSCxDQUFDO0lBRUQsSUFBVyxVQUFVLENBQUMsS0FBVTtRQUM5QixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUMzQixDQUFDO0lBRUQsSUFDVyxtQkFBbUI7UUFDNUIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDbkY7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxJQUNXLHFCQUFxQjtRQUM5QixJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQztTQUNiO1FBQ0QsSUFBSSxJQUFJLENBQUMseUJBQXlCLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLHlCQUF5QixFQUFFLGtCQUFrQixDQUFDLENBQUM7U0FDckY7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFHTSxnQkFBZ0I7UUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDeEUsQ0FBQztJQUdNLGNBQWM7UUFDbkIsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztJQUNoRyxDQUFDO0lBR00sVUFBVTtRQUNmLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7ZUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxVQUFVLENBQUM7SUFDekQsQ0FBQztJQUdNLFVBQVU7UUFDZixPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDO2VBQ2xDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFFLEtBQUssVUFBVSxDQUFDO0lBQ3pELENBQUM7SUFHTSxXQUFXO1FBQ2hCLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUM7ZUFDbEMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLENBQUM7SUFDMUQsQ0FBQztJQUdNLFlBQVk7UUFDakIsT0FBTyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxLQUFLLFlBQVksQ0FBQztJQUNsRSxDQUFDO0lBR00sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksS0FBSyxTQUFTLENBQUM7SUFDL0QsQ0FBQztJQUdNLFNBQVM7UUFDZCxNQUFNLGlCQUFpQixHQUFvQixDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSx3QkFBd0IsQ0FBQyxDQUFDO1FBRXpHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ3BCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLENBQUM7SUFHTSxVQUFVO1FBQ2YsT0FBTyxJQUFJLENBQUMsU0FBUyxFQUFFO2VBQ2xCLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxLQUFLLFVBQVU7ZUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBQ00sbUJBQW1CLENBQUMsR0FBVyxFQUFFLFNBQWlCLEVBQUUsV0FBVyxHQUFFLEdBQUcsRUFBRSxZQUFZLEdBQUUsR0FBRztRQUMxRixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDakIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1FBQzdDLElBQUksR0FBRyxFQUFFO1lBQ1AsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ25CLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUMvQjtTQUNGO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNGO0FBdEpDO0lBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQzs4QkFDSCxTQUFTOzZDQUFDO0FBZTdCO0lBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQzs4QkFDUCxlQUFlOzhDQUFDO0FBS3JDO0lBQUMsTUFBTSxFQUFFOzs7c0NBU1I7QUFpQkQ7SUFBQyxNQUFNLEVBQUU7OzsyQ0FPUjtBQU1EO0lBQUMsTUFBTSxFQUFFOzs7b0RBU1I7QUFFRDtJQUFDLE1BQU0sRUFBRTs7O3NEQVNSO0FBRUQ7SUFBQyxNQUFNLEVBQUU7Ozs7aURBR1I7QUFFRDtJQUFDLE1BQU0sRUFBRTs7OzsrQ0FHUjtBQUVEO0lBQUMsTUFBTSxFQUFFOzs7OzJDQUlSO0FBRUQ7SUFBQyxNQUFNLEVBQUU7Ozs7MkNBSVI7QUFFRDtJQUFDLE1BQU0sRUFBRTs7Ozs0Q0FJUjtBQUVEO0lBQUMsTUFBTSxFQUFFOzs7OzZDQUdSO0FBRUQ7SUFBQyxNQUFNLEVBQUU7Ozs7MENBR1I7QUFFRDtJQUFDLE1BQU0sRUFBRTs7OzswQ0FTUjtBQUVEO0lBQUMsTUFBTSxFQUFFOzs7OzJDQUtSIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6dmFyaWFibGUtbmFtZVxuaW1wb3J0IHsgRXhwb3NlLCBUeXBlIH0gZnJvbSAnY2xhc3MtdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgXyBmcm9tICd1bmRlcnNjb3JlJztcbmltcG9ydCB7IFdpemFyZFBhZ2VGaWVsZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY2FzZS1lZGl0b3IvZG9tYWluL3dpemFyZC1wYWdlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IE9yZGVyYWJsZSB9IGZyb20gJy4uL29yZGVyJztcbmltcG9ydCB7IEFjY2Vzc0NvbnRyb2xMaXN0IH0gZnJvbSAnLi9hY2Nlc3MtY29udHJvbC1saXN0Lm1vZGVsJztcbmltcG9ydCB7IEZpZWxkVHlwZUVudW0gfSBmcm9tICcuL2ZpZWxkLXR5cGUtZW51bS5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZFR5cGUgfSBmcm9tICcuL2ZpZWxkLXR5cGUubW9kZWwnO1xuXG4vLyBAZHluYW1pY1xuZXhwb3J0IGNsYXNzIENhc2VGaWVsZCBpbXBsZW1lbnRzIE9yZGVyYWJsZSB7XG4gIHB1YmxpYyBpZDogc3RyaW5nO1xuICBwdWJsaWMgaGlkZGVuOiBib29sZWFuO1xuICBwdWJsaWMgaGlkZGVuQ2Fubm90Q2hhbmdlOiBib29sZWFuO1xuICBwdWJsaWMgbGFiZWw6IHN0cmluZztcbiAgcHVibGljIG9yZGVyPzogbnVtYmVyO1xuXG4gIEBUeXBlKCgpID0+IEZpZWxkVHlwZSlcbiAgcHVibGljIGZpZWxkX3R5cGU6IEZpZWxkVHlwZTtcblxuICBwdWJsaWMgaGludF90ZXh0Pzogc3RyaW5nO1xuICBwdWJsaWMgc2VjdXJpdHlfbGFiZWw/OiBzdHJpbmc7XG4gIHB1YmxpYyBkaXNwbGF5X2NvbnRleHQ6IHN0cmluZztcbiAgcHVibGljIGRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXI/OiBzdHJpbmc7XG4gIHB1YmxpYyBtb250aF9mb3JtYXQ/OiBzdHJpbmc7XG4gIHB1YmxpYyBzaG93X2NvbmRpdGlvbj86IHN0cmluZztcbiAgcHVibGljIHNob3dfc3VtbWFyeV9jaGFuZ2Vfb3B0aW9uPzogYm9vbGVhbjtcbiAgcHVibGljIHNob3dfc3VtbWFyeV9jb250ZW50X29wdGlvbj86IG51bWJlcjtcbiAgcHVibGljIGFjbHM/OiBBY2Nlc3NDb250cm9sTGlzdFtdO1xuICBwdWJsaWMgbWV0YWRhdGE/OiBib29sZWFuO1xuICBwdWJsaWMgZm9ybWF0dGVkX3ZhbHVlPzogYW55O1xuICBwdWJsaWMgcmV0YWluX2hpZGRlbl92YWx1ZTogYm9vbGVhbjtcblxuICBAVHlwZSgoKSA9PiBXaXphcmRQYWdlRmllbGQpXG4gIHB1YmxpYyB3aXphcmRQcm9wcz86IFdpemFyZFBhZ2VGaWVsZDtcblxuICBwdWJsaWMgX3ZhbHVlOiBhbnk7XG4gIHB1YmxpYyBfbGlzdF9pdGVtczogYW55ID0gW107XG5cbiAgQEV4cG9zZSgpXG4gIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcbiAgICBpZiAodGhpcy5maWVsZF90eXBlICYmICh0aGlzLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0R5bmFtaWNMaXN0JyB8fCB0aGlzLmZpZWxkX3R5cGUudHlwZSA9PT0gJ0R5bmFtaWNSYWRpb0xpc3QnKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICYmIHRoaXMuX3ZhbHVlLnZhbHVlID8gdGhpcy5fdmFsdWUudmFsdWUuY29kZSA6IHRoaXMuX3ZhbHVlO1xuICAgIH0gZWxzZSBpZiAodGhpcy5maWVsZF90eXBlICYmIHRoaXMuZmllbGRfdHlwZS50eXBlID09PSAnRHluYW1pY011bHRpU2VsZWN0TGlzdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZSAmJiB0aGlzLl92YWx1ZS52YWx1ZSA/IHRoaXMuX3ZhbHVlLnZhbHVlIDogdGhpcy5fdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodGhpcy5pc0R5bmFtaWMoKSkge1xuICAgICAgaWYgKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0ICYmIHZhbHVlLmxpc3RfaXRlbXMpIHtcbiAgICAgICAgdGhpcy5fbGlzdF9pdGVtcyA9IHZhbHVlLmxpc3RfaXRlbXM7XG4gICAgICB9IGVsc2UgaWYgKCF0aGlzLl9saXN0X2l0ZW1zIHx8IHRoaXMuX2xpc3RfaXRlbXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIEV4dHJhY3QgdGhlIGxpc3QgaXRlbXMgZnJvbSB0aGUgY3VycmVudCB2YWx1ZSBpZiB0aGF0J3MgdGhlIG9ubHkgcGxhY2UgdGhleSBleGlzdC5cbiAgICAgICAgdGhpcy5fbGlzdF9pdGVtcyA9IHRoaXMubGlzdF9pdGVtcztcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCAhdmFsdWUudmFsdWUpIHtcbiAgICAgICAgICB2YWx1ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIEBFeHBvc2UoKVxuICBwdWJsaWMgZ2V0IGxpc3RfaXRlbXMoKTogYW55IHtcbiAgICBpZiAodGhpcy5pc0R5bmFtaWMoKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlICYmIHRoaXMuX3ZhbHVlLmxpc3RfaXRlbXMgPyB0aGlzLl92YWx1ZS5saXN0X2l0ZW1zIDogdGhpcy5fbGlzdF9pdGVtcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZmllbGRfdHlwZS5maXhlZF9saXN0X2l0ZW1zO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBzZXQgbGlzdF9pdGVtcyhpdGVtczogYW55KSB7XG4gICAgdGhpcy5fbGlzdF9pdGVtcyA9IGl0ZW1zO1xuICB9XG5cbiAgQEV4cG9zZSgpXG4gIHB1YmxpYyBnZXQgZGF0ZVRpbWVFbnRyeUZvcm1hdCgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmlzQ29tcGxleERpc3BsYXkoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmICh0aGlzLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmV4dHJhY3RCcmFja2V0VmFsdWUodGhpcy5kaXNwbGF5X2NvbnRleHRfcGFyYW1ldGVyLCAnI0RBVEVUSU1FRU5UUlknKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGdldCBkYXRlVGltZURpc3BsYXlGb3JtYXQoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5pc0NvbXBsZXhFbnRyeSgpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlzcGxheV9jb250ZXh0X3BhcmFtZXRlcikge1xuICAgICAgcmV0dXJuIHRoaXMuZXh0cmFjdEJyYWNrZXRWYWx1ZSh0aGlzLmRpc3BsYXlfY29udGV4dF9wYXJhbWV0ZXIsICcjREFURVRJTUVESVNQTEFZJyk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgQEV4cG9zZSgpXG4gIHB1YmxpYyBpc0NvbXBsZXhEaXNwbGF5KCkge1xuICAgIHJldHVybiAodGhpcy5pc0NvbXBsZXgoKSB8fCB0aGlzLmlzQ29sbGVjdGlvbigpKSAmJiB0aGlzLmlzUmVhZG9ubHkoKTtcbiAgfVxuXG4gIEBFeHBvc2UoKVxuICBwdWJsaWMgaXNDb21wbGV4RW50cnkoKSB7XG4gICAgcmV0dXJuICh0aGlzLmlzQ29tcGxleCgpIHx8IHRoaXMuaXNDb2xsZWN0aW9uKCkpICYmICh0aGlzLmlzT3B0aW9uYWwoKSB8fCB0aGlzLmlzTWFuZGF0b3J5KCkpO1xuICB9XG5cbiAgQEV4cG9zZSgpXG4gIHB1YmxpYyBpc1JlYWRvbmx5KCkge1xuICAgIHJldHVybiAhXy5pc0VtcHR5KHRoaXMuZGlzcGxheV9jb250ZXh0KVxuICAgICAgJiYgdGhpcy5kaXNwbGF5X2NvbnRleHQudG9VcHBlckNhc2UoKSA9PT0gJ1JFQURPTkxZJztcbiAgfVxuXG4gIEBFeHBvc2UoKVxuICBwdWJsaWMgaXNPcHRpb25hbCgpIHtcbiAgICByZXR1cm4gIV8uaXNFbXB0eSh0aGlzLmRpc3BsYXlfY29udGV4dClcbiAgICAgICYmIHRoaXMuZGlzcGxheV9jb250ZXh0LnRvVXBwZXJDYXNlKCkgPT09ICdPUFRJT05BTCc7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGlzTWFuZGF0b3J5KCkge1xuICAgIHJldHVybiAhXy5pc0VtcHR5KHRoaXMuZGlzcGxheV9jb250ZXh0KVxuICAgICAgJiYgdGhpcy5kaXNwbGF5X2NvbnRleHQudG9VcHBlckNhc2UoKSA9PT0gJ01BTkRBVE9SWSc7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGlzQ29sbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZF90eXBlICYmIHRoaXMuZmllbGRfdHlwZS50eXBlID09PSAnQ29sbGVjdGlvbic7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGlzQ29tcGxleCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5maWVsZF90eXBlICYmIHRoaXMuZmllbGRfdHlwZS50eXBlID09PSAnQ29tcGxleCc7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGlzRHluYW1pYygpOiBib29sZWFuIHtcbiAgICBjb25zdCBkeW5hbWljRmllbGRUeXBlczogRmllbGRUeXBlRW51bVtdID0gWydEeW5hbWljTGlzdCcsICdEeW5hbWljUmFkaW9MaXN0JywgJ0R5bmFtaWNNdWx0aVNlbGVjdExpc3QnXTtcblxuICAgIGlmICghdGhpcy5maWVsZF90eXBlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGR5bmFtaWNGaWVsZFR5cGVzLnNvbWUodCA9PiB0ID09PSB0aGlzLmZpZWxkX3R5cGUudHlwZSk7XG4gIH1cblxuICBARXhwb3NlKClcbiAgcHVibGljIGlzQ2FzZUxpbmsoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb21wbGV4KClcbiAgICAgICYmIHRoaXMuZmllbGRfdHlwZS5pZCA9PT0gJ0Nhc2VMaW5rJ1xuICAgICAgJiYgdGhpcy5maWVsZF90eXBlLmNvbXBsZXhfZmllbGRzLnNvbWUoY2YgPT4gY2YuaWQgPT09ICdDYXNlUmVmZXJlbmNlJyk7XG4gIH1cbiAgcHVibGljIGV4dHJhY3RCcmFja2V0VmFsdWUoZm10OiBzdHJpbmcsIHBhcmFtTmFtZTogc3RyaW5nLCBsZWZ0QnJhY2tldD0gJygnLCByaWdodEJyYWNrZXQ9ICcpJyApOiBzdHJpbmcge1xuICAgICAgZm10ID0gZm10LnNwbGl0KCcsJylcbiAgICAgICAgLmZpbmQoYSA9PiBhLnRyaW0oKS5zdGFydHNXaXRoKHBhcmFtTmFtZSkpO1xuICAgICAgaWYgKGZtdCkge1xuICAgICAgICBjb25zdCBzID0gZm10LmluZGV4T2YobGVmdEJyYWNrZXQpICsgMTtcbiAgICAgICAgY29uc3QgZSA9IGZtdC5pbmRleE9mKHJpZ2h0QnJhY2tldCwgcyk7XG4gICAgICAgIGlmIChlID4gcyAmJiBzID49IDApIHtcbiAgICAgICAgICByZXR1cm4gZm10LnN1YnN0cihzLCAoZSAtIHMpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiJdfQ==