import { Directive, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { AbstractFieldWriteComponent } from '../../components/palette/base-field/abstract-field-write.component';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { ShowCondition } from './domain/conditional-show.model';
import * as i0 from "@angular/core";
import * as i1 from "../../services/fields/fields.utils";
/** Hides and shows all fields in a form. Works on read only fields and form fields.
 *  The show condition is evaluated on all the fields of the page. i.e. read only and form fields.
 *  Evaluation of the show condition includes disabled fields, which can be on their initial value or empty. Executes on the
 *  host field initialization and when any field of the form changes.
 *  Collaborates with the GreyBarService to show a vertical grey bar when a field initially hidden on the page is shown. When returning
 *  to the page after the page has been left, the grey bar has to be redisplayed. If instead on initial page load the field renders as
 *  initially shown, the grey bar is not displayed.
 */
export class ConditionalShowFormDirective {
    constructor(fieldsUtils) {
        this.fieldsUtils = fieldsUtils;
        this.contextFields = [];
        // make sure for the 3 callbacks that we are bound to this via an arrow function
        this.handleFormControl = (formControl) => {
            this.evaluateControl(formControl);
        };
        this.handleFormArray = (formArray) => {
            this.evaluateControl(formArray);
            formArray.controls.forEach(formControl => {
                this.fieldsUtils.controlIterator(formControl, this.handleFormArray, this.handleFormGroup, this.handleFormControl);
            });
        };
        this.handleFormGroup = (formGroup) => {
            this.evaluateControl(formGroup);
            let groupControl = formGroup;
            if (formGroup.get('value') && formGroup.get('value') instanceof UntypedFormGroup) { // Complex Field
                groupControl = formGroup.get('value');
            }
            else if (formGroup.controls) {
                // Special Fields like AddressUK, AddressGlobal
                groupControl = formGroup;
            }
            if (groupControl.controls) {
                Object.keys(groupControl.controls).forEach(cKey => {
                    // EUI-3359.
                    // Get the control from groupControl.controls[cKey] rather than
                    // groupControl.get(cKey) as the latter does pathing and will interpret
                    // full stops in cKey as delimeters for being nested within an array,
                    // which makes no sense in this situation.
                    const control = groupControl.controls[cKey];
                    this.fieldsUtils.controlIterator(control, this.handleFormArray, this.handleFormGroup, this.handleFormControl);
                });
            }
        };
    }
    ngOnInit() {
        if (!this.formGroup) {
            this.formGroup = new UntypedFormGroup({});
        }
    }
    /**
     * Moved the evaluation of show/hide conditions and subscription
     * to form changes until after the form has been fully created.
     *
     * Prior to this change, I traced more than 5,100,000 firings of
     * the evaluateCondition INSIDE the show_condition check on page
     * load for an event with a lot of content. After this change,
     * that number dropped to fewer than 2,500 - that's a.
     */
    ngAfterViewInit() {
        this.evalAllShowHideConditions();
        this.subscribeToFormChanges();
    }
    ngOnDestroy() {
        this.unsubscribeFromFormChanges();
    }
    /*
    * Delay the execution of evalShowHideConditions for 100ms
    * Evaluating showHideConditions on input is inefficient as all forms are evaluated
    * whilst the user is still typing. We are better off allowing the user to finish typing
    * then evaluate the show hide conditions.
    */
    subscribeToFormChanges() {
        this.unsubscribeFromFormChanges();
        this.formChangesSubscription = this.formGroup.valueChanges
            .pipe(debounceTime(100))
            .subscribe(_ => {
            this.evalAllShowHideConditions();
        });
    }
    evaluateControl(control) {
        const cf = control['caseField'];
        const component = control['component'];
        this.evaluateCondition(cf, component, control);
    }
    evaluateCondition(cf, component, control) {
        if (cf) {
            if (cf.display_context === 'HIDDEN') {
                cf.hidden = true; // display_context === 'HIDDEN' means always hide
            }
            else if (cf.show_condition) {
                const showCondition = ShowCondition.getInstance(cf.show_condition);
                const condResult = showCondition.match(this.allFieldValues, this.buildPath(component, cf));
                if (cf.hidden === null || cf.hidden === undefined) {
                    cf.hidden = false;
                }
                if (condResult === cf.hidden) {
                    cf.hidden = !condResult;
                }
                // EUI-3267. If this field is showing, set the hiddenCannotChange flag.
                // This is used in the display of the grey bar.
                if (!cf.hidden) {
                    cf.hiddenCannotChange = showCondition.hiddenCannotChange(this.caseFields);
                }
                // Disable the control if it's hidden so that it doesn't count towards the
                // validation state of the form, but only if it's actually being validated.
                if (control.validator) {
                    if (cf.hidden === true && !control.disabled) {
                        control.disable({ emitEvent: false });
                    }
                    else if (cf.hidden !== true) {
                        control.enable({ emitEvent: false });
                    }
                }
            }
        }
    }
    evalAllShowHideConditions() {
        this.getCurrentPagesReadOnlyAndFormFieldValues();
        this.fieldsUtils.controlIterator(this.formGroup, this.handleFormArray, this.handleFormGroup, this.handleFormControl);
    }
    buildPath(c, field) {
        if (c && c instanceof AbstractFieldWriteComponent) {
            if (c.idPrefix) {
                return c.idPrefix + field.id;
            }
        }
        return field.id;
    }
    getCurrentPagesReadOnlyAndFormFieldValues() {
        const formFields = this.getFormFieldsValuesIncludingDisabled();
        this.allFieldValues = this.fieldsUtils.mergeCaseFieldsAndFormFields(this.contextFields, formFields);
        return this.allFieldValues;
    }
    getFormFieldsValuesIncludingDisabled() {
        return this.formGroup.getRawValue();
    }
    unsubscribeFromFormChanges() {
        if (this.formChangesSubscription) {
            this.formChangesSubscription.unsubscribe();
        }
    }
}
ConditionalShowFormDirective.ɵfac = function ConditionalShowFormDirective_Factory(t) { return new (t || ConditionalShowFormDirective)(i0.ɵɵdirectiveInject(i1.FieldsUtils)); };
ConditionalShowFormDirective.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: ConditionalShowFormDirective, selectors: [["", "ccdConditionalShowForm", ""]], inputs: { caseFields: "caseFields", contextFields: "contextFields", formGroup: "formGroup" } });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConditionalShowFormDirective, [{
        type: Directive,
        args: [{ selector: '[ccdConditionalShowForm]' }]
    }], function () { return [{ type: i1.FieldsUtils }]; }, { caseFields: [{
            type: Input
        }], contextFields: [{
            type: Input
        }], formGroup: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtc2hvdy1mb3JtLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvZGlyZWN0aXZlcy9jb25kaXRpb25hbC1zaG93L2NvbmRpdGlvbmFsLXNob3ctZm9ybS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsS0FBSyxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQTJDLGdCQUFnQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFM0YsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTlDLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLG9FQUFvRSxDQUFDO0FBR2pILE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0saUNBQWlDLENBQUM7OztBQUdoRTs7Ozs7OztHQU9HO0FBQ0gsTUFBTSxPQUFPLDRCQUE0QjtJQVN2QyxZQUE2QixXQUF3QjtRQUF4QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQU5yQyxrQkFBYSxHQUFnQixFQUFFLENBQUM7UUF1RmhELGdGQUFnRjtRQUMvRCxzQkFBaUIsR0FBRyxDQUFDLFdBQXdCLEVBQVEsRUFBRTtZQUN0RSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQTtRQUVnQixvQkFBZSxHQUFHLENBQUMsU0FBb0IsRUFBUSxFQUFFO1lBQ2hFLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFD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dCwgT25EZXN0cm95LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUFycmF5LCBGb3JtQ29udHJvbCwgVW50eXBlZEZvcm1Hcm91cCB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBBYnN0cmFjdEZpZWxkV3JpdGVDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9hYnN0cmFjdC1maWVsZC13cml0ZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQWJzdHJhY3RGb3JtRmllbGRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3BhbGV0dGUvYmFzZS1maWVsZC9hYnN0cmFjdC1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlRmllbGQgfSBmcm9tICcuLi8uLi9kb21haW4vZGVmaW5pdGlvbi9jYXNlLWZpZWxkLm1vZGVsJztcbmltcG9ydCB7IEZpZWxkc1V0aWxzIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZmllbGRzL2ZpZWxkcy51dGlscyc7XG5pbXBvcnQgeyBTaG93Q29uZGl0aW9uIH0gZnJvbSAnLi9kb21haW4vY29uZGl0aW9uYWwtc2hvdy5tb2RlbCc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1tjY2RDb25kaXRpb25hbFNob3dGb3JtXScgfSlcbi8qKiBIaWRlcyBhbmQgc2hvd3MgYWxsIGZpZWxkcyBpbiBhIGZvcm0uIFdvcmtzIG9uIHJlYWQgb25seSBmaWVsZHMgYW5kIGZvcm0gZmllbGRzLlxuICogIFRoZSBzaG93IGNvbmRpdGlvbiBpcyBldmFsdWF0ZWQgb24gYWxsIHRoZSBmaWVsZHMgb2YgdGhlIHBhZ2UuIGkuZS4gcmVhZCBvbmx5IGFuZCBmb3JtIGZpZWxkcy5cbiAqICBFdmFsdWF0aW9uIG9mIHRoZSBzaG93IGNvbmRpdGlvbiBpbmNsdWRlcyBkaXNhYmxlZCBmaWVsZHMsIHdoaWNoIGNhbiBiZSBvbiB0aGVpciBpbml0aWFsIHZhbHVlIG9yIGVtcHR5LiBFeGVjdXRlcyBvbiB0aGVcbiAqICBob3N0IGZpZWxkIGluaXRpYWxpemF0aW9uIGFuZCB3aGVuIGFueSBmaWVsZCBvZiB0aGUgZm9ybSBjaGFuZ2VzLlxuICogIENvbGxhYm9yYXRlcyB3aXRoIHRoZSBHcmV5QmFyU2VydmljZSB0byBzaG93IGEgdmVydGljYWwgZ3JleSBiYXIgd2hlbiBhIGZpZWxkIGluaXRpYWxseSBoaWRkZW4gb24gdGhlIHBhZ2UgaXMgc2hvd24uIFdoZW4gcmV0dXJuaW5nXG4gKiAgdG8gdGhlIHBhZ2UgYWZ0ZXIgdGhlIHBhZ2UgaGFzIGJlZW4gbGVmdCwgdGhlIGdyZXkgYmFyIGhhcyB0byBiZSByZWRpc3BsYXllZC4gSWYgaW5zdGVhZCBvbiBpbml0aWFsIHBhZ2UgbG9hZCB0aGUgZmllbGQgcmVuZGVycyBhc1xuICogIGluaXRpYWxseSBzaG93biwgdGhlIGdyZXkgYmFyIGlzIG5vdCBkaXNwbGF5ZWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb25kaXRpb25hbFNob3dGb3JtRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gIEBJbnB1dCgpIHB1YmxpYyBjYXNlRmllbGRzOiBDYXNlRmllbGRbXTtcbiAgQElucHV0KCkgcHVibGljIGNvbnRleHRGaWVsZHM6IENhc2VGaWVsZFtdID0gW107XG4gIEBJbnB1dCgpIHB1YmxpYyBmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXA7XG5cbiAgcHJpdmF0ZSBhbGxGaWVsZFZhbHVlczogYW55O1xuICBwcml2YXRlIGZvcm1DaGFuZ2VzU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBmaWVsZHNVdGlsczogRmllbGRzVXRpbHMpIHtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMuZm9ybUdyb3VwKSB7XG4gICAgICB0aGlzLmZvcm1Hcm91cCA9IG5ldyBVbnR5cGVkRm9ybUdyb3VwKHt9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW92ZWQgdGhlIGV2YWx1YXRpb24gb2Ygc2hvdy9oaWRlIGNvbmRpdGlvbnMgYW5kIHN1YnNjcmlwdGlvblxuICAgKiB0byBmb3JtIGNoYW5nZXMgdW50aWwgYWZ0ZXIgdGhlIGZvcm0gaGFzIGJlZW4gZnVsbHkgY3JlYXRlZC5cbiAgICpcbiAgICogUHJpb3IgdG8gdGhpcyBjaGFuZ2UsIEkgdHJhY2VkIG1vcmUgdGhhbiA1LDEwMCwwMDAgZmlyaW5ncyBvZlxuICAgKiB0aGUgZXZhbHVhdGVDb25kaXRpb24gSU5TSURFIHRoZSBzaG93X2NvbmRpdGlvbiBjaGVjayBvbiBwYWdlXG4gICAqIGxvYWQgZm9yIGFuIGV2ZW50IHdpdGggYSBsb3Qgb2YgY29udGVudC4gQWZ0ZXIgdGhpcyBjaGFuZ2UsXG4gICAqIHRoYXQgbnVtYmVyIGRyb3BwZWQgdG8gZmV3ZXIgdGhhbiAyLDUwMCAtIHRoYXQncyBhLlxuICAgKi9cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmV2YWxBbGxTaG93SGlkZUNvbmRpdGlvbnMoKTtcbiAgICB0aGlzLnN1YnNjcmliZVRvRm9ybUNoYW5nZXMoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnVuc3Vic2NyaWJlRnJvbUZvcm1DaGFuZ2VzKCk7XG4gIH1cblxuICAvKlxuICAqIERlbGF5IHRoZSBleGVjdXRpb24gb2YgZXZhbFNob3dIaWRlQ29uZGl0aW9ucyBmb3IgMTAwbXNcbiAgKiBFdmFsdWF0aW5nIHNob3dIaWRlQ29uZGl0aW9ucyBvbiBpbnB1dCBpcyBpbmVmZmljaWVudCBhcyBhbGwgZm9ybXMgYXJlIGV2YWx1YXRlZFxuICAqIHdoaWxzdCB0aGUgdXNlciBpcyBzdGlsbCB0eXBpbmcuIFdlIGFyZSBiZXR0ZXIgb2ZmIGFsbG93aW5nIHRoZSB1c2VyIHRvIGZpbmlzaCB0eXBpbmdcbiAgKiB0aGVuIGV2YWx1YXRlIHRoZSBzaG93IGhpZGUgY29uZGl0aW9ucy5cbiAgKi9cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0Zvcm1DaGFuZ2VzKCkge1xuICAgIHRoaXMudW5zdWJzY3JpYmVGcm9tRm9ybUNoYW5nZXMoKTtcbiAgICB0aGlzLmZvcm1DaGFuZ2VzU3Vic2NyaXB0aW9uID0gdGhpcy5mb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgZGVib3VuY2VUaW1lKDEwMClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoXyA9PiB7XG4gICAgICAgIHRoaXMuZXZhbEFsbFNob3dIaWRlQ29uZGl0aW9ucygpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGV2YWx1YXRlQ29udHJvbChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBjb25zdCBjZiA9IGNvbnRyb2xbJ2Nhc2VGaWVsZCddIGFzIENhc2VGaWVsZDtcbiAgICBjb25zdCBjb21wb25lbnQgPSBjb250cm9sWydjb21wb25lbnQnXSBhcyBBYnN0cmFjdEZvcm1GaWVsZENvbXBvbmVudDtcbiAgICB0aGlzLmV2YWx1YXRlQ29uZGl0aW9uKGNmLCBjb21wb25lbnQsIGNvbnRyb2wpO1xuICB9XG5cbiAgcHJpdmF0ZSBldmFsdWF0ZUNvbmRpdGlvbihjZjogQ2FzZUZpZWxkLCBjb21wb25lbnQ6IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50LCBjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpIHtcbiAgICBpZiAoY2YpIHtcbiAgICAgIGlmIChjZi5kaXNwbGF5X2NvbnRleHQgPT09ICdISURERU4nKSB7XG4gICAgICAgIGNmLmhpZGRlbiA9IHRydWU7IC8vIGRpc3BsYXlfY29udGV4dCA9PT0gJ0hJRERFTicgbWVhbnMgYWx3YXlzIGhpZGVcbiAgICAgIH0gZWxzZSBpZiAoY2Yuc2hvd19jb25kaXRpb24pIHtcbiAgICAgICAgY29uc3Qgc2hvd0NvbmRpdGlvbjogU2hvd0NvbmRpdGlvbiA9IFNob3dDb25kaXRpb24uZ2V0SW5zdGFuY2UoY2Yuc2hvd19jb25kaXRpb24pO1xuICAgICAgICBjb25zdCBjb25kUmVzdWx0ID0gc2hvd0NvbmRpdGlvbi5tYXRjaCh0aGlzLmFsbEZpZWxkVmFsdWVzLCB0aGlzLmJ1aWxkUGF0aChjb21wb25lbnQsIGNmKSk7XG4gICAgICAgIGlmIChjZi5oaWRkZW4gPT09IG51bGwgfHwgY2YuaGlkZGVuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjZi5oaWRkZW4gPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZFJlc3VsdCA9PT0gY2YuaGlkZGVuKSB7XG4gICAgICAgICAgY2YuaGlkZGVuID0gIWNvbmRSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gRVVJLTMyNjcuIElmIHRoaXMgZmllbGQgaXMgc2hvd2luZywgc2V0IHRoZSBoaWRkZW5DYW5ub3RDaGFuZ2UgZmxhZy5cbiAgICAgICAgLy8gVGhpcyBpcyB1c2VkIGluIHRoZSBkaXNwbGF5IG9mIHRoZSBncmV5IGJhci5cbiAgICAgICAgaWYgKCFjZi5oaWRkZW4pIHtcbiAgICAgICAgICBjZi5oaWRkZW5DYW5ub3RDaGFuZ2UgPSBzaG93Q29uZGl0aW9uLmhpZGRlbkNhbm5vdENoYW5nZSh0aGlzLmNhc2VGaWVsZHMpO1xuICAgICAgICB9XG4gICAgICAgIC8vIERpc2FibGUgdGhlIGNvbnRyb2wgaWYgaXQncyBoaWRkZW4gc28gdGhhdCBpdCBkb2Vzbid0IGNvdW50IHRvd2FyZHMgdGhlXG4gICAgICAgIC8vIHZhbGlkYXRpb24gc3RhdGUgb2YgdGhlIGZvcm0sIGJ1dCBvbmx5IGlmIGl0J3MgYWN0dWFsbHkgYmVpbmcgdmFsaWRhdGVkLlxuICAgICAgICBpZiAoY29udHJvbC52YWxpZGF0b3IpIHtcbiAgICAgICAgICBpZiAoY2YuaGlkZGVuID09PSB0cnVlICYmICFjb250cm9sLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBjb250cm9sLmRpc2FibGUoeyBlbWl0RXZlbnQ6IGZhbHNlIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2YuaGlkZGVuICE9PSB0cnVlKSB7XG4gICAgICAgICAgICBjb250cm9sLmVuYWJsZSh7IGVtaXRFdmVudDogZmFsc2UgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gbWFrZSBzdXJlIGZvciB0aGUgMyBjYWxsYmFja3MgdGhhdCB3ZSBhcmUgYm91bmQgdG8gdGhpcyB2aWEgYW4gYXJyb3cgZnVuY3Rpb25cbiAgcHJpdmF0ZSByZWFkb25seSBoYW5kbGVGb3JtQ29udHJvbCA9IChmb3JtQ29udHJvbDogRm9ybUNvbnRyb2wpOiB2b2lkID0+IHtcbiAgICB0aGlzLmV2YWx1YXRlQ29udHJvbChmb3JtQ29udHJvbCk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGhhbmRsZUZvcm1BcnJheSA9IChmb3JtQXJyYXk6IEZvcm1BcnJheSk6IHZvaWQgPT4ge1xuICAgIHRoaXMuZXZhbHVhdGVDb250cm9sKGZvcm1BcnJheSk7XG4gICAgZm9ybUFycmF5LmNvbnRyb2xzLmZvckVhY2goZm9ybUNvbnRyb2wgPT4ge1xuICAgICAgdGhpcy5maWVsZHNVdGlscy5jb250cm9sSXRlcmF0b3IoZm9ybUNvbnRyb2wsIHRoaXMuaGFuZGxlRm9ybUFycmF5LCB0aGlzLmhhbmRsZUZvcm1Hcm91cCwgdGhpcy5oYW5kbGVGb3JtQ29udHJvbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHJlYWRvbmx5IGhhbmRsZUZvcm1Hcm91cCA9IChmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApOiB2b2lkID0+IHtcbiAgICB0aGlzLmV2YWx1YXRlQ29udHJvbChmb3JtR3JvdXApO1xuICAgIGxldCBncm91cENvbnRyb2wgPSBmb3JtR3JvdXA7XG4gICAgaWYgKGZvcm1Hcm91cC5nZXQoJ3ZhbHVlJykgJiYgZm9ybUdyb3VwLmdldCgndmFsdWUnKSBpbnN0YW5jZW9mIFVudHlwZWRGb3JtR3JvdXApIHsgLy8gQ29tcGxleCBGaWVsZFxuICAgICAgZ3JvdXBDb250cm9sID0gZm9ybUdyb3VwLmdldCgndmFsdWUnKSBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgIH0gZWxzZSBpZiAoZm9ybUdyb3VwLmNvbnRyb2xzKSB7XG4gICAgICAvLyBTcGVjaWFsIEZpZWxkcyBsaWtlIEFkZHJlc3NVSywgQWRkcmVzc0dsb2JhbFxuICAgICAgZ3JvdXBDb250cm9sID0gZm9ybUdyb3VwO1xuICAgIH1cbiAgICBpZiAoZ3JvdXBDb250cm9sLmNvbnRyb2xzKSB7XG4gICAgICBPYmplY3Qua2V5cyhncm91cENvbnRyb2wuY29udHJvbHMpLmZvckVhY2goY0tleSA9PiB7XG4gICAgICAgIC8vIEVVSS0zMzU5LlxuICAgICAgICAvLyBHZXQgdGhlIGNvbnRyb2wgZnJvbSBncm91cENvbnRyb2wuY29udHJvbHNbY0tleV0gcmF0aGVyIHRoYW5cbiAgICAgICAgLy8gZ3JvdXBDb250cm9sLmdldChjS2V5KSBhcyB0aGUgbGF0dGVyIGRvZXMgcGF0aGluZyBhbmQgd2lsbCBpbnRlcnByZXRcbiAgICAgICAgLy8gZnVsbCBzdG9wcyBpbiBjS2V5IGFzIGRlbGltZXRlcnMgZm9yIGJlaW5nIG5lc3RlZCB3aXRoaW4gYW4gYXJyYXksXG4gICAgICAgIC8vIHdoaWNoIG1ha2VzIG5vIHNlbnNlIGluIHRoaXMgc2l0dWF0aW9uLlxuICAgICAgICBjb25zdCBjb250cm9sID0gZ3JvdXBDb250cm9sLmNvbnRyb2xzW2NLZXldO1xuICAgICAgICB0aGlzLmZpZWxkc1V0aWxzLmNvbnRyb2xJdGVyYXRvcihjb250cm9sLCB0aGlzLmhhbmRsZUZvcm1BcnJheSwgdGhpcy5oYW5kbGVGb3JtR3JvdXAsIHRoaXMuaGFuZGxlRm9ybUNvbnRyb2wpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBldmFsQWxsU2hvd0hpZGVDb25kaXRpb25zKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0Q3VycmVudFBhZ2VzUmVhZE9ubHlBbmRGb3JtRmllbGRWYWx1ZXMoKTtcbiAgICB0aGlzLmZpZWxkc1V0aWxzLmNvbnRyb2xJdGVyYXRvcih0aGlzLmZvcm1Hcm91cCwgdGhpcy5oYW5kbGVGb3JtQXJyYXksIHRoaXMuaGFuZGxlRm9ybUdyb3VwLCB0aGlzLmhhbmRsZUZvcm1Db250cm9sKTtcbiAgfVxuXG4gIHByaXZhdGUgYnVpbGRQYXRoKGM6IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50LCBmaWVsZDogQ2FzZUZpZWxkKTogc3RyaW5nIHtcbiAgICBpZiAoYyAmJiBjIGluc3RhbmNlb2YgQWJzdHJhY3RGaWVsZFdyaXRlQ29tcG9uZW50KSB7XG4gICAgICBpZiAoYy5pZFByZWZpeCkge1xuICAgICAgICByZXR1cm4gYy5pZFByZWZpeCArIGZpZWxkLmlkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGQuaWQ7XG4gIH1cblxuICBwcml2YXRlIGdldEN1cnJlbnRQYWdlc1JlYWRPbmx5QW5kRm9ybUZpZWxkVmFsdWVzKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybUZpZWxkcyA9IHRoaXMuZ2V0Rm9ybUZpZWxkc1ZhbHVlc0luY2x1ZGluZ0Rpc2FibGVkKCk7XG4gICAgdGhpcy5hbGxGaWVsZFZhbHVlcyA9IHRoaXMuZmllbGRzVXRpbHMubWVyZ2VDYXNlRmllbGRzQW5kRm9ybUZpZWxkcyh0aGlzLmNvbnRleHRGaWVsZHMsIGZvcm1GaWVsZHMpO1xuICAgIHJldHVybiB0aGlzLmFsbEZpZWxkVmFsdWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRGb3JtRmllbGRzVmFsdWVzSW5jbHVkaW5nRGlzYWJsZWQoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAuZ2V0UmF3VmFsdWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgdW5zdWJzY3JpYmVGcm9tRm9ybUNoYW5nZXMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZm9ybUNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgIHRoaXMuZm9ybUNoYW5nZXNTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==