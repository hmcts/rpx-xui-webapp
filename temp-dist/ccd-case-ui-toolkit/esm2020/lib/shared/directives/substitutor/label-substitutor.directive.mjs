import { Directive, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { CaseField } from '../../domain/definition/case-field.model';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { PlaceholderService } from './services/placeholder.service';
import * as i0 from "@angular/core";
import * as i1 from "../../services/fields/fields.utils";
import * as i2 from "./services/placeholder.service";
/**
 * Checks all labels and substitutes any placholders that reference other fields values.
 */
export class LabelSubstitutorDirective {
    constructor(fieldsUtils, placeholderService) {
        this.fieldsUtils = fieldsUtils;
        this.placeholderService = placeholderService;
        this.contextFields = [];
        this.elementsToSubstitute = ['label', 'hint_text'];
    }
    ngOnInit() {
        this.initialLabel = this.caseField.label;
        this.initialHintText = this.caseField.hint_text;
        this.formGroup = this.formGroup || new UntypedFormGroup({});
        const fields = this.getReadOnlyAndFormFields();
        if (this.shouldSubstitute('label')) {
            this.caseField.label = this.resolvePlaceholders(fields, this.caseField.label);
        }
        if (this.shouldSubstitute('hint_text')) {
            this.caseField.hint_text = this.resolvePlaceholders(fields, this.caseField.hint_text);
        }
        if (this.shouldSubstitute('value')) {
            this.caseField.value = this.resolvePlaceholders(fields, this.caseField.value);
        }
    }
    ngOnDestroy() {
        if (this.initialLabel) {
            this.caseField.label = this.initialLabel;
        }
        if (this.initialHintText) {
            this.caseField.hint_text = this.initialHintText;
        }
    }
    shouldSubstitute(element) {
        return this.elementsToSubstitute.find(e => e === element) !== undefined;
    }
    getReadOnlyAndFormFields() {
        const formFields = this.getFormFieldsValuesIncludingDisabled();
        // TODO: Delete following line when @Input contextFields is fixed - https://tools.hmcts.net/jira/browse/RDM-3504
        const uniqueContextFields = this.removeDuplicates(this.contextFields);
        return this.fieldsUtils.mergeLabelCaseFieldsAndFormFields(uniqueContextFields, formFields);
    }
    removeDuplicates(original) {
        const unique = [];
        original.forEach(caseField => {
            const isUnique = unique.filter(e => e.id === caseField.id).length === 0;
            if (isUnique) {
                unique.push(caseField);
            }
        });
        return unique;
    }
    getFormFieldsValuesIncludingDisabled() {
        return this.formGroup.getRawValue();
    }
    resolvePlaceholders(fields, stringToResolve) {
        return this.placeholderService.resolvePlaceholders(fields, stringToResolve);
    }
}
LabelSubstitutorDirective.ɵfac = function LabelSubstitutorDirective_Factory(t) { return new (t || LabelSubstitutorDirective)(i0.ɵɵdirectiveInject(i1.FieldsUtils), i0.ɵɵdirectiveInject(i2.PlaceholderService)); };
LabelSubstitutorDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: LabelSubstitutorDirective, selectors: [["", "ccdLabelSubstitutor", ""]], inputs: { caseField: "caseField", contextFields: "contextFields", formGroup: "formGroup", elementsToSubstitute: "elementsToSubstitute" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LabelSubstitutorDirective, [{
        type: Directive,
        args: [{ selector: '[ccdLabelSubstitutor]' }]
    }], function () { return [{ type: i1.FieldsUtils }, { type: i2.PlaceholderService }]; }, { caseField: [{
            type: Input
        }], contextFields: [{
            type: Input
        }], formGroup: [{
            type: Input
        }], elementsToSubstitute: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFiZWwtc3Vic3RpdHV0b3IuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9kaXJlY3RpdmVzL3N1YnN0aXR1dG9yL2xhYmVsLXN1YnN0aXR1dG9yLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQzs7OztBQUdwRTs7R0FFRztBQUNILE1BQU0sT0FBTyx5QkFBeUI7SUFVcEMsWUFDbUIsV0FBd0IsRUFDeEIsa0JBQXNDO1FBRHRDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBb0I7UUFUekMsa0JBQWEsR0FBZ0IsRUFBRSxDQUFDO1FBRWhDLHlCQUFvQixHQUFhLENBQUMsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBUXBFLENBQUM7SUFFRSxRQUFRO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO1FBQ2hELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTVELE1BQU0sTUFBTSxHQUFXLElBQUksQ0FBQyx3QkFB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LCBPbkRlc3Ryb3ksIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ2FzZUZpZWxkIH0gZnJvbSAnLi4vLi4vZG9tYWluL2RlZmluaXRpb24vY2FzZS1maWVsZC5tb2RlbCc7XG5pbXBvcnQgeyBGaWVsZHNVdGlscyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2ZpZWxkcy9maWVsZHMudXRpbHMnO1xuaW1wb3J0IHsgUGxhY2Vob2xkZXJTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9wbGFjZWhvbGRlci5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7IHNlbGVjdG9yOiAnW2NjZExhYmVsU3Vic3RpdHV0b3JdJyB9KVxuLyoqXG4gKiBDaGVja3MgYWxsIGxhYmVscyBhbmQgc3Vic3RpdHV0ZXMgYW55IHBsYWNob2xkZXJzIHRoYXQgcmVmZXJlbmNlIG90aGVyIGZpZWxkcyB2YWx1ZXMuXG4gKi9cbmV4cG9ydCBjbGFzcyBMYWJlbFN1YnN0aXR1dG9yRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBjYXNlRmllbGQ6IENhc2VGaWVsZDtcbiAgQElucHV0KCkgcHVibGljIGNvbnRleHRGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG4gIEBJbnB1dCgpIHB1YmxpYyBlbGVtZW50c1RvU3Vic3RpdHV0ZTogc3RyaW5nW10gPSBbJ2xhYmVsJywgJ2hpbnRfdGV4dCddO1xuXG4gIHByaXZhdGUgaW5pdGlhbExhYmVsOiBzdHJpbmc7XG4gIHByaXZhdGUgaW5pdGlhbEhpbnRUZXh0OiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSByZWFkb25seSBmaWVsZHNVdGlsczogRmllbGRzVXRpbHMsXG4gICAgcHJpdmF0ZSByZWFkb25seSBwbGFjZWhvbGRlclNlcnZpY2U6IFBsYWNlaG9sZGVyU2VydmljZVxuICApIHsgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRpYWxMYWJlbCA9IHRoaXMuY2FzZUZpZWxkLmxhYmVsO1xuICAgIHRoaXMuaW5pdGlhbEhpbnRUZXh0ID0gdGhpcy5jYXNlRmllbGQuaGludF90ZXh0O1xuICAgIHRoaXMuZm9ybUdyb3VwID0gdGhpcy5mb3JtR3JvdXAgfHwgbmV3IFVudHlwZWRGb3JtR3JvdXAoe30pO1xuXG4gICAgY29uc3QgZmllbGRzOiBvYmplY3QgPSB0aGlzLmdldFJlYWRPbmx5QW5kRm9ybUZpZWxkcygpO1xuXG4gICAgaWYgKHRoaXMuc2hvdWxkU3Vic3RpdHV0ZSgnbGFiZWwnKSkge1xuICAgICAgdGhpcy5jYXNlRmllbGQubGFiZWwgPSB0aGlzLnJlc29sdmVQbGFjZWhvbGRlcnMoZmllbGRzLCB0aGlzLmNhc2VGaWVsZC5sYWJlbCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3VsZFN1YnN0aXR1dGUoJ2hpbnRfdGV4dCcpKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC5oaW50X3RleHQgPSB0aGlzLnJlc29sdmVQbGFjZWhvbGRlcnMoZmllbGRzLCB0aGlzLmNhc2VGaWVsZC5oaW50X3RleHQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zaG91bGRTdWJzdGl0dXRlKCd2YWx1ZScpKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC52YWx1ZSA9IHRoaXMucmVzb2x2ZVBsYWNlaG9sZGVycyhmaWVsZHMsIHRoaXMuY2FzZUZpZWxkLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5pdGlhbExhYmVsKSB7XG4gICAgICB0aGlzLmNhc2VGaWVsZC5sYWJlbCA9IHRoaXMuaW5pdGlhbExhYmVsO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbml0aWFsSGludFRleHQpIHtcbiAgICAgIHRoaXMuY2FzZUZpZWxkLmhpbnRfdGV4dCA9IHRoaXMuaW5pdGlhbEhpbnRUZXh0O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2hvdWxkU3Vic3RpdHV0ZShlbGVtZW50OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5lbGVtZW50c1RvU3Vic3RpdHV0ZS5maW5kKGUgPT4gZSA9PT0gZWxlbWVudCkgIT09IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0UmVhZE9ubHlBbmRGb3JtRmllbGRzKCk6IG9iamVjdCB7XG4gICAgY29uc3QgZm9ybUZpZWxkczogb2JqZWN0ID0gdGhpcy5nZXRGb3JtRmllbGRzVmFsdWVzSW5jbHVkaW5nRGlzYWJsZWQoKTtcbiAgICAvLyBUT0RPOiBEZWxldGUgZm9sbG93aW5nIGxpbmUgd2hlbiBASW5wdXQgY29udGV4dEZpZWxkcyBpcyBmaXhlZCAtIGh0dHBzOi8vdG9vbHMuaG1jdHMubmV0L2ppcmEvYnJvd3NlL1JETS0zNTA0XG4gICAgY29uc3QgdW5pcXVlQ29udGV4dEZpZWxkczogQ2FzZUZpZWxkW10gPSB0aGlzLnJlbW92ZUR1cGxpY2F0ZXModGhpcy5jb250ZXh0RmllbGRzKTtcbiAgICByZXR1cm4gdGhpcy5maWVsZHNVdGlscy5tZXJnZUxhYmVsQ2FzZUZpZWxkc0FuZEZvcm1GaWVsZHModW5pcXVlQ29udGV4dEZpZWxkcywgZm9ybUZpZWxkcyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUR1cGxpY2F0ZXMob3JpZ2luYWw6IENhc2VGaWVsZFtdKTogQ2FzZUZpZWxkW10ge1xuICAgIGNvbnN0IHVuaXF1ZTogQ2FzZUZpZWxkW10gPSBbXTtcbiAgICBvcmlnaW5hbC5mb3JFYWNoKGNhc2VGaWVsZCA9PiB7XG4gICAgICBjb25zdCBpc1VuaXF1ZSA9IHVuaXF1ZS5maWx0ZXIoZSA9PiBlLmlkID09PSBjYXNlRmllbGQuaWQpLmxlbmd0aCA9PT0gMDtcbiAgICAgIGlmIChpc1VuaXF1ZSkge1xuICAgICAgICB1bmlxdWUucHVzaChjYXNlRmllbGQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB1bmlxdWU7XG4gIH1cblxuICBwcml2YXRlIGdldEZvcm1GaWVsZHNWYWx1ZXNJbmNsdWRpbmdEaXNhYmxlZCgpOiBvYmplY3Qge1xuICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cC5nZXRSYXdWYWx1ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXNvbHZlUGxhY2Vob2xkZXJzKGZpZWxkczogb2JqZWN0LCBzdHJpbmdUb1Jlc29sdmU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMucGxhY2Vob2xkZXJTZXJ2aWNlLnJlc29sdmVQbGFjZWhvbGRlcnMoZmllbGRzLCBzdHJpbmdUb1Jlc29sdmUpO1xuICB9XG59XG4iXX0=