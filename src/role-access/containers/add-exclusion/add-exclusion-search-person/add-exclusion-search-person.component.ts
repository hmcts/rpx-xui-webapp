import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Person, PersonRole } from '@hmcts/rpx-xui-common-lib';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { PERSON_ERROR_MESSAGE } from '../../../constants';
import { ExclusionNavigationEvent, ExclusionState, ExclusionStateData } from '../../../models';
import { ExclusionNavigation } from '../../../models/exclusion-navigation.interface';
import * as fromFeature from '../../../store';

@Component({
  standalone: false,
  selector: 'exui-add-exclusion-search-person',
  templateUrl: './add-exclusion-search-person.component.html'

})
export class AddExclusionSearchPersonComponent implements OnInit {
  public ERROR_MESSAGE = PERSON_ERROR_MESSAGE;
  @Input() public navEvent: ExclusionNavigation;
  public domain = PersonRole.ALL;
  public formGroup: FormGroup = new FormGroup({});
  public personName: string;
  public person: Person;
  public subscription: Subscription;
  public personRole: PersonRole;
  public services: string;
  public assignedUser: string;

  constructor(private readonly store: Store<fromFeature.State>) {}

  public ngOnInit(): void {
    this.subscription = this.store.pipe(select(fromFeature.getRoleAccessState)).subscribe((exclusion) => this.setPerson(exclusion));
  }

  private setPerson(exclusion: ExclusionStateData): void {
    this.personName = exclusion && exclusion.person ? this.getDisplayName(exclusion.person) : null;
    this.person = exclusion.person;
    this.personRole = exclusion.personRole;
    this.services = exclusion.jurisdiction;
    this.assignedUser = exclusion.person ? exclusion.person.id : null;
  }

  public navigationHandler(navEvent: ExclusionNavigationEvent): void {
    if (this.formGroup && this.formGroup.value && this.formGroup.value.findPersonControl && this.person) {
      switch (navEvent) {
        case ExclusionNavigationEvent.CONTINUE:
          this.store.dispatch(new fromFeature.UpdatePersonExclusion(ExclusionState.DESCRIBE_EXCLUSION, this.person));
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
    if (person && !person.domain) {
      this.person = { ... person, domain: this.personRole };
    } else {
      this.person = person;
    }
  }

  private getDisplayName(selectedPerson: Person): string {
    return selectedPerson.email ? `${selectedPerson.name}(${selectedPerson.email})` : selectedPerson.name;
  }
}
