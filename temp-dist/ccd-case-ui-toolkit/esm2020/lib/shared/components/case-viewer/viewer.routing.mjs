import { editorRouting } from '../case-editor';
import { CaseHistoryComponent } from '../case-history';
import { EventStartComponent, MultipleTasksExistComponent, NoTasksAvailableComponent, TaskAssignedComponent, TaskCancelledComponent, TaskConflictComponent, TaskUnassignedComponent } from '../event-start';
import { EventStartGuard } from '../event-start/event-guard/event-start.guard';
import { EventTasksResolverService } from '../event-start/resolvers/event-tasks-resolver.service';
import { FileUploadProgressGuard } from '../palette/document/file-upload-progress.guard';
import { CaseChallengedAccessRequestComponent } from './case-challenged-access-request';
import { CaseChallengedAccessSuccessComponent } from './case-challenged-access-success';
import { CaseEventTriggerComponent } from './case-event-trigger';
import { CaseReviewSpecificAccessRejectComponent } from './case-review-specific-access-reject';
import { CaseReviewSpecificAccessRequestComponent } from './case-review-specific-access-request';
import { CaseSpecificAccessRequestComponent } from './case-specific-access-request';
import { CaseSpecificAccessSuccessComponent } from './case-specific-access-success';
import { CasePrinterComponent } from './printer/case-printer.component';
import { EventTriggerResolver } from './services/event-trigger.resolver';
export const viewerRouting = [
    {
        path: 'print',
        component: CasePrinterComponent,
    },
    {
        path: 'trigger/:eid',
        resolve: {
            eventTrigger: EventTriggerResolver,
        },
        component: CaseEventTriggerComponent,
        children: editorRouting,
        canActivate: [EventStartGuard],
        canDeactivate: [FileUploadProgressGuard],
    },
    {
        path: 'event-start',
        component: EventStartComponent,
        resolve: {
            tasks: EventTasksResolverService
        }
    },
    {
        path: 'task-assigned',
        component: TaskAssignedComponent
    },
    {
        path: 'task-unassigned',
        component: TaskUnassignedComponent
    },
    {
        path: 'multiple-tasks-exist',
        component: MultipleTasksExistComponent
    },
    {
        path: 'no-tasks-available',
        component: NoTasksAvailableComponent
    },
    {
        path: 'task-cancelled',
        component: TaskCancelledComponent
    },
    {
        path: 'task-conflict',
        component: TaskConflictComponent
    },
    {
        path: 'event/:eid/history',
        component: CaseHistoryComponent,
    },
    {
        path: 'challenged-access-request',
        children: [
            {
                path: '',
                component: CaseChallengedAccessRequestComponent,
                data: {
                    title: 'Request Challenged Access',
                },
                pathMatch: 'full',
            },
            {
                path: 'success',
                component: CaseChallengedAccessSuccessComponent,
                data: {
                    title: 'Challenged Access Success',
                },
            },
        ],
    },
    {
        path: 'specific-access-request',
        children: [
            {
                path: '',
                component: CaseSpecificAccessRequestComponent,
                data: {
                    title: 'Request Specific Access',
                },
                pathMatch: 'full',
            },
            {
                path: 'success',
                component: CaseSpecificAccessSuccessComponent,
                data: {
                    title: 'Specific Access Success',
                },
            },
        ],
    },
    {
        path: 'review-specific-access-request',
        children: [
            {
                path: '',
                component: CaseReviewSpecificAccessRequestComponent,
                data: {
                    title: 'Request Specific Access',
                },
                pathMatch: 'full',
            },
            {
                path: 'rejected',
                component: CaseReviewSpecificAccessRejectComponent,
                data: {
                    title: 'Review Access Rejected'
                }
            }
        ],
    },
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlld2VyLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jY2QtY2FzZS11aS10b29sa2l0L3NyYy9saWIvc2hhcmVkL2NvbXBvbmVudHMvY2FzZS12aWV3ZXIvdmlld2VyLnJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFDTCxtQkFBbUIsRUFDbkIsMkJBQTJCLEVBQzNCLHlCQUF5QixFQUN6QixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDeEIsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4QixPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sOENBQThDLENBQUM7QUFDL0UsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sdURBQXVELENBQUM7QUFDbEcsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZ0RBQWdELENBQUM7QUFDekYsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEYsT0FBTyxFQUFFLG9DQUFvQyxFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUFFLHVDQUF1QyxFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDL0YsT0FBTyxFQUFFLHdDQUF3QyxFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDakcsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLGtDQUFrQyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFekUsTUFBTSxDQUFDLE1BQU0sYUFBYSxHQUFXO0lBQ25DO1FBQ0UsSUFBSSxFQUFFLE9BQU87UUFDYixTQUFTLEVBQUUsb0JBQW9CO0tBQ2hDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsY0FBYztRQUNwQixPQUFPLEVBQUU7WUFDUCxZQUFZLEVBQUUsb0JBQW9CO1NBQ25DO1FBQ0QsU0FBUyxFQUFFLHlCQUF5QjtRQUNwQyxRQUFRLEVBQUUsYUFBYTtRQUN2QixXQUFXLEVBQUUsQ0FBQyxlQUFlLENBQUM7UUFDOUIsYUFBYSxFQUFFLENBQUMsdUJBQXVCLENBQUM7S0FDekM7SUFDRDtRQUNFLElBQUksRUFBRSxhQUFhO1FBQ25CLFNBQVMsRUFBRSxtQkFBbUI7UUFDOUIsT0FBTyxFQUFFO1lBQ1AsS0FBSyxFQUFFLHlCQUF5QjtTQUNqQztLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZUFBZTtRQUNyQixTQUFTLEVBQUUscUJBQXFCO0tBQ2pDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsaUJBQWlCO1FBQ3ZCLFNBQVMsRUFBRSx1QkFBdUI7S0FDbkM7SUFDRDtRQUNFLElBQUksRUFBRSxzQkFBc0I7UUFDNUIsU0FBUyxFQUFFLDJCQUEyQjtLQUN2QztJQUNEO1FBQ0UsSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixTQUFTLEVBQUUseUJBQXlCO0tBQ3JDO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0JBQWdCO1FBQ3RCLFNBQVMsRUFBRSxzQkFBc0I7S0FDbEM7SUFDRDtRQUNFLElBQUksRUFBRSxlQUFlO1FBQ3JCLFNBQVMsRUFBRSxxQkFBcUI7S0FDakM7SUFDRDtRQUNFLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsU0FBUyxFQUFFLG9CQUFvQjtLQUNoQztJQUNEO1FBQ0UsSUFBSSxFQUFFLDJCQUEyQjtRQUNqQyxRQUFRLEVBQUU7WUFDUjtnQkFDRSxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsb0NBQW9DO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLDJCQUEyQjtpQkFDbkM7Z0JBQ0QsU0FBUyxFQUFFLE1BQU07YUFDbEI7WUFDRDtnQkFDRSxJQUFJLEVBQUUsU0FBUztnQkFDZixTQUFTLEVBQUUsb0NBQW9DO2dCQUMvQyxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLDJCQUEyQjtpQkFDbkM7YUFDRjtTQUNGO0tBQ0Y7SUFDRDtRQUNFLElBQUksRUFBRSx5QkFBeUI7UUFDL0IsUUFBUSxFQUFFO1lBQ1I7Z0JBQ0UsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLGtDQUFrQztnQkFDN0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSx5QkFBeUI7aUJBQ2pDO2dCQUNELFNBQVMsRUFBRSxNQUFNO2FBQ2xCO1lBQ0Q7Z0JBQ0UsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsU0FBUyxFQUFFLGtDQUFrQztnQkFDN0MsSUFBSSxFQUFFO29CQUNKLEtBQUssRUFBRSx5QkFBeUI7aUJBQ2pDO2FBQ0Y7U0FDRjtLQUNGO0lBQ0Q7UUFDRSxJQUFJLEVBQUUsZ0NBQWdDO1FBQ3RDLFFBQVEsRUFBRTtZQUNSO2dCQUNFLElBQUksRUFBRSxFQUFFO2dCQUNSLFNBQVMsRUFBRSx3Q0FBd0M7Z0JBQ25ELElBQUksRUFBRTtvQkFDSixLQUFLLEVBQUUseUJBQXlCO2lCQUNqQztnQkFDRCxTQUFTLEVBQUUsTUFBTTthQUNsQjtZQUNEO2dCQUNFLElBQUksRUFBRSxVQUFVO2dCQUNoQixTQUFTLEVBQUUsdUNBQXVDO2dCQUNsRCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLHdCQUF3QjtpQkFDaEM7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUm91dGVzIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IGVkaXRvclJvdXRpbmcgfSBmcm9tICcuLi9jYXNlLWVkaXRvcic7XG5pbXBvcnQgeyBDYXNlSGlzdG9yeUNvbXBvbmVudCB9IGZyb20gJy4uL2Nhc2UtaGlzdG9yeSc7XG5pbXBvcnQge1xuICBFdmVudFN0YXJ0Q29tcG9uZW50LFxuICBNdWx0aXBsZVRhc2tzRXhpc3RDb21wb25lbnQsXG4gIE5vVGFza3NBdmFpbGFibGVDb21wb25lbnQsXG4gIFRhc2tBc3NpZ25lZENvbXBvbmVudCxcbiAgVGFza0NhbmNlbGxlZENvbXBvbmVudCxcbiAgVGFza0NvbmZsaWN0Q29tcG9uZW50LFxuICBUYXNrVW5hc3NpZ25lZENvbXBvbmVudFxufSBmcm9tICcuLi9ldmVudC1zdGFydCc7XG5pbXBvcnQgeyBFdmVudFN0YXJ0R3VhcmQgfSBmcm9tICcuLi9ldmVudC1zdGFydC9ldmVudC1ndWFyZC9ldmVudC1zdGFydC5ndWFyZCc7XG5pbXBvcnQgeyBFdmVudFRhc2tzUmVzb2x2ZXJTZXJ2aWNlIH0gZnJvbSAnLi4vZXZlbnQtc3RhcnQvcmVzb2x2ZXJzL2V2ZW50LXRhc2tzLXJlc29sdmVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgRmlsZVVwbG9hZFByb2dyZXNzR3VhcmQgfSBmcm9tICcuLi9wYWxldHRlL2RvY3VtZW50L2ZpbGUtdXBsb2FkLXByb2dyZXNzLmd1YXJkJztcbmltcG9ydCB7IENhc2VDaGFsbGVuZ2VkQWNjZXNzUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1yZXF1ZXN0JztcbmltcG9ydCB7IENhc2VDaGFsbGVuZ2VkQWNjZXNzU3VjY2Vzc0NvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1jaGFsbGVuZ2VkLWFjY2Vzcy1zdWNjZXNzJztcbmltcG9ydCB7IENhc2VFdmVudFRyaWdnZXJDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtZXZlbnQtdHJpZ2dlcic7XG5pbXBvcnQgeyBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZWplY3RDb21wb25lbnQgfSBmcm9tICcuL2Nhc2UtcmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZWplY3QnO1xuaW1wb3J0IHsgQ2FzZVJldmlld1NwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1yZXZpZXctc3BlY2lmaWMtYWNjZXNzLXJlcXVlc3QnO1xuaW1wb3J0IHsgQ2FzZVNwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCB9IGZyb20gJy4vY2FzZS1zcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdCc7XG5pbXBvcnQgeyBDYXNlU3BlY2lmaWNBY2Nlc3NTdWNjZXNzQ29tcG9uZW50IH0gZnJvbSAnLi9jYXNlLXNwZWNpZmljLWFjY2Vzcy1zdWNjZXNzJztcbmltcG9ydCB7IENhc2VQcmludGVyQ29tcG9uZW50IH0gZnJvbSAnLi9wcmludGVyL2Nhc2UtcHJpbnRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRUcmlnZ2VyUmVzb2x2ZXIgfSBmcm9tICcuL3NlcnZpY2VzL2V2ZW50LXRyaWdnZXIucmVzb2x2ZXInO1xuXG5leHBvcnQgY29uc3Qgdmlld2VyUm91dGluZzogUm91dGVzID0gW1xuICB7XG4gICAgcGF0aDogJ3ByaW50JyxcbiAgICBjb21wb25lbnQ6IENhc2VQcmludGVyQ29tcG9uZW50LFxuICB9LFxuICB7XG4gICAgcGF0aDogJ3RyaWdnZXIvOmVpZCcsXG4gICAgcmVzb2x2ZToge1xuICAgICAgZXZlbnRUcmlnZ2VyOiBFdmVudFRyaWdnZXJSZXNvbHZlcixcbiAgICB9LFxuICAgIGNvbXBvbmVudDogQ2FzZUV2ZW50VHJpZ2dlckNvbXBvbmVudCxcbiAgICBjaGlsZHJlbjogZWRpdG9yUm91dGluZyxcbiAgICBjYW5BY3RpdmF0ZTogW0V2ZW50U3RhcnRHdWFyZF0sXG4gICAgY2FuRGVhY3RpdmF0ZTogW0ZpbGVVcGxvYWRQcm9ncmVzc0d1YXJkXSxcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdldmVudC1zdGFydCcsXG4gICAgY29tcG9uZW50OiBFdmVudFN0YXJ0Q29tcG9uZW50LFxuICAgIHJlc29sdmU6IHtcbiAgICAgIHRhc2tzOiBFdmVudFRhc2tzUmVzb2x2ZXJTZXJ2aWNlXG4gICAgfVxuICB9LFxuICB7XG4gICAgcGF0aDogJ3Rhc2stYXNzaWduZWQnLFxuICAgIGNvbXBvbmVudDogVGFza0Fzc2lnbmVkQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAndGFzay11bmFzc2lnbmVkJyxcbiAgICBjb21wb25lbnQ6IFRhc2tVbmFzc2lnbmVkQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnbXVsdGlwbGUtdGFza3MtZXhpc3QnLFxuICAgIGNvbXBvbmVudDogTXVsdGlwbGVUYXNrc0V4aXN0Q29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnbm8tdGFza3MtYXZhaWxhYmxlJyxcbiAgICBjb21wb25lbnQ6IE5vVGFza3NBdmFpbGFibGVDb21wb25lbnRcbiAgfSxcbiAge1xuICAgIHBhdGg6ICd0YXNrLWNhbmNlbGxlZCcsXG4gICAgY29tcG9uZW50OiBUYXNrQ2FuY2VsbGVkQ29tcG9uZW50XG4gIH0sXG4gIHtcbiAgICBwYXRoOiAndGFzay1jb25mbGljdCcsXG4gICAgY29tcG9uZW50OiBUYXNrQ29uZmxpY3RDb21wb25lbnRcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdldmVudC86ZWlkL2hpc3RvcnknLFxuICAgIGNvbXBvbmVudDogQ2FzZUhpc3RvcnlDb21wb25lbnQsXG4gIH0sXG4gIHtcbiAgICBwYXRoOiAnY2hhbGxlbmdlZC1hY2Nlc3MtcmVxdWVzdCcsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGNvbXBvbmVudDogQ2FzZUNoYWxsZW5nZWRBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6ICdSZXF1ZXN0IENoYWxsZW5nZWQgQWNjZXNzJyxcbiAgICAgICAgfSxcbiAgICAgICAgcGF0aE1hdGNoOiAnZnVsbCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnc3VjY2VzcycsXG4gICAgICAgIGNvbXBvbmVudDogQ2FzZUNoYWxsZW5nZWRBY2Nlc3NTdWNjZXNzQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6ICdDaGFsbGVuZ2VkIEFjY2VzcyBTdWNjZXNzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHBhdGg6ICdzcGVjaWZpYy1hY2Nlc3MtcmVxdWVzdCcsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJycsXG4gICAgICAgIGNvbXBvbmVudDogQ2FzZVNwZWNpZmljQWNjZXNzUmVxdWVzdENvbXBvbmVudCxcbiAgICAgICAgZGF0YToge1xuICAgICAgICAgIHRpdGxlOiAnUmVxdWVzdCBTcGVjaWZpYyBBY2Nlc3MnLFxuICAgICAgICB9LFxuICAgICAgICBwYXRoTWF0Y2g6ICdmdWxsJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHBhdGg6ICdzdWNjZXNzJyxcbiAgICAgICAgY29tcG9uZW50OiBDYXNlU3BlY2lmaWNBY2Nlc3NTdWNjZXNzQ29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6ICdTcGVjaWZpYyBBY2Nlc3MgU3VjY2VzcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBwYXRoOiAncmV2aWV3LXNwZWNpZmljLWFjY2Vzcy1yZXF1ZXN0JyxcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICBwYXRoOiAnJyxcbiAgICAgICAgY29tcG9uZW50OiBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZXF1ZXN0Q29tcG9uZW50LFxuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgdGl0bGU6ICdSZXF1ZXN0IFNwZWNpZmljIEFjY2VzcycsXG4gICAgICAgIH0sXG4gICAgICAgIHBhdGhNYXRjaDogJ2Z1bGwnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgcGF0aDogJ3JlamVjdGVkJyxcbiAgICAgICAgY29tcG9uZW50OiBDYXNlUmV2aWV3U3BlY2lmaWNBY2Nlc3NSZWplY3RDb21wb25lbnQsXG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICB0aXRsZTogJ1JldmlldyBBY2Nlc3MgUmVqZWN0ZWQnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICBdLFxuICB9LFxuXTtcbiJdfQ==