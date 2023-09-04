import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { AlertService, DefinitionsModule, JurisdictionService, OrderService, WindowService, WorkbasketInputFilterService } from '../../services';
import { PaletteModule } from '../palette';
import { WorkbasketFiltersModule } from '../workbasket-filters';
import { CaseListFiltersComponent } from './case-list-filters.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "../workbasket-filters/workbasket-filters.component";
export class CaseListFiltersModule {
}
CaseListFiltersModule.ɵfac = function CaseListFiltersModule_Factory(t) { return new (t || CaseListFiltersModule)(); };
CaseListFiltersModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CaseListFiltersModule });
CaseListFiltersModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        WorkbasketInputFilterService,
        OrderService,
        JurisdictionService,
        AlertService,
        WindowService
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        DefinitionsModule,
        WorkbasketFiltersModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseListFiltersModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    PaletteModule,
                    DefinitionsModule,
                    WorkbasketFiltersModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    CaseListFiltersComponent,
                ],
                exports: [
                    CaseListFiltersComponent,
                ],
                providers: [
                    WorkbasketInputFilterService,
                    OrderService,
                    JurisdictionService,
                    AlertService,
                    WindowService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CaseListFiltersModule, { declarations: [CaseListFiltersComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        DefinitionsModule,
        WorkbasketFiltersModule, i1.RpxTranslationModule], exports: [CaseListFiltersComponent] }); })();
i0.ɵɵsetComponentScope(CaseListFiltersComponent, function () { return [i2.NgIf, i3.WorkbasketFiltersComponent]; }, []);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1saXN0LWZpbHRlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2UtbGlzdC1maWx0ZXJzL2Nhc2UtbGlzdC1maWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUN0Riw0QkFBNEIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7O0FBMEJ6RSxNQUFNLE9BQU8scUJBQXFCOzswRkFBckIscUJBQXFCO3VFQUFyQixxQkFBcUI7NEVBUm5CO1FBQ1AsNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGFBQWE7S0FDaEIsWUFwQkcsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQix1QkFBdUI7UUFDdkIsb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQWdCMUIscUJBQXFCO2NBeEJqQyxRQUFRO2VBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLGFBQWE7b0JBQ2IsaUJBQWlCO29CQUNqQix1QkFBdUI7b0JBQ3ZCLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHdCQUF3QjtpQkFDM0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLHdCQUF3QjtpQkFDM0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLDRCQUE0QjtvQkFDNUIsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osYUFBYTtpQkFDaEI7YUFDSjs7d0ZBQ1kscUJBQXFCLG1CQWIxQix3QkFBd0IsYUFUeEIsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLGlCQUFpQjtRQUNqQix1QkFBdUIsc0NBT3ZCLHdCQUF3Qjt1QkFIeEIsd0JBQXdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UsIERlZmluaXRpb25zTW9kdWxlLCBKdXJpc2RpY3Rpb25TZXJ2aWNlLCBPcmRlclNlcnZpY2UsIFdpbmRvd1NlcnZpY2UsXG4gICAgV29ya2Jhc2tldElucHV0RmlsdGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzJztcbmltcG9ydCB7IFBhbGV0dGVNb2R1bGUgfSBmcm9tICcuLi9wYWxldHRlJztcbmltcG9ydCB7IFdvcmtiYXNrZXRGaWx0ZXJzTW9kdWxlIH0gZnJvbSAnLi4vd29ya2Jhc2tldC1maWx0ZXJzJztcbmltcG9ydCB7IENhc2VMaXN0RmlsdGVyc0NvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1saXN0LWZpbHRlcnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIFBhbGV0dGVNb2R1bGUsXG4gICAgICAgIERlZmluaXRpb25zTW9kdWxlLFxuICAgICAgICBXb3JrYmFza2V0RmlsdGVyc01vZHVsZSxcbiAgICAgICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIENhc2VMaXN0RmlsdGVyc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2FzZUxpc3RGaWx0ZXJzQ29tcG9uZW50LFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFdvcmtiYXNrZXRJbnB1dEZpbHRlclNlcnZpY2UsXG4gICAgICAgIE9yZGVyU2VydmljZSxcbiAgICAgICAgSnVyaXNkaWN0aW9uU2VydmljZSxcbiAgICAgICAgQWxlcnRTZXJ2aWNlLFxuICAgICAgICBXaW5kb3dTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlTGlzdEZpbHRlcnNNb2R1bGUge31cbiJdfQ==