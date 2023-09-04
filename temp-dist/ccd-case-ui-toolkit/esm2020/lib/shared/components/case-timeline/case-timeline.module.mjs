import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { CaseHistoryModule } from '../case-history';
import { ErrorsModule } from '../error/errors.module';
import { PaletteModule } from '../palette';
import { CaseTimelineComponent } from './case-timeline.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "../case-history/case-history.component";
import * as i4 from "../palette/history/event-log/event-log.component";
export class CaseTimelineModule {
}
CaseTimelineModule.ɵfac = function CaseTimelineModule_Factory(t) { return new (t || CaseTimelineModule)(); };
CaseTimelineModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CaseTimelineModule });
CaseTimelineModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        ErrorsModule,
        FormsModule,
        ReactiveFormsModule,
        CaseHistoryModule,
        PaletteModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseTimelineModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    ErrorsModule,
                    FormsModule,
                    ReactiveFormsModule,
                    CaseHistoryModule,
                    PaletteModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    CaseTimelineComponent
                ],
                exports: [
                    CaseTimelineComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CaseTimelineModule, { declarations: [CaseTimelineComponent], imports: [CommonModule,
        ErrorsModule,
        FormsModule,
        ReactiveFormsModule,
        CaseHistoryModule,
        PaletteModule, i1.RpxTranslationModule], exports: [CaseTimelineComponent] }); })();
i0.ɵɵsetComponentScope(CaseTimelineComponent, function () { return [i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i3.CaseHistoryComponent, i4.EventLogComponent]; }, function () { return [i1.RpxTranslatePipe]; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS10aW1lbGluZS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS10aW1lbGluZS9jYXNlLXRpbWVsaW5lLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDcEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7Ozs7OztBQW9CbEUsTUFBTSxPQUFPLGtCQUFrQjs7b0ZBQWxCLGtCQUFrQjtvRUFBbEIsa0JBQWtCO3dFQWhCdkIsWUFBWTtRQUNaLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLGlCQUFpQjtRQUNqQixhQUFhO1FBQ2Isb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQVUxQixrQkFBa0I7Y0FsQjlCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixpQkFBaUI7b0JBQ2pCLGFBQWE7b0JBQ2Isb0JBQW9CLENBQUMsUUFBUSxFQUFFO2lCQUNsQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1YscUJBQXFCO2lCQUN4QjtnQkFDRCxPQUFPLEVBQUU7b0JBQ0wscUJBQXFCO2lCQUN4QjthQUNKOzt3RkFFWSxrQkFBa0IsbUJBUHZCLHFCQUFxQixhQVRyQixZQUFZO1FBQ1osWUFBWTtRQUNaLFdBQVc7UUFDWCxtQkFBbUI7UUFDbkIsaUJBQWlCO1FBQ2pCLGFBQWEsc0NBT2IscUJBQXFCO3VCQUhyQixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlLCBSZWFjdGl2ZUZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IENhc2VIaXN0b3J5TW9kdWxlIH0gZnJvbSAnLi4vY2FzZS1oaXN0b3J5JztcbmltcG9ydCB7IEVycm9yc01vZHVsZSB9IGZyb20gJy4uL2Vycm9yL2Vycm9ycy5tb2R1bGUnO1xuaW1wb3J0IHsgUGFsZXR0ZU1vZHVsZSB9IGZyb20gJy4uL3BhbGV0dGUnO1xuaW1wb3J0IHsgQ2FzZVRpbWVsaW5lQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLXRpbWVsaW5lLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEVycm9yc01vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgICAgIENhc2VIaXN0b3J5TW9kdWxlLFxuICAgICAgICBQYWxldHRlTW9kdWxlLFxuICAgICAgICBScHhUcmFuc2xhdGlvbk1vZHVsZS5mb3JDaGlsZCgpXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQ2FzZVRpbWVsaW5lQ29tcG9uZW50XG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIENhc2VUaW1lbGluZUNvbXBvbmVudFxuICAgIF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBDYXNlVGltZWxpbmVNb2R1bGUge31cbiJdfQ==