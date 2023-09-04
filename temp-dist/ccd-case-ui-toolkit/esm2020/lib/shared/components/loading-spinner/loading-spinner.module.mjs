import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class LoadingSpinnerModule {
}
LoadingSpinnerModule.ɵfac = function LoadingSpinnerModule_Factory(t) { return new (t || LoadingSpinnerModule)(); };
LoadingSpinnerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: LoadingSpinnerModule });
LoadingSpinnerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LoadingSpinnerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    LoadingSpinnerComponent
                ],
                exports: [
                    LoadingSpinnerComponent
                ],
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LoadingSpinnerModule, { declarations: [LoadingSpinnerComponent], imports: [CommonModule, i1.RpxTranslationModule], exports: [LoadingSpinnerComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1zcGlubmVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBY3RFLE1BQU0sT0FBTyxvQkFBb0I7O3dGQUFwQixvQkFBb0I7c0VBQXBCLG9CQUFvQjswRUFWN0IsWUFBWTtRQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTt1RkFTdEIsb0JBQW9CO2NBWmhDLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7aUJBQ2hDO2dCQUNELFlBQVksRUFBRTtvQkFDWix1QkFBdUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCx1QkFBdUI7aUJBQ3hCO2FBQ0Y7O3dGQUNZLG9CQUFvQixtQkFON0IsdUJBQXVCLGFBSnZCLFlBQVksc0NBT1osdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgTG9hZGluZ1NwaW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2xvYWRpbmctc3Bpbm5lci5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTG9hZGluZ1NwaW5uZXJDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIExvYWRpbmdTcGlubmVyQ29tcG9uZW50XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdTcGlubmVyTW9kdWxlIHsgfVxuIl19