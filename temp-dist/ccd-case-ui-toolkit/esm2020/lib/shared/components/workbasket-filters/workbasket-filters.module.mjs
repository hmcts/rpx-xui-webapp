import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ConditionalShowModule } from '../../directives/conditional-show/conditional-show.module';
import { AlertService } from '../../services/alert/alert.service';
import { JurisdictionService } from '../../services/jurisdiction/jurisdiction.service';
import { OrderService } from '../../services/order/order.service';
import { WindowService } from '../../services/window/window.service';
import { WorkbasketInputFilterService } from '../../services/workbasket/workbasket-input-filter.service';
import { PaletteModule } from '../palette/palette.module';
import { WorkbasketFiltersComponent } from './workbasket-filters.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../palette/base-field/field-write.component";
import * as i5 from "../../directives/conditional-show/conditional-show-form.directive";
export class WorkbasketFiltersModule {
}
WorkbasketFiltersModule.ɵfac = function WorkbasketFiltersModule_Factory(t) { return new (t || WorkbasketFiltersModule)(); };
WorkbasketFiltersModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: WorkbasketFiltersModule });
WorkbasketFiltersModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        WorkbasketInputFilterService,
        OrderService,
        JurisdictionService,
        AlertService,
        WindowService,
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        ConditionalShowModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(WorkbasketFiltersModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    PaletteModule,
                    ConditionalShowModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    WorkbasketFiltersComponent,
                ],
                exports: [
                    WorkbasketFiltersComponent,
                ],
                providers: [
                    WorkbasketInputFilterService,
                    OrderService,
                    JurisdictionService,
                    AlertService,
                    WindowService,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(WorkbasketFiltersModule, { declarations: [WorkbasketFiltersComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        ConditionalShowModule, i1.RpxTranslationModule], exports: [WorkbasketFiltersComponent] }); })();
i0.ɵɵsetComponentScope(WorkbasketFiltersComponent, function () { return [i2.NgForOf, i2.NgIf, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.NgModel, i3.NgForm, i3.FormGroupDirective, i4.FieldWriteComponent, i5.ConditionalShowFormDirective]; }, function () { return [i1.RpxTranslatePipe]; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29ya2Jhc2tldC1maWx0ZXJzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy93b3JrYmFza2V0LWZpbHRlcnMvd29ya2Jhc2tldC1maWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDbEcsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGtEQUFrRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNsRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzFELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGdDQUFnQyxDQUFDOzs7Ozs7O0FBd0I1RSxNQUFNLE9BQU8sdUJBQXVCOzs4RkFBdkIsdUJBQXVCO3lFQUF2Qix1QkFBdUI7OEVBUnJCO1FBQ1AsNEJBQTRCO1FBQzVCLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsWUFBWTtRQUNaLGFBQWE7S0FDaEIsWUFuQkcsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLHFCQUFxQjtRQUNyQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBZ0IxQix1QkFBdUI7Y0F2Qm5DLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsT0FBTyxFQUFFO29CQUNMLDBCQUEwQjtpQkFDN0I7Z0JBQ0QsU0FBUyxFQUFFO29CQUNQLDRCQUE0QjtvQkFDNUIsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osYUFBYTtpQkFDaEI7YUFDSjs7d0ZBQ1ksdUJBQXVCLG1CQWI1QiwwQkFBMEIsYUFSMUIsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLHFCQUFxQixzQ0FPckIsMEJBQTBCO3VCQUgxQiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IENvbmRpdGlvbmFsU2hvd01vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY29uZGl0aW9uYWwtc2hvdy9jb25kaXRpb25hbC1zaG93Lm1vZHVsZSc7XG5pbXBvcnQgeyBBbGVydFNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hbGVydC9hbGVydC5zZXJ2aWNlJztcbmltcG9ydCB7IEp1cmlzZGljdGlvblNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9qdXJpc2RpY3Rpb24vanVyaXNkaWN0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgT3JkZXJTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvb3JkZXIvb3JkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFdvcmtiYXNrZXRJbnB1dEZpbHRlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy93b3JrYmFza2V0L3dvcmtiYXNrZXQtaW5wdXQtZmlsdGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgUGFsZXR0ZU1vZHVsZSB9IGZyb20gJy4uL3BhbGV0dGUvcGFsZXR0ZS5tb2R1bGUnO1xuaW1wb3J0IHsgV29ya2Jhc2tldEZpbHRlcnNDb21wb25lbnQgfSBmcm9tICcuL3dvcmtiYXNrZXQtZmlsdGVycy5jb21wb25lbnQnO1xuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIFBhbGV0dGVNb2R1bGUsXG4gICAgICAgIENvbmRpdGlvbmFsU2hvd01vZHVsZSxcbiAgICAgICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFdvcmtiYXNrZXRGaWx0ZXJzQ29tcG9uZW50LFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBXb3JrYmFza2V0RmlsdGVyc0NvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBXb3JrYmFza2V0SW5wdXRGaWx0ZXJTZXJ2aWNlLFxuICAgICAgICBPcmRlclNlcnZpY2UsXG4gICAgICAgIEp1cmlzZGljdGlvblNlcnZpY2UsXG4gICAgICAgIEFsZXJ0U2VydmljZSxcbiAgICAgICAgV2luZG93U2VydmljZSxcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFdvcmtiYXNrZXRGaWx0ZXJzTW9kdWxlIHt9XG4iXX0=