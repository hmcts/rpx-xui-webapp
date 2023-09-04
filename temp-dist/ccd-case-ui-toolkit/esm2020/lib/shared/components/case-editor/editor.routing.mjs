import { FileUploadProgressGuard } from '../palette/document/file-upload-progress.guard';
import { CaseEditConfirmComponent } from './case-edit-confirm/case-edit-confirm.component';
import { CaseEditPageComponent } from './case-edit-page/case-edit-page.component';
import { CaseEditSubmitComponent } from './case-edit-submit/case-edit-submit.component';
import { CaseEditWizardGuard } from './services/case-edit-wizard.guard';
export const editorRouting = [
    {
        path: '',
        resolve: {
            caseEditWizardGuard: CaseEditWizardGuard,
        },
        component: CaseEditPageComponent,
    },
    {
        path: 'submit',
        component: CaseEditSubmitComponent,
    },
    {
        path: 'confirm',
        component: CaseEditConfirmComponent,
    },
    {
        path: ':page',
        resolve: {
            caseEditWizardGuard: CaseEditWizardGuard,
        },
        canDeactivate: [FileUploadProgressGuard],
        component: CaseEditPageComponent,
    }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdG9yLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS1lZGl0b3IvZWRpdG9yLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0saURBQWlELENBQUM7QUFDM0YsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDbEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0NBQStDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFeEUsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFXO0lBQ25DO1FBQ0UsSUFBSSxFQUFFLEVBQUU7UUFDUixPQUFPLEVBQUU7WUFDUCxtQkFBbUIsRUFBRSxtQkFBbUI7U0FDekM7UUFDRCxTQUFTLEVBQUUscUJBQXFCO0tBQ2pDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsUUFBUTtRQUNkLFNBQVMsRUFBRSx1QkFBdUI7S0FDbkM7SUFDRDtRQUNFLElBQUksRUFBRSxTQUFTO1FBQ2YsU0FBUyxFQUFFLHdCQUF3QjtLQUNwQztJQUNEO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixPQUFPLEVBQUU7WUFDUCxtQkFBbUIsRUFBRSxtQkFBbUI7U0FDekM7UUFDRCxhQUFhLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQztRQUN4QyxTQUFTLEVBQUUscUJBQXFCO0tBQ2pDO0NBQ0YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJvdXRlcyB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQgeyBGaWxlVXBsb2FkUHJvZ3Jlc3NHdWFyZCB9IGZyb20gJy4uL3BhbGV0dGUvZG9jdW1lbnQvZmlsZS11cGxvYWQtcHJvZ3Jlc3MuZ3VhcmQnO1xuaW1wb3J0IHsgQ2FzZUVkaXRDb25maXJtQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWVkaXQtY29uZmlybS9jYXNlLWVkaXQtY29uZmlybS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUVkaXRQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLWVkaXQtcGFnZS9jYXNlLWVkaXQtcGFnZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUVkaXRTdWJtaXRDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtZWRpdC1zdWJtaXQvY2FzZS1lZGl0LXN1Ym1pdC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FzZUVkaXRXaXphcmRHdWFyZCB9IGZyb20gJy4vc2VydmljZXMvY2FzZS1lZGl0LXdpemFyZC5ndWFyZCc7XG5cbmV4cG9ydCBjb25zdCBlZGl0b3JSb3V0aW5nOiBSb3V0ZXMgPSBbXG4gIHtcbiAgICBwYXRoOiAnJyxcbiAgICByZXNvbHZlOiB7XG4gICAgICBjYXNlRWRpdFdpemFyZEd1YXJkOiBDYXNlRWRpdFdpemFyZEd1YXJkLFxuICAgIH0sXG4gICAgY29tcG9uZW50OiBDYXNlRWRpdFBhZ2VDb21wb25lbnQsXG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnc3VibWl0JyxcbiAgICBjb21wb25lbnQ6IENhc2VFZGl0U3VibWl0Q29tcG9uZW50LFxuICB9LFxuICB7XG4gICAgcGF0aDogJ2NvbmZpcm0nLFxuICAgIGNvbXBvbmVudDogQ2FzZUVkaXRDb25maXJtQ29tcG9uZW50LFxuICB9LFxuICB7XG4gICAgcGF0aDogJzpwYWdlJyxcbiAgICByZXNvbHZlOiB7XG4gICAgICBjYXNlRWRpdFdpemFyZEd1YXJkOiBDYXNlRWRpdFdpemFyZEd1YXJkLFxuICAgIH0sXG4gICAgY2FuRGVhY3RpdmF0ZTogW0ZpbGVVcGxvYWRQcm9ncmVzc0d1YXJkXSxcbiAgICBjb21wb25lbnQ6IENhc2VFZGl0UGFnZUNvbXBvbmVudCxcbiAgfVxuXTtcbiJdfQ==