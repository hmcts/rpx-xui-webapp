import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { CallbackErrorsComponent } from './callback-errors.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class ErrorsModule {
}
ErrorsModule.ɵfac = function ErrorsModule_Factory(t) { return new (t || ErrorsModule)(); };
ErrorsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ErrorsModule });
ErrorsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        RouterModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ErrorsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    CallbackErrorsComponent
                ],
                exports: [
                    CallbackErrorsComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ErrorsModule, { declarations: [CallbackErrorsComponent], imports: [CommonModule,
        RouterModule, i1.RpxTranslationModule], exports: [CallbackErrorsComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NjZC1jYXNlLXVpLXRvb2xraXQvc3JjL2xpYi9zaGFyZWQvY29tcG9uZW50cy9lcnJvci9lcnJvcnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBZXRFLE1BQU0sT0FBTyxZQUFZOzt3RUFBWixZQUFZOzhEQUFaLFlBQVk7a0VBWHJCLFlBQVk7UUFDWixZQUFZO1FBQ1osb0JBQW9CLENBQUMsUUFBUSxFQUFFO3VGQVN0QixZQUFZO2NBYnhCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtvQkFDWixZQUFZO29CQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLHVCQUF1QjtpQkFDeEI7Z0JBQ0QsT0FBTyxFQUFFO29CQUNQLHVCQUF1QjtpQkFDeEI7YUFDRjs7d0ZBQ1ksWUFBWSxtQkFOckIsdUJBQXVCLGFBTHZCLFlBQVk7UUFDWixZQUFZLHNDQU9aLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBDYWxsYmFja0Vycm9yc0NvbXBvbmVudCB9IGZyb20gJy4vY2FsbGJhY2stZXJyb3JzLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgUm91dGVyTW9kdWxlLFxuICAgIFJweFRyYW5zbGF0aW9uTW9kdWxlLmZvckNoaWxkKClcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQ2FsbGJhY2tFcnJvcnNDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhbGxiYWNrRXJyb3JzQ29tcG9uZW50LFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEVycm9yc01vZHVsZSB7fVxuIl19