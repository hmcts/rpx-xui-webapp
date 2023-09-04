import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { TabComponent } from './tab.component';
import { TabsComponent } from './tabs.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class TabsModule {
}
TabsModule.ɵfac = function TabsModule_Factory(t) { return new (t || TabsModule)(); };
TabsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: TabsModule });
TabsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        RouterModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TabsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    TabsComponent,
                    TabComponent,
                ],
                exports: [
                    TabsComponent,
                    TabComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(TabsModule, { declarations: [TabsComponent,
        TabComponent], imports: [CommonModule,
        RouterModule, i1.RpxTranslationModule], exports: [TabsComponent,
        TabComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvY29tcG9uZW50cy90YWJzL3RhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7QUFpQmpELE1BQU0sT0FBTyxVQUFVOztvRUFBVixVQUFVOzREQUFWLFVBQVU7Z0VBYm5CLFlBQVk7UUFDWixZQUFZO1FBQ1osb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQVd0QixVQUFVO2NBZnRCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixZQUFZO29CQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLGFBQWE7b0JBQ2IsWUFBWTtpQkFDYjtnQkFDRCxPQUFPLEVBQUU7b0JBQ1AsYUFBYTtvQkFDYixZQUFZO2lCQUNiO2FBQ0Y7O3dGQUNZLFVBQVUsbUJBUm5CLGFBQWE7UUFDYixZQUFZLGFBTlosWUFBWTtRQUNaLFlBQVksc0NBUVosYUFBYTtRQUNiLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNDb21wb25lbnQgfSBmcm9tICcuL3RhYnMuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBUYWJzQ29tcG9uZW50LFxuICAgIFRhYkNvbXBvbmVudCxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIFRhYnNDb21wb25lbnQsXG4gICAgVGFiQ29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIFRhYnNNb2R1bGUge31cbiJdfQ==