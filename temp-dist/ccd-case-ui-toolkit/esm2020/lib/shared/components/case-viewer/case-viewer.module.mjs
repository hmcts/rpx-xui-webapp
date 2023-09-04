import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { AlertModule } from '../../../components/banners/alert/alert.module';
import { BannersModule } from '../../../components/banners/banners.module';
import { ConditionalShowModule, LabelSubstitutorModule } from '../../directives';
import { CaseReferencePipe } from '../../pipes';
import { ActivityPollingService, ActivityService, DraftService, ErrorNotifierService, HttpService, NavigationNotifierService, OrderService } from '../../services';
import { ActivityModule } from '../activity';
import { CaseEditorModule, CaseNotifier, ConvertHrefToRouterService } from '../case-editor';
import { CaseHeaderModule } from '../case-header';
import { CaseHistoryModule } from '../case-history';
import { EventMessageModule } from '../error-message/error-message.module';
import { ErrorsModule } from '../error/errors.module';
import { EventStartModule } from '../event-start/event-start.module';
import { EventTriggerModule } from '../event-trigger';
import { LoadingSpinnerModule } from '../loading-spinner/loading-spinner.module';
import { PaletteModule } from '../palette';
import { CaseBasicAccessViewComponent } from './case-basic-access-view';
import { CaseChallengedAccessRequestComponent } from './case-challenged-access-request/case-challenged-access-request.component';
import { CaseChallengedAccessSuccessComponent } from './case-challenged-access-success/case-challenged-access-success.component';
import { CaseEventTriggerComponent } from './case-event-trigger';
import { CaseFullAccessViewComponent } from './case-full-access-view/case-full-access-view.component';
import { CaseReviewSpecificAccessRejectComponent } from './case-review-specific-access-reject';
import { CaseReviewSpecificAccessRequestComponent } from './case-review-specific-access-request/case-review-specific-access-request.component';
import { CaseSpecificAccessRequestComponent } from './case-specific-access-request/case-specific-access-request.component';
import { CaseSpecificAccessSuccessComponent } from './case-specific-access-success/case-specific-access-success.component';
import { CaseViewComponent } from './case-view';
import { CaseViewerComponent } from './case-viewer.component';
import { CasePrinterComponent, PrintUrlPipe } from './printer';
import { CaseResolver, EventTriggerResolver } from './services';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
import * as i2 from "@angular/common";
import * as i3 from "../activity/activity.component";
import * as i4 from "../case-editor/case-edit/case-edit.component";
import * as i5 from "../case-header/case-header.component";
import * as i6 from "@angular/router";
import * as i7 from "../error/callback-errors.component";
import * as i8 from "../event-trigger/event-trigger.component";
import * as i9 from "../palette/base-field/field-read.component";
import * as i10 from "@angular/material/tabs";
import * as i11 from "../../../components/banners/notification-banner/notification-banner.component";
import * as i12 from "../../directives/substitutor/label-substitutor.directive";
import * as i13 from "../palette/utils/is-compound.pipe";
import * as i14 from "../../pipes/complex/ccd-read-fields-filter.pipe";
import * as i15 from "../../pipes/complex/ccd-tab-fields.pipe";
import * as i16 from "@angular/forms";
import * as i17 from "../../../components/banners/alert/alert.component";
import * as i18 from "../error-message/error-message.component";
export class CaseViewerModule {
}
CaseViewerModule.ɵfac = function CaseViewerModule_Factory(t) { return new (t || CaseViewerModule)(); };
CaseViewerModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: CaseViewerModule });
CaseViewerModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        CaseNotifier,
        ConvertHrefToRouterService,
        NavigationNotifierService,
        CaseReferencePipe,
        EventTriggerResolver,
        ActivityService,
        ActivityPollingService,
        OrderService,
        DraftService,
        HttpService,
        CaseResolver,
        ErrorNotifierService,
    ], imports: [CommonModule,
        RouterModule,
        ErrorsModule,
        ActivityModule,
        CaseHeaderModule,
        EventStartModule,
        EventTriggerModule,
        PaletteModule,
        CaseEditorModule,
        ConditionalShowModule,
        CaseHistoryModule,
        MatTabsModule,
        ReactiveFormsModule,
        AlertModule,
        RpxTranslationModule.forChild(),
        BannersModule,
        LabelSubstitutorModule,
        LoadingSpinnerModule,
        EventMessageModule] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(CaseViewerModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    RouterModule,
                    ErrorsModule,
                    ActivityModule,
                    CaseHeaderModule,
                    EventStartModule,
                    EventTriggerModule,
                    PaletteModule,
                    CaseEditorModule,
                    ConditionalShowModule,
                    CaseHistoryModule,
                    MatTabsModule,
                    ReactiveFormsModule,
                    AlertModule,
                    RpxTranslationModule.forChild(),
                    BannersModule,
                    LabelSubstitutorModule,
                    LoadingSpinnerModule,
                    EventMessageModule
                ],
                declarations: [
                    CaseEventTriggerComponent,
                    CasePrinterComponent,
                    CaseViewerComponent,
                    CaseFullAccessViewComponent,
                    CaseViewComponent,
                    CaseBasicAccessViewComponent,
                    PrintUrlPipe,
                    CaseChallengedAccessRequestComponent,
                    CaseSpecificAccessRequestComponent,
                    CaseReviewSpecificAccessRequestComponent,
                    CaseChallengedAccessSuccessComponent,
                    CaseSpecificAccessSuccessComponent,
                    CaseReviewSpecificAccessRejectComponent
                ],
                exports: [
                    CaseViewerComponent,
                    CaseViewComponent
                ],
                providers: [
                    CaseNotifier,
                    ConvertHrefToRouterService,
                    NavigationNotifierService,
                    CaseReferencePipe,
                    EventTriggerResolver,
                    ActivityService,
                    ActivityPollingService,
                    OrderService,
                    DraftService,
                    HttpService,
                    CaseResolver,
                    ErrorNotifierService,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CaseViewerModule, { declarations: [CaseEventTriggerComponent,
        CasePrinterComponent,
        CaseViewerComponent,
        CaseFullAccessViewComponent,
        CaseViewComponent,
        CaseBasicAccessViewComponent,
        PrintUrlPipe,
        CaseChallengedAccessRequestComponent,
        CaseSpecificAccessRequestComponent,
        CaseReviewSpecificAccessRequestComponent,
        CaseChallengedAccessSuccessComponent,
        CaseSpecificAccessSuccessComponent,
        CaseReviewSpecificAccessRejectComponent], imports: [CommonModule,
        RouterModule,
        ErrorsModule,
        ActivityModule,
        CaseHeaderModule,
        EventStartModule,
        EventTriggerModule,
        PaletteModule,
        CaseEditorModule,
        ConditionalShowModule,
        CaseHistoryModule,
        MatTabsModule,
        ReactiveFormsModule,
        AlertModule, i1.RpxTranslationModule, BannersModule,
        LabelSubstitutorModule,
        LoadingSpinnerModule,
        EventMessageModule], exports: [CaseViewerComponent,
        CaseViewComponent] }); })();
