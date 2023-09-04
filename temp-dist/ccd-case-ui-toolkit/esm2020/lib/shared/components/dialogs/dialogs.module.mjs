import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RpxTranslationModule } from 'rpx-xui-translation';
import { DeleteOrCancelDialogComponent } from './delete-or-cancel-dialog';
import { DocumentDialogComponent } from './document-dialog';
import { RemoveDialogComponent } from './remove-dialog';
import { SaveOrDiscardDialogComponent } from './save-or-discard-dialog';
import * as i0 from "@angular/core";
import * as i1 from "rpx-xui-translation";
export class DialogsModule {
}
DialogsModule.ɵfac = function DialogsModule_Factory(t) { return new (t || DialogsModule)(); };
DialogsModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: DialogsModule });
DialogsModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RpxTranslationModule.forChild()] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(DialogsModule, [{
        type: NgModule,
        args: [{
                imports: [
                    CommonModule,
                    FormsModule,
                    ReactiveFormsModule,
                    RpxTranslationModule.forChild()
                ],
                declarations: [
                    DocumentDialogComponent,
                    DeleteOrCancelDialogComponent,
                    SaveOrDiscardDialogComponent,
                    RemoveDialogComponent,
                ],
                exports: [
                    DocumentDialogComponent,
                    DeleteOrCancelDialogComponent,
                    SaveOrDiscardDialogComponent,
                    RemoveDialogComponent,
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(DialogsModule, { declarations: [DocumentDialogComponent,
        DeleteOrCancelDialogComponent,
        SaveOrDiscardDialogComponent,
        RemoveDialogComponent], imports: [CommonModule,
        FormsModule,
        ReactiveFormsModule, i1.RpxTranslationModule], exports: [DocumentDialogComponent,
        DeleteOrCancelDialogComponent,
        SaveOrDiscardDialogComponent,
        RemoveDialogComponent] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9ncy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvZGlhbG9ncy9kaWFsb2dzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsV0FBVyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDM0QsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDNUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDeEQsT0FBTyxFQUFFLDRCQUE0QixFQUFFLE1BQU0sMEJBQTBCLENBQUM7OztBQXNCeEUsTUFBTSxPQUFPLGFBQWE7OzBFQUFiLGFBQWE7K0RBQWIsYUFBYTttRUFsQnRCLFlBQVk7UUFDWixXQUFXO1FBQ1gsbUJBQW1CO1FBQ25CLG9CQUFvQixDQUFDLFFBQVEsRUFBRTt1RkFldEIsYUFBYTtjQXBCekIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO29CQUNaLFdBQVc7b0JBQ1gsbUJBQW1CO29CQUNuQixvQkFBb0IsQ0FBQyxRQUFRLEVBQUU7aUJBQ2hDO2dCQUNELFlBQVksRUFBRTtvQkFDWix1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0IsNEJBQTRCO29CQUM1QixxQkFBcUI7aUJBQ3RCO2dCQUNELE9BQU8sRUFBRTtvQkFDUCx1QkFBdUI7b0JBQ3ZCLDZCQUE2QjtvQkFDN0IsNEJBQTRCO29CQUM1QixxQkFBcUI7aUJBQ3RCO2FBQ0Y7O3dGQUNZLGFBQWEsbUJBWnRCLHVCQUF1QjtRQUN2Qiw2QkFBNkI7UUFDN0IsNEJBQTRCO1FBQzVCLHFCQUFxQixhQVRyQixZQUFZO1FBQ1osV0FBVztRQUNYLG1CQUFtQixzQ0FVbkIsdUJBQXVCO1FBQ3ZCLDZCQUE2QjtRQUM3Qiw0QkFBNEI7UUFDNUIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJweFRyYW5zbGF0aW9uTW9kdWxlIH0gZnJvbSAncnB4LXh1aS10cmFuc2xhdGlvbic7XG5pbXBvcnQgeyBEZWxldGVPckNhbmNlbERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vZGVsZXRlLW9yLWNhbmNlbC1kaWFsb2cnO1xuaW1wb3J0IHsgRG9jdW1lbnREaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL2RvY3VtZW50LWRpYWxvZyc7XG5pbXBvcnQgeyBSZW1vdmVEaWFsb2dDb21wb25lbnQgfSBmcm9tICcuL3JlbW92ZS1kaWFsb2cnO1xuaW1wb3J0IHsgU2F2ZU9yRGlzY2FyZERpYWxvZ0NvbXBvbmVudCB9IGZyb20gJy4vc2F2ZS1vci1kaXNjYXJkLWRpYWxvZyc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgUmVhY3RpdmVGb3Jtc01vZHVsZSxcbiAgICBScHhUcmFuc2xhdGlvbk1vZHVsZS5mb3JDaGlsZCgpXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIERvY3VtZW50RGlhbG9nQ29tcG9uZW50LFxuICAgIERlbGV0ZU9yQ2FuY2VsRGlhbG9nQ29tcG9uZW50LFxuICAgIFNhdmVPckRpc2NhcmREaWFsb2dDb21wb25lbnQsXG4gICAgUmVtb3ZlRGlhbG9nQ29tcG9uZW50LFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgRG9jdW1lbnREaWFsb2dDb21wb25lbnQsXG4gICAgRGVsZXRlT3JDYW5jZWxEaWFsb2dDb21wb25lbnQsXG4gICAgU2F2ZU9yRGlzY2FyZERpYWxvZ0NvbXBvbmVudCxcbiAgICBSZW1vdmVEaWFsb2dDb21wb25lbnQsXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgRGlhbG9nc01vZHVsZSB7fVxuIl19