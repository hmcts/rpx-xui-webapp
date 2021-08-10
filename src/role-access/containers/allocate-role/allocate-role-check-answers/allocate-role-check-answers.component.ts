import { Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import {
  AllocateRoleNavigation,
  AllocateRoleNavigationEvent,
  AllocateRoleState,
  AllocateRoleStateData,
  AllocateTo,
  Answer,
  DurationOfRole,
  TypeOfRole
} from '../../../models';
import { AnswerHeaderText, AnswerLabelText, RoleAllocationCaptionText } from '../../../models/enums';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-check-answers',
  templateUrl: './allocate-role-check-answers.component.html'
})
export class AllocateRoleCheckAnswersComponent implements OnInit {

  @Input() public navEvent: AllocateRoleNavigation;

  public answers: Answer[] = [];
  public caption: string = '';
  public heading: AnswerHeaderText = AnswerHeaderText.CheckAnswers;
  public hint: AnswerHeaderText = AnswerHeaderText.CheckInformation;
  public storeSubscription: Subscription;
  private allocateRoleStateData: AllocateRoleStateData;
  public typeOfRole: string;
  public allocateTo: AllocateTo;

  constructor(private readonly store: Store<fromFeature.State>) {
    this.storeSubscription = this.store.pipe(select(fromFeature.getAllocateRoleState))
      .subscribe(allocateRole => this.setAnswersFromAllocateRoleStateStore(allocateRole));
  }

  public ngOnInit(): void {
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent) {
    switch (navEvent) {
      case AllocateRoleNavigationEvent.CONFIRM:
        this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(AllocateRoleState.CONFIRM_ALLOCATION));
        break;
      default:
        throw new Error('Invalid option');
    }
  }

  private setAnswersFromAllocateRoleStateStore(allocateRoleStateData: AllocateRoleStateData): void {
    this.allocateRoleStateData = allocateRoleStateData;
    this.typeOfRole = allocateRoleStateData.typeOfRole;
    this.allocateTo = allocateRoleStateData.allocateTo;
    if (this.typeOfRole === TypeOfRole.CASE_MANAGER) {
      this.caption = RoleAllocationCaptionText.LegalOpsAllocate;
    } else {
      this.caption = `Allocate a ${this.typeOfRole.toLowerCase()}`;
    }
    this.answers = [];
    this.answers.push({ label: AnswerLabelText.TypeOfRole, value: allocateRoleStateData.typeOfRole, action: AllocateRoleState.CHOOSE_ROLE });
    this.answers.push({ label: AnswerLabelText.WhoBeAllocatedTo, value: allocateRoleStateData.allocateTo, action: AllocateRoleState.CHOOSE_ALLOCATE_TO });
    let personDetails = allocateRoleStateData.person.name;
    if (allocateRoleStateData.person.email) {
      personDetails += `\n${allocateRoleStateData.person.email}`;
    }
    if (allocateRoleStateData.allocateTo === AllocateTo.ALLOCATE_TO_ANOTHER_PERSON) {
      this.answers.push({ label: AnswerLabelText.Person, value: personDetails, action: AllocateRoleState.SEARCH_PERSON });
    }
    let durationOfRole;
    const startDate = moment.parseZone(allocateRoleStateData.period.startDate).format('DD MMMM YYYY');
    let endDate;
    if (allocateRoleStateData.durationOfRole === DurationOfRole.INDEFINITE) {
      durationOfRole = DurationOfRole.INDEFINITE;
    } else if (allocateRoleStateData.durationOfRole === DurationOfRole.SEVEN_DAYS) {
      endDate = moment.parseZone(allocateRoleStateData.period.startDate).add(7, 'days').format('DD MMMM YYYY');
      durationOfRole = `${startDate} to ${endDate}`;
    } else {
      endDate = moment.parseZone(allocateRoleStateData.period.endDate).format('DD MMMM YYYY');
      durationOfRole = `${startDate} to ${endDate}`;
    }
    this.answers.push({ label: AnswerLabelText.DurationOfRole, value: durationOfRole, action: AllocateRoleState.CHOOSE_DURATION });
  }

  public onNavigate(action) {
    this.store.dispatch(new fromFeature.AllocateRoleChangeNavigation(action));
  }
}
