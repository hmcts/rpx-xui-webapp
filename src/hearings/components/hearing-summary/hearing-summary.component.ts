import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {HearingConditions} from '../../models/hearingConditions';
import {HearingButtonIds, HearingSummaryEnum, HearingTemplate, Mode} from '../../models/hearings.enum';
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
        this.validationErrors = [];
        this.validationErrors.push({
          id: this.getIdToScroll(), message: HearingSummaryEnum.BackendError
        });
        window.scrollTo({left: 0, top: 0, behavior: 'smooth'});
      }
    });
  }

  private getIdToScroll(): string {
    switch(this.mode) {
      case Mode.CREATE_EDIT:
        return HearingButtonIds.SUBMIT_REQUEST;
      case Mode.VIEW_EDIT:
        return HearingButtonIds.SUBMIT_UPDATED_REQUEST;
      default:
        // The error message will not display if id property is empty
        return 'random-id';
    }
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
