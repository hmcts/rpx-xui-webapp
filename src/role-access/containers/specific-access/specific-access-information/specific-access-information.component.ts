import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SpecificAccessNavigationEvent, SpecificAccessState, SpecificAccessStateData } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';
import { RoleCategory } from '@hmcts/rpx-xui-common-lib';
@Component({
  selector: 'exui-specific-access-information',
  templateUrl: './specific-access-information.component.html'
})
export class SpecificAccessInformationComponent implements OnDestroy, OnInit {

  @Input() public navEvent: SpecificAccessNavigation;
  @Input() public title = 'Request more information';
  @Input() public caption = 'Reject specific access request';

  public subscription: Subscription;
  public formGroup: FormGroup;
  public infoCtrl: FormControl;
  public error: any = null;
  public controlName = 'infoCtrl';
  public submitted: boolean = true;

  constructor(public readonly store: Store<fromFeature.State>, private readonly fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.submitted = false;
    this.formGroup = this.fb.group({
      infoCtrl: new FormControl(null, Validators.required)
    });
    this.infoCtrl = this.formGroup.get('infoCtrl') as FormControl;
    this.store.pipe(select(fromFeature.getSpecificAccessState)).pipe(take(1)).subscribe((specificAccessState) => {
      if (specificAccessState.SpecificAccessMoreInformationFormData && specificAccessState.SpecificAccessMoreInformationFormData.InfoText) {
          this.infoCtrl.setValue(specificAccessState.SpecificAccessMoreInformationFormData.InfoText);
      }
    });
  }
  public navigationHandler(navEvent: SpecificAccessNavigationEvent): void {
    /************************************************************************* */
    const  approvalRole = {id: 'specific-access-granted', name: 'specific-access-granted'};
    const specificAccessMockState: SpecificAccessStateData = {
      state: SpecificAccessState.SPECIFIC_ACCESS_DURATION,
      accessReason: null,
      typeOfRole: approvalRole,
      //period: period,
      // note: adding example details here to reach endpoint without previous access info
      caseId: '1599729079005640',
      requestId: 'f837c7e7-33e2-445e-8b0c-98640767932c',
      jurisdiction: 'IA',
      roleCategory: RoleCategory.CASEWORKER,
      requestedRole: 'specific-access-legal-ops',
      person: {id: 'db17f6f7-1abf-4223-8b5e-1eece04ee5d8', name: null, domain: null}
      }
      switch (navEvent) {
        case SpecificAccessNavigationEvent.CONTINUE:
          /* TODO: at some point will need all four steps on node layer
           1) create approved request role
           2) create specified role for user (of type specific-access-(admin/judge/caseworker))
           3) delete specific access request role
           4) complete task
           https://tools.hmcts.net/confluence/pages/viewpage.action?pageId=1507726018#ExpertUIDesignOverviewCaseAccessManagement-ReviewRoleAssignments-Approve
          */
          this.submitted = true;
          if (!this.formGroup.valid) {
            this.error = this.getErrorObject();
            return;
          }
          debugger;
          this.store.dispatch(new fromFeature.RequestMoreInfoSpecificAccessRequest(specificAccessMockState));





          // this.bookingService.createBooking(payload).pipe(
          //   switchMap(() => {
          //     return this.bookingService.refreshRoleAssignments().pipe(
          //       catchError(err => {
          //         return throwError({...err, case : 'refreshRoleAssignments'});
          //       })
          //     );
          //   }),
          //   catchError(err => {
          //     if ( !err.case) {
          //     return throwError({...err, case : 'createBooking'});
          //   }
          //     return throwError({...err, case : 'refreshRoleAssignments'});
          // })
          // ).subscribe(() => {


         // this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED));

          //   // this.sessionStorageService.removeItem(TaskListFilterComponent.FILTER_NAME);
          //   // this.windowService.removeLocalStorage(TaskListFilterComponent.FILTER_NAME);
          //   // this.router.navigate(['/work/my-work/list'], {
          //   //   state: {
          //   //     location: {
          //   //       id: this.bookingProcess.location.epimms_id
          //   //     }
          //   //   }
          //   // });
          // }
          // ,
          // err => {
          //   //Should direct error page , it should not have to be dispatch
          //   this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED));

          //   // if ( err.case === 'createBooking') {
          //   //   CreateBookingHandleError(err, this.router)
          //   // } else {
          //   //   RefreshBookingHandleError(err, this.router)
          //   // }
          // });


          //this.store.dispatch(new fromFeature.RequestMoreInfoSpecificAccessRequest(specificAccessMockState));
             //denied and request-more-info navigate same page so navidation redirects to (SpecificAccessState.SPECIFIC_ACCESS_DENIED)
             //this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED));

          break;
          case SpecificAccessNavigationEvent.BACK:
            // need to hold comment
            this.submitted = true;
            if (!this.formGroup.valid) {
              this.error = this.getErrorObject();
              return;
            }

            break;
        default:
          throw new Error('Invalid option');
      }

    /**************************************************************************/
    // this.submitted = true;
    // if (!this.formGroup.valid) {
    //   this.error = this.getErrorObject();
    //   return;
    // }
    // this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_DENIED));
  }

  public getRawData(): any {
    return this.infoCtrl.value;
  }

  public getErrorObject(): any {
    return {
      title: 'There is a problem',
      description: 'Enter Details',
      fieldId: 'Description'
    };
  }

  // public dispatchEvent(navEvent: SpecificAccessNavigationEvent) {
  //   debugger;
  //   switch (navEvent) {
  //     case SpecificAccessNavigationEvent.BACK:
  //       this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(SpecificAccessState.SPECIFIC_ACCESS_REVIEW));
  //       break;
  //     default:
  //       throw new Error('Not yet implemented');
  //   }
  // }

  public ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
