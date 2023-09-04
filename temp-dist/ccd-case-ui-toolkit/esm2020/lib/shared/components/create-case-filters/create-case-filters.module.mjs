import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { DefinitionsModule } from '../../services/definitions/definitions.module';
import { ErrorsModule } from '../error/errors.module';
import { CreateCaseFiltersComponent } from './create-case-filters.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class CreateCaseFiltersModule {
}
CreateCaseFiltersModule.ɵfac = function CreateCaseFiltersModule_Factory(t) { return new (t || CreateCaseFiltersModule)(); };
CreateCaseFiltersModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CreateCaseFiltersModule });
CreateCaseFiltersModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DefinitionsModule,
        ErrorsModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CreateCaseFiltersModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    DefinitionsModule,
                    ErrorsModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    CreateCaseFiltersComponent
                ],
                exports: [
                    CreateCaseFiltersComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CreateCaseFiltersModule, { declarations: [CreateCaseFiltersComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DefinitionsModule,
        ErrorsModule, i1.RpxTranslationModule], exports: [CreateCaseFiltersComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNhc2UtZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY3JlYXRlLWNhc2UtZmlsdGVycy9jcmVhdGUtY2FzZS1maWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDbEYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7QUFtQjdFLE1BQU0sT0FBTyx1QkFBdUI7OzhGQUF2Qix1QkFBdUI7eUVBQXZCLHVCQUF1Qjs2RUFmNUIsWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLFlBQVk7UUFDWixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBVTFCLHVCQUF1QjtjQWpCbkMsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRTtvQkFDTCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixpQkFBaUI7b0JBQ2pCLFlBQVk7b0JBQ1osb0JBQW9CLENBQUMsUUFBUSxFQUFFO2lCQUNsQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1YsMEJBQTBCO2lCQUM3QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wsMEJBQTBCO2lCQUM3QjthQUNKOzt3RkFFWSx1QkFBdUIsbUJBUDVCLDBCQUEwQixhQVIxQixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQjtRQUNuQixpQkFBaUI7UUFDakIsWUFBWSxzQ0FPWiwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IERlZmluaXRpb25zTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZGVmaW5pdGlvbnMvZGVmaW5pdGlvbnMubW9kdWxlJztcbmltcG9ydCB7IEVycm9yc01vZHVsZSB9IGZyb20gJy4uL2Vycm9yL2Vycm9ycy5tb2R1bGUnO1xuaW1wb3J0IHsgQ3JlYXRlQ2FzZUZpbHRlcnNDb21wb25lbnQgfSBmcm9tICcuL2NyZWF0ZS1jYXNlLWZpbHRlcnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIERlZmluaXRpb25zTW9kdWxlLFxuICAgICAgICBFcnJvcnNNb2R1bGUsXG4gICAgICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBDcmVhdGVDYXNlRmlsdGVyc0NvbXBvbmVudFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBDcmVhdGVDYXNlRmlsdGVyc0NvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVDYXNlRmlsdGVyc01vZHVsZSB7fVxuIl19