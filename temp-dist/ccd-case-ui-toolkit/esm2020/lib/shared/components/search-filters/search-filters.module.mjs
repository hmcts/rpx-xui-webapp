import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ConditionalShowModule } from '../../directives/conditional-show/conditional-show.module';
import { DefinitionsService } from '../../services/definitions/definitions.service';
import { JurisdictionService } from '../../services/jurisdiction/jurisdiction.service';
import { OrderService } from '../../services/order/order.service';
import { SearchService } from '../../services/search/search.service';
import { WindowService } from '../../services/window/window.service';
import { PaletteModule } from '../palette/palette.module';
import { SearchFiltersWrapperComponent } from './search-filters-wrapper.component';
import { SearchFiltersComponent } from './search-filters.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "@angular/forms";
import * as i4 from "../palette/base-field/field-write.component";
import * as i5 from "../../directives/conditional-show/conditional-show-form.directive";
export class SearchFiltersModule {
}
SearchFiltersModule.ɵfac = function SearchFiltersModule_Factory(t) { return new (t || SearchFiltersModule)(); };
SearchFiltersModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: SearchFiltersModule });
SearchFiltersModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        SearchService,
        OrderService,
        JurisdictionService,
        DefinitionsService,
        WindowService
    ], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        ConditionalShowModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SearchFiltersModule, [{
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
                    SearchFiltersComponent,
                    SearchFiltersWrapperComponent
                ],
                exports: [
                    SearchFiltersWrapperComponent
                ],
                providers: [
                    SearchService,
                    OrderService,
                    JurisdictionService,
                    DefinitionsService,
                    WindowService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(SearchFiltersModule, { declarations: [SearchFiltersComponent,
        SearchFiltersWrapperComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaletteModule,
        ConditionalShowModule, i1.RpxTranslationModule], exports: [SearchFiltersWrapperComponent] }); })();
i0.ɵɵsetComponentScope(SearchFiltersComponent, function () { return [i2.NgForOf, i2.NgIf, i3.ɵNgNoValidate, i3.NgSelectOption, i3.ɵNgSelectMultipleOption, i3.SelectControlValueAccessor, i3.NgControlStatus, i3.NgControlStatusGroup, i3.NgModel, i3.NgForm, i3.FormGroupDirective, i4.FieldWriteComponent, i5.ConditionalShowFormDirective]; }, function () { return [i1.RpxTranslatePipe]; });
i0.ɵɵsetComponentScope(SearchFiltersWrapperComponent, function () { return [i2.NgIf, SearchFiltersComponent]; }, []);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWZpbHRlcnMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL3NlYXJjaC1maWx0ZXJzL3NlYXJjaC1maWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkRBQTJELENBQUM7QUFDbEcsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDdkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDckUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRTFELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDOzs7Ozs7O0FBMEJwRSxNQUFNLE9BQU8sbUJBQW1COztzRkFBbkIsbUJBQW1CO3FFQUFuQixtQkFBbUI7MEVBUmpCO1FBQ1AsYUFBYTtRQUNiLFlBQVk7UUFDWixtQkFBbUI7UUFDbkIsa0JBQWtCO1FBQ2xCLGFBQWE7S0FDaEIsWUFwQkcsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLHFCQUFxQjtRQUNyQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBaUIxQixtQkFBbUI7Y0F4Qi9CLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixXQUFXO29CQUNYLG1CQUFtQjtvQkFDbkIsYUFBYTtvQkFDYixxQkFBcUI7b0JBQ3JCLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLHNCQUFzQjtvQkFDdEIsNkJBQTZCO2lCQUNoQztnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsNkJBQTZCO2lCQUNoQztnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixZQUFZO29CQUNaLG1CQUFtQjtvQkFDbkIsa0JBQWtCO29CQUNsQixhQUFhO2lCQUNoQjthQUNKOzt3RkFDWSxtQkFBbUIsbUJBZHhCLHNCQUFzQjtRQUN0Qiw2QkFBNkIsYUFUN0IsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsYUFBYTtRQUNiLHFCQUFxQixzQ0FRckIsNkJBQTZCO3VCQUo3QixzQkFBc0I7dUJBQ3RCLDZCQUE2QixpQ0FEN0Isc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBDb25kaXRpb25hbFNob3dNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2NvbmRpdGlvbmFsLXNob3cvY29uZGl0aW9uYWwtc2hvdy5tb2R1bGUnO1xuaW1wb3J0IHsgRGVmaW5pdGlvbnNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGVmaW5pdGlvbnMvZGVmaW5pdGlvbnMuc2VydmljZSc7XG5pbXBvcnQgeyBKdXJpc2RpY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvanVyaXNkaWN0aW9uL2p1cmlzZGljdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IE9yZGVyU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL29yZGVyL29yZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2VhcmNoU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3NlYXJjaC9zZWFyY2guc2VydmljZSc7XG5pbXBvcnQgeyBXaW5kb3dTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvd2luZG93L3dpbmRvdy5zZXJ2aWNlJztcbmltcG9ydCB7IFBhbGV0dGVNb2R1bGUgfSBmcm9tICcuLi9wYWxldHRlL3BhbGV0dGUubW9kdWxlJztcblxuaW1wb3J0IHsgU2VhcmNoRmlsdGVyc1dyYXBwZXJDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXJzLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFNlYXJjaEZpbHRlcnNDb21wb25lbnQgfSBmcm9tICcuL3NlYXJjaC1maWx0ZXJzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBSZWFjdGl2ZUZvcm1zTW9kdWxlLFxuICAgICAgICBQYWxldHRlTW9kdWxlLFxuICAgICAgICBDb25kaXRpb25hbFNob3dNb2R1bGUsXG4gICAgICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBTZWFyY2hGaWx0ZXJzQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hGaWx0ZXJzV3JhcHBlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBTZWFyY2hGaWx0ZXJzV3JhcHBlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIE9yZGVyU2VydmljZSxcbiAgICAgICAgSnVyaXNkaWN0aW9uU2VydmljZSxcbiAgICAgICAgRGVmaW5pdGlvbnNTZXJ2aWNlLFxuICAgICAgICBXaW5kb3dTZXJ2aWNlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBTZWFyY2hGaWx0ZXJzTW9kdWxlIHt9XG4iXX0=