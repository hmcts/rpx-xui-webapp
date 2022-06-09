import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Task } from '../../../../work-allocation-2/models/tasks';
import { CaseworkerDataService } from '../../../../work-allocation-2/services';
import { specificAccessApprovedVisibilityStates, specificAccessDeniedVisibilityStates, specificAccessDurationVisibilityStates, specificAccessInformationVisibilityStates, specificAccessReviewVisibilityStates } from '../../../constants';
import { CaseRole, SpecificAccessNavigationEvent, SpecificAccessState, SpecificAccessStateData } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';
import { SpecificAccessReviewComponent } from '../specific-access-review/specific-access-review.component';
import { SpecificAccessDurationComponent } from '../specific-access-duration/specific-access-duration.component';
import { SpecificAccessApprovedComponent } from '../specific-access-approved/specific-access-approved.component';
import { SpecificAccessInformationComponent } from '../specific-access-information/specific-access-information.component';
import { SpecificAccessDeniedComponent } from '../specific-access-denied/specific-access-denied.component';

@Component({
  selector: 'exui-specific-access-home',
  templateUrl: './specific-access-home.component.html',
  styleUrls: ['./specific-access-home.component.scss']
})
export class SpecificAccessHomeComponent implements OnInit, OnDestroy {
  @ViewChild('specificAccessReview', { read: SpecificAccessReviewComponent })
  public specificAccessReviewComponent: SpecificAccessReviewComponent;

  @ViewChild('specificAccessDuration', { read: SpecificAccessDurationComponent })
  public specificAccessDurationComponent: SpecificAccessDurationComponent;

  @ViewChild('specificAccessApproved', { read: SpecificAccessApprovedComponent })
  public specificAccessApprovedComponent: SpecificAccessApprovedComponent;

  @ViewChild('specificAccessInformation', { read: SpecificAccessInformationComponent })
  public specificAccessInformationComponent: SpecificAccessInformationComponent;

  @ViewChild('specificAccessDenied', { read: SpecificAccessDeniedComponent })
  public specificAccessDeniedComponent: SpecificAccessDeniedComponent;

  public caseId: string;

  public task: Task;
  public role: CaseRole;

  private specificAccessStateDataSub: Subscription;
  public specificAccessReviewStateData: SpecificAccessStateData;
  public navigationCurrentState: SpecificAccessState;
  public navEvent: SpecificAccessNavigation;
  public specificAccessReviewVisibilityStates = specificAccessReviewVisibilityStates;
  public specificAccessDurationVisibilityStates = specificAccessDurationVisibilityStates;
  public specificAccessApprovedVisibilityStates = specificAccessApprovedVisibilityStates;
  public specificAccessInformationVisibilityStates = specificAccessInformationVisibilityStates;
  public specificAccessDeniedVisibilityStates = specificAccessDeniedVisibilityStates;

  constructor(
    private readonly store: Store<fromFeature.State>,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  public ngOnInit(): void {
    this.task = this.route.snapshot.data.taskAndRole.task.task;
    this.role = this.route.snapshot.data.taskAndRole.role[0];
    this.store.dispatch(new fromFeature.SetSpecificAccessInitData(
      {caseId: this.task.case_id,
      taskId: this.task.id,
      requestId: this.role.id,
      jurisdiction: this.task.jurisdiction,
      caseName: this.task.case_name,
      requestCreated: this.role.created,
      actorId: this.role.actorId,
      accessReason: this.role.notes,
      roleCategory: this.role.roleCategory,
      requestedRole: this.role.requestedRole
      }));
    this.specificAccessStateDataSub = this.store.pipe(select(fromFeature.getSpecificAccessState)).subscribe(
      specificAccessReviewStateData => {
        this.navigationCurrentState = specificAccessReviewStateData.state;
      }
    );
  }

  public onNavEvent(event: SpecificAccessNavigationEvent): void {
    this.navEvent = {
      event,
      timestamp: Date.now()
    };
    this.navigationHandler(event);
  }

  public isComponentVisible(currentNavigationState: SpecificAccessState, requiredNavigationState: SpecificAccessState[]): boolean {
    return requiredNavigationState.includes(currentNavigationState);
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    const selectedDurationOption = this.specificAccessDurationComponent ? this.specificAccessDurationComponent.selectedDuration : null;
    const selectedDurationPeriod = this.specificAccessDurationComponent ? this.specificAccessDurationComponent.getRawData() : null;
    const moreInformation = this.specificAccessInformationComponent ? this.specificAccessInformationComponent.getRawData() : null;

    if ( this.specificAccessDurationComponent) {
      this.store.dispatch(new fromFeature.SetSpecificAccessFormData(
        {
          specificAccessDurationForm: { selectedOption: selectedDurationOption, selectedDuration: selectedDurationPeriod }
        }
      ));
    }

    if ( this.specificAccessInformationComponent) {
      this.store.dispatch(new fromFeature.SetSpecificAccessInfoFormData(
        {
          InfoText: moreInformation
        }
      ));
    }

    switch (navEvent) {
      case SpecificAccessNavigationEvent.BACK: {
        switch (this.navigationCurrentState) {
          case SpecificAccessState.SPECIFIC_ACCESS_DURATION:
            this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
            break;
          case SpecificAccessState.SPECIFIC_ACCESS_APPROVED:
              this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DURATION));
              break;
          case SpecificAccessState.SPECIFIC_ACCESS_INFORMATION:
            this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
            break;
            default:
            throw new Error('Invalid specific access state');
        }
        break;
      }
      case SpecificAccessNavigationEvent.CONTINUE: {
        switch (this.navigationCurrentState) {
          case SpecificAccessState.SPECIFIC_ACCESS_REVIEW:
            this.specificAccessReviewComponent.navigationHandler(navEvent);
            break;
          case SpecificAccessState.SPECIFIC_ACCESS_DURATION:
            this.specificAccessDurationComponent.navigationHandler(navEvent);
            break;
            case SpecificAccessState.SPECIFIC_ACCESS_INFORMATION:
              this.specificAccessInformationComponent.navigationHandler(navEvent);
              break;
          default:
            break;
          // throw new Error('Invalid specific access state');
        }
        break;
      }
      case SpecificAccessNavigationEvent.RETURNTOMYTASKS: {
        this.router.navigateByUrl(`/work/my-work/list`);
        break;
      }
      case SpecificAccessNavigationEvent.RETURNTOTASKSTAB: {
        this.router.navigateByUrl(`/cases/case-details/${this.caseId}/tasks`);
        break;
      }
      case SpecificAccessNavigationEvent.CANCEL: {
        this.router.navigateByUrl(`cases/case-details/${this.caseId}/roles-and-access`);
        break;
      }
      default:
        throw new Error('Invalid specific access navigation event');
    }
  }

  public ngOnDestroy(): void {
    if (this.specificAccessStateDataSub) {
      this.specificAccessStateDataSub.unsubscribe();
    }
  }
}
