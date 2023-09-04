import { Directive, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AbstractFormFieldComponent } from './abstract-form-field.component';
import { PaletteContext } from './palette-context.enum';
import * as i0 from "@angular/core";
export class AbstractFieldReadComponent extends AbstractFormFieldComponent {
    constructor() {
        super(...arguments);
        /**
         * Optional. Enable context-aware rendering of fields.
         */
        this.context = PaletteContext.DEFAULT;
    }
    ngOnInit() {
        if (!this.caseField.metadata) {
            this.registerControl(new FormControl(this.caseField.value));
        }
    }
}
AbstractFieldReadComponent.ɵfac = /*@__PURE__*/ function () { let ɵAbstractFieldReadComponent_BaseFactory; return function AbstractFieldReadComponent_Factory(t) { return (ɵAbstractFieldReadComponent_BaseFactory || (ɵAbstractFieldReadComponent_BaseFactory = i0.ɵɵgetInheritedFactory(AbstractFieldReadComponent)))(t || AbstractFieldReadComponent); }; }();
AbstractFieldReadComponent.ɵdir = /*@__PURE__*/ i0.ɵɵdefineDirective({ type: AbstractFieldReadComponent, inputs: { caseReference: "caseReference", topLevelFormGroup: "topLevelFormGroup", context: "context" }, features: [i0.ɵɵInheritDefinitionFeature] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AbstractFieldReadComponent, [{
        type: Directive
    }], null, { caseReference: [{
            type: Input
        }], topLevelFormGroup: [{
            type: Input
        }], context: [{
            type: Input
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWJzdHJhY3QtZmllbGQtcmVhZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFsZXR0ZS9iYXNlLWZpZWxkL2Fic3RyYWN0LWZpZWxkLXJlYWQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBbUIsV0FBVyxFQUFvQixNQUFNLGdCQUFnQixDQUFDO0FBRWhGLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFHeEQsTUFBTSxPQUFnQiwwQkFBMkIsU0FBUSwwQkFBMEI7SUFEbkY7O1FBU0U7O1dBRUc7UUFFSSxZQUFPLEdBQW1CLGNBQWMsQ0FBQyxPQUFPLENBQUM7S0FPekQ7SUFMUSxRQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQzs7MFJBbEJtQiwwQkFBMEIsU0FBMUIsMEJBQTBCOzZFQUExQiwwQkFBMEI7dUZBQTFCLDBCQUEwQjtjQUQvQyxTQUFTO2dCQUlELGFBQWE7a0JBRG5CLEtBQUs7WUFJQyxpQkFBaUI7a0JBRHZCLEtBQUs7WUFPQyxPQUFPO2tCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIElucHV0LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIFVudHlwZWRGb3JtR3JvdXAgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5cbmltcG9ydCB7IEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IH0gZnJvbSAnLi9hYnN0cmFjdC1mb3JtLWZpZWxkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWxldHRlQ29udGV4dCB9IGZyb20gJy4vcGFsZXR0ZS1jb250ZXh0LmVudW0nO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBYnN0cmFjdEZpZWxkUmVhZENvbXBvbmVudCBleHRlbmRzIEFic3RyYWN0Rm9ybUZpZWxkQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKVxuICBwdWJsaWMgY2FzZVJlZmVyZW5jZTogc3RyaW5nO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyB0b3BMZXZlbEZvcm1Hcm91cDogVW50eXBlZEZvcm1Hcm91cCB8IEFic3RyYWN0Q29udHJvbDtcblxuICAvKipcbiAgICogT3B0aW9uYWwuIEVuYWJsZSBjb250ZXh0LWF3YXJlIHJlbmRlcmluZyBvZiBmaWVsZHMuXG4gICAqL1xuICBASW5wdXQoKVxuICBwdWJsaWMgY29udGV4dDogUGFsZXR0ZUNvbnRleHQgPSBQYWxldHRlQ29udGV4dC5ERUZBVUxUO1xuXG4gIHB1YmxpYyBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuY2FzZUZpZWxkLm1ldGFkYXRhKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVyQ29udHJvbChuZXcgRm9ybUNvbnRyb2wodGhpcy5jYXNlRmllbGQudmFsdWUpKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==