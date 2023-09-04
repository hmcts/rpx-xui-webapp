import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { AlertIconClassPipe } from './alert-icon-class.pipe';
import { AlertComponent } from './alert.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class AlertModule {
}
AlertModule.ɵfac = function AlertModule_Factory(t) { return new (t || AlertModule)(); };
AlertModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: AlertModule });
AlertModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(AlertModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    AlertComponent,
                    AlertIconClassPipe
                ],
                exports: [
                    AlertComponent
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(AlertModule, { declarations: [AlertComponent,
        AlertIconClassPipe], imports: [CommonModule, i1.RpxTranslationModule], exports: [AlertComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL2NvbXBvbmVudHMvYmFubmVycy9hbGVydC9hbGVydC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDOzs7QUFlbkQsTUFBTSxPQUFPLFdBQVc7O3NFQUFYLFdBQVc7NkRBQVgsV0FBVztpRUFYcEIsWUFBWTtRQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTt1RkFVdEIsV0FBVztjQWJ2QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7b0JBQ1osb0JBQW9CLENBQUMsUUFBUSxFQUFFO2lCQUNoQztnQkFDRCxZQUFZLEVBQUU7b0JBQ1osY0FBYztvQkFDZCxrQkFBa0I7aUJBQ25CO2dCQUNELE9BQU8sRUFBRTtvQkFDUCxjQUFjO2lCQUNmO2FBQ0Y7O3dGQUNZLFdBQVcsbUJBUHBCLGNBQWM7UUFDZCxrQkFBa0IsYUFMbEIsWUFBWSxzQ0FRWixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQWxlcnRJY29uQ2xhc3NQaXBlIH0gZnJvbSAnLi9hbGVydC1pY29uLWNsYXNzLnBpcGUnO1xuaW1wb3J0IHsgQWxlcnRDb21wb25lbnQgfSBmcm9tICcuL2FsZXJ0LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBbGVydENvbXBvbmVudCxcbiAgICBBbGVydEljb25DbGFzc1BpcGVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFsZXJ0Q29tcG9uZW50XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQWxlcnRNb2R1bGUge31cbiJdfQ==