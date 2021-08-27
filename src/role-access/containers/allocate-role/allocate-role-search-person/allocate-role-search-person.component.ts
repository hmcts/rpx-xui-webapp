import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { PERSON_ERROR_MESSAGE } from '../../../constants';
import { AllocateRoleNavigation, AllocateRoleNavigationEvent, AllocateRoleState, AllocateRoleStateData, TypeOfRole } from '../../../models';
import { RoleAllocationCaptionText } from '../../../models/enums';
import * as fromFeature from '../../../store';

@Component({
  selector: 'exui-allocate-role-search-person',
  templateUrl: './allocate-role-search-person.component.html'
})
export class AllocateRoleSearchPersonComponent implements OnInit {
  public ERROR_MESSAGE = PERSON_ERROR_MESSAGE;
  @Input() public navEvent: AllocateRoleNavigation;
  public domain = PersonRole.JUDICIAL;
  public boldTitle = RoleAllocationCaptionText.JudiciaryChoose;
  public formGroup: FormGroup = new FormGroup({});
  public findPersonControl: FormControl;
  public personName: string;
  public person: Person;
  public subscription: Subscription;
  public roleType: string;

  constructor(private readonly store: Store<fromFeature.State>) {
  }

  public ngOnInit(): void {
    this.findPersonControl = this.formGroup.value.findPersonControl;
    this.subscription = this.store.pipe(select(fromFeature.getAllocateRoleState)).subscribe(allocation => this.setPerson(allocation));
  }

  private setPerson(allocation: AllocateRoleStateData): void {
    if (allocation.typeOfRole === TypeOfRole.CaseManager) {
      this.domain = PersonRole.CASEWORKER;
      this.boldTitle = RoleAllocationCaptionText.LegalOpsChoose;
    }
    this.personName = allocation && allocation.person ? this.getDisplayName(allocation.person) : null;
    this.person = allocation.person;
    this.roleType = allocation.typeOfRole;
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
