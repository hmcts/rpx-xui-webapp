import { Component, Input } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-confirmation',
  templateUrl: './hearing-confirmation.component.html'
})
export class HearingConfirmationComponent {

  @Input() public heading: string;
  @Input() public headingDescription: string;
  @Input() public subheading: string;
  @Input() public subheadingDescription: string;
  @Input() public additionalDescription: string;

  private hearingState$: Observable<fromHearingStore.State>;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router,
              protected readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  
}
