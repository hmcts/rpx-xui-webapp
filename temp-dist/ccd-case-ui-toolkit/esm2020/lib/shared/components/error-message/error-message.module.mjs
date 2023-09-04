import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ActivityModule } from '../activity';
import { ErrorMessageComponent } from './error-message.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class EventMessageModule {
}
EventMessageModule.ɵfac = function EventMessageModule_Factory(t) { return new (t || EventMessageModule)(); };
EventMessageModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: EventMessageModule });
EventMessageModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ActivityModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventMessageModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ReactiveFormsModule,
                    RouterModule,
                    ActivityModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    ErrorMessageComponent
                ],
                exports: [
                    ErrorMessageComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(EventMessageModule, { declarations: [ErrorMessageComponent], imports: [CommonModule,
        ReactiveFormsModule,
        RouterModule,
        ActivityModule, i1.RpxTranslationModule], exports: [ErrorMessageComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3ItbWVzc2FnZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZXJyb3ItbWVzc2FnZS9lcnJvci1tZXNzYWdlLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM3QyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7O0FBaUJsRSxNQUFNLE9BQU8sa0JBQWtCOztvRkFBbEIsa0JBQWtCO29FQUFsQixrQkFBa0I7d0VBYjNCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGNBQWM7UUFDZCxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBU3RCLGtCQUFrQjtjQWY5QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osbUJBQW1CO29CQUNuQixZQUFZO29CQUNaLGNBQWM7b0JBQ2Qsb0JBQW9CLENBQUMsUUFBUSxFQUFFO2lCQUNoQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1oscUJBQXFCO2lCQUN0QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AscUJBQXFCO2lCQUN0QjthQUNGOzt3RkFDWSxrQkFBa0IsbUJBTjNCLHFCQUFxQixhQVByQixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixjQUFjLHNDQU9kLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuLi9hY3Rpdml0eSc7XG5pbXBvcnQgeyBFcnJvck1lc3NhZ2VDb21wb25lbnQgfSBmcm9tICcuL2Vycm9yLW1lc3NhZ2UuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBBY3Rpdml0eU1vZHVsZSxcbiAgICBScHhUcmFuc2xhdGlvbk1vZHVsZS5mb3JDaGlsZCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEVycm9yTWVzc2FnZUNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRXJyb3JNZXNzYWdlQ29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRNZXNzYWdlTW9kdWxlIHt9XG4iXX0=