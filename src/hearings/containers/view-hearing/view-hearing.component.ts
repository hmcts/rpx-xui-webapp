import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromHearingStore from '../../store';

@Component({
  standalone: false,
  selector: 'exui-view-hearing',
  templateUrl: './view-hearing.component.html',
  styleUrls: ['./view-hearing.component.scss'],
})
export class ViewHearingComponent {
  private readonly returnToCaseHearings: boolean;

  constructor(
    private readonly location: Location,
    private readonly router: Router,
    private readonly hearingStore: Store<fromHearingStore.State>
  ) {
    const navState = this.router.getCurrentNavigation()?.extras?.state ?? history.state;
    this.returnToCaseHearings = !!navState?.returnToCaseHearings;
  }

  public onBack(): void {
    if (this.returnToCaseHearings) {
      this.hearingStore
        .select(fromHearingStore.getHearingValuesCaseInfo)
        .pipe(take(1))
        .subscribe((caseInfo) => {
          if (caseInfo?.jurisdictionId && caseInfo?.caseType && caseInfo?.caseReference) {
            this.router.navigate([
              '/',
              'cases',
              'case-details',
              caseInfo.jurisdictionId,
              caseInfo.caseType,
              caseInfo.caseReference,
              'hearings',
            ]);
          } else {
            this.location.back();
          }
        });
      return;
    }
    this.location.back();
  }
}
