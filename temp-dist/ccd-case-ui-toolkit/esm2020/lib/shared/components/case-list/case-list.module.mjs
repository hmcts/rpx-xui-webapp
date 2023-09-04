import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { BrowserService } from '../../services';
import { PaginationModule } from '../pagination/pagination.module';
import { CaseListComponent } from './case-list.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class CaseListModule {
}
CaseListModule.ɵfac = function CaseListModule_Factory(t) { return new (t || CaseListModule)(); };
CaseListModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CaseListModule });
CaseListModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        BrowserService
    ], imports: [CommonModule,
        FormsModule,
        RouterModule,
        NgxPaginationModule,
        PaginationModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseListModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    RouterModule,
                    NgxPaginationModule,
                    PaginationModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [CaseListComponent],
                exports: [CaseListComponent],
                providers: [
                    BrowserService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CaseListModule, { declarations: [CaseListComponent], imports: [CommonModule,
        FormsModule,
        RouterModule,
        NgxPaginationModule,
        PaginationModule, i1.RpxTranslationModule], exports: [CaseListComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1saXN0Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWxpc3QvY2FzZS1saXN0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQzs7O0FBaUIxRCxNQUFNLE9BQU8sY0FBYzs7NEVBQWQsY0FBYztnRUFBZCxjQUFjO3FFQUpkO1FBQ1QsY0FBYztLQUNmLFlBWEMsWUFBWTtRQUNaLFdBQVc7UUFDWCxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBUXRCLGNBQWM7Y0FmMUIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLGdCQUFnQjtvQkFDaEIsb0JBQW9CLENBQUMsUUFBUSxFQUFFO2lCQUNoQztnQkFDRCxZQUFZLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDakMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLENBQUM7Z0JBQzVCLFNBQVMsRUFBRTtvQkFDVCxjQUFjO2lCQUNmO2FBQ0Y7O3dGQUNZLGNBQWMsbUJBTlYsaUJBQWlCLGFBUDlCLFlBQVk7UUFDWixXQUFXO1FBQ1gsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixnQkFBZ0Isc0NBSVIsaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBOZ3hQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnbmd4LXBhZ2luYXRpb24nO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IEJyb3dzZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgUGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJy4uL3BhZ2luYXRpb24vcGFnaW5hdGlvbi5tb2R1bGUnO1xuaW1wb3J0IHsgQ2FzZUxpc3RDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtbGlzdC5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxuICAgIFBhZ2luYXRpb25Nb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtDYXNlTGlzdENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtDYXNlTGlzdENvbXBvbmVudF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEJyb3dzZXJTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZUxpc3RNb2R1bGUgeyB9XG4iXX0=