import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxPaginationModule, PaginatePipe } from 'ngx-pagination';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { PaginationComponent } from './pagination.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class PaginationModule {
}
PaginationModule.ɵfac = function PaginationModule_Factory(t) { return new (t || PaginationModule)(); };
PaginationModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PaginationModule });
PaginationModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        NgxPaginationModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PaginationModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    NgxPaginationModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    PaginationComponent
                ],
                exports: [
                    PaginationComponent,
                    PaginatePipe
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PaginationModule, { declarations: [PaginationComponent], imports: [CommonModule,
        NgxPaginationModule, i1.RpxTranslationModule], exports: [PaginationComponent,
        PaginatePipe] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7OztBQWdCN0QsTUFBTSxPQUFPLGdCQUFnQjs7Z0ZBQWhCLGdCQUFnQjtrRUFBaEIsZ0JBQWdCO3NFQVp6QixZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLG9CQUFvQixDQUFDLFFBQVEsRUFBRTt1RkFVdEIsZ0JBQWdCO2NBZDVCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLG1CQUFtQjtpQkFDcEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLG1CQUFtQjtvQkFDbkIsWUFBWTtpQkFDYjthQUNGOzt3RkFDWSxnQkFBZ0IsbUJBUHpCLG1CQUFtQixhQUxuQixZQUFZO1FBQ1osbUJBQW1CLHNDQU9uQixtQkFBbUI7UUFDbkIsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSwgUGFnaW5hdGVQaXBlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IFBhZ2luYXRpb25Db21wb25lbnQgfSBmcm9tICcuL3BhZ2luYXRpb24uY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxuICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgUGFnaW5hdGlvbkNvbXBvbmVudFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgUGFnaW5hdGlvbkNvbXBvbmVudCxcbiAgICBQYWdpbmF0ZVBpcGVcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdGlvbk1vZHVsZSB7fVxuIl19