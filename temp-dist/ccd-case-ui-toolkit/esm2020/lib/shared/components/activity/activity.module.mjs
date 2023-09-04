import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { ActivityPollingService } from '../../services/activity/activity.polling.service';
import { ActivityService } from '../../services/activity/activity.service';
import { SessionStorageService } from '../../services/session/session-storage.service';
import { ActivityBannerComponent } from './activity-banner';
import { ActivityIconComponent } from './activity-icon';
import { ActivityComponent } from './activity.component';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class ActivityModule {
}
ActivityModule.ɵfac = function ActivityModule_Factory(t) { return new (t || ActivityModule)(); };
ActivityModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: ActivityModule });
ActivityModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        ActivityService,
        ActivityPollingService,
        SessionStorageService
    ], imports: [CommonModule,
        RouterModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(ActivityModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    ActivityComponent,
                    ActivityBannerComponent,
                    ActivityIconComponent,
                ],
                exports: [
                    ActivityComponent,
                    ActivityBannerComponent,
                    ActivityIconComponent,
                ],
                providers: [
                    ActivityService,
                    ActivityPollingService,
                    SessionStorageService
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(ActivityModule, { declarations: [ActivityComponent,
        ActivityBannerComponent,
        ActivityIconComponent], imports: [CommonModule,
        RouterModule, i1.RpxTranslationModule], exports: [ActivityComponent,
        ActivityBannerComponent,
        ActivityIconComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2FjdGl2aXR5L2FjdGl2aXR5Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0RBQWtELENBQUM7QUFDMUYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDBDQUEwQyxDQUFDO0FBQzNFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGdEQUFnRCxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzVELE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3hELE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7QUF3QnpELE1BQU0sT0FBTyxjQUFjOzs0RUFBZCxjQUFjO2dFQUFkLGNBQWM7cUVBTlo7UUFDUCxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLHFCQUFxQjtLQUN4QixZQWxCRyxZQUFZO1FBQ1osWUFBWTtRQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTt1RkFrQjFCLGNBQWM7Y0F0QjFCLFFBQVE7ZUFBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsWUFBWTtvQkFDWixZQUFZO29CQUNaLG9CQUFvQixDQUFDLFFBQVEsRUFBRTtpQkFDbEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLGlCQUFpQjtvQkFDakIsdUJBQXVCO29CQUN2QixxQkFBcUI7aUJBQ3hCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxpQkFBaUI7b0JBQ2pCLHVCQUF1QjtvQkFDdkIscUJBQXFCO2lCQUN4QjtnQkFDRCxTQUFTLEVBQUU7b0JBQ1AsZUFBZTtvQkFDZixzQkFBc0I7b0JBQ3RCLHFCQUFxQjtpQkFDeEI7YUFDSjs7d0ZBQ1ksY0FBYyxtQkFmbkIsaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixxQkFBcUIsYUFQckIsWUFBWTtRQUNaLFlBQVksc0NBU1osaUJBQWlCO1FBQ2pCLHVCQUF1QjtRQUN2QixxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBScHhUcmFuc2xhdGlvbk1vZHVsZSB9IGZyb20gJ3JweC14dWktdHJhbnNsYXRpb24nO1xuaW1wb3J0IHsgQWN0aXZpdHlQb2xsaW5nU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2FjdGl2aXR5L2FjdGl2aXR5LnBvbGxpbmcuc2VydmljZSc7XG5pbXBvcnQgeyBBY3Rpdml0eVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hY3Rpdml0eS9hY3Rpdml0eS5zZXJ2aWNlJztcbmltcG9ydCB7IFNlc3Npb25TdG9yYWdlU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3Nlc3Npb24vc2Vzc2lvbi1zdG9yYWdlLnNlcnZpY2UnO1xuaW1wb3J0IHsgQWN0aXZpdHlCYW5uZXJDb21wb25lbnQgfSBmcm9tICcuL2FjdGl2aXR5LWJhbm5lcic7XG5pbXBvcnQgeyBBY3Rpdml0eUljb25Db21wb25lbnQgfSBmcm9tICcuL2FjdGl2aXR5LWljb24nO1xuaW1wb3J0IHsgQWN0aXZpdHlDb21wb25lbnQgfSBmcm9tICcuL2FjdGl2aXR5LmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFjdGl2aXR5Q29tcG9uZW50LFxuICAgICAgICBBY3Rpdml0eUJhbm5lckNvbXBvbmVudCxcbiAgICAgICAgQWN0aXZpdHlJY29uQ29tcG9uZW50LFxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBBY3Rpdml0eUNvbXBvbmVudCxcbiAgICAgICAgQWN0aXZpdHlCYW5uZXJDb21wb25lbnQsXG4gICAgICAgIEFjdGl2aXR5SWNvbkNvbXBvbmVudCxcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBY3Rpdml0eVNlcnZpY2UsXG4gICAgICAgIEFjdGl2aXR5UG9sbGluZ1NlcnZpY2UsXG4gICAgICAgIFNlc3Npb25TdG9yYWdlU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgQWN0aXZpdHlNb2R1bGUge31cbiJdfQ==