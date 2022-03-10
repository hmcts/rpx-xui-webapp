import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HearingConditions} from '../../models/hearingConditions';
import {HearingTemplate, Mode} from '../../models/hearings.enum';
import {Section} from '../../models/section';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-summary',
  templateUrl: './hearing-summary.component.html',
  styleUrls: ['./hearing-summary.component.scss'],
})
export class HearingSummaryComponent implements OnInit, AfterViewInit {

  @Input() public template: Section[];
  @Input() public mode: Mode;
  public listingTemplate: string = HearingTemplate.LISTING_INFORMATION;
  public hearingState$: Observable<fromHearingStore.State>;
  public validationErrors: { id: string, message: string }[] = [];

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router,
              protected readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.hearingState$.subscribe(state => {
      if (state.hearingRequest.lastError) {
        this.validationErrors.push({
          id: 'hearing-summary', message: 'There was a system error and your request could not be processed. Please try again.'
        });
      }
    });
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public fragmentFocus(): void {
    this.route.fragment.subscribe(frag => {
      const element = document.getElementById(frag);
      if (element) {
        element.scrollIntoView();
        element.focus();
      }
    });
  }

  public changeAnswer(id: string, changeLink: string): void {
    const hearingCondition: HearingConditions = {
      fragmentId: id,
      mode: this.mode,
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(changeLink);
  }
}
