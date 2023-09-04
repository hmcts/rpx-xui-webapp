import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { LabelSubstitutorModule } from '../../directives/substitutor/label-substitutor.module';
import { PipesModule } from '../../pipes/pipes.module';
import { BrowserService } from '../../services/browser/browser.service';
import { SearchResultViewItemComparatorFactory } from '../../services/search-result/sorting/search-result-view-item-comparator-factory';
import { ActivityModule } from '../activity/activity.module';
import { PaginationModule } from '../pagination/pagination.module';
import { PaletteModule } from '../palette/palette.module';
import { SearchResultComponent } from './search-result.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "@angular/router";
import * as i4 from "../../directives/substitutor/label-substitutor.directive";
import * as i5 from "../activity/activity.component";
import * as i6 from "../pagination/pagination.component";
import * as i7 from "../palette/base-field/field-read.component";
import * as i8 from "ngx-pagination";
import * as i9 from "../../pipes/case-reference/case-reference.pipe";
import * as i10 from "../../pipes/search-result/sorting/sort-search-result.pipe";
export class SearchResultModule {
}
SearchResultModule.ɵfac = function SearchResultModule_Factory(t) { return new (t || SearchResultModule)(); };
SearchResultModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SearchResultModule });
SearchResultModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        SearchResultViewItemComparatorFactory,
        BrowserService
    ], imports: [CommonModule,
        NgxPaginationModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        LabelSubstitutorModule,
        PipesModule,
        ActivityModule,
        PaginationModule,
        RpxTranslationModule.forChild(),
        PaletteModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchResultModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    NgxPaginationModule,
                    RouterModule,
                    FormsModule,
                    ReactiveFormsModule,
                    LabelSubstitutorModule,
                    PipesModule,
                    ActivityModule,
                    PaginationModule,
                    RpxTranslationModule.forChild(),
                    PaletteModule
                ],
                declarations: [
                    SearchResultComponent
                ],
                exports: [
                    SearchResultComponent,
                ],
                providers: [
                    SearchResultViewItemComparatorFactory,
                    BrowserService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SearchResultModule, { declarations: [SearchResultComponent], imports: [CommonModule,
        NgxPaginationModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        LabelSubstitutorModule,
        PipesModule,
        ActivityModule,
        PaginationModule, i1.RpxTranslationModule, PaletteModule], exports: [SearchResultComponent] }); })();
i0.ɵɵsetComponentScope(SearchResultComponent, function () { return [i2.NgForOf, i2.NgIf, i3.RouterLink, i4.LabelSubstitutorDirective, i5.ActivityComponent, i6.PaginationComponent, i7.FieldReadComponent]; }, function () { return [i2.DecimalPipe, i8.PaginatePipe, i9.CaseReferencePipe, i10.SortSearchResultPipe, i1.RpxTranslatePipe]; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLXJlc3VsdC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvc2VhcmNoLXJlc3VsdC9zZWFyY2gtcmVzdWx0Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLHVEQUF1RCxDQUFDO0FBQy9GLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDeEUsT0FBTyxFQUFFLHFDQUFxQyxFQUFFLE1BQU0saUZBQWlGLENBQUM7QUFDeEksT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzdELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMxRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7Ozs7Ozs7Ozs7O0FBMkJsRSxNQUFNLE9BQU8sa0JBQWtCOztvRkFBbEIsa0JBQWtCO29FQUFsQixrQkFBa0I7eUVBTGxCO1FBQ1QscUNBQXFDO1FBQ3JDLGNBQWM7S0FDZixZQXJCQyxZQUFZO1FBQ1osbUJBQW1CO1FBQ25CLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLHNCQUFzQjtRQUN0QixXQUFXO1FBQ1gsY0FBYztRQUNkLGdCQUFnQjtRQUNoQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7UUFDL0IsYUFBYTt1RkFhSixrQkFBa0I7Y0F6QjlCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixtQkFBbUI7b0JBQ25CLFlBQVk7b0JBQ1osV0FBVztvQkFDWCxtQkFBbUI7b0JBQ25CLHNCQUFzQjtvQkFDdEIsV0FBVztvQkFDWCxjQUFjO29CQUNkLGdCQUFnQjtvQkFDaEIsb0JBQW9CLENBQUMsUUFBUSxFQUFFO29CQUMvQixhQUFhO2lCQUNkO2dCQUNELFlBQVksRUFBRTtvQkFDWixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxxQkFBcUI7aUJBQ3RCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxxQ0FBcUM7b0JBQ3JDLGNBQWM7aUJBQ2Y7YUFDRjs7d0ZBQ1ksa0JBQWtCLG1CQVYzQixxQkFBcUIsYUFickIsWUFBWTtRQUNaLG1CQUFtQjtRQUNuQixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixzQkFBc0I7UUFDdEIsV0FBVztRQUNYLGNBQWM7UUFDZCxnQkFBZ0IsMkJBRWhCLGFBQWEsYUFNYixxQkFBcUI7dUJBSHJCLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgTmd4UGFnaW5hdGlvbk1vZHVsZSB9IGZyb20gJ25neC1wYWdpbmF0aW9uJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBMYWJlbFN1YnN0aXR1dG9yTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9zdWJzdGl0dXRvci9sYWJlbC1zdWJzdGl0dXRvci5tb2R1bGUnO1xuaW1wb3J0IHsgUGlwZXNNb2R1bGUgfSBmcm9tICcuLi8uLi9waXBlcy9waXBlcy5tb2R1bGUnO1xuaW1wb3J0IHsgQnJvd3NlclNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9icm93c2VyL2Jyb3dzZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRWaWV3SXRlbUNvbXBhcmF0b3JGYWN0b3J5IH0gZnJvbSAnLi4vLi4vc2VydmljZXMvc2VhcmNoLXJlc3VsdC9zb3J0aW5nL3NlYXJjaC1yZXN1bHQtdmlldy1pdGVtLWNvbXBhcmF0b3ItZmFjdG9yeSc7XG5pbXBvcnQgeyBBY3Rpdml0eU1vZHVsZSB9IGZyb20gJy4uL2FjdGl2aXR5L2FjdGl2aXR5Lm1vZHVsZSc7XG5pbXBvcnQgeyBQYWdpbmF0aW9uTW9kdWxlIH0gZnJvbSAnLi4vcGFnaW5hdGlvbi9wYWdpbmF0aW9uLm1vZHVsZSc7XG5pbXBvcnQgeyBQYWxldHRlTW9kdWxlIH0gZnJvbSAnLi4vcGFsZXR0ZS9wYWxldHRlLm1vZHVsZSc7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1yZXN1bHQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBOZ3hQYWdpbmF0aW9uTW9kdWxlLFxuICAgIFJvdXRlck1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgIExhYmVsU3Vic3RpdHV0b3JNb2R1bGUsXG4gICAgUGlwZXNNb2R1bGUsXG4gICAgQWN0aXZpdHlNb2R1bGUsXG4gICAgUGFnaW5hdGlvbk1vZHVsZSxcbiAgICBScHhUcmFuc2xhdGlvbk1vZHVsZS5mb3JDaGlsZCgpLFxuICAgIFBhbGV0dGVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2VhcmNoUmVzdWx0Q29tcG9uZW50XG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTZWFyY2hSZXN1bHRDb21wb25lbnQsXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIFNlYXJjaFJlc3VsdFZpZXdJdGVtQ29tcGFyYXRvckZhY3RvcnksXG4gICAgQnJvd3NlclNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hSZXN1bHRNb2R1bGUge31cbiJdfQ==