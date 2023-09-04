import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ConditionalShowModule, LabelSubstitutorModule } from '../../directives';
import { CaseHeaderModule } from '../case-header/case-header.module';
import { PaletteModule } from '../palette';
import { CaseHistoryComponent } from './case-history.component';
import { CaseHistoryService } from './services/case-history.service';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "../case-header/case-header.component";
import * as i4 from "../palette/base-field/field-read.component";
import * as i5 from "../../directives/substitutor/label-substitutor.directive";
import * as i6 from "../palette/utils/date.pipe";
import * as i7 from "../palette/utils/is-compound.pipe";
import * as i8 from "../palette/utils/dash.pipe";
import * as i9 from "../../pipes/complex/ccd-read-fields-filter.pipe";
import * as i10 from "../../pipes/complex/ccd-tab-fields.pipe";
export class CaseHistoryModule {
}
CaseHistoryModule.ɵfac = function CaseHistoryModule_Factory(t) { return new (t || CaseHistoryModule)(); };
CaseHistoryModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CaseHistoryModule });
CaseHistoryModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        CaseHistoryService,
    ], imports: [CommonModule,
        RouterModule,
        CaseHeaderModule,
        ConditionalShowModule,
        PaletteModule,
        LabelSubstitutorModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseHistoryModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    CaseHeaderModule,
                    ConditionalShowModule,
                    PaletteModule,
                    LabelSubstitutorModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    CaseHistoryComponent
                ],
                providers: [
                    CaseHistoryService,
                ],
                exports: [
                    CaseHistoryComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CaseHistoryModule, { declarations: [CaseHistoryComponent], imports: [CommonModule,
        RouterModule,
        CaseHeaderModule,
        ConditionalShowModule,
        PaletteModule,
        LabelSubstitutorModule, i1.RpxTranslationModule], exports: [CaseHistoryComponent] }); })();
i0.ɵɵsetComponentScope(CaseHistoryComponent, function () { return [i2.NgForOf, i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i3.CaseHeaderComponent, i4.FieldReadComponent, i5.LabelSubstitutorDirective]; }, function () { return [i2.UpperCasePipe, i2.TitleCasePipe, i6.DatePipe, i7.IsCompoundPipe, i8.DashPipe, i9.ReadFieldsFilterPipe, i10.CcdTabFieldsPipe, i1.RpxTranslatePipe]; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS1oaXN0b3J5Lm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9jYXNlLWhpc3RvcnkvY2FzZS1oaXN0b3J5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUMzQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNoRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FBdUJyRSxNQUFNLE9BQU8saUJBQWlCOztrRkFBakIsaUJBQWlCO21FQUFqQixpQkFBaUI7d0VBUGY7UUFDUCxrQkFBa0I7S0FDckIsWUFkRyxZQUFZO1FBQ1osWUFBWTtRQUNaLGdCQUFnQjtRQUNoQixxQkFBcUI7UUFDckIsYUFBYTtRQUNiLHNCQUFzQjtRQUN0QixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBYTFCLGlCQUFpQjtjQXJCN0IsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFlBQVk7b0JBQ1osZ0JBQWdCO29CQUNoQixxQkFBcUI7b0JBQ3JCLGFBQWE7b0JBQ2Isc0JBQXNCO29CQUN0QixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7aUJBRWxDO2dCQUNELFlBQVksRUFBRTtvQkFDVixvQkFBb0I7aUJBQ3ZCO2dCQUNELFNBQVMsRUFBRTtvQkFDUCxrQkFBa0I7aUJBQ3JCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxvQkFBb0I7aUJBQ3ZCO2FBQ0o7O3dGQUNZLGlCQUFpQixtQkFUdEIsb0JBQW9CLGFBVnBCLFlBQVk7UUFDWixZQUFZO1FBQ1osZ0JBQWdCO1FBQ2hCLHFCQUFxQjtRQUNyQixhQUFhO1FBQ2Isc0JBQXNCLHNDQVd0QixvQkFBb0I7dUJBTnBCLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBDb25kaXRpb25hbFNob3dNb2R1bGUsIExhYmVsU3Vic3RpdHV0b3JNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzJztcbmltcG9ydCB7IENhc2VIZWFkZXJNb2R1bGUgfSBmcm9tICcuLi9jYXNlLWhlYWRlci9jYXNlLWhlYWRlci5tb2R1bGUnO1xuaW1wb3J0IHsgUGFsZXR0ZU1vZHVsZSB9IGZyb20gJy4uL3BhbGV0dGUnO1xuaW1wb3J0IHsgQ2FzZUhpc3RvcnlDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtaGlzdG9yeS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUhpc3RvcnlTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9jYXNlLWhpc3Rvcnkuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgQ2FzZUhlYWRlck1vZHVsZSxcbiAgICAgICAgQ29uZGl0aW9uYWxTaG93TW9kdWxlLFxuICAgICAgICBQYWxldHRlTW9kdWxlLFxuICAgICAgICBMYWJlbFN1YnN0aXR1dG9yTW9kdWxlLFxuICAgICAgICBScHhUcmFuc2xhdGlvbk1vZHVsZS5mb3JDaGlsZCgpXG5cbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDYXNlSGlzdG9yeUNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIENhc2VIaXN0b3J5U2VydmljZSxcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgQ2FzZUhpc3RvcnlDb21wb25lbnQsXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBDYXNlSGlzdG9yeU1vZHVsZSB7fVxuIl19