i0.ɵɵsetComponentScope(CaseEventTriggerComponent, function () { return [i2.NgIf, i3.ActivityComponent, i4.CaseEditComponent]; }, []);
i0.ɵɵsetComponentScope(CasePrinterComponent, function () { return [i2.NgForOf, i2.NgIf, i5.CaseHeaderComponent]; }, function () { return [i1.RpxTranslatePipe, PrintUrlPipe]; });
i0.ɵɵsetComponentScope(CaseViewerComponent, function () { return [i2.NgIf, CaseFullAccessViewComponent,
    CaseBasicAccessViewComponent]; }, []);
i0.ɵɵsetComponentScope(CaseFullAccessViewComponent, function () { return [i2.NgForOf, i2.NgIf, i2.NgSwitch, i2.NgSwitchCase, i6.RouterOutlet, i6.RouterLink, i7.CallbackErrorsComponent, i3.ActivityComponent, i5.CaseHeaderComponent, i8.EventTriggerComponent, i9.FieldReadComponent, i10.MatTabContent, i10.MatTab, i10.MatTabGroup, i11.NotificationBannerComponent, i12.LabelSubstitutorDirective]; }, function () { return [i13.IsCompoundPipe, i14.ReadFieldsFilterPipe, i15.CcdTabFieldsPipe, i1.RpxTranslatePipe]; });
i0.ɵɵsetComponentScope(CaseViewComponent, function () { return [i2.NgIf, CaseViewerComponent]; }, []);
i0.ɵɵsetComponentScope(CaseChallengedAccessRequestComponent, function () { return [i2.NgClass, i2.NgIf, i16.ɵNgNoValidate, i16.DefaultValueAccessor, i16.RadioControlValueAccessor, i16.NgControlStatus, i16.NgControlStatusGroup, i16.FormGroupDirective, i16.FormControlName, i17.AlertComponent, i18.ErrorMessageComponent]; }, function () { return [i1.RpxTranslatePipe]; });
i0.ɵɵsetComponentScope(CaseSpecificAccessRequestComponent, function () { return [i2.NgClass, i2.NgIf, i16.ɵNgNoValidate, i16.DefaultValueAccessor, i16.NgControlStatus, i16.NgControlStatusGroup, i16.FormGroupDirective, i16.FormControlName, i17.AlertComponent, i18.ErrorMessageComponent]; }, function () { return [i1.RpxTranslatePipe]; });
i0.ɵɵsetComponentScope(CaseReviewSpecificAccessRequestComponent, function () { return [i2.NgClass, i2.NgIf, i16.ɵNgNoValidate, i16.DefaultValueAccessor, i16.RadioControlValueAccessor, i16.NgControlStatus, i16.NgControlStatusGroup, i16.FormGroupDirective, i16.FormControlName, i18.ErrorMessageComponent]; }, function () { return [i1.RpxTranslatePipe]; });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzZS12aWV3ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2NkLWNhc2UtdWktdG9vbGtpdC9zcmMvbGliL3NoYXJlZC9jb21wb25lbnRzL2Nhc2Utdmlld2VyL2Nhc2Utdmlld2VyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzNELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnREFBZ0QsQ0FBQztBQUM3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHFCQUFxQixFQUFFLHNCQUFzQixFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDakYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ2hELE9BQU8sRUFDTCxzQkFBc0IsRUFDdEIsZUFBZSxFQUNmLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsV0FBVyxFQUNYLHlCQUF5QixFQUN6QixZQUFZLEVBQ2IsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQzdDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUs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Qyx3Q0FBd0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBNYXRUYWJzTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvdGFicyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgUnB4VHJhbnNsYXRpb25Nb2R1bGUgfSBmcm9tICdycHgteHVpLXRyYW5zbGF0aW9uJztcbmltcG9ydCB7IEFsZXJ0TW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9iYW5uZXJzL2FsZXJ0L2FsZXJ0Lm1vZHVsZSc7XG5pbXBvcnQgeyBCYW5uZXJzTW9kdWxlIH0gZnJvbSAnLi4vLi4vLi4vY29tcG9uZW50cy9iYW5uZXJzL2Jhbm5lcnMubW9kdWxlJztcbmltcG9ydCB7IENvbmRpdGlvbmFsU2hvd01vZHVsZSwgTGFiZWxTdWJzdGl0dXRvck1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMnO1xuaW1wb3J0IHsgQ2FzZVJlZmVyZW5jZVBpcGUgfSBmcm9tICcuLi8uLi9waXBlcyc7XG5pbXBvcnQge1xuICBBY3Rpdml0eVBvbGxpbmdTZXJ2aWNlLFxuICBBY3Rpdml0eVNlcnZpY2UsXG4gIERyYWZ0U2VydmljZSxcbiAgRXJyb3JOb3RpZmllclNlcnZpY2UsXG4gIEh0dHBTZXJ2aWNlLFxuICBOYXZpZ2F0aW9uTm90aWZpZXJTZXJ2aWNlLFxuICBPcmRlclNlcnZpY2Vcbn0gZnJvbSAnLi4vLi4vc2VydmljZXMnO1xuaW1wb3J0IHsgQWN0aXZpdHlNb2R1bGUgfSBmcm9tICcuLi9hY3Rpdml0eSc7XG5pbXBvcnQgeyBDYXNlRWRpdG9yTW9kdWxlLCBDYXNlTm90aWZpZXIsIENvbnZlcnRIcmVmVG9Sb3V0ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vY2FzZS1lZGl0b3InO1xuaW1wb3J0IHsgQ2FzZUhlYWRlck1vZHVsZSB9IGZyb20gJy4uL2Nhc2UtaGVhZGVyJztcbmltcG9ydCB7IENhc2VIaXN0b3J5TW9kdWxlIH0gZnJvbSAnLi4vY2FzZS1oaXN0b3J5JztcbmltcG9ydCB7IEV2ZW50TWVzc2FnZU1vZHVsZSB9IGZyb20gJy4uL2Vycm9yLW1lc3NhZ2UvZXJyb3ItbWVzc2FnZS5tb2R1bGUnO1xuaW1wb3J0IHsgRXJyb3JzTW9kdWxlIH0gZnJvbSAnLi4vZXJyb3IvZXJyb3JzLm1vZHVsZSc7XG5pbXBvcnQgeyBFdmVudFN0YXJ0TW9kdWxlIH0gZnJvbSAnLi4vZXZlbnQtc3RhcnQvZXZlbnQtc3RhcnQubW9kdWxlJztcbmltcG9ydCB7IEV2ZW50VHJpZ2dlck1vZHVsZSB9IGZyb20gJy4uL2V2ZW50LXRyaWdnZXInO1xuaW1wb3J0IHsgTG9hZGluZ1NwaW5uZXJNb2R1bGUgfSBmcm9tICcuLi9sb2FkaW5nLXNwaW5uZXIvbG9hZGluZy1zcGlubmVyLm1vZHVsZSc7XG5pbXBvcnQgeyBQYWxldHRlTW9kdWxlIH0gZnJvbSAnLi4vcGFsZXR0ZSc7XG5pbXBvcnQgeyBDYXNlQmFzaWNBY2Nlc3NWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWJhc2ljLWFjY2Vzcy12aWV3JztcbmltcG9ydCB7IENhc2VDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0L2Nhc2UtY2hhbGxlbmdlZC1hY2Nlc3MtcmVxdWVzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUNoYWxsZW5nZWRBY2Nlc3NTdWNjZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWNoYWxsZW5nZWQtYWNjZXNzLXN1Y2Nlc3MvY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlRXZlbnRUcmlnZ2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWV2ZW50LXRyaWdnZXInO1xuaW1wb3J0IHsgQ2FzZUZ1bGxBY2Nlc3NWaWV3Q29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWZ1bGwtYWNjZXNzLXZpZXcvY2FzZS1mdWxsLWFjY2Vzcy12aWV3LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZWplY3RDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZWplY3QnO1xuaW1wb3J0IHsgQ2FzZVJldmlld1NwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QvY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QuY29tcG9uZW50JztcbmltcG9ydCB7IENhc2VTcGVjaWZpY0FjY2Vzc1JlcXVlc3RDb21wb25lbnQgfSBmcm9tICcuL2Nhc2Utc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QvY2FzZS1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZVNwZWNpZmljQWNjZXNzU3VjY2Vzc0NvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1zcGVjaWZpYy1hY2Nlc3Mtc3VjY2Vzcy9jYXNlLXNwZWNpZmljLWFjY2Vzcy1zdWNjZXNzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlVmlld0NvbXBvbmVudCB9IGZyb20gJy4vY2FzZS12aWV3JztcbmltcG9ydCB7IENhc2VWaWV3ZXJDb21wb25lbnQgfSBmcm9tICcuL2Nhc2Utdmlld2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXNlUHJpbnRlckNvbXBvbmVudCwgUHJpbnRVcmxQaXBlIH0gZnJvbSAnLi9wcmludGVyJztcbmltcG9ydCB7IENhc2VSZXNvbHZlciwgRXZlbnRUcmlnZ2VyUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSb3V0ZXJNb2R1bGUsXG4gICAgRXJyb3JzTW9kdWxlLFxuICAgIEFjdGl2aXR5TW9kdWxlLFxuICAgIENhc2VIZWFkZXJNb2R1bGUsXG4gICAgRXZlbnRTdGFydE1vZHVsZSxcbiAgICBFdmVudFRyaWdnZXJNb2R1bGUsXG4gICAgUGFsZXR0ZU1vZHVsZSxcbiAgICBDYXNlRWRpdG9yTW9kdWxlLFxuICAgIENvbmRpdGlvbmFsU2hvd01vZHVsZSxcbiAgICBDYXNlSGlzdG9yeU1vZHVsZSxcbiAgICBNYXRUYWJzTW9kdWxlLFxuICAgIFJlYWN0aXZlRm9ybXNNb2R1bGUsXG4gICAgQWxlcnRNb2R1bGUsXG4gICAgUnB4VHJhbnNsYXRpb25Nb2R1bGUuZm9yQ2hpbGQoKSxcbiAgICBCYW5uZXJzTW9kdWxlLFxuICAgIExhYmVsU3Vic3RpdHV0b3JNb2R1bGUsXG4gICAgTG9hZGluZ1NwaW5uZXJNb2R1bGUsXG4gICAgRXZlbnRNZXNzYWdlTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIENhc2VFdmVudFRyaWdnZXJDb21wb25lbnQsXG4gICAgQ2FzZVByaW50ZXJDb21wb25lbnQsXG4gICAgQ2FzZVZpZXdlckNvbXBvbmVudCxcbiAgICBDYXNlRnVsbEFjY2Vzc1ZpZXdDb21wb25lbnQsXG4gICAgQ2FzZVZpZXdDb21wb25lbnQsXG4gICAgQ2FzZUJhc2ljQWNjZXNzVmlld0NvbXBvbmVudCxcbiAgICBQcmludFVybFBpcGUsXG4gICAgQ2FzZUNoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50LFxuICAgIENhc2VTcGVjaWZpY0FjY2Vzc1JlcXVlc3RDb21wb25lbnQsXG4gICAgQ2FzZVJldmlld1NwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCxcbiAgICBDYXNlQ2hhbGxlbmdlZEFjY2Vzc1N1Y2Nlc3NDb21wb25lbnQsXG4gICAgQ2FzZVNwZWNpZmljQWNjZXNzU3VjY2Vzc0NvbXBvbmVudCxcbiAgICBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZWplY3RDb21wb25lbnRcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIENhc2VWaWV3ZXJDb21wb25lbnQsXG4gICAgQ2FzZVZpZXdDb21wb25lbnRcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ2FzZU5vdGlmaWVyLFxuICAgIENvbnZlcnRIcmVmVG9Sb3V0ZXJTZXJ2aWNlLFxuICAgIE5hdmlnYXRpb25Ob3RpZmllclNlcnZpY2UsXG4gICAgQ2FzZVJlZmVyZW5jZVBpcGUsXG4gICAgRXZlbnRUcmlnZ2VyUmVzb2x2ZXIsXG4gICAgQWN0aXZpdHlTZXJ2aWNlLFxuICAgIEFjdGl2aXR5UG9sbGluZ1NlcnZpY2UsXG4gICAgT3JkZXJTZXJ2aWNlLFxuICAgIERyYWZ0U2VydmljZSxcbiAgICBIdHRwU2VydmljZSxcbiAgICBDYXNlUmVzb2x2ZXIsXG4gICAgRXJyb3JOb3RpZmllclNlcnZpY2UsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ2FzZVZpZXdlck1vZHVsZSB7XG59XG4iXX0=