import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ActivityModule } from '../activity';
import { EventTriggerComponent } from './event-trigger.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class EventTriggerModule {
}
EventTriggerModule.ɵfac = function EventTriggerModule_Factory(t) { return new (t || EventTriggerModule)(); };
EventTriggerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: EventTriggerModule });
EventTriggerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        ReactiveFormsModule,
        ActivityModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventTriggerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    ActivityModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    EventTriggerComponent
                ],
                exports: [
                    EventTriggerComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(EventTriggerModule, { declarations: [EventTriggerComponent], imports: [CommonModule,
        ReactiveFormsModule,
        ActivityModule, i1.RpxTranslationModule], exports: [EventTriggerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtdHJpZ2dlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXZlbnQtdHJpZ2dlci9ldmVudC10cmlnZ2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDJCQUEyQixDQUFDOzs7QUFnQmxFLE1BQU0sT0FBTyxrQkFBa0I7O29GQUFsQixrQkFBa0I7b0VBQWxCLGtCQUFrQjt3RUFaM0IsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixjQUFjO1FBQ2Qsb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQVN0QixrQkFBa0I7Y0FkOUIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsY0FBYztvQkFDZCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7aUJBQ2hDO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7aUJBQ3RCO2FBQ0Y7O3dGQUNZLGtCQUFrQixtQkFOM0IscUJBQXFCLGFBTnJCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsY0FBYyxzQ0FPZCxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuLi9hY3Rpdml0eSc7XG5pbXBvcnQgeyBFdmVudFRyaWdnZXJDb21wb25lbnQgfSBmcm9tICcuL2V2ZW50LXRyaWdnZXIuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIEFjdGl2aXR5TW9kdWxlLFxuICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgRXZlbnRUcmlnZ2VyQ29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBFdmVudFRyaWdnZXJDb21wb25lbnRcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBFdmVudFRyaWdnZXJNb2R1bGUge31cbiJdfQ==