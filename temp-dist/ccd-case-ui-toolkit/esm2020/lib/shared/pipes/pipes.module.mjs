import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CaseReferencePipe } from './case-reference';
import { CcdCaseTitlePipe } from './case-title';
import { CcdCollectionTableCaseFieldsFilterPipe, CcdCYAPageLabelFilterPipe, CcdPageFieldsPipe, CcdTabFieldsPipe, ReadFieldsFilterPipe } from './complex';
import { LinkCasesFromReasonValuePipe } from './link-cases-from-reason-code/ccd-link-cases-from-reason-code.pipe';
import { LinkCasesReasonValuePipe } from './link-cases-reason-code/ccd-link-cases-reason-code.pipe';
import { SortSearchResultPipe } from './search-result/sorting/sort-search-result.pipe';
import * as i0 from "@angular/core";
const pipeDeclarations = [
    CaseReferencePipe,
    SortSearchResultPipe,
    CcdCaseTitlePipe,
    CcdCollectionTableCaseFieldsFilterPipe,
    CcdCYAPageLabelFilterPipe,
    ReadFieldsFilterPipe,
    CcdTabFieldsPipe,
    CcdPageFieldsPipe,
    LinkCasesReasonValuePipe,
    LinkCasesFromReasonValuePipe
];
export class PipesModule {
}
PipesModule.ɵfac = function PipesModule_Factory(t) { return new (t || PipesModule)(); };
PipesModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: PipesModule });
PipesModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(PipesModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                ],
                declarations: [
                    ...pipeDeclarations
                ],
                exports: [
                    ...pipeDeclarations
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(PipesModule, { declarations: [CaseReferencePipe,
        SortSearchResultPipe,
        CcdCaseTitlePipe,
        CcdCollectionTableCaseFieldsFilterPipe,
        CcdCYAPageLabelFilterPipe,
        ReadFieldsFilterPipe,
        CcdTabFieldsPipe,
        CcdPageFieldsPipe,
        LinkCasesReasonValuePipe,
        LinkCasesFromReasonValuePipe], imports: [CommonModule], exports: [CaseReferencePipe,
        SortSearchResultPipe,
        CcdCaseTitlePipe,
        CcdCollectionTableCaseFieldsFilterPipe,
        CcdCYAPageLabelFilterPipe,
        ReadFieldsFilterPipe,
        CcdTabFieldsPipe,
        CcdPageFieldsPipe,
        LinkCasesReasonValuePipe,
        LinkCasesFromReasonValuePipe] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9waXBlcy9waXBlcy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDckQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ2hELE9BQU8sRUFBRSxzQ0FBc0MsRUFBRSx5QkFBeUIsRUFBRSxpQkFBaUIsRUFBRSxnQkFBZ0IsRUFBRSxvQkFBb0IsRUFBRSxNQUFNLFdBQVcsQ0FBQztBQUN6SixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxvRUFBb0UsQ0FBQztBQUNsSCxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSwwREFBMEQsQ0FBQztBQUNwRyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxpREFBaUQsQ0FBQzs7QUFFdkYsTUFBTSxnQkFBZ0IsR0FBRztJQUN2QixpQkFBaUI7SUFDakIsb0JBQW9CO0lBQ3BCLGdCQUFnQjtJQUNoQixzQ0FBc0M7SUFDdEMseUJBQXlCO0lBQ3pCLG9CQUFvQjtJQUNwQixnQkFBZ0I7SUFDaEIsaUJBQWlCO0lBQ2pCLHdCQUF3QjtJQUN4Qiw0QkFBNEI7Q0FDN0IsQ0FBQztBQWFGLE1BQU0sT0FBTyxXQUFXOztzRUFBWCxXQUFXOzZEQUFYLFdBQVc7aUVBVHBCLFlBQVk7dUZBU0gsV0FBVztjQVh2QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLEdBQUcsZ0JBQWdCO2lCQUNwQjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsR0FBRyxnQkFBZ0I7aUJBQ3BCO2FBQ0Y7O3dGQUNZLFdBQVcsbUJBdkJ0QixpQkFBaUI7UUFDakIsb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixzQ0FBc0M7UUFDdEMseUJBQXlCO1FBQ3pCLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFDaEIsaUJBQWlCO1FBQ2pCLHdCQUF3QjtRQUN4Qiw0QkFBNEIsYUFLMUIsWUFBWSxhQWRkLGlCQUFpQjtRQUNqQixvQkFBb0I7UUFDcEIsZ0JBQWdCO1FBQ2hCLHNDQUFzQztRQUN0Qyx5QkFBeUI7UUFDekIsb0JBQW9CO1FBQ3BCLGdCQUFnQjtRQUNoQixpQkFBaUI7UUFDakIsd0JBQXdCO1FBQ3hCLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ2FzZVJlZmVyZW5jZVBpcGUgfSBmcm9tICcuL2Nhc2UtcmVmZXJlbmNlJztcbmltcG9ydCB7IENjZENhc2VUaXRsZVBpcGUgfSBmcm9tICcuL2Nhc2UtdGl0bGUnO1xuaW1wb3J0IHsgQ2NkQ29sbGVjdGlvblRhYmxlQ2FzZUZpZWxkc0ZpbHRlclBpcGUsIENjZENZQVBhZ2VMYWJlbEZpbHRlclBpcGUsIENjZFBhZ2VGaWVsZHNQaXBlLCBDY2RUYWJGaWVsZHNQaXBlLCBSZWFkRmllbGRzRmlsdGVyUGlwZSB9IGZyb20gJy4vY29tcGxleCc7XG5pbXBvcnQgeyBMaW5rQ2FzZXNGcm9tUmVhc29uVmFsdWVQaXBlIH0gZnJvbSAnLi9saW5rLWNhc2VzLWZyb20tcmVhc29uLWNvZGUvY2NkLWxpbmstY2FzZXMtZnJvbS1yZWFzb24tY29kZS5waXBlJztcbmltcG9ydCB7IExpbmtDYXNlc1JlYXNvblZhbHVlUGlwZSB9IGZyb20gJy4vbGluay1jYXNlcy1yZWFzb24tY29kZS9jY2QtbGluay1jYXNlcy1yZWFzb24tY29kZS5waXBlJztcbmltcG9ydCB7IFNvcnRTZWFyY2hSZXN1bHRQaXBlIH0gZnJvbSAnLi9zZWFyY2gtcmVzdWx0L3NvcnRpbmcvc29ydC1zZWFyY2gtcmVzdWx0LnBpcGUnO1xuXG5jb25zdCBwaXBlRGVjbGFyYXRpb25zID0gW1xuICBDYXNlUmVmZXJlbmNlUGlwZSxcbiAgU29ydFNlYXJjaFJlc3VsdFBpcGUsXG4gIENjZENhc2VUaXRsZVBpcGUsXG4gIENjZENvbGxlY3Rpb25UYWJsZUNhc2VGaWVsZHNGaWx0ZXJQaXBlLFxuICBDY2RDWUFQYWdlTGFiZWxGaWx0ZXJQaXBlLFxuICBSZWFkRmllbGRzRmlsdGVyUGlwZSxcbiAgQ2NkVGFiRmllbGRzUGlwZSxcbiAgQ2NkUGFnZUZpZWxkc1BpcGUsXG4gIExpbmtDYXNlc1JlYXNvblZhbHVlUGlwZSxcbiAgTGlua0Nhc2VzRnJvbVJlYXNvblZhbHVlUGlwZVxuXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgLi4ucGlwZURlY2xhcmF0aW9uc1xuICBdLFxuICBleHBvcnRzOiBbXG4gICAgLi4ucGlwZURlY2xhcmF0aW9uc1xuICBdXG59KVxuZXhwb3J0IGNsYXNzIFBpcGVzTW9kdWxlIHt9XG4iXX0=