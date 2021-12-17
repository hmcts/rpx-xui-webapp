import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { $enum as EnumUtil } from 'ts-enum-util';

import { PERSON_ERROR_MESSAGE } from '../../../constants';
import {
  Actions,
  AllocateRoleNavigation,
  AllocateRoleNavigationEvent,
  AllocateRoleState,
  AllocateRoleStateData,
  RoleCategory,
  SpecificRole
} from '../../../models';
import * as fromFeature from '../../../store';
import { getTitleText } from '../../../utils';

@Component({
  selector: 'exui-allocate-role-search-person',
  templateUrl: './allocate-role-search-person.component.html'
})
export class AllocateRoleSearchPersonComponent implements OnInit {
  public ERROR_MESSAGE = PERSON_ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;
  public domain = PersonRole.JUDICIAL;
  public title: string;
  public boldTitle: string = 'Find the person';
  public formGroup: FormGroup = new FormGroup({});
  public findPersonControl: FormControl;
  public personName: string;
  public person: Person;
  public userId: string;
  public appStoreSub: Subscription;
  public subscription: Subscription;
  public roleType: SpecificRole;

  constructor(private readonly store: Store<fromFeature.State>) {}

  public ngOnInit(): void {
    this.findPersonControl = this.formGroup.value.findPersonControl;
    this.subscription = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(allocateRoleStateData => this.setData(allocateRoleStateData));
  }

  private setData(allocateRoleStateData: AllocateRoleStateData): void {
    const action = EnumUtil(Actions).getKeyOrDefault(allocateRoleStateData.action);
    if (allocateRoleStateData.roleCategory === RoleCategory.LEGAL_OPERATIONS) {
      this.domain = PersonRole.CASEWORKER;
    }
    this.title = getTitleText(allocateRoleStateData.typeOfRole, action, allocateRoleStateData.roleCategory);
    this.personName = allocateRoleStateData && allocateRoleStateData.person ? this.getDisplayName(allocateRoleStateData.person) : null;
    this.person = allocateRoleStateData.person;
    this.roleType = allocateRoleStateData.typeOfRole;
  }

  public navigationHandler(navEvent: AllocateRoleNavigationEvent): void {
    if (this.formGroup && this.formGroup.value && this.formGroup.value.findPersonControl && this.person) {
      switch (navEvent) {
        case AllocateRoleNavigationEvent.CONTINUE:
          const person = this.person;
          this.store.dispatch(new fromFeature.ChoosePersonAndGo({person, allocateRoleState: AllocateRoleState.CHOOSE_DURATION}));
          break;
        default:
          throw new Error('Invalid option');
      }
    } else {
      this.formGroup.setErrors({
        invalid: true
      });
      return;
    }
  }

  public selectedPerson(person: Person): void {
    this.person = person;
  }

  private getDisplayName(selectedPerson: Person): string {
    return selectedPerson.email ? `${selectedPerson.name}(${selectedPerson.email})` : selectedPerson.name;
  }
}
