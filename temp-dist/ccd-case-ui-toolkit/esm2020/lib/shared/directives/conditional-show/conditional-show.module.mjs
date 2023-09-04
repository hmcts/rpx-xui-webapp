import { NgModule } from '@angular/core';
import { FieldsUtils } from '../../services/fields/fields.utils';
import { ConditionalShowFormDirective } from './conditional-show-form.directive';
import { ConditionalShowRegistrarService } from './services/conditional-show-registrar.service';
import { GreyBarService } from './services/grey-bar.service';
import * as i0 from "@angular/core";
export class ConditionalShowModule {
}
ConditionalShowModule.ɵfac = function ConditionalShowModule_Factory(t) { return new (t || ConditionalShowModule)(); };
ConditionalShowModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ConditionalShowModule });
ConditionalShowModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        FieldsUtils,
        ConditionalShowRegistrarService,
        GreyBarService
    ] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ConditionalShowModule, [{
        type: NgModule,
        args: [{
                declarations: [
                    ConditionalShowFormDirective
                ],
                exports: [
                    ConditionalShowFormDirective
                ],
                providers: [
                    FieldsUtils,
                    ConditionalShowRegistrarService,
                    GreyBarService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ConditionalShowModule, { declarations: [ConditionalShowFormDirective], exports: [ConditionalShowFormDirective] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZGl0aW9uYWwtc2hvdy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2RpcmVjdGl2ZXMvY29uZGl0aW9uYWwtc2hvdy9jb25kaXRpb25hbC1zaG93Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQztBQUNqRSxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNqRixPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSwrQ0FBK0MsQ0FBQztBQUNoRyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sNkJBQTZCLENBQUM7O0FBZTdELE1BQU0sT0FBTyxxQkFBcUI7OzBGQUFyQixxQkFBcUI7dUVBQXJCLHFCQUFxQjs0RUFOckI7UUFDVCxXQUFXO1FBQ1gsK0JBQStCO1FBQy9CLGNBQWM7S0FDZjt1RkFFVSxxQkFBcUI7Y0FiakMsUUFBUTtlQUFDO2dCQUNSLFlBQVksRUFBRTtvQkFDWiw0QkFBNEI7aUJBQzdCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCw0QkFBNEI7aUJBQzdCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxXQUFXO29CQUNYLCtCQUErQjtvQkFDL0IsY0FBYztpQkFDZjthQUNGOzt3RkFDWSxxQkFBcUIsbUJBWDlCLDRCQUE0QixhQUc1Qiw0QkFBNEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmllbGRzVXRpbHMgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9maWVsZHMvZmllbGRzLnV0aWxzJztcbmltcG9ydCB7IENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmUgfSBmcm9tICcuL2NvbmRpdGlvbmFsLXNob3ctZm9ybS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgQ29uZGl0aW9uYWxTaG93UmVnaXN0cmFyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvY29uZGl0aW9uYWwtc2hvdy1yZWdpc3RyYXIuc2VydmljZSc7XG5pbXBvcnQgeyBHcmV5QmFyU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZ3JleS1iYXIuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmVcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENvbmRpdGlvbmFsU2hvd0Zvcm1EaXJlY3RpdmVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgRmllbGRzVXRpbHMsXG4gICAgQ29uZGl0aW9uYWxTaG93UmVnaXN0cmFyU2VydmljZSxcbiAgICBHcmV5QmFyU2VydmljZVxuICBdXG59KVxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbmFsU2hvd01vZHVsZSB7fVxuIl19