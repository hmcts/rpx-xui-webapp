import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { HearingConditions } from '../../models/hearingConditions';
import { HearingSummaryEnum, HearingTemplate, Mode } from '../../models/hearings.enum';
import { Section } from '../../models/section';
import * as fromHearingStore from '../../store';

@Component({
  selector: 'exui-hearing-summary',
  templateUrl: './hearing-summary.component.html',
  styleUrls: ['./hearing-summary.component.scss']
})
export class HearingSummaryComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() public template: Section[];
  @Input() public mode: Mode;
  public listingTemplate: string = HearingTemplate.LISTING_INFORMATION;
  public partiesTemplate: string = HearingTemplate.PARTIES_TEMPLATE;
  public hearingState$: Observable<fromHearingStore.State>;
  public validationErrors: { id: string, message: string }[] = [];
  public sub: Subscription;

  constructor(protected readonly hearingStore: Store<fromHearingStore.State>,
              protected readonly router: Router,
              protected readonly route: ActivatedRoute) {
    this.hearingState$ = this.hearingStore.pipe(select(fromHearingStore.getHearingsFeatureState));
  }

  public ngOnInit(): void {
    this.sub = this.hearingState$.subscribe((state) => {
      if (state.hearingRequest.lastError) {
        this.validationErrors = [];
        this.validationErrors.push({
          id: '', message: HearingSummaryEnum.BackendError
        });
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
      }
    });
  }

  public ngAfterViewInit(): void {
    this.fragmentFocus();
  }

  public ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  public fragmentFocus(): void {
    this.route.fragment.subscribe((frag) => {
      const element = document.getElementById(frag);
      if (element) {
        element.scrollIntoView();
        element.focus();
      }
    });
  }

  public changeAnswer(event: MouseEvent, id: string, changeLink: string): void {
    event.preventDefault();

    const hearingCondition: HearingConditions = {
      fragmentId: id,
      mode: this.mode
    };
    this.hearingStore.dispatch(new fromHearingStore.SaveHearingConditions(hearingCondition));
    this.router.navigateByUrl(changeLink);
  }
}
