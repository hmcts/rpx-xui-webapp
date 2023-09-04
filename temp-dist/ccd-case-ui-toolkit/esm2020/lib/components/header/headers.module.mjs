import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { NavigationItemComponent } from './navigation/navigation-item.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PhaseComponent } from './phase/phase.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class HeadersModule {
}
HeadersModule.ɵfac = function HeadersModule_Factory(t) { return new (t || HeadersModule)(); };
HeadersModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: HeadersModule });
HeadersModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule, RouterModule, RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(HeadersModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule, RouterModule, RpxTranslationModule.forChild()],
                declarations: [PhaseComponent, HeaderBarComponent, NavigationComponent, NavigationItemComponent],
                exports: [PhaseComponent, HeaderBarComponent, NavigationComponent, NavigationItemComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(HeadersModule, { declarations: [PhaseComponent, HeaderBarComponent, NavigationComponent, NavigationItemComponent], imports: [CommonModule, RouterModule, i1.RpxTranslationModule], exports: [PhaseComponent, HeaderBarComponent, NavigationComponent, NavigationItemComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy9oZWFkZXIvaGVhZGVycy5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRS9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3ZFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLHdDQUF3QyxDQUFDO0FBQ2pGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7O0FBT3pELE1BQU0sT0FBTyxhQUFhOzswRUFBYixhQUFhOytEQUFiLGFBQWE7bUVBSlosWUFBWSxFQUFFLFlBQVksRUFBRSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7dUZBSTVELGFBQWE7Y0FMekIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsb0JBQW9CLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3RFLFlBQVksRUFBRSxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsQ0FBQztnQkFDaEcsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixDQUFDO2FBQzlGOzt3RkFDWSxhQUFhLG1CQUhQLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIsYUFEckYsWUFBWSxFQUFFLFlBQVksc0NBRTFCLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBIZWFkZXJCYXJDb21wb25lbnQgfSBmcm9tICcuL2hlYWRlci1iYXIvaGVhZGVyLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBoYXNlQ29tcG9uZW50IH0gZnJvbSAnLi9waGFzZS9waGFzZS5jb21wb25lbnQnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJvdXRlck1vZHVsZSwgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKV0sXG4gICAgZGVjbGFyYXRpb25zOiBbUGhhc2VDb21wb25lbnQsIEhlYWRlckJhckNvbXBvbmVudCwgTmF2aWdhdGlvbkNvbXBvbmVudCwgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnRdLFxuICAgIGV4cG9ydHM6IFtQaGFzZUNvbXBvbmVudCwgSGVhZGVyQmFyQ29tcG9uZW50LCBOYXZpZ2F0aW9uQ29tcG9uZW50LCBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyc01vZHVsZSB7fVxuIl19