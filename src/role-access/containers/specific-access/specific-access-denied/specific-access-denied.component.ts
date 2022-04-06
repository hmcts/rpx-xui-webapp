import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Answer, SpecificAccessNavigationEvent, SpecificAccessState } from '../../../models';
import { SpecificAccessNavigation } from '../../../models/specific-access-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-specific-access-denied',
  templateUrl: './specific-access-denied.component.html'
})
export class SpecificAccessDeniedComponent implements OnDestroy {

  @Input() public navEvent: SpecificAccessNavigation;

  public answers: Answer[] = [];
  public caseId: string;
  public storeSubscription: Subscription;
  public readonly retunToTask = 'Return to the Tasks tab for this case';
  public readonly returnToMyTask = 'Return to My tasks';

  constructor(private readonly router: Router,
              private readonly store: Store<fromFeature.State>) {
    this.storeSubscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe();
  }

  public ngOnDestroy(): void {
    if (this.storeSubscription) {
      this.storeSubscription.unsubscribe();
    }
  }

  public navigationHandler(navEvent: SpecificAccessNavigationEvent) {
    switch (navEvent) {
      case SpecificAccessNavigationEvent.RETURNTOMYTASKS:
        this.router.navigate(['/work/my-work/list']);
        break;
      case SpecificAccessNavigationEvent.RETURNTOTASKSTAB:
        // will not currently work as do not know case id
        this.router.navigate([`/cases/case-details/${this.caseId}`]);
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  public onNavigate(action) {
    this.store.dispatch(new fromFeature.ChangeSpecificAccessNavigation(action));
  }
}

